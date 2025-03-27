FROM mcr.microsoft.com/devcontainers/go:1-1.22-bookworm

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
  && apt-get -y install bat

RUN DIFF_SO_FANCY_LATEST_VERSION=$(curl -s https://api.github.com/repos/so-fancy/diff-so-fancy/releases/latest | grep -Po '"tag_name": "v\K[^"]*') && \
  curl -L -o /usr/local/bin/diff-so-fancy "https://github.com/so-fancy/diff-so-fancy/releases/download/v${DIFF_SO_FANCY_LATEST_VERSION}/diff-so-fancy" && \
  chmod +x /usr/local/bin/diff-so-fancy
