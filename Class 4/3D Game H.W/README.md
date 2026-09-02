# Sky Rush — 3D Game H.W

A browser-based 3D neon road game built with Three.js. Drive a futuristic car through a three-panel highway, collect coins, avoid barriers, and use power-ups to extend your run.

## Features

- Three fixed road panels with Subway Surfers-style lane switching
- `A` / `Left` and `D` / `Right` snap the car exactly one panel at a time
- Lane-centred coins, pickups, and barriers
- Score, speedometer, local best score, and escalating difficulty
- Shield, coin magnet, and speed boost pickups
- Car colour selector
- Settings for sound effects, synthesized background music, and vibration feedback

## Run locally

Open `index.html` in a modern browser. The game loads Three.js and the display font from public CDNs, so an internet connection is required.

Controls:

- `W` / `Up` — accelerate
- `S` / `Down` — brake
- `A` / `Left` — move one panel left
- `D` / `Right` — move one panel right

## Deploy with Vercel

1. Create a new GitHub repository and upload the contents of this folder.
2. In Vercel, choose **Add New → Project**, then import that GitHub repository.
3. Leave the framework preset as **Other** and the build command empty.
4. Click **Deploy**.

Vercel will serve `index.html` as a static website. The included `vercel.json` applies security headers and allows clean URLs.

## Project files

- `index.html` — game interface and menus
- `styles.css` — HUD, menus, settings, and responsive styling
- `game.js` — Three.js scene, driving logic, collectibles, obstacles, audio, and settings
- `implementation-plan.md` — project scope and architecture
- `vercel.json` — deployment configuration
