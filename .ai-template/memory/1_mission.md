# Mission & Architecture

## Purpose
This repository is a new project generated from the `kvokka/getting-started` template.

## Core Tech Stack (Template Default)
- **Infrastructure**: Docker Compose, DevContainers.
- **Task Runner**: `just`.
- **AI Tools**: `aicommit2` (for commits), `pre-commit`.
- **Languages**: Polyglot (Defined per project in `.devcontainer`).

## Core Values
- **Isolation**: Nothing runs on the host machine.
- **Context**: The AI always knows the state via `.ai/memory/`.
- **Atomic Tasks**: Work is performed strictly via `prompts/active/`.
