"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FLOW, TOTAL_STEPS, aggregateAnswersToProfile } from "@/lib/assessment-flow";
import { encodeProfile } from "@/lib/encode";
import { track } from "@/lib/analytics";

const STORAGE_KEY = "roleprint_assessment_v1";

interface StoredState {
  version: 1;
  currentStep: number;
  intake: Record<string, string | number | string[] | undefined>;
  answers: Record<string, number | null>;
  done: boolean;
}

function loadState(): StoredState {
  if (typeof window === "undefined") {
    return { version: 1, currentStep: 0, intake: {}, answers: {}, done: false };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as StoredState;
  } catch {
    // corrupt storage, fall through to fresh state
  }
  return { version: 1, currentStep: 0, intake: {}, answers: {}, done: false };
}

export default function AssessmentPage() {
  const router = useRouter();
  const [state, setState] = useState<StoredState | null>(null);
  const hasStartedTrackingRef = useRef(false);

  useEffect(() => {
    // localStorage is a browser-only external system: this hydration read can
    // only happen post-mount, which unavoidably means a one-time setState
    // here rather than a lazy useState initializer (which would run during
    // server/static prerendering, where window is undefined, and wouldn't
    // re-run on hydration — silently losing saved progress).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(loadState());
  }, []);

  useEffect(() => {
    if (!state) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    const hasProgress = state.currentStep > 0 || Object.keys(state.answers).length > 0;
    if (!hasStartedTrackingRef.current && hasProgress) {
      hasStartedTrackingRef.current = true;
      track("assessment_start");
    }
  }, [state]);

  const step = state ? FLOW[state.currentStep] : undefined;

  const goBack = useCallback(() => {
    setState((prev) => (prev ? { ...prev, currentStep: Math.max(0, prev.currentStep - 1) } : prev));
  }, []);

  // Side effect (navigation, clearing storage, tracking) runs from state change,
  // not from inside a setState updater — calling router.push directly inside
  // another component's state updater is the exact anti-pattern React flags
  // as "Cannot update a component while rendering a different component."
  useEffect(() => {
    if (!state?.done) return;
    track("assessment_complete");
    const profile = aggregateAnswersToProfile(state.answers);
    const encoded = encodeProfile(profile);
    const stackParam = encodeURIComponent(JSON.stringify(state.intake));
    window.localStorage.removeItem(STORAGE_KEY);
    router.push(`/results?a=${encoded}&s=${stackParam}`);
  }, [state, router]);

  const setAnswer = useCallback((questionId: string, value: number | null) => {
    setState((prev) => {
      if (!prev) return prev;
      const answers = { ...prev.answers, [questionId]: value };
      const isLast = prev.currentStep === TOTAL_STEPS - 1;
      return isLast
        ? { ...prev, answers, done: true }
        : { ...prev, answers, currentStep: prev.currentStep + 1 };
    });
  }, []);

  const setIntake = useCallback((fieldId: string, value: string | number | string[]) => {
    setState((prev) => (prev ? { ...prev, intake: { ...prev.intake, [fieldId]: value } } : prev));
  }, []);

  const advanceIntake = useCallback(() => {
    setState((prev) => {
      if (!prev) return prev;
      const isLast = prev.currentStep === TOTAL_STEPS - 1;
      return isLast ? { ...prev, done: true } : { ...prev, currentStep: prev.currentStep + 1 };
    });
  }, []);

  const progressPct = state ? Math.round(((state.currentStep + 1) / TOTAL_STEPS) * 100) : 0;

  if (!state || !step || state.done) {
    return (
      <div className="flex-1 flex items-center justify-center text-[var(--color-muted)] font-mono text-sm">
        {state?.done ? "Scoring your profile against 18 role archetypes…" : "Loading…"}
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="h-1 bg-[var(--color-border)]">
        <div
          className="h-1 bg-[var(--color-accent)] transition-[width] duration-200"
          style={{ width: `${progressPct}%` }}
        />
      </div>
      <div className="mx-auto max-w-xl w-full px-4 sm:px-6 flex-1 flex flex-col py-10">
        <div className="font-mono text-xs text-[var(--color-muted)] mb-8">
          {state.currentStep + 1} of {TOTAL_STEPS}
        </div>

        {step.kind === "intake" ? (
          <IntakeStep
            field={step.field}
            value={state.intake[step.field.id]}
            onChange={(v) => setIntake(step.field.id, v)}
            onAdvance={advanceIntake}
          />
        ) : (
          <QuestionStep
            question={step.question}
            value={state.answers[step.question.id]}
            onAnswer={(v) => setAnswer(step.question.id, v)}
          />
        )}

        <div className="mt-auto pt-8 flex justify-between">
          <button
            onClick={goBack}
            disabled={state.currentStep === 0}
            className="btn-secondary px-4 py-2 text-sm disabled:opacity-0"
          >
            Back
          </button>
          {step.kind === "question" && (
            <button
              onClick={() => setAnswer(step.question.id, null)}
              className="text-sm text-[var(--color-muted)] hover:text-[var(--color-fg)] transition-colors"
            >
              Skip / unsure
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function IntakeStep({
  field,
  value,
  onChange,
  onAdvance,
}: {
  field: import("@/lib/taxonomy").StackIntakeField;
  value: string | number | string[] | undefined;
  onChange: (v: string | number | string[]) => void;
  onAdvance: () => void;
}) {
  const selected = Array.isArray(value) ? value : [];

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold mb-6 leading-snug">{field.label}</h2>

      {field.type === "number" && (
        <input
          type="number"
          min={field.min}
          max={field.max}
          value={typeof value === "number" ? value : ""}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full card px-4 py-3 text-lg font-mono mb-6"
          autoFocus
        />
      )}

      {(field.type === "multi_select" || field.type === "multi_select_with_other") && (
        <div className="flex flex-wrap gap-2 mb-6">
          {field.options?.map((opt) => {
            const isSelected = selected.includes(opt);
            return (
              <button
                key={opt}
                onClick={() =>
                  onChange(isSelected ? selected.filter((o) => o !== opt) : [...selected, opt])
                }
                className={`px-3 py-2 text-sm rounded ${
                  isSelected ? "btn-primary text-white" : "btn-secondary"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      )}

      {field.type === "free_text" && (
        <input
          type="text"
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full card px-4 py-3 text-lg mb-6"
          autoFocus
        />
      )}

      <div className="flex gap-3">
        <button onClick={onAdvance} className="btn-primary px-5 py-2.5 font-medium">
          Continue
        </button>
        {field.optional && (
          <button
            onClick={onAdvance}
            className="text-sm text-[var(--color-muted)] hover:text-[var(--color-fg)] transition-colors"
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
}

function QuestionStep({
  question,
  value,
  onAnswer,
}: {
  question: import("@/lib/taxonomy").Question;
  value: number | null | undefined;
  onAnswer: (v: number) => void;
}) {
  const [sliderValue, setSliderValue] = useState(3);

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold mb-8 leading-snug">{question.prompt}</h2>

      {(question.format === "scenario_choice" || question.format === "behavioral_anchor") &&
        question.options && (
          <div className="flex flex-col gap-3">
            {question.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onAnswer(opt.value)}
                className={`text-left px-4 py-3 card hover:border-[var(--color-accent)] transition-colors ${
                  value === opt.value ? "border-[var(--color-accent)] bg-[var(--color-accent)]/5" : ""
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

      {question.format === "slider" && question.scale && (
        <div className="mt-4">
          <input
            type="range"
            min={question.scale.min}
            max={question.scale.max}
            value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))}
            className="w-full accent-[var(--color-accent)]"
          />
          <div className="flex justify-between text-xs text-[var(--color-muted)] mt-2 mb-6">
            <span className="max-w-[45%]">{question.scale.minLabel}</span>
            <span className="max-w-[45%] text-right">{question.scale.maxLabel}</span>
          </div>
          <button onClick={() => onAnswer(sliderValue)} className="btn-primary px-5 py-2.5 font-medium">
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
