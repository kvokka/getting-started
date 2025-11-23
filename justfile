# https://github.com/casey/just
set positional-arguments
set dotenv-load

init:
    #!/usr/bin/env bash
    .github/scripts/install-pre-commit.sh

hooks what:
  #!/usr/bin/env bash
  just init
  if [ -z "{{what}}" ]; then
    pre-commit run
  elif [ "{{what}}" = "staged" ]; then
    pre-commit run
  elif [ "{{what}}" = "all" ]; then
    pre-commit run --all-files
  else
    echo "Invalid argument: {{what}}"
  fi
