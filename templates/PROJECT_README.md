# {{REPO_NAME}}

## Default Repo Template (DevContainer + AI Memory Bank)

A universal boilerplate for reliable, isolated, and AI-friendly development.

## Getting Started

1. Open in VS Code (DevContainer).
2. Tell your AI Assistant: "Initialize context from `AGENTS.md`".
3. Create your first task in `prompts/active/`.
4. Review `docs/` for existing notes; add new decisions there.

## Features

1. **DevContainers**: Fully isolated environment (VS Code / Docker).
2. **AI-Git Flow**: Structured memory bank for context-aware AI agents.
3. **Just**: Simple command runner.

## Directory Structure

```text
.devcontainer/   # Docker & Environment config
.ai/             # AI Memory Bank (The "Brain")
  └── memory/    # Context files (Mission, Active State)
AGENTS.md        # Entry point for AI instructions + doc map
docs/            # Documentation registry
prompts/         # AI Task Management
  ├── active/    # The ONLY task AI should work on
  └── history/   # Archived tasks
```

## AI Workflow

- Start at `AGENTS.md` each session.
- Keep `.ai/memory` concise and current; update `3_active_state.md` when closing tasks.
- Only work on tasks present in `prompts/active/`.
- Use `docs/` for questions and to record answers/decisions.
