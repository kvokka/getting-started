# System Architecture

## Directory Structure
- **.devcontainer/**: Environment definition (Dockerfile, devcontainer.json).
- **.ai/**: AI Context (Memory Bank & Rules).
- **docs/**: Knowledge Base.
- **prompts/**: Task Management (Active, History, Drafts).
- **src/**: Application Source Code.

## Key Workflows
- **Start Project**: Clone repo -> Run `just init` (if configured) -> Edit `.ai/memory/`.
- **AI Development**: Create task in `prompts/active/` -> AI reads rules -> AI executes -> AI updates memory.
