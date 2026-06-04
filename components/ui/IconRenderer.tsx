import {
  Code, Layers, FileCode, Database, Cpu, Globe, Terminal,
  BookOpen, FlaskConical, Figma, BarChart2, Cloud, GitBranch,
  Zap, Shield, Palette, type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Code, Layers, FileCode, Database, Cpu, Globe, Terminal,
  BookOpen, FlaskConical, Figma, BarChart2, Cloud, GitBranch,
  Zap, Shield, Palette,
};

interface IconRendererProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function IconRenderer({ name, className, style }: IconRendererProps) {
  const Icon: LucideIcon = iconMap[name] ?? Code;
  return <Icon className={className} style={style} aria-hidden="true" />;
}
