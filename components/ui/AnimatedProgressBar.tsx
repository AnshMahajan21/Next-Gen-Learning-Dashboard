"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AnimatedProgressBarProps {
  value: number;
  delay?: number;
  showLabel?: boolean;
  className?: string;
}

export default function AnimatedProgressBar({
  value,
  delay = 0,
  showLabel = true,
  className,
}: AnimatedProgressBarProps) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className={`space-y-1.5 ${className ?? ""}`}>
      <div
        className="relative h-[2px] w-full rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.08)" }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-white"
          initial={{ width: "0%" }}
          animate={inView ? { width: `${value}%` } : { width: "0%" }}
          transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1], delay: 0.15 + delay }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between">
          <span className="text-[11px] font-medium text-[var(--text-faint)] uppercase tracking-widest">
            Progress
          </span>
          <motion.span
            className="font-mono text-xs font-bold text-[var(--text-muted)]"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.7 + delay }}
          >
            {value}%
          </motion.span>
        </div>
      )}
    </div>
  );
}
