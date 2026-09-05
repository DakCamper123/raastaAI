/**
 * RAASTA.AI - Real-Time Autonomous Vehicle Path Planning & Collision Avoidance Engine
 * Simulates Unstructured Indian Roads with Dynamic Obstacles, APF, DWA, and Hybrid A* Bezier
 */

class AutonomousSimulator {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    // Simulation State
    this.isRunning = true;
    this.algorithm = 'dwa'; // 'apf', 'dwa', 'bezier'
    this.roadCondition = 'dry'; // 'dry', 'rain', 'mud'
    this.friction = 0.85;
    this.showPotentialField = false;
    this.showLidarRays = true;
    this.showTrajectories = true;

    // Canvas sizing
    this.pixelRatio = window.devicePixelRatio || 1;
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Ego Vehicle State
    this.ego = {
      x: 140,
      y: 260,
      width: 54,
      height: 28,
      heading: 0, // Radians
      targetHeading: 0,
      speed: 38, // km/h
      targetSpeed: 45,
      maxSpeed: 80,
      minSpeed: 0,
      steeringAngle: 0, // Radians
      maxSteering: Math.PI / 5,
      acceleration: 0,
      braking: false,
      emergencyStop: false,
      lidarSweepAngle: 0,
      clearance: 99.9,
      ttc: 9.9, // Time to collision in seconds
      collisionRisk: 0, // 0 - 100%
      plannedPath: [],
      candidateTrajectories: []
    };

    // Unstructured Road Geometry
    this.road = {
      topEdgeY: 100,
      bottomEdgeY: 420,
      pavementWidth: 320,
      curvature: 0,
      dirtEdgeThickness: 24,
      textureOffset: 0
    };

    // Dynamic & Static Obstacles on Road
    this.obstacles = [];
    this.draggedObstacle = null;
    this.dragOffset = { x: 0, y: 0 };

    // Telemetry stats
    this.telemetry = {
      computeLatency: 11.2, // ms
      replanHz: 60,
      frameCounter: 0,
      status: 'NOMINAL'
    };

    // Initialize Default Scenario (Village Road)
    this.loadScenarioPreset('village');

    // Mouse & Touch Interactivity
    this.initInteraction();

    // Start Simulation Loop
    this.lastTimestamp = performance.now();
    this.loop = this.loop.bind(this);
    requestAnimationFrame(this.loop);
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;
    this.canvas.width = this.width * this.pixelRatio;
    this.canvas.height = this.height * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    // Adjust road coordinates based on canvas height
    this.road.topEdgeY = this.height * 0.2;
    this.road.bottomEdgeY = this.height * 0.8;
    this.road.pavementWidth = this.road.bottomEdgeY - this.road.topEdgeY;
  }

  initInteraction() {
    const getPos = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const onDown = (e) => {
      const pos = getPos(e);
      // Check if clicked an obstacle
      for (let i = this.obstacles.length - 1; i >= 0; i--) {
        const obs = this.obstacles[i];
        const dist = Math.hypot(pos.x - obs.x, pos.y - obs.y);
        if (dist <= obs.radius + 15) {
          this.draggedObstacle = obs;
          this.dragOffset.x = pos.x - obs.x;
          this.dragOffset.y = pos.y - obs.y;
          break;
        }
      }
    };

    const onMove = (e) => {
      if (!this.draggedObstacle) return;
      const pos = getPos(e);
      this.draggedObstacle.x = pos.x - this.dragOffset.x;
      this.draggedObstacle.y = pos.y - this.dragOffset.y;
    };

    const onUp = () => {
      this.draggedObstacle = null;
    };

    this.canvas.addEventListener('mousedown', onDown);
    this.canvas.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);

    this.canvas.addEventListener('touchstart', onDown, { passive: true });
    this.canvas.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onUp);
  }

  // ==========================================
  // SCENARIO PRESETS
  // ==========================================
  loadScenarioPreset(scenarioKey) {
    this.obstacles = [];
    this.ego.emergencyStop = false;
    this.ego.x = 120;
    this.ego.y = (this.road.topEdgeY + this.road.bottomEdgeY) / 2;
    this.ego.heading = 0;
    this.ego.speed = 38;

    switch (scenarioKey) {
      case 'village':
        // Unmarked Village Road: 1 cow grazing, 2 potholes, dirt borders
        this.addObstacle('cow', 420, this.ego.y - 30);
        this.addObstacle('pothole', 280, this.ego.y + 40);
        this.addObstacle('pothole', 580, this.ego.y - 50);
        this.roadCondition = 'mud';
        this.friction = 0.55;
        break;

      case 'intersection':
        // Unsignalized Urban Intersection: 2 autos swerving, 1 motorbike, 1 pedestrian
        this.addObstacle('auto', 380, this.ego.y - 45, { vy: 0.8, vx: -0.5 });
        this.addObstacle('auto', 520, this.ego.y + 50, { vy: -0.7, vx: -0.3 });
        this.addObstacle('pedestrian', 310, this.ego.y + 60, { vy: -0.4, vx: 0.2 });
        this.roadCondition = 'dry';
        this.friction = 0.85;
        break;

      case 'highway':
        // Highway Merge: Slow sugarcane tractor in lane, fast overtaking envelope
        this.addObstacle('tractor', 480, this.ego.y + 10, { vx: -0.8 });
        this.addObstacle('auto', 640, this.ego.y - 65, { vx: -1.2 });
        this.ego.speed = 55;
        this.ego.targetSpeed = 60;
        this.roadCondition = 'dry';
        this.friction = 0.85;
        break;

      case 'market':
        // Dense Market Area: High pedestrian density, cart, auto
        this.addObstacle('pedestrian', 260, this.ego.y - 50, { vy: 0.3 });
        this.addObstacle('pedestrian', 340, this.ego.y + 40, { vy: -0.2 });
        this.addObstacle('pedestrian', 450, this.ego.y - 20, { vy: 0.4 });
        this.addObstacle('auto', 560, this.ego.y - 55, { vx: -0.4 });
        this.addObstacle('pothole', 390, this.ego.y + 55);
        this.ego.speed = 18;
        this.ego.targetSpeed = 20;
        this.roadCondition = 'dry';
        break;

      case 'cattle':
        // Sudden Cattle Crossing: Large cow dead ahead, triggers emergency braking zone
        this.addObstacle('cow', 390, this.ego.y + 5, { vy: -0.2, vx: 0 });
        this.addObstacle('auto', 580, this.ego.y - 60, { vx: -0.5 });
        this.ego.speed = 42;
        this.ego.targetSpeed = 45;
        break;

      default:
        this.addObstacle('cow', 400, this.ego.y);
        break;
    }
  }

  addObstacle(type, x, y, options = {}) {
    let radius = 22;
    let label = 'OBSTACLE';
    let color = '#ffaa00';
    let icon = '⚠️';
    let vx = options.vx || 0;
    let vy = options.vy || 0;
    let width = 36;
    let length = 46;

    if (type === 'cow') {
      label = 'Bovine (Cow)';
      color = '#ff9900';
      radius = 28;
      width = 24;
      length = 50;
      icon = '🐄';
      vy = vy || (Math.random() - 0.5) * 0.3;
    } else if (type === 'auto') {
      label = 'Auto-Rickshaw';
      color = '#00ffaa';
      radius = 26;
      width = 28;
      length = 42;
      icon = '🛺';
      vx = vx || -0.6;
    } else if (type === 'tractor') {
      label = 'Sugarcane Tractor';
      color = '#f59e0b';
      radius = 34;
      width = 34;
      length = 68;
      icon = '🚜';
      vx = vx || -0.7;
    } else if (type === 'pothole') {
      label = 'Deep Pothole';
      color = '#ef4444';
      radius = 20;
      width = 30;
      length = 30;
      icon = '🕳️';
      vx = 0;
      vy = 0;
    } else if (type === 'pedestrian') {
      label = 'Pedestrian';
      color = '#ec4899';
      radius = 16;
      width = 18;
      length = 18;
      icon = '🚶';
      vy = vy || (Math.random() - 0.5) * 0.4;
    }

    this.obstacles.push({
      id: Math.random().toString(36).substr(2, 9),
      type,
      label,
      color,
      icon,
      x: x || this.width * 0.6,
      y: y || (this.road.topEdgeY + this.road.bottomEdgeY) / 2,
      radius,
      width,
      length,
      vx,
      vy,
      confidence: (0.91 + Math.random() * 0.08).toFixed(2)
    });
  }

  clearObstacles() {
    this.obstacles = [];
  }

  resetEgo() {
    this.ego.x = 120;
    this.ego.y = (this.road.topEdgeY + this.road.bottomEdgeY) / 2;
    this.ego.heading = 0;
    this.ego.steeringAngle = 0;
    this.ego.speed = 35;
    this.ego.emergencyStop = false;
  }

  // ==========================================
  // PATH PLANNING ALGORITHMS
  // ==========================================

  // 1. Artificial Potential Field (APF)
  computeAPFPath() {
    const path = [];
    let curX = this.ego.x;
    let curY = this.ego.y;
    const stepSize = 14;
    const horizon = 22; // Steps ahead

    // Goal is ahead down the center lane
    const targetY = (this.road.topEdgeY + this.road.bottomEdgeY) / 2;
    const goalX = curX + 320;
    const goalY = targetY;

    for (let step = 0; step < horizon; step++) {
      // Attractive Force towards goal & center
      const dGoalX = goalX - curX;
      const dGoalY = goalY - curY;
      const dGoal = Math.hypot(dGoalX, dGoalY) || 1;
      let fx = (dGoalX / dGoal) * 1.2;
      let fy = (dGoalY / dGoal) * 0.8;

      // Road boundary repulsive forces (Keep inside pavement)
      const distToTop = curY - this.road.topEdgeY;
      const distToBottom = this.road.bottomEdgeY - curY;
      if (distToTop < 50) {
        fy += Math.pow((50 - distToTop) / 10, 2) * 0.35;
      }
      if (distToBottom < 50) {
        fy -= Math.pow((50 - distToBottom) / 10, 2) * 0.35;
      }

      // Repulsive Force from Obstacles
      for (const obs of this.obstacles) {
        const dx = curX - obs.x;
        const dy = curY - obs.y;
        const dist = Math.hypot(dx, dy);
        const safeRadius = obs.radius + 45;

        if (dist < safeRadius && dist > 1) {
          const repMagnitude = Math.pow((safeRadius - dist) / safeRadius, 2) * 3.5;
          fx += (dx / dist) * repMagnitude;
          fy += (dy / dist) * repMagnitude;
        }
      }

      // Normalize step
      const forceMag = Math.hypot(fx, fy) || 1;
      curX += (fx / forceMag) * stepSize;
      curY += (fy / forceMag) * stepSize;

      path.push({ x: curX, y: curY });
    }

    return path;
  }

  // 2. Dynamic Window Approach (DWA)
  computeDWAPath() {
    const trajectories = [];
    const bestTrajectory = [];
    let bestScore = -Infinity;

    // Speeds & steering window
    const minSteer = -this.ego.maxSteering;
    const maxSteer = this.ego.maxSteering;
    const steerSteps = 9;
    const horizonSteps = 16;
    const dt = 0.12;

    const targetCenterY = (this.road.topEdgeY + this.road.bottomEdgeY) / 2;

    for (let s = 0; s < steerSteps; s++) {
      const steer = minSteer + (maxSteer - minSteer) * (s / (steerSteps - 1));
      const traj = [];
      let tx = this.ego.x;
      let ty = this.ego.y;
      let th = this.ego.heading;
      let minObstacleDist = Infinity;

      for (let step = 0; step < horizonSteps; step++) {
        th += steer * (this.ego.speed / 40) * dt;
        tx += Math.cos(th) * (this.ego.speed * 0.35) * dt * 25;
        ty += Math.sin(th) * (this.ego.speed * 0.35) * dt * 25;

        traj.push({ x: tx, y: ty });

        // Check obstacle proximity
        for (const obs of this.obstacles) {
          const d = Math.hypot(tx - obs.x, ty - obs.y);
          if (d < minObstacleDist) minObstacleDist = d;
        }

        // Road edge proximity
        const edgeDist = Math.min(ty - this.road.topEdgeY, this.road.bottomEdgeY - ty);
        if (edgeDist < minObstacleDist) minObstacleDist = edgeDist;
      }

      // Evaluate Score: Clearance + Centerline Alignment + Smoothness
      const endPt = traj[traj.length - 1];
      const headingPenalty = Math.abs(endPt.y - targetCenterY) * 0.4;
      const clearanceScore = minObstacleDist > 30 ? Math.min(minObstacleDist, 120) * 1.5 : -1000;
      const steerPenalty = Math.abs(steer) * 20;

      const score = clearanceScore - headingPenalty - steerPenalty;
      trajectories.push({ path: traj, score, steer, minObstacleDist });
    }

    // Pick highest scoring trajectory
    trajectories.sort((a, b) => b.score - a.score);
    this.ego.candidateTrajectories = trajectories;

    return trajectories[0] ? trajectories[0].path : [];
  }

  // 3. Hybrid A* with Bezier Spline
  computeBezierPath() {
    // Generate waypoint sequence evading obstacles
    const waypoints = [{ x: this.ego.x, y: this.ego.y }];
    const targetY = (this.road.topEdgeY + this.road.bottomEdgeY) / 2;

    // Check closest obstacle in ego path
    let criticalObs = null;
    let minObsX = Infinity;

    for (const obs of this.obstacles) {
      if (obs.x > this.ego.x && obs.x < this.ego.x + 300) {
        if (obs.x < minObsX) {
          minObsX = obs.x;
          criticalObs = obs;
        }
      }
    }

    if (criticalObs) {
      // Swerve to the side with more space
      const spaceAbove = criticalObs.y - this.road.topEdgeY;
      const spaceBelow = this.road.bottomEdgeY - criticalObs.y;
      const detourY = spaceAbove > spaceBelow ? criticalObs.y - criticalObs.radius - 35 : criticalObs.y + criticalObs.radius + 35;

      waypoints.push({ x: (this.ego.x + criticalObs.x) / 2, y: this.ego.y });
      waypoints.push({ x: criticalObs.x, y: detourY });
      waypoints.push({ x: criticalObs.x + 100, y: targetY });
    } else {
      waypoints.push({ x: this.ego.x + 120, y: targetY });
      waypoints.push({ x: this.ego.x + 280, y: targetY });
    }

    // Cubic Bezier interpolation along waypoints
    const smoothPath = [];
    const p0 = waypoints[0];
    const p1 = waypoints[1] || p0;
    const p2 = waypoints[2] || p1;
    const p3 = waypoints[3] || { x: p2.x + 100, y: targetY };

    for (let t = 0; t <= 1.0; t += 0.05) {
      const cx = Math.pow(1 - t, 3) * p0.x + 3 * Math.pow(1 - t, 2) * t * p1.x + 3 * (1 - t) * Math.pow(t, 2) * p2.x + Math.pow(t, 3) * p3.x;
      const cy = Math.pow(1 - t, 3) * p0.y + 3 * Math.pow(1 - t, 2) * t * p1.y + 3 * (1 - t) * Math.pow(t, 2) * p2.y + Math.pow(t, 3) * p3.y;
      smoothPath.push({ x: cx, y: cy });
    }

    return smoothPath;
  }

  // ==========================================
  // PHYSICS & UPDATE STEP
  // ==========================================
  update(dt) {
    if (!this.isRunning) return;

    const tStart = performance.now();

    // 1. Update Obstacles Movement
    for (const obs of this.obstacles) {
      if (obs === this.draggedObstacle) continue;

      obs.x += obs.vx;
      obs.y += obs.vy;

      // Bounce within road boundaries
      if (obs.y - obs.radius < this.road.topEdgeY) {
        obs.y = this.road.topEdgeY + obs.radius;
        obs.vy *= -1;
      }
      if (obs.y + obs.radius > this.road.bottomEdgeY) {
        obs.y = this.road.bottomEdgeY - obs.radius;
        obs.vy *= -1;
      }

      // Recycle obstacle if it moves off canvas to the left
      if (obs.x < -60) {
        obs.x = this.width + 40;
        obs.y = this.road.topEdgeY + Math.random() * this.road.pavementWidth;
      }
    }

    // 2. Compute Path Planning according to selected algorithm
    if (this.algorithm === 'apf') {
      this.ego.plannedPath = this.computeAPFPath();
    } else if (this.algorithm === 'dwa') {
      this.ego.plannedPath = this.computeDWAPath();
    } else {
      this.ego.plannedPath = this.computeBezierPath();
    }

    // 3. Collision Risk & Emergency Stop Logic
    let closestDist = Infinity;
    let closestTTC = 9.9;

    for (const obs of this.obstacles) {
      const dx = obs.x - this.ego.x;
      const dy = obs.y - this.ego.y;
      const dist = Math.hypot(dx, dy);

      if (dist < closestDist) {
        closestDist = dist;
      }

      // Calculate Time to Collision if obstacle is ahead
      if (dx > 0 && Math.abs(dy) < 40) {
        const relSpeed = (this.ego.speed * 0.277) - (obs.vx * 2); // m/s
        if (relSpeed > 0) {
          const ttc = (dx / 12) / relSpeed;
          if (ttc < closestTTC) closestTTC = ttc;
        }
      }
    }

    this.ego.clearance = Math.max(0, closestDist - 30);
    this.ego.ttc = Math.max(0.1, closestTTC);

    // Collision Risk calculation
    if (this.ego.clearance < 25) {
      this.ego.collisionRisk = 95;
    } else if (this.ego.clearance < 60) {
      this.ego.collisionRisk = Math.round(100 - (this.ego.clearance - 25) * 2.5);
    } else {
      this.ego.collisionRisk = Math.max(0, Math.round(20 - (this.ego.clearance - 60) * 0.2));
    }

    // Emergency Braking Trigger
    if (this.ego.ttc < 1.2 || this.ego.clearance < 20) {
      this.ego.emergencyStop = true;
      this.telemetry.status = 'EMERGENCY BRAKE';
    } else if (this.ego.collisionRisk > 60) {
      this.telemetry.status = 'ACTIVE REPLAN';
      this.ego.emergencyStop = false;
    } else {
      this.telemetry.status = 'NOMINAL';
      this.ego.emergencyStop = false;
    }

    // 4. Vehicle Actuation (Follow Planned Path)
    if (this.ego.emergencyStop) {
      this.ego.speed = Math.max(0, this.ego.speed - 3.5 * this.friction);
    } else {
      // Smoothly approach target speed
      const targetV = this.ego.collisionRisk > 40 ? 22 : this.ego.targetSpeed;
      if (this.ego.speed < targetV) {
        this.ego.speed = Math.min(targetV, this.ego.speed + 0.5 * this.friction);
      } else if (this.ego.speed > targetV) {
        this.ego.speed = Math.max(targetV, this.ego.speed - 0.8 * this.friction);
      }
    }

    // Pure pursuit of lookahead point on path
    if (this.ego.plannedPath.length > 3) {
      const lookaheadIdx = Math.min(5, this.ego.plannedPath.length - 1);
      const lookPt = this.ego.plannedPath[lookaheadIdx];
      const targetAngle = Math.atan2(lookPt.y - this.ego.y, lookPt.x - this.ego.x);
      const steerDiff = targetAngle - this.ego.heading;

      this.ego.steeringAngle = Math.max(-this.ego.maxSteering, Math.min(this.ego.maxSteering, steerDiff));
      this.ego.heading += this.ego.steeringAngle * 0.15;
    }

    // Vehicle Translation
    const moveDist = (this.ego.speed * 0.04) * dt * 25;
    this.ego.y += Math.sin(this.ego.heading) * moveDist;
    this.road.textureOffset = (this.road.textureOffset + moveDist * 1.5) % 80;

    // Keep ego vehicle inside road bounds
    if (this.ego.y < this.road.topEdgeY + 20) this.ego.y = this.road.topEdgeY + 20;
    if (this.ego.y > this.road.bottomEdgeY - 20) this.ego.y = this.road.bottomEdgeY - 20;

    // LiDAR Sweep rotation
    this.ego.lidarSweepAngle = (this.ego.lidarSweepAngle + 0.12) % (Math.PI * 2);

    // Latency Telemetry update
    const tEnd = performance.now();
    this.telemetry.computeLatency = parseFloat((tEnd - tStart + 7.5 + Math.random() * 2.2).toFixed(1));
    this.telemetry.frameCounter++;
  }

  // ==========================================
  // RENDER STEP
  // ==========================================
  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Draw Road & Shoulders
    this.drawUnstructuredRoad();

    // 2. Draw Costmap / Potential Field if enabled
    if (this.showPotentialField) {
      this.drawPotentialFieldMesh();
    }

    // 3. Draw Candidate Trajectories (DWA)
    if (this.showTrajectories && this.algorithm === 'dwa') {
      this.drawDWAFan();
    }

    // 4. Draw Optimal Planned Path Ribbon
    this.drawPlannedPath();

    // 5. Draw Obstacles
    for (const obs of this.obstacles) {
      this.drawObstacle(obs);
    }

    // 6. Draw Ego-Vehicle
    this.drawEgoVehicle();

    // 7. Render Telemetry HUD Overlay
    this.renderHUD();
  }

  drawUnstructuredRoad() {
    const ctx = this.ctx;
    const topY = this.road.topEdgeY;
    const botY = this.road.bottomEdgeY;
    const roadH = botY - topY;

    // Earthen Dirt Shoulders (Rural Indian roadside)
    ctx.fillStyle = this.roadCondition === 'mud' ? '#3d2e1e' : '#1e1b18';
    ctx.fillRect(0, 0, this.width, this.height);

    // Asphalt Surface
    ctx.fillStyle = this.roadCondition === 'rain' ? '#0d131a' : '#141820';
    ctx.fillRect(0, topY, this.width, roadH);

    // Ragged Unpaved Dirt Edges (Irregular eroded shoulders)
    ctx.fillStyle = this.roadCondition === 'mud' ? '#5a432d' : '#2d2419';
    ctx.beginPath();
    ctx.moveTo(0, topY);
    for (let x = 0; x < this.width; x += 30) {
      const jitter = Math.sin((x + this.road.textureOffset) * 0.05) * 6;
      ctx.lineTo(x, topY + jitter + 8);
    }
    ctx.lineTo(this.width, topY);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, botY);
    for (let x = 0; x < this.width; x += 30) {
      const jitter = Math.cos((x + this.road.textureOffset) * 0.04) * 6;
      ctx.lineTo(x, botY - jitter - 8);
    }
    ctx.lineTo(this.width, botY);
    ctx.fill();

    // Faded / Broken Center Marking (Indian Highway style)
    ctx.strokeStyle = 'rgba(255, 200, 50, 0.25)';
    ctx.lineWidth = 3;
    ctx.setLineDash([25, 35]);
    ctx.lineDashOffset = -this.road.textureOffset;
    ctx.beginPath();
    ctx.moveTo(0, topY + roadH / 2);
    ctx.lineTo(this.width, topY + roadH / 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  drawPotentialFieldMesh() {
    const ctx = this.ctx;
    ctx.save();
    for (let x = 40; x < this.width; x += 40) {
      for (let y = this.road.topEdgeY + 15; y < this.road.bottomEdgeY; y += 30) {
        let maxRep = 0;
        for (const obs of this.obstacles) {
          const d = Math.hypot(x - obs.x, y - obs.y);
          if (d < 110) {
            maxRep = Math.max(maxRep, (110 - d) / 110);
          }
        }
        if (maxRep > 0.1) {
          ctx.beginPath();
          ctx.arc(x, y, maxRep * 12, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 42, 85, ${maxRep * 0.35})`;
          ctx.fill();
        }
      }
    }
    ctx.restore();
  }

  drawDWAFan() {
    const ctx = this.ctx;
    ctx.save();
    ctx.lineWidth = 1;

    for (const traj of this.ego.candidateTrajectories) {
      if (traj.path.length < 2) continue;
      ctx.beginPath();
      ctx.moveTo(traj.path[0].x, traj.path[0].y);
      for (let i = 1; i < traj.path.length; i++) {
        ctx.lineTo(traj.path[i].x, traj.path[i].y);
      }
      ctx.strokeStyle = traj.minObstacleDist < 30 ? 'rgba(255, 42, 85, 0.15)' : 'rgba(0, 240, 255, 0.12)';
      ctx.stroke();
    }
    ctx.restore();
  }

  drawPlannedPath() {
    if (this.ego.plannedPath.length < 2) return;
    const ctx = this.ctx;
    ctx.save();

    // Path ribbon shadow glow
    ctx.shadowBlur = 15;
    ctx.shadowColor = this.ego.emergencyStop ? '#ff2a55' : '#00f0ff';
    ctx.strokeStyle = this.ego.emergencyStop ? '#ff2a55' : '#00f0ff';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(this.ego.plannedPath[0].x, this.ego.plannedPath[0].y);
    for (let i = 1; i < this.ego.plannedPath.length; i++) {
      ctx.lineTo(this.ego.plannedPath[i].x, this.ego.plannedPath[i].y);
    }
    ctx.stroke();

    // Waypoint dots
    ctx.fillStyle = '#ffffff';
    for (let i = 2; i < this.ego.plannedPath.length; i += 3) {
      ctx.beginPath();
      ctx.arc(this.ego.plannedPath[i].x, this.ego.plannedPath[i].y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  drawObstacle(obs) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(obs.x, obs.y);

    // AI Bounding Box & Classification
    ctx.strokeStyle = obs.color;
    ctx.lineWidth = 1.5;
    ctx.fillStyle = 'rgba(10, 15, 25, 0.7)';

    // Bounding Box Rect
    const halfW = obs.length / 2;
    const halfH = obs.width / 2;
    ctx.strokeRect(-halfW, -halfH, obs.length, obs.width);
    ctx.fillRect(-halfW, -halfH, obs.length, obs.width);

    // Corner HUD brackets
    const cSize = 6;
    ctx.lineWidth = 2;
    ctx.beginPath();
    // Top-left
    ctx.moveTo(-halfW, -halfH + cSize); ctx.lineTo(-halfW, -halfH); ctx.lineTo(-halfW + cSize, -halfH);
    // Top-right
    ctx.moveTo(halfW - cSize, -halfH); ctx.lineTo(halfW, -halfH); ctx.lineTo(halfW, -halfH + cSize);
    // Bottom-left
    ctx.moveTo(-halfW, halfH - cSize); ctx.lineTo(-halfW, halfH); ctx.lineTo(-halfW + cSize, halfH);
    // Bottom-right
    ctx.moveTo(halfW - cSize, halfH); ctx.lineTo(halfW, halfH); ctx.lineTo(halfW, halfH - cSize);
    ctx.stroke();

    // Icon & Label
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(obs.icon, 0, 0);

    // Telemetry Chip over obstacle
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${obs.label}`, 0, -halfH - 8);

    ctx.restore();
  }

  drawEgoVehicle() {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(this.ego.x, this.ego.y);
    ctx.rotate(this.ego.heading);

    // 1. Headlights Projection Cone
    const grad = ctx.createRadialGradient(25, 0, 5, 120, 0, 140);
    grad.addColorStop(0, 'rgba(0, 240, 255, 0.45)');
    grad.addColorStop(0.6, 'rgba(0, 240, 255, 0.12)');
    grad.addColorStop(1, 'rgba(0, 240, 255, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(25, -10);
    ctx.lineTo(160, -45);
    ctx.lineTo(160, 45);
    ctx.lineTo(25, 10);
    ctx.closePath();
    ctx.fill();

    // 2. Dynamic Safety Envelope
    const envelopeColor = this.ego.emergencyStop ? 'rgba(255, 42, 85, 0.35)' : 'rgba(0, 240, 255, 0.2)';
    ctx.strokeStyle = envelopeColor;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.strokeRect(-35, -24, 78, 48);
    ctx.setLineDash([]);

    // 3. Vehicle Body
    ctx.fillStyle = '#0a101d';
    ctx.strokeStyle = this.ego.emergencyStop ? '#ff2a55' : '#00f0ff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(-this.ego.width / 2, -this.ego.height / 2, this.ego.width, this.ego.height, 6);
    ctx.fill();
    ctx.stroke();

    // Windshield & Roof Glass
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-6, -this.ego.height / 2 + 4, 18, this.ego.height - 8);

    // Front Headlights
    ctx.fillStyle = '#00f0ff';
    ctx.fillRect(this.ego.width / 2 - 4, -this.ego.height / 2 + 2, 4, 6);
    ctx.fillRect(this.ego.width / 2 - 4, this.ego.height / 2 - 8, 4, 6);

    // Rear Taillights
    ctx.fillStyle = this.ego.emergencyStop ? '#ff2a55' : '#ef4444';
    ctx.fillRect(-this.ego.width / 2, -this.ego.height / 2 + 2, 3, 6);
    ctx.fillRect(-this.ego.width / 2, this.ego.height / 2 - 8, 3, 6);

    // 4. LiDAR Sensor Dome & Rotating Beam
    ctx.fillStyle = '#00ff88';
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.fill();

    if (this.showLidarRays) {
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(this.ego.lidarSweepAngle) * 90, Math.sin(this.ego.lidarSweepAngle) * 90);
      ctx.stroke();
    }

    ctx.restore();
  }

  renderHUD() {
    // Sync telemetry to DOM elements if available
    const speedEl = document.getElementById('simTelemetrySpeed');
    const steerEl = document.getElementById('simTelemetrySteer');
    const latencyEl = document.getElementById('simTelemetryLatency');
    const riskEl = document.getElementById('simTelemetryRisk');
    const statusEl = document.getElementById('simTelemetryStatus');

    if (speedEl) speedEl.textContent = `${Math.round(this.ego.speed)} km/h`;
    if (steerEl) steerEl.textContent = `${(this.ego.steeringAngle * 57.2958).toFixed(1)}°`;
    if (latencyEl) latencyEl.textContent = `${this.telemetry.computeLatency} ms`;
    if (riskEl) {
      riskEl.textContent = `${this.ego.collisionRisk}%`;
      riskEl.style.color = this.ego.collisionRisk > 60 ? 'var(--danger-primary)' : 'var(--cyan-primary)';
    }
    if (statusEl) {
      statusEl.textContent = this.telemetry.status;
      statusEl.style.color = this.ego.emergencyStop ? 'var(--danger-primary)' : (this.telemetry.status === 'ACTIVE REPLAN' ? 'var(--amber-primary)' : 'var(--emerald-primary)');
    }
  }

  // ==========================================
  // MAIN ANIMATION LOOP
  // ==========================================
  loop(timestamp) {
    const dt = Math.min((timestamp - this.lastTimestamp) / 1000, 0.1);
    this.lastTimestamp = timestamp;

    this.update(dt);
    this.render();

    requestAnimationFrame(this.loop);
  }
}

// Global reference
window.AutonomousSimulator = AutonomousSimulator;
