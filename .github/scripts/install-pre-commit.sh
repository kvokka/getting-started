#!/usr/bin/env bash

if ! command -v pre-commit &> /dev/null
then
    echo "pre-commit could not be found, installing..."
    pip install pre-commit
fi
