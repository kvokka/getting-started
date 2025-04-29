# Project notebook

This is a place for all the project related logbook, notes, thoughts, ideas, etc.
It might reveal for the newcomers the way how the project was created, and remind me
the thoughts and ideas, which were in my mind at the moment of creating the project.

## Logbook

This part of the document explains the considerations for the rules created in the project and reveal the comments of the rules, why and how they were created. Treat it as a logbook, with the links to the docs any my (and AI's) thoughts.

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

6. After yet another timeout with claude-sonnet-3.7, i've decided to try to use
   gemini-2.5-pro, and it was a great decision. A few times faster, way more accessible,
   and the quality is great. But after one of the tasks it came up to me with the idea,
   that it need to make a fix in the existed code because the naming was not perfect. I
   agreed, but after the changes were done, AI had to commit the changes, but the task for
   that was not created in memory bank, and it didn't know what to do. It triggered me to
   dig deeper into [cursor-memory-bank](https://github.com/vanzan01/cursor-memory-bank).
   I wanted to find how tasks creation was documented, but it was not there. So now
   :facepalm: i finally read all the docs and rules inside cursor-memory-bank, and
   it revealed, that the majority of the project was not required with the model like
   gemini-2.5-pro. The essential parts were missing, while the main workflows were
   targeting the bootstrap of the project, which is not the case for me. I believe that
   the initial idea of the project is great, but the research about that was done
   with the claude-sonnet-3.7, or maybe with less advanced model, and i suppose, that
   it became outdated before the release. Unfortunately, I'll have to move to another
   tools. Need to mention that the idea of diagram usage for LLM's is amazing.

7. Next I step to the roots, [cline memory bank](<https://docs.cline.bot/>   improving-your-prompting-skills/cline-memory-bank). It doesn't try to over-engineer
   and in the process of planning the way from A to Z, at the very beginning to
   predict how should look point R, T, F or M. In the other hand it will require more
   manual work, more rules and workflows creation, but it will be worth it.

8. Just a couple of words about Cursor. It does not provide the way to start a
   subtask in the different mode, or [/new_task tool](https://docs.cline.bot/exploring-clines-tools/new-task-tool). It just does not know such feature.
   [@docs](https://docs.cursor.com/context/@-symbols/@-docs) feature is actually
   the [json](https://raw.githubusercontent.com/getcursor/crawler/main/docs.jsonl)
   with links to the docs, which with the latest LLM's is not helpful (ofc maybe
   I missing something, but in this implementation it's definitely not a deal
   breaker for me).
   [@lint-error](https://docs.cursor.com/context/@-symbols/@-lint-errors) idea
   looks great, but I prefer to manage that with git hooks. Plus, some essential
   linters, like API KEY leaking (not limiting to only this one), are not
   supported yet. Only yesterday Cursor got a
   [neat way](https://forum.cursor.com/t/resolve-local-environment-variables-in-mcp-server-definitions/79639/13)
   to keep `.cursor/mcp.json` in git, ty for [envmcp](https://www.npmjs.com/package/envmcp).

9. Roo, Cline and Cursor all have different of interpretation of what "rules" are.
   Regardless that they all are a system prompts in plain text, and all of them
   have the same purpose. It mean that now I should focus on reworking on the
   way how to store them for been able to use all the tooling, keeping my hands
   untied in elegant way, preferably.

10. Also one of the great ideas, which was great to check is to use cheap models
   when it's possible. The first project which i noticed on this topic was
   [RooCodeMicroManager](https://github.com/adamwlarson/RooCodeMicroManager).
   The great idea, of course its tied to the [RooCode](https://github.com/RooVetGit/Roo-Code)
   but it proven the idea to cut the costs this way. It's only a sketch, and many
   questions are still open. Like what amount of the context should be forwarded
   to each model? If we start a new session, then should memory bank be loaded?
   What custom rules should be used and how? Will try to find more mature solutions
   until trying any DYI, most likely there should be dudes smarter than me who
   already did that.

11. Found [Plandex](https://github.com/plandex-ai/plandex) project. IDK how it was
   missed before. Now i installed it locally in docker and had to open a couple
   of issues on GH, but regardless it looks like it's what i need. It will require
   some love to install, and now MCP support is missing, but the features provided
   are outcome the minuses. Unfortunately it supports only OpenAI and OpenRouter
   providers. *note*: OpenRouter cut DeepSeek input tokens, Gemini 2.5 pro free is
   gone, and Grok3 models with huge amounts of free allowance are not available.
