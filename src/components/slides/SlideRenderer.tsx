import type { Section } from "../../types/sections";
import HeroSlide from "./HeroSlide";
import OverviewSlide from "./OverviewSlide";
import DeepDiveSlide from "./DeepDiveSlide";
import CombosSlide from "./CombosSlide";
import WeightsSlide from "./WeightsSlide";
import DecisionSlide from "./DecisionSlide";
import SyntaxSlide from "./SyntaxSlide";
import TipsSlide from "./TipsSlide";
import GlossarySlide from "./GlossarySlide";

interface SlideRendererProps {
  section: Section;
}

export default function SlideRenderer({ section }: SlideRendererProps) {
  switch (section.type) {
    case "hero":
      return <HeroSlide />;
    case "content":
      return <OverviewSlide section={section} />;
    case "deep-dive":
      return <DeepDiveSlide section={section} />;
    case "combos":
      return <CombosSlide section={section} />;
    case "weights":
      return <WeightsSlide section={section} />;
    case "decision":
      return <DecisionSlide section={section} />;
    case "syntax":
      return <SyntaxSlide section={section} />;
    case "tips":
      return <TipsSlide section={section} />;
    case "glossary":
      return <GlossarySlide section={section} />;
    default:
      return null;
  }
}
