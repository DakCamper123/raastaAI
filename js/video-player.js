/**
 * RAASTA.AI - Perception Demo Video & Multi-Camera Switcher
 * Manages Synchronized 6-Camera Suite, Instant Big Screen Image Switching, and Timeline Bookmarks
 */

const FEED_IMAGES = {
  cam_urban: './assets/scenarios/urban_intersection.jpg',
  cam_village: './assets/scenarios/village_road.jpg',
  cam_highway: './assets/scenarios/highway_merge.jpg',
  cam_market: './assets/scenarios/dense_market.jpg',
  cam_cattle: './assets/scenarios/cattle_crossing.jpg',
  cam_cockpit: './assets/hero/hero_sensor_hud.jpg'
};

const FEED_ORDER = ['cam_village', 'cam_urban', 'cam_highway', 'cam_market', 'cam_cattle', 'cam_cockpit'];

const FEED_METADATA = {
  cam_urban: {
    title: 'FEED: CAM 01 (URBAN CHURN) | 4K 60 FPS',
    shortName: 'CAM 01 (URBAN INTERSECTION)',
    event: 'Auto-Rickshaw Cut-in - Game-theoretic DWA predicts lateral swerve; car yields 0.6m.',
    time: 14
  },
  cam_village: {
    title: 'FEED: CAM 02 (RURAL CORRIDOR) | STEREO RGB 60 FPS',
    shortName: 'CAM 02 (UNMARKED VILLAGE ROAD)',
    event: 'Eroded Dirt Edge - Depth geometry classifies 14cm shoulder drop-off; vehicle recenters virtual centerline.',
    time: 4
  },
  cam_highway: {
    title: 'FEED: CAM 03 (EXPRESSWAY NH-48) | 77GHz RADAR + LIDAR',
    shortName: 'CAM 03 (HIGHWAY SUGARCANE MERGE)',
    event: 'Slow Sugarcane Tractor (18 km/h) - High speed delta (+34 km/h); safe overtaking envelope engaged.',
    time: 22
  },
  cam_market: {
    title: 'FEED: CAM 04 (DENSE BAZAAR) | PROXIMITY HEATMAP',
    shortName: 'CAM 04 (DENSE MARKET BAZAAR)',
    event: 'Bazaar Pedestrian Swarm - Ultrasonic array detects 30cm clearance; millimeter-precise nudging active.',
    time: 30
  },
  cam_cattle: {
    title: 'FEED: CAM 05 (BOVINE BIOLOGICAL) | THERMAL IR 100 FPS',
    shortName: 'CAM 05 (SUDDEN CATTLE CROSSING)',
    event: 'Zebu Cattle Sudden Step-In - Biological 3D pose lock; emergency braking zone activated at 1.1s TTC.',
    time: 38
  },
  cam_cockpit: {
    title: 'FEED: CAM 06 (AUTOPILOT COCKPIT) | 3D POINT CLOUD',
    shortName: 'CAM 06 (COCKPIT & 3D LIDAR)',
    event: 'NH-48 Corridor Autopilot - 128-Beam LiDAR point cloud with full multi-lane trajectory synthesis.',
    time: 43
  }
};

// Preload all 6 images immediately in the background
Object.values(FEED_IMAGES).forEach(src => {
  const img = new Image();
  img.src = src;
});

let _switchNotifyTimer = null;

/**
 * Universal Global Feed Switcher - Callable directly from HTML onclick or JS
 */
window.switchCameraFeed = function(feedKey, options = {}) {
  const imgSrc = FEED_IMAGES[feedKey];
  if (!imgSrc) return;

  const imgEl = document.getElementById('demoScreenImg');
  const frameEl = document.getElementById('demoScreenFrame');
  const notifyEl = document.getElementById('demoSwitchNotify');
  const statusEl = document.getElementById('demoFeedStatus');
  const descEl = document.getElementById('demoEventDesc');
  const timeEl = document.getElementById('demoTimeDisplay');
  const progressEl = document.getElementById('demoProgressBar');

  // 1. Immediately change big screen image source
  if (imgEl) {
    imgEl.src = imgSrc;
    imgEl.setAttribute('src', imgSrc);
    
    // Visual scanline switch flash
    if (frameEl) {
      frameEl.classList.add('switching');
      setTimeout(() => frameEl.classList.remove('switching'), 180);
    }
  }

  // 2. Update Top Tab Buttons
  document.querySelectorAll('.cam-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.feed === feedKey);
  });

  // 3. Update Monitor Matrix Cards
  document.querySelectorAll('.camera-monitor-card').forEach(card => {
    card.classList.toggle('active', card.dataset.feed === feedKey);
  });

  // 4. Update HUD Status & Description
  const meta = FEED_METADATA[feedKey];
  if (meta) {
    if (statusEl) statusEl.textContent = meta.title;
    if (descEl) {
      descEl.textContent = `[ACTIVE EVENT]: ${meta.event}`;
      descEl.style.color = 'var(--cyan-primary)';
    }

    if (!options.fromPlayback && timeEl && progressEl) {
      const min = Math.floor(meta.time / 60);
      const sec = Math.floor(meta.time % 60);
      timeEl.textContent = `0${min}:${sec < 10 ? '0' : ''}${sec} / 00:45`;
      progressEl.style.width = `${(meta.time / 45) * 100}%`;
    }

    // 5. Trigger HUD notification banner
    if (notifyEl) {
      notifyEl.textContent = `⚡ STREAM SWITCHED: ${meta.shortName}`;
      notifyEl.classList.remove('active');
      void notifyEl.offsetWidth; // Force reflow
      notifyEl.classList.add('active');

      if (_switchNotifyTimer) clearTimeout(_switchNotifyTimer);
      _switchNotifyTimer = setTimeout(() => {
        if (notifyEl) notifyEl.classList.remove('active');
      }, 2200);
    }
  }

  // 6. Sync state with active instance
  if (window.videoPlayer) {
    window.videoPlayer.activeFeed = feedKey;
    if (!options.fromPlayback && meta) {
      window.videoPlayer.currentTime = meta.time;
    }
  }
};

/**
 * Cycle to next camera stream (useful when clicking the big screen frame)
 */
window.switchCameraFeedNext = function() {
  const current = (window.videoPlayer && window.videoPlayer.activeFeed) || 'cam_urban';
  const idx = FEED_ORDER.indexOf(current);
  const nextIdx = (idx + 1) % FEED_ORDER.length;
  window.switchCameraFeed(FEED_ORDER[nextIdx]);
};

class PerceptionVideoPlayer {
  constructor() {
    this.screenImg = document.getElementById('demoScreenImg');
    this.screenFrame = document.getElementById('demoScreenFrame');
    this.switchNotify = document.getElementById('demoSwitchNotify');
    this.playBtn = document.getElementById('demoPlayBtn');
    this.timeDisplay = document.getElementById('demoTimeDisplay');
    this.progressBar = document.getElementById('demoProgressBar');
    this.statusBadge = document.getElementById('demoFeedStatus');
    this.eventDescEl = document.getElementById('demoEventDesc');

    this.isPlaying = true;
    this.currentTime = 14;
    this.totalDuration = 45;
    this.activeFeed = 'cam_urban';

    this.feedImages = FEED_IMAGES;
    this.feedMetadata = FEED_METADATA;

    this.events = [
      { time: 4, feed: 'cam_village', label: 'Rural Road Edge Mapped', desc: 'Stereo cameras classify eroded shoulder crater.' },
      { time: 14, feed: 'cam_urban', label: 'Urban Swarm Rickshaw', desc: 'Game-theoretic DWA negotiates multi-agent cut-in.' },
      { time: 22, feed: 'cam_highway', label: 'Sugarcane Tractor Merge', desc: 'Safe overtaking envelope calculated on highway.' },
      { time: 30, feed: 'cam_market', label: 'Bazaar Crowd Nudge', desc: 'Centimeter tolerance ultrasonic proximity active.' },
      { time: 38, feed: 'cam_cattle', label: 'Bovine 3D Pose E-Brake', desc: 'Biological pose estimation triggers ASIL-D safe stop.' },
      { time: 43, feed: 'cam_cockpit', label: 'Cockpit 3D Point Cloud', desc: 'Full 360-degree point cloud and highway navigation locked.' }
    ];

    this.initEvents();
    this.startPlaybackLoop();
  }

  initEvents() {
    // 1. Camera feed switcher buttons (Top Tabs)
    const tabBtns = document.querySelectorAll('.cam-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const feedKey = btn.dataset.feed;
        this.switchFeed(feedKey);
      });
    });

    // 2. Multi-Camera Matrix Grid Event Delegation (Cards, images, tags)
    const matrixGrid = document.getElementById('cameraMatrixGrid');
    if (matrixGrid) {
      matrixGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.camera-monitor-card');
        if (card && card.dataset.feed) {
          e.preventDefault();
          this.switchFeed(card.dataset.feed);
        }
      });
    }

    // 3. Timeline bookmarks click
    const bookmarks = document.querySelectorAll('.timeline-bookmark');
    bookmarks.forEach(bm => {
      bm.addEventListener('click', (e) => {
        e.preventDefault();
        const t = parseInt(bm.dataset.time, 10);
        this.seekTo(t);
      });
    });

    // 4. Scrubbable Timeline Track Click
    const scrubber = document.getElementById('demoScrubber');
    if (scrubber) {
      scrubber.addEventListener('click', (e) => {
        const rect = scrubber.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const pct = Math.max(0, Math.min(1, clickX / rect.width));
        const targetTime = Math.round(pct * this.totalDuration);
        this.seekTo(targetTime);
      });
    }

    // 5. Big Screen Frame Click (cycles to next camera feed)
    if (this.screenFrame) {
      this.screenFrame.addEventListener('click', (e) => {
        // Only cycle if user didn't click inside interactive HUD buttons
        if (!e.target.closest('.feed-hud-top') && !e.target.closest('.feed-hud-bottom')) {
          window.switchCameraFeedNext();
        }
      });
    }

    // 6. Play / Pause toggle
    if (this.playBtn) {
      this.playBtn.addEventListener('click', () => {
        this.isPlaying = !this.isPlaying;
        this.playBtn.textContent = this.isPlaying ? '⏸ Pause' : '▶ Play';
        if (this.isPlaying) {
          this.playBtn.style.color = 'var(--cyan-primary)';
        } else {
          this.playBtn.style.color = 'var(--text-secondary)';
        }
      });
    }
  }

  /**
   * Switches the image on the big screen immediately to the clicked feed
   */
  switchFeed(feedKey) {
    window.switchCameraFeed(feedKey);
  }

  seekTo(timeInSec) {
    this.currentTime = timeInSec;
    this.updateUI();

    // Check if bookmark corresponds to a specific camera feed
    const matchingEvent = this.events.find(ev => Math.abs(ev.time - timeInSec) <= 2);
    if (matchingEvent && matchingEvent.feed) {
      window.switchCameraFeed(matchingEvent.feed);
    }
  }

  updateUI() {
    if (this.progressBar) {
      const pct = (this.currentTime / this.totalDuration) * 100;
      this.progressBar.style.width = `${pct}%`;
    }

    if (this.timeDisplay) {
      const min = Math.floor(this.currentTime / 60);
      const sec = Math.floor(this.currentTime % 60);
      this.timeDisplay.textContent = `0${min}:${sec < 10 ? '0' : ''}${sec} / 00:45`;
    }

    // Check active events for description banner
    const matchingEvent = this.events.find(ev => Math.abs(ev.time - this.currentTime) < 1.5);
    if (matchingEvent && this.eventDescEl) {
      this.eventDescEl.textContent = `[ACTIVE EVENT]: ${matchingEvent.label} - ${matchingEvent.desc}`;
      this.eventDescEl.style.color = 'var(--cyan-primary)';
    }
  }

  startPlaybackLoop() {
    setInterval(() => {
      if (!this.isPlaying) return;
      this.currentTime += 0.5;
      if (this.currentTime > this.totalDuration) {
        this.currentTime = 0;
      }
      this.updateUI();

      // Automatically transition camera stream as timeline passes bookmarks
      const currentInt = Math.floor(this.currentTime);
      const matched = this.events.find(ev => ev.time === currentInt);
      if (matched && matched.feed && matched.feed !== this.activeFeed) {
        window.switchCameraFeed(matched.feed, { fromPlayback: true });
      }
    }, 500);
  }
}

// Export class
window.PerceptionVideoPlayer = PerceptionVideoPlayer;

// Self-initialize as soon as DOM is ready so it never fails
const initPerceptionPlayer = () => {
  if (!window.videoPlayer) {
    window.videoPlayer = new PerceptionVideoPlayer();
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPerceptionPlayer);
} else {
  initPerceptionPlayer();
}
