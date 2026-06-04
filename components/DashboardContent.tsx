"use client";

import { motion } from "framer-motion";
import type { Course } from "@/lib/types";

import NextClassTile    from "@/components/tiles/NextClassTile";
import RankTile         from "@/components/tiles/RankTile";
import CourseCard       from "@/components/tiles/CourseCard";
import ActivityTile     from "@/components/tiles/ActivityTile";
import AchievementsTile from "@/components/tiles/AchievementsTile";

const STAGGER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const TILE = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring", stiffness: 280, damping: 24 },
  },
};

function Tile({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={TILE} className={className}>
      {children}
    </motion.div>
  );
}

export default function DashboardContent({ courses }: { courses: Course[] }) {
  return (
    <motion.div
      variants={STAGGER}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className="space-y-5"
    >
      {/* Row 1: Next Class + Rank */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Tile><NextClassTile /></Tile>
        <Tile><RankTile /></Tile>
      </div>

      {/* Row 2: Course cards */}
      <section aria-label="Your courses">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-inter font-semibold text-base text-white tracking-tight">
            Your Courses
          </h2>
          <button className="text-xs text-[var(--text-faint)] hover:text-[var(--text-muted)]
                             transition-colors">
            View all
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {courses.map((course, i) => (
            <Tile key={course.id}>
              <CourseCard course={course} index={i} />
            </Tile>
          ))}
        </div>
      </section>

      {/* Row 3: Activity + Achievements */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Tile><ActivityTile /></Tile>
        <Tile><AchievementsTile /></Tile>
      </div>
    </motion.div>
  );
}
