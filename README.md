# VsCode boilerplate

[![VS Code Container](https://img.shields.io/static/v1?label=VS+Code&message=Container&logo=visualstudiocode&color=007ACC&logoColor=007ACC&labelColor=2C2C32)](https://open.vscode.dev/microsoft/vscode)

Using [dotfiles](https://github.com/kvokka/dotfiles/) in [Dockerfile](./.devcontainer/Dockerfile) to create a dev container for [VS Code](https://code.visualstudio.com/).

## Quick start

Use devcontainer as is, or fork and replace with your dotfiles repo in
[Dockerfile](./.devcontainer/Dockerfile)

### Project motivation

1. Keep all the things in insolation from the host machine
2. Have a way to run the project on any machine with the same config
3. Ability to easily re-create the environment on a new local or remote machine
4. Pick the best VSCode based editor

More about the progress in [docs](./docs/README.md).

*notes:*

- after Microsoft [limit](https://github.com/getcursor/cursor/issues/2976) access
to VSCode marketplace, but allow to install extensions from other sources, so
you can config your devcontainer extensions list in `devcontainer.json` using
VSCode [extension marketplace](https://marketplace.visualstudio.com/vscode) and
use the editor of your choice after that.
- now i didn't pick the agent extension, so i have a few configs configs in the
repo. It will be like that until appear some common way to use them in the same way
or appear clear winner.

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

## Noted features

- `mcp.json` is shared between Roo, Cline and Cursor sharing `.devcontainer/.env.devcontainer` as env file (Roo and Cline use it from the container home dir, while Cursor use it from the host machine). Use [envmcp](https://www.npmjs.com/package/envmcp) tool to manage MCP's env variables.

## PRD Template

This repository includes a template for creating Product Requirements Documents (PRDs) located at `docs/templates/prd.md`. This template is designed to be used by replacing the `{{prd_instructions}}` placeholder within the file with a description of the specific product or feature for which you want to create a PRD.

To do so you can use the following command to AI assistant to generate the PRD:

```text
Use the template at `docs/templates/prd.md` to create a PRD for the product but
before you MUST replace `{{prd_instructions}}` with instructions given below.
Then use the updated template to create a PRD for the product. The result must
be saved in the file `docs/prd.md`

INSTRUCTIONS:

...
```

**tested with**: `gemini-2.5-flash-preview-04-17` and `Roo code 3.13`

## References

The original boilerplate was from from this MS [repo](https://github.com/microsoft/vscode-remote-try-go)

### Other boilerplates

- <https://github.com/jsburckhardt/getting-started>

### Useful links

- [Dev containers schema](https://containers.dev/implementors/json_reference/)
- [Dev containers features](https://containers.dev/features/)
