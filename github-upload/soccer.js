const canvas = document.querySelector("#soccerGame");
const ctx = canvas.getContext("2d");

const timerEl = document.querySelector("#matchTimer");
const franceScoreEl = document.querySelector("#franceScore");
const spainScoreEl = document.querySelector("#spainScore");
const startScreen = document.querySelector("#startScreen");
const startBtn = document.querySelector("#startBtn");
const playAgainBtn = document.querySelector("#playAgainBtn");
const result = document.querySelector("#matchResult");
const resultTitle = document.querySelector("#resultTitle");
const resultDetail = document.querySelector("#resultDetail");
const recordBtn = document.querySelector("#recordBtn");
const startRecordBtn = document.querySelector("#startRecordBtn");
const recordStatus = document.querySelector("#recordStatus");
const startRecordStatus = document.querySelector("#startRecordStatus");
const franceStatus = document.querySelector("#franceStatus");
const spainStatus = document.querySelector("#spainStatus");

const MATCH_DURATION = 60;
const MATCH_CLOCK_MINUTES = 90;
const SHOT_CHANCE = 0.9;
const BALL_MIN_SPEED = 430;
const BALL_RESTART_SPEED = 560;
const PLAYER_SHOT_COOLDOWN = 0.42;
const FORWARD_TOUCH_SPEED = 390;
const KEEPER_REACTION_WINDOW = 1.25;
const KEEPER_SHOT_SAVE_CHANCE = 0.58;
const GOAL_HOLD_TIME = 1.55;

const field = {
  width: 1120,
  height: 700,
  margin: 54,
  goalDepth: 34,
  goalHeight: 226,
};

const state = {
  running: false,
  ended: false,
  timeLeft: MATCH_DURATION,
  lastTime: 0,
  franceScore: 0,
  spainScore: 0,
  goalFlash: 0,
  goalHold: 0,
  kickMessage: "触球后自动向对方球门射门",
};

let recorder = null;
let recordedChunks = [];
let pendingRecording = null;
let recordingVideoStream = null;
let recordingFormat = null;
const recordingCanvas = document.createElement("canvas");
recordingCanvas.width = field.width;
recordingCanvas.height = field.height;
const recordingCtx = recordingCanvas.getContext("2d");
let recordingFrameId = 0;

const teams = {
  france: {
    id: "france",
    name: "法国",
    mark: "FRA",
    color: "#245fd8",
    accent: "#f4f7ff",
    goalSide: "right",
    scoreKey: "franceScore",
  },
  spain: {
    id: "spain",
    name: "西班牙",
    mark: "ESP",
    color: "#d62e28",
    accent: "#f8cf45",
    goalSide: "left",
    scoreKey: "spainScore",
  },
};

const playerImages = {
  france: new Image(),
  spain: new Image(),
};
playerImages.france.src = "./assets/soccer-mbappe.png?v=20260712-demo21";
playerImages.spain.src = "./assets/soccer-yamal.png?v=20260712-demo21";

const trophyImage = new Image();
trophyImage.src = "./assets/visuals/world-cup-trophy.jpg";

const players = [
  makePlayer(teams.france, field.width * 0.28, field.height * 0.48, 238, -116),
  makePlayer(teams.spain, field.width * 0.72, field.height * 0.52, -218, 132),
];

const goalkeepers = [
  makeGoalkeeper(teams.france, "left"),
  makeGoalkeeper(teams.spain, "right"),
];

const ball = {
  x: field.width / 2,
  y: field.height / 2,
  vx: 320,
  vy: -150,
  radius: 15,
  shotBy: null,
  shotTarget: null,
  shotAge: 0,
  idleTime: 0,
  stuckTime: 0,
  lastX: field.width / 2,
  lastY: field.height / 2,
  trail: [],
};

function makePlayer(team, x, y, vx, vy) {
  return {
    team,
    homeX: x,
    homeY: y,
    x,
    y,
    vx,
    vy,
    radius: 32,
    mass: team.id === "france" ? 1.05 : 1.2,
    speed: 260,
    phase: Math.random() * Math.PI * 2,
    roamTargetX: x,
    roamTargetY: y,
    roamTimer: 0,
    spin: Math.random() * Math.PI * 2,
    cooldown: 0,
  };
}

function makeGoalkeeper(team, side) {
  const goal = getGoal(side);
  return {
    team,
    side,
    x: side === "left" ? field.margin + 28 : field.width - field.margin - 28,
    y: goal.y,
    vx: 0,
    vy: 0,
    radius: 27,
    speed: 370,
    cooldown: 0,
  };
}

function resetMatch() {
  state.running = false;
  state.ended = false;
  state.timeLeft = MATCH_DURATION;
  state.lastTime = 0;
  state.franceScore = 0;
  state.spainScore = 0;
  state.goalFlash = 0;
  state.goalHold = 0;
  state.kickMessage = "触球后自动向对方球门射门";
  resetPositions();
  result.hidden = true;
  startScreen.hidden = false;
  startBtn.textContent = "开始比赛";
  updateHud();
  draw();
}

function resetPositions() {
  players[0].x = field.width * 0.28;
  players[0].y = field.height * 0.48;
  players[0].homeX = field.width * 0.3;
  players[0].homeY = field.height * 0.48;
  players[0].vx = 238;
  players[0].vy = -116;
  players[0].cooldown = 0.5;
  setPlayerRoamTarget(players[0], true);

  players[1].x = field.width * 0.72;
  players[1].y = field.height * 0.52;
  players[1].homeX = field.width * 0.7;
  players[1].homeY = field.height * 0.52;
  players[1].vx = -218;
  players[1].vy = 132;
  players[1].cooldown = 0.5;
  setPlayerRoamTarget(players[1], true);

  ball.x = field.width / 2;
  ball.y = field.height / 2;
  ball.vx = Math.random() > 0.5 ? 330 : -330;
  ball.vy = Math.random() * 220 - 110;
  ball.shotBy = null;
  ball.shotTarget = null;
  ball.shotAge = 0;
  ball.idleTime = 0;
  ball.stuckTime = 0;
  ball.lastX = ball.x;
  ball.lastY = ball.y;
  ball.trail.length = 0;

  for (const keeper of goalkeepers) {
    const goal = getGoal(keeper.side);
    keeper.x = keeper.side === "left" ? field.margin + 28 : field.width - field.margin - 28;
    keeper.y = goal.y;
    keeper.vx = 0;
    keeper.vy = 0;
    keeper.cooldown = 0.4;
  }
}

function startMatch() {
  if (state.running) return;
  if (state.ended) resetMatch();
  startScreen.hidden = true;
  result.hidden = true;
  state.running = true;
  state.lastTime = performance.now();
  requestAnimationFrame(loop);
}

function loop(now) {
  if (!state.running) return;
  const dt = Math.min((now - state.lastTime) / 1000 || 0, 0.033);
  state.lastTime = now;
  update(dt);
  draw();
  if (state.running) requestAnimationFrame(loop);
}

function update(dt) {
  state.timeLeft = Math.max(0, state.timeLeft - dt);
  state.goalFlash = Math.max(0, state.goalFlash - dt);

  if (state.goalHold > 0) {
    state.goalHold = Math.max(0, state.goalHold - dt);
    if (state.goalHold === 0) {
      resetPositions();
    }
    updateHud();
    if (state.timeLeft <= 0 && !state.ended) {
      finishMatch();
    }
    return;
  }

  for (const player of players) {
    player.cooldown = Math.max(0, player.cooldown - dt);
    updatePlayer(player, dt);
  }
  for (const keeper of goalkeepers) {
    keeper.cooldown = Math.max(0, keeper.cooldown - dt);
    updateGoalkeeper(keeper, dt);
  }

  resolvePlayerCollision(players[0], players[1]);
  updateBall(dt);
  updateHud();

  if (state.timeLeft <= 0 && !state.ended) {
    finishMatch();
  }
}

function updatePlayer(player, dt) {
  player.roamTimer -= dt;
  if (player.roamTimer <= 0 || length(player.roamTargetX - player.x, player.roamTargetY - player.y) < 42) {
    setPlayerRoamTarget(player);
  }

  const ballDistance = length(ball.x - player.x, ball.y - player.y);
  const ballInTeamHalf = player.team.id === "france"
    ? ball.x < field.width * 0.6
    : ball.x > field.width * 0.4;
  const ballSpeed = length(ball.vx, ball.vy);
  const shouldChallenge = !ball.shotBy && ballInTeamHalf && (ballDistance < 250 || ballSpeed < 210);
  const challengeWeight = shouldChallenge ? clamp((300 - ballDistance) / 240, 0.18, 0.62) : 0;
  const roamPull = normalize(player.roamTargetX - player.x, player.roamTargetY - player.y);
  const ballPull = normalize(ball.x - player.x, ball.y - player.y);
  const target = normalize(
    ballPull.x * challengeWeight + roamPull.x * (1 - challengeWeight),
    ballPull.y * challengeWeight + roamPull.y * (1 - challengeWeight),
  );
  const cruiseSpeed = shouldChallenge ? player.speed : player.speed * 0.72;
  const desiredVx = target.x * cruiseSpeed;
  const desiredVy = target.y * cruiseSpeed;
  player.vx += (desiredVx - player.vx) * 0.42 * dt;
  player.vy += (desiredVy - player.vy) * 0.42 * dt;

  player.x += player.vx * dt;
  player.y += player.vy * dt;
  player.spin += length(player.vx, player.vy) * dt * 0.025;

  bounceCircleInField(player, 0.88);
}

function setPlayerRoamTarget(player, immediate = false) {
  const isFrance = player.team.id === "france";
  const xMin = isFrance ? field.margin + 86 : field.width * 0.52;
  const xMax = isFrance ? field.width * 0.48 : field.width - field.margin - 86;
  player.roamTargetX = xMin + Math.random() * (xMax - xMin);
  player.roamTargetY = field.margin + 88 + Math.random() * (field.height - field.margin * 2 - 176);
  player.roamTimer = immediate ? 1.2 + Math.random() * 1.2 : 2.4 + Math.random() * 2.2;
}

function updateGoalkeeper(keeper, dt) {
  const goal = getGoal(keeper.side);
  const xHome = keeper.side === "left" ? field.margin + 28 : field.width - field.margin - 28;
  const predictedY = predictGoalkeeperTargetY(keeper, xHome);
  const ballThreatensGoal = predictedY !== null || (keeper.side === "left"
    ? ball.x < field.width * 0.46 || ball.vx < -80
    : ball.x > field.width * 0.54 || ball.vx > 80);
  const idleY = goal.y + Math.sin((MATCH_DURATION - state.timeLeft) * 1.8 + (keeper.side === "left" ? 0 : Math.PI)) * 34;
  const targetY = ballThreatensGoal ? (predictedY ?? ball.y) : idleY;
  const clampedY = clamp(targetY, goal.top + keeper.radius, goal.bottom - keeper.radius);
  const desiredVy = clamp((clampedY - keeper.y) * 11, -keeper.speed, keeper.speed);
  keeper.vy += (desiredVy - keeper.vy) * 1.35 * dt;
  keeper.y += keeper.vy * dt;
  keeper.y = clamp(keeper.y, goal.top + keeper.radius, goal.bottom - keeper.radius);
  keeper.x += (xHome - keeper.x) * 8 * dt;
}

function predictGoalkeeperTargetY(keeper, xHome) {
  if (Math.abs(ball.vx) < 90) return null;
  const movingTowardKeeper = keeper.side === "left" ? ball.vx < 0 : ball.vx > 0;
  if (!movingTowardKeeper) return null;
  const timeToKeeper = (xHome - ball.x) / ball.vx;
  if (timeToKeeper < 0 || timeToKeeper > KEEPER_REACTION_WINDOW) return null;
  return reflectY(ball.y + ball.vy * timeToKeeper);
}

function reflectY(y) {
  const top = field.margin + ball.radius;
  const bottom = field.height - field.margin - ball.radius;
  const span = bottom - top;
  if (span <= 0) return y;
  let offset = (y - top) % (span * 2);
  if (offset < 0) offset += span * 2;
  return top + (offset > span ? span * 2 - offset : offset);
}

function updateBall(dt) {
  ball.shotAge += dt;
  ball.trail.push({ x: ball.x, y: ball.y, age: 0 });
  ball.trail.forEach((point) => {
    point.age += dt;
  });
  while (ball.trail.length > 14 || (ball.trail[0] && ball.trail[0].age > 0.42)) {
    ball.trail.shift();
  }

  if (ball.shotBy && ball.shotTarget) {
    const aim = normalize(ball.shotTarget.x - ball.x, ball.shotTarget.y - ball.y);
    const speed = length(ball.vx, ball.vy);
    ball.vx += (aim.x * speed - ball.vx) * 0.92 * dt;
    ball.vy += (aim.y * speed - ball.vy) * 0.92 * dt;
  }

  ball.x += ball.vx * dt;
  ball.y += ball.vy * dt;
  ball.vx *= ball.shotBy ? 0.9992 : 0.9998;
  ball.vy *= ball.shotBy ? 0.9992 : 0.9998;

  for (const player of players) {
    if (circleHit(player, ball, player.radius + ball.radius)) {
      if (player.cooldown <= 0) {
        shoot(player);
      } else {
        pushBallFromPlayer(player);
      }
    }
  }

  for (const keeper of goalkeepers) {
    const saveDistance = ball.shotBy ? keeper.radius + ball.radius - 10 : keeper.radius + ball.radius;
    if (circleHit(keeper, ball, saveDistance) && keeper.cooldown <= 0) {
      if (!ball.shotBy || Math.random() < KEEPER_SHOT_SAVE_CHANCE) {
        goalkeeperClearance(keeper);
      } else {
        goalkeeperMiss(keeper);
      }
      break;
    }
  }

  handleBallBoundaries();
  keepBallAlive(dt);
}

function keepBallAlive(dt) {
  const moved = length(ball.x - ball.lastX, ball.y - ball.lastY);
  ball.lastX = ball.x;
  ball.lastY = ball.y;
  ball.stuckTime = moved < 1.2 ? ball.stuckTime + dt : 0;

  const speed = length(ball.vx, ball.vy);
  if (speed >= BALL_MIN_SPEED && ball.stuckTime < 0.28) {
    ball.idleTime = 0;
    return;
  }

  ball.idleTime += dt;

  if (ball.stuckTime >= 0.28 || speed < 18) {
    restartBallFromCurrentPosition();
    ball.idleTime = 0;
    ball.stuckTime = 0;
    return;
  }

  const direction = normalize(ball.vx, ball.vy);
  const targetSpeed = ball.shotBy ? BALL_MIN_SPEED + 90 : BALL_MIN_SPEED;
  ball.vx = direction.x * targetSpeed;
  ball.vy = direction.y * targetSpeed;
}

function restartBallFromCurrentPosition() {
  const angle = Math.random() * Math.PI * 2;
  ball.vx = Math.cos(angle) * BALL_RESTART_SPEED;
  ball.vy = Math.sin(angle) * BALL_RESTART_SPEED;
  ball.shotBy = null;
  ball.shotTarget = null;
  ball.shotAge = 0;
  state.kickMessage = "足球重新弹起，继续争抢";
}

function shoot(player) {
  const team = player.team;
  const targetSide = team.goalSide;
  const goal = getGoal(targetSide);
  const success = Math.random() < SHOT_CHANCE;
  const missOffset = Math.random() > 0.5 ? -goal.height * 0.64 : goal.height * 0.64;
  const lane = Math.random() > 0.5 ? 1 : -1;
  const cornerOffset = lane * goal.height * (0.25 + Math.random() * 0.18);
  const targetY = success
    ? goal.y + cornerOffset
    : goal.y + missOffset;
  const targetX = targetSide === "right" ? field.width + field.goalDepth : -field.goalDepth;
  const aim = normalize(targetX - ball.x, targetY - ball.y);
  const shotSpeed = 870 + Math.random() * 120;

  ball.vx = aim.x * shotSpeed;
  ball.vy = aim.y * shotSpeed;
  ball.shotBy = team.id;
  ball.shotTarget = { x: targetX, y: targetY };
  ball.shotAge = 0;
  ball.idleTime = 0;
  ball.stuckTime = 0;
  ball.lastX = ball.x;
  ball.lastY = ball.y;
  player.cooldown = PLAYER_SHOT_COOLDOWN;
  ball.x += aim.x * 8;
  ball.y += aim.y * 8;

  state.kickMessage = `${team.name}射门${success ? "，球路很正" : "，角度稍偏"}`;
}

function pushBallFromPlayer(player) {
  const dir = normalize(ball.x - player.x, ball.y - player.y);
  const forwardX = player.team.goalSide === "right" ? 1 : -1;
  const forward = normalize(forwardX, (ball.y - player.y) * 0.012);
  const touch = normalize(dir.x * 0.32 + forward.x * 0.68, dir.y * 0.32 + forward.y * 0.68);
  ball.x = player.x + dir.x * (player.radius + ball.radius + 1);
  ball.y = player.y + dir.y * (player.radius + ball.radius + 1);
  ball.vx = touch.x * FORWARD_TOUCH_SPEED + player.vx * 0.28;
  ball.vy = touch.y * FORWARD_TOUCH_SPEED + player.vy * 0.28;
  ball.idleTime = 0;
  ball.stuckTime = 0;
  ball.lastX = ball.x;
  ball.lastY = ball.y;
}

function goalkeeperClearance(keeper) {
  const target = {
    x: field.width / 2 + (Math.random() - 0.5) * 160,
    y: field.height / 2 + (Math.random() - 0.5) * 130,
  };
  const aim = normalize(target.x - ball.x, target.y - ball.y);
  ball.x = keeper.x + aim.x * (keeper.radius + ball.radius + 3);
  ball.y = keeper.y + aim.y * (keeper.radius + ball.radius + 3);
  ball.vx = aim.x * (430 + Math.random() * 80);
  ball.vy = aim.y * (430 + Math.random() * 80);
  ball.shotBy = null;
  ball.shotTarget = null;
  ball.shotAge = 0;
  ball.idleTime = 0;
  ball.stuckTime = 0;
  ball.lastX = ball.x;
  ball.lastY = ball.y;
  keeper.cooldown = 0.75;
  state.kickMessage = `${keeper.team.name}门将扑救，解围到中圈`;
}

function goalkeeperMiss(keeper) {
  const direction = normalize(ball.vx, ball.vy);
  ball.x += direction.x * 18;
  ball.y += direction.y * 18;
  ball.vx *= 1.06;
  ball.vy *= 1.06;
  ball.idleTime = 0;
  ball.stuckTime = 0;
  ball.lastX = ball.x;
  ball.lastY = ball.y;
  keeper.cooldown = 0.55;
  state.kickMessage = `${keeper.team.name}门将扑救脱手`;
}

function handleBallBoundaries() {
  const leftGoal = getGoal("left");
  const rightGoal = getGoal("right");

  if (ball.x - ball.radius <= field.margin) {
    if (ball.y > leftGoal.top && ball.y < leftGoal.bottom) {
      scoreGoal("spain");
      return;
    }
    ball.x = field.margin + ball.radius;
    ball.vx = Math.max(Math.abs(ball.vx) * 0.86, BALL_MIN_SPEED);
    clearShotIfWallHit();
  }

  if (ball.x + ball.radius >= field.width - field.margin) {
    if (ball.y > rightGoal.top && ball.y < rightGoal.bottom) {
      scoreGoal("france");
      return;
    }
    ball.x = field.width - field.margin - ball.radius;
    ball.vx = -Math.max(Math.abs(ball.vx) * 0.86, BALL_MIN_SPEED);
    clearShotIfWallHit();
  }

  if (ball.y - ball.radius <= field.margin) {
    ball.y = field.margin + ball.radius;
    ball.vy = Math.max(Math.abs(ball.vy) * 0.86, BALL_MIN_SPEED * 0.72);
    clearShotIfWallHit();
  }

  if (ball.y + ball.radius >= field.height - field.margin) {
    ball.y = field.height - field.margin - ball.radius;
    ball.vy = -Math.max(Math.abs(ball.vy) * 0.86, BALL_MIN_SPEED * 0.72);
    clearShotIfWallHit();
  }
}

function scoreGoal(teamId) {
  const team = teams[teamId];
  state[team.scoreKey] += 1;
  state.goalFlash = 1.15;
  state.goalHold = GOAL_HOLD_TIME;
  state.kickMessage = `${team.name}进球！`;
  settleBallInGoal(team.goalSide);
  updateHud();
}

function settleBallInGoal(side) {
  const goal = getGoal(side);
  ball.x = side === "left"
    ? field.margin - field.goalDepth * 0.58
    : field.width - field.margin + field.goalDepth * 0.58;
  ball.y = clamp(ball.y, goal.top + ball.radius + 8, goal.bottom - ball.radius - 8);
  ball.vx = 0;
  ball.vy = 0;
  ball.shotBy = null;
  ball.shotTarget = null;
  ball.shotAge = 0;
  ball.idleTime = 0;
  ball.stuckTime = 0;
  ball.lastX = ball.x;
  ball.lastY = ball.y;
  ball.trail.length = 0;
}

function clearShotIfWallHit() {
  if (ball.shotBy && ball.shotAge > 0.12) {
    state.kickMessage = "射门偏出，足球重新进入争抢";
    ball.shotBy = null;
    ball.shotTarget = null;
  }
}

function finishMatch() {
  state.running = false;
  state.ended = true;
  const france = state.franceScore;
  const spain = state.spainScore;
  let title = "平局";
  if (france > spain) title = "法国获胜";
  if (spain > france) title = "西班牙获胜";
  resultTitle.textContent = title;
  resultDetail.textContent = `法国 ${france} - ${spain} 西班牙`;
  result.hidden = false;
}

function resolvePlayerCollision(a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = length(dx, dy) || 1;
  const minDist = a.radius + b.radius;
  if (dist >= minDist) return;

  const nx = dx / dist;
  const ny = dy / dist;
  const overlap = (minDist - dist) / 2;
  a.x -= nx * overlap;
  a.y -= ny * overlap;
  b.x += nx * overlap;
  b.y += ny * overlap;

  const relativeVelocity = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
  if (relativeVelocity > 0) return;
  const impulse = (-(1.08) * relativeVelocity) / (1 / a.mass + 1 / b.mass);
  a.vx -= (impulse / a.mass) * nx;
  a.vy -= (impulse / a.mass) * ny;
  b.vx += (impulse / b.mass) * nx;
  b.vy += (impulse / b.mass) * ny;
}

function bounceCircleInField(body, damping) {
  const left = field.margin + body.radius;
  const right = field.width - field.margin - body.radius;
  const top = field.margin + body.radius;
  const bottom = field.height - field.margin - body.radius;

  if (body.x < left) {
    body.x = left;
    body.vx = Math.abs(body.vx) * damping;
  } else if (body.x > right) {
    body.x = right;
    body.vx = -Math.abs(body.vx) * damping;
  }

  if (body.y < top) {
    body.y = top;
    body.vy = Math.abs(body.vy) * damping;
  } else if (body.y > bottom) {
    body.y = bottom;
    body.vy = -Math.abs(body.vy) * damping;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPitch();
  drawBallTrail();
  drawGoals();
  drawGoalkeeper(goalkeepers[0]);
  drawGoalkeeper(goalkeepers[1]);
  drawPlayer(players[0]);
  drawPlayer(players[1]);
  drawBall();

  if (state.goalFlash > 0) {
    ctx.save();
    ctx.globalAlpha = state.goalFlash * 0.22;
    ctx.fillStyle = "#fff4b2";
    ctx.fillRect(0, 0, field.width, field.height);
    ctx.restore();
  }
}

function drawRecordingFrame() {
  if (!recordingCtx) return;
  recordingCtx.clearRect(0, 0, recordingCanvas.width, recordingCanvas.height);
  recordingCtx.drawImage(canvas, 0, 0, recordingCanvas.width, recordingCanvas.height);
  drawRecordingHud(recordingCtx);
  if (!startScreen.hidden) drawRecordingStartScreen(recordingCtx);
  if (!result.hidden) drawRecordingResultScreen(recordingCtx);
}

function drawRecordingHud(targetCtx) {
  targetCtx.save();
  targetCtx.fillStyle = "rgba(12, 16, 14, 0.72)";
  targetCtx.strokeStyle = "rgba(240, 196, 92, 0.28)";
  targetCtx.lineWidth = 1;
  roundedRect(targetCtx, 418, 16, 284, 54, 8);
  targetCtx.fill();
  targetCtx.stroke();

  targetCtx.fillStyle = "rgba(245, 248, 238, 0.72)";
  targetCtx.font = "700 18px system-ui, sans-serif";
  targetCtx.textAlign = "left";
  targetCtx.textBaseline = "middle";
  targetCtx.fillText("MATCH", 38, 42);
  targetCtx.fillStyle = "#f7f5c1";
  targetCtx.font = "900 34px system-ui, sans-serif";
  targetCtx.fillText(timerEl.textContent || "0.0'", 38, 78);

  targetCtx.fillStyle = "rgba(246, 248, 238, 0.78)";
  targetCtx.font = "800 18px system-ui, sans-serif";
  targetCtx.textAlign = "center";
  targetCtx.fillText("法国", 454, 43);
  targetCtx.fillText("西班牙", 666, 43);
  targetCtx.fillStyle = "#f0c45c";
  targetCtx.font = "950 24px system-ui, sans-serif";
  targetCtx.fillText(`${state.franceScore} : ${state.spainScore}`, 560, 43);
  targetCtx.restore();
}

function drawRecordingStartScreen(targetCtx) {
  targetCtx.save();
  targetCtx.fillStyle = "rgba(8, 12, 10, 0.88)";
  targetCtx.fillRect(0, 0, field.width, field.height);
  const glow = targetCtx.createRadialGradient(560, 330, 24, 560, 330, 270);
  glow.addColorStop(0, "rgba(240, 196, 92, 0.24)");
  glow.addColorStop(1, "rgba(240, 196, 92, 0)");
  targetCtx.fillStyle = glow;
  targetCtx.fillRect(0, 0, field.width, field.height);

  if (imageReady(trophyImage)) {
    targetCtx.save();
    targetCtx.globalAlpha = 0.24;
    targetCtx.globalCompositeOperation = "screen";
    targetCtx.drawImage(trophyImage, 440, 92, 240, 388);
    targetCtx.restore();
  }

  drawRecordingStartCard(targetCtx, teams.france, playerImages.france, 92, 126, 330, 440);
  drawRecordingStartCard(targetCtx, teams.spain, playerImages.spain, 698, 126, 330, 440);

  targetCtx.textAlign = "center";
  targetCtx.textBaseline = "middle";
  targetCtx.fillStyle = "#f0c45c";
  targetCtx.shadowColor = "rgba(255, 245, 182, 0.72)";
  targetCtx.shadowBlur = 18;
  targetCtx.font = "950 86px system-ui, sans-serif";
  targetCtx.fillText("VS", 560, 270);
  targetCtx.shadowBlur = 0;
  drawRecordingButton(targetCtx, "开始比赛", 474, 336, 172, 56);
  targetCtx.fillStyle = "rgba(246, 248, 238, 0.7)";
  targetCtx.font = "700 18px system-ui, sans-serif";
  targetCtx.fillText(recorder?.state === "recording" ? "录制中" : "未录制", 560, 424);
  targetCtx.restore();
}

function drawRecordingStartCard(targetCtx, team, image, x, y, width, height) {
  targetCtx.save();
  roundedRect(targetCtx, x, y, width, height, 10);
  targetCtx.fillStyle = "rgba(242, 245, 239, 0.06)";
  targetCtx.fill();
  targetCtx.strokeStyle = "rgba(242, 245, 239, 0.18)";
  targetCtx.lineWidth = 2;
  targetCtx.stroke();
  targetCtx.clip();

  const photoHeight = height * 0.58;
  targetCtx.fillStyle = "rgba(7, 10, 9, 0.7)";
  targetCtx.fillRect(x, y, width, photoHeight);
  if (imageReady(image)) {
    const sourceSize = Math.min(image.naturalWidth, image.naturalHeight) * (team.id === "france" ? 0.82 : 0.88);
    const sx = image.naturalWidth * 0.5 - sourceSize * 0.5;
    const sy = image.naturalHeight * (team.id === "france" ? 0.02 : 0.01);
    targetCtx.drawImage(image, sx, sy, sourceSize, sourceSize, x, y, width, photoHeight);
  }
  const fade = targetCtx.createLinearGradient(0, y + photoHeight * 0.4, 0, y + photoHeight);
  fade.addColorStop(0, "rgba(0,0,0,0)");
  fade.addColorStop(1, "rgba(0,0,0,0.42)");
  targetCtx.fillStyle = fade;
  targetCtx.fillRect(x, y, width, photoHeight);

  if (team.id === "france") {
    targetCtx.fillStyle = "#1d4fbf";
    targetCtx.fillRect(x, y + photoHeight, width / 3, height - photoHeight);
    targetCtx.fillStyle = "#f7f7f4";
    targetCtx.fillRect(x + width / 3, y + photoHeight, width / 3, height - photoHeight);
    targetCtx.fillStyle = "#e1353f";
    targetCtx.fillRect(x + width * 2 / 3, y + photoHeight, width / 3, height - photoHeight);
  } else {
    targetCtx.fillStyle = "#c91f2f";
    targetCtx.fillRect(x, y + photoHeight, width, (height - photoHeight) * 0.25);
    targetCtx.fillStyle = "#f6c644";
    targetCtx.fillRect(x, y + photoHeight + (height - photoHeight) * 0.25, width, (height - photoHeight) * 0.5);
    targetCtx.fillStyle = "#c91f2f";
    targetCtx.fillRect(x, y + photoHeight + (height - photoHeight) * 0.75, width, (height - photoHeight) * 0.25);
  }

  targetCtx.beginPath();
  targetCtx.arc(x + width * 0.5, y + photoHeight + (height - photoHeight) * 0.42, 62, 0, Math.PI * 2);
  targetCtx.fillStyle = "rgba(8, 12, 10, 0.36)";
  targetCtx.fill();
  targetCtx.strokeStyle = "rgba(255,255,255,0.74)";
  targetCtx.lineWidth = 6;
  targetCtx.stroke();
  targetCtx.fillStyle = team.id === "france" ? "#f7f9ff" : "#fff4c4";
  targetCtx.font = "950 40px system-ui, sans-serif";
  targetCtx.textAlign = "center";
  targetCtx.textBaseline = "middle";
  targetCtx.fillText(team.mark, x + width * 0.5, y + photoHeight + (height - photoHeight) * 0.42);

  targetCtx.fillStyle = "#ffffff";
  targetCtx.font = "950 50px system-ui, sans-serif";
  targetCtx.textAlign = "left";
  targetCtx.textBaseline = "alphabetic";
  targetCtx.shadowColor = "rgba(0,0,0,0.58)";
  targetCtx.shadowBlur = 14;
  targetCtx.fillText(team.name, x + 22, y + height - 28);
  targetCtx.restore();
}

function drawRecordingButton(targetCtx, label, x, y, width, height) {
  targetCtx.save();
  roundedRect(targetCtx, x, y, width, height, 9);
  targetCtx.fillStyle = "rgba(58, 48, 32, 0.94)";
  targetCtx.fill();
  targetCtx.strokeStyle = "rgba(240, 196, 92, 0.56)";
  targetCtx.lineWidth = 2;
  targetCtx.stroke();
  targetCtx.fillStyle = "#fff7d6";
  targetCtx.font = "800 22px system-ui, sans-serif";
  targetCtx.textAlign = "center";
  targetCtx.textBaseline = "middle";
  targetCtx.fillText(label, x + width / 2, y + height / 2);
  targetCtx.restore();
}

function drawRecordingResultScreen(targetCtx) {
  targetCtx.save();
  targetCtx.fillStyle = "rgba(12, 14, 14, 0.78)";
  targetCtx.fillRect(0, 0, field.width, field.height);
  const glow = targetCtx.createRadialGradient(560, 318, 32, 560, 318, 260);
  glow.addColorStop(0, "rgba(240, 196, 92, 0.2)");
  glow.addColorStop(1, "rgba(240, 196, 92, 0)");
  targetCtx.fillStyle = glow;
  targetCtx.fillRect(0, 0, field.width, field.height);
  targetCtx.textAlign = "center";
  targetCtx.textBaseline = "middle";
  targetCtx.fillStyle = "#f0c45c";
  targetCtx.font = "900 24px system-ui, sans-serif";
  targetCtx.fillText("FULL TIME", 560, 246);
  targetCtx.fillStyle = "#ffffff";
  targetCtx.font = "950 62px system-ui, sans-serif";
  targetCtx.fillText(resultTitle.textContent || "平局", 560, 322);
  targetCtx.fillStyle = "rgba(246, 248, 238, 0.78)";
  targetCtx.font = "800 26px system-ui, sans-serif";
  targetCtx.fillText(resultDetail.textContent || `法国 ${state.franceScore} - ${state.spainScore} 西班牙`, 560, 382);
  drawRecordingButton(targetCtx, "再来一局", 484, 430, 152, 52);
  targetCtx.restore();
}

function roundedRect(targetCtx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  targetCtx.beginPath();
  targetCtx.moveTo(x + r, y);
  targetCtx.lineTo(x + width - r, y);
  targetCtx.quadraticCurveTo(x + width, y, x + width, y + r);
  targetCtx.lineTo(x + width, y + height - r);
  targetCtx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  targetCtx.lineTo(x + r, y + height);
  targetCtx.quadraticCurveTo(x, y + height, x, y + height - r);
  targetCtx.lineTo(x, y + r);
  targetCtx.quadraticCurveTo(x, y, x + r, y);
  targetCtx.closePath();
}

function drawPitch() {
  const left = field.margin;
  const top = field.margin;
  const width = field.width - field.margin * 2;
  const height = field.height - field.margin * 2;

  ctx.fillStyle = "#1d6a35";
  ctx.fillRect(0, 0, field.width, field.height);

  for (let i = 0; i < 12; i += 1) {
    ctx.fillStyle = i % 2 === 0 ? "rgba(71, 169, 82, 0.34)" : "rgba(19, 103, 45, 0.34)";
    ctx.fillRect(left + (width / 12) * i, top, width / 12, height);
  }

  ctx.save();
  ctx.strokeStyle = "rgba(240, 250, 235, 0.86)";
  ctx.lineWidth = 4;
  ctx.strokeRect(left, top, width, height);
  ctx.beginPath();
  ctx.moveTo(field.width / 2, top);
  ctx.lineTo(field.width / 2, top + height);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(field.width / 2, field.height / 2, 78, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(field.width / 2, field.height / 2, 4, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(240, 250, 235, 0.9)";
  ctx.fill();

  drawPenaltyBox("left");
  drawPenaltyBox("right");
  ctx.restore();
}

function drawPenaltyBox(side) {
  const goal = getGoal(side);
  const boxWidth = 126;
  const smallWidth = 54;
  const direction = side === "left" ? 1 : -1;
  const goalLineX = side === "left" ? field.margin : field.width - field.margin;
  ctx.strokeRect(
    goalLineX,
    field.height / 2 - 126,
    boxWidth * direction,
    252,
  );
  ctx.strokeRect(
    goalLineX,
    field.height / 2 - 66,
    smallWidth * direction,
    132,
  );
  ctx.beginPath();
  ctx.arc(goalLineX + direction * 88, field.height / 2, 3.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(goalLineX, goal.top);
  ctx.lineTo(goalLineX, goal.bottom);
  ctx.stroke();
}

function drawGoals() {
  for (const side of ["left", "right"]) {
    const goal = getGoal(side);
    const isLeft = side === "left";
    const x = isLeft ? field.margin - field.goalDepth : field.width - field.margin;
    ctx.save();
    ctx.fillStyle = "rgba(230, 238, 228, 0.1)";
    ctx.strokeStyle = "rgba(250, 255, 247, 0.82)";
    ctx.lineWidth = 4;
    ctx.fillRect(x, goal.top, field.goalDepth, goal.height);
    ctx.strokeRect(x, goal.top, field.goalDepth, goal.height);
    ctx.strokeStyle = "rgba(250, 255, 247, 0.22)";
    ctx.lineWidth = 1;
    for (let i = 1; i < 5; i += 1) {
      const gx = x + (field.goalDepth / 5) * i;
      ctx.beginPath();
      ctx.moveTo(gx, goal.top);
      ctx.lineTo(gx, goal.bottom);
      ctx.stroke();
    }
    for (let i = 1; i < 6; i += 1) {
      const gy = goal.top + (goal.height / 6) * i;
      ctx.beginPath();
      ctx.moveTo(x, gy);
      ctx.lineTo(x + field.goalDepth, gy);
      ctx.stroke();
    }
    ctx.restore();
  }
}

function drawPlayer(player) {
  ctx.save();
  ctx.translate(player.x, player.y);

  const gradient = ctx.createRadialGradient(-10, -13, 5, 0, 0, player.radius);
  gradient.addColorStop(0, "#ffffff");
  gradient.addColorStop(0.32, player.team.accent);
  gradient.addColorStop(1, player.team.color);
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(0, 0, player.radius, 0, Math.PI * 2);
  ctx.fill();

  const image = playerImages[player.team.id];
  if (imageReady(image)) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(0, 0, player.radius - 3, 0, Math.PI * 2);
    ctx.clip();
    drawPlayerPortrait(image, player.team.id);
    ctx.restore();
  } else {
    ctx.save();
    ctx.rotate(player.spin);
    ctx.strokeStyle = "rgba(255,255,255,0.7)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, 0, player.radius - 7, Math.PI * 0.16, Math.PI * 1.1);
    ctx.stroke();
    ctx.rotate(-player.spin);
    ctx.fillStyle = player.team.id === "france" ? "#f4f8ff" : "#3b1607";
    ctx.font = "900 16px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(player.team.mark, 0, 1);
    ctx.restore();
  }

  ctx.strokeStyle = player.team.id === "france" ? "rgba(240, 248, 255, 0.88)" : "rgba(255, 224, 96, 0.88)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, player.radius - 1.5, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawPlayerPortrait(image, teamId) {
  const radius = 29;
  const scale = teamId === "france" ? 0.62 : 0.66;
  const sourceSize = Math.min(image.naturalWidth, image.naturalHeight) * scale;
  const sx = teamId === "france"
    ? image.naturalWidth * 0.5 - sourceSize * 0.5
    : image.naturalWidth * 0.5 - sourceSize * 0.5;
  const sy = teamId === "france"
    ? image.naturalHeight * 0.08
    : image.naturalHeight * 0.07;
  ctx.drawImage(image, sx, sy, sourceSize, sourceSize, -radius, -radius, radius * 2, radius * 2);
  const shine = ctx.createRadialGradient(-10, -12, 2, 0, 0, radius);
  shine.addColorStop(0, "rgba(255, 255, 255, 0.32)");
  shine.addColorStop(0.45, "rgba(255, 255, 255, 0.04)");
  shine.addColorStop(1, "rgba(0, 0, 0, 0.18)");
  ctx.fillStyle = shine;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();
}

function drawGoalkeeper(keeper) {
  ctx.save();
  ctx.translate(keeper.x, keeper.y);
  const gradient = ctx.createRadialGradient(-8, -10, 4, 0, 0, keeper.radius);
  gradient.addColorStop(0, "#ffffff");
  gradient.addColorStop(0.28, keeper.team.id === "france" ? "#a7c5ff" : "#ffe07b");
  gradient.addColorStop(1, keeper.team.id === "france" ? "#123d91" : "#8e1714");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(0, 0, keeper.radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(255, 255, 255, 0.72)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-keeper.radius * 0.62, -keeper.radius * 0.44);
  ctx.lineTo(keeper.radius * 0.62, -keeper.radius * 0.44);
  ctx.moveTo(-keeper.radius * 0.62, keeper.radius * 0.44);
  ctx.lineTo(keeper.radius * 0.62, keeper.radius * 0.44);
  ctx.stroke();

  ctx.fillStyle = keeper.team.id === "france" ? "#f6f8ff" : "#331407";
  ctx.font = "900 12px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("GK", 0, 1);
  ctx.restore();
}

function drawBallTrail() {
  if (!ball.shotBy) return;
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  for (const point of ball.trail) {
    const progress = point.age / 0.42;
    const alpha = Math.max(0, 1 - progress) * 0.24;
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.beginPath();
    ctx.arc(point.x, point.y, ball.radius * (1.3 - progress * 0.4), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawBall() {
  ctx.save();
  ctx.translate(ball.x, ball.y);
  const angle = performance.now() * 0.008;
  ctx.rotate(angle);

  const gradient = ctx.createRadialGradient(-5, -6, 3, 0, 0, ball.radius);
  gradient.addColorStop(0, "#ffffff");
  gradient.addColorStop(1, "#d8ded9");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(0, 0, ball.radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#171917";
  for (let i = 0; i < 5; i += 1) {
    const a = i * (Math.PI * 2 / 5);
    ctx.beginPath();
    ctx.arc(Math.cos(a) * 8, Math.sin(a) * 8, 3.2, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.strokeStyle = "rgba(15, 17, 15, 0.72)";
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.arc(0, 0, 7, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function getGoal(side) {
  const height = field.goalHeight;
  const y = field.height / 2;
  return {
    side,
    y,
    height,
    top: y - height / 2,
    bottom: y + height / 2,
  };
}

function circleHit(a, b, distance) {
  return length(a.x - b.x, a.y - b.y) <= distance;
}

function imageReady(image) {
  return image?.complete && image.naturalWidth > 0;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function normalize(x, y) {
  const len = length(x, y) || 1;
  return { x: x / len, y: y / len };
}

function length(x, y) {
  return Math.hypot(x, y);
}

function updateHud() {
  const elapsedRatio = Math.min(1, (MATCH_DURATION - state.timeLeft) / MATCH_DURATION);
  timerEl.textContent = `${(elapsedRatio * MATCH_CLOCK_MINUTES).toFixed(1)}'`;
  franceScoreEl.textContent = state.franceScore;
  spainScoreEl.textContent = state.spainScore;
  franceStatus.textContent = `进球 ${state.franceScore}`;
  spainStatus.textContent = `进球 ${state.spainScore}`;
}

function getSupportedRecordingFormat() {
  if (!window.MediaRecorder) return { mimeType: "", extension: "webm", label: "WebM" };
  const formats = [
    { mimeType: "video/webm;codecs=vp9,opus", extension: "webm", label: "WebM" },
    { mimeType: "video/webm;codecs=vp8,opus", extension: "webm", label: "WebM" },
    { mimeType: "video/webm", extension: "webm", label: "WebM" },
  ];
  return formats.find((format) => MediaRecorder.isTypeSupported(format.mimeType)) || {
    mimeType: "",
    extension: "webm",
    label: "WebM",
  };
}

function formatRecordingSize(bytes) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function setRecordingUi(status, mode = "idle") {
  [recordStatus, startRecordStatus].forEach((element) => {
    if (element) element.textContent = status;
  });
  [recordBtn, startRecordBtn].forEach((button) => {
    if (!button) return;
    button.textContent = mode === "recording" ? "停止录制" : mode === "ready" ? "保存视频" : "录制";
    button.classList.toggle("recording", mode === "recording");
  });
}

function startRecording() {
  if (recorder?.state === "recording") return;
  if (!window.MediaRecorder || typeof recordingCanvas.captureStream !== "function") {
    setRecordingUi("不支持");
    return;
  }

  const frameRate = 24;
  drawRecordingFrame();
  const stream = recordingCanvas.captureStream(frameRate);
  recordingFormat = getSupportedRecordingFormat();
  recordingVideoStream = stream;
  pendingRecording = null;
  recordedChunks = [];

  try {
    const options = { videoBitsPerSecond: 6000000 };
    if (recordingFormat.mimeType) options.mimeType = recordingFormat.mimeType;
    recorder = new MediaRecorder(stream, options);
  } catch (error) {
    console.error("Unable to create soccer recording", error);
    stream.getTracks().forEach((track) => track.stop());
    recordingVideoStream = null;
    setRecordingUi("录制不可用");
    return;
  }

  recorder.ondataavailable = (event) => {
    if (event.data?.size) recordedChunks.push(event.data);
  };
  recorder.onerror = (event) => {
    console.error("Soccer recording failed", event.error);
    setRecordingUi("录制失败");
  };
  recorder.onstop = () => {
    stopRecordingFrameLoop();
    recordingVideoStream?.getTracks().forEach((track) => track.stop());
    recordingVideoStream = null;
    const blob = new Blob(recordedChunks, { type: recordingFormat.mimeType || "video/webm" });
    const fileName = `soccer-demo-${Date.now()}.${recordingFormat.extension}`;
    if (!blob.size) {
      recorder = null;
      setRecordingUi("录制失败：未生成数据");
      return;
    }
    pendingRecording = { blob, fileName };
    recorder = null;
    setRecordingUi(`已录制 ${formatRecordingSize(blob.size)}`, "ready");
  };

  try {
    recorder.start(250);
    startRecordingFrameLoop();
    setRecordingUi("录制中", "recording");
  } catch (error) {
    console.error("Unable to start soccer recording", error);
    stream.getTracks().forEach((track) => track.stop());
    recordingVideoStream = null;
    recorder = null;
    setRecordingUi("录制启动失败");
  }
}

function startRecordingFrameLoop() {
  stopRecordingFrameLoop();
  const tick = () => {
    drawRecordingFrame();
    if (recorder?.state === "recording") {
      recordingFrameId = requestAnimationFrame(tick);
    }
  };
  recordingFrameId = requestAnimationFrame(tick);
}

function stopRecordingFrameLoop() {
  if (!recordingFrameId) return;
  cancelAnimationFrame(recordingFrameId);
  recordingFrameId = 0;
}

function stopRecording() {
  if (recorder?.state !== "recording") return;
  setRecordingUi("视频处理中");
  try {
    recorder.requestData();
    recorder.stop();
  } catch (error) {
    console.error("Unable to stop soccer recording", error);
    setRecordingUi("录制停止失败");
  }
}

async function savePendingRecording() {
  if (!pendingRecording) return;
  setRecordingUi("保存中");
  try {
    const response = await fetch("/api/recordings", {
      method: "POST",
      headers: {
        "Content-Type": pendingRecording.blob.type || "video/webm",
        "X-Recording-Name": pendingRecording.fileName,
      },
      body: pendingRecording.blob,
    });
    if (!response.ok) throw new Error(`Save failed with status ${response.status}`);
    const saved = await response.json();
    pendingRecording = null;
    setRecordingUi(`已保存 ${saved.format || "视频"} ${formatRecordingSize(saved.size || 0)}`);
  } catch (error) {
    console.error("Failed to save soccer recording", error);
    setRecordingUi("保存服务未连接", "ready");
  }
}

async function toggleRecording() {
  if (recorder?.state === "recording") {
    stopRecording();
  } else if (pendingRecording) {
    await savePendingRecording();
  } else {
    startRecording();
  }
}

startBtn.addEventListener("click", startMatch);
playAgainBtn.addEventListener("click", resetMatch);
recordBtn?.addEventListener("click", toggleRecording);
startRecordBtn?.addEventListener("click", toggleRecording);

resetMatch();
