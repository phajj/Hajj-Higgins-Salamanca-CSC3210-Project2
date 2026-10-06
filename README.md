# Hajj-Higgins-Salamanca-CSC3210-Project2
Computer Graphics Project 2

## Group Members:
- Peter Hajj (PM, Camera Designer)
- Jackson Higgins (Sun and Satellite Designer)
- Laura Salamanca (Terrain Designer)

## Overview

The application is a 3D interactive model of a dynamic terrain mesh with an orbiting surveillance satellite, as well as a sun object orbiting the terrain. Built with [Three.js](https://threejs.org/), the model features both a perspective and orthographic camera which is able to be toggled between by the user. The perspective camera allows for the user to move within the space and adjust the camera's direction.

## How to Play

- Toggle between the perspective and orthographic camera by pressing the C key, or 1 for perspective, and 2 for orthographic.
- While in perspective camera mode, use WASD keys to move the camera around or Q and E to tilt the camera left and right.
- While in perspective camera mode, use the mouse to direct where the camera is looking.

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
- Jackson Higgins
  - Implementing delta time for rotation
    - Solution: Googled threejs delta time example and applied same logic to this project
- Laura Salamanca
  - Implementing a dynamic terrain that changes height over time
    - Solution: I reviewed the code example from class of Unit 3's Vertex shader.
    
### Above and Beyond Implementations
- Implemented a sun object that orbits the terrain, emitting light to illuminate surfaces.
