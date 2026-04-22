// app/dashboard/page.tsx
import JobDescriptionForm from "@/components/admin/JobDescriptionForm";
import { StatCardsLoading } from "@/components/skeleton-loading/StatSkeleton";
import { STATS } from "@/constants";
import { StatCard } from "@/features/dashboard/StatCard";
import { Suspense } from "react";


export default function Dashboard() {
  return (
    <section className="mb-8 space-y-8">
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {STATS.map((stat, idx) => (
        <Suspense key={idx} fallback={<StatCardsLoading />}>
          <StatCard key={idx} {...stat} />
        </Suspense>
      ))}
    </section>
    <section>
      <JobDescriptionForm />
    </section>
    </section>
  );
}
