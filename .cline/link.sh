#!/bin/bash

MCP_PATH=/home/vscode/.vscode-server/data/User/globalStorage/saoudrizwan.claude-dev/settings

mkdir -p $MCP_PATH
ln -s /workspace/.cline/cline_mcp_settings.json $MCP_PATH/cline_mcp_settings.json
