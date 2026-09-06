/**
 * RAASTA.AI - Autonomous Systems Core Engineering Team
 */

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  role: string;
  subTag: string;
  focusArea: string;
  icon: string;
  badges: string[];
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'prateek',
    name: 'Prateek',
    initials: 'PR',
    role: 'Team Lead',
    subTag: 'System Architecture & Integration',
    focusArea: 'System Architecture & Hardware-in-the-Loop Integration',
    icon: '🧭',
    badges: ['Architecture', 'ASIL-D Lead', 'HIL Testing'],
  },
  {
    id: 'swasteek',
    name: 'Swasteek',
    initials: 'SW',
    role: 'Backend Eng.',
    subTag: 'Pipeline, Control Logic & Stateflow',
    focusArea: 'Data Pipeline, Control Logic & Deterministic Stateflow',
    icon: '⚙️',
    badges: ['Stateflow', 'CAN-Bus Stack', 'Control Loops'],
  },
  {
    id: 'ayush',
    name: 'Ayush',
    initials: 'AY',
    role: 'Model Trainer',
    subTag: 'Trajectory Prediction & Sensor Fusion (DL)',
    focusArea: 'Trajectory Prediction & Deep Sensor Fusion (BEVFormer)',
    icon: '🧠',
    badges: ['BEVFormer', 'Bovine-PoseNet', 'PyTorch/TensorRT'],
  },
  {
    id: 'rituraj',
    name: 'Rituraj',
    initials: 'RI',
    role: 'Simulation Eng.',
    subTag: 'RoadRunner Scenarios & Vehicle Dynamics',
    focusArea: 'RoadRunner Scenario Synthesis & Non-Linear Vehicle Dynamics',
    icon: '🏎️',
    badges: ['RoadRunner', 'Kinodynamics', 'Digital Twin'],
  },
  {
    id: 'shweta',
    name: 'Shweta',
    initials: 'SH',
    role: 'UI/UX Designer',
    subTag: 'HUD Interface, Visual Hierarchy & Dashboard',
    focusArea: 'Cockpit HUD Interface, Visual Hierarchy & Telemetry Dashboard',
    icon: '🎨',
    badges: ['Cyber-HUD', 'Design System', 'Telemetry Viz'],
  },
  {
    id: 'shreya',
    name: 'Shreya',
    initials: 'SR',
    role: 'Debug Eng.',
    subTag: 'Closed-Loop Validation & Fault Analysis',
    focusArea: 'Closed-Loop Fault Analysis, Validation & Functional Safety',
    icon: '🛡️',
    badges: ['Validation', 'Fault Injection', 'Safety Verif.'],
  },
];
