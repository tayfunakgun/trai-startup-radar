export default function AddStartupPage() {
  return (
    <div className="space-y-6">
      <section className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Add Startup
        </h1>
        <p className="text-sm text-slate-600">
          Placeholder form layout for MVP scaffolding.
        </p>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="name">
              Startup Name
            </label>
            <input
              id="name"
              type="text"
              className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="sector">
              Sector
            </label>
            <input
              id="sector"
              type="text"
              className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="city">
              City
            </label>
            <input
              id="city"
              type="text"
              className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="stage">
              Stage
            </label>
            <input
              id="stage"
              type="text"
              className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm"
            />
          </div>
        </div>

        <div className="mt-5 space-y-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="notes">
            Notes
          </label>
          <textarea
            id="notes"
            rows={5}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            Save Startup
          </button>
        </div>
      </section>
    </div>
  );
}
