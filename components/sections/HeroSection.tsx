"use client";

import { motion } from "framer-motion";
import { ChevronDown, Code, BarChart2, BookOpen, Clock, Calendar } from "lucide-react";
import DotGrid from "@/components/background/DotGrid";
import ArcGraphics from "@/components/background/ArcGraphics";
import GlassButton from "@/components/ui/GlassButton";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import Sparkline from "@/components/ui/Sparkline";

const STREAK_DATA  = [6,8,7,9,10,8,12];
const HOURS_DATA   = [8,11,9,13,12,10,14.5];
const LESSONS_DATA = [22,26,28,30,33,36,38];

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      aria-label="Hero"
    >
      {/* ── Backgrounds ──────────────────────────────────────── */}
      <DotGrid />
      <ArcGraphics />

      {/* Radial glow centre-left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          left: "-5%", top: "30%",
          width: 600, height: 600,
          background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
        }}
      />

      {/* ── Main content ─────────────────────────────────────── */}
      <div className="relative z-10 flex flex-1 items-center section-px">
        <div className="grid lg:grid-cols-2 gap-8 w-full items-center pt-24 pb-12">

          {/* ── Left column: text ──────────────────────────── */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <motion.p
                className="text-[11px] font-inter font-semibold tracking-[0.25em] uppercase
                           text-[var(--text-faint)] mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Welcome back
              </motion.p>

              <motion.h1
                className="font-playfair font-bold leading-none text-white"
                style={{ fontSize: "clamp(4rem, 9vw, 8rem)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                Alex
                {/* Star accent */}
                <motion.span
                  className="inline-block ml-3 text-[var(--text-faint)]"
                  style={{ fontSize: "0.3em", verticalAlign: "top", marginTop: "0.2em" }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  ✦
                </motion.span>
              </motion.h1>

              <motion.p
                className="mt-6 font-inter text-[var(--text-muted)] text-lg max-w-sm leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Keep going. Every lesson compounds
                <br />into mastery.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <GlassButton size="lg">Continue Learning</GlassButton>
            </motion.div>
          </motion.div>

          {/* ── Right column: floating cards ───────────────── */}
          <div className="relative h-[420px] hidden lg:block">
            {/* Next Class card */}
            <motion.div
              className="glass absolute noise"
              style={{ top: "0%", right: "8%", width: 230, rotate: "6deg" }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                    <BookOpen className="w-3.5 h-3.5 text-white/70" />
                  </div>
                  <div>
                    <p className="text-[10px] text-[var(--text-faint)] uppercase tracking-wider">Next Class</p>
                    <p className="text-xs font-medium text-white">React Advanced Patterns</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-[var(--text-faint)]">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Today, 7:00 PM</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 60 min</span>
                </div>
                <div className="flex items-center gap-1">
                  <ArrowButton />
                </div>
              </div>
            </motion.div>

            {/* Progress ring card */}
            <motion.div
              className="glass absolute noise"
              style={{ top: "22%", right: "2%", width: 180, rotate: "-4deg" }}
              initial={{ opacity: 0, rotate: "-4deg" }}
              animate={{ opacity: 1, y: [0, -14, 0] }}
              transition={{ opacity: { duration: 0.6, delay: 0.4 }, y: { duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 } }}
            >
              <div className="p-4 flex flex-col items-center gap-2">
                <p className="text-[10px] text-[var(--text-faint)] uppercase tracking-wider self-start">
                  Your Progress
                </p>
                <ProgressRing value={72} size={90} />
              </div>
            </motion.div>

            {/* Bar chart card */}
            <motion.div
              className="glass absolute noise"
              style={{ top: "62%", right: "14%", width: 160, rotate: "3deg" }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="p-3 space-y-1.5">
                <p className="text-[10px] text-[var(--text-faint)] uppercase tracking-wider">
                  Weekly Activity
                </p>
                <MiniBarChart data={[40, 65, 50, 80, 60, 90, 72]} />
              </div>
            </motion.div>

            {/* Code fragment */}
            <motion.div
              className="glass absolute"
              style={{ top: "42%", left: "0%", width: 56, height: 56, rotate: "-8deg",
                       display: "flex", alignItems: "center", justifyContent: "center" }}
              animate={{ y: [0, -6, 0], rotate: [-8, -5, -8] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
              <Code className="w-5 h-5 text-white/40" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Metrics strip ────────────────────────────────────── */}
      <motion.div
        className="relative z-10 section-px pb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px
                        border border-[var(--border-dim)] rounded-2xl overflow-hidden
                        bg-[var(--border-dim)]">
          {[
            { label: "Current Streak", value: 12,  suffix: " days", data: STREAK_DATA,  decimals: 0 },
            { label: "Hours Studied",  value: 14.5, suffix: " hrs",  data: HOURS_DATA,  decimals: 1 },
            { label: "Lessons Completed", value: 38, suffix: " lessons", data: LESSONS_DATA, decimals: 0 },
          ].map((m, i) => (
            <div key={i} className="bg-[var(--bg-secondary)] px-7 py-6 space-y-3">
              <p className="text-[11px] font-semibold text-[var(--text-faint)] uppercase tracking-[0.2em]">
                {m.label}
              </p>
              <p className="font-inter font-bold text-white leading-none"
                 style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                <AnimatedCounter to={m.value} decimals={m.decimals} suffix={m.suffix} />
              </p>
              <Sparkline data={m.data} width={130} height={34} />
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Scroll indicator ─────────────────────────────────── */}
      <motion.div
        className="relative z-10 flex justify-center pb-6 text-[var(--text-ghost)]"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
}

/* ── Sub-components ─────────────────────────────────────────── */

function ArrowButton() {
  return (
    <div className="w-full flex items-center justify-between px-2.5 py-1.5
                    rounded-lg bg-white/[0.06] border border-white/[0.1] cursor-pointer
                    hover:bg-white/[0.1] transition-colors">
      <span className="text-[10px] text-white/70 font-medium">Continue</span>
      <span className="text-[10px] text-white/40">→</span>
    </div>
  );
}

function ProgressRing({ value, size = 90 }: { value: number; size?: number }) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;

  return (
    <div className="relative flex items-center justify-center"
         style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r}
          fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={6} />
        <motion.circle
          cx={size/2} cy={size/2} r={r}
          fill="none" stroke="white" strokeWidth={6}
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
        />
      </svg>
      <div className="absolute text-center">
        <p className="font-mono font-bold text-white text-lg leading-none">{value}%</p>
        <p className="text-[8px] text-[var(--text-faint)] mt-0.5">Overall</p>
      </div>
    </div>
  );
}

function MiniBarChart({ data }: { data: number[] }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-[3px] h-10">
      {data.map((v, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-sm bg-white/30"
          style={{ height: `${(v / max) * 100}%` }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.3 + i * 0.06, type: "spring", stiffness: 260, damping: 22 }}
        />
      ))}
    </div>
  );
}
