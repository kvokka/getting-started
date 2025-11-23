# Mission & Architecture

## Purpose
This repository is the **Master Template** for starting new projects. It combines:
1. **DevContainers**: For isolated, reproducible environments.
2. **AI-Git Flow**: For structured collaboration with LLMs using a Memory Bank.

## Core Tech Stack (Template Default)
- **Infrastructure**: Docker Compose, DevContainers.
- **Task Runner**: `just`.
- **AI Tools**: `aicommit2` (for commits).
- **Languages**: Polyglot (Defined per project in `.devcontainer`).

## Core Values
- **Isolation**: Nothing runs on the host machine.
- **Context**: The AI always knows the state via `.ai/memory/`.
- **Atomic Tasks**: Work is performed strictly via `prompts/active/`.
