export default function DashboardSkeleton() {
  return (
    <section aria-label="Loading…" className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <SkeletonBlock className="lg:col-span-2 h-44" />
      <SkeletonBlock className="h-44" />
      <SkeletonBlock className="h-44" />
      <SkeletonBlock className="h-48" />
      <SkeletonBlock className="h-48" />
      <SkeletonBlock className="h-48" />
      <SkeletonBlock className="h-48" />
      <SkeletonBlock className="sm:col-span-2 h-52" />
    </section>
  );
}

function SkeletonBlock({ className }: { className?: string }) {
  return <div className={`tile skeleton ${className ?? ""}`} />;
}
