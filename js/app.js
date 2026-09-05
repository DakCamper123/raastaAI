/**
 * RAASTA.AI - Main Application Controller
 * Coordinates Theme Switching, Simulator Controls, Audio Feedback, and Subsystems
 */

// Global theme toggle for immediate access
window.toggleTheme = function() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  try {
    localStorage.setItem('raasta_theme', next);
  } catch (e) {}
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) {
    themeToggleBtn.innerHTML = next === 'dark' ? '☀️' : '🌙';
    themeToggleBtn.title = next === 'dark' ? 'Switch to Titanium Light' : 'Switch to Obsidian Dark';
  }
};

const bootApp = () => {
  // 1. Theme Switcher (Obsidian Dark vs Titanium Light)
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  let currentTheme = 'dark';
  try {
    currentTheme = localStorage.getItem('raasta_theme') || 'dark';
  } catch (e) {}

  document.documentElement.setAttribute('data-theme', currentTheme);
  if (themeToggleBtn) {
    themeToggleBtn.innerHTML = currentTheme === 'dark' ? '☀️' : '🌙';
    themeToggleBtn.title = currentTheme === 'dark' ? 'Switch to Titanium Light' : 'Switch to Obsidian Dark';
    themeToggleBtn.onclick = () => {
      window.toggleTheme();
      playClickSound();
    };
  }

  // 2. Audio Synthesizer Feedback for HUD interactions
  let audioContext = null;
  let audioMuted = false;

  const initAudio = () => {
    if (!audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) audioContext = new AudioCtx();
    }
  };

  const playClickSound = (freq = 1200, dur = 0.05) => {
    if (audioMuted) return;
    initAudio();
    if (!audioContext) return;
    try {
      if (audioContext.state === 'suspended') audioContext.resume();
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioContext.currentTime);
      gain.gain.setValueAtTime(0.04, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + dur);
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.start();
      osc.stop(audioContext.currentTime + dur);
    } catch (e) {}
  };

  const audioToggleBtn = document.getElementById('audioToggleBtn');
  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      audioMuted = !audioMuted;
      audioToggleBtn.innerHTML = audioMuted ? '🔇' : '🔊';
      audioToggleBtn.title = audioMuted ? 'Unmute HUD Audio' : 'Mute HUD Audio';
      if (window.sosManager) window.sosManager.soundEnabled = !audioMuted;
    });
  }

  // 3. Initialize Interactive Path Planning Simulator
  try {
    if (window.AutonomousSimulator && !window.simInstance) {
      window.simInstance = new window.AutonomousSimulator('pathSimCanvas');
    }
  } catch (e) {
    console.warn('[Raasta.AI] Simulator init warning:', e);
  }

  // 4. Initialize Emergency SOS Manager
  try {
    if (window.EmergencySOSManager && !window.sosManager) {
      window.sosManager = new window.EmergencySOSManager();
    }
  } catch (e) {
    console.warn('[Raasta.AI] SOS init warning:', e);
  }

  // 5. Initialize 5 Mandated Indian Road Scenarios Gallery
  try {
    if (window.ScenariosManager && !window.scenariosManager) {
      window.scenariosManager = new window.ScenariosManager();
    }
  } catch (e) {
    console.warn('[Raasta.AI] Scenarios init warning:', e);
  }

  // 6. Initialize Telemetry Benchmark Dashboard
  try {
    if (window.TelemetryDashboard && !window.telemetryDashboard) {
      window.telemetryDashboard = new window.TelemetryDashboard();
    }
  } catch (e) {
    console.warn('[Raasta.AI] Telemetry init warning:', e);
  }

  // 7. Initialize Perception Video Player
  try {
    if (window.PerceptionVideoPlayer && !window.videoPlayer) {
      window.videoPlayer = new window.PerceptionVideoPlayer();
    }
  } catch (e) {
    console.warn('[Raasta.AI] VideoPlayer init warning:', e);
  }

  // 8. Bind Simulator Controls
  initSimulatorControls();

  function initSimulatorControls() {
    if (!window.simInstance) return;

    // Algorithm selection
    const algoBtns = document.querySelectorAll('.algo-pill-btn');
    algoBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        algoBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const algo = btn.dataset.algo;
        window.simInstance.algorithm = algo;
        playClickSound(1400);
      });
    });

    // Spawner buttons
    const spawnerBtns = document.querySelectorAll('.spawner-btn');
    spawnerBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.type;
        const randY = window.simInstance.road.topEdgeY + 30 + Math.random() * (window.simInstance.road.pavementWidth - 60);
        window.simInstance.addObstacle(type, window.simInstance.width * 0.75, randY);
        playClickSound(1600);
      });
    });

    // Speed Slider
    const speedSlider = document.getElementById('simSpeedSlider');
    const speedValDisplay = document.getElementById('simSpeedValDisplay');
    if (speedSlider) {
      speedSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        window.simInstance.ego.targetSpeed = val;
        if (speedValDisplay) speedValDisplay.textContent = `${val} km/h`;
      });
    }

    // Road Weather / Surface selector
    const roadSelect = document.getElementById('simRoadConditionSelect');
    if (roadSelect) {
      roadSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        window.simInstance.roadCondition = val;
        if (val === 'dry') window.simInstance.friction = 0.85;
        else if (val === 'rain') window.simInstance.friction = 0.5;
        else if (val === 'mud') window.simInstance.friction = 0.35;
        playClickSound(1000);
      });
    }

    // Potential Field Heatmap Toggle
    const heatToggle = document.getElementById('simTogglePotentialField');
    if (heatToggle) {
      heatToggle.addEventListener('click', () => {
        window.simInstance.showPotentialField = !window.simInstance.showPotentialField;
        heatToggle.classList.toggle('active', window.simInstance.showPotentialField);
        playClickSound();
      });
    }

    // Reset Ego Vehicle
    const resetBtn = document.getElementById('simResetEgoBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        window.simInstance.resetEgo();
        playClickSound(800);
      });
    }

    // Clear Obstacles
    const clearBtn = document.getElementById('simClearObstaclesBtn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        window.simInstance.clearObstacles();
        playClickSound(800);
      });
    }
  }

  // 9. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
    });
  }

  // 10. Nav Active Spy on Scroll
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(sec => {
      const secH = sec.offsetHeight;
      const secTop = sec.offsetTop - 140;
      const secId = sec.getAttribute('id');
      if (scrollY > secTop && scrollY <= secTop + secH) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${secId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootApp);
} else {
  bootApp();
}
