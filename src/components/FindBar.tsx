import { useEffect, useRef } from "react";
import clsx from "clsx";
import FindBarActions from "./FindBarActions";
import styles from "./FindBar.module.css";

type FindBarProps = {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  isPending: boolean;
  matchCount: number;
  activeIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
};

export default function FindBar({
  searchTerm,
  onSearchTermChange,
  isPending,
  matchCount,
  activeIndex,
  onNext,
  onPrev,
  onClose,
}: FindBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    input.focus();
    input.select();
  }, []);

  const hasTerm = searchTerm.trim().length > 0;
  const hasMatches = matchCount > 0;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter" || !hasMatches) return;

    event.preventDefault();
    if (event.shiftKey) {
      onPrev();
    } else {
      onNext();
    }
  };

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
            onKeyDown={handleKeyDown}
            placeholder="Find in chat"
            autoComplete="off"
            spellCheck={false}
            aria-label="Search messages"
          />
          <span
            className={clsx(
              styles.counter,
              isPending && styles.counterPending,
              hasTerm && !hasMatches && !isPending && styles.counterEmpty,
            )}
            aria-live="polite"
          >
            {hasTerm ? `${hasMatches ? activeIndex + 1 : 0}/${matchCount}` : ""}
          </span>
          <span className={styles.divider} />
          <FindBarActions
            hasMatches={hasMatches}
            onPrev={onPrev}
            onNext={onNext}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
}
