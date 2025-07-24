#!/bin/bash

# prepare data for https://github.com/ithena-one/mcp-safe-run
if [ -f ~/.devcontainer/.env.devcontainer ]; then
  mkdir -p ~/.secrets
  while IFS='=' read -r key value; do
    [[ -n "$key" && ! "$key" =~ ^# ]] && echo "$value" > ~/.secrets/"$key"
  done < ~/.devcontainer/.env.devcontainer
fi

DOCKER_GID=999
groupadd -g ${DOCKER_GID} docker && \
  chown root:docker /var/run/docker.sock && \
  usermod -aG docker vscode

ln -s -f ~/.devcontainer/shared /workspace/shared
ln -s -f ~/.rovodev /workspace/.rovodev

# # Use this block for mitmproxy, #mitmproxy
# sudo cp .devcontainer/proxy/mitmproxy/mitmproxy-ca-cert.pem /usr/local/share/ca-certificates/mitmproxy-ca-cert.crt
# sudo update-ca-certificates
# export NODE_EXTRA_CA_CERTS=/etc/ssl/certs/ca-certificates.crt

# Execute the remaining arguments passed to the container
exec "$@"
