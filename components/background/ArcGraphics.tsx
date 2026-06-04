"use client";
import { motion } from "framer-motion";

export default function ArcGraphics() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* ── Outer massive ring ─────────────────────────────── */}
      <motion.div
        className="absolute"
        style={{ right: "-18%", top: "50%", translateY: "-50%" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      >
        <svg width={820} height={820} viewBox="0 0 820 820" fill="none">
          <circle cx={410} cy={410} r={400} stroke="rgba(255,255,255,0.035)" strokeWidth={1} strokeDasharray="18 12" />
          <circle cx={410} cy={410} r={360} stroke="rgba(255,255,255,0.025)" strokeWidth={0.5} />
          <circle cx={410} cy={410} r={320} stroke="rgba(255,255,255,0.02)"  strokeWidth={0.5} strokeDasharray="6 20" />
          {/* tick marks */}
          {Array.from({ length: 24 }, (_, i) => {
            const angle = (i / 24) * 2 * Math.PI;
            const r1 = 398, r2 = 385;
            const x1 = 410 + r1 * Math.cos(angle);
            const y1 = 410 + r1 * Math.sin(angle);
            const x2 = 410 + r2 * Math.cos(angle);
            const y2 = 410 + r2 * Math.sin(angle);
            return (
              <line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth={i % 6 === 0 ? 1.5 : 0.5}
              />
            );
          })}
        </svg>
      </motion.div>

      {/* ── Secondary mid ring (counter-rotating) ──────────── */}
      <motion.div
        className="absolute"
        style={{ right: "5%", top: "12%" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
      >
        <svg width={380} height={380} viewBox="0 0 380 380" fill="none">
          <circle cx={190} cy={190} r={185} stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} strokeDasharray="4 16" />
          <circle cx={190} cy={190} r={155} stroke="rgba(255,255,255,0.03)" strokeWidth={0.5} />
        </svg>
      </motion.div>

      {/* ── Small orbit ring ───────────────────────────────── */}
      <motion.div
        className="absolute"
        style={{ right: "22%", top: "58%" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      >
        <svg width={160} height={160} viewBox="0 0 160 160" fill="none">
          <circle cx={80} cy={80} r={76} stroke="rgba(255,255,255,0.06)" strokeWidth={0.5} strokeDasharray="3 10" />
          {/* dot on orbit */}
          <circle cx={80} cy={4} r={2.5} fill="rgba(255,255,255,0.3)" />
        </svg>
      </motion.div>

      {/* ── Blueprint horizontal lines ──────────────────────── */}
      <div className="absolute inset-0">
        {[20, 35, 52, 68, 80].map((top, i) => (
          <div
            key={i}
            className="absolute w-full"
            style={{
              top: `${top}%`,
              height: "1px",
              background: `rgba(255,255,255,${0.015 + i * 0.005})`,
              maskImage: "linear-gradient(90deg, transparent 0%, black 20%, black 80%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 20%, black 80%, transparent 100%)",
            }}
          />
        ))}
      </div>

      {/* ── Star particles ──────────────────────────────────── */}
      {[
        { x: "72%", y: "8%",  s: 2,   o: 0.7 },
        { x: "88%", y: "22%", s: 1.5, o: 0.5 },
        { x: "60%", y: "40%", s: 1,   o: 0.4 },
        { x: "78%", y: "55%", s: 2.5, o: 0.6 },
        { x: "92%", y: "70%", s: 1,   o: 0.35 },
        { x: "55%", y: "75%", s: 1.5, o: 0.45 },
        { x: "40%", y: "15%", s: 1,   o: 0.3 },
        { x: "30%", y: "80%", s: 1,   o: 0.3 },
      ].map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: p.x, top: p.y,
            width: p.s, height: p.s,
            opacity: p.o,
          }}
          animate={{ opacity: [p.o, p.o * 0.3, p.o] }}
          transition={{ duration: 3 + i * 0.7, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
