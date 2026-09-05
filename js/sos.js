/**
 * RAASTA.AI - Emergency SOS & Fail-Safe Safe-Stop Protocol
 * Text-to-Speech Engine, Acoustic Siren, 3-Second Countdown, Live GPS Telemetry, and Simulator Return
 */

class EmergencySOSManager {
  constructor() {
    this.modalEl = document.getElementById('sosModalOverlay');
    this.respeakBtn = document.getElementById('respeakVoiceBtn');
    this.countdownCard = document.getElementById('sosCountdownCard');
    this.countdownDigits = document.getElementById('sosCountdownDigits');
    this.cancelBtn = document.getElementById('cancelCountdownBtn');
    this.immediateBtn = document.getElementById('immediateTriggerBtn');
    this.massiveBtn = document.getElementById('massiveSosButton');
    this.massiveBtnTag = document.getElementById('massiveBtnTag');
    this.beaconText = document.getElementById('beaconStatusText');
    this.timestampEl = document.getElementById('liveTimestampText');
    this.returnTopBtn = document.getElementById('returnToSimTopBtn');
    this.returnBottomBtn = document.getElementById('returnToSimBottomBtn');
    this.resetBtn = document.getElementById('resetSosBtn');
    this.teleopBtn = document.getElementById('teleopHandoverBtn');
    this.closeBtn = document.getElementById('closeSosBtn');

    this.audioContext = null;
    this.isAlarmActive = false;
    this.alarmInterval = null;
    this.soundEnabled = true;
    this.isSpeaking = false;
    this.countdown = 3;
    this.countdownInterval = null;
    this.isAlertTriggered = false;
    this.isCancelled = false;

    this.initLiveTimestamp();
    this.initListeners();
    this.preloadVoices();
  }

  initLiveTimestamp() {
    const updateTime = () => {
      const now = new Date();
      if (this.timestampEl) {
        this.timestampEl.textContent = now.toISOString().replace('T', ' ').substring(0, 23) + ' IST';
      }
    };
    updateTime();
    setInterval(updateTime, 75);
  }

  preloadVoices() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }

  initListeners() {
    // Header SOS Button
    const headerBtn = document.getElementById('headerSosBtn');
    if (headerBtn) headerBtn.addEventListener('click', () => this.triggerEmergencySOS());

    // Massive Centerpiece SOS Button
    if (this.massiveBtn) {
      this.massiveBtn.addEventListener('click', () => {
        this.triggerFinalAlert();
      });
    }

    // Cancel Countdown Button
    if (this.cancelBtn) {
      this.cancelBtn.addEventListener('click', () => {
        this.cancelCountdown();
      });
    }

    // Immediate Trigger Button
    if (this.immediateBtn) {
      this.immediateBtn.addEventListener('click', () => {
        this.triggerFinalAlert();
      });
    }

    // Return to Simulator Buttons (Top and Bottom)
    if (this.returnTopBtn) {
      this.returnTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.returnToSimulator();
      });
    }
    if (this.returnBottomBtn) {
      this.returnBottomBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.returnToSimulator();
      });
    }

    // Replay Voice Alert Button
    if (this.respeakBtn) {
      this.respeakBtn.addEventListener('click', () => {
        this.speakSOSMessage();
      });
    }

    // Modal Close Button
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeModal());
    }

    // Click outside modal dialog card to dismiss
    if (this.modalEl) {
      this.modalEl.addEventListener('click', (e) => {
        if (e.target === this.modalEl) {
          this.closeModal();
        }
      });
    }

    // Reset System Button
    if (this.resetBtn) {
      this.resetBtn.addEventListener('click', () => this.resetSystem());
    }

    // Tele-op Handover / Dial 112
    if (this.teleopBtn) {
      this.teleopBtn.addEventListener('click', () => this.simulateTeleop());
    }

    // Keyboard shortcut (Shift + E or Escape to close)
    window.addEventListener('keydown', (e) => {
      if (e.key === 'E' && e.shiftKey) {
        this.triggerEmergencySOS();
      } else if (e.key === 'Escape' && this.modalEl && this.modalEl.classList.contains('active')) {
        this.closeModal();
      }
    });
  }

  /**
   * Text-To-Speech Engine
   */
  speakSOSMessage(customText) {
    if (!('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel();

      const speechText = customText || "Emergency SOS Sent! Location sent to emergency contacts. Autonomous vehicle fail-safe braking engaged.";
      const utterance = new SpeechSynthesisUtterance(speechText);

      utterance.rate = 0.95;
      utterance.pitch = 1.05;
      utterance.volume = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const voiceCandidate = voices.find(v => v.lang.includes('en-IN') || v.lang.includes('en-GB') || v.lang.includes('en-US'));
      if (voiceCandidate) {
        utterance.voice = voiceCandidate;
      }

      utterance.onstart = () => { this.isSpeaking = true; };
      utterance.onend = () => { this.isSpeaking = false; };
      utterance.onerror = () => { this.isSpeaking = false; };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Speech error:', err);
    }
  }

  initAudio() {
    if (!this.audioContext) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioContext = new AudioContextClass();
      }
    }
  }

  playAlarmTone(freq, duration) {
    if (!this.soundEnabled || !this.audioContext) return;
    try {
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);
      gain.gain.setValueAtTime(0.09, this.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioContext.destination);

      osc.start();
      osc.stop(this.audioContext.currentTime + duration);
    } catch (e) {}
  }

  startAlarmCycle() {
    this.stopAlarmCycle();
    this.isAlarmActive = true;
    let high = true;
    this.playAlarmTone(880, 0.25);

    this.alarmInterval = setInterval(() => {
      if (!this.isAlarmActive) return;
      this.playAlarmTone(high ? 960 : 640, 0.28);
      high = !high;
    }, 450);
  }

  stopAlarmCycle() {
    this.isAlarmActive = false;
    if (this.alarmInterval) {
      clearInterval(this.alarmInterval);
      this.alarmInterval = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  /**
   * Triggers the full-screen emergency takeover with 3s countdown
   */
  triggerEmergencySOS() {
    this.initAudio();
    if (this.modalEl) this.modalEl.classList.add('active');

    // Trigger E-Brake in the simulator
    if (window.simInstance && window.simInstance.ego) {
      window.simInstance.ego.emergencyStop = true;
      window.simInstance.ego.speed = 0;
      if (window.simInstance.telemetry) {
        window.simInstance.telemetry.status = 'EMERGENCY BRAKE';
      }
    }

    // Reset countdown state
    this.isAlertTriggered = false;
    this.isCancelled = false;
    this.countdown = 3;

    if (this.countdownCard) {
      this.countdownCard.style.display = 'flex';
      this.countdownCard.innerHTML = `
        <span class="badge badge-danger" style="background: #d50000; color: #ffffff; border-color: #ff1744;">
          CRITICAL INTERVENTION: BROADCAST ARMED
        </span>
        <div style="color: #ffeedd; font-size: 0.95rem; font-weight: 600;">
          Transmitting Hardware E-Stop & High-Priority C-V2X Emergency Packet in:
        </div>
        <div class="sos-countdown-digits" id="sosCountdownDigits">00:03</div>
        <div class="sos-countdown-actions">
          <button id="cancelCountdownBtn" class="btn-cancel-countdown">
            ✕ CANCEL COUNTDOWN
          </button>
          <button id="immediateTriggerBtn" class="btn-primary" style="background: #ff1744; color: #ffffff; font-family: var(--font-mono); font-weight: 800; font-size: 0.82rem; padding: 0.6rem 1.25rem;">
            ⚡ TRIGGER IMMEDIATELY
          </button>
        </div>
      `;

      // Re-bind buttons inside dynamic card
      const newCancelBtn = document.getElementById('cancelCountdownBtn');
      const newImmediateBtn = document.getElementById('immediateTriggerBtn');
      if (newCancelBtn) newCancelBtn.addEventListener('click', () => this.cancelCountdown());
      if (newImmediateBtn) newImmediateBtn.addEventListener('click', () => this.triggerFinalAlert());
    }

    if (this.massiveBtn) this.massiveBtn.classList.remove('dispatched');
    if (this.massiveBtnTag) this.massiveBtnTag.textContent = 'PRESS TO TRANSMIT';
    if (this.beaconText) this.beaconText.textContent = 'LOCATION READY FOR DISPATCH • COUNTDOWN ARMED';

    // Start 3-second Countdown Timer
    if (this.countdownInterval) clearInterval(this.countdownInterval);
    this.countdownInterval = setInterval(() => {
      if (this.isCancelled || this.isAlertTriggered) return;
      this.countdown--;
      const digitsEl = document.getElementById('sosCountdownDigits');
      if (digitsEl) {
        digitsEl.textContent = '00:0' + Math.max(0, this.countdown);
      }
      if (this.countdown <= 0) {
        clearInterval(this.countdownInterval);
        this.triggerFinalAlert();
      }
    }, 1000);
  }

  /**
   * Final Alert Dispatch Sequence
   */
  triggerFinalAlert() {
    this.isAlertTriggered = true;
    if (this.countdownInterval) clearInterval(this.countdownInterval);

    // Hide countdown card
    if (this.countdownCard) {
      this.countdownCard.style.display = 'none';
    }

    // Update massive button UI
    if (this.massiveBtn) {
      this.massiveBtn.classList.add('dispatched');
    }
    if (this.massiveBtnTag) {
      this.massiveBtnTag.textContent = '● ALERT DISPATCHED (LOCK)';
    }

    // Update Live Status Box
    if (this.beaconText) {
      this.beaconText.textContent = 'LOCATION SENT TO EMERGENCY CONTACTS (ACK)';
    }

    // Voice & Audio Siren
    this.speakSOSMessage("Emergency SOS Sent! Location sent to emergency contacts. Autonomous vehicle fail-safe braking engaged.");
    this.startAlarmCycle();
  }

  /**
   * Cancel Countdown Option
   */
  cancelCountdown() {
    this.isCancelled = true;
    if (this.countdownInterval) clearInterval(this.countdownInterval);
    this.stopAlarmCycle();

    if (this.countdownCard) {
      this.countdownCard.innerHTML = `
        <div style="color: #ffaa00; font-weight: 800; font-size: 1.15rem;">⚠️ EMERGENCY SOS CANCELLED</div>
        <div style="color: #e2e8f0; font-size: 0.85rem; font-family: var(--font-mono);">Autonomous driving stack standing down. Vehicle controls nominal.</div>
        <div style="display: flex; gap: 0.75rem; margin-top: 0.5rem;">
          <button id="rearmSosBtn" class="btn-cancel-countdown" style="background: #ff1744; color: #fff;">↺ Arm SOS Again</button>
          <button id="returnFromCancelBtn" class="btn-return-sim">← Return to Simulator</button>
        </div>
      `;
      const rearmBtn = document.getElementById('rearmSosBtn');
      const returnBtn = document.getElementById('returnFromCancelBtn');
      if (rearmBtn) rearmBtn.addEventListener('click', () => this.triggerEmergencySOS());
      if (returnBtn) returnBtn.addEventListener('click', () => this.returnToSimulator());
    }

    if (this.beaconText) {
      this.beaconText.textContent = 'ALERT CANCELLED • STANDBY NOMINAL';
    }

    // Restore simulator vehicle
    if (window.simInstance && window.simInstance.ego) {
      window.simInstance.ego.emergencyStop = false;
      window.simInstance.ego.speed = 35;
      if (window.simInstance.telemetry) {
        window.simInstance.telemetry.status = 'NOMINAL';
      }
    }

    this.speakSOSMessage("Emergency SOS Canceled. Standing down.");
  }

  /**
   * Smoothly return to the main simulator
   */
  returnToSimulator() {
    this.closeModal();

    // Reset simulator vehicle
    if (window.simInstance && window.simInstance.ego) {
      window.simInstance.ego.emergencyStop = false;
      window.simInstance.ego.speed = 35;
      if (window.simInstance.telemetry) {
        window.simInstance.telemetry.status = 'NOMINAL';
      }
    }

    // Smooth scroll to the simulator section
    const simSection = document.getElementById('simulator');
    if (simSection) {
      simSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  simulateTeleop() {
    this.speakSOSMessage("National Emergency Response 112 connected. Vehicle GPS and telemetry transmitted to highway rescue.");
    if (this.beaconText) {
      this.beaconText.textContent = 'DIAL 112 CONNECTED • AMBULANCE & PATROL EN ROUTE';
    }
  }

  resetSystem() {
    this.stopAlarmCycle();
    if (this.countdownInterval) clearInterval(this.countdownInterval);
    if (this.modalEl) this.modalEl.classList.remove('active');

    if (window.simInstance && window.simInstance.ego) {
      window.simInstance.ego.emergencyStop = false;
      window.simInstance.ego.speed = 35;
      if (window.simInstance.telemetry) {
        window.simInstance.telemetry.status = 'NOMINAL';
      }
    }
  }

  closeModal() {
    this.stopAlarmCycle();
    if (this.countdownInterval) clearInterval(this.countdownInterval);
    if (this.modalEl) this.modalEl.classList.remove('active');
  }
}

window.EmergencySOSManager = EmergencySOSManager;
