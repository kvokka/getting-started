FROM mcr.microsoft.com/devcontainers/base:ubuntu-24.04

ARG DOTFILES_GITHUB_USERNAME=kvokka
WORKDIR /home/vscode
USER vscode

ARG DOCKER_GID=999
RUN groupadd -g ${DOCKER_GID} docker && \
  chown root:docker /var/run/docker.sock && \
  usermod -aG docker vscode

RUN bash -c "$(curl -fsLS https://raw.githubusercontent.com/${DOTFILES_GITHUB_USERNAME}/dotfiles/refs/heads/master/bootstrap.sh)" \
  -- ${DOTFILES_GITHUB_USERNAME}

COPY .devcontainer/entrypoint.sh /usr/local/bin/entrypoint.sh
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
