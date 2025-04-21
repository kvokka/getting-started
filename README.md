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

- *[optional]* `GOOGLE_AI_STUDIO_API_KEY` - used by `aicommit2`, should contain [Google AI Studio API key](https://aistudio.google.com/app/apikey)

## Noted features

- [MCP](./mcp.json) contains MCP config file. It's the same format for Cline and Roo
making it possible to use the same config for both tools.

## PRD Template

This repository includes a template for creating Product Requirements Documents (PRDs) located at `docs/templates/prd.md`. This template is designed to be used by replacing the `{{prd_instructions}}` placeholder within the file with a description of the specific product or feature for which you want to create a PRD.

To do so you can use the following command to AI assistant to generate the PRD:

```text
Use the template at `docs/templates/prd.md` to create a PRD for the product but before you MUST replace `{{prd_instructions}}` with instructions given below. Then use the updated template to create a PRD for the product. The result must be saved in the file `docs/prd.md`

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
