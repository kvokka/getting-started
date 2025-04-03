# VsCode boilerplate

[![VS Code Container](https://img.shields.io/static/v1?label=VS+Code&message=Container&logo=visualstudiocode&color=007ACC&logoColor=007ACC&labelColor=2C2C32)](https://open.vscode.dev/microsoft/vscode)

Based on my [dotfiles](https://github.com/kvokka/dotfiles/) repo VsCode project
basic setup using devContainers, docker-compose and MCP.

Assumed to be language agnostic, golang taken just for the basic example.

## Quick start

For the new project

### Environment Variables

This boilerplate manages environment variables in a structured way to support
both public and private use cases within the DevContainer setup.

#### Public Environment Variables

Public environment variables, safe for version control, are defined in the
`containerEnv` section of the [`devcontainer.json`](./.devcontainer/devcontainer.json)
file. These are typically non-sensitive settings or configurations that can be
shared across users and environments.

#### Private Environment Variables

Private environment variables, such as secrets or API keys, should be specified
in the `remoteEnv` section of the [`devcontainer.json`](./.devcontainer/devcontainer.json)
file. These variables are often inherited from the host machine. To distinguish
them from other host environment variables, use the `DEVCONTAINER_` prefix (e.g.,
`DEVCONTAINER_API_KEY`). Within the DevContainer, this prefix is automatically
omitted, so the variable becomes `API_KEY`.

The list of private variables in `remoteEnv` is intentionally explicit. This
approach centralizes documentation of possible integrations in a single,
shareable location for clarity and convenience.

#### Renaming with `.env`

An optional `.env` file can be used if renaming of environment variables is
needed. This provides flexibility for cases where variable names must be
adjusted between the host and the container.

#### Notes

- When using my dotfiles setup, global environment variables forwarded to the
  DevContainer should be stored in `.devcontainer/devcontainer.env`.
- In Visual Studio Code version 1.98.2, changes to global environment variables
  require reopening the editor to take effect.

## Noted features

- [.cline](./.cline/cline_mcp_settings.json) contains MCP config file which is
stored inside each container. This hack makes it storable.

## References

The original boilerplate was from from this MS [repo](https://github.com/microsoft/vscode-remote-try-go)

### Other boilerplates

- <https://github.com/jsburckhardt/getting-started>

### Useful links

- [Dev containers schema](https://containers.dev/implementors/json_reference/)
- [Dev containers features](https://containers.dev/features/)
