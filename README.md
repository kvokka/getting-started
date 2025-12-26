# Default Repo Template (DevContainer + AI Memory Bank)

[![VS Code Container](https://img.shields.io/static/v1?label=VS+Code&message=Container&logo=visualstudiocode&color=007ACC&logoColor=007ACC&labelColor=2C2C32)](https://open.vscode.dev/microsoft/vscode)

A universal boilerplate for reliable, isolated, and AI-friendly development, including devcontainer tooling and an AI memory bank.

## Features

1. **DevContainers**: Fully isolated environment (VS Code / Docker).
2. **AI-Git Flow**: Structured memory bank and automation for new repos.

## Pre-configured tools (optional)

1. [just](https://github.com/casey/just): Simple command runner.
2. [prek](https://github.com/j178/prek): Pre-commit runner (intial set via [dotfiles](https://github.com/kvokka/dotfiles/))
3. [aicommit2](https://github.com/tak-bro/aicommit2): Git message generator

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

This is a template repository for starting a new project with using [dotfiles](https://github.com/kvokka/dotfiles/) with workflow in devcontainer for [VS Code](https://code.visualstudio.com/).

## Quick start

Template/fork and use as is or replace dotfiles in
[Dockerfile](./.devcontainer/Dockerfile)

### Project goals

1. Keep all the things in insolation from the host machine
2. Have a way to run the project on any machine with the same config
3. Ability to easily re-create the environment on a new local or remote machine
4. Safely try any VSCode based editor

*notes:*

- Microsoft [limit](https://github.com/getcursor/cursor/issues/2976) access
to VSCode marketplace, but extensions installation from other sources is still in
place, meaning that you can config your editor of choice with extensions listing
them in `devcontainer.json` using
VSCode [extension marketplace](https://marketplace.visualstudio.com/vscode).

### Environment Variables

TL;DR: For use local `.env` file for project related variables, for shared between
different projects AND for MCP's use `~./.devcontainer/.env.devcontainer`.

#### Loading order

- `containerEnv` section of the
[`devcontainer.json`](./.devcontainer/devcontainer.json)  with build env vars.

- `remoteEnv` section of the
[`devcontainer.json`](./.devcontainer/devcontainer.json)  with runtime env vars.

- *[optional]* global env file on the host machine in `~/.devcontainer/.env.devcontainer` file

- *[optional]* project `.env` file, which is excluded from git and used for secrets

#### Used env variables

- *[optional]* `GOOGLE_AI_STUDIO_API_KEY` - used by `aicommit2`, should contain [Google AI Studio API key](https://aistudio.google.com/app/apikey)

## Extras

- Consistent git commit messages generation with `aicommit2` and `VSCode`
  following [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) message format
- `mitmproxy` (optional) integration, that allows to intercept and/or substitute
  responses from other services (local MitM), [details](./.devcontainer/proxy/README.md)
- There is a shared folder from outside of the project workspace `~/.devcontainer/shared` that is forwarded to `/workspace/shared` path. This path is ignored from git

## References

The original boilerplate was from from this MS [repo](https://github.com/microsoft/vscode-remote-try-go)

### Other boilerplates

- <https://github.com/jsburckhardt/getting-started>

### Useful links

- [Dev containers schema](https://containers.dev/implementors/json_reference/)
- [Dev containers features](https://containers.dev/features/)

## 🤖 AI-Git Flow (Template Feature)

This repository is a **Self-Configuring Template**.

**For Users:**

1. Click "Use this template".
2. The system will automatically replace the Template's memory with a Fresh Project memory.

**For Contributors:**

- Work in `.ai/memory` to change *this* repo.
- Work in `templates/ai_scaffold` to change what *new* repos start with.
- `AGENTS.md` is the entrypoint for AI assistants; use `docs/` for additional context and decisions.
