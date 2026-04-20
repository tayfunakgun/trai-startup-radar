# TRAI Startup Radar

## Project Purpose
TRAI Startup Radar is a lightweight MVP to help quickly scan and review AI startups in Türkiye for ecosystem tracking and collaboration screening.

## Target User
- TRAI team members running early-stage startup research
- Program and ecosystem stakeholders who need a clear, fast dashboard view

## MVP Scope
- Dashboard view of startup records
- Basic filtering and sorting for quick screening
- Add Startup form for demo-time submissions (session-only)
- Structured startup metadata to support consistent review

## Current Limitations
- No backend or persistent database
- No authentication or role-based access
- No advanced analytics, reporting, or workflow automation
- Demo data is static, and form submissions are temporary per browser session

## Key Design Decisions
- Keep the interface minimal and presentation-friendly
- Prioritize readability over feature density
- Use simple, consistent cards and badges to support quick scanning
- Favor predictable form structure and explicit feedback messages

## How the Startup Data Model Supports the Use Case
The `Startup` model combines identification, context, and evaluation fields in one structure:
- **Identity & context:** `id`, `name`, `sector`, `stage`, `founder`
- **Screening narrative:** `short_description`, `why_relevant_for_trai`
- **Traceability:** `last_reviewed_at`, `source_url`, `tags`
- **Quick scoring:** `score_ecosystem_fit`, `score_innovation`, `score_collaboration`

This enables fast triage, comparability across startups, and case-study-ready summaries without requiring complex infrastructure.

## Future Improvements
- Add persistent storage and CRUD operations
- Introduce authentication and collaboration workflows
- Add richer scoring views and trend insights
- Support export/share options for case-study and stakeholder reporting
