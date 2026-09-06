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
### *Next-Generation Autonomous Vehicle Simulation & Telematics Platform Engineered for Unstructured Corridors*

[![Next.js 14](https://img.shields.io/badge/Framework-Next.js%2014%20(App%20Router)-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 18](https://img.shields.io/badge/React-18.3.1-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6%20Strict-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase Auth](https://img.shields.io/badge/Auth-Supabase%20Free%20Email-3ecf8e?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Supabase Storage](https://img.shields.io/badge/Storage-Supabase%20Storage%20(PDFs)-3ecf8e?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL%20RLS-4169e1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS%20v3%20%2B%20CSS3%20Variables-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/3D%20HUD-Three.js%20r169-black?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org/)
[![Safety Standard](https://img.shields.io/badge/Safety-ISO%2026262%20ASIL--D-ff3355?style=for-the-badge&logo=shield&logoColor=white)](#)
[![V2X Protocol](https://img.shields.io/badge/C--V2X%20Latency-%3C11.2ms%20%7C%205G%20NR-00ff88?style=for-the-badge&logo=5g&logoColor=black)](#)

<p align="center">
  <b>A production-grade, zero-external-UI-library autonomous mobility simulator and diagnostic telemetry platform featuring 60 Hz kinematic physics, dynamic Artificial Potential Fields (APF), Dynamic Window Approach (DWA), dedicated Car Analysis Center, Supabase email authentication, cloud PDF storage, and full persistence.</b>
</p>

[Philosophy](#-the-raasta-philosophy) • [Car Analysis & Diagnostics](#-car-condition--analysis-center) • [Email Auth & Gated Access](#-free-email-authentication--gated-access) • [Cloud & Local Persistence](#-cloud--local-persistence-architecture) • [Simulation Cockpit](#-simulation-cockpit) • [Architecture](#-system-architecture) • [Mathematical Engine](#-mathematical-engine) • [Edge Scenarios](#-5-indian-road-edge-scenarios) • [Emergency SOS](#-emergency-sos--fail-safe-architecture) • [Team](#-engineering--research-team) • [Quickstart](#-quickstart--local-development)

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

## 🚗 Car Condition & Analysis Center (`/analysis`)

Raasta.AI features a dedicated **Vehicle Condition & Telemetry Analysis Center** accessible from the primary navigation. It provides an engineering diagnostic dossier for the autonomous vehicle platform (VIN: `IND-MH12-AUTON-2026-X77`):

### Comprehensive Diagnostic Subsystems
- **Overall Health Index**: `98% NOMINAL EXCELLENT` with ISO 26262 ASIL-D certification alignment.
- **High-Voltage Powertrain & Battery Condition**:
  - State of Charge (SoC): `78.4%` (visual gradient meter)
  - State of Health (SoH): `98.2%`
  - Pack Voltage: `394.2 V` | Current Draw: `42.6 A`
  - Cell Voltage Delta: `±0.008 V` (perfectly balanced cells)
  - Average Pack Temperature: `28.4 °C` with active liquid glycol cooling loop (`3.2 L/min`)
  - Estimated Operating Range: `284 km` remaining
- **ASIL-D Redundant Deceleration & Brake-by-Wire**:
  - Dual hydraulic line pressure monitors: Primary `142.5 bar` | Secondary fail-safe `142.1 bar`
  - Brake pad wear life gauges: Front axle `93.8%` | Rear axle `95.2%`
  - Hardware intervention reaction latency: `11.2 ms` (sub-12ms hardware target)
  - ASIL-D E-Brake redundancy: `ARMED & ACTIVE (DUAL RING)`
- **Chassis Dynamics, Road Traction & 4-Wheel Monitoring**:
  - Road friction coefficient: $\mu = 0.82$ (Dry bitumen & aggregate)
  - 4-Tire pressure telematics: FL `33.2 psi`, FR `33.1 psi`, RL `35.0 psi`, RR `35.1 psi`
  - Wheel slip ratio: `1.4%` (traction control nominal)
  - Electric Power Steering (EPS) torque feedback: `3.4 Nm`
- **Perception Sensor Suite Calibration Matrix**:
  - 128-Beam Solid-State LiDAR: `1.42M pts/sec` | `98.2%` optical window transparency
  - 8x Surround HDR Cameras: `94.6% MTF` sharpness | `60 FPS`
  - 4D Imaging Radar: `28.4 dB SNR` | 512 virtual Doppler channels
  - Dual-Band RTK GNSS: `±1.4 cm` precision | `26` satellite carrier-phase lock
- **ISO 14229 / UDS On-Board Diagnostics**:
  - Diagnostic Trouble Codes (DTCs): `0 ACTIVE FAULTS`
  - CAN-FD Bus Load: `46.8%` | Automotive Ethernet (1000BASE-T1): `240 Mbps`

---

## 📥 Multi-Format Exporter & Automotive PDF Generator

Users can export full vehicle diagnostics and telematics in three engineering formats:
1. **Automotive Engineering PDF Dossier (`Print / Save PDF`)**:
   - Built using client-side `jspdf` integration.
   - Generates a styled, multi-section automotive engineering report featuring VIN, timestamps, powertrain, brakes, chassis, sensors, and OBD-II diagnostics.
   - Automatically uploaded to **Supabase Storage** and downloaded to the user's local device.
2. **CAN-Bus Telemetry JSON Snapshot (`Export JSON`)**:
   - Complete structured JSON payload containing all subsystem metrics, sensor specifications, and operating parameters.
3. **Timeseries Dynamics Log (`Export CSV`)**:
   - High-frequency tabular dataset logging timestamps, speed ($km/h$), steering angle ($^\circ$), lateral acceleration ($m/s^2$), battery SoC, hydraulic line pressure, friction $\mu$, and RTK precision.

---

## 🔐 Free Email Authentication & Gated Access

Raasta.AI integrates free, persistent email authentication powered by **Supabase Auth**:

- **100% Free Access**: Users can create a free account or sign in with their email and password.
- **Cyber-HUD Auth Modal (`AuthModal.tsx`)**:
  - Glassmorphic Obsidian interface with tab toggling between **Sign In** and **Sign Up Free**.
  - Form validation, password visibility toggling, error alerts, and email confirmation workflows.
- **Header Auth Pill (`StickyHeader.tsx`)**:
  - Displays a **Sign In** button when unauthenticated.
  - Displays a **User Account Badge (`Full Telematics Unlocked`)** with email and a one-click **Sign Out** menu when authenticated.
- **Intelligent Gating**:
  - **Perception Feeds ([SensorFeeds.tsx](file:///c:/Users/Krris/.antigravity-ide/src/components/feeds/SensorFeeds.tsx))**: Feeds are protected behind an obsidian lock overlay. Clicking "Unlock Feeds (Free)" prompts the Auth Modal.
  - **Control Settings ([ControlPanel.tsx](file:///c:/Users/Krris/.antigravity-ide/src/components/controls/ControlPanel.tsx))**: APF planner parameter tuning sliders (`k_att`, `k_rep`) are locked for unauthenticated users.
  - **Car Condition & Downloads ([analysis/page.tsx](file:///c:/Users/Krris/.antigravity-ide/src/app/analysis/page.tsx))**: Attempting to download reports or inspect high-frequency CAN streams prompts the user to sign in or create a free account.
  - Once authenticated, all locks lift immediately!

---

## 💾 Cloud & Local Persistence Architecture

All user data, historical snapshots, diagnostic PDFs, and settings persist across devices and reloads:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        RAASTA.AI PERSISTENCE LAYER                     │
└────────────────────────────────────────────────────────────────────────┘
                    │                                    │
                    ▼                                    ▼
       ┌────────────────────────┐           ┌────────────────────────┐
       │   SUPABASE POSTGRESQL  │           │    SUPABASE STORAGE    │
       │                        │           │                        │
       │ • vehicle_analysis_    │           │ • Bucket:              │
       │   history (RLS)        │           │   analysis_reports     │
       │ • user_settings (RLS)  │           │ • Uploads generated    │
       │ • Full CAN/Sensor stats│           │   diagnostic PDFs      │
       └────────────────────────┘           └────────────────────────┘
                    ▲                                    ▲
                    │                                    │
                    └─────────────────┬──────────────────┘
                                      │ (Hybrid Sync & Offline Cache)
                                      ▼
                         ┌────────────────────────┐
                         │   BROWSER LOCALSTORAGE │
                         │                        │
                         │ • raasta_analysis_hist │
                         │ • raasta_user_settings │
                         └────────────────────────┘
```

### PostgreSQL Tables & Storage Buckets
1. **`public.vehicle_analysis_history`**:
   - `id UUID PRIMARY KEY`, `user_id UUID REFERENCES auth.users(id)`
   - `title`, `health_index`, `battery_soc`, `battery_temp`, `brake_pressure`, `friction_mu`
   - `telemetry_stats JSONB`, `feed_stats JSONB`, `diagnostics_payload JSONB`
   - `pdf_url TEXT`, `report_html TEXT`
   - Row Level Security (RLS) policies scoped to `auth.uid() = user_id`.
2. **`public.user_settings`**:
   - `user_id UUID PRIMARY KEY`, `k_att NUMERIC`, `k_rep NUMERIC`, `speed_warp NUMERIC`
   - Automatically loads tuned APF parameters on startup/login and auto-saves adjustments.
3. **Supabase Storage Bucket (`analysis_reports`)**:
   - Stores real `.pdf` files generated during report downloads.
   - Allows users to re-download their exact historical PDFs anytime from the **Previous Vehicle Analysis History** table.
4. **Historical Snapshot Inspector**:
   - Clicking **"Inspect"** on any past record dynamically populates all cockpit gauges with that historical snapshot, enabling before-and-after comparison with an alert banner and **"Return to Live Vehicle Stream"** button.

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

### 1. Artificial Potential Fields (APF)
The net virtual force vector driving the autonomous vehicle is given by:

$$\vec{F}_{\text{total}}(q) = \vec{F}_{\text{att}}(q) + \sum_{i=1}^{N} \vec{F}_{\text{rep}, i}(q)$$

- **Attractive Potential Force**: Pulls ego vehicle toward the distant corridor waypoint:
  $$\vec{F}_{\text{att}}(q) = -k_{\text{att}} \cdot (q - q_{\text{goal}})$$

- **Kinodynamic Velocity-Dependent Repulsive Force**: Scaled dynamically by the obstacle's approaching velocity vector:
  $$U_{\text{rep}, i}(q) = \begin{cases} \frac{1}{2} k_{\text{rep}} \left(\frac{1}{\rho_i(q)} - \frac{1}{\rho_0}\right)^2 \cdot \left(1 + \frac{v_{\text{rel}, i}}{v_{\max}}\right), & \text{if } \rho_i(q) \le \rho_0 \\ 0, & \text{if } \rho_i(q) > \rho_0 \end{cases}$$

### 2. Dynamic Window Approach (DWA)
Feasible velocity tuples $(v, \omega)$ are sampled within the reachable hardware envelope:

$$V_d = \left\{(v, \omega) \;\middle|\; v \in [v - a_{\max} \Delta t,\, v + a_{\max} \Delta t] \cap [0, v_{\max}],\; \omega \in [\omega - \dot{\omega}_{\max} \Delta t,\, \omega + \dot{\omega}_{\max} \Delta t] \cap [-\omega_{\max}, \omega_{\max}]\right\}$$

Trajectories are optimized via objective function:

$$G(v, \omega) = \alpha \cdot \text{heading}(v, \omega) + \beta \cdot \text{dist}(v, \omega) + \gamma \cdot \text{velocity}(v, \omega)$$

---

## 🚦 5 Indian Road Edge Scenarios

| Code | Corridor | Hazard Profile | Algorithmic Mitigation |
| :--- | :--- | :--- | :--- |
| **`01`** | **NH-48 Divided Highway** | Stray cattle (*Bos indicus*) resting in center lane | Bovine-PoseNet posture inference; wide-margin tangential APF repulsion |
| **`02`** | **Chandni Chowk Market** | Three-wheeled autorickshaw cutting across trajectory | Game-theoretic gap estimation + localized DWA velocity braking |
| **`03`** | **Pune Monsoon Corridor** | Waterlogged ditch + low-visibility monsoon rain | 4D Imaging Radar penetration + adaptive tire friction coefficient $\mu$ |
| **`04`** | **Western Ghats Hairpin** | Blind hairpin curve with oncoming truck in lane | Predictive trajectory rollout + 5G NR C-V2X blind spot notification |
| **`05`** | **Unmarked Rural Road** | Severe potholes, muddy unpaved road edges | Virtual road boundary inference + APF ditch barrier clamping |

---

## 🆘 Emergency SOS & Fail-Safe Architecture

- **ASIL-D E-Brake Hardware Loop**: Deceleration clamped to $-8.5\text{ m/s}^2$ with redundant dual-channel pressure lines (`142 bar`).
- **3-Second Circular SVG Countdown**: Abortable intervention timer with keyboard shortcut (`Ctrl+Shift+E`).
- **3GPP Release 17 C-V2X URLLC Broadcast**: High-priority safety packet emitted over 5G NR Band n78 ($3.5\text{ GHz}$) with sub-$11.2\text{ ms}$ latency.
- **Dual-Tone Acoustic Siren**: Synthetic Web Audio API oscillator ($800\text{ Hz} \leftrightarrow 1200\text{ Hz}$) paired with multilingual voice synthesis.

---

## 📂 Project Structure

```
raasta-ai/
├── public/
│   ├── assets/                         ← Hero graphics, scenario imagery, radar HUD
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx                  ← Root layout with ThemeProvider, AuthProvider, Header
│   │   ├── page.tsx                    ← Philosophy & research landing page
│   │   ├── dashboard/                  ← Simulation Cockpit (canvas, metrics, controls, feeds)
│   │   ├── analysis/                   ← Car Condition & Diagnostics Center with PDF downloads
│   │   ├── architecture/               ← Sensor fusion and hardware pipeline documentation
│   │   ├── scenarios/                  ← 5 edge case simulation lab
│   │   ├── emergency-sos/              ← Dedicated ASIL-D emergency intervention interface
│   │   ├── team/                       ← Research and engineering team showcase
│   │   └── globals.css                 ← Obsidian Cyber-HUD & Titanium Lab design tokens
│   ├── components/
│   │   ├── auth/
│   │   │   └── AuthModal.tsx           ← Cyber-HUD Supabase email login & free registration
│   │   ├── layout/
│   │   │   ├── StickyHeader.tsx        ← Navigation, auth pill, CAN ticker, SOS button
│   │   │   ├── DashboardLayout.tsx     ← Responsive drawer & floating action orchestrator
│   │   │   ├── PanelGrid.tsx           ← Desktop/tablet CSS grid layout
│   │   │   └── ScrollableSidebar.tsx   ← Scenario switcher & edge corridor selector
│   │   ├── simulation/
│   │   │   └── SimulationCanvas.tsx    ← 60 Hz 2D Canvas kinematic vehicle simulator
│   │   ├── metrics/
│   │   │   ├── LiveMetrics.tsx         ← Cockpit telemetry panel with analysis link
│   │   │   ├── SpeedGauge.tsx          ← Radial speedometer HUD
│   │   │   └── TTCIndicator.tsx        ← Time-To-Collision color-coded alert
│   │   ├── controls/
│   │   │   ├── ControlPanel.tsx        ← Playback, APF tuning sliders (gated), e-brake
│   │   │   └── SpeedSlider.tsx         ← Simulation time-warp controller
│   │   ├── feeds/
│   │   │   ├── SensorFeeds.tsx         ← 4-camera perception grid with auth lock overlay
│   │   │   ├── LiDARPointCloud.tsx     ← Simulated 3D LiDAR point cloud stream
│   │   │   └── CameraFeedCard.tsx      ← Optical feed card with detections count
│   │   └── emergency/
│   │       ├── SOSModal.tsx            ← Emergency modal overlay
│   │       └── CV2XPacketLog.tsx       ← 5G NR C-V2X URLLC packet stream
│   ├── context/
│   │   ├── AuthContext.tsx             ← Supabase authentication & session provider
│   │   ├── SimulationContext.tsx       ← 60 Hz simulation lifecycle & settings auto-save
│   │   ├── SOSContext.tsx              ← ASIL-D emergency fail-safe state machine
│   │   └── ThemeContext.tsx            ← Dual-cockpit theme state manager
│   ├── lib/
│   │   ├── supabaseClient.ts           ← Supabase client initialization & session config
│   │   ├── analysisHistory.ts          ← Cloud PostgreSQL & Storage persistence service
│   │   ├── pdfGenerator.ts             ← jsPDF automotive engineering report generator
│   │   ├── apf-engine.ts               ← Artificial Potential Fields calculation engine
│   │   ├── dwa-planner.ts              ← Dynamic Window Approach velocity search
│   │   └── kinematics.ts               ← Non-linear kinematic bicycle vehicle model
│   └── data/
│       ├── carAnalysis.ts              ← Detailed vehicle specifications & diagnostic metrics
│       ├── scenarios.ts                ← 5 Indian edge case definitions
│       ├── sensors.ts                  ← Sensor specifications & feed metadata
│       └── telemetry.ts                ← CAN-bus noise & C-V2X packet generator
```

---

## 👥 Engineering & Research Team

| Member | Role | Focus & Core Contributions |
| :--- | :--- | :--- |
| **Prateek** | `Team Lead` | System Architecture & Hardware-in-the-Loop Integration |
| **Swasteek** | `Frontend & Backend Eng.` | End-to-End Data Flow, Supabase Backend Integration & Responsive Simulation UI |
| **Ayush** | `Model Trainer` | Trajectory Prediction & Deep Sensor Fusion (BEVFormer) |
| **Rituraj** | `Simulation Eng.` | RoadRunner Scenario Synthesis & Non-Linear Vehicle Dynamics |
| **Shweta** | `Presenter` | Executive Pitching, Live Product Demonstration & Strategic System Narrative |
| **Shreya** | `Debug Eng.` | Closed-Loop Fault Analysis, Validation & Functional Safety |

---

## 💻 Quickstart & Local Development

### Prerequisites
- **Node.js**: v18.17.0+ or v20.0.0+
- **npm**: v9.0.0+

### 1. Installation
```bash
# Clone the repository
git clone https://github.com/DakCamper123/raastaAI.git
cd raastaAI

# Install dependencies
npm install
```

### 2. Environment Variables (`.env.local`)
Create a `.env.local` file in the project root:
```env
NEXT_PUBLIC_SUPABASE_URL=https://kftwviyddinzlsidaxtk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. Launch the Development Server
```bash
npm run dev
```
Open your browser and navigate to:
👉 **`http://localhost:3000`**

### 4. Production Build
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