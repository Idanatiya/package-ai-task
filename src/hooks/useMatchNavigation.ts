import { useCallback, useState } from "react";

/**
 * A wrapping cursor over the match list. Takes the count rather than the array
 * so the callbacks only change when the number of matches does.
 */
export function useMatchNavigation(matchCount: number) {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = useCallback(() => {
    if (matchCount === 0) return;

    setActiveIndex((index) => {
      const isLastMatch = index === matchCount - 1;

      return isLastMatch ? 0 : index + 1;
    });
  }, [matchCount]);

  const prev = useCallback(() => {
    if (matchCount === 0) return;

    setActiveIndex((index) => {
      const isFirstMatch = index === 0;

      return isFirstMatch ? matchCount - 1 : index - 1;
    });
  }, [matchCount]);

  const reset = useCallback(() => {
    setActiveIndex(0);
  }, []);

  return { activeIndex, next, prev, reset };
}
