# VsCode boilerplate

[![VS Code Container](https://img.shields.io/static/v1?label=VS+Code&message=Container&logo=visualstudiocode&color=007ACC&logoColor=007ACC&labelColor=2C2C32)](https://open.vscode.dev/microsoft/vscode)

Based on my [dotfiles](https://github.com/kvokka/dotfiles/) repo VsCode project
basic setup using devContainers, docker-compose and MCP.

Assumed to be language agnostic, golang taken just for the basic example.

## Noted features

* [.cline](./.cline/cline_mcp_settings.json) contains MCP config file which is
stored inside each container. This hack makes it storable.

## References

The original boilerplate was from from this MS [repo](https://github.com/microsoft/vscode-remote-try-go)

### Other boilerplates

* https://github.com/jsburckhardt/getting-started

### Useful links

* [Dev containers schema](https://containers.dev/implementors/json_reference/)
* [Dev containers features](https://containers.dev/features/)
