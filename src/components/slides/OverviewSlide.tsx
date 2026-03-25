import { useState, useEffect } from "react";
import type { Section, OverviewContent } from "../../types/sections";
import RefIcon from "../icons/RefIcon";
import SectionHeader from "./SectionHeader";
import styles from "./OverviewSlide.module.css";

interface OverviewSlideProps {
  section: Section;
}

export default function OverviewSlide({ section }: OverviewSlideProps) {
  const content = section.content as OverviewContent;
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVis(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={styles.container}>
      <SectionHeader title={section.title} subtitle={section.subtitle} visible={vis} />
      <p className={styles.intro} style={{ opacity: vis ? 1 : 0 }}>{content.intro}</p>
      <div className={styles.grid}>
        {content.cards.map((card, i) => (
          <div
            key={i}
            className={styles.card}
            style={{
              borderColor: `${card.color}22`,
              borderWidth: 1,
              borderStyle: "solid",
              opacity: vis ? 1 : 0,
              transform: vis ? "translateY(0)" : "translateY(20px)",
              transition: `all 0.5s var(--ease-out) ${0.3 + i * 0.1}s`,
            }}
          >
            <div className={styles.cardAccent} style={{ background: card.color }} />
            <div className={styles.cardHeader}>
              <div className={styles.cardIconWrap} style={{ background: `${card.color}12` }}>
                <RefIcon type={card.icon} size={18} color={card.color} />
              </div>
              <div>
                <h3 className={styles.cardName} style={{ color: card.color }}>{card.name}</h3>
                <code className={styles.cardParam}>{card.param}</code>
              </div>
              <div className={styles.cardMeta}>
                <div className={styles.cardWeight}>{card.weight}</div>
                <div className={styles.cardDefault}>default: {card.weightDefault}</div>
              </div>
            </div>
            <p className={styles.cardTagline} style={{ color: card.color }}>{card.tagline}</p>
            <p className={styles.cardDesc}>{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
