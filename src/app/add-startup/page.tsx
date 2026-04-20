"use client";

import { useState } from "react";
import type { Startup } from "@/types/startup";

type FormValues = {
  name: string;
  sector: string;
  stage: string;
  founder: string;
  short_description: string;
  why_relevant_for_trai: string;
  source_url: string;
  last_reviewed_at: string;
  tags: string;
  score_ecosystem_fit: string;
  score_innovation: string;
  score_collaboration: string;
};

const initialFormValues: FormValues = {
  name: "",
  sector: "",
  stage: "",
  founder: "",
  short_description: "",
  why_relevant_for_trai: "",
  source_url: "",
  last_reviewed_at: "",
  tags: "",
  score_ecosystem_fit: "",
  score_innovation: "",
  score_collaboration: "",
};

export default function AddStartupPage() {
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [sessionSavedStartup, setSessionSavedStartup] = useState<Startup | null>(
    null,
  );

  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormValues((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      setSubmitSuccess("");
      setSubmitError("Please complete all required fields correctly.");
      return;
    }

    const tags = formValues.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const startupForSession: Startup = {
      id: `tmp-${Date.now()}`,
      name: formValues.name.trim(),
      sector: formValues.sector.trim(),
      stage: formValues.stage.trim(),
      founder: formValues.founder.trim(),
      short_description: formValues.short_description.trim(),
      why_relevant_for_trai: formValues.why_relevant_for_trai.trim(),
      source_url: formValues.source_url.trim(),
      last_reviewed_at: formValues.last_reviewed_at,
      tags,
      score_ecosystem_fit: formValues.score_ecosystem_fit
        ? Number(formValues.score_ecosystem_fit)
        : 0,
      score_innovation: formValues.score_innovation
        ? Number(formValues.score_innovation)
        : 0,
      score_collaboration: formValues.score_collaboration
        ? Number(formValues.score_collaboration)
        : 0,
    };

    setSessionSavedStartup(startupForSession);
    setSubmitError("");
    setSubmitSuccess(
      "Startup captured for this browser session only. No database persistence in this MVP.",
    );
    setFormValues(initialFormValues);
  };

  return (
    <div className="space-y-6">
      <section className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Add Startup
        </h1>
        <p className="text-sm text-slate-600">
          Submit startup details for MVP demo input. Entries are temporary in this
          browser session only.
        </p>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="name">
                Startup Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formValues.name}
                onChange={handleFieldChange}
                required
                placeholder="e.g. Anatolia Vision AI"
                className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="sector">
                Sector *
              </label>
              <input
                id="sector"
                name="sector"
                type="text"
                value={formValues.sector}
                onChange={handleFieldChange}
                required
                placeholder="e.g. HealthTech"
                className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="stage">
                Stage *
              </label>
              <input
                id="stage"
                name="stage"
                type="text"
                value={formValues.stage}
                onChange={handleFieldChange}
                required
                placeholder="e.g. Seed"
                className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="founder">
                Founder *
              </label>
              <input
                id="founder"
                name="founder"
                type="text"
                value={formValues.founder}
                onChange={handleFieldChange}
                required
                placeholder="e.g. Aylin Demir"
                className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="short_description"
              >
                Short Description *
              </label>
              <textarea
                id="short_description"
                name="short_description"
                rows={3}
                value={formValues.short_description}
                onChange={handleFieldChange}
                required
                placeholder="What does the startup do in 1-2 sentences?"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="why_relevant_for_trai"
              >
                Why relevant for TRAI *
              </label>
              <textarea
                id="why_relevant_for_trai"
                name="why_relevant_for_trai"
                rows={3}
                value={formValues.why_relevant_for_trai}
                onChange={handleFieldChange}
                required
                placeholder="Explain expected relevance to TRAI ecosystem goals."
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
              />
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="source_url"
              >
                Source URL *
              </label>
              <input
                id="source_url"
                name="source_url"
                type="url"
                value={formValues.source_url}
                onChange={handleFieldChange}
                required
                placeholder="https://example.com/startup"
                className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm"
              />
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="last_reviewed_at"
              >
                Last Reviewed Date *
              </label>
              <input
                id="last_reviewed_at"
                name="last_reviewed_at"
                type="date"
                value={formValues.last_reviewed_at}
                onChange={handleFieldChange}
                required
                className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="tags">
                Tags (optional)
              </label>
              <input
                id="tags"
                name="tags"
                type="text"
                value={formValues.tags}
                onChange={handleFieldChange}
                placeholder="Comma-separated, e.g. nlp, healthcare, b2b"
                className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm"
              />
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="score_ecosystem_fit"
              >
                Ecosystem Fit Score (optional)
              </label>
              <input
                id="score_ecosystem_fit"
                name="score_ecosystem_fit"
                type="number"
                min={0}
                max={10}
                step={1}
                value={formValues.score_ecosystem_fit}
                onChange={handleFieldChange}
                placeholder="0-10"
                className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm"
              />
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="score_innovation"
              >
                Innovation Score (optional)
              </label>
              <input
                id="score_innovation"
                name="score_innovation"
                type="number"
                min={0}
                max={10}
                step={1}
                value={formValues.score_innovation}
                onChange={handleFieldChange}
                placeholder="0-10"
                className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm"
              />
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="score_collaboration"
              >
                Collaboration Score (optional)
              </label>
              <input
                id="score_collaboration"
                name="score_collaboration"
                type="number"
                min={0}
                max={10}
                step={1}
                value={formValues.score_collaboration}
                onChange={handleFieldChange}
                placeholder="0-10"
                className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm"
              />
            </div>
          </div>

          {(submitError || submitSuccess) && (
            <div
              className={`rounded-md border px-3 py-2 text-sm ${
                submitError
                  ? "border-rose-200 bg-rose-50 text-rose-700"
                  : "border-emerald-200 bg-emerald-50 text-emerald-700"
              }`}
              role="status"
            >
              {submitError || submitSuccess}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white"
            >
              Save Startup
            </button>
          </div>
        </form>
      </section>

      {sessionSavedStartup && (
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-base font-semibold text-slate-900">
            Latest Demo Submission
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Stored temporarily in page state for demo purposes only.
          </p>
          <div className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
            <p>
              <span className="font-medium text-slate-900">Startup:</span>{" "}
              {sessionSavedStartup.name}
            </p>
            <p>
              <span className="font-medium text-slate-900">Sector:</span>{" "}
              {sessionSavedStartup.sector}
            </p>
            <p>
              <span className="font-medium text-slate-900">Stage:</span>{" "}
              {sessionSavedStartup.stage}
            </p>
            <p>
              <span className="font-medium text-slate-900">Founder:</span>{" "}
              {sessionSavedStartup.founder}
            </p>
            <p className="sm:col-span-2">
              <span className="font-medium text-slate-900">Source:</span>{" "}
              <a
                href={sessionSavedStartup.source_url}
                target="_blank"
                rel="noreferrer"
                className="text-slate-900 underline"
              >
                {sessionSavedStartup.source_url}
              </a>
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
