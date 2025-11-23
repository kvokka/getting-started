# System Architecture - Template Repository

## Directory Structure
- **.devcontainer/**: Environment definition (Dockerfile, devcontainer.json).
- **.ai/**: AI Context for the template repository.
- **.ai-template/**: AI Context for generated repositories.
- **docs/**: Knowledge Base for the template.
- **prompts/**: Task Management for the template.
- **src/**: Application Source Code (should be empty in the template).

## Key Workflows
- **Improve Template**: Create a task in `prompts/active/` -> Execute the task -> Update memory.
- **Test Template**: Generate a new repository from the template and verify the results.
