export type Startup = {
  id: string;
  name: string;
  sector: string;
  stage: string;
  founder: string;
  short_description: string;
  why_relevant_for_trai: string;
  last_reviewed_at: string;
  source_url: string;
  tags: string[];
  score_ecosystem_fit: number;
  score_innovation: number;
  score_collaboration: number;
};
