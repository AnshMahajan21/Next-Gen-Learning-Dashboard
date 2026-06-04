"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Repeat, TrendingUp } from "lucide-react";

const PILLARS = [
  { icon: Target,    title: "Focus",       body: "Master one thing at a time." },
  { icon: Repeat,    title: "Consistency", body: "Small daily progress leads to big results." },
  { icon: TrendingUp,title: "Growth",      body: "Track. Reflect. Improve." },
];

export default function MissionSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative section-px py-28 border-t border-[var(--border-dim)] overflow-hidden"
      aria-label="Mission and philosophy"
    >
      {/* Subtle background lines */}
      <div aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "80px 100%",
        }}
      />

      <div className="relative grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

        {/* ── Left: Mission ───────────────────────────────── */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase
                          text-[var(--text-faint)] mb-5">
              Our Mission
            </p>
            <h2 className="font-playfair font-bold text-white leading-tight"
                style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}>
              Learn with purpose.
              <br />
              Build the future.
            </h2>
          </div>
          <p className="font-inter text-[var(--text-muted)] text-base leading-relaxed max-w-sm">
            We believe deliberate practice, consistent effort, and real-world
            application transform learners into creators.
          </p>

          {/* Pillars */}
          <div className="grid grid-cols-3 gap-6 pt-4 border-t border-[var(--border-dim)]">
            {PILLARS.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  className="space-y-2"
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                >
                  <Icon className="w-4 h-4 text-[var(--text-muted)]" />
                  <p className="font-inter font-semibold text-sm text-white">{p.title}</p>
                  <p className="font-inter text-xs text-[var(--text-faint)] leading-relaxed">
                    {p.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ── Right: Philosophy quote ──────────────────────── */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase
                        text-[var(--text-faint)]">
            Our Philosophy
          </p>

          <blockquote className="relative">
            {/* Big open-quote mark */}
            <span
              aria-hidden="true"
              className="font-playfair text-white/10 select-none leading-none"
              style={{ fontSize: "6rem", lineHeight: 0.8, display: "block", marginBottom: "0.5rem" }}
            >
              "
            </span>
            <p className="font-playfair italic text-white leading-snug"
               style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}>
              Every lesson completed compounds into mastery.
            </p>
            <span
              aria-hidden="true"
              className="font-playfair text-white/10 select-none float-right"
              style={{ fontSize: "6rem", lineHeight: 0.5 }}
            >
              "
            </span>
          </blockquote>

          {/* Decorative rule */}
          <motion.div
            className="h-px bg-white/10"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            style={{ originX: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </motion.div>
      </div>
    </section>
  );
}
