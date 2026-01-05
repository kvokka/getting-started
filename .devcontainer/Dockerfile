FROM mcr.microsoft.com/devcontainers/base:ubuntu-24.04

ARG DOTFILES_GITHUB_USERNAME=kvokka
WORKDIR /home/vscode
USER vscode

ENV DOTFILES_GITHUB_USERNAME=${DOTFILES_GITHUB_USERNAME}

COPY .devcontainer/entrypoint.sh /usr/local/bin/entrypoint.sh
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
