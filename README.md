# Package.ai FE Task -  Idan Atiya 



**Live demo:** [https://musical-macaron-206a74.netlify.app/](https://musical-macaron-206a74.netlify.app/)

Built in **React** instead of Vue, as discussed with Maor.

## Run

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).


## Features

- **Ctrl+F / Cmd+F** — open the find bar; the input is focused and any kept query is selected
- **Esc** or the close button — close the bar (highlights clear; search text is kept for next open)
- Search **message text** and **author** (`from`) from one input
- **Enter** — next match · **Shift+Enter** — previous match
- Wraparound navigation with match counter
- Yellow highlights; active match in orange, scrolled into view on next/prev only
- Avatar initials for people; **Headset** / **LifeBuoy** / **UserRound** icons for Customer Service, Support, and Agent (`lucide-react`)

## Architecture

| Layer | Role |
|---|---|
| `utils/search.ts` | Pure search: `buildMatches` → flat `SearchMatch[]` |
| `hooks/` | `useFindBarVisibility`, `useFindNavigation`, `useMatchNavigation`, `useScrollToActiveMatch` |
| `App.tsx` | Wires state and UI (composition root) |
| `HighlightedText` | Renders highlights via `react-highlight-words` |

**Match model:** Each hit is `{ messageId, field, occurrence }`. Index `N` is the Nth highlight top-to-bottom (sender name before body within a message).

**Performance:** `useDeferredValue` keeps the input instant while highlighting runs at lower priority. `buildMatches` is ~1ms on 250 messages; cost is mostly React re-renders.

## Recommended user flow

1. Open the [live demo](https://musical-macaron-206a74.netlify.app/).
2. Press **Ctrl+F** / **Cmd+F** — the find bar opens, focused, ready to type.
3. Search for a word that appears in several messages (try `order` or a sender name). Highlights appear in message text and author names; the counter shows `1/N`.
4. Press **Enter** (or the down chevron) to jump to the next match. **Shift+Enter** (or the up chevron) goes to the previous one. Navigation wraps. The active hit is orange and scrolls into view.
5. Change the query — the counter resets to the first match of the new term. An empty result shows `0/0` in red.
6. Press **Esc** or the close button. Highlights clear; the query is kept.
7. Open find again — the previous query is still there and selected, so the next key replaces it.
