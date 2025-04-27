#!/bin/bash

WS=/workspace
CLINE_MCP_PATH=~/.vscode-server/data/User/globalStorage/saoudrizwan.claude-dev/settings

for target in $CLINE_MCP_PATH/cline_mcp_settings.json $WS/.roo/mcp.json $WS/.cursor/mcp.json; do
  mkdir -p "$(dirname $target)"
  ln -s $WS/mcp.json $target
done

# Execute the remaining arguments passed to the container
exec "$@"
