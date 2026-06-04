"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import {
  Home, BookOpen, CalendarDays, BarChart2,
  Users, Trophy, LineChart, Settings,
  ChevronLeft, ChevronRight, Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { id: "home",         label: "Home",         icon: Home },
  { id: "courses",      label: "Courses",       icon: BookOpen },
  { id: "schedule",     label: "Schedule",      icon: CalendarDays },
  { id: "progress",     label: "Progress",      icon: BarChart2 },
  { id: "community",    label: "Community",     icon: Users },
  { id: "achievements", label: "Achievements",  icon: Trophy },
  { id: "analytics",    label: "Analytics",     icon: LineChart },
  { id: "settings",     label: "Settings",      icon: Settings },
];

export default function Sidebar() {
  const [active,    setActive]    = useState("home");
  const [collapsed, setCollapsed] = useState(false);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled]   = useState(false);

  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 80));
  }, [scrollY]);

  return (
    <>
      {/* ── Desktop/Tablet sidebar ───────────────────────────── */}
      <motion.aside
        className={cn(
          "hidden md:flex flex-col",
          "fixed left-0 top-0 h-full z-40",
          "border-r border-[var(--border-dim)]",
          "transition-colors duration-500",
          scrolled ? "bg-[var(--bg-secondary)]" : "bg-[var(--bg-base)]/80 backdrop-blur-md"
        )}
        animate={{ width: collapsed ? 64 : 240 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
      >
        {/* Logo */}
        <div className={cn(
          "flex items-center gap-3 px-4 py-5 border-b border-[var(--border-dim)]",
          collapsed && "justify-center px-0"
        )}>
          <div className="shrink-0 w-8 h-8 rounded-lg bg-white flex items-center justify-center">
            <Zap className="w-4 h-4 text-black" strokeWidth={2.5} />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                key="logo"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.15 }}
                className="font-inter font-bold text-sm text-white tracking-tight whitespace-nowrap"
              >
                Nexus Learn
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto no-scrollbar px-2 py-4 space-y-0.5"
             aria-label="Main navigation">
          {NAV.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              active={active}
              collapsed={collapsed}
              onClick={() => setActive(item.id)}
            />
          ))}
        </nav>

        {/* Profile */}
        <div className={cn(
          "flex items-center gap-3 px-3 py-4 border-t border-[var(--border-dim)]",
          collapsed && "justify-center px-0"
        )}>
          <div className="shrink-0 w-8 h-8 rounded-full bg-[var(--bg-surface)]
                          border border-[var(--border-dim)]
                          flex items-center justify-center text-xs font-bold text-white">
            A
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.15 }}
              >
                <p className="text-xs font-semibold text-white leading-none">Alex</p>
                <p className="text-[10px] text-[var(--text-faint)] mt-0.5">View Profile</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand" : "Collapse"}
          className="absolute -right-3 top-[72px] w-6 h-6 rounded-full
                     bg-[var(--bg-elevated)] border border-[var(--border-dim)]
                     flex items-center justify-center
                     text-[var(--text-faint)] hover:text-white
                     hover:border-[var(--border-mid)] transition-colors z-10"
        >
          {collapsed
            ? <ChevronRight className="w-3 h-3" />
            : <ChevronLeft  className="w-3 h-3" />}
        </button>
      </motion.aside>

      {/* ── Mobile bottom nav ───────────────────────────────── */}
      <nav
        aria-label="Mobile navigation"
        className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden
                   bg-[var(--bg-secondary)]/95 backdrop-blur-xl
                   border-t border-[var(--border-dim)]"
      >
        {NAV.slice(0, 5).map((item) => {
          const Icon    = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              className="relative flex-1 flex flex-col items-center gap-0.5 py-3"
            >
              {isActive && (
                <motion.span
                  layoutId="mobile-pill"
                  className="absolute inset-x-2 top-1 bottom-1 rounded-xl bg-white/[0.06]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                className={cn("relative w-5 h-5 transition-colors",
                  isActive ? "text-white" : "text-[var(--text-faint)]"
                )}
              />
              <span
                className={cn("relative text-[10px] font-medium transition-colors",
                  isActive ? "text-white" : "text-[var(--text-faint)]"
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}

/* ── NavItem ─────────────────────────────────────────────────── */
function NavItem({
  item, active, collapsed, onClick,
}: {
  item: typeof NAV[number];
  active: string;
  collapsed: boolean;
  onClick: () => void;
}) {
  const Icon     = item.icon;
  const isActive = active === item.id;

  return (
    <button
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "relative w-full flex items-center rounded-xl px-3 py-2.5 transition-colors",
        collapsed ? "justify-center" : "gap-3",
        isActive
          ? "text-white"
          : "text-[var(--text-faint)] hover:text-[var(--text-muted)]"
      )}
    >
      {isActive && (
        <motion.span
          layoutId="sidebar-pill"
          className="absolute inset-0 rounded-xl bg-white/[0.07]"
          transition={{ type: "spring", stiffness: 360, damping: 28 }}
        />
      )}
      {isActive && !collapsed && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full bg-white" />
      )}
      <Icon className="relative shrink-0" style={{ width: 16, height: 16 }} />
      <AnimatePresence>
        {!collapsed && (
          <motion.span
            key={`lbl-${item.id}`}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.14 }}
            className="relative text-sm font-medium tracking-tight whitespace-nowrap"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
