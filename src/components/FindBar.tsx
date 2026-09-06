import { useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import styles from "./FindBar.module.css";

//TODO:Pressing Enter also go to next match

type FindBarProps = {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  matchCount: number;
  activeIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
};

export default function FindBar({
  searchTerm,
  onSearchTermChange,
  matchCount,
  activeIndex,
  onNext,
  onPrev,
  onClose,
}: FindBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // The bar unmounts on close, so mounting is the only time focus is needed.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const hasTerm = searchTerm.trim().length > 0;
  const hasMatches = matchCount > 0;

  return (
    <div className={styles.layer}>
      <div className={styles.aligner}>
        <div className={styles.bar} role="search" aria-label="Find in chat">
          <input
            ref={inputRef}
            className={styles.input}
            type="text"
            value={searchTerm}
            onChange={(event) => onSearchTermChange(event.target.value)}
            placeholder="Find in chat"
            aria-label="Search messages"
          />
          <span
            className={`${styles.counter} ${
              hasTerm && !hasMatches ? styles.counterEmpty : ""
            }`.trim()}
            aria-live="polite"
          >
            {hasTerm ? `${hasMatches ? activeIndex + 1 : 0}/${matchCount}` : ""}
          </span>
          <span className={styles.divider} />
          <button
            type="button"
            className={styles.button}
            onClick={onPrev}
            disabled={!hasMatches}
            aria-label="Previous match"
          >
            <ChevronUp size={16} />
          </button>
          <button
            type="button"
            className={styles.button}
            onClick={onNext}
            disabled={!hasMatches}
            aria-label="Next match"
          >
            <ChevronDown size={16} />
          </button>
          <button
            type="button"
            className={styles.button}
            onClick={onClose}
            aria-label="Close find bar"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
