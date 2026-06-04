"use client";

export default function DotGrid({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className ?? ""}`}
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.11) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        maskImage:
          "radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%)",
      }}
    />
  );
}
