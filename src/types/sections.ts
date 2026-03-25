export interface KeyPoint {
  label: string;
  value: string;
}

export interface StyleVersion {
  v: string;
  desc: string;
}

export interface ReferenceCard {
  icon: string;
  name: string;
  param: string;
  color: string;
  tagline: string;
  desc: string;
  weight: string;
  weightDefault: string;
}

export interface OverviewContent {
  intro: string;
  cards: ReferenceCard[];
}

export interface DeepDiveContent {
  what: string;
  how: string;
  syntax: string;
  keyPoints: KeyPoint[];
  tips: string[];
  analogy: string;
  versions?: StyleVersion[];
  important?: string;
}

export interface Combo {
  name: string;
  formula: string;
  desc: string;
  useCase: string;
  signal: "green" | "yellow" | "orange";
}

export interface CombosContent {
  intro: string;
  combos: Combo[];
}

export interface WeightEntry {
  param: string;
  name: string;
  range: string;
  default: string;
  color: string;
  low: string;
  mid: string;
  high: string;
}

export interface WeightsContent {
  intro: string;
  weights: WeightEntry[];
}

export interface DecisionAnswer {
  a: string;
  result: string;
  color: string;
}

export interface DecisionQuestion {
  q: string;
  answers: DecisionAnswer[];
}

export interface DecisionContent {
  questions: DecisionQuestion[];
}

export interface SyntaxTemplate {
  label: string;
  code: string;
  note: string;
}

export interface SyntaxContent {
  templates: SyntaxTemplate[];
}

export interface Tip {
  icon: string;
  title: string;
  body: string;
}

export interface TipsContent {
  tips: Tip[];
}

export interface GlossaryTerm {
  term: string;
  def: string;
}

export interface GlossaryResource {
  name: string;
  url: string;
}

export interface GlossaryContent {
  terms: GlossaryTerm[];
  resources: GlossaryResource[];
}

export type SectionType =
  | "hero"
  | "content"
  | "deep-dive"
  | "combos"
  | "weights"
  | "decision"
  | "syntax"
  | "tips"
  | "glossary";

export interface Section {
  id: string;
  title: string;
  subtitle: string;
  type: SectionType;
  accent?: string;
  icon?: string;
  content?: OverviewContent | DeepDiveContent | CombosContent | WeightsContent | DecisionContent | SyntaxContent | TipsContent | GlossaryContent;
}
