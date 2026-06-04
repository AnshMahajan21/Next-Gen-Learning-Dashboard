import { createClient } from "@supabase/supabase-js";
import type { Course } from "./types";
import { mockCourses } from "./mock-data";

/**
 * Create a server-side Supabase client.
 * Returns null if env vars are not configured (dev without Supabase).
 */
function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  return createClient(url, key);
}

/**
 * Fetch all courses from the `courses` table, ordered by creation date.
 * Falls back to mock data when Supabase is not configured or on error.
 */
export async function getCourses(): Promise<Course[]> {
  const supabase = getSupabaseClient();

  // No credentials → return mock data so the dashboard still renders
  if (!supabase) {
    console.warn(
      "[supabase] NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY not set." +
        " Using mock data."
    );
    return mockCourses;
  }

  try {
    const { data, error } = await supabase
      .from("courses")
      .select("id, title, progress, icon_name, created_at")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("[supabase] Query error:", error.message);
      return mockCourses;
    }

    return (data as Course[]) ?? mockCourses;
  } catch (err) {
    console.error("[supabase] Unexpected error:", err);
    return mockCourses;
  }
}
