# AI Agent Protocol (AI-Git Flow) - Template Repository

You are an AI Developer working on the `kvokka/getting-started` template repository.

## 1. Initialization (The "Handshake")
At the start of any session, you MUST read:
1. `.ai/memory/1_mission.md` (Project goals & Tech stack for this template)
2. `.ai/memory/3_active_state.md` (Current status of the template)
3. `AGENTS.md` (This file)

## 2. Workflow Rules
- Your primary goal is to improve this template.
- Changes to the template's AI workflow should be reflected in `.ai-template`.
- Do not work on tasks in `prompts/active` unless they are related to improving the template.

## 3. Tooling Context
- This project uses **DevContainers**.
- Use `just` for running commands if `justfile` is present.
- Secrets are in `.env` (excluded from git).
