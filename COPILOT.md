# Copilot.md

## Dual-agent testing setup

I have both Claude Code and GitHub Copilot CLI configured for this project because I am using this project to test both AI coding agents and compare their strengths and weaknesses. This file is the Copilot-specific companion to [CLAUDE.md](./CLAUDE.md).

## Prompt Logging (required)

This project must record the prompts given to GitHub Copilot CLI. Group members: Peter, Jackson, and Laura. Every GitHub Copilot CLI session must keep `docs/prompts.md` up to date:

1. **Log each major prompt word for word.** When the user gives a new major prompt (a new task or feature request), add it as a top-level bullet in `docs/prompts.md`. Copy the prompt exactly as the user typed it, typos, casing, and `@file` mentions included. Do not paraphrase or fix spelling.
2. **Log revisions as sub-bullets.** If a later prompt in the session revises, corrects, or continues an earlier major prompt, do not add a new top-level bullet. Instead, add a one-sentence description of the revision as a sub-bullet under the original prompt's bullet.
3. **Add the LLM used for each bullet.** In `docs/prompts.md`, include a short note for every recorded prompt indicating which LLM was used for that prompt (for example: `LLM: Claude Code`, `LLM: GitHub Copilot CLI`, or `LLM: ChatGPT`). This can be a sub-bullet directly under the prompt bullet.
4. **File under the right group member.** Put the prompt under the section for the user who is running the session (`## Peter`, `## Jackson`, or `## Laura`). Work out who the user is from `git config user.name` (or the user's email/identity in context). If it is still unclear, ask the user before logging.
5. **Keep chronological order.** Within each member's section, bullets must be in the order the prompts were used: the first bullet is the earliest prompt, and new prompts go at the bottom of that section.
6. **Log as you go.** Update `docs/prompts.md` in the same turn the prompt is handled. Don't batch the updates for later.

Format example:

```markdown
## Peter (using GitHub Copilot CLI CLI)

- First major prompt, copied exactly as typed
  - LLM: GitHub Copilot CLI CLI
  - One-sentence description of a follow-up revision to that prompt.
- Second major prompt, copied exactly as typed
  - LLM: GitHub Copilot CLI
```