import {
  useCallback,
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import Highlighter from "react-highlight-words";
import styles from "./HighlightedText.module.css";

type HighlightedTextProps = {
  text: string;
  searchTerm: string;
  activeOccurrence: number | null;
};

type HighlightTagProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  highlightIndex?: number;
};

export default function HighlightedText({
  text,
  searchTerm,
  activeOccurrence,
}: HighlightedTextProps) {
  const term = searchTerm.trim();
  const activeRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (activeOccurrence === null) return;
    activeRef.current?.scrollIntoView({ block: "center" });
  }, [activeOccurrence]);

  const Mark = useCallback(
    ({ highlightIndex, children, className, style }: HighlightTagProps) => (
      <mark
        ref={highlightIndex === activeOccurrence ? activeRef : undefined}
        className={className}
        style={style}
      >
        {children}
      </mark>
    ),
    [activeOccurrence],
  );

  if (!term) return <>{text}</>;

  return (
    <Highlighter
      searchWords={[term]}
      textToHighlight={text}
      autoEscape
      highlightTag={activeOccurrence === null ? "mark" : Mark}
      highlightClassName={styles.match}
      activeClassName={styles.active}
      activeIndex={activeOccurrence ?? -1}
    />
  );
}
