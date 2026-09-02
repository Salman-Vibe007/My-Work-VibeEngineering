# Sky Rush: Flying Car Coin Collector

<p align="center">
  <img src="https://img.shields.io/badge/Engine-Three.js%20%2F%20WebGL-blueviolet" alt="Engine Badge" />
  <img src="https://img.shields.io/badge/Format-Single%20Build%20Session-orange" alt="Format Badge" />
  <img src="https://img.shields.io/badge/Focus-3D%20Arcade%20Flight%20Game-green" alt="Focus Badge" />
</p>

> A Single-Session Project Plan

## Project Summary

Sky Rush is a browser-based 3D arcade game built with Three.js. You fly a car through the sky, collect coins for score, and dodge obstacles that end the run on impact. The plan below scopes it as a single focused build session — a working, playable prototype by the end, with clear stretch goals if time allows.

---

## Format

- One build session
- Tech: Three.js / WebGL, runs in the browser, no install needed
- Goal: a playable prototype (fly, collect, dodge) with score and speedometer, plus stretch features if time permits

## Core Tools

- **Three.js** — scene, camera, lighting, 3D models, rendering loop
- **Simple box collision (AABB)** — for coin pickup and obstacle hits, no physics engine needed at this scope
- **HTML/CSS overlay** — score, speedometer, and game-over UI on top of the canvas

---

# Core Mechanics

## Flying Car Control

- WASD or arrow keys for forward/back/turn, plus a key pair (e.g. Space/Shift) for altitude up/down
- Camera follows behind and slightly above the car
- Speed increases with forward input, capped at a max; a light auto-drift/glide when idle keeps it feeling airborne

## Coin Collecting

- Coins spawn along the flight path (grid or scattered pattern) as simple rotating rings or stars
- Collision with the car removes the coin and increments the score
- Score shown live in the HUD

## Obstacle Avoidance

- Static and slow-moving obstacles (rings, floating blocks, drones) placed in the flight path
- Collision triggers a hit — either an instant game-over or a health/shield system that allows a few hits
- Near-miss detection is a nice-to-have for later, not needed for the prototype

---

# Feature Checklist

**Must-have (core prototype):**
- [ ] Flying car movement and camera follow
- [ ] Coin spawning, collection, and score counter
- [ ] Obstacle spawning and collision → game over
- [ ] Speedometer HUD

**Stretch goals (if time allows):**
- [ ] Power-ups: speed boost, shield (temporary hit immunity), coin magnet
- [ ] Levels / difficulty progression: obstacles get denser and faster over time or in stages
- [ ] Score leaderboard: track and display best runs for the session
- [ ] Car colour customization: a simple colour picker or swatch selector before each run

---

# Build Session Plan

## Phase 1: Scene & Flight Core (~60–90 min)

- Set up the Three.js scene: sky, ground/horizon, lighting
- Build or import a simple car mesh (basic primitives are fine)
- Wire up keyboard controls for forward, turn, and altitude
- Camera-follow rig behind the car

## Phase 2: Coins & HUD (~45 min)

- Spawn coin objects at intervals along the path
- Collision detection to collect coins and update score
- Add the HUD: score counter and speedometer, driven by the car's current speed

## Phase 3: Obstacles & Game Over (~45 min)

- Spawn obstacles in the flight path
- Collision detection → trigger game-over state
- Simple restart flow (reset car position, score, coins, obstacles)

## Phase 4: Stretch Features (~45–60 min)

- Power-ups: boost, shield, magnet — each a pickup with a timed effect
- Difficulty progression: increase obstacle speed/density as score rises
- Leaderboard: store best scores for the session
- Car colour picker on a start screen

---

# What You Walk Away With

- A playable 3D flying-car prototype: fly, dodge, collect coins, track score
- A speedometer and score HUD wired to real game state
- Power-ups, difficulty scaling, a session leaderboard, and car customization as extensions if the stretch phase is reached
- A base you can keep extending later — new obstacle types, longer levels, sound, or a proper menu system

---

<p align="center">
  <strong>Planned for a focused single build session — fly, collect, survive.</strong>
</p>
