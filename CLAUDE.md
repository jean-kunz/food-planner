# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

Web app to help a family plan meals. Frontend talks to Supabase directly — there is no custom backend. See `README.md`.

## Toolchain

Node and pnpm versions are pinned in `mise.toml` (node 22, pnpm 10). Run commands via `mise exec -- <cmd>` if the shell hasn't activated mise.

- `pnpm dev` — Vite dev server
- `pnpm build` — production build (uses `@sveltejs/adapter-auto`, so the target is picked from the host; swap the adapter before deploying)
- `pnpm preview` — preview the production build
- `pnpm check` — `svelte-kit sync` + `svelte-check` (typecheck Svelte + TS)

No test runner is wired up yet.

## Architecture

- **SvelteKit 2 + Svelte 5 (runes) + TypeScript**, styled with **Tailwind 4** via `@tailwindcss/vite` (imported through `src/app.css`, no `tailwind.config.js` needed in v4).
- **Supabase client** lives in `src/lib/supabase.ts` and is imported wherever the UI needs auth or data. Auth flows (password + Google OAuth) run entirely in the browser against Supabase — no server-side session handling, no `@supabase/ssr`.
- Env access uses `$env/dynamic/public` (not `static`) so the module resolves at runtime. `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY` must be set in `.env` (see `.env.example`).
- Routes: `/` (home), `/login` (existing users — email+password or Google), `/signin` (sign up — email+password or Google).

## Sandbox note for Claude Code

The Claude Code sandbox denies reads of `.env` files, so `svelte-kit sync` run from here cannot populate `$env/static/public` types — which is why `supabase.ts` uses `$env/dynamic/public`. If you switch to `static`, `pnpm check` will fail inside the sandbox even though it works in the user's normal shell.
