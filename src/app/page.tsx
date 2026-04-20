export default function Home() {
  const summaryCards = [
    { title: "Total Startups", value: "—" },
    { title: "Reviewed This Week", value: "—" },
    { title: "Priority Watchlist", value: "—" },
  ];

  return (
    <div className="space-y-6">
      <section className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Startup Dashboard
        </h1>
        <p className="text-sm text-slate-600">
          Placeholder MVP scaffold for startup tracking.
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
          <div className="h-10 rounded-md border border-slate-200 bg-slate-50" />
          <div className="h-10 rounded-md border border-slate-200 bg-slate-50" />
          <div className="h-10 rounded-md border border-slate-200 bg-slate-50" />
          <div className="h-10 rounded-md border border-slate-200 bg-slate-50" />
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">Startup Grid</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <article
              key={index}
              className="rounded-lg border border-slate-200 bg-slate-50 p-4"
            >
              <div className="h-4 w-2/3 rounded bg-slate-200" />
              <div className="mt-3 h-3 w-1/2 rounded bg-slate-200" />
              <div className="mt-3 h-3 w-5/6 rounded bg-slate-200" />
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
