# Default Repo Template (DevContainer + AI Memory Bank)

A universal boilerplate for reliable, isolated, and AI-friendly development.

## Features
1. **DevContainers**: Fully isolated environment (VS Code / Docker).
2. **AI-Git Flow**: Structured "Memory Bank" for context-aware AI agents.
3. **Just**: Simple command runner.

## Directory Structure

```text
.devcontainer/   # Docker & Environment config
.ai/             # AI Memory Bank (The "Brain")
  ├── memory/    # Context files (Mission, Active State)
  └── rules.md   # Instructions for AI Agents
docs/            # Documentation Registry
prompts/         # AI Task Management
  ├── active/    # The ONLY task AI should work on
  └── history/   # Archived tasks
src/             # Source code
How to use with AI
Since this repo is IDE-agnostic, you need to "onboard" your AI agent manually (unless you configure your tool to auto-read .ai/rules.md).
The Protocol:
Context Loading: At the start of a chat, tell the AI:
"Read .ai/rules.md and .ai/memory/1_mission.md. Then check .ai/memory/3_active_state.md for the current status."
Assigning Work:
Create a file in prompts/active/00X-my-task.md.
Tell AI: "Execute the task in prompts/active/00X-my-task.md".
Closing Loop:
The AI must update .ai/memory/3_active_state.md before finishing.
Move the task file to prompts/history/.
Environment Variables
See .devcontainer/devcontainer.json for loading order.
Local secrets: .env (gitignored).
Shared vars: ~/.devcontainer/.env.devcontainer.