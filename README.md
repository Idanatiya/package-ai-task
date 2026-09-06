# Package.ai FE Task -  Idan Atiya 

A React chat UI with browser-style find-in-page search (Ctrl+F / Cmd+F).

## Run

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

Production build:

```bash
npm run build
npm run preview
```

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

## Tradeoffs

- No list virtualization (fine for ~250 messages)
