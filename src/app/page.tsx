"use client";

import { useMemo, useState } from "react";
import { mockStartups } from "@/data/mock-startups";

export default function Home() {
  const startups = mockStartups;
  const [sectorFilter, setSectorFilter] = useState("All");
  const [stageFilter, setStageFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const sectorOptions = useMemo(
    () => ["All", ...Array.from(new Set(startups.map((startup) => startup.sector))).sort()],
    [startups],
  );

  const stageOptions = useMemo(
    () => ["All", ...Array.from(new Set(startups.map((startup) => startup.stage))).sort()],
    [startups],
  );

  const filteredStartups = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return startups
      .filter((startup) => {
        const matchesSector = sectorFilter === "All" || startup.sector === sectorFilter;
        const matchesStage = stageFilter === "All" || startup.stage === stageFilter;
        const matchesSearch =
          normalizedSearch.length === 0 ||
          startup.name.toLowerCase().includes(normalizedSearch);

        return matchesSector && matchesStage && matchesSearch;
      })
      .sort((a, b) => {
        const dateA = new Date(a.last_reviewed_at).getTime();
        const dateB = new Date(b.last_reviewed_at).getTime();

        return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
      });
  }, [searchQuery, sectorFilter, sortOrder, stageFilter, startups]);

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
    { title: "Matching Records", value: filteredStartups.length.toString() },
    { title: "Reviewed This Week", value: reviewedThisWeek.toString() },
    { title: "Sectors Tracked", value: sectorsTracked.toString() },
  ];

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Startup Dashboard
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-slate-600">
          AI startup landscape relevant to Türkiye for TRAI MVP screening.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <article
            key={card.title}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
          >
            <p className="text-sm font-medium text-slate-500">{card.title}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
              {card.value}
            </p>
          </article>
        ))}
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <h2 className="text-base font-semibold text-slate-900">Filters</h2>
        <p className="mt-1 text-sm text-slate-600">
          Narrow results by name, sector, stage, and review date order.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="space-y-1 text-sm">
            <span className="font-medium text-slate-700">Search by startup name</span>
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="e.g. Anatolia Vision AI"
              className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-slate-900 outline-none ring-slate-300 transition focus:ring-2"
            />
          </label>
          <label className="space-y-1 text-sm">
            <span className="font-medium text-slate-700">Sector</span>
            <select
              value={sectorFilter}
              onChange={(event) => setSectorFilter(event.target.value)}
              className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-slate-900 outline-none ring-slate-300 transition focus:ring-2"
            >
              {sectorOptions.map((sector) => (
                <option key={sector} value={sector}>
                  {sector}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-1 text-sm">
            <span className="font-medium text-slate-700">Stage</span>
            <select
              value={stageFilter}
              onChange={(event) => setStageFilter(event.target.value)}
              className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-slate-900 outline-none ring-slate-300 transition focus:ring-2"
            >
              {stageOptions.map((stage) => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-1 text-sm">
            <span className="font-medium text-slate-700">Sort by last reviewed</span>
            <select
              value={sortOrder}
              onChange={(event) =>
                setSortOrder(event.target.value as "newest" | "oldest")
              }
              className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-slate-900 outline-none ring-slate-300 transition focus:ring-2"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </label>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-base font-semibold text-slate-900">Startup Grid</h2>
          <p className="inline-flex w-fit rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
            Showing {filteredStartups.length} of {startups.length}
          </p>
        </div>
        {filteredStartups.length === 0 ? (
          <div className="mt-5 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-center sm:p-8">
            <p className="text-base font-medium text-slate-800">
              No startups match your current filters.
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Clear one or more filters to see a broader list.
            </p>
          </div>
        ) : (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredStartups.map((startup) => (
              <article
                key={startup.id}
                className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
              >
                <h3 className="text-base font-semibold text-slate-900">
                  {startup.name}
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700">
                    {startup.sector}
                  </span>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700">
                    {startup.stage}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-700">
                  {startup.short_description}
                </p>
                <p className="mt-3 text-sm text-slate-700">
                  <span className="font-medium text-slate-900">
                    Why relevant for TRAI:
                  </span>{" "}
                  {startup.why_relevant_for_trai}
                </p>
                {startup.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {startup.tags.map((tag) => (
                      <span
                        key={`${startup.id}-${tag}`}
                        className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-600"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
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
