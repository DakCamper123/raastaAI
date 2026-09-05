<div align="center">

```
██████╗  █████╗  █████╗ ███████╗████████╗ █████╗     █████╗ ██╗
██╔══██╗██╔══██╗██╔══██╗██╔════╝╚══██╔══╝██╔══██╗   ██╔══██╗██║
██████╔╝███████║███████║███████╗   ██║   ███████║   ███████║██║
██╔══██╗██╔══██║██╔══██║╚════██║   ██║   ██╔══██║   ██╔══██║██║
██║  ██║██║  ██║██║  ██║███████║   ██║   ██║  ██║██╗██║  ██║██║
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═╝
```

# रास्ता.AI (Raasta.AI)
### *Taming the Beautiful Chaos of Indian Corridors with Next-Gen Autonomy*

[![Autonomy Level: L4+](https://img.shields.io/badge/Autonomy-Level%204%2B%20Ready-00f0ff?style=for-the-badge&logo=ai&logoColor=black)](#)
[![Safety Protocol](https://img.shields.io/badge/Safety-ISO%2026262%20ASIL--D-ff2a55?style=for-the-badge&logo=shield&logoColor=white)](#)
[![V2X Latency](https://img.shields.io/badge/C--V2X%20Latency-%3C11.2ms%20%7C%205G%20NR-00ff88?style=for-the-badge&logo=5g&logoColor=black)](#)
[![Sensor Suite](https://img.shields.io/badge/Sensor%20Fusion-360%C2%B0%20LiDAR%20%2B%208x%20CAM%20%2B%204D%20Radar-ffaa00?style=for-the-badge)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<p align="center">
  <b>Autonomous path planning, 360° sensor fusion HUD, and fail-safe safety architecture engineered for the world's most challenging, dynamic, and unstructured driving environments.</b>
</p>

[Explore Simulator](#-live-kinematic-simulator) • [Edge Scenarios](#-the-5-indian-road-edge-scenarios) • [Safety & SOS](#-emergency-sos--fail-safe-architecture) • [Research Team](#-core-engineering--research-team) • [Quickstart](#-quickstart)

</div>

---

## 🧭 The Raasta Philosophy: Solving Autonomy Where It Counts

> *"If an autonomous vehicle can master Old Delhi's Chandni Chowk, navigate a monsoon ghat in Kerala, and out-negotiate an unmarked rural highway merge—it can drive anywhere on Planet Earth."*

Conventional Level 4 autonomous systems developed in Silicon Valley or Munich make clean assumptions:
- Crisp, laser-painted lane markings.
- Orderly, homogeneous vehicle fleets following right-of-way rules.
- Predictable pedestrian behavior and isolated animal-free freeways.

**India’s roads rewrite the playbook entirely.** 

On Indian corridors, lanes are virtual suggestions, traffic is radically heterogeneous (from bullock carts and 100cc commuters to three-wheeled auto-rickshaws and multi-axle trucks), and unexpected biological hazards (such as stray cattle resting on the warm asphalt) require empathetic, non-verbal micro-negotiation.

**Raasta.AI** is built ground-up to solve this reality: combining **Kinodynamic Artificial Potential Fields (APF)**, **Dynamic Window Approach (DWA)**, and biological pose-tracking neural networks to achieve safe, confident, and assertive autonomous mobility.

---

## ⚡ High-Tech System Architecture

```
 ┌────────────────┐  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐
 │  360° 128-Beam │  │  8x 4K HDR Low-│  │  4D Ultra-Res  │  │  Dual RTK-GNSS │
 │     LiDAR      │  │  Latency Cams  │  │ Imaging Radar  │  │   + IMU 6-DOF  │
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

Raasta.AI operates on a blended kinematic planning loop running at a continuous **60 Hz cycle frequency**:

### 1. Artificial Potential Field (APF) Formulation
The vehicle is driven by an attractive goal gradient while pushed away by hyper-localized obstacle repulsive fields:

$$U_{total}(q) = U_{att}(q) + \sum_{i=1}^{N} U_{rep, i}(q)$$

Where the attractive potential pulls the vehicle toward the corridor waypoint:
$$U_{att}(q) = \frac{1}{2} k_{att} \cdot \|q - q_{goal}\|^2$$

And the dynamic repulsive potential creates an exponentially steep safety barrier:
$$U_{rep}(q) = \begin{cases} 
\frac{1}{2} k_{rep} \left( \frac{1}{\rho(q)} - \frac{1}{\rho_0} \right)^2 \left(\frac{v_{ego}}{v_{max}}\right) & \text{if } \rho(q) \le \rho_0 \\
0 & \text{if } \rho(q) > \rho_0
\end{cases}$$

### 2. Dynamic Window Approach (DWA) Objective Function
Within the permissible acceleration envelope $(v, \omega) \in V_d$, the trajectory scoring objective optimizes heading alignment, clearance distance, and forward velocity:

$$G(v, \omega) = \alpha \cdot \text{heading}(v, \omega) + \beta \cdot \text{dist}(v, \omega) + \gamma \cdot \text{velocity}(v, \omega)$$

---

## 🔬 The 5 Indian Road Edge Scenarios

The simulator features 5 interactive edge cases rigorously tested on Indian corridors:

| # | Edge Scenario | Threat Profile | Autonomous Mitigation Strategy |
|:-:|:---|:---|:---|
| **01** | **Unmarked Rural Road** | Potholes, unpaved muddy edges, no lane paint | Virtual centerline inference via road surface texture segmentation; shoulder slip angle damping. |
| **02** | **Dense Market Swarm** | Pedestrians, handcarts, high-density two-wheelers | Sub-8 km/h tactile creep mode; pedestrian velocity vector forecasting and courteous micro-yielding. |
| **03** | **Stray Cattle Crossing** | Unpredictable bovines standing/laying across lanes | **Bovine-PoseNet** biological keypoint tracking; wide-radius non-aggressive deceleration without horn panic. |
| **04** | **Chaotic Urban Junction** | Multi-agent un-signaled bottleneck gridlock | Game-theoretic conflict arbitration; dynamic priority slot calculation and virtual gap slot-in. |
| **05** | **High-Speed Highway Cut** | Aggressive lane-cutting buses, wrong-side tractors | 360° continuous 4D radar tracking; sub-40ms high-speed evasive lane lateral translation. |

---

## 🚨 Emergency SOS & Fail-Safe Architecture

Safety is non-negotiable. Raasta.AI implements an **ASIL-D aligned fail-safe intervention matrix**:

1. **In-Page Glassmorphic Safety Modal**:
   - Triggers an instant vehicle hardware E-Brake in the simulator.
   - Arms a **3-second safety countdown** with manual abort capability.
   - Displays real-time RTK-GPS coordinates ($\pm 1.4\text{ cm}$ accuracy) on the NH-48 Pune-Bengaluru Corridor.
   - Synthesizes vocal voice transmission via the **Web Speech API** and dual-frequency Web Audio acoustic siren.
2. **Dedicated Standalone Emergency Route**:
   - Available as a dedicated full-screen emergency interface at [`emergency-sos.html`](emergency-sos.html) or as a Next.js/Tailwind/Framer Motion component at [`src/app/emergency-sos/page.tsx`](src/app/emergency-sos/page.tsx).
3. **C-V2X Emergency Packet**:
   - Formatted for 3GPP Release 17 ultra-reliable low-latency communications (URLLC) over 5G NR Band n78.

---

## 🎨 Dual Cockpit Design System

Built with zero external CSS frameworks in pure, ultra-optimized CSS3:

- **Obsidian Cyber-HUD (Default Dark)**:
  - Deep space palette (`#06090e`, `#0a0f18`) with cyber-cyan (`#00f0ff`) and warning-amber (`#ffaa00`) laser-sharp HUD accents.
  - Engineered for night-time driver HUD transparency and minimal cockpit glare.
- **Titanium Lab Telemetry (Light Mode)**:
  - Crisp high-contrast clean room palette (`#f4f6fa`, `#ffffff`) with deep cobalt and slate accents.
  - Optimized for daytime test-track diagnostics, field validation, and telemetry auditing.
- Toggle between modes seamlessly using the `☀️ / 🌙` switch in the navigation header.

---

## 👥 Core Engineering & Research Team

| Member | Role | Specialized Focus Area |
| :--- | :--- | :--- |
| **Prateek** | `Team Lead` | System Architecture & Hardware-in-the-Loop Integration |
| **Swasteek** | `Backend Eng.` | Data Pipeline, Control Logic & Deterministic Stateflow |
| **Ayush** | `Model Trainer` | Trajectory Prediction & Deep Sensor Fusion (BEVFormer) |
| **Rituraj** | `Simulation Eng.` | RoadRunner Scenario Synthesis & Non-Linear Vehicle Dynamics |
| **Purva** | `UI/UX Designer` | Cockpit HUD Interface, Visual Hierarchy & Telemetry Dashboard |
| **Shambhavi** | `Debug Eng.` | Closed-Loop Fault Analysis, Validation & Functional Safety |

---

## 🚀 Multi-Page Next.js 14 Application Structure

Raasta.AI is built as a production-grade **Next.js 14 App Router** application with pure CSS3/Tailwind styling, Framer Motion animations, Three.js 3D particles, and KaTeX mathematical formula rendering:

| Route | View Description | Core Interactive Features |
|:---|:---|:---|
| `/` | **Landing / Philosophy Hero** | Three.js perspective road particles, 80ms word typewriter tagline, SV vs India comparison, innovation cards. |
| `/dashboard` | **Simulation Cockpit** | Responsive 4-column cockpit, 60 Hz kinematic APF/DWA canvas, live Recharts/SVG telemetry, scenario picker. |
| `/architecture` | **System Flow & Math Engine** | 6-stage animated sensor fusion pipeline diagram + KaTeX mathematical breakdown with interactive sliders. |
| `/scenarios` | **5 Indian Road Edge Cases** | Comprehensive matrix comparison table, threat severity badges, deep-linking simulator launchers. |
| `/emergency-sos` | **Full-Screen ASIL-D Fail-Safe** | 3-second abort ring, RTK-GPS NH-48 readout, Web Speech synthesizer, Web Audio siren, 5G NR C-V2X log. |
| `/team` | **Core Engineering Team** | Hexagonal/glassmorphic profile cards with stagger reveal animations and role badges. |

---

## 💻 Quickstart & Local Development

### Prerequisites
- Node.js 18+ or 20+
- npm 9+

### Installation & Run
```bash
# 1. Clone the repository
git clone https://github.com/DakCamper123/raastaAI.git
cd raastaAI

# 2. Install dependencies
npm install

# 3. Start local development server (Turbopack / Next.js)
npm run dev

# 4. Open in your browser
http://localhost:3000
```

### Production Build
```bash
# Build the optimized production bundle
npm run build

# Start production server
npm run start
```

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

<div align="center">
  <sub>Engineered with precision for the future of Indian autonomous mobility.</sub><br>
  <b>Raasta.AI • Autonomous Systems Laboratory • 2026</b>
</div>