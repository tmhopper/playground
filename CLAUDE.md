# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UIGen is an AI-powered React component generator with live preview. Users chat with Claude to generate React components, which are rendered in a sandboxed iframe with zero disk I/O.

## Commands

```bash
npm run dev          # Start dev server (Turbopack + node-compat shim)
npm run build        # Production build
npm run lint         # ESLint
npm run test         # Vitest (unit tests)
npm run setup        # First-time: install deps + Prisma generate + migrate
npm run db:reset     # Reset SQLite DB (destructive)
```

Run a single test file: `npx vitest src/lib/__tests__/file-system.test.ts`

## Architecture

### Core Data Flow

1. User sends prompt → `POST /api/chat` with serialized virtual file system
2. API calls Claude (claude-haiku-4-5) via Vercel AI SDK, streaming the response
3. Claude invokes tools to mutate the virtual FS (`str_replace_editor`, `file_manager`)
4. Client applies tool results to its in-memory `VirtualFileSystem` instance
5. `PreviewFrame` transpiles JSX via Babel and renders in a sandboxed iframe

### Key Modules

- **`src/lib/file-system.ts`** — `VirtualFileSystem` class: in-memory Map-based FS, no disk writes. `.serialize()`/`.deserializeFromNodes()` used for DB persistence and API transport. Note: the older `.deserialize()` expects `Record<string, string>`; `.deserializeFromNodes()` expects `Record<string, FileNode>` — don't mix them.
- **`src/lib/provider.ts`** — `getLanguageModel()`: returns real Anthropic client or `MockLanguageModel` (no API key = demo mode). Mock mode runs a fixed 4-step agentic loop with character-by-character streaming; real API allows up to 40 steps.
- **`src/lib/transform/jsx-transformer.ts`** — Babel standalone transforms JSX in-browser; `createPreviewHTML()` builds iframe content with an ESM import map. Local files become blob URLs; third-party imports resolve to `https://esm.sh/{package}`. CSS imports are **stripped before the Babel transform** and injected as a single `<style>` tag instead.
- **`src/lib/tools/`** — Tool schemas for `str_replace_editor` (create/view/str_replace/insert) and `file_manager` (rename/delete).
- **`src/lib/prompts/generation.tsx`** — System prompt with `cacheControl: { type: "ephemeral" }` for Anthropic prompt caching. Constrains Claude: root entrypoint must be `/App.jsx`, use Tailwind only, use `@/` alias.
- **`src/app/api/chat/route.ts`** — Streaming API route; exports `maxDuration = 120` for Vercel timeout. The `onFinish` hook runs after the full agentic loop and uses `appendResponseMessages()` to reconstruct history before Prisma persistence.

### Tool Call Flow

Tool results are not sent back in the request body — they stream back through SSE and the client reconstructs them:

```
route.ts: streamText() yields tool-call stream parts
    ↓
chat-context.tsx: onToolCall hook fires → handleToolCall()
    ↓
FileSystemContext: dispatches to str_replace_editor or file_manager handler
    ↓
VirtualFileSystem mutated in-memory → refreshTrigger state change → PreviewFrame re-renders
```

### State Management

Two React contexts (no Redux):
- **`ChatContext`** (`src/lib/contexts/chat-context.tsx`) — wraps Vercel AI SDK's `useChat`, manages message state and routes tool call results to FileSystemContext.
- **`FileSystemContext`** (`src/lib/contexts/file-system-context.tsx`) — holds the `VirtualFileSystem` instance, selected file, and exposes CRUD methods to components.

### Layout

Three-panel resizable layout (`src/app/main-content.tsx`):
- Left: Chat interface
- Right top tab: Preview (iframe) or Code (Monaco editor + file tree)

### Preview Entry Point Detection

`PreviewFrame` searches in order: `/App.jsx` → `/App.tsx` → `/index.jsx` → `/index.tsx` → `/src/App.jsx` → first `.jsx`/`.tsx` file found. The generation system prompt enforces `/App.jsx` as the contract, so this order matters when debugging preview failures.

The iframe sandbox uses `allow-scripts allow-same-origin allow-forms` — `allow-same-origin` is required for blob URL loading and must not be removed.

### Auth & Persistence

- JWT in HTTP-only cookies via `jose` (`src/lib/auth.ts`)
- SQLite + Prisma (`prisma/schema.prisma`): `User` and `Project` models
- `Project.data` stores `fileSystem.serialize()` JSON (`FileNode` format); `Project.messages` stores chat history JSON
- Unauthenticated users get an ephemeral session (no DB persistence)

### node-compat Shim

`node-compat.cjs` deletes `globalThis.localStorage`/`globalThis.sessionStorage` at server startup. Node 25+ exposes these globals via an experimental Web Storage API, but without `--localstorage-file` they're non-functional and cause SSR crashes. All `dev`/`build`/`start` scripts inject this via `NODE_OPTIONS='--require ./node-compat.cjs'` — do not remove it.

### Tests

Tests are colocated in `__tests__/` directories next to source files (e.g., `src/lib/__tests__/`, `src/components/chat/__tests__/`). Vitest uses `jsdom` environment with React Testing Library.

### Path Aliases

`@/` maps to `src/` (configured in `tsconfig.json` and `components.json`).

## Environment

`.env` requires `ANTHROPIC_API_KEY` for real AI responses; omitting it activates mock mode. `JWT_SECRET` defaults to `'development-secret-key'` if unset.
