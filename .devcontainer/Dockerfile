FROM mcr.microsoft.com/devcontainers/base:ubuntu-24.04

ARG DOTFILES_GITHUB_USERNAME=kvokka
WORKDIR /home/vscode
USER vscode

# https://mise.jdx.dev/troubleshooting.html#_403-forbidden-when-installing-a-tool
ARG MISE_GITHUB_TOKEN
ARG GITHUB_TOKEN
ARG GITHUB_API_TOKEN

RUN bash -c "$(curl -fsLS https://raw.githubusercontent.com/${DOTFILES_GITHUB_USERNAME}/dotfiles/refs/heads/master/bootstrap.sh)" \
  -- ${DOTFILES_GITHUB_USERNAME}

COPY .devcontainer/entrypoint.sh /usr/local/bin/entrypoint.sh
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
