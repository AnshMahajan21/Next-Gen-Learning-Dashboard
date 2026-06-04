"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useMemo } from "react";

const WEEKS = 15;
const DAYS  = 7;
const LABELS = ["M", "T", "W", "T", "F", "S", "S"];

const WEEKLY_BARS = [
  { day: "M", hours: 1.5 }, { day: "T", hours: 3.2 },
  { day: "W", hours: 2.8 }, { day: "T", hours: 4.1 },
  { day: "F", hours: 1.9 }, { day: "S", hours: 3.6 },
  { day: "S", hours: 2.2 },
];
const MAX_H = Math.max(...WEEKLY_BARS.map((b) => b.hours));

function seeded(s: number) { const x = Math.sin(s + 1) * 10000; return x - Math.floor(x); }

const CELL_ALPHA = [0.05, 0.14, 0.28, 0.50, 0.80];

export default function ActivityTile() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const cells = useMemo(() =>
    Array.from({ length: WEEKS * DAYS }, (_, i) => {
      const v = seeded(i * 7 + 13);
      const lvl = v < 0.25 ? 0 : v < 0.5 ? 1 : v < 0.75 ? 2 : v < 0.9 ? 3 : 4;
      return lvl;
    }), []);

  const activeDays = cells.filter((l) => l > 0).length;

  return (
    <motion.article
      ref={ref}
      className="tile flex flex-col gap-6 p-6"
      whileHover={{ scale: 1.01, y: -3, borderColor: "rgba(255,255,255,0.16)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h2 className="font-inter font-semibold text-sm text-white tracking-tight">
            Your Activity
          </h2>
          <p className="text-xs text-[var(--text-faint)]">Last 15 weeks</p>
        </div>
        <div className="text-right">
          <p className="font-mono font-bold text-xl text-white leading-none">{activeDays}</p>
          <p className="text-[11px] text-[var(--text-faint)]">active days</p>
        </div>
      </header>

      {/* Heatmap */}
      <div className="flex gap-2">
        <div className="flex flex-col justify-between" style={{ gap: 3 }} aria-hidden="true">
          {LABELS.map((l, i) => (
            <span key={i} className="text-[10px] text-[var(--text-faint)] h-3 leading-3">
              {i % 2 === 0 ? l : ""}
            </span>
          ))}
        </div>
        <div className="flex gap-[3px] flex-1 no-scrollbar overflow-x-auto">
          {Array.from({ length: WEEKS }, (_, w) => (
            <div key={w} className="flex flex-col gap-[3px]">
              {Array.from({ length: DAYS }, (_, d) => {
                const lvl   = cells[w * DAYS + d];
                const alpha = CELL_ALPHA[lvl];
                return (
                  <motion.div
                    key={d}
                    className="rounded-[2px]"
                    style={{ width: 11, height: 11, background: `rgba(255,255,255,${alpha})` }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: (w * DAYS + d) * 0.003, type: "spring", stiffness: 400, damping: 22 }}
                    whileHover={{ scale: 1.6 }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] text-[var(--text-faint)]">Less</span>
        {CELL_ALPHA.map((a, i) => (
          <div key={i} className="w-[11px] h-[11px] rounded-[2px]"
               style={{ background: `rgba(255,255,255,${a})` }} aria-hidden="true" />
        ))}
        <span className="text-[10px] text-[var(--text-faint)]">More</span>
      </div>

      {/* Weekly bars */}
      <div className="border-t border-[var(--border-dim)] pt-4">
        <p className="text-[11px] text-[var(--text-faint)] uppercase tracking-widest font-semibold mb-3">
          This week
        </p>
        <div className="flex items-end gap-1.5 h-16">
          {WEEKLY_BARS.map((b, i) => {
            const pct = (b.hours / MAX_H) * 100;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  className="w-full rounded-t"
                  style={{ background: `rgba(255,255,255,${0.25 + (pct/100)*0.55})`, height: `${pct}%` }}
                  initial={{ scaleY: 0, originY: 1 }}
                  animate={inView ? { scaleY: 1 } : {}}
                  transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.3 + i * 0.06 }}
                />
                <span className="text-[9px] text-[var(--text-faint)]">{b.day}</span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.article>
  );
}
