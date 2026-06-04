"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SlidersHorizontal } from "lucide-react";

export default function DashboardHeader() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="section-px pt-16 pb-6 flex items-end justify-between"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div>
        <p className="text-[11px] font-semibold tracking-[0.25em] uppercase
                      text-[var(--text-faint)] mb-2">
          Overview
        </p>
        <h2 className="font-playfair font-bold text-white text-3xl sm:text-4xl tracking-tight flex items-center gap-3">
          Your Learning Dashboard
          <motion.span
            className="text-[var(--text-faint)] text-2xl"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            ✦
          </motion.span>
        </h2>
        <p className="mt-1.5 font-inter text-sm text-[var(--text-faint)]">
          Overview of your progress and upcoming milestones.
        </p>
      </div>

      <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl
                         glass text-sm text-[var(--text-muted)] hover:text-white
                         transition-colors">
        <SlidersHorizontal className="w-3.5 h-3.5" />
        Customise
      </button>
    </motion.div>
  );
}
