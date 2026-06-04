"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import Sparkline from "@/components/ui/Sparkline";

const RANK_DATA = [9, 8, 7, 7, 6, 5, 4];

export default function RankTile() {
  return (
    <motion.article
      className="tile flex flex-col justify-between p-6 min-h-[220px] overflow-hidden"
      whileHover={{ scale: 1.018, y: -4, borderColor: "rgba(255,255,255,0.18)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Rank ring — decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
      >
        <RankRing />
      </div>

      {/* Label */}
      <p className="text-[11px] font-semibold text-[var(--text-faint)] uppercase tracking-[0.2em]">
        Your Rank
      </p>
      <p className="text-[11px] text-[var(--text-faint)] -mt-1">Current Rank</p>

      {/* Rank number */}
      <div className="mt-3">
        <p className="font-playfair font-bold text-white leading-none"
           style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
          #4
        </p>
        <p className="text-sm text-[var(--text-muted)] mt-1">Top 6% of learners</p>
      </div>

      {/* Sparkline + trend */}
      <div className="mt-auto space-y-1.5">
        <Sparkline data={RANK_DATA} width={160} height={36} />
        <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
          <TrendingUp className="w-3.5 h-3.5" />
          +2 positions this week
        </div>
      </div>
    </motion.article>
  );
}

function RankRing() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      style={{ opacity: 0.18 }}
    >
      <svg width={120} height={120} viewBox="0 0 120 120" fill="none">
        <circle cx={60} cy={60} r={56} stroke="white" strokeWidth={1}
          strokeDasharray="6 10" />
        <circle cx={60} cy={4} r={4} fill="white" />
        <circle cx={60} cy={60} r={40} stroke="white" strokeWidth={0.5} />
      </svg>
    </motion.div>
  );
}
