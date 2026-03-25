import MJIcon from "../icons/MJIcon";
import styles from "./HeaderBar.module.css";

interface HeaderBarProps {
  sectionTitle: string;
}

export default function HeaderBar({ sectionTitle }: HeaderBarProps) {
  return (
    <div className={styles.header}>
      <div className={styles.icon}>
        <MJIcon size={16} />
      </div>
      <span className={styles.brand}>Midjourney</span>
      <span className={styles.brandU}>U</span>
      <span className={styles.sectionName}>
        {sectionTitle.replace(/^[^\w]+ /, "")}
      </span>
    </div>
  );
}
