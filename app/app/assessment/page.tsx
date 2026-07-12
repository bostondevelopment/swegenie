"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FLOW, TOTAL_STEPS, SEGMENTS, segmentIndexForStep, aggregateAnswersToProfile } from "@/lib/assessment-flow";
import { encodeProfile } from "@/lib/encode";
import { track } from "@/lib/analytics";

const STORAGE_KEY = "swegenie_assessment_v1";

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
    const profile = aggregateAnswersToProfile(state.answers, state.intake.domains as string[] | undefined);
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

  if (!state || !step || state.done) {
    return (
      <div className="flex-1 flex items-center justify-center text-[var(--color-muted)] font-mono text-sm">
        {state?.done ? "Scoring your profile against 18 role archetypes…" : "Loading…"}
      </div>
    );
  }

  const currentSegmentIndex = segmentIndexForStep(state.currentStep);
  const currentSegment = SEGMENTS[currentSegmentIndex];

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center justify-between px-4 sm:px-6 pt-5">
        <Link href="/" className="flex items-center gap-2 font-display font-bold text-lg tracking-tight">
          SWE Genie
          <span className="w-[7px] h-[7px] rounded-full bg-[var(--color-accent)] inline-block" />
        </Link>
        <div className="font-mono text-[13px] text-[var(--color-muted-2)]">
          {currentSegmentIndex + 1} of {SEGMENTS.length} sections
        </div>
      </div>
      <div className="flex gap-1.5 px-4 sm:px-6 mt-4">
        {SEGMENTS.map((seg, i) => {
          const segLen = seg.endIndex - seg.startIndex;
          const fillPct =
            i < currentSegmentIndex
              ? 100
              : i > currentSegmentIndex
                ? 0
                : ((state.currentStep - seg.startIndex + 1) / segLen) * 100;
          return (
            <div key={seg.key} className="flex-1 h-[5px] rounded-full bg-[var(--color-border)] overflow-hidden">
              <div
                className="h-full bg-[var(--color-accent)] transition-[width] duration-200"
                style={{ width: `${fillPct}%` }}
              />
            </div>
          );
        })}
      </div>
      <div className="mx-auto max-w-xl w-full px-4 sm:px-6 flex-1 flex flex-col py-10">
        <div className="font-mono text-[13px] tracking-[0.08em] uppercase text-[var(--color-accent)] mb-2.5">
          Section {currentSegmentIndex + 1} of {SEGMENTS.length}
        </div>
        <h1 className="font-display text-2xl font-bold tracking-tight mb-8">{currentSegment.label}</h1>

        {step.kind === "intake" ? (
          <IntakeStep
            field={step.field}
            value={state.intake[step.field.id]}
            onChange={(v) => setIntake(step.field.id, v)}
            onAdvance={advanceIntake}
          />
        ) : (
          <QuestionStep
            key={step.question.id}
            question={step.question}
            value={state.answers[step.question.id]}
            onAnswer={(v) => setAnswer(step.question.id, v)}
          />
        )}

        <div className="mt-auto pt-10 flex justify-between items-center">
          <button
            onClick={goBack}
            disabled={state.currentStep === 0}
            className="btn-secondary px-6 py-3.5 text-[15px] font-semibold disabled:opacity-0"
          >
            Back
          </button>
          {step.kind === "question" && (
            <button
              onClick={() => setAnswer(step.question.id, null)}
              className="font-mono text-[13px] text-[var(--color-muted-2)] hover:text-[var(--color-fg)] transition-colors"
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
      <h2 className="font-display text-[28px] sm:text-[30px] font-bold tracking-tight mb-9 leading-snug">{field.label}</h2>

      {field.type === "number" && (
        <input
          type="number"
          min={field.min}
          max={field.max}
          value={typeof value === "number" ? value : ""}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full card px-[18px] py-4 text-[17px] font-display mb-7 outline-none focus:border-[var(--color-accent)]"
          autoFocus
        />
      )}

      {(field.type === "multi_select" || field.type === "multi_select_with_other") && (
        <div className="flex flex-wrap gap-2.5 mb-7">
          {field.options?.map((opt) => {
            const isSelected = selected.includes(opt);
            return (
              <button
                key={opt}
                onClick={() =>
                  onChange(isSelected ? selected.filter((o) => o !== opt) : [...selected, opt])
                }
                className={`px-4 py-2.5 text-sm rounded-full transition-colors ${
                  isSelected ? "btn-primary" : "btn-secondary"
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
          className="w-full card px-[18px] py-4 text-[17px] mb-7 outline-none focus:border-[var(--color-accent)]"
          autoFocus
        />
      )}

      <div className="flex items-center gap-4">
        <button onClick={onAdvance} className="btn-primary px-[30px] py-4 text-[17px] font-semibold">
          Continue
        </button>
        {field.optional && (
          <button
            onClick={onAdvance}
            className="font-mono text-[13px] text-[var(--color-muted-2)] hover:text-[var(--color-fg)] transition-colors"
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
  const [sliderValue, setSliderValue] = useState(typeof value === "number" ? value : 3);
  const [sliderTouched, setSliderTouched] = useState(typeof value === "number");

  return (
    <div>
      <h2 className="font-display text-[28px] sm:text-[30px] font-bold tracking-tight mb-9 leading-snug">{question.prompt}</h2>

      {(question.format === "scenario_choice" || question.format === "behavioral_anchor") &&
        question.options && (
          <div className="flex flex-col gap-2.5">
            {question.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onAnswer(opt.value)}
                className={`text-left px-[18px] py-4 card text-[15px] hover:border-[var(--color-accent)]/50 transition-colors ${
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
            onChange={(e) => {
              setSliderValue(Number(e.target.value));
              setSliderTouched(true);
            }}
            className="w-full accent-[var(--color-accent)]"
          />
          <div className="flex justify-between font-mono text-xs text-[var(--color-muted-2)] mt-3 mb-7">
            <span className="max-w-[45%]">{question.scale.minLabel}</span>
            <span className="max-w-[45%] text-right">{question.scale.maxLabel}</span>
          </div>
          {!sliderTouched && (
            <p className="font-mono text-xs text-[var(--color-muted-2)] mb-4">
              Drag the slider to set your answer, or use &ldquo;Skip / unsure&rdquo; below.
            </p>
          )}
          <button
            onClick={() => onAnswer(sliderValue)}
            disabled={!sliderTouched}
            className="btn-primary px-[30px] py-4 text-[17px] font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
