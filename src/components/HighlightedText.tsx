import Highlighter from "react-highlight-words";
import styles from "./HighlightedText.module.css";

type HighlightedTextProps = {
  text: string;
  searchTerm: string;
  /** Index of the hit to mark as active, or null when none of them is. */
  activeOccurrence: number | null;
};

export default function HighlightedText({
  text,
  searchTerm,
  activeOccurrence,
}: HighlightedTextProps) {
  const term = searchTerm.trim();
  if (!term) return <>{text}</>;

  return (
    <Highlighter
      searchWords={[term]}
      textToHighlight={text}
      autoEscape
      highlightClassName={styles.match}
      activeClassName={styles.active}
      activeIndex={activeOccurrence ?? -1}
    />
  );
}
