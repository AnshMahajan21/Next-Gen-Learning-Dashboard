// Matches the Supabase `courses` table schema
export interface Course {
  id: string;
  title: string;
  progress: number;        // 0–100
  icon_name: string;       // Lucide icon name e.g. "Code", "Layers"
  created_at: string;
}

// Student profile (static / from auth in production)
export interface Student {
  name: string;
  streak: number;          // consecutive days
  avatarUrl?: string;
}

// For quick-stat tiles
export interface Stat {
  label: string;
  value: string;
  change: string;          // e.g. "+2.3"
  positive?: boolean;
  unit?: string;
}

// Supabase DB response wrapper
export interface SupabaseResponse<T> {
  data: T | null;
  error: { message: string } | null;
}
