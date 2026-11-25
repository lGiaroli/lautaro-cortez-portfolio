export type CaseGroup = "lateral" | "other-works";

export const caseGroupNames: Record<CaseGroup, string> = {
  lateral: "Work at Lateral",
  "other-works": "Other Works",
};

export type CaseMedia = {
  src: string;
  alt: string;
  caption?: string;
  orientation?: "portrait";
};

export type CaseSection = {
  id: string;
  title: string;
  body: string[];
  points?: string[];
  media?: CaseMedia;
};

export type CaseStudy = {
  id: string;
  group: CaseGroup;
  title: string;
  subtitle: string;
  summary: string;
  role: string;
  status: string;
  stack?: string[];
  sections: CaseSection[];
  links?: { label: string; href: string }[];
  gallery?: CaseMedia[];
};
