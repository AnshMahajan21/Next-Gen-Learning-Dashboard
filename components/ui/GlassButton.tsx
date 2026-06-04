"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface GlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3.5 text-sm",
  lg: "px-9 py-4 text-base",
};

export default function GlassButton({
  children,
  onClick,
  icon = true,
  size = "md",
  className = "",
}: GlassButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`
        relative inline-flex items-center gap-2.5
        ${sizes[size]}
        rounded-full font-inter font-medium tracking-wide
        text-white
        bg-white/[0.08] backdrop-blur-md
        border border-white/[0.14]
        hover:bg-white/[0.12] hover:border-white/[0.22]
        transition-colors duration-200
        overflow-hidden
        ${className}
      `}
    >
      {/* Reflection highlight */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r
          from-transparent via-white/30 to-transparent"
      />
      {children}
      {icon && <ArrowRight className="w-4 h-4 opacity-70" />}
    </motion.button>
  );
}
