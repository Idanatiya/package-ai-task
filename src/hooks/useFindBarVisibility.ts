import { useEffect, useState } from "react";

export function useFindBarVisibility() {
  const [isOpen, setIsOpen] = useState(false);

  // Global shortcut: always available
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isCtrlOrCmd = event.metaKey || event.ctrlKey;

      // Ctrl+Shift+F is "find in files" in most tools, so leave that combo alone.
      if (event.key.toLowerCase() === "f" && isCtrlOrCmd && !event.shiftKey) {
        event.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Escape: only while the panel is open
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  return [isOpen, setIsOpen] as const;
}
