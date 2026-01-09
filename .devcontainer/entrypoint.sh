#!/usr/bin/env zsh

bash -c "$(curl -fsLS https://raw.githubusercontent.com/${DOTFILES_GITHUB_USERNAME}/dotfiles/refs/heads/master/bootstrap.sh)" \
  -- ${DOTFILES_GITHUB_USERNAME}

source ~/.zsh/homebrew.zsh
eval "$(mise activate zsh)"

mise trust

ln -s -f ~/.devcontainer/shared /workspace/shared

if [ -f ~/.devcontainer/shared/opencode/antigravity-accounts.json ]; then
  ln -s -f ~/.devcontainer/shared/opencode/antigravity-accounts.json ~/.config/opencode/antigravity-accounts.json
fi

if [ -f ~/.devcontainer/shared/opencode/auth.json ]; then
  ln -s -f ~/.devcontainer/shared/opencode/auth.json ~/.local/share/opencode/auth.json
fi


# # Use this block for mitmproxy, #mitmproxy
# sudo cp .devcontainer/proxy/mitmproxy/mitmproxy-ca-cert.pem /usr/local/share/ca-certificates/mitmproxy-ca-cert.crt
# sudo update-ca-certificates
# export NODE_EXTRA_CA_CERTS=/etc/ssl/certs/ca-certificates.crt

# Execute the remaining arguments passed to the container
exec "$@"
