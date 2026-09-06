import { findAll } from "highlight-words-core";
import type { ChatMessageItem, SearchMatch } from "../types/chat";

/**
 * Counts with the same function react-highlight-words renders with, so the
 * occurrence indices here can never drift from the rendered chunks.
 */
export function countMatches(text: string, searchTerm: string): number {
  return findAll({
    searchWords: [searchTerm],
    textToHighlight: text,
    autoEscape: true,
  }).filter((chunk) => chunk.highlight).length;
}

/**
 * Flattens every hit into one array ordered the way it reads on screen:
 * messages top to bottom, and within a message the sender label before the
 * body. Index N is therefore the Nth highlight when scrolling down.
 */
export function buildMatches(
  messages: ChatMessageItem[],
  searchTerm: string,
): SearchMatch[] {
  const term = searchTerm.trim();
  if (!term) return [];

  const matches: SearchMatch[] = [];

  for (const message of messages) {
    const fromHits = countMatches(message.from, term);
    for (let i = 0; i < fromHits; i++) {
      matches.push({ messageId: message.id, field: "from", occurrence: i });
    }

    const textHits = countMatches(message.text, term);
    for (let i = 0; i < textHits; i++) {
      matches.push({ messageId: message.id, field: "text", occurrence: i });
    }
  }

  return matches;
}
