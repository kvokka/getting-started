# https://github.com/casey/just
set positional-arguments
set dotenv-load

hooks what:
  #!/usr/bin/env bash

  if [ -z "{{what}}" ]; then
    git hook run pre-commit -- --unstaged-files
  elif [ "{{what}}" = "staged" ]; then
    git hook run pre-commit -- --staged-files
  elif [ "{{what}}" = "all" ]; then
    git hook run pre-commit -- --all-files
  else
    echo "Invalid argument: {{what}}"
  fi
