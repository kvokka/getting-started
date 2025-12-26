# AGENTS

## Startup checklist

- Load `.ai/memory/1_mission.md`, `.ai/memory/2_architecture.md`, and `.ai/memory/3_active_state.md`.
- Only execute items in `prompts/active/`; move finished work to `prompts/history/`.
- Update `.ai/memory/3_active_state.md` with progress and next steps before ending a task.

## Context map

- `docs/`: project documentation and decisions; add notes here when you learn something new.
- `.devcontainer/`: environment tooling.
- `.ai/`: memory bank guiding scope and architecture.
- `prompts/`: task queue (work only from `prompts/active/`).

## Workflow

- Create or refine tasks in `prompts/active/` before making changes.
- Keep implementation aligned with `.ai/memory/2_architecture.md`.
- Treat this file as the entry point each session.
