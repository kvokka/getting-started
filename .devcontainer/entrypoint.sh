#!/bin/bash

MCP_PATH=/workspace/mcp.json
CLINE_MCP_PATH=/home/vscode/.vscode-server/data/User/globalStorage/saoudrizwan.claude-dev/settings

mkdir -p $CLINE_MCP_PATH
ln -s $MCP_PATH $CLINE_MCP_PATH/cline_mcp_settings.json
ln -s $MCP_PATH /workspace/.roo/mcp.json

# prepare data for https://github.com/ithena-one/mcp-safe-run
if [ -f ~/.devcontainer/.env.devcontainer ]; then
  mkdir -p ~/.secrets
  while IFS='=' read -r key value; do
    [[ -n "$key" && ! "$key" =~ ^# ]] && echo "$value" > ~/.secrets/"$key"
  done < ~/.devcontainer/.env.devcontainer
fi

# Execute the remaining arguments passed to the container
exec "$@"
