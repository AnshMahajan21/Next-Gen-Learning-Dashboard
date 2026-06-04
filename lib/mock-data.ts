import type { Course } from "./types";

export const mockCourses: Course[] = [
  {
    id: "mock-1",
    title: "Advanced React Patterns",
    progress: 75,
    icon_name: "Code",
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: "mock-2",
    title: "System Design Fundamentals",
    progress: 42,
    icon_name: "Layers",
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: "mock-3",
    title: "TypeScript Deep Dive",
    progress: 90,
    icon_name: "FileCode",
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "mock-4",
    title: "Database Architecture",
    progress: 28,
    icon_name: "Database",
    created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
];
