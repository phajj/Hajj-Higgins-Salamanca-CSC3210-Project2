## LLM Prompts

This file records the prompts we gave to AI coding assistents and/or other LLMs for help while coding this project. It is orginaized by group member, each bullet depicts the initial prompt with the subbullets depicting the revision prompts.

## Peter (using Claude Code CLI and GitHub Copilot CLI)
- Write an instruction set for claude code in @CLAUDE.md to document the prompts I (and my teammates who also use claude code) use while working on this project. Here are the instruction: document (word for word) each major prompt as a bullet in @docs/prompts.md, if there are continued revistionary prompts used in the session but a brief (one sentence) description as a sub bullet under the original bullet. If the user is Peter, put the prompts under the Peter section of @docs/prompts.md, same is two for the other group members. INsure the prompts are in order of use (the first bullet should be the first prompt). Add this prompt as the first prompt in @docs/prompts.md
  - LLM: Claude Code CLI
- In @src/main.js I wrote the switchCam() function that checks keyboard input for 1 2 or c. 1 will be wired to perspective cam, 2 will be orthographic cam and c will switch to the other view (see the nested if else statement in case c.) I am struggling to actually wire them to switch to the respective camera in @src/camera.js, help me set those in each case's nested if (camera instance of THREE.< which ever camera>)
  - LLM: Claude Code CLI
  - Note from Peter: It was easy as importing both cameras into main and making constants for both lol
- Copy @CLAUDE.md as a COPILOT.md or whatever the equivalent is for GitHub Copilot CLI, but do not copy the actual bullets. Add a section at the start that says I am creating this sepreately to test using Copilot CLI in addition to Claude Code
  - LLM: GitHub Copilot CLI
- Include instructions in both @CLAUDE.md and @COPILOT.md to add a note per bullet in @docs\prompts.md to detail which llm used that prompt
  - LLM: Claude Code CLI
- Document the original prompt I used for this session and specify claude code was used for the other two prompts
  - LLM: Claude Code CLI
- Add a section at the start of both @COPILOT.md and @CLAUDE.md (hyperlink each other) to say I have both because I am using this project to test both AI coding agents and compare their strengths and weaknesses. Add this prompt to @docs\prompts.md
  - LLM: Claude Code CLI
- clear all the (1138) new files that just got added to this directory (aka every unstaged changes, do not clear the staged changes ( @src/main.js and @src/camera.js )). Update @package.json and whatever else needs to be updated in order to match the npm serve command detailed in @README.md
  - LLM: Claude Code CLI
  - should @package-lock.json be in the gitignore?
- Make a some temporary geometry to live in the space for me to test the camera movements and controls
  - LLM: Claude Code CLI

## Jackson 

## Laura
