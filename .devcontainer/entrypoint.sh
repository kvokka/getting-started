#!/bin/bash

# prepare data for https://github.com/ithena-one/mcp-safe-run
if [ -f ~/.devcontainer/.env.devcontainer ]; then
  mkdir -p ~/.secrets
  while IFS='=' read -r key value; do
    [[ -n "$key" && ! "$key" =~ ^# ]] && echo "$value" > ~/.secrets/"$key"
  done < ~/.devcontainer/.env.devcontainer
fi

# Execute the remaining arguments passed to the container
exec "$@"
