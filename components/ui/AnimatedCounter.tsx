"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useTransform, animate, motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  to: number;
  decimals?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export default function AnimatedCounter({
  to,
  decimals = 0,
  duration = 2,
  suffix = "",
  prefix = "",
  className,
}: AnimatedCounterProps) {
  const ref      = useRef<HTMLSpanElement>(null);
  const inView   = useInView(ref, { once: true, margin: "-60px" });
  const count    = useMotionValue(0);
  const rounded  = useTransform(count, (v) =>
    `${prefix}${v.toFixed(decimals)}${suffix}`
  );

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [inView, to, count, duration]);

  return (
    <motion.span ref={ref} className={className}>
      {rounded}
    </motion.span>
  );
}
