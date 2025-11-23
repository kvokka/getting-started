# Mission & Architecture - Template Repository

## Purpose
This repository is the **Master Template** for starting new projects. Your mission is to maintain and improve this template.

## Core Tech Stack (Template Default)
- **Infrastructure**: Docker Compose, DevContainers.
- **Task Runner**: `just`.
- **AI Tools**: `aicommit2`, `pre-commit`.
- **Languages**: Polyglot (Defined per project in `.devcontainer`).

## Core Values
- **Isolation**: Nothing runs on the host machine.
- **Context**: The AI always knows the state via `.ai/memory/`.
- **Atomic Tasks**: Work is performed strictly via `prompts/active/`.
