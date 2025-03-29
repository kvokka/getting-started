# https://github.com/casey/just
set positional-arguments
set dotenv-load

# Hello world/arg example
hello arg:
  echo "Hello, {{arg}}!"
