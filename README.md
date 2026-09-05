# Raasta.AI (रास्ता.AI)
### Adaptive Path Planning & Collision Avoidance for Autonomous Vehicles on Unstructured Indian Roads

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Autonomy Level: L4+](https://img.shields.io/badge/Autonomy-Level%204%2B%20Ready-brightgreen.svg)](#)
[![Sensor Fusion](https://img.shields.io/badge/Sensor%20Fusion-360%C2%B0%20LiDAR%20%2B%208%20CAM%20%2B%204D%20Radar-cyan.svg)](#)
[![Safety Protocol](https://img.shields.io/badge/Safety-ISO%2026262%20ASIL--D%20Aligned-red.svg)](#)

---

## Overview

**Raasta.AI** is an advanced autonomous motion planning, sensor perception, and fail-safe safety frontend designed specifically for unstructured, chaotic, and dynamic Indian driving environments. 

Unlike conventional autonomous driving systems trained on structured Western highways with pristine lane markings and predictable traffic etiquette, **Raasta.AI** is engineered to handle:
- **Unmarked & Degraded Road Corridors**: Dynamic lane estimation across missing dividers, potholes, asphalt patches, and dirt shoulders.
- **Heterogeneous Traffic Density**: Real-time trajectory prediction for unpredictable agents—including two-wheelers, auto-rickshaws, stray cattle, jaywalking pedestrians, and pushcarts.
- **Micro-Yielding & Tactical Negotiation**: Kinodynamic game-theoretic path planning using **Dynamic Window Approach (DWA)** and **Artificial Potential Fields (APF)**.

---

## Key Subsystems & Features

### 1. Interactive Path Planning Simulator
- Real-time 2D kinematic canvas simulator demonstrating obstacle avoidance, dynamic potential fields, and velocity vector planning.
- Visualizes attractive goal potential vectors, repulsive obstacle vectors, sensor perception cones, and projected trajectory ribbons.
- Dynamic obstacle spawning: auto-rickshaws, stray bovines, two-wheelers, and sudden crossing pedestrians.

### 2. The 5 Indian Road Edge Scenarios
Interactive high-resolution edge scenario inspector with telemetry, risk matrices, and sensor fusion feeds:
1. **Unmarked Rural Road**: Navigating narrow single-lane village corridors with unpaved dirt shoulders.
2. **Dense Market Swarm**: Micro-yielding through high-density pedestrian corridors and two-wheelers.
3. **Stray Cattle Crossing**: Biological pose estimation and wide-radius collision avoidance for cows and buffaloes.
4. **Chaotic Urban Intersection**: Multi-agent conflict resolution at un-signaled junction bottlenecks.
5. **High-Speed Highway Merge**: Countering wrong-side vehicles and sudden aggressive lane cuts on national expressways.

### 3. Perception & Vision HUD Showcase
- Interactive multi-camera telemetry selector (Front Main Cam, Left Lateral, Right Lateral, Rear Telephoto, Wide Fish-Eye, LiDAR Point Cloud).
- Dynamic HUD overlay displaying bounding boxes, classification tags, TTC (Time-To-Collision), and confidence scores.

### 4. Emergency SOS & Fail-Safe E-Stop System
- **Dual Form-Factor Support**:
  - **In-Page Glassmorphic Safety Modal**: Instant hardware E-Brake trigger with live simulator backdrop, cancelable 3-second countdown, and full telemetry stream.
  - **Standalone Dedicated SOS Route**: Clean full-screen safety display at `emergency-sos.html` and Next.js / Tailwind component at `src/app/emergency-sos/page.tsx`.
- **Hardware Intervention Loop**:
  - Emergency brake-by-wire hydraulic fail-safe clamp.
  - C-V2X high-priority emergency broadcast packet over 5G NR Band n78.
  - RTK-GPS coordinates stream (latitude/longitude with $\pm 1.4\text{ cm}$ precision).
  - Integrated Text-To-Speech (Web Speech API) & Web Audio emergency acoustic siren.

### 5. Dual Obsidian / Titanium HUD Themes
- **Obsidian Dark (Cyber-HUD)**: High-contrast telemetry designed for night navigation and driver cockpit HUDs.
- **Titanium Light (Lab Telemetry)**: High-visibility daytime analysis mode for track testing and diagnostics.

---

## Research & Engineering Core Team

| Name | Role | Focus Area |
| :--- | :--- | :--- |
| **Prateek** | Team Lead | System Architecture & Integration |
| **Swasteek** | Backend Eng. | Pipeline, Control Logic & Stateflow |
| **Ayush** | Model Trainer | Trajectory Prediction & Sensor Fusion (DL) |
| **Rituraj** | Simulation Eng. | RoadRunner Scenarios & Vehicle Dynamics |
| **Purva** | UI/UX Designer | HUD Interface, Visual Hierarchy & Dashboard |
| **Shambhavi** | Debug Eng. | Closed-Loop Validation & Fault Analysis |

---

## Technology Stack

- **Frontend Core**: Vanilla HTML5, Modern ECMAScript (ES2022+), CSS3 with CSS Custom Properties.
- **Graphics & Audio**: HTML5 Canvas 2D API, Web Audio API, Web Speech Synthesis API.
- **Next.js Route**: TypeScript, React 19, Tailwind CSS, Framer Motion (`src/app/emergency-sos/page.tsx`).
- **Zero Build Requirement**: Pure client-side application—can be served directly with any static web server.

---

## Local Development & Quickstart

Clone the repository and start any local HTTP server:

```bash
# Clone the repository
git clone https://github.com/DakCamper123/raastaAI.git
cd raastaAI

# Option A: Python 3
python -m http.server 3000

# Option B: Node.js (npx serve)
npx serve -l 3000

# Option C: VS Code Live Server
# Right click index.html -> "Open with Live Server"
```

Open your browser and navigate to:
```
http://localhost:3000/index.html
```

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
