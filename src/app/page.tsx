import { mockStartups } from "@/data/mock-startups";

export default function Home() {
  const startups = mockStartups;
  const activeFilters = {
    sector: "All",
    stage: "All",
  };

  const filteredStartups = startups.filter((startup) => {
    const matchesSector =
      activeFilters.sector === "All" || startup.sector === activeFilters.sector;
    const matchesStage =
      activeFilters.stage === "All" || startup.stage === activeFilters.stage;

    return matchesSector && matchesStage;
  });

  const reviewedThisWeek = startups.filter((startup) => {
    const reviewedDate = new Date(startup.last_reviewed_at);
    const now = new Date();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 7);

    return reviewedDate >= sevenDaysAgo && reviewedDate <= now;
  }).length;

  const sectorsTracked = new Set(startups.map((startup) => startup.sector)).size;

  const summaryCards = [
    { title: "Total Startups", value: startups.length.toString() },
    { title: "Reviewed This Week", value: reviewedThisWeek.toString() },
    { title: "Sectors Tracked", value: sectorsTracked.toString() },
  ];

  return (
    <div className="space-y-6">
      <section className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Startup Dashboard
        </h1>
        <p className="text-sm text-slate-600">
          AI startup landscape relevant to Türkiye for TRAI MVP screening.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {summaryCards.map((card) => (
          <article
            key={card.title}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-slate-500">{card.title}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {card.value}
            </p>
          </article>
        ))}
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">Filters</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
            Sector: {activeFilters.sector}
          </div>
          <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
            Stage: {activeFilters.stage}
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">Startup Grid</h2>
        {filteredStartups.length === 0 ? (
          <div className="mt-4 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <p className="text-base font-medium text-slate-800">
              No startups match the current filters
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Try broadening the filter criteria to see more records.
            </p>
          </div>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredStartups.map((startup) => (
              <article
                key={startup.id}
                className="rounded-lg border border-slate-200 bg-slate-50 p-4"
              >
                <h3 className="text-base font-semibold text-slate-900">
                  {startup.name}
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  {startup.sector} · {startup.stage}
                </p>
                <p className="mt-3 text-sm text-slate-700">
                  {startup.short_description}
                </p>
                <p className="mt-3 text-sm text-slate-700">
                  <span className="font-medium text-slate-900">
                    Why relevant for TRAI:
                  </span>{" "}
                  {startup.why_relevant_for_trai}
                </p>
                <p className="mt-3 text-xs text-slate-500">
                  Last reviewed:{" "}
                  {new Date(startup.last_reviewed_at).toLocaleDateString("en-GB")}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
