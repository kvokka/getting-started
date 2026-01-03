#!/usr/bin/env zsh

source ~/.zsh/homebrew.zsh
eval "$(mise activate zsh)"

ln -s -f ~/.devcontainer/shared /workspace/shared

if [ -f ~/.devcontainer/shared/opencode/antigravity-accounts.json ]; then
  ln -s -f ~/.devcontainer/shared/opencode/antigravity-accounts.json ~/.config/opencode/antigravity-accounts.json
fi

# # Use this block for mitmproxy, #mitmproxy
# sudo cp .devcontainer/proxy/mitmproxy/mitmproxy-ca-cert.pem /usr/local/share/ca-certificates/mitmproxy-ca-cert.crt
# sudo update-ca-certificates
# export NODE_EXTRA_CA_CERTS=/etc/ssl/certs/ca-certificates.crt

# Execute the remaining arguments passed to the container
exec "$@"
