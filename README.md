# New repo template

[![VS Code Container](https://img.shields.io/static/v1?label=VS+Code&message=Container&logo=visualstudiocode&color=007ACC&logoColor=007ACC&labelColor=2C2C32)](https://open.vscode.dev/microsoft/vscode)

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

## AI Workflow

This repository uses a dual AI workflow system to manage both the template itself and the projects generated from it.

*   **`.ai/` and `AGENTS.md`**: These files are for the template repository itself. They contain the mission, architecture, and state of the template, as well as the rules for AI agents working on the template.
*   **`.ai-template/` and `AGENTS.md-template`**: These files are for the projects that will be generated from this template. They contain the initial AI workflow files that will be used in the new repository.

When a new repository is created from this template, a GitHub Action automatically removes the template-specific AI files and replaces them with the ones from the `.ai-template` directory.

## References

The original boilerplate was from from this MS [repo](https://github.com/microsoft/vscode-remote-try-go)

### Other boilerplates

- <https://github.com/jsburckhardt/getting-started>

### Useful links

- [Dev containers schema](https://containers.dev/implementors/json_reference/)
- [Dev containers features](https://containers.dev/features/)
