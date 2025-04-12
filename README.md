# VsCode boilerplate

[![VS Code Container](https://img.shields.io/static/v1?label=VS+Code&message=Container&logo=visualstudiocode&color=007ACC&logoColor=007ACC&labelColor=2C2C32)](https://open.vscode.dev/microsoft/vscode)

Using [dotfiles](https://github.com/kvokka/dotfiles/) in [Dockerfile](./.devcontainer/Dockerfile) to create a dev container for [VS Code](https://code.visualstudio.com/).

## Quick start

Use devcontainer as as, or fork and replace with your dotfiles repo in
[Dockerfile](./.devcontainer/Dockerfile)

### Environment Variables

#### Loading order

- `containerEnv` section of the
[`devcontainer.json`](./.devcontainer/devcontainer.json)  with build env vars.

- `remoteEnv` section of the
[`devcontainer.json`](./.devcontainer/devcontainer.json)  with runtime env vars.

- *[optional]* global env file on the host machine in `~/.devcontainer/devcontainer.env` file

- *[optional]* project env file on the host machine in `.env` file

#### Used env variables

- *[optional]* `GEMINI_API_KEY` - used by `aicommit2`, should contain [Google AI Studio API key](https://aistudio.google.com/app/apikey)

## Noted features

- [MCP](./mcp.json) contains MCP config file. It's the same format for Cline and Roo
making it possible to use the same config for both tools.

## References

The original boilerplate was from from this MS [repo](https://github.com/microsoft/vscode-remote-try-go)

### Other boilerplates

- <https://github.com/jsburckhardt/getting-started>

### Useful links

- [Dev containers schema](https://containers.dev/implementors/json_reference/)
- [Dev containers features](https://containers.dev/features/)
