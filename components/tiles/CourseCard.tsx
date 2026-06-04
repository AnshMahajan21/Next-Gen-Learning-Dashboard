"use client";

import { motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";
import type { Course } from "@/lib/types";
import IconRenderer from "@/components/ui/IconRenderer";
import AnimatedProgressBar from "@/components/ui/AnimatedProgressBar";

interface CourseCardProps {
  course: Course;
  index?: number;
  color?: string; // icon bg tint
}

const ICON_COLORS = [
  { bg: "rgba(56,189,248,0.15)", border: "rgba(56,189,248,0.25)", text: "#38BDF8" },  // sky blue
  { bg: "rgba(96,165,250,0.15)", border: "rgba(96,165,250,0.25)", text: "#60A5FA" },  // blue
  { bg: "rgba(52,211,153,0.15)", border: "rgba(52,211,153,0.25)", text: "#34D399" },  // green
  { bg: "rgba(251,191,36,0.15)", border: "rgba(251,191,36,0.25)",  text: "#FBBF24" }, // amber
];

export default function CourseCard({ course, index = 0 }: CourseCardProps) {
  const scheme = ICON_COLORS[index % ICON_COLORS.length];

  return (
    <motion.article
      className="tile flex flex-col p-5 min-h-[200px] cursor-pointer"
      aria-label={`${course.title} — ${course.progress}%`}
      whileHover={{
        scale: 1.02,
        y: -4,
        borderColor: "rgba(255,255,255,0.16)",
        backgroundColor: "#161616",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ background: scheme.bg, border: `1px solid ${scheme.border}` }}
        >
          <IconRenderer name={course.icon_name} className="w-5 h-5" style={{ color: scheme.text }} />
        </div>
        <button
          aria-label="More options"
          className="text-[var(--text-ghost)] hover:text-[var(--text-muted)] transition-colors p-1"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Title */}
      <h3 className="font-inter font-semibold text-base text-white mt-4 leading-snug line-clamp-2 flex-1">
        {course.title}
      </h3>

      {/* Progress */}
      <div className="mt-4">
        <AnimatedProgressBar value={course.progress} delay={index * 0.05} />
      </div>
    </motion.article>
  );
}
