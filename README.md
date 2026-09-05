<div align="center">

```
██████╗  █████╗  █████╗ ███████╗████████╗ █████╗     █████╗ ██╗
██╔══██╗██╔══██╗██╔══██╗██╔════╝╚══██╔══╝██╔══██╗   ██╔══██╗██║
██████╔╝███████║███████║███████╗   ██║   ███████║   ███████║██║
██╔══██╗██╔══██║██╔══██║╚════██║   ██║   ██╔══██║   ██╔══██║██║
██║  ██║██║  ██║██║  ██║███████║   ██║   ██║  ██║██╗██║  ██║██║
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═╝
```

# रास्ता.AI (Raasta.AI / BharatNav-AI)
### *Next-Generation Autonomous Vehicle Simulation Platform Engineered for Unstructured Corridors*

[![Next.js 14](https://img.shields.io/badge/Framework-Next.js%2014%20(App%20Router)-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 18](https://img.shields.io/badge/React-18.3.1-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6%20Strict-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS%20v3%20%2B%20CSS3%20Variables-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/3D%20HUD-Three.js%20r169-black?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org/)
[![KaTeX](https://img.shields.io/badge/Math%20Typesetting-KaTeX%200.16-319795?style=for-the-badge&logo=latex&logoColor=white)](https://katex.org/)
[![Safety Standard](https://img.shields.io/badge/Safety-ISO%2026262%20ASIL--D-ff3355?style=for-the-badge&logo=shield&logoColor=white)](#)
[![V2X Protocol](https://img.shields.io/badge/C--V2X%20Latency-%3C11.2ms%20%7C%205G%20NR-00ff88?style=for-the-badge&logo=5g&logoColor=black)](#)

<p align="center">
  <b>A production-grade, zero-external-component-library autonomous mobility simulator built with custom CSS3/Tailwind styling, 60 Hz kinematic physics, dynamic Artificial Potential Fields (APF), Dynamic Window Approach (DWA), and biological obstacle pose tracking.</b>
</p>

[Philosophy](#-the-raasta-philosophy) • [Interactive Cockpit](#-simulation-cockpit) • [Architecture](#-system-architecture) • [Math Engine](#-mathematical-engine) • [Edge Scenarios](#-5-indian-road-edge-scenarios) • [Emergency SOS](#-emergency-sos--fail-safe-architecture) • [Team](#-engineering--research-team) • [Quickstart](#-quickstart--local-development)

</div>

---

## 🧭 The Raasta Philosophy: Autonomy Where It Counts

> *"If an autonomous vehicle can master Old Delhi's Chandni Chowk, navigate a monsoon ghat in Kerala, and out-negotiate an unmarked rural highway merge — it can drive anywhere on Planet Earth."*

Conventional Level 4 autonomous driving systems developed in Silicon Valley or Munich depend heavily on idealized assumptions:
- Laser-straight, freshly painted lane markers and reflective road signs.
- Homogeneous, disciplined vehicular traffic adhering to strict right-of-way rules.
- Predictable pedestrian flow and animal-free divided expressways.

**Indian road corridors completely rewrite this rulebook:**
1. **Virtual Lanes**: Roads expand and contract dynamically without lane paint. Centerlines are mentally inferred by human drivers.
2. **Heterogeneous Traffic Mix**: Multi-axle freight trucks, three-wheeled auto-rickshaws, customized *jugaad* tractors, 100cc motorcycles, and non-motorized handcarts share identical asphalt.
3. **Biological & Dynamic Road Hazards**: Stray cattle (*Bos indicus*) rest on warm asphalt, requiring empathetic, non-verbal micro-negotiation and wide-radius deceleration rather than aggressive honking.

**Raasta.AI** solves this real-world operational design domain (ODD) using a blended kinematic stack: **Kinodynamic Artificial Potential Fields (APF)**, **Dynamic Window Approach (DWA)**, and biological pose-tracking neural networks (**Bovine-PoseNet**).

---

## ⚡ High-Tech System Architecture

```
 ┌────────────────┐  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐
 │  360° 128-Beam │  │  8x 4K HDR Low-│  │  4D Ultra-Res  │  │  Dual RTK-GNSS │
 │  Solid-State   │  │  Latency Cams  │  │ Imaging Radar  │  │   + IMU 6-DOF  │
 │     LiDAR      │  │  (360° Surround)│ │ (77-79 GHz)   │  │ (±1.4 cm RTK)  │
 └───────┬────────┘  └───────┬────────┘  └───────┬────────┘  └───────┬────────┘
         │                   │                   │                   │
         └─────────────────┐ │ ┌─────────────────┘                   │
                           ▼ ▼ ▼                                     │
           ┌───────────────────────────────────┐                     │
           │       SENSOR FUSION ENGINE        │◄────────────────────┘
           │  • BEVFormer Multi-Cam Projection │
           │  • Dynamic Occupancy Grid (60 Hz) │
           │  • Extended Kalman Pose Filtering │
           └─────────────────┬─────────────────┘
                             │
                             ▼
           ┌───────────────────────────────────┐
           │   PREDICTION & PERCEPTION PIPELINE│
           │  • Bovine-PoseNet Keypoint Track  │
           │  • TTC (Time-To-Collision) Vector │
           │  • Game-Theoretic Intention Model │
           └─────────────────┬─────────────────┘
                             │
                             ▼
           ┌───────────────────────────────────┐
           │     HYBRID MOTION CONTROLLER      │
           │  • APF Virtual Repulsive Surface  │
           │  • DWA Feasible Velocity Search   │
           │  • Curvature & Kinematic Clamping │
           └─────────────────┬─────────────────┘
                             │
                             ▼
           ┌───────────────────────────────────┐
           │    DRIVE-BY-WIRE FAIL-SAFE CORE   │
           │  • ASIL-D Hydraulic E-Brake Loop  │
           │  • 5G NR C-V2X Emergency Packet   │
           │  • Voice Acoustic Siren Synthesis │
           └───────────────────────────────────┘
```

---

## 🧮 Mathematical Engine

Raasta.AI combines dynamic artificial potential surfaces with localized velocity space search executing at a deterministic **60 Hz refresh rate**:

### 1. Artificial Potential Field (APF) Formulation

The vehicle state $q = [x, y]^T$ is driven by a superposition of an attractive goal potential and repulsive obstacle barriers:

$$U_{total}(q) = U_{att}(q) + \sum_{i=1}^{N} U_{rep, i}(q)$$

#### Attractive Gradient
Pulls the ego vehicle toward the forward corridor waypoint $q_{goal}$:

$$U_{att}(q) = \frac{1}{2} k_{att} \cdot \|q - q_{goal}\|^2$$

#### Dynamic Repulsive Potential
Creates an exponential safety barrier around dynamic obstacles, modulated by ego velocity $v_{ego}$:

$$U_{rep}(q) = \begin{cases} 
\frac{1}{2} k_{rep} \left( \frac{1}{\rho(q)} - \frac{1}{\rho_0} \right)^2 \left(\frac{v_{ego}}{v_{max}}\right) & \text{if } \rho(q) \le \rho_0 \\
0 & \text{if } \rho(q) > \rho_0
\end{cases}$$

Where:
- $\rho(q) = \|q - q_{obs}\|$ is the Euclidean distance to the nearest obstacle.
- $\rho_0$ is the repulsive influence horizon (typically $6.0\text{ m}$ in urban creep, $18.0\text{ m}$ on expressways).
- $k_{rep}$ is the obstacle stiffness gain.

### 2. Dynamic Window Approach (DWA) Objective Function

Within the kinematically admissible acceleration envelope $(v, \omega) \in V_d$, the trajectory search selects the pair maximizing:

$$G(v, \omega) = \alpha \cdot \text{heading}(v, \omega) + \beta \cdot \text{dist}(v, \omega) + \gamma \cdot \text{velocity}(v, \omega)$$

Where:
- $\text{heading}(v, \omega)$ penalizes angular divergence from the target waypoint.
- $\text{dist}(v, \omega)$ measures the clearance margin to the nearest obstacle along the forward arc rollout.
- $\text{velocity}(v, \omega)$ incentives optimal traffic throughput.
- $[\alpha, \beta, \gamma]$ are dynamically weighted based on traffic density and weather telemetry.

---

## 🔬 5 Indian Road Edge Scenarios

| # | Edge Case | Threat Profile | Autonomous Mitigation Strategy |
|:-:|:---|:---|:---|
| **01** | **Unmarked Rural Road** | Potholes, unpaved muddy shoulders, zero lane markings | Virtual centerline inference via road surface texture segmentation; shoulder slip angle damping. |
| **02** | **Dense Market Swarm** | Dense pedestrians, handcarts, swarming two-wheelers | Sub-8 km/h tactile creep mode; pedestrian velocity vector forecasting and courteous micro-yielding. |
| **03** | **Stray Cattle Crossing** | Unpredictable bovines standing/laying across lanes | **Bovine-PoseNet** biological keypoint tracking; wide-radius non-aggressive deceleration without horn panic. |
| **04** | **Chaotic Urban Junction** | Multi-agent un-signaled bottleneck gridlock | Game-theoretic conflict arbitration; dynamic priority slot calculation and virtual gap slot-in. |
| **05** | **High-Speed Highway Cut** | Aggressive lane-cutting buses, wrong-side tractors | 360° continuous 4D radar tracking; sub-40ms high-speed evasive lane lateral translation. |

Each scenario is interactively selectable on the **Simulation Cockpit** (`/dashboard?scenario=01-05`) or browsable via the dedicated **Edge Cases Matrix** (`/scenarios`).

---

## 🚨 Emergency SOS & Fail-Safe Architecture

Safety is engineered directly into the hardware and software layers:

1. **Dedicated Full-Screen Route (`/emergency-sos`)**:
   - Deep red pulsating HUD (`#ff3355`) with high-visibility emergency styling.
   - Large central hardware E-Stop activation switch.
   - **3-second circular SVG abort countdown** with manual override.
   - Live **RTK-GNSS coordinate readout** ($\pm 1.4\text{ cm}$ accuracy) for the NH-48 Pune-Bengaluru Corridor (`18.5204° N, 73.8567° E`).
   - Integrated **Web Speech API** synthesized voice transmission: *"Emergency stop initiated. All systems halting."*
   - Dual-frequency **Web Audio API** siren synthesizer ($800\text{ Hz} \leftrightarrow 1200\text{ Hz}$ alternating sweep).
   - Real-time **5G NR C-V2X URLLC packet stream** log over Band n78.
2. **Global Fail-Safe Overlay (`Ctrl + Shift + E`)**:
   - Accessible from any screen via keyboard shortcut or header button.
   - Immediately clamps the virtual vehicle brakes and opens the glassmorphic safety modal.

---

## 🎨 Dual Cockpit Design System

Constructed with **zero external UI component libraries** using pure CSS3 custom properties and Tailwind utilities:

### 🌑 Theme A — "Obsidian Cyber-HUD" (Default Dark)
- Designed for night-time driver HUD transparency with zero glare.
- `--bg-primary: #06090e`, `--bg-secondary: #0a0f18`, `--surface-glass: rgba(10, 15, 24, 0.72)`.
- Laser cyber-cyan (`#00f0ff`) and warning-amber (`#ffaa00`) HUD accents.

### ☀️ Theme B — "Titanium Lab Telemetry" (Light Mode)
- Designed for daytime test-track diagnostics, field validation, and telemetry auditing.
- `--bg-primary: #f4f6fa`, `--bg-secondary: #ffffff`, `--surface-glass: rgba(255, 255, 255, 0.82)`.
- Deep cobalt (`#0077cc`) and amber-gold (`#d97706`) accents.

Toggle seamlessly using the `☀️ / 🌙` switch in the navigation bar. Theme preference is automatically persisted across browser sessions via `localStorage`.

---

## 📁 Complete Project Structure

```
src/
├── app/
│   ├── layout.tsx                      ← Root layout with Theme, Simulation, SOS providers & global SOSModal
│   ├── page.tsx                        ← Cinematic hero landing with Three.js particle field & tagline
│   ├── globals.css                     ← Dual-cockpit CSS custom variables & KaTeX typography
│   ├── dashboard/
│   │   └── page.tsx                    ← Main 60 Hz simulation cockpit with ?scenario= query loader
│   ├── architecture/
│   │   └── page.tsx                    ← 6-stage animated system flow diagram & KaTeX formula explainer
│   ├── scenarios/
│   │   └── page.tsx                    ← 5 Indian road edge cases comparison table & masonry cards
│   ├── emergency-sos/
│   │   └── page.tsx                    ← Dedicated full-screen ASIL-D emergency fail-safe route
│   └── team/
│       └── page.tsx                    ← Core engineering team roster
├── components/
│   ├── layout/
│   │   ├── DashboardLayout.tsx         ← Responsive 4-column desktop / tablet / mobile layout shell
│   │   ├── PanelGrid.tsx               ← CSS Grid orchestrator with compact floating feeds overlay
│   │   ├── CollapsibleDrawer.tsx       ← Focus-trapped mobile/tablet bottom drawers
│   │   ├── StickyHeader.tsx            ← Navigation header with live CAN-bus marquee & theme toggle
│   │   └── ScrollableSidebar.tsx       ← Safe overflow scenario list & system health sidebar
│   ├── hero/
│   │   ├── PhilosophyHero.tsx          ← Full-bleed cinematic landing hero
│   │   ├── AnimatedTagline.tsx         ← Deterministic word-by-word typewriter effect (80ms/word)
│   │   └── RoadParticleField.tsx       ← Three.js perspective road particles canvas
│   ├── architecture/
│   │   ├── SystemFlowDiagram.tsx       ← Animated SVG converging signal pipeline
│   │   ├── SensorNode.tsx              ← Individual sensor suite specification card
│   │   ├── FusionEngineBlock.tsx       ← BEVFormer & dynamic occupancy grid block
│   │   ├── PredictionPipeline.tsx      ← Bovine-PoseNet & TTC trajectory block
│   │   ├── MotionControllerBlock.tsx   ← APF repulsive surface & DWA velocity block
│   │   └── FailSafeCoreBlock.tsx       ← ASIL-D drive-by-wire E-Brake block
│   ├── math/
│   │   ├── APFFormulaRenderer.tsx      ← KaTeX APF formulas with real-time interactive canvas heatmap
│   │   ├── DWAObjectiveRenderer.tsx    ← KaTeX DWA scoring formulas with interactive sliders
│   │   └── MathExplainer.tsx           ← Comprehensive mathematical documentation
│   ├── simulation/
│   │   ├── SimulationCanvas.tsx        ← Auto-resizing 60 Hz 2D canvas with APF contours
│   │   ├── VehicleSprite.tsx           ← Ego vehicle sprite renderer with steering orientation
│   │   ├── ObstacleLayer.tsx           ← Dynamic cattle, rickshaw, pedestrian, and truck obstacles
│   │   └── TrajectoryOverlay.tsx       ← DWA lookahead trajectory rollout visualization
│   ├── feeds/
│   │   ├── SensorFeeds.tsx             ← Compact 2x2 perception feed grid
│   │   ├── LiDARPointCloud.tsx         ← 128-beam 360° point cloud with polar radar sweep
│   │   └── CameraFeedCard.tsx          ← Compact 4K/fisheye feed cards with micro HUD telemetry
│   ├── metrics/
│   │   ├── LiveMetrics.tsx             ← Real-time telemetry dashboard cards
│   │   ├── SpeedGauge.tsx              ← SVG radial speedometer with dynamic needle
│   │   ├── TTCIndicator.tsx            ← Color-coded Time-To-Collision bar
│   │   └── OccupancyGridMini.tsx       ← 60 Hz miniature dynamic occupancy thumbnail
│   ├── controls/
│   │   ├── ControlPanel.tsx            ← Play, pause, reset, and manual e-brake controls
│   │   ├── ScenarioSelector.tsx        ← Scenario edge case selector
│   │   └── SpeedSlider.tsx             ← 0.25x to 4.0x simulation speed slider
│   ├── scenarios/
│   │   ├── ScenarioCard.tsx            ← Edge scenario card with severity badge & deep link
│   │   ├── ScenarioTable.tsx           ← Comprehensive scenario comparison matrix
│   │   └── ScenarioSimulator.tsx       ← In-card mini-simulator launcher
│   ├── emergency/
│   │   ├── SOSModal.tsx                ← Glassmorphic emergency modal overlay
│   │   ├── CountdownTimer.tsx          ← 3-second circular SVG countdown timer
│   │   ├── GPSCoordinateDisplay.tsx    ← RTK-GPS ±1.4cm precision coordinates
│   │   ├── VoiceSiren.tsx              ← Web Speech voice synthesis + dual-tone audio siren
│   │   └── CV2XPacketLog.tsx           ← 5G NR Band n78 C-V2X URLLC packet stream
│   ├── team/
│   │   ├── TeamGrid.tsx                ← Responsive 3-column team grid
│   │   └── MemberCard.tsx              ← Glassmorphic team profile card with avatar initials
│   └── ui/
│       ├── ThemeToggle.tsx             ← Obsidian Cyber-HUD / Titanium Lab switch
│       ├── GlassCard.tsx               ← Reusable glassmorphic surface card
│       ├── GlowButton.tsx              ← Cyber-glow neon action button
│       ├── SectionHeading.tsx          ← Animated section heading with badge
│       └── ScrollReveal.tsx            ← Intersection Observer entry animation wrapper
├── context/
│   ├── ThemeContext.tsx                ← Dual-cockpit theme state manager
│   ├── SimulationContext.tsx           ← 60 Hz simulation lifecycle and obstacle state
│   └── SOSContext.tsx                  ← ASIL-D emergency fail-safe state machine & audio engine
├── hooks/
│   ├── useResponsiveLayout.ts          ← MatchMedia breakpoint and orientation detector
│   ├── usePanelState.ts                ← Mobile/tablet drawer orchestration
│   ├── useTheme.ts                     ← Theme consumer hook
│   ├── useSimulationLoop.ts            ← 60 Hz requestAnimationFrame physics loop
│   ├── useSOSProtocol.ts               ← Emergency protocol & e-brake binding
│   └── useSensorData.ts                ← Real-time noisy telemetry stream
├── data/
│   ├── scenarios.ts                    ← 5 edge case definitions & obstacle configurations
│   ├── team.ts                         ← 6 core engineering profiles
│   ├── sensors.ts                      ← Sensor specifications & optical feed metadata
│   └── telemetry.ts                    ← CAN-bus noise & 5G C-V2X packet generator
├── lib/
│   ├── apf-engine.ts                   ← Artificial Potential Fields calculation engine
│   ├── dwa-planner.ts                  ← Dynamic Window Approach velocity search & trajectory rollout
│   ├── kinematics.ts                   ← Non-linear kinematic bicycle vehicle model
│   └── constants.ts                    ← Vehicle dimensions, physics limits, and GPS coordinates
└── types/
    ├── simulation.ts                   ← SimState, EgoVehicle, Obstacle, Scenario interfaces
    ├── sensors.ts                      ← SensorSpecification, CameraFeedInfo, PointCloud types
    └── emergency.ts                    ← SOSState, CV2XEmergencyPacket, GPSPosition types
```

---

## 👥 Engineering & Research Team

| Member | Role | Focus & Core Contributions |
| :--- | :--- | :--- |
| **Prateek** | `Team Lead` | System Architecture & Hardware-in-the-Loop Integration |
| **Swasteek** | `Backend Eng.` | Data Pipeline, Control Logic & Deterministic Stateflow |
| **Ayush** | `Model Trainer` | Trajectory Prediction & Deep Sensor Fusion (BEVFormer) |
| **Rituraj** | `Simulation Eng.` | RoadRunner Scenario Synthesis & Non-Linear Vehicle Dynamics |
| **Purva** | `UI/UX Designer` | Cockpit HUD Interface, Visual Hierarchy & Telemetry Dashboard |
| **Shambhavi** | `Debug Eng.` | Closed-Loop Fault Analysis, Validation & Functional Safety |

---

## 💻 Quickstart & Local Development

### Prerequisites
- **Node.js**: v18.17.0+ or v20.0.0+
- **npm**: v9.0.0+

### Installation
```bash
# 1. Clone the official repository
git clone https://github.com/DakCamper123/raastaAI.git
cd raastaAI

# 2. Install dependencies
npm install
```

### Launching the Development Server
```bash
# Start Next.js local development server (bound to 0.0.0.0:3000)
npm run dev
```
Open your browser and navigate to:
👉 **`http://localhost:3000`**

### Production Build
```bash
# Compile and optimize static pages
npm run build

# Launch the production server
npm run start
```

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for complete terms.

<div align="center">
  <sub>Engineered with precision for the future of Indian autonomous mobility.</sub><br>
  <b>Raasta.AI • Autonomous Systems Laboratory • 2026</b>
</div>