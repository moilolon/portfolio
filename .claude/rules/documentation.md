# Documentation

`CLAUDE.md` is loaded automatically; everything else is read **on demand**.

## Where things are

| Need | Read |
| ---- | ---- |
| Stack, architecture, commands, critical conventions | `CLAUDE.md` |
| How to write code here | `.claude/rules/nextjs-development.md` |
| Database | `.claude/rules/supabase.md` + `supabase/migrations/` |
| Editor setup and tasks | `.zed/README.md` |
| What the site offers, for visitors of the repo | `README.md` |

## Keeping it current

Update the file that owns the fact when you learn something durable that the code or git
history does not already say:

- a new convention or a decision with its reason → the matching rule in `.claude/rules/`;
- a change in stack, structure or commands → `CLAUDE.md` (and `README.md` if visitors see it);
- a new feature or a removed one → `README.md` (*Features* / *Upcoming Features*).

Do not keep status logs or "recent changes" lists: git history is the record of what was done,
and GitHub issues the list of what is next.
