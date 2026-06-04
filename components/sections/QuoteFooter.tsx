"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function QuoteFooter() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative section-px py-32 border-t border-[var(--border-dim)] overflow-hidden"
      aria-label="Closing quote"
    >
      {/* Dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 70% 80% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 80% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      <motion.blockquote
        className="relative text-center max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="font-playfair italic text-[var(--text-muted)] leading-relaxed"
           style={{ fontSize: "clamp(1.25rem, 3vw, 2rem)" }}>
          The beautiful thing about learning
          <br />is that nobody can take it away from you.
          <span className="font-normal not-italic text-[var(--text-faint)]">&nbsp;"</span>
        </p>
        <motion.footer
          className="mt-6 text-sm font-inter text-[var(--text-faint)] tracking-widest uppercase"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          B.B. King
        </motion.footer>
      </motion.blockquote>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="section-px py-6 border-t border-[var(--border-dim)]
                       flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-xs text-[var(--text-faint)]">
        © 2024 NexGen Learning. All rights reserved.
      </p>
      <nav className="flex items-center gap-6" aria-label="Footer navigation">
        {["Privacy Policy", "Terms of Service", "Support"].map((link) => (
          <a
            key={link}
            href="#"
            className="text-xs text-[var(--text-faint)] hover:text-[var(--text-muted)] transition-colors"
          >
            {link}
          </a>
        ))}
      </nav>
    </footer>
  );
}
