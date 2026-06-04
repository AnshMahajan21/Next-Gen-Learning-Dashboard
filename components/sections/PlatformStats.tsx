"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import Sparkline from "@/components/ui/Sparkline";

const STATS = [
  {
    label:   "Learning Velocity",
    value:   24,
    prefix:  "+",
    suffix:  "%",
    sub:     "vs last week",
    data:    [12, 15, 14, 18, 20, 22, 24],
    decimals: 0,
  },
  {
    label:    "Weekly Study Time",
    value:    14.5,
    suffix:   " hrs",
    sub:      "+2.3 hrs this week",
    data:     [8, 11, 9, 13, 12, 10, 14.5],
    decimals: 1,
  },
  {
    label:    "Lessons Completed",
    value:    38,
    suffix:   "",
    sub:      "+5 this week",
    data:     [22, 26, 28, 30, 33, 36, 38],
    decimals: 0,
  },
  {
    label:    "Current Rank",
    value:    4,
    prefix:   "#",
    suffix:   "",
    sub:      "Top 6% of learners",
    data:     [9, 8, 7, 7, 6, 5, 4],
    decimals: 0,
  },
];

export default function PlatformStats() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="section-px py-6 border-t border-[var(--border-dim)]"
      aria-label="Your statistics"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px
                      border border-[var(--border-dim)] rounded-2xl overflow-hidden
                      bg-[var(--border-dim)]">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            className="bg-[var(--bg-secondary)] px-6 py-7 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[11px] font-semibold text-[var(--text-faint)] uppercase tracking-[0.18em]">
              {s.label}
            </p>
            <p className="font-inter font-bold text-white leading-none"
               style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}>
              <AnimatedCounter
                to={s.value}
                decimals={s.decimals}
                prefix={s.prefix ?? ""}
                suffix={s.suffix}
              />
            </p>
            <div className="space-y-1">
              <Sparkline data={s.data} width={110} height={32} />
              <p className="text-[11px] text-[var(--text-faint)]">{s.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
