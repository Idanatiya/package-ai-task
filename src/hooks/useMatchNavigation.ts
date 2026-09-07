import { useCallback, useState } from "react";

export function useMatchNavigation(totalMatches: number) {
  const [activeIndex, setActiveIndex] = useState(0);

  const hasMatches = totalMatches > 0;
  const lastMatchIndex = totalMatches - 1;

  const next = useCallback(() => {
    if (!hasMatches) return;

    setActiveIndex((index) => (index === lastMatchIndex ? 0 : index + 1));
  }, [hasMatches, lastMatchIndex]);

  const prev = useCallback(() => {
    if (!hasMatches) return;

    setActiveIndex((index) => (index === 0 ? lastMatchIndex : index - 1));
  }, [hasMatches, lastMatchIndex]);

  const reset = useCallback(() => {
    setActiveIndex(0);
  }, []);

  return { activeIndex, next, prev, reset };
}
