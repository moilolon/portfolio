# .zed

Open Zed at the repository root. `settings.json`, `tasks.json`, `debug.json`, `gh-dash.yml`
and this README are versioned; anything else in `.zed/` stays yours and untracked.

## Install

- **Zed** extensions (`zed: extensions`): `sql`, for the Supabase migrations. TypeScript, TSX,
  ESLint, Tailwind CSS (it finds the v4 entry point, `globals.css`, on its own) and the
  JavaScript debugger are built in.
- **Node** LTS and `npm install` at the root.
- **GitHub CLI**, `gh`, and its dashboard: `gh extension install dlvhdr/gh-dash`.
- **Claude Code**: the project's instructions are `CLAUDE.md` and `.claude/`; run `claude` in
  Zed's terminal, or use it through Zed's agent panel.

Secrets come from your git-ignored `.env.local` (see `.claude/rules/file-management.md` for
the variable names).

## Formatting

ESLint is the formatter: `eslint.config.mjs` adds ESLint Stylistic to the Next.js rules, and
its fixes run on save for TypeScript, TSX and JavaScript — there is no Prettier in the project. Two spaces, trailing whitespace removed and a final newline on save.

## Tasks

`task: spawn` (alt-shift-t):

| Task | Runs |
| ---- | ---- |
| Next: Dev | `npm run dev`: the dev server with Turbopack, on http://localhost:3000 |
| Next: Dev (debug) | the same with `NODE_OPTIONS=--inspect`, for the debugger |
| Next: Build | `npm run build`: production build and type check |
| Lint | `npm run lint` |
| GitHub: Dashboard | `gh dash` with `gh-dash.yml`: open and merged pull requests, open issues |

## Debugging

Server code (API routes in `src/app/api/`, server components), in two steps:

1. Run the **Next: Dev (debug)** task. Next.js opens the inspector of the process that serves
   http://localhost:3000 on port **9230** (9229 belongs to the CLI and runs no app code).
2. `debugger: start` (F4) → **Next: Attach server**. Breakpoints are hit when a request reaches
   them; the session reconnects if Next.js restarts the server.

Client components are debugged in the browser's DevTools.
