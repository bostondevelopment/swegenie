interface DimensionScaleProps {
  target: number;
}

export function DimensionScale({ target }: DimensionScaleProps) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${
            i <= target ? "bg-[var(--color-accent)]" : "bg-[var(--color-border)]"
          }`}
        />
      ))}
    </div>
  );
}
