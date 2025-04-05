FROM mcr.microsoft.com/devcontainers/go:1-1.24-bookworm
# Replace it with generic ubuntu after brew asdf for arm64 is available
# FROM mcr.microsoft.com/devcontainers/base:ubuntu-24.04

COPY .devcontainer/entrypoint.sh /usr/local/bin/entrypoint.sh
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
