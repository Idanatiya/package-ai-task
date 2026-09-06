import { useCallback, useState } from "react";

function clampIndex(index: number, matchCount: number): number {
  if (matchCount === 0) return 0;

  return Math.min(index, matchCount - 1);
}

/**
 * A wrapping cursor over the match list. Takes the count rather than the array
 * so the callbacks only change when the number of matches does.
 */
export function useMatchNavigation(matchCount: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const clampedIndex = clampIndex(activeIndex, matchCount);

  const next = useCallback(() => {
    if (matchCount === 0) return;

    setActiveIndex((index) => {
      const current = clampIndex(index, matchCount);
      const isLastMatch = current === matchCount - 1;

      return isLastMatch ? 0 : current + 1;
    });
  }, [matchCount]);

  const prev = useCallback(() => {
    if (matchCount === 0) return;

    setActiveIndex((index) => {
      const current = clampIndex(index, matchCount);
      const isFirstMatch = current === 0;

      return isFirstMatch ? matchCount - 1 : current - 1;
    });
  }, [matchCount]);

  const reset = useCallback(() => {
    setActiveIndex(0);
  }, []);

  return { activeIndex: clampedIndex, next, prev, reset };
}
