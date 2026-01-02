# https://github.com/casey/just
set positional-arguments
set dotenv-load

hooks what:
  #!/usr/bin/env bash

  if [ -z "{{what}}" ]; then
    prek run --files $(git diff --name-only HEAD)
  elif [ "{{what}}" = "staged" ]; then
    prek run
  elif [ "{{what}}" = "all" ]; then
    prek run --all-files
  else
    echo "Invalid argument: {{what}}"
  fi
