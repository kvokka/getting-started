# Cursor

## Rules

This document explains the considerations for the rules created in the project and reveal the comments of the rules, why and how they were created. Treat it as a logbook, with the links to the docs any my (and AI's) thoughts.

1. I realised, that the AI need strict set of rules to be able to make the right decisions. The starting point was the idea of creating a clear PRD, and for that I found the neat meta-script, which was re-used and modified for the project (as meta-meta [script](../README.md#prd-template)). But this document is designed to be static.

2. The great idea to manage the project in a more dynamic way is to have something like [cline memory bank](https://docs.cline.bot/improving-your-prompting-skills/cline-memory-bank). The idea described in there is on the very top level and must be adjusted for each project, meaning that lots of work is required to be done. Keep in mind the size of the output documents, and if you need to manage it for a few project it might be a biggie.

3. I tried a several memory bank ideas, and tried to re-use a few of existed, and loved the idea of the <https://github.com/vanzan01/cursor-memory-bank> project (using my fork here as submodule to avoid any dependency breakage), but after the very first use it was obvious why the author was not fully happy with that. AI still had too much of a freedom to hallucinate, easily creating undesired files, duplicating things and thinking of the details which should be set. It needs some extensions to be able to handle the project in a good way.

4. After some research it was found [rules generator](https://github.com/bmadcode/cursor-custom-agents-rules-generator) and I loved the idea of self-improving rules, but actually the only one file[https://github.com/bmadcode/cursor-custom-agents-rules-generator/blob/main/.cursor/rules/core-rules/rule-generating-agent.mdc] i was interested in. Based on that idea it was created the [rule-generating-standarts-agent.mdc](./rules/global/rule-generating-standarts-agent.mdc) file.

5. As the next step we facing the problem, that we need to generate/split and manage tasks for our projects. This points to [task-master](https://github.com/eyaltoledano/claude-task-master) project, which is a great ([page](https://www.task-master.dev/) is incredible), but it was not fully working for me, let me list why:

   1. the project doing all the work basing on the PRD only. PRD is way more static and human-related document rather than memory bank, which is AI-related.
   2. I'll be happy if new tasks would be triggered within the AI agent, rather use another chat disconnected from code and context just for that.
   3. At the moment of this writing task-master is bound to Anthropic LLM's, and I don't want this limitation.
   4. Tasks dependencies management is an overkill by multiple reasons, as well as ETA (do i need to explain?).
   5. Even today i can create a Kanban board in Notion (or Jira) with a single prompt, and forward all the progress in there, making tasks management nicer. IDK if it worth it though.

But i like the idea of having all the tasks numbered, with proper descriptions.
