# Git Workflow

Repository: `moilolon/portfolio`. Default branch: `main`, deployed by Vercel.

## Branches

Format: `<type>/<short-description>` (lowercase, kebab-case), always off `main`.

Types: `feature`, `bugfix`, `hotfix`, `refactor`, `docs`, `style`, `test`, `chore`.

Examples: `feature/add-dark-mode`, `bugfix/fix-mobile-nav`, `chore/migrate-cline-to-claude`.

One branch per feature or fix; keep it short-lived and synced with `main`.

## Commits

Conventional format, imperative, lowercase description:

```text
type(scope): description

[optional body: the why, when not obvious]
```

Types: `feature`, `bugfix`, `docs`, `style`, `refactor`, `test`, `chore`
(history also has `feat` / `fix`; prefer the list above).

Examples: `feature(projects): add filtering by technology`,
`bugfix(navbar): close the mobile menu after navigation`.

- `npm run lint` must pass before committing.
- CI and the local machine must run the same Node major (today 25, with npm 11): the workflows
  in `.github/workflows/` pin it in `node-version`. A `package-lock.json` written by one npm
  major can be rejected by `npm ci` on another, and then CI fails before the lint runs. When
  the local Node changes major, change the workflows too.
- Commit or push only when the user asks.

## Pull requests

- Title: `type: Description` (e.g. `feat: Add Vercel Analytics and Speed Insights for monitoring`),
  squash-merged into `main` — GitHub appends `(#N)`.
- Description: what changed, why, how to test; screenshots for UI.
- CI (`Code Review Assistant`) runs the lint on the branch; it must be green.
