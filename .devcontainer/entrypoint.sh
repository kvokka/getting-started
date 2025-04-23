#!/bin/bash

WS=/workspace
CLINE_MCP_PATH=~/.vscode-server/data/User/globalStorage/saoudrizwan.claude-dev/settings

for target in $CLINE_MCP_PATH/cline_mcp_settings.json $WS/.roo/mcp.json; do
  mkdir -p "$(dirname $target)"
  ln -s $WS/mcp.json $target
done

# prepare data for https://github.com/ithena-one/mcp-safe-run
if [ -f ~/.devcontainer/.env.devcontainer ]; then
  mkdir -p ~/.secrets
  while IFS='=' read -r key value; do
    [[ -n "$key" && ! "$key" =~ ^# ]] && echo "$value" > ~/.secrets/"$key"
  done < ~/.devcontainer/.env.devcontainer
fi

# Execute the remaining arguments passed to the container
exec "$@"
