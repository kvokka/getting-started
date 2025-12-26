# AGENTS

## Startup checklist
- Load `.ai/memory/1_mission.md`, `.ai/memory/2_architecture.md`, and `.ai/memory/3_active_state.md`.
- Only execute tasks that live in `prompts/active/`; archive completed work into `prompts/history/`.
- Before finishing, update `.ai/memory/3_active_state.md` with progress and next steps.

## Where to work
- `.devcontainer/`: environment/tooling definitions.
- `.ai/`: template memory and architecture; edit when evolving the template itself.
- `docs/`: reference notes.
- `templates/`: assets that downstream repos receive (AGENTS and AI scaffold memory).
- `prompts/`: task queue; never invent tasks outside `prompts/active/`.

## Template specifics
- This repository is the source template. To change what downstream repos get, edit `templates/` (including `AGENTS.md` and the AI scaffold memory).
- Use this `AGENTS.md` as the entry point. `.ai/rules.md` is deprecated.
