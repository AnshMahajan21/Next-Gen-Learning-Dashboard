"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import AnimatedProgressBar from "@/components/ui/AnimatedProgressBar";

export default function NextClassTile() {
  return (
    <motion.article
      className="tile flex flex-col justify-between p-6 min-h-[220px]"
      whileHover={{ scale: 1.018, y: -4, borderColor: "rgba(255,255,255,0.18)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Top */}
      <div className="space-y-1">
        <p className="text-[11px] font-semibold text-[var(--text-faint)] uppercase tracking-[0.2em]">
          Next Class
        </p>
        <p className="text-xs text-[var(--text-faint)]">Up Next</p>
      </div>

      {/* Title + ring */}
      <div className="flex items-center justify-between gap-4 mt-4">
        <h3 className="font-playfair font-bold text-white text-2xl leading-snug max-w-[60%]">
          Advanced React Patterns
        </h3>
        {/* Small orbit ring graphic */}
        <div className="shrink-0 relative w-14 h-14 opacity-60">
          <svg viewBox="0 0 56 56" fill="none" className="w-full h-full">
            <circle cx={28} cy={28} r={25} stroke="rgba(255,255,255,0.18)" strokeWidth={1} />
            <circle cx={28} cy={3}  r={3}  fill="rgba(255,255,255,0.6)" />
            <motion.circle
              cx={28} cy={28} r={25}
              stroke="rgba(255,255,255,0.5)" strokeWidth={1.5}
              strokeDasharray="8 140"
              strokeLinecap="round"
              animate={{ rotate: 360 }}
              style={{ transformOrigin: "28px 28px" }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
          </svg>
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-5 mt-3 text-xs text-[var(--text-faint)]">
        <span className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" /> Today, 7:00 PM
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" /> 60 min
        </span>
      </div>

      {/* Progress + button */}
      <div className="mt-5 space-y-3">
        <div className="space-y-1">
          <p className="text-[11px] text-[var(--text-faint)]">Continue where you left off!</p>
          <AnimatedProgressBar value={60} showLabel={false} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--text-faint)] font-mono">60%</span>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl
                       bg-white text-black text-xs font-semibold
                       hover:bg-white/90 transition-colors"
          >
            Continue Class <ArrowRight className="w-3 h-3" />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
