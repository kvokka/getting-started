# System Architecture

This document provides a detailed overview of the project's structure and is intended to be a living document. As an AI developer, you are expected to update this file as the project evolves.

## Directory Structure and Purpose

- **`.devcontainer/`**: This directory contains the definition for the development environment. It includes the `Dockerfile` for building the container, `devcontainer.json` for VS Code configuration, and other scripts needed to set up the environment. This ensures a consistent and reproducible development experience for all contributors.

- **`.ai/`**: This is the "brain" of the AI-Git Flow. It contains the Memory Bank and rules for AI agents.
    - **`memory/`**: This is the core of the AI's context.
        - `1_mission.md`: Defines the project's high-level goals and technology stack.
        - `2_architecture.md`: (This file) A detailed description of the project's structure. This should be updated as new components are added or existing ones are modified.
        - `3_active_state.md`: A snapshot of the current state of the project, including the active task, recent changes, and next steps.
    - **`rules.md`**: (deprecated in favor of `AGENTS.md`)

- **`docs/`**: This directory is the project's knowledge base. It should contain documentation for developers and users, including architectural decision records (ADRs), tutorials, and API documentation.

- **`prompts/`**: This directory is used for AI task management.
    - **`active/`**: Contains the task(s) that the AI is currently working on. There should only be one active task at a time.
    - **`drafts/`**: Contains tasks that are being prepared but are not yet ready to be worked on.
    - **`history/`**: Contains completed tasks.
    - **`templates/`**: Contains templates for creating new tasks.

- **`src/`**: This directory contains the application's source code. The specific structure of this directory will depend on the project's language and framework.

## Key Workflows

- **Starting a New Project**: When a new project is created from this template, the `.ai-template` directory is renamed to `.ai`, and `AGENTS.md-template` is renamed to `AGENTS.md`. The initial state of the project is defined in `.ai/memory/3_active_state.md`.

- **AI-Driven Development**: The development process is driven by tasks defined in the `prompts/active/` directory. The AI reads the task, makes the necessary code changes, updates the documentation in `docs/` and this file, and then updates `.ai/memory/3_active_state.md` to reflect the changes.
