#!/bin/bash

MCP_PATH=/workspace/mcp.json
CLINE_MCP_PATH=/home/vscode/.vscode-server/data/User/globalStorage/saoudrizwan.claude-dev/settings

mkdir -p $CLINE_MCP_PATH
ln -s $MCP_PATH $CLINE_MCP_PATH/cline_mcp_settings.json
ln -s $MCP_PATH /workspace/.roo/mcp.json

# Execute the remaining arguments passed to the container
exec "$@"
