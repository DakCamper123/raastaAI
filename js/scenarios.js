/**
 * RAASTA.AI - 5 Mandated Indian Road Test Scenarios
 * Data definitions, card interaction, inspector modal, and Interactive Image Lightbox Viewer
 */

const SCENARIO_DATA = {
  village: {
    id: 'village',
    title: 'Unmarked Village Road',
    category: 'RURAL / UNSTRUCTURED',
    threatLevel: 'HIGH ENTROPY',
    threatBadgeClass: 'badge-amber',
    image: './assets/scenarios/village_road.jpg',
    description: 'Narrow unpaved rural corridor lacking white lane markings, featuring eroded earthen shoulders, abrupt elevation drops, and stray livestock with zero predictability.',
    challenges: [
      'Zero Lane Markings & Pavement Degradation',
      'Sudden Mud Shoulder Drop-Offs (15cm)',
      'Unpredictable Grazing Livestock',
      'Single-Lane Bidirectional Bottlenecks'
    ],
    technicalSolution: 'Virtual Road-Boundary Inference utilizing dual stereo cameras and terrain depth geometry mapping. Computes safe driveable corridors on mud-shoulder transitions using Hybrid A* search.',
    telemetry: {
      speedLimit: '30 km/h',
      frictionCoeff: '0.52 (Loose Dirt/Gravel)',
      perceptionSensors: 'Stereo RGB + 32-Beam Solid State LiDAR',
      replanInterval: '10 ms',
      clearanceMargin: '1.4 m'
    }
  },

  intersection: {
    id: 'intersection',
    title: 'Busy Urban Intersection Without Signals',
    category: 'URBAN CHURN',
    threatLevel: 'CRITICAL',
    threatBadgeClass: 'badge-danger',
    image: './assets/scenarios/urban_intersection.jpg',
    description: 'High-density chaotic junction with no traffic lights or painted lanes. Multi-directional cross-weaving of auto-rickshaws, bikes, and pedestrians negotiating informal right-of-way.',
    challenges: [
      'Informal Right-of-Way Negotiation',
      'Continuous 360° Two-Wheeler Weaving',
      'Deadlock Trajectory Conflicts',
      'Occluded Pedestrian Blind Spots'
    ],
    technicalSolution: 'Game-Theoretic Dynamic Window Approach (DWA) with multi-agent intent forecasting. Predicts rickshaw yielding probability based on micro-acceleration and wheel angle.',
    telemetry: {
      speedLimit: '25 km/h',
      frictionCoeff: '0.82 (Dry Asphalt)',
      perceptionSensors: '360° LiDAR + 8-Camera Surround Vision + 4D Radar',
      replanInterval: '8 ms',
      clearanceMargin: '0.7 m (High-Density Tolerance)'
    }
  },

  highway: {
    id: 'highway',
    title: 'Highway Merge with Slow-Moving Vehicles',
    category: 'EXPRESSWAY EDGE-CASE',
    threatLevel: 'SEVERE KINEMATICS',
    threatBadgeClass: 'badge-danger',
    image: './assets/scenarios/highway_merge.jpg',
    description: 'High-speed national expressway (NH-48) where heavy agricultural tractors loaded with trailing sugarcane bundles enter from unpaved dirt feeder tracks at 15 km/h alongside 80 km/h traffic.',
    challenges: [
      'High Velocity Differential (ΔV > 65 km/h)',
      'Atypical Overhanging Cargo (Sugarcane Bundles)',
      'Non-Reflective Rear Profiles on Bullock Carts',
      'High-Speed Overtaking Corridor Generation'
    ],
    technicalSolution: 'Long-Range Radar & LiDAR Fusion with Overhanging Volume Bounding. Evaluates safe overtaking envelopes using quintic polynomial trajectory splines.',
    telemetry: {
      speedLimit: '80 km/h',
      frictionCoeff: '0.85 (Smooth Highway Asphalt)',
      perceptionSensors: 'Long-Range 77GHz Radar + 128-Beam LiDAR (250m range)',
      replanInterval: '12 ms',
      clearanceMargin: '2.8 m'
    }
  },

  market: {
    id: 'market',
    title: 'Dense Market Area with Mixed Traffic',
    category: 'MICRO-MOBILITY CONGESTION',
    threatLevel: 'EXTREME COMPLEXITY',
    threatBadgeClass: 'badge-amber',
    image: './assets/scenarios/dense_market.jpg',
    description: 'Hyper-dense bazaar corridor (e.g. Chandni Chowk / Crawford Market) packed with moving fruit handcarts, cycle rickshaws, scooters, and walking shoppers within centimeters of the vehicle.',
    challenges: [
      'Ultra-Narrow Clearance (< 40cm envelopes)',
      'Stationary & Moving Handcart Blends',
      'Micro-Nudging Behavior Required to Move Ahead',
      'Acoustic Pedestrian Interaction Needed'
    ],
    technicalSolution: 'Centimeter-Precise Artificial Potential Field (APF) with progressive gentle nudging. Synthesizes directional ultrasonic pulses and low-frequency auditory chimes.',
    telemetry: {
      speedLimit: '8 km/h',
      frictionCoeff: '0.75 (Pavement)',
      perceptionSensors: '12 Ultrasonic Proximity Transducers + Wide-Angle Surround Cams',
      replanInterval: '5 ms',
      clearanceMargin: '0.35 m'
    }
  },

  cattle: {
    id: 'cattle',
    title: 'Sudden Cattle-Crossing Event',
    category: 'BIOLOGICAL HAZARD',
    threatLevel: 'IMMEDIATE E-BRAKE',
    threatBadgeClass: 'badge-danger',
    image: './assets/scenarios/cattle_crossing.jpg',
    description: 'A stray sacred cow or buffalo suddenly emerging onto the roadway from a blind median vegetation strip and coming to a dead stop in the vehicle path at twilight.',
    challenges: [
      'Complete Immunity to Horn Honking',
      'Sudden Lateral Freezing / Step-Back Behavior',
      'Atypical Skeletal Morphologies (Horns & Hump)',
      'Severe Twilight Contrast Reduction'
    ],
    technicalSolution: 'Deep Neural Biological 3D Pose Estimation running at 100 FPS with fail-safe deceleration curve. Guarantees complete stop at 1.5m buffer distance regardless of sudden head turns.',
    telemetry: {
      speedLimit: '45 km/h',
      frictionCoeff: '0.78 (Twilight Roadway)',
      perceptionSensors: 'Thermal IR Camera + 64-Beam LiDAR + Dual Stereo HDR',
      replanInterval: '6 ms',
      clearanceMargin: '1.8 m (Biological Buffer Zone)'
    }
  }
};

class ScenariosManager {
  constructor() {
    this.containerEl = document.getElementById('scenariosGridContainer');
    this.inspectModalEl = document.getElementById('scenarioInspectModal');
    this.inspectContentEl = document.getElementById('scenarioInspectContent');

    // Lightbox elements
    this.lightboxModalEl = document.getElementById('scenarioLightboxModal');
    this.lightboxMainImg = document.getElementById('lightboxMainImg');
    this.lightboxTitle = document.getElementById('lightboxTitle');
    this.lightboxCategoryBadge = document.getElementById('lightboxCategoryBadge');
    this.lightboxThreatLevel = document.getElementById('lightboxThreatLevel');
    this.lightboxSensorSpec = document.getElementById('lightboxSensorSpec');
    this.lightboxThumbsStrip = document.getElementById('lightboxThumbsStrip');
    this.lightboxLoadSimBtn = document.getElementById('lightboxLoadSimBtn');
    this.lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
    this.lightboxBackdrop = document.getElementById('lightboxBackdrop');
    this.lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
    this.lightboxNextBtn = document.getElementById('lightboxNextBtn');

    this.scenarioKeys = Object.keys(SCENARIO_DATA);
    this.currentLightboxIndex = 0;

    this.renderCards();
    this.initLightbox();
    this.initModalEvents();
  }

  renderCards() {
    if (!this.containerEl) return;
    this.containerEl.innerHTML = '';

    Object.values(SCENARIO_DATA).forEach((item) => {
      const card = document.createElement('div');
      card.className = 'scenario-card';
      card.innerHTML = `
        <div class="scenario-card-header-img" data-img-scenario="${item.id}" title="Click to view full image">
          <img src="${item.image}" alt="${item.title}" loading="lazy" />
          <span class="badge badge-cyan scenario-overlay-tag">${item.category}</span>
          <span class="badge ${item.threatBadgeClass} scenario-threat-level">
            <span class="pulse-dot"></span>
            ${item.threatLevel}
          </span>
          <div class="scenario-img-click-hint">
            <span>🔍</span> Click to View Image
          </div>
        </div>
        <div class="scenario-body">
          <h3 class="scenario-title">${item.title}</h3>
          <p class="scenario-desc">${item.description}</p>
          <div class="scenario-tags-list">
            ${item.challenges.slice(0, 3).map(ch => `<span class="scenario-tag-item">${ch}</span>`).join('')}
          </div>
        </div>
        <div class="scenario-actions-bar">
          <button class="btn-scenario-sim" data-scenario="${item.id}">
            <span>▶</span> Load in Simulator
          </button>
          <div style="display: flex; gap: 0.75rem; align-items: center;">
            <button class="btn-scenario-view-img" data-img-btn="${item.id}" style="font-size: 0.8rem; font-family: var(--font-mono); color: var(--cyan-primary); font-weight: 600;">
              🔍 View Image
            </button>
            <button class="btn-scenario-inspect" data-inspect="${item.id}">
              Inspect →
            </button>
          </div>
        </div>
      `;

      // Click on image area opens full-screen image lightbox
      const imgArea = card.querySelector('.scenario-card-header-img');
      imgArea.addEventListener('click', () => {
        this.openLightbox(item.id);
      });

      const viewImgBtn = card.querySelector('.btn-scenario-view-img');
      if (viewImgBtn) {
        viewImgBtn.addEventListener('click', () => {
          this.openLightbox(item.id);
        });
      }

      // Simulator load event
      const simBtn = card.querySelector('.btn-scenario-sim');
      simBtn.addEventListener('click', () => {
        if (window.simInstance) {
          window.simInstance.loadScenarioPreset(item.id);
          const simSection = document.getElementById('simulator');
          if (simSection) {
            simSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });

      // Inspection event
      const inspectBtn = card.querySelector('.btn-scenario-inspect');
      inspectBtn.addEventListener('click', () => {
        this.openInspector(item);
      });

      this.containerEl.appendChild(card);
    });
  }

  // ==========================================
  // FULLSCREEN IMAGE LIGHTBOX VIEWER
  // ==========================================
  initLightbox() {
    if (!this.lightboxModalEl) return;

    // Render thumbnail strip inside lightbox
    if (this.lightboxThumbsStrip) {
      this.lightboxThumbsStrip.innerHTML = '';
      this.scenarioKeys.forEach((key, idx) => {
        const item = SCENARIO_DATA[key];
        const thumb = document.createElement('div');
        thumb.className = `lightbox-thumb-item ${idx === 0 ? 'active' : ''}`;
        thumb.dataset.scenarioKey = key;
        thumb.innerHTML = `
          <img src="${item.image}" alt="${item.title}" />
          <div class="lightbox-thumb-title">${item.title}</div>
        `;
        thumb.addEventListener('click', () => {
          this.showScenarioAt(idx);
        });
        this.lightboxThumbsStrip.appendChild(thumb);
      });
    }

    // Close buttons
    if (this.lightboxCloseBtn) {
      this.lightboxCloseBtn.addEventListener('click', () => this.closeLightbox());
    }
    if (this.lightboxBackdrop) {
      this.lightboxBackdrop.addEventListener('click', () => this.closeLightbox());
    }

    // Prev / Next Navigation
    if (this.lightboxPrevBtn) {
      this.lightboxPrevBtn.addEventListener('click', () => {
        let newIdx = this.currentLightboxIndex - 1;
        if (newIdx < 0) newIdx = this.scenarioKeys.length - 1;
        this.showScenarioAt(newIdx);
      });
    }
    if (this.lightboxNextBtn) {
      this.lightboxNextBtn.addEventListener('click', () => {
        let newIdx = this.currentLightboxIndex + 1;
        if (newIdx >= this.scenarioKeys.length) newIdx = 0;
        this.showScenarioAt(newIdx);
      });
    }

    // Load into simulator from lightbox
    if (this.lightboxLoadSimBtn) {
      this.lightboxLoadSimBtn.addEventListener('click', () => {
        const currentKey = this.scenarioKeys[this.currentLightboxIndex];
        this.closeLightbox();
        if (window.simInstance) {
          window.simInstance.loadScenarioPreset(currentKey);
          const simSection = document.getElementById('simulator');
          if (simSection) {
            simSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    }

    // Keyboard handlers
    window.addEventListener('keydown', (e) => {
      if (!this.lightboxModalEl.classList.contains('active')) return;
      if (e.key === 'Escape') {
        this.closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        let newIdx = this.currentLightboxIndex - 1;
        if (newIdx < 0) newIdx = this.scenarioKeys.length - 1;
        this.showScenarioAt(newIdx);
      } else if (e.key === 'ArrowRight') {
        let newIdx = this.currentLightboxIndex + 1;
        if (newIdx >= this.scenarioKeys.length) newIdx = 0;
        this.showScenarioAt(newIdx);
      }
    });
  }

  openLightbox(scenarioId) {
    const idx = this.scenarioKeys.indexOf(scenarioId);
    if (idx !== -1) {
      this.showScenarioAt(idx);
    }
    if (this.lightboxModalEl) {
      this.lightboxModalEl.classList.add('active');
    }
  }

  closeLightbox() {
    if (this.lightboxModalEl) {
      this.lightboxModalEl.classList.remove('active');
    }
  }

  showScenarioAt(index) {
    this.currentLightboxIndex = index;
    const key = this.scenarioKeys[index];
    const scenario = SCENARIO_DATA[key];
    if (!scenario) return;

    if (this.lightboxMainImg) {
      this.lightboxMainImg.style.filter = 'blur(4px)';
      setTimeout(() => {
        this.lightboxMainImg.src = scenario.image;
        this.lightboxMainImg.alt = scenario.title;
        this.lightboxMainImg.style.filter = 'none';
      }, 100);
    }

    if (this.lightboxTitle) this.lightboxTitle.textContent = scenario.title;
    if (this.lightboxCategoryBadge) this.lightboxCategoryBadge.textContent = scenario.category;
    if (this.lightboxThreatLevel) this.lightboxThreatLevel.textContent = `THREAT LEVEL: ${scenario.threatLevel}`;
    if (this.lightboxSensorSpec) this.lightboxSensorSpec.textContent = `SENSORS: ${scenario.telemetry.perceptionSensors.toUpperCase()}`;

    // Highlight active thumbnail
    if (this.lightboxThumbsStrip) {
      const thumbs = this.lightboxThumbsStrip.querySelectorAll('.lightbox-thumb-item');
      thumbs.forEach((t, i) => {
        t.classList.toggle('active', i === index);
      });
    }
  }

  // ==========================================
  // SCENARIO TECHNICAL INSPECTION DRAWER
  // ==========================================
  openInspector(scenario) {
    if (!this.inspectModalEl || !this.inspectContentEl) return;

    this.inspectContentEl.innerHTML = `
      <div style="padding: 1.75rem; border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span class="badge badge-cyan" style="margin-bottom: 0.5rem;">${scenario.category}</span>
          <h2 style="font-family: var(--font-display); font-size: 1.8rem; font-weight: 800;">${scenario.title}</h2>
        </div>
        <button id="closeInspectModalBtn" class="btn-sos-close">✕</button>
      </div>

      <div style="padding: 1.75rem; display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
        <div>
          <div style="border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-subtle); margin-bottom: 1.25rem; cursor: pointer;" id="inspectImgClickWrap" title="Click to view full image">
            <img src="${scenario.image}" alt="${scenario.title}" style="width: 100%; height: auto;" />
            <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--cyan-primary); text-align: center; padding: 0.4rem; background: rgba(6, 9, 14, 0.8);">
              🔍 Click to open in Fullscreen Lightbox
            </div>
          </div>
          <h4 style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--cyan-primary); text-transform: uppercase; margin-bottom: 0.5rem;">Technical Path-Planning Solution</h4>
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">${scenario.technicalSolution}</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          <div style="background: var(--bg-card); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            <h4 style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--amber-primary); text-transform: uppercase; margin-bottom: 0.75rem;">Key Unstructured Road Challenges</h4>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.85rem; color: var(--text-secondary);">
              ${scenario.challenges.map(ch => `<li style="display: flex; align-items: center; gap: 0.5rem;">⚠️ <strong style="color: var(--text-primary);">${ch}</strong></li>`).join('')}
            </ul>
          </div>

          <div style="background: var(--bg-card); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            <h4 style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--emerald-primary); text-transform: uppercase; margin-bottom: 0.75rem;">Perception & Sensor Stack</h4>
            <div style="font-family: var(--font-mono); font-size: 0.78rem; display: flex; flex-direction: column; gap: 0.4rem; color: var(--text-secondary);">
              <div><strong style="color: var(--text-primary);">Sensors:</strong> ${scenario.telemetry.perceptionSensors}</div>
              <div><strong style="color: var(--text-primary);">Friction:</strong> ${scenario.telemetry.frictionCoeff}</div>
              <div><strong style="color: var(--text-primary);">Replan Interval:</strong> ${scenario.telemetry.replanInterval}</div>
              <div><strong style="color: var(--text-primary);">Clearance Buffer:</strong> ${scenario.telemetry.clearanceMargin}</div>
            </div>
          </div>

          <div style="display: flex; gap: 0.75rem;">
            <button id="inspectLoadSimBtn" class="btn-primary" style="flex: 1; justify-content: center;">
              ▶ Load in Simulator
            </button>
            <button id="inspectOpenLightboxBtn" class="btn-secondary" style="justify-content: center;">
              🔍 Fullscreen View
            </button>
          </div>
        </div>
      </div>
    `;

    this.inspectModalEl.classList.add('active');

    const closeBtn = document.getElementById('closeInspectModalBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.inspectModalEl.classList.remove('active');
      });
    }

    const loadSimBtn = document.getElementById('inspectLoadSimBtn');
    if (loadSimBtn) {
      loadSimBtn.addEventListener('click', () => {
        this.inspectModalEl.classList.remove('active');
        if (window.simInstance) {
          window.simInstance.loadScenarioPreset(scenario.id);
          const simSection = document.getElementById('simulator');
          if (simSection) {
            simSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    }

    const openLightboxBtn = document.getElementById('inspectOpenLightboxBtn');
    if (openLightboxBtn) {
      openLightboxBtn.addEventListener('click', () => {
        this.inspectModalEl.classList.remove('active');
        this.openLightbox(scenario.id);
      });
    }

    const imgWrap = document.getElementById('inspectImgClickWrap');
    if (imgWrap) {
      imgWrap.addEventListener('click', () => {
        this.inspectModalEl.classList.remove('active');
        this.openLightbox(scenario.id);
      });
    }
  }

  initModalEvents() {
    if (!this.inspectModalEl) return;
    this.inspectModalEl.addEventListener('click', (e) => {
      if (e.target === this.inspectModalEl) {
        this.inspectModalEl.classList.remove('active');
      }
    });
  }
}

window.ScenariosManager = ScenariosManager;
