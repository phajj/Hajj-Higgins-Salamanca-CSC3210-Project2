# Hajj-Higgins-Salamanca-CSC3210-Project2
Computer Graphics Project 2

## Group Members:
- Peter Hajj
- Jackson Higgins
- Laura Salmanca

## Overview

TODO later

## How to Play

TODO later

## Running the Project

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start a local server:
   ```bash
   npm start
   ```
3. Open the printed local address (e.g. `http://localhost:3000`) in your browser.

## Technical Docs

### Challenges 
- Peter Hajj
  - The WASD camera controls were handled in a single `keydown` switch statement, so only one key could be used at a time (for example, W + A could not move the camera forward and left together). 
      - I switched to `keydown`/`keyup` listeners that set a pressed boolean for each key. With help from Claude Code, I moved the movement checks into an `updateMovement()` function that the render loop calls every frame, key inputs can be combined (see [docs/prompts.md](docs/prompts.md)).
### Above and Beyond Implementations
TODO: update as we go