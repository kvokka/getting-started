[![VS Code Container](https://img.shields.io/static/v1?label=VS+Code&message=Container&logo=visualstudiocode&color=007ACC&logoColor=007ACC&labelColor=2C2C32)](https://open.vscode.dev/microsoft/vscode)

# Default Repo Template (DevContainer + AI Memory Bank)

A universal boilerplate for reliable, isolated, and AI-friendly development based on [dotfiles](https://github.com/kvokka/dotfiles/).

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
```

## How to use with AI

Since this repo is IDE-agnostic, you need to "onboard" your AI agent manually (unless you configure your tool to auto-read .ai/rules.md).
The Protocol:
Context Loading: At the start of a chat, tell the AI:
"Read .ai/rules.md and .ai/memory/1_mission.md. Then check .ai/memory/3_active_state.md for the current status."

## Assigning Work:

Create a file in `prompts/active/00X-my-task.md`.
Tell AI: "Execute the task in prompts/active/00X-my-task.md".

Closing Loop:
The AI must update `.ai/memory/3_active_state.md` before finishing.

Move the task file to prompts/history/.

## Environment Variables
See .devcontainer/devcontainer.json for loading order.
Local secrets: .env (gitignored).
Shared vars: ~/.devcontainer/.env.devcontainer.

### Loading order

- `containerEnv` section of the
[`devcontainer.json`](./.devcontainer/devcontainer.json)  with build env vars.

- `remoteEnv` section of the
[`devcontainer.json`](./.devcontainer/devcontainer.json)  with runtime env vars.

- *[optional]* global env file on the host machine in `~/.devcontainer/.env.devcontainer` file

- *[optional]* project `.env` file, which is excluded from git and used for secrets

### Used env variables

- *[optional]* `GOOGLE_AI_STUDIO_API_KEY` - used by `aicommit2`, should contain [Google AI Studio API key](https://aistudio.google.com/app/apikey)

## Extras

- Consistent git commit messages generation with `aicommit2` and `VSCode`
  following [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) message format
- `mitmproxy` (optional) integration, which allows for intercepting and/or substituting
  responses from other services (local MitM), [details](./.devcontainer/proxy/README.md)
- There is a shared folder from outside of the project workspace `~/.devcontainer/shared` that is forwarded to `/workspace/shared` path. This path is ignored by git

## References

The original boilerplate was from this MS [repo](https://github.com/microsoft/vscode-remote-try-go)
