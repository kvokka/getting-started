# Architecture

## Stack

- **Language**: [Defined in DevContainer]
- **Infrastructure**: Docker Compose

## AI Structure

- `AGENTS.md`: Entry point for AI instructions and context map.
- `.ai/`: Memory Bank (mission, architecture, active state).
- `docs/`: Reference docs and decisions.
- `prompts/`: Task Queue (work only from `prompts/active/`).
