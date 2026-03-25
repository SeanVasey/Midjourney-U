import styles from "./SectionHeader.module.css";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  visible: boolean;
  accent?: string;
}

export default function SectionHeader({ title, subtitle, visible, accent }: SectionHeaderProps) {
  const stateClass = visible ? styles.visible : styles.hidden;

  return (
    <div className={stateClass}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <p className={styles.subtitle} style={{ color: accent || "var(--color-style)" }}>
          {subtitle}
        </p>
      </div>
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
}
