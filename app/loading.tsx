export default function Loading() {
  return (
    <div className="flex min-h-dvh bg-[var(--bg-base)] items-center justify-center">
      <div className="space-y-3 text-center">
        <div className="w-8 h-8 rounded-lg bg-white mx-auto animate-pulse" />
        <p className="text-xs text-[var(--text-faint)] tracking-widest uppercase font-medium">
          Loading
        </p>
      </div>
    </div>
  );
}
