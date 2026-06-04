import { Suspense } from "react";
import { getCourses } from "@/lib/supabase";
import type { Course } from "@/lib/types";

import Sidebar           from "@/components/sidebar/Sidebar";
import HeroSection       from "@/components/sections/HeroSection";
import MissionSection    from "@/components/sections/MissionSection";
import PlatformStats     from "@/components/sections/PlatformStats";
import DashboardHeader   from "@/components/sections/DashboardHeader";
import { QuoteFooter, SiteFooter } from "@/components/sections/QuoteFooter";
import DashboardContent  from "@/components/DashboardContent";
import DashboardSkeleton from "@/components/ui/SkeletonTile";

/* Server Component that suspends to fetch courses */
async function CourseFetcher() {
  const courses: Course[] = await getCourses();
  return <DashboardContent courses={courses} />;
}

export default function Page() {
  return (
    <div className="flex min-h-dvh bg-[var(--bg-base)]">
      {/* Fixed sidebar */}
      <Sidebar />

      {/* Main scrollable content — offset for sidebar */}
      <main className="flex-1 md:ml-[240px] min-w-0 pb-24 md:pb-0">

        {/* 1. Cinematic hero */}
        <HeroSection />

        {/* 2. Mission + Philosophy */}
        <MissionSection />

        {/* 3. Platform stats row */}
        <PlatformStats />

        {/* 4. Dashboard reveal */}
        <DashboardHeader />

        {/* 5. Dashboard tiles — Suspense boundary for Supabase */}
        <section className="section-px pb-8 space-y-5">
          <Suspense fallback={<DashboardSkeleton />}>
            <CourseFetcher />
          </Suspense>
        </section>

        {/* 6. Quote closer */}
        <QuoteFooter />
        <SiteFooter />
      </main>
    </div>
  );
}
