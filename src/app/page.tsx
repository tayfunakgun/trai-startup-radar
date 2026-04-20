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
    { title: "Sectors Tracked", value: sectorsTracked.toString() }
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

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
          <label className="space-y-1 text-sm">
            <span className="font-medium text-slate-700">Search by startup name</span>
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="e.g. Anatolia Vision AI"
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none ring-slate-300 transition focus:ring-2"
            />
          </label>
          <label className="space-y-1 text-sm">
            <span className="font-medium text-slate-700">Sector</span>
            <select
              value={sectorFilter}
              onChange={(event) => setSectorFilter(event.target.value)}
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none ring-slate-300 transition focus:ring-2"
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
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none ring-slate-300 transition focus:ring-2"
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
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none ring-slate-300 transition focus:ring-2"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </label>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">Startup Grid</h2>
        {filteredStartups.length === 0 ? (
          <div className="mt-4 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <p className="text-base font-medium text-slate-800">
              No startups match the current filters and search
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
