# System Architecture - Template Repository

This document describes the architecture of the `kvokka/getting-started` template repository itself.

## Directory Structure and Purpose

- **`.devcontainer/`**: Contains the development environment definition.

- **`.ai/`**: Contains the AI workflow files for *this template repository*.
    - **`memory/`**: The Memory Bank for the template.
        - `1_mission.md`: The mission of this template.
        - `2_architecture.md`: (This file) The architecture of this template.
        - `3_active_state.md`: The current state of this template.

- **`.ai-template/`**: Contains the AI workflow files that will be used in *new projects* generated from this template. This directory is copied to `.ai` in a new project.
    - **`memory/`**: The initial Memory Bank for a new project.

- **`AGENTS.md`**: The rules for an AI working on *this template repository*.

- **`AGENTS.md-template`**: The rules for an AI working on a *new project* generated from this template. This file is copied to `AGENTS.md` in a new project.

- **`docs/`**: Documentation for the template.

- **`prompts/`**: AI task management for the template.

- **`src/`**: Source code for the template (should be empty).

## Key Workflows

- **Improving the Template**: Tasks for improving the template are managed in `prompts/`. Any changes to the AI workflow must be reflected in both the `.ai` and `.ai-template` directories as appropriate.

- **Generating a New Project**: A GitHub Action (`.github/workflows/after-templating.yml`) runs when a new repository is created from this template. It removes the template-specific files (`.ai`, `AGENTS.md`) and replaces them with the project-specific files (`.ai-template`, `AGENTS.md-template`).
