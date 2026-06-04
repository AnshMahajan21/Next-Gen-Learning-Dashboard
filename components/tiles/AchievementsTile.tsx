"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Repeat, Sunrise, Lightbulb, Star, Flame } from "lucide-react";

const BADGES = [
  { icon: Repeat,    label: "Consistency", sub: "7-day streak" },
  { icon: Sunrise,   label: "Early Bird",  sub: "Morning learner" },
  { icon: Lightbulb, label: "Problem Solver", sub: "25 challenges" },
  { icon: Star,      label: "Top Performer",  sub: "Top 10%" },
];

export default function AchievementsTile() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article
      ref={ref}
      className="tile flex flex-col p-6 gap-5"
      whileHover={{ scale: 1.01, y: -3, borderColor: "rgba(255,255,255,0.16)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Header */}
      <header>
        <h2 className="font-inter font-semibold text-sm text-white">Achievements</h2>
        <p className="text-xs text-[var(--text-faint)]">Recent Badges</p>
      </header>

      {/* Badges grid */}
      <div className="grid grid-cols-4 gap-3">
        {BADGES.map((b, i) => {
          const Icon = b.icon;
          return (
            <motion.div
              key={b.label}
              className="flex flex-col items-center gap-1.5 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
            >
              <div className="w-11 h-11 rounded-full bg-[var(--bg-elevated)]
                              border border-[var(--border-dim)]
                              flex items-center justify-center">
                <Icon className="w-4.5 h-4.5 text-[var(--text-muted)]" style={{ width: 18, height: 18 }} />
              </div>
              <p className="text-[10px] font-semibold text-white leading-tight">{b.label}</p>
              <p className="text-[9px] text-[var(--text-faint)]">{b.sub}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Streak banner */}
      <div className="mt-auto flex items-center justify-between
                      px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-dim)]">
        <div>
          <p className="text-sm font-semibold text-white">Keep the streak alive!</p>
          <p className="text-xs text-[var(--text-faint)]">You&apos;re on a 12-day streak</p>
        </div>
        <div className="w-9 h-9 rounded-xl bg-white/[0.06] flex items-center justify-center">
          <Flame className="w-4.5 h-4.5 text-orange-400" style={{ width: 18, height: 18 }} />
        </div>
      </div>
    </motion.article>
  );
}
