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

### MCP servers management

In order to be able to manage not only MCP servers but also the tools
which are provided by them was introduced
[metamcp](https://github.com/metatool-ai/mcp-server-metamcp). It allows to
turn off the redundant tools using [web interface](https://metamcp.com/mcp-servers).

*Note:* The `metamcp` can be run in the devcontainer docker compose, but
for now it seems to be an overkill. On the other hand local docker setup
does not require any auth concerns.

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
