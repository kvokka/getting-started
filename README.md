# Default Repo Template (DevContainer + AI Memory Bank)

[![VS Code Container](https://img.shields.io/static/v1?label=VS+Code&message=Container&logo=visualstudiocode&color=007ACC&logoColor=007ACC&labelColor=2C2C32)](https://open.vscode.dev/microsoft/vscode)

A universal boilerplate for reliable, isolated, and AI-friendly development in devcontainer.

This is a template repository for starting a new project with using [dotfiles](https://github.com/kvokka/dotfiles/) with workflow in devcontainer for [VS Code](https://code.visualstudio.com/).

## Quick start

Template/fork and use as is or replace dotfiles in
[Dockerfile](./.devcontainer/Dockerfile)

### Project goals

1. Keep all the things in insolation from the host machine
2. Have a way to run the project on any machine with the same config
3. Ability to easily re-create the environment on a new local or remote machine
4. Safely try any VSCode based editor

## Pre-configured tools (optional)

1. [just](https://github.com/casey/just): Simple command runner
2. [prek](https://github.com/j178/prek): Modern Pre-commit
3. [rumdl](https://github.com/rvben/rumdl): Markdown linter

### Environment Variables in loadging order

- `containerEnv` section of the
[`devcontainer.json`](./.devcontainer/devcontainer.json) with build env vars.

- *[optional]* shared between
different projectsenv file on the host machine is stored in `~./.secrets/shared/.env`

- *[optional]* project `.env` file, which is excluded from git and used for secrets

## Extras

- `mitmproxy` (optional) integration, that allows to intercept and/or substitute
  responses from other services (local MitM), [details](./.devcontainer/proxy/README.md)
- There is a shared folder from outside of the project workspace `~/.devcontainer/shared` that is forwarded to `/workspace/shared` path. This path is ignored from git

### OpenCode Server

The devcontainer includes a pre-configured OpenCode server running on port 4096.

You can open it in the browser on the address <http://localhost:4096>

To connect to this existing session instead of starting a new one:

```bash
opencode attach http://localhost:4096
```

### AI Creds management (optional)

[quotio](https://github.com/nguyenphutrong/quotio), the wrapper over
[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI),
is assumed as the primary tool for accounts managemt, that should be on host default port 8317.
