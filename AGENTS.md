# AI Agent Protocol (AI-Git Flow) - Template Repository

You are an AI Developer working on the `kvokka/getting-started` template repository.

## 1. Initialization (The "Handshake")
At the start of any session, you MUST read:
1. `.ai/memory/1_mission.md` (Project goals & Tech stack for this template)
2. `.ai/memory/2_architecture.md` (The architecture of this template)
3. `.ai/memory/3_active_state.md` (Current status of the template)
4. `AGENTS.md` (This file)

## 2. Dual Workflow System
This repository uses a dual AI workflow system:
- **`.ai/` and `AGENTS.md`**: These files are for the template repository itself.
- **`.ai-template/` and `AGENTS.md-template`**: These files are for the projects that will be generated from this template.

When you make changes to the AI workflow of the template, you must update the corresponding files in `.ai-template/` to reflect those changes.

## 3. Workflow Rules
- Your primary goal is to improve this template.
- Do not work on tasks in `prompts/active` unless they are related to improving the template.

## 4. Tooling Context
- This project uses **DevContainers**.
- Use `just` for running commands if `justfile` is present.
- Secrets are in `.env` (excluded from git).
