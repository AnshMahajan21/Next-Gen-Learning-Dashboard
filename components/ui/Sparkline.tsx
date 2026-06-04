"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

function buildPath(data: number[], w: number, h: number): string {
  const pad  = 2;
  const min  = Math.min(...data);
  const max  = Math.max(...data);
  const span = max - min || 1;

  return data
    .map((v, i) => {
      const x = pad + (i / (data.length - 1)) * (w - pad * 2);
      const y = pad + (1 - (v - min) / span) * (h - pad * 2);
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

export default function Sparkline({
  data,
  width  = 120,
  height = 36,
  color  = "rgba(255,255,255,0.65)",
  className,
}: SparklineProps) {
  const ref    = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const d      = buildPath(data, width, height);

  return (
    <svg
      ref={ref}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Subtle fill under line */}
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={`${d} V ${height} H 2 Z`}
        fill="url(#spark-fill)"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      />
      <motion.path
        d={d}
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 1.4, ease: "easeInOut", delay: 0.2 }}
      />
      {/* End dot */}
      {data.length > 0 && (() => {
        const last = data[data.length - 1];
        const min  = Math.min(...data);
        const max  = Math.max(...data);
        const span = max - min || 1;
        const ex   = width - 2;
        const ey   = 2 + (1 - (last - min) / span) * (height - 4);
        return (
          <motion.circle
            cx={ex} cy={ey} r={2.5}
            fill={color}
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, delay: 1.5 }}
          />
        );
      })()}
    </svg>
  );
}
