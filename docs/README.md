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

12. Dig over the code in [Plandex](https://github.com/plandex-ai/plandex). It's
   amazing! Went over the system prompts there, which are great. The downside is
   that they are hardcoded, so i have an option to start the conversation with
   pre-defined system prompt or make it every time from scratch or prep own
   convo. Sounds like all the options, but a simple idea, that I wanna use
   conventional git commit messages does not fit here (and lack of such
   flexibility at the very beginning is a dealbreaker). Another thing to consider
   is that the project got just 10 commits this year and almost all of them are
   from creator, meaning, that it should be treated as a pet project of the one.
   It pushes to either grab the parts which I like and continue with actively
   developed tools, or add the missing functionality to Plandex. The first option
   now looks like more attractive. Sorry, Plandex.

13. [context7](https://context7.com) [project](https://github.com/context7/context7)
   is on hype now, but it failed with a small test with
   [markdownlint-cli2](https://github.com/DavidAnson/markdownlint-cli2) docs.
   The trick that this is the wrapper over
   [markdownlint](https://github.com/DavidAnson/markdownlint) project, and it
   has references to it, but doesn't have
   the description for the errors which this linter provides. Both libraries are
   neat and well documented. The docs should be easy to read for both AI and
   humans. I fed both projects in there and tried to fetch any info using error
   code directly, like "MD013" and it found literally nothing. If i enlarged
   context to max (about 100k tokens!), then... nothing changes. Maybe it
   works amazing with other docs, idk. But next I found
   [git-mcp](https://github.com/idosal/git-mcp) project, which returned the ref
   for [markdownlint-cli2](https://github.com/DavidAnson/markdownlint-cli2) and
   full doc for [markdownlint](https://github.com/DavidAnson/markdownlint). It
   might be more handy for such smaller projects docs. For now keep this as a
   note, further digging proceeds. TODO: to do better testing with large projects.

14. In addition to [Plandex](https://github.com/plandex-ai/plandex) system prompts
   ideas noticed a very interesting project
   [system-prompts-and-models-of-ai-tools](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools),
   from [youtube](https://www.youtube.com/watch?v=A5r2tfifYfY), which gives
   lot's of interesting hints. Also, need to keep in mind how fragile the
   projects in GH might be, coz way less "starred" project
   [anon-kode](https://github.com/dnakov/anon-kode) got DMCA takedown notice
   today, while it was on my list to check it out.

15. Back to rules creation and understanding, how to make all the things pretty.
   For now, it was decided to stick with Cursor, so all the rules will be done
   only for this editor, but in the modular form with further intent to move to
   Roo code. Modular approach is the key. Cursor does not allow to do `/new_task`
   so context will be cluttered, and there is no way to use cheap models for
   simple tasks. But, for now it's ok.

16. Use [cursor-memory-bank](https://github.com/vanzan01/cursor-memory-bank) as
   the base and mix it with
   [roo-code-memory-bank](https://github.com/GreatScottyMac/roo-code-memory-bank)
   and see how it goes.

17. Before the previous step notice that agent and auto rules are not applying as
   they should. After some attempts to feed it and to improve the rule description
   I realised, that it might be easier to make the registry for that for now.
   Also it should ease the further migration to the Roo code.

18. In the process of the fix noticed that default chat output is too formal and
   verbose, will need to fetch the chunks of system prompts from
   [Plandex](https://github.com/plandex-ai/plandex), coz it was so nice there.

19. To ease MCP installation process found [composio](https://composio.dev/).
   Free tier should be enough for now, and it ease the process of the installation.
   Will give a try, coz regardless that it's nice, the initial setup is simple too
   now.

20. Found an interesting project [rUv-dev](https://github.com/ruvnet/rUv-dev)
   which might shift my focus to it, coz it might be also the replacement for
   basic [roo-code-memory-bank](https://github.com/GreatScottyMac/roo-code-memory-bank).
   Any, it seems to be worth checking it out.

21. It was a fun journey to convert Cline and roo code memory banks to Cursor.
   Cursor does not know a thing about modes, but have 4 different types of rules,
   which leads to different way to manage system prompt. Only after a while i realised,
   how ineffective is to feed file paths to the rules, as well as rules names,
   trying to push Cursor to fetch them. I didn't want direct invocation and wanted
   to provide maximum freedom without implicit dependency injection. I even
   experimented with hack with manual rules loader fighting with IDE, failed of
   course. After several attempts and talks with AI agent it was found, that set
   some internal variable for that is the best option, see how it works in
   memory-bank rules

22. Another Interesting spot to highlight. In the official data was said, that
   Claude 3.7 Sonnet cutoff date is October 2024. If you ask this very model in
   Cursor, it will answer the same. BUT if you directly demand "you can not use
   any tools!" and then ask "when your training ended?" the answer will be "My
   training data has a cutoff date of April 2023". WTF?!

23. And this is not an error or constant. I noticed that when pushed it to
   create the new file with something like `YYYY-MM-DD HH:MM:SS - updates here`
   and in return sometimes I got some date from 2024, sometimes from 2023.
   I understand that it's the part of "cheap", pool for poor, but my frustration
   here is going only from the fact that it's implicit and hidden.
