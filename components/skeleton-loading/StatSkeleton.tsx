"use client";

function StatCardSkeleton() {
  return (
    <div className="relative flex flex-col gap-4 p-6 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
      {/* Shimmer Effect Overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/60 to-transparent" />

      <div className="flex justify-between items-start">
        {/* Icon Header Skeleton */}
        <div className="w-11 h-11 rounded-xl bg-gray-100 animate-pulse" />

        {/* Progress Circle Skeleton (Optional appearance) */}
        <div className="w-12 h-12 rounded-full border-[3px] border-gray-50 flex items-center justify-center animate-pulse">
           <div className="w-6 h-2 bg-gray-100 rounded" />
        </div>
      </div>

      <div className="space-y-3">
        {/* Value Skeleton */}
        <div className="h-8 lg:h-9 w-24 bg-gray-100 rounded-lg animate-pulse" />
        {/* Label Skeleton */}
        <div className="h-4 w-32 bg-gray-50 rounded-md animate-pulse" />
      </div>
    </div>
  );
}

// Helper to render multiple skeletons
export function StatCardsLoading() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {[...Array(4)].map((_, i) => (
        <StatCardSkeleton key={i} />
      ))}
    </section>
  );
}
