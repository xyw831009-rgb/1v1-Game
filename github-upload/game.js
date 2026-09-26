const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");

const ui = {
  redHp: document.querySelector("#redHp"),
  blueHp: document.querySelector("#blueHp"),
  redHpText: document.querySelector("#redHpText"),
  blueHpText: document.querySelector("#blueHpText"),
  redSkill: document.querySelector("#redSkill"),
  redAllyHp: document.querySelector("#redAllyHp"),
  redAllyHpText: document.querySelector("#redAllyHpText"),
  redAllySkill: document.querySelector("#redAllySkill"),
  redAllyName: document.querySelector("#redAllyName"),
  redAllyAvatar: document.querySelector("#redAllyAvatar"),
  redAllyCopy: document.querySelector("#redAllyCopy"),
  redAllyPanel: document.querySelector("#redAllyPanel"),
  blueSkill: document.querySelector("#blueSkill"),
  redName: document.querySelector("#redName"),
  blueName: document.querySelector("#blueName"),
  redAvatar: document.querySelector("#redAvatar"),
  blueAvatar: document.querySelector("#blueAvatar"),
  redCopy: document.querySelector("#redCopy"),
  blueCopy: document.querySelector("#blueCopy"),
  startRedName: document.querySelector("#startRedName"),
  startRedAllyName: document.querySelector("#startRedAllyName"),
  startBlueName: document.querySelector("#startBlueName"),
  startRedImg: document.querySelector("#startRedImg"),
  startRedAllyImg: document.querySelector("#startRedAllyImg"),
  startRedAllyCard: document.querySelector("#startRedAllyCard"),
  startBlueImg: document.querySelector("#startBlueImg"),
  timer: document.querySelector("#timer"),
  result: document.querySelector("#result"),
  resultText: document.querySelector("#resultText"),
  resultImage: document.querySelector("#resultImage"),
  resultSubtitle: document.querySelector("#resultSubtitle"),
  startScreen: document.querySelector("#startScreen"),
  startBtn: document.querySelector("#startBtn"),
  playAgainBtn: document.querySelector("#playAgainBtn"),
  rosterStrip: document.querySelector("#rosterStrip"),
  rosterPrev: document.querySelector(".roster-prev"),
  rosterNext: document.querySelector(".roster-next"),
  recordBtn: document.querySelector("#recordBtn"),
  recordStatus: document.querySelector("#recordStatus"),
  startRecordBtn: document.querySelector("#startRecordBtn"),
  startRecordStatus: document.querySelector("#startRecordStatus"),
};

const arena = {
  width: 960,
  height: 600,
  padding: 30,
  scale: 1,
};
const fighterSpeedMultiplier = 1.2;

const effects = [];
const sparks = [];
const rebars = [];
const blackHoles = [];
const trees = [];
const fengxiDomainLines = [];
const iceShards = [];
const earthDragons = [];
const zhiqingScatterRocks = [];
const thrownScythes = [];
const bullets = [];
const lightShields = [];
const foldingFans = [];
const fireballs = [];
const agenProjectiles = [];
const xuanliProjectiles = [];
const xuanliUltimates = [];
const qidaoRocks = [];
const luoxiaoheiMetalPlates = [];
const luoxiaoheiTeleports = [];
const luoxiaoheiClones = [];
const jiulaoInsightZones = [];
const jiulaoMetalThorns = [];
const dreamTrances = [];
const damageTexts = [];
const danjinFormation = {
  active: false,
  broken: false,
  eyeLockRemaining: 0,
  recoveryRemaining: 0,
  casterId: null,
  eyes: [],
};
const globalFreeze = {
  active: false,
  remaining: 0,
  duration: 0,
  casterId: null,
  casterTeamId: null,
};
const ultimateEffects = [];
const visualSpriteCache = new Map();
let arenaBrickBackground = null;
let arenaBrickBackgroundSize = "";
const roleImages = {
  infinite: new Image(),
  fengxi: new Image(),
  xuhuai: new Image(),
  chinian: new Image(),
  haoke: new Image(),
  qingquan: new Image(),
  dasong: new Image(),
  lingyao: new Image(),
  luye: new Image(),
  soldier: new Image(),
  ximuzi: new Image(),
  nezha: new Image(),
  agen: new Image(),
  qidao: new Image(),
  xuanli: new Image(),
  luoxiaohei: new Image(),
  jiulao: new Image(),
  zhiqing: new Image(),
  mingwang: new Image(),
};
roleImages.infinite.src = "./assets/wuxian.png?v=20260626-wuxian1";
roleImages.fengxi.src = "./assets/fengxi.png?v=20260604-fengxi-image1";
roleImages.xuhuai.src = "./assets/xuhuai.png?v=20260616-xuhuai-image1";
roleImages.chinian.src = "./assets/chinian.png";
roleImages.haoke.src = "./assets/haoke.png";
roleImages.qingquan.src = "./assets/qingquan.png";
roleImages.dasong.src = "./assets/dasong.png";
roleImages.lingyao.src = "./assets/lingyao.png";
roleImages.luye.src = "./assets/luye.png";
roleImages.soldier.src = "./assets/soldier-squad.svg";
roleImages.ximuzi.src = "./assets/ximuzi.png";
roleImages.nezha.src = "./assets/nezha.png";
roleImages.agen.src = "./assets/agen.png?v=20260618-agen1";
roleImages.qidao.src = "./assets/qidao.jpeg?v=20260622-qidao-image1";
roleImages.xuanli.src = "./assets/xuanli.png?v=20260702-xuanli4";
roleImages.luoxiaohei.src = "./assets/luoxiaohei.png?v=20260721-luoxiaohei1";
roleImages.jiulao.src = "./assets/jiulao.png?v=20260816-jiulao2";
roleImages.zhiqing.src = "./assets/zhiqing.png?v=20260902-zhiqing-earthburst1";
roleImages.mingwang.src = "./assets/mingwang.png?v=20260907-mingwang2";
const visualImages = {
  scythe: new Image(),
  tree: new Image(),
  vine: new Image(),
  sealCircle: new Image(),
  lightning: new Image(),
  rock: new Image(),
  rockTexture: new Image(),
  soldierHelmet: new Image(),
  shieldCrack: new Image(),
  nineTailFox: new Image(),
  fireRing: new Image(),
  iceBorder: new Image(),
  iceCrystal: new Image(),
  agenFireball: new Image(),
  qidaoExplosion: new Image(),
  boomerang: new Image(),
  blackHoleReal: new Image(),
  danjinMagicCircle: new Image(),
  jiulaoEye: new Image(),
};
visualImages.scythe.src = "./assets/visuals/scythe.png";
visualImages.tree.src = "./assets/visuals/tree.png";
visualImages.vine.src = "./assets/visuals/vine.png?v=20260527-fengxi2";
visualImages.sealCircle.src = "./assets/visuals/seal-circle.png?v=20260527-fengxi2";
visualImages.lightning.src = "./assets/visuals/start-lightning.png";
visualImages.rock.src = "./assets/visuals/rock.png";
visualImages.rockTexture.src = "./assets/visuals/rock-texture.png";
visualImages.soldierHelmet.src = "./assets/visuals/soldier-helmet.png?v=20260527-soldier4";
visualImages.shieldCrack.src = "./assets/visuals/shield-crack.png";
visualImages.nineTailFox.src = "./assets/visuals/nine-tailed-fox.png?v=20260609-ximuzi-fox5";
visualImages.fireRing.src = "./assets/visuals/fire-ring-realistic.webp?v=20260612-nezha-burst1";
visualImages.iceBorder.src = "./assets/visuals/ice-border.png?v=20260616-xuhuai-iceage1";
visualImages.iceCrystal.src = "./assets/visuals/ice-crystal.png?v=20260618-agen1";
visualImages.agenFireball.src = "./assets/visuals/agen-fireball.png?v=20260618-agen3";
visualImages.qidaoExplosion.src = "./assets/visuals/qidao-explosion.png?v=20260621-qidao4";
visualImages.boomerang.src = "./assets/visuals/boomerang-emoji.svg?v=20260626-wuxian5";
visualImages.blackHoleReal.src = "./assets/visuals/black-hole-real.jpg?v=20260626-wuxian1";
visualImages.danjinMagicCircle.src = "./assets/visuals/danjin-magic-circle.png?v=20260807-danjin2";
visualImages.jiulaoEye.src = "./assets/visuals/jiulao-eye.png?v=20260816-jiulao2";
visualImages.vine.addEventListener("load", warmFengxiVisualSprites);
visualImages.sealCircle.addEventListener("load", warmFengxiVisualSprites);
visualImages.danjinMagicCircle.addEventListener("load", warmDanjinVisualSprites);
window.__visualImages = visualImages;
const rosterChecks = Array.from(document.querySelectorAll(".roster-check:not(:disabled)"));
const modeParams = new URLSearchParams(window.location.search);
const battleMode = modeParams.get("mode") === "2v1" || modeParams.get("battle") === "2v1" ? "2v1" : "1v1";
document.body.classList.toggle("two-v-one", battleMode === "2v1");
const requiredRoleCount = battleMode === "2v1" ? 3 : 2;
const defaultSelectedRoles = battleMode === "2v1" ? ["luoxiaohei", "luye", "lingyao"] : ["infinite", "fengxi"];
let selectedRoles = [...defaultSelectedRoles];
let fighters;
let lastTime = Date.now();
let elapsed = 0;
let gameOver = false;
let paused = false;
let matchStarted = false;
let roundWinner = null;
let roundEnding = false;
let pendingRoundWinner = null;
let pendingRoundFinishRemaining = 0;
let gameTimer;
let audio;
let recorder;
let recordedChunks = [];
let recordingFormat = null;
let recordingVideoStream = null;
let pendingRecording = null;
const recordingCaches = {
  panels: new Map(),
  intro: null,
  result: null,
};
const tintedImageCache = new Map();

function createAudioEngine() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;

  const context = new AudioContextClass();
  const master = context.createGain();
  const musicGain = context.createGain();
  const sfxGain = context.createGain();
  const recorderDestination = context.createMediaStreamDestination();
  master.gain.value = 1;
  musicGain.gain.value = 0;
  sfxGain.gain.value = 1;
  musicGain.connect(master);
  sfxGain.connect(master);
  master.connect(context.destination);
  master.connect(recorderDestination);

  let started = false;
  let stepIndex = 0;
  let musicTimer = null;
  const bass = [55, 55, 82.41, 73.42, 55, 110, 98, 73.42];
  const lead = [220, 0, 246.94, 0, 293.66, 0, 246.94, 196];
  const sampleProfiles = {
    rebar: { src: "./assets/sfx/rebar.mp3", volume: 0.72 },
    wire: { src: "./assets/sfx/ice.mp3", volume: 0.82 },
    rifleShot: { src: "./assets/sfx/rifle-shot.mp3", volume: 0.84 },
    blackHole: { src: "./assets/sfx/black-hole.mp3", volume: 0.9 },
    tree: { src: "./assets/sfx/tree.mp3", volume: 0.78 },
    ice: { src: "./assets/sfx/ice.mp3", volume: 0.95 },
    earth: { src: "./assets/sfx/earth.mp3", volume: 0.88 },
    seal: { src: "./assets/sfx/seal.mp3", volume: 0.86 },
    scytheHit: { src: "./assets/sfx/scythe-hit.mp3", volume: 0.98 },
    flyingScythe: { src: "./assets/sfx/scythe-throw.mp3", volume: 0.98 },
    wallHit: { src: "./assets/sfx/hit.mp3", volume: 0.38 },
    hit: { src: "./assets/sfx/hit.mp3", volume: 0.52 },
  };
  const samples = Object.fromEntries(
    Object.entries(sampleProfiles).map(([name, profile]) => {
      const sample = new Audio(profile.src);
      sample.preload = "auto";
      return [name, sample];
    })
  );

  function tone(freq, start, duration, type, gainNode, volume, endFreq = freq) {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(freq, start);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), start + duration);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(gain);
    gain.connect(gainNode);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.02);
  }

  function noise(start, duration, gainNode, volume, filterType = "lowpass", freq = 1000) {
    const bufferSize = Math.max(1, Math.floor(context.sampleRate * duration));
    const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i += 1) data[i] = Math.random() * 2 - 1;
    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    filter.type = filterType;
    filter.frequency.value = freq;
    gain.gain.setValueAtTime(volume, start);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    source.buffer = buffer;
    source.connect(filter);
    filter.connect(gain);
    gain.connect(gainNode);
    source.start(start);
    source.stop(start + duration);
  }

  function clang(start, volume = 0.22) {
    tone(1320, start, 0.08, "square", sfxGain, volume, 580);
    tone(820, start + 0.012, 0.28, "triangle", sfxGain, volume * 0.72, 980);
    tone(1960, start + 0.028, 0.18, "sine", sfxGain, volume * 0.45, 1540);
    tone(330, start + 0.02, 0.22, "sawtooth", sfxGain, volume * 0.38, 210);
    noise(start, 0.16, sfxGain, volume * 0.62, "highpass", 3600);
  }

  function whoosh(start, volume = 0.18) {
    noise(start, 0.32, sfxGain, volume, "highpass", 1600);
    tone(360, start, 0.22, "sawtooth", sfxGain, volume * 0.58, 780);
  }

  function musicStep() {
    const now = context.currentTime;
    const bassNote = bass[stepIndex % bass.length];
    tone(bassNote, now, 0.18, "sawtooth", musicGain, 0.07, bassNote * 0.96);

    if (stepIndex % 2 === 0) {
      tone(110, now + 0.02, 0.04, "triangle", musicGain, 0.055, 70);
    }

    const leadNote = lead[stepIndex % lead.length];
    if (leadNote) {
      tone(leadNote, now + 0.05, 0.12, "square", musicGain, 0.032, leadNote * 1.01);
    }

    if (stepIndex % 4 === 2) {
      noise(now + 0.04, 0.065, musicGain, 0.032, "highpass", 2200);
    }

    stepIndex += 1;
  }

  function startMusic() {
    if (started) return;
    started = true;
    musicStep();
    musicTimer = window.setInterval(musicStep, 285);
  }

  function unlock() {
    if (context.state === "suspended") {
      context.resume();
    }
    Object.values(samples).forEach((sample) => sample.load());
    started = true;
  }

  function playSample(name) {
    const profile = sampleProfiles[name];
    const sample = samples[name];
    if (!profile || !sample) return false;

    const instance = sample.cloneNode(true);
    instance.volume = profile.volume;
    instance.currentTime = 0;
    const source = context.createMediaElementSource(instance);
    source.connect(sfxGain);
    instance.addEventListener("ended", () => source.disconnect(), { once: true });
    instance.play().catch(() => {});
    return true;
  }

  function playSfx(name) {
    if (!started || context.state !== "running") return;
    if (playSample(name)) return;

    const now = context.currentTime;
    if (name === "wire") {
      tone(2100, now, 0.1, "triangle", sfxGain, 0.24, 3200);
      tone(980, now + 0.035, 0.16, "sine", sfxGain, 0.16, 1480);
      noise(now, 0.18, sfxGain, 0.12, "highpass", 3600);
    } else if (name === "rebar") {
      tone(980, now, 0.16, "square", sfxGain, 0.26, 420);
      clang(now + 0.04, 0.14);
      noise(now, 0.14, sfxGain, 0.14, "highpass", 1800);
    } else if (name === "blackHole") {
      tone(240, now, 0.12, "square", sfxGain, 0.28, 52);
      tone(90, now + 0.02, 1.05, "sawtooth", sfxGain, 0.34, 24);
      tone(42, now + 0.05, 1.15, "sine", sfxGain, 0.3, 30);
      noise(now, 0.95, sfxGain, 0.18, "lowpass", 320);
      noise(now + 0.04, 0.38, sfxGain, 0.16, "highpass", 1600);
    } else if (name === "tree") {
      tone(155, now, 0.24, "triangle", sfxGain, 0.22, 300);
      tone(82, now + 0.03, 0.36, "sawtooth", sfxGain, 0.16, 110);
      noise(now + 0.02, 0.34, sfxGain, 0.13, "bandpass", 620);
    } else if (name === "ice") {
      tone(1760, now, 0.08, "triangle", sfxGain, 0.28, 3200);
      tone(2480, now + 0.025, 0.12, "sine", sfxGain, 0.19, 1900);
      tone(920, now + 0.04, 0.2, "triangle", sfxGain, 0.18, 1320);
      tone(520, now + 0.07, 0.26, "sine", sfxGain, 0.12, 760);
      noise(now, 0.22, sfxGain, 0.16, "highpass", 4200);
    } else if (name === "earth") {
      tone(115, now, 0.22, "sawtooth", sfxGain, 0.28, 62);
      tone(62, now + 0.03, 0.55, "triangle", sfxGain, 0.26, 45);
      noise(now, 0.62, sfxGain, 0.18, "lowpass", 380);
    } else if (name === "seal") {
      tone(720, now, 0.1, "square", sfxGain, 0.3, 240);
      tone(260, now + 0.02, 0.55, "sawtooth", sfxGain, 0.3, 82);
      tone(520, now + 0.08, 0.36, "square", sfxGain, 0.22, 180);
      noise(now, 0.42, sfxGain, 0.18, "bandpass", 900);
      noise(now + 0.18, 0.4, sfxGain, 0.13, "lowpass", 520);
    } else if (name === "scytheHit") {
      clang(now, 0.34);
      tone(260, now + 0.035, 0.22, "sawtooth", sfxGain, 0.16, 170);
      noise(now + 0.02, 0.22, sfxGain, 0.18, "highpass", 2600);
    } else if (name === "flyingScythe") {
      tone(95, now, 0.42, "sawtooth", sfxGain, 0.28, 52);
      tone(420, now + 0.02, 0.18, "sawtooth", sfxGain, 0.26, 980);
      tone(1180, now + 0.08, 0.3, "triangle", sfxGain, 0.24, 520);
      whoosh(now, 0.28);
      noise(now + 0.18, 0.34, sfxGain, 0.2, "highpass", 2400);
    } else if (name === "wallHit") {
      tone(150, now, 0.06, "triangle", sfxGain, 0.11, 82);
    } else if (name === "hit") {
      tone(180, now, 0.08, "triangle", sfxGain, 0.16, 90);
    }
  }

  return { unlock, playSfx, context, stream: recorderDestination.stream, get musicTimer() { return musicTimer; } };
}

const roleMeta = {
  infinite: {
    name: "无限",
    image: "./assets/wuxian.png?v=20260626-wuxian1",
    copy: "御灵系-金，空间系<br />技能：金系召唤，领域吞噬<br />“不必问我，你可以有自己的答案。”",
  },
  fengxi: {
    name: "风息",
    image: "./assets/fengxi.png?v=20260604-fengxi-image1",
    copy: "御灵系-木，生灵系<br />技能：木系召唤，豪夺<br />“总有一天我们会无处可去的”",
  },
  fengxiDomain: {
    name: "风息（领域）",
    image: "./assets/fengxi.png?v=20260604-fengxi-image1",
    copy: "御灵系-木，空间系-领域<br />技能：木系召唤，领域<br />“总有一天我们会无处可去的”",
  },
  xuhuai: {
    name: "虚淮",
    image: "./assets/xuhuai.png?v=20260616-xuhuai-image1",
    copy: "御灵系-冰<br />技能：冰晶，冰河时代<br />“你还是输给肉了”",
  },
  chinian: {
    name: "池年",
    image: "./assets/chinian.png",
    copy: "御灵系-土<br />技能：御土<br />“老虎屁股摸不得”",
  },
  scythe: {
    name: "浩克",
    image: "./assets/haoke.png",
    copy: "近身格斗<br />技能：旋镰，飞镰<br />“老子不是杜宾犬”",
  },
  qingquan: {
    name: "清泉",
    image: "./assets/qingquan.png",
    copy: "锁御系<br />技能：双刀近身<br />“明月松间照，清泉石上流”",
  },
  dasong: {
    name: "大松",
    image: "./assets/dasong.png",
    copy: "锁御系<br />技能：流石甲<br />“明月松间照，清泉石上流”",
  },
  lingyao: {
    name: "灵遥",
    image: "./assets/lingyao.png",
    copy: "锁御系<br />技能：流石甲，双剑近身<br />“我想送会馆一个理由”",
  },
  luye: {
    name: "鹿野",
    image: "./assets/luye.png",
    copy: "御灵系-金，生灵系<br />法宝：琼圆盾<br />技能：御金，追毫<br />“我会站在妖精这边”",
  },
  soldier: {
    name: "人类士兵",
    image: "./assets/soldier-squad.svg",
    copy: "“那一天人类得到了针对妖精的武器材料”",
  },
  ximuzi: {
    name: "西木子",
    image: "./assets/ximuzi.png",
    copy: "锁御系，心灵系<br />技能：飞扇，戏梦<br />“死几百个执行者，或者死个哪吒就可以”",
  },
  nezha: {
    name: "哪吒",
    image: "./assets/nezha.png",
    copy: "御灵系-火、锁御系-灵御<br />技能：御火，乾坤圈<br />“空间系真是烦死了！”",
  },
  agen: {
    name: "阿根",
    image: "./assets/agen.png?v=20260618-agen1",
    copy: "御灵系-冰，御灵系-火<br />技能：御冰，焚焰火<br />“生命的延续本来就有点残酷呢。”",
  },
  qidao: {
    name: "七刀（雅婷）",
    image: "./assets/qidao.jpeg?v=20260622-qidao-image1",
    copy: "御灵系<br />技能：聚石，自爆<br />“想用我来要挟明王？做你的梦！”",
  },
  xuanli: {
    name: "玄离",
    image: "./assets/xuanli.png?v=20260702-xuanli4",
    copy: "御灵系-冰，御灵系-火<br />技能：冰火，两重天<br />“烧死无限！”",
  },
  luoxiaohei: {
    name: "罗小黑",
    image: "./assets/luoxiaohei.png?v=20260721-luoxiaohei1",
    copy: "御灵系-金，空间系-传送，生灵系-分身<br />技能：御金，传送，黑咻<br />“放心吧，我们一定会找到家的。”",
  },
  jiulao: {
    name: "鸠老",
    image: "./assets/jiulao.png?v=20260816-jiulao2",
    copy: "生灵系，造物系<br />技能：洞察，凌荆<br />“规矩是死的，妖是活的”",
  },
  zhiqing: {
    name: "芷清",
    image: "./assets/zhiqing.png?v=20260902-zhiqing-earthburst1",
    copy: "御灵系-土<br />技能：飞石，土暴<br />“本姓毛，拒绝被叫丙”",
  },
  mingwang: {
    name: "明王",
    image: "./assets/mingwang.png?v=20260907-mingwang2",
    copy: "生灵系<br />技能：强化，治愈，复生<br />“你又养了一个治愈系？”",
  },
};

function createFighters() {
  const roles = getSelectedRoles();
  if (battleMode === "2v1") {
    return [
      createFighter(roles[0], "red", {
        id: "red-a",
        teamId: "red",
        x: 250,
        y: 220,
        vx: 232 * fighterSpeedMultiplier,
        vy: -132 * fighterSpeedMultiplier,
        mass: 1.02,
      }),
      createFighter(roles[1], "red", {
        id: "red-b",
        teamId: "red",
        x: 250,
        y: 390,
        vx: 218 * fighterSpeedMultiplier,
        vy: 126 * fighterSpeedMultiplier,
        mass: 1.02,
      }),
      createFighter(roles[2], "blue", {
        id: "blue",
        teamId: "blue",
        x: 710,
        y: 305,
        vx: -232 * fighterSpeedMultiplier,
        vy: 138 * fighterSpeedMultiplier,
        mass: 1.22,
      }),
    ];
  }
  return [createFighter(roles[0], "red"), createFighter(roles[1], "blue")];
}

function createFighter(role, side, overrides = {}) {
  const isRed = side === "red";
  const base = {
    id: overrides.id || side,
    teamId: overrides.teamId || side,
    role,
    name: roleMeta[role].name,
    x: overrides.x ?? (isRed ? 250 : 710),
    y: overrides.y ?? (isRed ? 300 : 310),
    vx: overrides.vx ?? ((isRed ? 238 : -218) * fighterSpeedMultiplier),
    vy: overrides.vy ?? ((isRed ? -116 : 132) * fighterSpeedMultiplier),
    radius: 32,
    mass: overrides.mass ?? (isRed ? 1.05 : 1.2),
    speed: role === "fengxi" || role === "fengxiDomain" ? 240 : 260,
    hp: 80,
    maxHp: 80,
    contactCount: 0,
    damageTakenMultiplier: 1,
    wallSfxCooldown: 0,
    slowRemaining: 0,
    slowMultiplier: 1,
    frozenRemaining: 0,
    burnRemaining: 0,
    burnTickRemaining: 0,
    immune: false,
    hidden: false,
    trapped: false,
    sealed: false,
    sealRemaining: 0,
    sealedById: null,
    collision: {
      canDamage: false,
      damage: 0,
    },
    color: "#ef4b4f",
    accent: "#f0c45c",
  };

  if (role === "infinite") {
    return {
      ...base,
      color: "#ef4b4f",
      accent: "#f0c45c",
      skills: {
        rebar: { name: "金系召唤", cooldown: 5, cooldownRemaining: 2, damage: 5 },
        blackHole: { name: "领域吞噬", cooldown: 15, cooldownRemaining: 15, duration: 5, damage: 8 },
      },
    };
  }

  if (role === "fengxi") {
    return {
      ...base,
      speed: 240,
      color: "#48b88a",
      accent: "#8be38f",
      rageColor: "#ef4b4f",
      skills: {
        tree: { name: "木系召唤", cooldown: 6, cooldownRemaining: 3, duration: 5, damagePerSecond: 6 },
        seal: { name: "豪夺", ready: false, used: false, hpBelow: 30, duration: 15 },
      },
    };
  }

  if (role === "fengxiDomain") {
    return {
      ...base,
      hp: 160,
      maxHp: 160,
      speed: 240,
      color: "#346f5a",
      accent: "#9fd0ff",
      skills: {
        tree: { name: "木系召唤", cooldown: 6, cooldownRemaining: 3, duration: 5, damagePerSecond: 6 },
        domain: { name: "领域", cooldown: 6, cooldownRemaining: 4.2, damage: 3 },
      },
    };
  }

  if (role === "chinian") {
    return {
      ...base,
      color: "#b97442",
      accent: "#e7be72",
      collision: {
        canDamage: true,
        damage: 2,
      },
      skills: {
        earth: { name: "御土", cooldown: 8, cooldownRemaining: 4.5, damage: 5 },
      },
    };
  }

  if (role === "scythe") {
    return {
      ...base,
      color: "#6f5a91",
      accent: "#d9d4e8",
      speed: 250,
      skills: {
        scythe: {
          name: "旋镰",
          damage: 3,
          angle: isRed ? -0.6 : 2.6,
          spinSpeed: isRed ? 3.4 : -3.4,
          hitCooldown: 0,
          thrown: false,
          returnRemaining: 0,
          flyingUsed: false,
          flyingDamage: 15,
        },
      },
    };
  }

  if (role === "qingquan") {
    return {
      ...base,
      color: "#3d82aa",
      accent: "#83e9ff",
      speed: 255,
      skills: {
        twinBlades: {
          name: "双刀近身",
          damage: 2,
          phase: isRed ? -0.35 : Math.PI - 0.35,
          spinSpeed: isRed ? 4.1 : -4.1,
          hitCooldown: 0,
          trails: [],
        },
      },
    };
  }

  if (role === "dasong") {
    return {
      ...base,
      color: "#416a73",
      accent: "#78f0ff",
      speed: 250,
      skills: {
        stoneShield: {
          name: "流石甲",
          damage: 4,
          cooldown: 4,
          cooldownRemaining: 2,
          restoreDelay: 1.5,
          absentRemaining: 0,
          angle: isRed ? -0.15 : Math.PI - 0.15,
          spinSpeed: isRed ? 1.55 : -1.55,
          active: true,
        },
      },
    };
  }

  if (role === "lingyao") {
    const hp = battleMode === "2v1" ? 100 : base.hp;
    return {
      ...base,
      hp,
      maxHp: hp,
      color: "#52706b",
      accent: "#a6f4ff",
      speed: 255,
      skills: {
        twinBlades: {
          name: "双剑近身",
          damage: 3,
          phase: isRed ? -0.35 : Math.PI - 0.35,
          spinSpeed: isRed ? 5 : -5,
          hitCooldown: 0,
          trails: [],
        },
        stoneShield: {
          name: "流石甲",
          damage: 5,
          cooldown: 6,
          cooldownRemaining: 6,
          restoreDelay: 2,
          absentRemaining: 0,
          angle: isRed ? -0.15 : Math.PI - 0.15,
          spinSpeed: isRed ? 1.55 : -1.55,
          active: false,
          unlocked: false,
          hpBelow: 40,
        },
      },
    };
  }

  if (role === "luye") {
    return {
      ...base,
      color: "#c8b28f",
      accent: "#ff5252",
      speed: 258,
      skills: {
        wire: { name: "御金", cooldown: 3, cooldownRemaining: 2.1, damage: 4 },
        chase: {
          name: "追毫",
          hpBelow: 40,
          used: false,
          activeRemaining: 0,
          damage: 4,
        },
        treasureShield: {
          name: "琼圆盾",
          hpBelow: 5,
          used: false,
          active: false,
          charges: 4,
          maxCharges: 4,
          shatterAge: 0,
        },
      },
    };
  }

  if (role === "soldier") {
    const motionScale = 0.88;
    const squad = {
      ...base,
      isSquad: true,
      color: "#657353",
      accent: "#d3c79b",
      hp: 75,
      maxHp: 75,
      units: [],
    };
    const offsets = isRed
      ? [[-65, -124], [30, -120], [-28, -15], [-76, 94], [32, 100]]
      : [[65, -134], [-30, -130], [28, -25], [76, 84], [-32, 90]];
    squad.units = offsets.map(([offsetX, offsetY], index) => ({
      ...base,
      id: `${base.id}-soldier-${index}`,
      teamId: base.teamId,
      role: "soldier-unit",
      name: "士兵",
      controller: squad,
      x: base.x + offsetX,
      y: base.y + offsetY,
      vx: ((isRed ? 152 : -152) + (index % 2 ? 42 : -36)) * fighterSpeedMultiplier * motionScale,
      vy: ((index % 2 ? -116 : 105) + index * 9) * fighterSpeedMultiplier * motionScale,
      radius: 18,
      mass: 0.62,
      speed: 207,
      hp: 15,
      maxHp: 15,
      color: "#657353",
      accent: "#d3c79b",
      rifleCooldown: 0.65 + index * 0.46,
    }));
    return squad;
  }

  if (role === "ximuzi") {
    return {
      ...base,
      color: "#b6423f",
      accent: "#f3a35f",
      speed: 252,
      skills: {
        fan: { name: "飞扇", cooldown: 4, cooldownRemaining: 2.4, damage: 4 },
        dream: {
          name: "戏梦",
          hpBelow: 20,
          used: false,
          activeRemaining: 0,
          freezeDuration: 5,
          damage: 10,
        },
      },
    };
  }

  if (role === "nezha") {
    return {
      ...base,
      color: "#d33824",
      accent: "#ffd36a",
      speed: 258,
      collision: {
        canDamage: true,
        damage: 5,
      },
      skills: {
        fire: {
          name: "御火",
          hitCount: 0,
          hitsRequired: 4,
          burstDamage: 8,
          burstDuration: 2,
          burstRemaining: 0,
        },
        qiankun: {
          name: "乾坤圈",
          hpBelow: 30,
          used: false,
          active: false,
          rings: [],
        },
      },
    };
  }

  if (role === "agen") {
    return {
      ...base,
      color: "#5cbec4",
      accent: "#aaf6ff",
      speed: 256,
      skills: {
        elemental: {
          name: "御冰 / 焚焰火",
          cooldown: 4,
          cooldownRemaining: 2,
          nextType: "ice",
          iceDamage: 3,
          flameDamage: 1,
          freezeDuration: 1,
          burnDuration: 3,
          burnDamagePerSecond: 1,
        },
      },
    };
  }

  if (role === "qidao") {
    return {
      ...base,
      color: "#8f654d",
      accent: "#f0c982",
      speed: 252,
      skills: {
        gatherStone: {
          name: "聚石",
          cooldown: 6,
          cooldownRemaining: 3,
          damage: 5,
        },
        selfDestruct: {
          name: "自爆",
          hpBelow: 10,
          used: false,
          damage: 15,
          ready: false,
        },
      },
    };
  }

  if (role === "xuanli") {
    return {
      ...base,
      color: "#7d4f41",
      accent: "#f3b66c",
      speed: 254,
      skills: {
        icefire: {
          name: "冰火",
          cooldown: 5,
          cooldownRemaining: 2.7,
          fireDamage: 4,
          iceDamage: 3,
          slowDuration: 2,
          slowMultiplier: 0.45,
        },
        doubleHeaven: {
          name: "两重天",
          hpBelow: 35,
          used: false,
          damage: 15,
          chaseDuration: 10,
        },
      },
    };
  }

  if (role === "luoxiaohei") {
    return {
      ...base,
      color: "#16191d",
      accent: "#9ed78f",
      speed: 266,
      skills: {
        metal: { name: "御金", cooldown: 4, cooldownRemaining: 2.2, damage: 4 },
        teleport: { name: "传送", cooldown: 8, cooldownRemaining: 5.2, damage: 4 },
        clone: {
          name: "分身",
          hpBelow: 20,
          used: false,
          count: 4,
          damage: 2,
          holdDuration: 3,
        },
      },
    };
  }

  if (role === "jiulao") {
    return {
      ...base,
      color: "#6e3145",
      accent: "#c9d2da",
      speed: 252,
      skills: {
        insight: {
          name: "洞察",
          cooldown: 6,
          cooldownRemaining: 2.8,
          duration: 2,
          radius: 52,
          damage: 1,
          slowDuration: 1.8,
          slowMultiplier: 0.45,
        },
        thorn: {
          name: "凌荆",
          cooldown: 5,
          cooldownRemaining: 1.9,
          damage: 4,
        },
      },
    };
  }

  if (role === "zhiqing") {
    return {
      ...base,
      color: "#775434",
      accent: "#d6a260",
      speed: 252,
      skills: {
        gatherStone: {
          name: "飞石",
          cooldown: 5,
          cooldownRemaining: 2.6,
          gatherDuration: 0.85,
          projectileCount: 5,
          damage: 4,
        },
        earthBurst: {
          name: "土暴",
          hpBelow: 30,
          used: false,
          duration: 2,
          projectileCount: 10,
          damage: 3,
        },
      },
    };
  }

  if (role === "mingwang") {
    return {
      ...base,
      color: "#7e312d",
      accent: "#ffb7a8",
      speed: 252,
      skills: {
        boost: {
          name: "强化",
          cooldown: 6,
          cooldownRemaining: 2.8,
          duration: 3,
          activeRemaining: 0,
          speedMultiplier: 2,
          collisionDamage: 5,
        },
        heal: {
          name: "治愈",
          thresholds: [
            { hpBelow: 50, used: false },
            { hpBelow: 30, used: false },
          ],
          amount: 10,
          effectRemaining: 0,
          lastObservedHp: base.maxHp,
        },
        revive: {
          name: "复生",
          used: false,
          amount: 10,
          effectRemaining: 0,
        },
      },
    };
  }

  return {
    ...base,
    color: "#5aa7d6",
    accent: "#c8f5ff",
    collision: {
      canDamage: true,
      damage: 2,
      slowDuration: 2,
      slowMultiplier: 0.45,
    },
    skills: {
      iceBurst: { name: "冰晶", cooldown: 8, cooldownRemaining: 4, damage: 5 },
      iceAge: { name: "冰河时代", used: false, duration: 3 },
    },
  };
}

function getSelectedRoles() {
  const checked = rosterChecks.filter((item) => item.checked).map((item) => item.value);
  const roles = [...selectedRoles, ...checked, ...defaultSelectedRoles].filter((role, index, list) => list.indexOf(role) === index);
  return roles.slice(0, requiredRoleCount);
}

function syncRosterChecksToSelectedRoles() {
  const selected = new Set(selectedRoles.slice(0, requiredRoleCount));
  rosterChecks.forEach((item) => {
    item.checked = selected.has(item.value);
  });
}

function resetGame() {
  fighters = createFighters();
  resetRecordingCaches();
  effects.length = 0;
  sparks.length = 0;
  rebars.length = 0;
  blackHoles.length = 0;
  trees.length = 0;
  fengxiDomainLines.length = 0;
  iceShards.length = 0;
  earthDragons.length = 0;
  zhiqingScatterRocks.length = 0;
  thrownScythes.length = 0;
  bullets.length = 0;
  lightShields.length = 0;
  foldingFans.length = 0;
  fireballs.length = 0;
  agenProjectiles.length = 0;
  xuanliProjectiles.length = 0;
  xuanliUltimates.length = 0;
  qidaoRocks.length = 0;
  luoxiaoheiMetalPlates.length = 0;
  luoxiaoheiTeleports.length = 0;
  luoxiaoheiClones.length = 0;
  jiulaoInsightZones.length = 0;
  jiulaoMetalThorns.length = 0;
  dreamTrances.length = 0;
  damageTexts.length = 0;
  ultimateEffects.length = 0;
  resetDanjinFormation();
  globalFreeze.active = false;
  globalFreeze.remaining = 0;
  globalFreeze.duration = 0;
  globalFreeze.casterId = null;
  globalFreeze.casterTeamId = null;
  elapsed = 0;
  gameOver = false;
  paused = false;
  matchStarted = false;
  roundWinner = null;
  roundEnding = false;
  pendingRoundWinner = null;
  pendingRoundFinishRemaining = 0;
  ui.result.hidden = true;
  ui.startScreen.hidden = false;
  lastTime = Date.now();
  renderSelectedRoles();
  updateUi();
}

function startMatch() {
  if (rosterChecks.filter((item) => item.checked).length < requiredRoleCount) return;
  audio?.unlock();
  matchStarted = true;
  paused = false;
  gameOver = false;
  roundEnding = false;
  pendingRoundWinner = null;
  pendingRoundFinishRemaining = 0;
  ui.startScreen.hidden = true;
  ui.result.hidden = true;
  lastTime = Date.now();
  triggerFengxiDomainIntroEffect();
  triggerDanjinFormation();
}

function triggerFengxiDomainIntroEffect() {
  if (battleMode !== "2v1") return;
  const caster = fighters.find((fighter) => fighter.role === "fengxiDomain" && fighter.hp > 0);
  if (!caster) return;
  addUltimateEffect("fengxiDomainIntro", arena.width / 2, arena.height / 2);
}

function resetDanjinFormation() {
  danjinFormation.active = false;
  danjinFormation.broken = false;
  danjinFormation.eyeLockRemaining = 0;
  danjinFormation.recoveryRemaining = 0;
  danjinFormation.casterId = null;
  danjinFormation.eyes.length = 0;
}

function triggerDanjinFormation() {
  if (battleMode !== "2v1") return;
  const lingyao = fighters.find((fighter) => fighter.role === "lingyao" && fighter.hp > 0);
  const luoxiaohei = fighters.find((fighter) => fighter.role === "luoxiaohei" && fighter.hp > 0);
  const luye = fighters.find((fighter) => fighter.role === "luye" && fighter.hp > 0);
  if (!lingyao || !luoxiaohei || !luye) return;
  danjinFormation.active = true;
  danjinFormation.broken = false;
  danjinFormation.eyeLockRemaining = 2;
  danjinFormation.recoveryRemaining = 0;
  danjinFormation.casterId = lingyao.id;
  danjinFormation.eyes = createDanjinEyes();
  addUltimateEffect("danjinIntro", arena.width / 2, arena.height / 2);
  addRing(lingyao.x, lingyao.y, "#f9f2a8", 1.1);
  addSparks(lingyao.x, lingyao.y, "#fff3a8", 28);
}

function createDanjinEyes() {
  const centerX = arena.width / 2;
  const centerY = arena.height / 2;
  const radiusX = Math.min(310, arena.width * 0.34);
  const radiusY = Math.min(190, arena.height * 0.28);
  const phase = Math.random() * Math.PI * 2;
  return Array.from({ length: 7 }, (_, index) => {
    const angle = phase + index * (Math.PI * 2 / 7);
    const jitterX = (Math.random() - 0.5) * 54;
    const jitterY = (Math.random() - 0.5) * 42;
    return {
      id: `danjin-eye-${index}`,
      x: clamp(centerX + Math.cos(angle) * radiusX + jitterX, arena.padding + 74, arena.width - arena.padding - 74),
      y: clamp(centerY + Math.sin(angle) * radiusY + jitterY, arena.padding + 68, arena.height - arena.padding - 68),
      radius: 18,
      age: 0,
      seed: Math.random() * Math.PI * 2,
    };
  });
}

function renderSelectedRoles() {
  const red = fighters[0];
  const redAlly = battleMode === "2v1" ? fighters[1] : null;
  const blue = battleMode === "2v1" ? fighters[2] : fighters[1];
  renderFighterPanel("red", red);
  renderFighterPanel("blue", blue);
  ui.startRedName.textContent = red.name;
  ui.startBlueName.textContent = blue.name;
  ui.startRedImg.src = roleMeta[red.role].image;
  ui.startRedImg.alt = red.name;
  ui.startBlueImg.src = roleMeta[blue.role].image;
  ui.startBlueImg.alt = blue.name;
  ui.redAllyPanel.hidden = battleMode !== "2v1";
  ui.startRedAllyCard.hidden = battleMode !== "2v1";
  ui.redAllyPanel.closest(".fighter-grid")?.classList.toggle("two-v-one", battleMode === "2v1");
  if (redAlly) {
    renderFighterPanel("redAlly", redAlly);
    ui.startRedAllyName.textContent = redAlly.name;
    ui.startRedAllyImg.src = roleMeta[redAlly.role].image;
    ui.startRedAllyImg.alt = redAlly.name;
  }
  rosterChecks.forEach((item) => {
    const slot = item.closest(".roster-slot");
    const checkedIndex = selectedRoles.indexOf(item.value);
    slot?.classList.toggle("active", item.checked);
    slot?.classList.toggle("red-side", item.checked && checkedIndex === 0);
    slot?.classList.toggle("red-ally-side", battleMode === "2v1" && item.checked && checkedIndex === 1);
    slot?.classList.toggle("blue-side", item.checked && checkedIndex === requiredRoleCount - 1);
  });
}

function renderFighterPanel(prefix, fighter) {
  const meta = roleMeta[fighter.role];
  const key = prefix === "redAlly" ? "redAlly" : prefix;
  ui[`${key}Name`].textContent = meta.name;
  ui[`${key}Avatar`].src = meta.image;
  ui[`${key}Avatar`].alt = meta.name;
  ui[`${key}Copy`].innerHTML = meta.copy;
}

function handleRosterChange(event) {
  const changed = event?.currentTarget;
  if (changed) {
    selectedRoles = selectedRoles.filter((role) => role !== changed.value);
    if (changed.checked) selectedRoles.push(changed.value);
    while (selectedRoles.length > requiredRoleCount) {
      const removedRole = selectedRoles.shift();
      const removedCheck = rosterChecks.find((item) => item.value === removedRole);
      if (removedCheck) removedCheck.checked = false;
    }
  } else {
    selectedRoles = rosterChecks.filter((item) => item.checked).map((item) => item.value).slice(0, requiredRoleCount);
  }
  resetGame();
}

function scrollRoster(direction) {
  if (!ui.rosterStrip) return;
  const firstSlot = ui.rosterStrip.querySelector(".roster-slot");
  const step = firstSlot ? firstSlot.getBoundingClientRect().width + 10 : 150;
  ui.rosterStrip.scrollBy({ left: direction * step * 2, behavior: "smooth" });
}

function setupRosterScrolling() {
  if (!ui.rosterStrip) return;
  let tracking = false;
  let dragging = false;
  let startX = 0;
  let startScroll = 0;

  ui.rosterPrev?.addEventListener("click", () => scrollRoster(-1));
  ui.rosterNext?.addEventListener("click", () => scrollRoster(1));

  ui.rosterStrip.addEventListener(
    "wheel",
    (event) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      event.preventDefault();
      ui.rosterStrip.scrollLeft += event.deltaY;
    },
    { passive: false },
  );

  ui.rosterStrip.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    tracking = true;
    dragging = false;
    startX = event.clientX;
    startScroll = ui.rosterStrip.scrollLeft;
  });

  ui.rosterStrip.addEventListener("pointermove", (event) => {
    if (!tracking) return;
    const delta = event.clientX - startX;
    if (!dragging && Math.abs(delta) <= 10) return;
    if (!dragging) {
      dragging = true;
      ui.rosterStrip.classList.add("dragging");
      ui.rosterStrip.setPointerCapture?.(event.pointerId);
    }
    ui.rosterStrip.scrollLeft = startScroll - delta;
  });

  const endDrag = (event) => {
    if (!tracking) return;
    tracking = false;
    dragging = false;
    ui.rosterStrip.classList.remove("dragging");
    ui.rosterStrip.releasePointerCapture?.(event.pointerId);
  };
  ui.rosterStrip.addEventListener("pointerup", endDrag);
  ui.rosterStrip.addEventListener("pointercancel", endDrag);
}

function fitCanvas() {
  const rect = canvas.getBoundingClientRect();
  const scale = window.devicePixelRatio || 1;
  arena.scale = scale;
  canvas.width = Math.floor(rect.width * scale);
  canvas.height = Math.floor(rect.height * scale);
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  arena.width = rect.width;
  arena.height = rect.height;
  visualSpriteCache.clear();
  arenaBrickBackground = null;
  arenaBrickBackgroundSize = "";
  warmFengxiVisualSprites();
  warmDanjinVisualSprites();
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function lerp(start, end, amount) {
  return start + (end - start) * amount;
}

function length(x, y) {
  return Math.hypot(x, y);
}

function normalize(x, y) {
  const len = length(x, y) || 1;
  return { x: x / len, y: y / len };
}

function imageReady(image) {
  return image?.complete && image.naturalWidth > 0;
}

function getTintedImage(image, cacheKey, color) {
  if (!imageReady(image)) return null;
  if (tintedImageCache.has(cacheKey)) return tintedImageCache.get(cacheKey);

  const buffer = document.createElement("canvas");
  buffer.width = image.naturalWidth;
  buffer.height = image.naturalHeight;
  const bufferCtx = buffer.getContext("2d");
  bufferCtx.drawImage(image, 0, 0);
  bufferCtx.globalCompositeOperation = "source-in";
  bufferCtx.fillStyle = color;
  bufferCtx.fillRect(0, 0, buffer.width, buffer.height);
  tintedImageCache.set(cacheKey, buffer);
  return buffer;
}

function getScaledVisualSprite(image, cacheKey, width, height, filter = "none") {
  if (!imageReady(image)) return null;
  const pixelWidth = Math.max(1, Math.ceil(width));
  const pixelHeight = Math.max(1, Math.ceil(height));
  const key = `${cacheKey}:${pixelWidth}x${pixelHeight}`;
  if (visualSpriteCache.has(key)) return visualSpriteCache.get(key);

  const buffer = document.createElement("canvas");
  buffer.width = pixelWidth;
  buffer.height = pixelHeight;
  const bufferCtx = buffer.getContext("2d");
  bufferCtx.filter = filter;
  bufferCtx.drawImage(image, 0, 0, pixelWidth, pixelHeight);
  visualSpriteCache.set(key, buffer);
  return buffer;
}

function getDanjinMagicCircleSprite(size, color = "#fff0a4") {
  const image = visualImages.danjinMagicCircle;
  if (!imageReady(image)) return null;
  const pixelSize = Math.max(1, Math.ceil(size));
  const key = `danjin-magic-circle:${pixelSize}:${color}`;
  if (visualSpriteCache.has(key)) return visualSpriteCache.get(key);

  const buffer = document.createElement("canvas");
  buffer.width = pixelSize;
  buffer.height = pixelSize;
  const bufferCtx = buffer.getContext("2d");
  bufferCtx.drawImage(image, 0, 0, pixelSize, pixelSize);
  bufferCtx.globalCompositeOperation = "source-in";
  bufferCtx.fillStyle = color;
  bufferCtx.fillRect(0, 0, pixelSize, pixelSize);
  visualSpriteCache.set(key, buffer);
  return buffer;
}

function getDanjinEyeSprite(size) {
  const pixelSize = Math.max(1, Math.ceil(size));
  const key = `danjin-eye:${pixelSize}`;
  if (visualSpriteCache.has(key)) return visualSpriteCache.get(key);

  const buffer = document.createElement("canvas");
  buffer.width = pixelSize;
  buffer.height = pixelSize;
  const c = buffer.getContext("2d");
  const center = pixelSize / 2;
  const radius = pixelSize * 0.22;
  const glow = c.createRadialGradient(center, center, 2, center, center, pixelSize * 0.48);
  glow.addColorStop(0, "rgba(255, 255, 232, 0.92)");
  glow.addColorStop(0.32, "rgba(255, 229, 102, 0.62)");
  glow.addColorStop(1, "rgba(255, 229, 102, 0)");
  c.fillStyle = glow;
  c.beginPath();
  c.arc(center, center, pixelSize * 0.48, 0, Math.PI * 2);
  c.fill();
  c.strokeStyle = "rgba(255, 248, 195, 0.94)";
  c.lineWidth = Math.max(2, pixelSize * 0.035);
  c.beginPath();
  c.arc(center, center, radius, 0, Math.PI * 2);
  c.stroke();
  c.lineWidth = Math.max(1.2, pixelSize * 0.02);
  for (let i = 0; i < 6; i += 1) {
    const angle = i * Math.PI / 3;
    c.beginPath();
    c.moveTo(center + Math.cos(angle) * radius * 0.35, center + Math.sin(angle) * radius * 0.35);
    c.lineTo(center + Math.cos(angle) * radius * 1.36, center + Math.sin(angle) * radius * 1.36);
    c.stroke();
  }
  c.fillStyle = "rgba(255, 255, 255, 0.96)";
  c.beginPath();
  c.arc(center, center, Math.max(3, pixelSize * 0.055), 0, Math.PI * 2);
  c.fill();
  visualSpriteCache.set(key, buffer);
  return buffer;
}

function getVineClusterSprite(width, height) {
  if (!imageReady(visualImages.vine)) return null;
  const pixelWidth = Math.max(1, Math.ceil(width));
  const pixelHeight = Math.max(1, Math.ceil(height));
  const key = `vine-cluster:${pixelWidth}x${pixelHeight}`;
  if (visualSpriteCache.has(key)) return visualSpriteCache.get(key);

  const buffer = document.createElement("canvas");
  buffer.width = Math.ceil(pixelWidth * 1.12);
  buffer.height = pixelHeight;
  const bufferCtx = buffer.getContext("2d");
  const centerX = buffer.width / 2;
  bufferCtx.globalAlpha = 0.97;
  bufferCtx.drawImage(visualImages.vine, centerX - pixelWidth / 2, 0, pixelWidth, pixelHeight);
  bufferCtx.save();
  bufferCtx.translate(centerX + 3, 0);
  bufferCtx.scale(-1, 1);
  bufferCtx.globalAlpha = 0.42;
  bufferCtx.drawImage(visualImages.vine, -pixelWidth * 0.41, 0, pixelWidth * 0.82, pixelHeight * 0.84);
  bufferCtx.restore();
  visualSpriteCache.set(key, buffer);
  return buffer;
}

function warmFengxiVisualSprites() {
  const treeWidth = 32 * 4;
  const treeHeight = (arena.height - arena.padding * 2) / 2;
  getVineClusterSprite(treeWidth * 1.22, treeHeight * 1.1);

  const maxVineHeight = Math.min(210, arena.height * 0.34);
  getScaledVisualSprite(visualImages.vine, "seal-vine", maxVineHeight * 0.66, maxVineHeight);

  const maxFieldWidth = Math.min(330, arena.width * 0.42);
  const maxFieldHeight = maxFieldWidth * (visualImages.sealCircle.naturalHeight / visualImages.sealCircle.naturalWidth || 0.7);
  getScaledVisualSprite(
    visualImages.sealCircle,
    "seal-energy-green",
    maxFieldWidth,
    maxFieldHeight,
    "hue-rotate(78deg) saturate(1.2) brightness(1.18)",
  );
}

function warmDanjinVisualSprites() {
  getDanjinMagicCircleSprite(620, "#fff0a4");
  getDanjinEyeSprite(76);
}

function applyAi(fighter, enemy, dt) {
  if (fighter.hidden || fighter.trapped) return;

  const speedLimit = getCurrentSpeed(fighter);
  const currentSpeed = length(fighter.vx, fighter.vy);
  if (currentSpeed < speedLimit * 0.86) {
    const dir = normalize(fighter.vx, fighter.vy);
    fighter.vx += dir.x * speedLimit * 0.7 * dt;
    fighter.vy += dir.y * speedLimit * 0.7 * dt;
  }

  const edgeForce = getSoftEdgeForce(fighter);
  fighter.vx += edgeForce.x * speedLimit * 1.4 * dt;
  fighter.vy += edgeForce.y * speedLimit * 1.4 * dt;

  if (enemy && !enemy.hidden) {
    const enemyDistance = length(enemy.x - fighter.x, enemy.y - fighter.y);
    if (enemyDistance > 360) {
      const toEnemy = normalize(enemy.x - fighter.x, enemy.y - fighter.y);
      fighter.vx += toEnemy.x * speedLimit * 0.18 * dt;
      fighter.vy += toEnemy.y * speedLimit * 0.18 * dt;
    }
  }

  fighter.vx *= 0.9995;
  fighter.vy *= 0.9995;

  const nextSpeed = length(fighter.vx, fighter.vy);
  if (nextSpeed > speedLimit) {
    fighter.vx = (fighter.vx / nextSpeed) * speedLimit;
    fighter.vy = (fighter.vy / nextSpeed) * speedLimit;
  }
}

function getSoftEdgeForce(fighter) {
  const margin = 86;
  const minX = arena.padding + fighter.radius;
  const maxX = arena.width - arena.padding - fighter.radius;
  const minY = arena.padding + fighter.radius;
  const maxY = arena.height - arena.padding - fighter.radius;
  let x = 0;
  let y = 0;
  if (fighter.x - minX < margin) x += (margin - (fighter.x - minX)) / margin;
  if (maxX - fighter.x < margin) x -= (margin - (maxX - fighter.x)) / margin;
  if (fighter.y - minY < margin) y += (margin - (fighter.y - minY)) / margin;
  if (maxY - fighter.y < margin) y -= (margin - (maxY - fighter.y)) / margin;
  return { x, y };
}

function getCurrentSpeed(fighter) {
  const skillSpeed = fighter.skill?.active ? fighter.skill.speedMultiplier : 1;
  const boostSpeed = fighter.skills?.boost?.activeRemaining > 0 ? fighter.skills.boost.speedMultiplier : 1;
  return fighter.speed * fighterSpeedMultiplier * skillSpeed * boostSpeed * fighter.slowMultiplier;
}

function isSquadController(fighter) {
  return Boolean(fighter?.isSquad);
}

function getCombatBodies(controller) {
  if (!controller) return [];
  return isSquadController(controller)
    ? controller.units.filter((unit) => unit.hp > 0 && !unit.hidden)
    : controller.hp > 0 && !controller.hidden ? [controller] : [];
}

function getControllerForBody(body) {
  return body?.controller || body;
}

function getControllerByIdOrTeam(idOrTeam) {
  return fighters.find((fighter) => fighter.id === idOrTeam || fighter.teamId === idOrTeam);
}

function getTeamControllers(teamId) {
  return fighters.filter((fighter) => fighter.teamId === teamId);
}

function getEnemyControllers(controller) {
  if (!controller) return [];
  return fighters.filter((fighter) => fighter.teamId !== controller.teamId);
}

function getOpponentController(bodyOrController) {
  const own = getControllerForBody(bodyOrController);
  return getEnemyControllers(own).find((fighter) => fighter.hp > 0) || getEnemyControllers(own)[0] || null;
}

function getEnemyBodies(ownerId) {
  const owner = getControllerByIdOrTeam(ownerId);
  if (!owner) return [];
  return getEnemyControllers(owner).flatMap(getCombatBodies);
}

function findCombatBodyById(id) {
  for (const fighter of fighters) {
    if (fighter.id === id) return fighter;
    if (isSquadController(fighter)) {
      const unit = fighter.units.find((item) => item.id === id);
      if (unit) return unit;
    }
  }
  return null;
}

function selectTarget(attacker, opponent) {
  const own = getControllerForBody(attacker);
  const targets = opponent && opponent.teamId !== own.teamId
    ? getCombatBodies(opponent)
    : getEnemyBodies(own.id);
  if (!targets.length) return null;
  return targets.reduce((nearest, candidate) => {
    if (!nearest) return candidate;
    return length(candidate.x - attacker.x, candidate.y - attacker.y) < length(nearest.x - attacker.x, nearest.y - attacker.y)
      ? candidate
      : nearest;
  }, null);
}

function isTeamDefeated(teamId) {
  return getTeamControllers(teamId).every((fighter) => fighter.hp <= 0);
}

function getTeamWinnerAgainst(teamId) {
  return fighters.find((fighter) => fighter.teamId !== teamId && fighter.hp > 0)
    || fighters.find((fighter) => fighter.teamId !== teamId)
    || null;
}

function finishIfTeamDefeated(controller) {
  if (!controller || gameOver || roundEnding) return;
  if (!isTeamDefeated(controller.teamId)) return;
  const winner = getTeamWinnerAgainst(controller.teamId);
  if (winner) scheduleRoundFinish(winner);
}

function updateSkill(fighter, enemy, dt) {
  updateSealState(fighter, dt);
  if (fighter.frozenRemaining > 0) return;
  if (isFrozenByXuhuai(fighter)) return;
  if (fighter.sealed) return;

  if (fighter.role === "infinite") {
    updateInfiniteSkills(fighter, enemy, dt);
    return;
  }

  if (fighter.role === "fengxi") {
    updateFengxiSkills(fighter, enemy, dt);
    return;
  }

  if (fighter.role === "fengxiDomain") {
    updateFengxiDomainSkills(fighter, enemy, dt);
    return;
  }

  if (fighter.role === "xuhuai") {
    updateXuhuaiSkills(fighter, dt);
    return;
  }

  if (fighter.role === "chinian") {
    updateChinianSkills(fighter, dt);
    return;
  }

  if (fighter.role === "scythe") {
    updateScytheSkill(fighter, enemy, dt);
    return;
  }

  if (fighter.role === "qingquan") {
    updateTwinBladeSkill(fighter, enemy, dt);
    return;
  }

  if (fighter.role === "dasong") {
    updateDasongSkill(fighter, enemy, dt);
    return;
  }

  if (fighter.role === "lingyao") {
    updateLingyaoSkills(fighter, enemy, dt);
    return;
  }

  if (fighter.role === "luye") {
    updateLuyeSkills(fighter, enemy, dt);
    return;
  }

  if (fighter.role === "ximuzi") {
    updateXimuziSkills(fighter, enemy, dt);
    return;
  }

  if (fighter.role === "nezha") {
    updateNezhaSkills(fighter, dt);
    return;
  }

  if (fighter.role === "agen") {
    updateAgenSkills(fighter, enemy, dt);
    return;
  }

  if (fighter.role === "qidao") {
    updateQidaoSkills(fighter, enemy, dt);
    return;
  }

  if (fighter.role === "xuanli") {
    updateXuanliSkills(fighter, enemy, dt);
    return;
  }

  if (fighter.role === "luoxiaohei") {
    updateLuoxiaoheiSkills(fighter, enemy, dt);
    return;
  }

  if (fighter.role === "jiulao") {
    updateJiulaoSkills(fighter, enemy, dt);
    return;
  }

  if (fighter.role === "zhiqing") {
    updateZhiqingSkills(fighter, enemy, dt);
    return;
  }

  if (fighter.role === "mingwang") {
    updateMingwangSkills(fighter, dt);
    return;
  }

  const skill = fighter.skill;
  if (skill.active) {
    skill.remaining -= dt;
    if (skill.remaining <= 0) {
      endSkill(fighter);
    }
    return;
  }

  skill.cooldownRemaining = Math.max(0, skill.cooldownRemaining - dt);
  if (skill.cooldownRemaining > 0) return;

  if (shouldTriggerSkill(fighter)) {
    startSkill(fighter, enemy);
  }
}

function updateSlowState(fighter, dt) {
  if (fighter.slowRemaining <= 0) return;
  fighter.slowRemaining = Math.max(0, fighter.slowRemaining - dt);
  if (fighter.slowRemaining <= 0) {
    fighter.slowMultiplier = 1;
  }
}

function updateElementalStates(fighter, dt) {
  if (fighter.frozenRemaining > 0) {
    fighter.frozenRemaining = Math.max(0, fighter.frozenRemaining - dt);
  }

  if (fighter.burnRemaining <= 0) return;
  fighter.burnRemaining = Math.max(0, fighter.burnRemaining - dt);
  fighter.burnTickRemaining -= dt;
  while (fighter.burnRemaining > 0 && fighter.burnTickRemaining <= 0 && fighter.hp > 0) {
    damage(fighter, 1, { x: fighter.x, y: fighter.y, kind: "blue-burn" });
    fighter.burnTickRemaining += 1;
  }
  if (fighter.burnRemaining <= 0) {
    fighter.burnTickRemaining = 0;
  }
}

function updateGlobalFreeze(dt) {
  if (!globalFreeze.active) return;
  globalFreeze.remaining = Math.max(0, globalFreeze.remaining - dt);
  if (globalFreeze.remaining <= 0) {
    globalFreeze.active = false;
    globalFreeze.duration = 0;
    globalFreeze.casterId = null;
    globalFreeze.casterTeamId = null;
  }
}

function isFrozenByXuhuai(fighter) {
  if (!globalFreeze.active || !fighter) return false;
  const controller = getControllerForBody(fighter);
  return controller?.teamId !== globalFreeze.casterTeamId;
}

function updateSealState(fighter, dt) {
  if (!fighter.sealed) return;
  fighter.sealRemaining = Math.max(0, fighter.sealRemaining - dt);
  if (fighter.sealRemaining <= 0) {
    fighter.sealed = false;
    const sealer = fighters?.find((item) => item.id === fighter.sealedById);
  if (sealer?.role === "fengxi") {
      sealer.color = "#48b88a";
    }
    fighter.sealedById = null;
  }
}

function updateInfiniteSkills(fighter, enemy, dt) {
  const rebarSkill = fighter.skills.rebar;
  const blackHoleSkill = fighter.skills.blackHole;

  if (!fighter.hidden) {
    rebarSkill.cooldownRemaining = Math.max(0, rebarSkill.cooldownRemaining - dt);
  }
  blackHoleSkill.cooldownRemaining = Math.max(0, blackHoleSkill.cooldownRemaining - dt);

  if (!fighter.hidden && rebarSkill.cooldownRemaining <= 0) {
    summonRebar(fighter, enemy);
    rebarSkill.cooldownRemaining = rebarSkill.cooldown;
  }

  if (!fighter.hidden && blackHoleSkill.cooldownRemaining <= 0) {
    summonBlackHole(fighter, blackHoleSkill);
    blackHoleSkill.cooldownRemaining = blackHoleSkill.cooldown;
  }
}

function updateFengxiSkills(fighter, enemy, dt) {
  const treeSkill = fighter.skills.tree;
  const sealSkill = fighter.skills.seal;

  if (!sealSkill.used && fighter.hp <= sealSkill.hpBelow) {
    sealSkill.ready = true;
  }

  treeSkill.cooldownRemaining = Math.max(0, treeSkill.cooldownRemaining - dt);
  if (treeSkill.cooldownRemaining <= 0) {
    summonTree(fighter, enemy, treeSkill);
    treeSkill.cooldownRemaining = treeSkill.cooldown;
  }
}

function updateFengxiDomainSkills(fighter, enemy, dt) {
  const treeSkill = fighter.skills.tree;
  const domainSkill = fighter.skills.domain;

  treeSkill.cooldownRemaining = Math.max(0, treeSkill.cooldownRemaining - dt);
  domainSkill.cooldownRemaining = Math.max(0, domainSkill.cooldownRemaining - dt);

  if (treeSkill.cooldownRemaining <= 0) {
    summonTree(fighter, enemy, treeSkill);
    treeSkill.cooldownRemaining = treeSkill.cooldown;
  }

  if (domainSkill.cooldownRemaining <= 0) {
    summonFengxiDomainLines(fighter, enemy, domainSkill);
    domainSkill.cooldownRemaining = domainSkill.cooldown;
  }
}

function updateXuhuaiSkills(fighter, dt) {
  const skill = fighter.skills.iceBurst;
  skill.cooldownRemaining = Math.max(0, skill.cooldownRemaining - dt);
  if (skill.cooldownRemaining <= 0) {
    summonIceBurst(fighter, skill);
    skill.cooldownRemaining = skill.cooldown;
  }
}

function updateChinianSkills(fighter, dt) {
  const skill = fighter.skills.earth;
  skill.cooldownRemaining = Math.max(0, skill.cooldownRemaining - dt);
  if (skill.cooldownRemaining <= 0) {
    summonEarthPillars(fighter, skill);
    skill.cooldownRemaining = skill.cooldown;
  }
}

function updateScytheSkill(fighter, enemy, dt) {
  const skill = fighter.skills.scythe;
  skill.angle += skill.spinSpeed * dt;
  skill.hitCooldown = Math.max(0, skill.hitCooldown - dt);
  if (skill.thrown) {
    skill.returnRemaining = Math.max(0, skill.returnRemaining - dt);
    if (skill.returnRemaining <= 0) {
      skill.thrown = false;
      addRing(fighter.x, fighter.y, fighter.accent, 0.6);
    }
    return;
  }

  if (!skill.flyingUsed && fighter.hp <= 10) {
    throwFlyingScythe(fighter, enemy, skill);
    return;
  }

  if (!enemy || enemy.hidden || enemy.trapped || enemy.immune || skill.hitCooldown > 0) return;
  if (!scytheHitsFighter(fighter, enemy, skill.angle)) return;

  const hit = getScytheBladePoint(fighter, skill.angle);
  damage(enemy, skill.damage, hit);
  audio?.playSfx("scytheHit");
  skill.hitCooldown = 0.75;
  addSparks(hit.x, hit.y, fighter.accent, 16);
  addRing(hit.x, hit.y, fighter.accent, 0.55);
}

function updateXimuziSkills(fighter, enemy, dt) {
  const fan = fighter.skills.fan;
  const dream = fighter.skills.dream;
  fan.cooldownRemaining = Math.max(0, fan.cooldownRemaining - dt);
  dream.activeRemaining = Math.max(0, dream.activeRemaining - dt);

  if (fan.cooldownRemaining <= 0) {
    throwFoldingFan(fighter, enemy, fan);
    fan.cooldownRemaining = fan.cooldown;
  }

  if (!dream.used && fighter.hp > 0 && fighter.hp <= dream.hpBelow) {
    triggerXimuziDream(fighter, enemy, dream);
  }
}

function throwFoldingFan(caster, target, skill) {
  if (!target) return;
  const speed = 315;
  const aim = getProjectileAim(caster.x, caster.y, target, speed, 0.08, 0.34);
  foldingFans.push({
    ownerId: caster.id,
    targetId: target.id,
    x: caster.x + aim.x * (caster.radius + 18),
    y: caster.y + aim.y * (caster.radius + 18),
    vx: aim.x * speed,
    vy: aim.y * speed,
    speed,
    angle: Math.atan2(aim.y, aim.x),
    spinAngle: 0,
    spin: caster.id === "red" ? 24 : -24,
    radius: 24,
    damage: skill.damage,
    life: 2.4,
    age: 0,
  });
  audio?.playSfx("wire");
  addRing(caster.x, caster.y, caster.accent, 0.58);
}

function triggerXimuziDream(caster, target, skill) {
  if (!target) return;
  skill.used = true;
  skill.activeRemaining = skill.freezeDuration;
  target.trapped = true;
  target.vx = 0;
  target.vy = 0;
  dreamTrances.push({
    ownerId: caster.id,
    targetId: target.id,
    remaining: skill.freezeDuration,
    damage: skill.damage,
  });
  audio?.playSfx("seal");
  addUltimateEffect("ximuzi", arena.width / 2, arena.height / 2);
  addDamageText(caster.x, caster.y - caster.radius - 14, "戏梦", "#ff8f72");
  addRing(target.x, target.y, "#d3232d", 0.98);
  addSparks(target.x, target.y, "#ff6b59", 24);
}

function updateNezhaSkills(fighter, dt) {
  const fire = fighter.skills.fire;
  if (fire.burstRemaining > 0) {
    fire.burstRemaining = Math.max(0, fire.burstRemaining - dt);
  }

  const qiankun = fighter.skills.qiankun;
  if (!qiankun.used && fighter.hp > 0 && fighter.hp <= qiankun.hpBelow) {
    activateNezhaQiankun(fighter);
  }
  if (!qiankun.active) return;
  qiankun.rings.forEach((ring, index) => {
    if (!ring.active) return;
    ring.angle += ring.spinSpeed * dt;
    ring.bob = Math.sin(elapsed * 4.2 + index * 1.4) * 2.2;
  });
}

function activateNezhaQiankun(fighter) {
  const qiankun = fighter.skills.qiankun;
  if (!qiankun || qiankun.used) return;
  qiankun.used = true;
  qiankun.active = true;
  qiankun.rings = Array.from({ length: 4 }, (_, index) => ({
    active: true,
    angle: index * (Math.PI / 2) + (fighter.id === "red" ? -0.2 : 0.2),
    spinSpeed: (fighter.id === "red" ? 1 : -1) * 1.85,
    bob: 0,
  }));
  audio?.playSfx("seal");
  addDamageText(fighter.x, fighter.y - fighter.radius - 16, "乾坤圈", "#ffd36a");
  addRing(fighter.x, fighter.y, "#ffd36a", 1.05);
  addSparks(fighter.x, fighter.y, "#ffdf78", 28);
}

function resolveNezhaCollisionDamage(attacker) {
  const baseDamage = attacker.collision.damage;
  if (attacker.role !== "nezha") return baseDamage;
  const skill = attacker.skills?.fire;
  if (!skill) return baseDamage;
  skill.hitCount += 1;
  if (skill.hitCount < skill.hitsRequired) return baseDamage;

  skill.hitCount = 0;
  skill.burstRemaining = skill.burstDuration;
  audio?.playSfx("earth");
  addRing(attacker.x, attacker.y, "#ff6a2a", 1.14);
  addSparks(attacker.x, attacker.y, "#ff7a24", 32);
  addSparks(attacker.x, attacker.y, "#ffd45f", 18);
  return skill.burstDamage;
}

function updateAgenSkills(fighter, enemy, dt) {
  const skill = fighter.skills.elemental;
  skill.cooldownRemaining = Math.max(0, skill.cooldownRemaining - dt);
  if (!enemy || enemy.hidden || enemy.immune || skill.cooldownRemaining > 0) return;
  launchAgenProjectile(fighter, enemy, skill.nextType, skill);
  skill.nextType = skill.nextType === "ice" ? "flame" : "ice";
  skill.cooldownRemaining = skill.cooldown;
}

function launchAgenProjectile(caster, target, type, skill) {
  const speed = type === "ice" ? 335 : 292;
  const aim = getProjectileAim(caster.x, caster.y, target, speed, 0.08, 0.32);
  const radius = type === "ice" ? 16 : 19;
  agenProjectiles.push({
    ownerId: caster.id,
    targetId: target.id,
    type,
    x: caster.x + aim.x * (caster.radius + radius + 4),
    y: caster.y + aim.y * (caster.radius + radius + 4),
    vx: aim.x * speed,
    vy: aim.y * speed,
    speed,
    radius,
    damage: type === "ice" ? skill.iceDamage : skill.flameDamage,
    freezeDuration: skill.freezeDuration,
    burnDuration: skill.burnDuration,
    burnDamagePerSecond: skill.burnDamagePerSecond,
    age: 0,
    life: 3.2,
    spin: type === "ice" ? 0 : (caster.id === "red" ? 5.4 : -5.4),
    pulseSeed: Math.random() * Math.PI * 2,
  });
  audio?.playSfx(type === "ice" ? "ice" : "earth");
  addSparks(caster.x, caster.y, type === "ice" ? "#c9f7ff" : "#66ddff", 12);
}

function updateQidaoSkills(fighter, enemy, dt) {
  const gather = fighter.skills.gatherStone;
  gather.cooldownRemaining = Math.max(0, gather.cooldownRemaining - dt);
  const selfDestruct = fighter.skills.selfDestruct;
  selfDestruct.ready = !selfDestruct.used && fighter.hp > 0 && fighter.hp <= selfDestruct.hpBelow;
  if (!enemy || enemy.hidden || enemy.immune || gather.cooldownRemaining > 0) return;
  summonQidaoGatherStone(fighter, enemy, gather);
  gather.cooldownRemaining = gather.cooldown;
}

function summonQidaoGatherStone(caster, target, skill) {
  const centerX = caster.x;
  const centerY = caster.y;
  const gatherDuration = 0.92;
  const origins = Array.from({ length: 12 }, (_, index) => {
    const side = index % 4;
    const lane = Math.floor(index / 4);
    const offset = (lane - 1) * 76 + Math.sin(index * 1.7) * 18;
    if (side === 0) return { x: arena.padding - 12, y: clamp(centerY - 138 + offset, arena.padding, arena.height - arena.padding) };
    if (side === 1) return { x: arena.width - arena.padding + 12, y: clamp(centerY + 118 - offset, arena.padding, arena.height - arena.padding) };
    if (side === 2) return { x: clamp(centerX - 168 + offset, arena.padding, arena.width - arena.padding), y: arena.padding - 12 };
    return { x: clamp(centerX + 154 - offset, arena.padding, arena.width - arena.padding), y: arena.height - arena.padding + 12 };
  });
  qidaoRocks.push({
    ownerId: caster.id,
    targetId: target.id,
    x: centerX,
    y: centerY,
    vx: 0,
    vy: 0,
    radius: 34,
    damage: skill.damage,
    phase: "gather",
    gatherDuration,
    age: 0,
    life: 4,
    speed: 318,
    launched: false,
    spin: caster.id === "red" ? 3.2 : -3.2,
    angle: 0,
    origins: origins.map((origin, index) => ({
      ...origin,
      radius: 5.2 + (index % 4) * 1.6 + Math.floor(index / 4) * 0.7,
      seed: Math.random() * Math.PI * 2,
    })),
  });
  audio?.playSfx("earth");
  addRing(caster.x, caster.y, "#d0a15f", 0.9);
  addSparks(caster.x, caster.y, "#c08a52", 22);
}

function updateXuanliSkills(fighter, enemy, dt) {
  const skill = fighter.skills.icefire;
  const ultimate = fighter.skills.doubleHeaven;
  skill.cooldownRemaining = Math.max(0, skill.cooldownRemaining - dt);

  if (
    ultimate &&
    !ultimate.used &&
    fighter.hp < ultimate.hpBelow &&
    enemy &&
    !enemy.hidden &&
    !enemy.immune
  ) {
    summonXuanliDoubleHeaven(fighter, enemy, ultimate);
  }

  if (!enemy || enemy.hidden || enemy.immune || skill.cooldownRemaining > 0) return;
  launchXuanliPair(fighter, enemy, skill);
  skill.cooldownRemaining = skill.cooldown;
}

function updateLuoxiaoheiSkills(fighter, enemy, dt) {
  const metal = fighter.skills.metal;
  const teleport = fighter.skills.teleport;
  const clone = fighter.skills.clone;
  const metalSealed = isDanjinSealingMetalSkills(fighter);
  if (!metalSealed) {
    metal.cooldownRemaining = Math.max(0, metal.cooldownRemaining - dt);
  }
  teleport.cooldownRemaining = Math.max(0, teleport.cooldownRemaining - dt);

  if (!clone.used && fighter.hp > 0 && fighter.hp < clone.hpBelow && enemy && !enemy.hidden && !enemy.immune) {
    activateLuoxiaoheiClones(fighter, enemy, clone);
  }

  if (!enemy || enemy.hidden || enemy.immune) return;
  if (!metalSealed && metal.cooldownRemaining <= 0) {
    launchLuoxiaoheiMetalPlate(fighter, enemy, metal);
    metal.cooldownRemaining = metal.cooldown;
  }
  if (teleport.cooldownRemaining <= 0 && !fighter.hidden && !fighter.trapped) {
    triggerLuoxiaoheiTeleport(fighter, enemy, teleport);
    teleport.cooldownRemaining = teleport.cooldown;
  }
}

function launchLuoxiaoheiMetalPlate(caster, target, skill) {
  const speed = 338;
  const aim = getProjectileAim(caster.x, caster.y, target, speed, 0.08, 0.38);
  const side = caster.id === "red" ? 1 : -1;
  luoxiaoheiMetalPlates.push({
    ownerId: caster.id,
    targetId: target.id,
    x: caster.x + aim.x * (caster.radius + 24),
    y: caster.y + aim.y * (caster.radius + 24),
    vx: aim.x * speed,
    vy: aim.y * speed,
    speed,
    radius: 22,
    damage: skill.damage,
    age: 0,
    life: 3.1,
    turnRate: 2.7,
    curve: side * 0.54,
    spin: side * 8.4,
    spinAngle: 0,
  });
  audio?.playSfx("wire");
  addRing(caster.x, caster.y, "#a8b3a8", 0.62);
  addSparks(caster.x, caster.y, "#c9d0c7", 12);
}

function triggerLuoxiaoheiTeleport(caster, target, skill) {
  const angle = Math.atan2(target.y - caster.y, target.x - caster.x);
  const side = caster.id === "red" ? -1 : 1;
  const exitAngle = angle + Math.PI * 0.72 * side;
  const exitDistance = target.radius + caster.radius + 24;
  const exitX = clamp(target.x + Math.cos(exitAngle) * exitDistance, arena.padding + caster.radius, arena.width - arena.padding - caster.radius);
  const exitY = clamp(target.y + Math.sin(exitAngle) * exitDistance, arena.padding + caster.radius, arena.height - arena.padding - caster.radius);
  caster.hidden = true;
  caster.trapped = true;
  caster.vx = 0;
  caster.vy = 0;
  luoxiaoheiTeleports.push({
    ownerId: caster.id,
    targetId: target.id,
    entryX: caster.x,
    entryY: caster.y,
    exitX,
    exitY,
    age: 0,
    duration: 0.92,
    emergeAt: 0.46,
    damage: skill.damage,
    hit: false,
  });
  audio?.playSfx("seal");
  addRing(caster.x, caster.y, "#2a2f35", 0.72);
}

function activateLuoxiaoheiClones(caster, target, skill) {
  skill.used = true;
  const baseAngle = Math.atan2(target.y - caster.y, target.x - caster.x);
  for (let i = 0; i < skill.count; i += 1) {
    const angle = baseAngle + i * (Math.PI * 2 / skill.count);
    luoxiaoheiClones.push({
      ownerId: caster.id,
      targetId: target.id,
      x: caster.x + Math.cos(angle) * (caster.radius + 22),
      y: caster.y + Math.sin(angle) * (caster.radius + 22),
      orbitAngle: angle,
      phase: "hold",
      holdRemaining: skill.holdDuration,
      age: 0,
      orbitSpeed: 2.35,
      vx: 0,
      vy: 0,
      speed: 380 + i * 12,
      radius: 8.5,
      damage: skill.damage,
      life: skill.holdDuration + 2.4,
      wobble: Math.random() * Math.PI * 2,
    });
  }
  audio?.playSfx("seal");
  addDamageText(caster.x, caster.y - caster.radius - 16, "分身", "#dff7d7");
  addRing(caster.x, caster.y, "#9ed78f", 0.95);
  addSparks(caster.x, caster.y, "#c6f3bc", 22);
}

function updateJiulaoSkills(fighter, enemy, dt) {
  const insight = fighter.skills.insight;
  const thorn = fighter.skills.thorn;
  insight.cooldownRemaining = Math.max(0, insight.cooldownRemaining - dt);
  thorn.cooldownRemaining = Math.max(0, thorn.cooldownRemaining - dt);

  if (insight.cooldownRemaining <= 0) {
    summonJiulaoInsightZone(fighter, insight);
    insight.cooldownRemaining = insight.cooldown;
  }

  if (!enemy || enemy.hidden || enemy.immune || thorn.cooldownRemaining > 0) return;
  summonJiulaoMetalThorn(fighter, enemy, thorn);
  thorn.cooldownRemaining = thorn.cooldown;
}

function summonJiulaoInsightZone(caster, skill) {
  const radius = skill.radius;
  const x = arena.padding + radius + Math.random() * (arena.width - arena.padding * 2 - radius * 2);
  const y = arena.padding + radius + Math.random() * (arena.height - arena.padding * 2 - radius * 2);
  jiulaoInsightZones.push({
    ownerId: caster.id,
    ownerTeamId: caster.teamId,
    x,
    y,
    radius,
    damage: skill.damage,
    slowDuration: skill.slowDuration,
    slowMultiplier: skill.slowMultiplier,
    age: 0,
    duration: skill.duration,
    hitIds: new Set(),
    spin: (caster.id === "red" ? 1 : -1) * (0.8 + Math.random() * 0.35),
    seed: Math.random() * Math.PI * 2,
  });
  audio?.playSfx("seal");
  addRing(x, y, "#d7e2ea", 0.7);
}

function summonJiulaoMetalThorn(caster, target, skill) {
  const lead = clamp(length(target.x - caster.x, target.y - caster.y) / 430, 0.08, 0.28);
  const aim = normalize(target.x + target.vx * lead - caster.x, target.y + target.vy * lead - caster.y);
  const side = caster.id === "red" ? 1 : -1;
  jiulaoMetalThorns.push({
    ownerId: caster.id,
    targetId: target.id,
    x: caster.x,
    y: caster.y,
    dirX: aim.x,
    dirY: aim.y,
    angle: Math.atan2(aim.y, aim.x),
    length: Math.min(390, Math.max(210, length(target.x - caster.x, target.y - caster.y) + 58)),
    damage: skill.damage,
    age: 0,
    life: 0.82,
    hitIds: new Set(),
    side,
    sway: 0.18 + Math.random() * 0.12,
  });
  audio?.playSfx("wire");
  addRing(caster.x, caster.y, "#b9c1c6", 0.62);
  addSparks(caster.x + aim.x * caster.radius, caster.y + aim.y * caster.radius, "#d4dbe0", 12);
}

function updateZhiqingSkills(fighter, enemy, dt) {
  const skill = fighter.skills.gatherStone;
  const burst = fighter.skills.earthBurst;
  let burstActive = zhiqingScatterRocks.some((item) => item.kind === "burst" && item.ownerId === fighter.id);
  if (burst && !burst.used && fighter.hp > 0 && fighter.hp < burst.hpBelow && !burstActive) {
    summonZhiqingEarthBurst(fighter, enemy, burst);
    burstActive = true;
  }

  skill.cooldownRemaining = Math.max(0, skill.cooldownRemaining - dt);
  if (burstActive) return;
  if (skill.cooldownRemaining > 0) return;
  summonZhiqingScatterRocks(fighter, skill);
  skill.cooldownRemaining = skill.cooldown;
}

function updateMingwangSkills(fighter, dt) {
  const boost = fighter.skills.boost;
  const heal = fighter.skills.heal;
  const revive = fighter.skills.revive;

  boost.cooldownRemaining = Math.max(0, boost.cooldownRemaining - dt);
  boost.activeRemaining = Math.max(0, boost.activeRemaining - dt);
  heal.effectRemaining = Math.max(0, heal.effectRemaining - dt);
  revive.effectRemaining = Math.max(0, revive.effectRemaining - dt);

  if (heal.lastObservedHp === undefined) heal.lastObservedHp = fighter.hp;
  if (fighter.hp > 0 && fighter.hp < heal.lastObservedHp) {
    triggerMingwangHealing(fighter, heal.lastObservedHp, fighter.hp);
  }
  heal.lastObservedHp = fighter.hp;

  if (boost.cooldownRemaining > 0 || boost.activeRemaining > 0) return;
  activateMingwangBoost(fighter);
}

function activateMingwangBoost(fighter) {
  const boost = fighter.skills.boost;
  boost.activeRemaining = boost.duration;
  boost.cooldownRemaining = boost.cooldown;
  audio?.playSfx("seal");
  addRing(fighter.x, fighter.y, "#ffb7a8", 1.05);
  addSparks(fighter.x, fighter.y, "#ff6b6b", 24);
  addDamageText(fighter.x, fighter.y - fighter.radius - 18, "强化", "#ffb7a8");
}

function healFighter(fighter, amount, label = "治愈") {
  const before = fighter.hp;
  fighter.hp = clamp(fighter.hp + amount, 0, fighter.maxHp);
  const actualHeal = Math.round(fighter.hp - before);
  if (actualHeal <= 0) return;
  audio?.playSfx("seal");
  addDamageText(fighter.x, fighter.y - fighter.radius - 28, `+${actualHeal}`, "#ff6b6b");
  addDamageText(fighter.x, fighter.y - fighter.radius - 52, label, "#ff9b9b");
  addRing(fighter.x, fighter.y, "#ff6b6b", 0.9);
  addSparks(fighter.x, fighter.y, "#ff8b8b", 22);
  if (fighter.role === "mingwang" && fighter.skills?.heal) {
    fighter.skills.heal.lastObservedHp = fighter.hp;
  }
}

function triggerMingwangHealing(fighter, beforeHp, afterDamageHp) {
  if (fighter.role !== "mingwang" || fighter.hp <= 0) return;
  const heal = fighter.skills?.heal;
  if (!heal) return;
  for (const threshold of heal.thresholds) {
    if (threshold.used) continue;
    if (beforeHp < threshold.hpBelow || afterDamageHp >= threshold.hpBelow) continue;
    threshold.used = true;
    heal.effectRemaining = 1.35;
    healFighter(fighter, heal.amount, "治愈");
  }
}

function triggerMingwangReviveIfLethal(fighter) {
  if (fighter.role !== "mingwang") return false;
  const revive = fighter.skills?.revive;
  if (!revive || revive.used) return false;
  revive.used = true;
  revive.effectRemaining = 1.8;
  fighter.hp = clamp(revive.amount, 0, fighter.maxHp);
  if (fighter.skills?.heal) fighter.skills.heal.lastObservedHp = fighter.hp;
  fighter.hidden = false;
  const boost = fighter.skills.boost;
  boost.cooldownRemaining = 0;
  boost.activeRemaining = 0;
  addUltimateEffect("mingwangRevive", fighter.x, fighter.y);
  activateMingwangBoost(fighter);
  addDamageText(fighter.x, fighter.y - fighter.radius - 72, `+${revive.amount}`, "#ff6b6b");
  addDamageText(fighter.x, fighter.y - fighter.radius - 48, "复生", "#ffb7a8");
  addRing(fighter.x, fighter.y, "#ff6b6b", 1.45);
  addSparks(fighter.x, fighter.y, "#ffc2ba", 42);
  audio?.playSfx("seal");
  return true;
}

function summonZhiqingScatterRocks(caster, skill) {
  const centerX = caster.x;
  const centerY = caster.y;
  const origins = Array.from({ length: 18 }, (_, index) => {
    const side = index % 4;
    const lane = Math.floor(index / 4);
    const offset = (lane - 2) * 54 + Math.sin(index * 1.9) * 20;
    if (side === 0) return { x: arena.padding - 16, y: clamp(centerY - 126 + offset, arena.padding, arena.height - arena.padding) };
    if (side === 1) return { x: arena.width - arena.padding + 16, y: clamp(centerY + 126 - offset, arena.padding, arena.height - arena.padding) };
    if (side === 2) return { x: clamp(centerX - 148 + offset, arena.padding, arena.width - arena.padding), y: arena.padding - 16 };
    return { x: clamp(centerX + 148 - offset, arena.padding, arena.width - arena.padding), y: arena.height - arena.padding + 16 };
  });
  zhiqingScatterRocks.push({
    kind: "cluster",
    ownerId: caster.id,
    ownerTeamId: caster.teamId,
    x: centerX,
    y: centerY,
    damage: skill.damage,
    projectileCount: skill.projectileCount,
    gatherDuration: skill.gatherDuration,
    age: 0,
    life: skill.gatherDuration + 0.12,
    origins: origins.map((origin, index) => ({
      ...origin,
      radius: 4.6 + (index % 5) * 1.1,
      seed: Math.random() * Math.PI * 2,
    })),
  });
  audio?.playSfx("earth");
  addRing(centerX, centerY, "#d6a260", 0.82);
  addSparks(centerX, centerY, "#b77a42", 24);
}

function summonZhiqingEarthBurst(caster, enemy, skill) {
  skill.used = true;
  const centerX = caster.x;
  const centerY = caster.y;
  const target = selectTarget(caster, enemy) || getEnemyBodies(caster.id).find((body) => body.hp > 0);
  zhiqingScatterRocks.push({
    kind: "burst",
    ownerId: caster.id,
    ownerTeamId: caster.teamId,
    x: centerX,
    y: centerY,
    targetId: target?.id || null,
    damage: skill.damage,
    projectileCount: skill.projectileCount,
    duration: skill.duration,
    fireInterval: skill.duration / skill.projectileCount,
    fired: 0,
    nextFireAt: 0,
    age: 0,
    life: skill.duration + 0.18,
    origins: Array.from({ length: 24 }, (_, index) => {
      const angle = index * Math.PI * 2 / 24;
      return {
        angle,
        distance: 48 + (index % 6) * 8,
        radius: 4.8 + (index % 5) * 1.2,
        seed: Math.random() * Math.PI * 2,
      };
    }),
  });
  addUltimateEffect("zhiqingEarthBurst", centerX, centerY);
  audio?.playSfx("earth");
  addDamageText(centerX, centerY - caster.radius - 42, "土暴", "#f1bc70");
  addRing(centerX, centerY, "#d6a260", 1.25);
  addSparks(centerX, centerY, "#c58c4f", 34);
}

function summonXuanliDoubleHeaven(caster, target, skill) {
  skill.used = true;
  const aim = normalize(target.x - caster.x, target.y - caster.y);
  const side = { x: -aim.y, y: aim.x };
  const center = { x: arena.width / 2, y: arena.height / 2 };
  xuanliUltimates.push({
    ownerId: caster.id,
    targetId: target.id,
    x: center.x,
    y: center.y,
    vx: 0,
    vy: 0,
    centerX: center.x,
    centerY: center.y,
    fireStartX: caster.x + side.x * (caster.radius + 18),
    fireStartY: caster.y + side.y * (caster.radius + 18),
    iceStartX: caster.x - side.x * (caster.radius + 18),
    iceStartY: caster.y - side.y * (caster.radius + 18),
    phase: "gather",
    age: 0,
    gatherDuration: 1.35,
    chaseRemaining: skill.chaseDuration,
    damage: skill.damage,
    speed: 255,
    radius: 28,
    turnRate: 3.2,
    pulseSeed: Math.random() * Math.PI * 2,
    trailTick: 0,
    trail: [],
  });
  audio?.playSfx("seal");
  addRing(center.x, center.y, "#fff1c8", 1.15);
  addSparks(caster.x, caster.y, "#ff7b35", 12);
  addSparks(caster.x, caster.y, "#eafcff", 12);
}

function launchXuanliPair(caster, target, skill) {
  const aim = normalize(target.x + target.vx * 0.18 - caster.x, target.y + target.vy * 0.18 - caster.y);
  const side = { x: -aim.y, y: aim.x };
  launchXuanliProjectile(caster, target, "fire", skill, side, 1);
  launchXuanliProjectile(caster, target, "ice", skill, side, -1);
  audio?.playSfx("earth");
  addRing(caster.x, caster.y, "#f2c37a", 0.76);
}

function launchXuanliProjectile(caster, target, type, skill, side, sideSign) {
  const speed = type === "fire" ? 314 : 292;
  const forwardOffset = caster.radius * 0.14;
  const sideOffset = (caster.radius + 22) * sideSign;
  const startX = caster.x + side.x * sideOffset;
  const startY = caster.y + side.y * sideOffset;
  const aim = getProjectileAim(startX, startY, target, speed, 0.08, 0.36);
  const initial = normalize(aim.x * 0.88 + side.x * sideSign * 0.46, aim.y * 0.88 + side.y * sideSign * 0.46);
  const curve = sideSign * (type === "fire" ? 0.62 : -0.58);
  xuanliProjectiles.push({
    ownerId: caster.id,
    targetId: target.id,
    type,
    x: startX + aim.x * forwardOffset,
    y: startY + aim.y * forwardOffset,
    vx: initial.x * speed,
    vy: initial.y * speed,
    speed,
    radius: type === "fire" ? 12 : 11,
    damage: type === "fire" ? skill.fireDamage : skill.iceDamage,
    slowDuration: skill.slowDuration,
    slowMultiplier: skill.slowMultiplier,
    age: 0,
    life: 3.2,
    turnRate: type === "fire" ? 2.6 : 3.05,
    curve,
    pulseSeed: Math.random() * Math.PI * 2,
    trailTick: 0,
    trail: [],
  });
  addSparks(startX, startY, type === "fire" ? "#ff7b35" : "#f2fcff", 10);
}

function throwFlyingScythe(caster, target, skill) {
  if (!target) return;
  skill.flyingUsed = true;
  skill.thrown = true;
  skill.returnRemaining = 3;
  const start = getScytheBladePoint(caster, skill.angle);
  const aim = normalize(target.x + target.vx * 0.28 - start.x, target.y + target.vy * 0.28 - start.y);
  thrownScythes.push({
    ownerId: caster.id,
    targetId: target.id,
    x: start.x,
    y: start.y,
    speed: 560,
    vx: aim.x * 560,
    vy: aim.y * 560,
    angle: skill.angle,
    spin: skill.spinSpeed >= 0 ? 12 : -12,
    damage: skill.flyingDamage,
    radius: 58,
    turnRate: 5.8,
    age: 0,
    life: 2.35,
    hit: false,
  });
  audio?.playSfx("flyingScythe");
  addUltimateEffect("scythe");
  addRing(caster.x, caster.y, caster.accent, 1);
  addSparks(start.x, start.y, caster.accent, 28);
}

function getScytheBladePoint(fighter, angle) {
  const reach = fighter.radius + 68;
  return {
    x: fighter.x + Math.cos(angle) * reach,
    y: fighter.y + Math.sin(angle) * reach,
  };
}

function scytheHitsFighter(attacker, target, angle) {
  const inner = attacker.radius + 6;
  const outer = attacker.radius + 84;
  const blade = getScytheBladePoint(attacker, angle);
  const handleBase = {
    x: attacker.x + Math.cos(angle) * inner,
    y: attacker.y + Math.sin(angle) * inner,
  };
  const bladeTip = {
    x: attacker.x + Math.cos(angle) * outer,
    y: attacker.y + Math.sin(angle) * outer,
  };
  const bladeDistance = length(target.x - blade.x, target.y - blade.y);
  return bladeDistance <= target.radius + 22 || distancePointToSegment(target, handleBase, bladeTip) <= target.radius + 14;
}

function updateTwinBladeSkill(fighter, enemy, dt) {
  const skill = fighter.skills.twinBlades;
  skill.phase += skill.spinSpeed * dt;
  skill.hitCooldown = Math.max(0, skill.hitCooldown - dt);
  skill.trails.forEach((trail) => {
    trail.age += dt;
  });
  skill.trails = skill.trails.filter((trail) => trail.age < 0.14);
  const angles = getTwinBladeAngles(skill);
  if (skill.trails.length === 0 || skill.trails[skill.trails.length - 1].age > 0.045) {
    skill.trails.push({ angles, age: 0 });
  }

  if (!enemy || enemy.hidden || enemy.trapped || enemy.immune || skill.hitCooldown > 0) return;
  const strikingAngle = angles.find((angle) => twinBladeHitsFighter(fighter, enemy, angle));
  if (strikingAngle === undefined) return;

  const hit = getTwinBladePoint(fighter, strikingAngle);
  damage(enemy, skill.damage, hit);
  audio?.playSfx("scytheHit");
  skill.hitCooldown = 0.52;
  addSparks(hit.x, hit.y, fighter.accent, 14);
  addRing(hit.x, hit.y, fighter.accent, 0.52);
}

function updateDasongSkill(fighter, enemy, dt) {
  const skill = fighter.skills.stoneShield;
  updateStoneShieldSkill(fighter, enemy, skill, dt);
}

function launchLightShield(caster, target, skill) {
  const launchAngle = Math.atan2(target.y + target.vy * 0.18 - caster.y, target.x + target.vx * 0.18 - caster.x);
  const dir = { x: Math.cos(launchAngle), y: Math.sin(launchAngle) };
  lightShields.push({
    ownerId: caster.id,
    x: caster.x + dir.x * (caster.radius + 18),
    y: caster.y + dir.y * (caster.radius + 18),
    vx: dir.x * 390,
    vy: dir.y * 390,
    angle: launchAngle,
    spin: skill.spinSpeed * 0.4,
    radius: caster.radius * 0.92,
    damage: skill.damage,
    hitIds: new Set(),
    life: 1.65,
  });
  audio?.playSfx("earth");
  addSparks(caster.x + dir.x * caster.radius, caster.y + dir.y * caster.radius, caster.accent, 20);
  addRing(caster.x, caster.y, caster.accent, 0.72);
}

function updateLingyaoSkills(fighter, enemy, dt) {
  updateTwinBladeSkill(fighter, enemy, dt);
  const shield = fighter.skills.stoneShield;
  if (!shield.unlocked && fighter.hp <= shield.hpBelow) {
    shield.unlocked = true;
    shield.active = true;
    shield.cooldownRemaining = Math.min(shield.cooldownRemaining, 2);
    addRing(fighter.x, fighter.y, fighter.accent, 0.78);
    addDamageText(fighter.x, fighter.y - fighter.radius - 14, "流石甲", fighter.accent);
  }
  if (shield.unlocked) {
    updateStoneShieldSkill(fighter, enemy, shield, dt);
  }
}

function updateLuyeSkills(fighter, enemy, dt) {
  const wire = fighter.skills.wire;
  const chase = fighter.skills.chase;
  const treasureShield = fighter.skills.treasureShield;
  const metalSealed = isDanjinSealingMetalSkills(fighter);

  if (treasureShield.shatterAge > 0) {
    treasureShield.shatterAge = Math.max(0, treasureShield.shatterAge - dt);
  }
  if (!treasureShield.used && fighter.hp <= treasureShield.hpBelow) {
    activateLuyeTreasureShield(fighter);
  }

  if (!metalSealed && !chase.used && fighter.hp <= chase.hpBelow) {
    triggerLuyeChase(fighter, enemy, chase);
    wire.cooldownRemaining = Math.max(wire.cooldownRemaining, chase.activeRemaining);
  }

  if (chase.activeRemaining > 0) {
    chase.activeRemaining = Math.max(0, chase.activeRemaining - dt);
    return;
  }

  if (metalSealed) return;

  wire.cooldownRemaining = Math.max(0, wire.cooldownRemaining - dt);
  if (wire.cooldownRemaining <= 0) {
    summonMetalWire(fighter, enemy, wire.damage);
    wire.cooldownRemaining = wire.cooldown;
  }
}

function activateLuyeTreasureShield(fighter) {
  const shield = fighter.skills?.treasureShield;
  if (!shield || shield.used) return;
  shield.used = true;
  shield.active = true;
  shield.charges = shield.maxCharges;
  audio?.playSfx("seal");
  addRing(fighter.x, fighter.y, "#ffe8d4", 0.95);
  addSparks(fighter.x, fighter.y, "#ffe0ca", 24);
  addDamageText(fighter.x, fighter.y - fighter.radius - 16, "琼圆盾", "#ffe0ca");
}

function updateStoneShieldSkill(fighter, enemy, skill, dt) {
  if (skill.absentRemaining > 0) {
    skill.absentRemaining = Math.max(0, skill.absentRemaining - dt);
    if (skill.absentRemaining <= 0) {
      skill.active = true;
      addRing(fighter.x, fighter.y, fighter.accent, 0.62);
    }
  }

  if (skill.active) {
    skill.angle += skill.spinSpeed * dt;
  }

  skill.cooldownRemaining = Math.max(0, skill.cooldownRemaining - dt);
  if (!enemy || !skill.active || skill.cooldownRemaining > 0) return;

  launchLightShield(fighter, enemy, skill);
  skill.active = false;
  skill.absentRemaining = skill.restoreDelay;
  skill.cooldownRemaining = skill.cooldown;
}

function getTwinBladeAngles(skill) {
  const sway = Math.sin(skill.phase * 2.15) * 0.32;
  return [skill.phase + sway, skill.phase + Math.PI - sway];
}

function getTwinBladePoint(fighter, angle) {
  const reach = fighter.radius + 51;
  return {
    x: fighter.x + Math.cos(angle) * reach,
    y: fighter.y + Math.sin(angle) * reach,
  };
}

function twinBladeHitsFighter(attacker, target, angle) {
  const inner = attacker.radius + 5;
  const outer = attacker.radius + 56;
  const bladeBase = {
    x: attacker.x + Math.cos(angle) * inner,
    y: attacker.y + Math.sin(angle) * inner,
  };
  const bladeTip = {
    x: attacker.x + Math.cos(angle) * outer,
    y: attacker.y + Math.sin(angle) * outer,
  };
  return distancePointToSegment(target, bladeBase, bladeTip) <= target.radius + 9;
}

function summonEarthPillars(caster, skill) {
  audio?.playSfx("earth");
  const fieldWidth = arena.width - arena.padding * 2;
  const fieldHeight = arena.height - arena.padding * 2;
  const verticalPair = Math.random() < 0.5;
  const thickness = 50 + Math.random() * 18;
  const sharedHits = new Set();
  let impactX = arena.width / 2;
  let impactY = arena.height / 2;

  if (verticalPair) {
    const x = arena.padding + thickness / 2 + Math.random() * Math.max(1, fieldWidth - thickness);
    const length = fieldHeight / 2 + 22;
    impactX = x;
    ["top", "bottom"].forEach((edge) => {
      earthDragons.push({
        ownerId: caster.id,
        edge,
        x,
        y: edge === "top" ? arena.padding : arena.height - arena.padding,
        length,
        thickness,
        damage: skill.damage,
        life: 2.8,
        age: 0,
        growTime: 0.58,
        hitIds: sharedHits,
      });
    });
  } else {
    const y = arena.padding + thickness / 2 + Math.random() * Math.max(1, fieldHeight - thickness);
    const length = fieldWidth / 2 + 22;
    impactY = y;
    ["left", "right"].forEach((edge) => {
      earthDragons.push({
        ownerId: caster.id,
        edge,
        x: edge === "left" ? arena.padding : arena.width - arena.padding,
        y,
        length,
        thickness,
        damage: skill.damage,
        life: 2.8,
        age: 0,
        growTime: 0.58,
        hitIds: sharedHits,
      });
    });
  }

  addRing(impactX, impactY, caster.accent, 0.65);
  addRing(caster.x, caster.y, caster.accent, 0.7);
}

function summonIceBurst(caster, skill) {
  audio?.playSfx("ice");
  const count = 8;
  const speed = 330;
  for (let i = 0; i < count; i += 1) {
    const angle = (Math.PI * 2 * i) / count;
    iceShards.push({
      ownerId: caster.id,
      x: caster.x + Math.cos(angle) * (caster.radius + 8),
      y: caster.y + Math.sin(angle) * (caster.radius + 8),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      angle,
      speed,
      radius: 11,
      length: 42,
      damage: skill.damage,
      life: 2.2,
    });
  }
  addRing(caster.x, caster.y, caster.accent, 0.9);
}

function summonTree(caster, target, skill) {
  audio?.playSfx("tree");
  const treeWidth = caster.radius * 4;
  const treeHeight = (arena.height - arena.padding * 2) / 2;
  const minX = arena.padding + treeWidth / 2;
  const maxX = arena.width - arena.padding - treeWidth / 2;
  const targetInfluence = Math.random() < 0.65 ? target.x + (Math.random() - 0.5) * treeWidth : minX + Math.random() * (maxX - minX);
  const centerX = clamp(targetInfluence, minX, maxX);

  trees.push({
    ownerId: caster.id,
    x: centerX - treeWidth / 2,
    y: arena.height - arena.padding - treeHeight,
    width: treeWidth,
    height: treeHeight,
    age: 0,
    duration: skill.duration,
    damagePerSecond: skill.damagePerSecond,
    damageCarry: new Map(),
  });
  addRing(centerX, arena.height - arena.padding, caster.accent, 0.8);
}

function summonFengxiDomainLines(caster, target, skill) {
  audio?.playSfx("wire");
  const direction = caster.teamId === "red" ? 1 : -1;
  const startX = direction > 0 ? arena.padding - 70 : arena.width - arena.padding + 70;
  const endX = direction > 0 ? arena.width - arena.padding + 70 : arena.padding - 70;
  const centerY = target && !target.hidden
    ? target.y
    : arena.height / 2 + (Math.random() - 0.5) * 120;
  const spacing = 58;
  const offsets = [-spacing, 0, spacing];
  const sharedHits = new Set();

  offsets.forEach((offset, index) => {
    const y = clamp(centerY + offset, arena.padding + 34, arena.height - arena.padding - 34);
    fengxiDomainLines.push({
      ownerId: caster.id,
      x: startX,
      y,
      startX,
      endX,
      vx: direction * 620,
      width: 260,
      thickness: 7,
      damage: skill.damage,
      age: 0,
      life: 1.55,
      hitIds: sharedHits,
      pulseSeed: index * 0.78 + Math.random() * 0.4,
    });
  });
  addRing(caster.x, caster.y, "#9fd0ff", 0.82);
  addSparks(caster.x, caster.y, "#c7e4ff", 18);
}

function summonRebar(caster, target) {
  summonMetalWire(caster, target, caster.skills.rebar.damage, {
    kind: "boomerang",
    speed: 285,
    radius: 27,
    length: 82,
    life: 3.8,
    color: "#c28643",
    glow: "rgba(221, 151, 60, 0.32)",
    turnRate: 3.35,
    spin: caster.id === "red" ? 8.5 : -8.5,
  });
}

function summonMetalWire(caster, target, damage, options = {}) {
  if (!target) return;
  const kind = options.kind ?? (caster.role === "luye" ? "wire" : "rebar");
  const isLuyeWire = caster.role === "luye" || kind === "wire" || kind === "chase-wire";
  if (!options.silent) audio?.playSfx(caster.role === "luye" ? "wire" : "rebar");
  const projectileSpeed = options.speed ?? (isLuyeWire ? 455 : 430);
  const startAngle = options.startAngle ?? Math.atan2(target.y - caster.y, target.x - caster.x);
  const startX = options.startX ?? caster.x + Math.cos(startAngle) * (caster.radius + (options.startOffset ?? 10));
  const startY = options.startY ?? caster.y + Math.sin(startAngle) * (caster.radius + (options.startOffset ?? 10));
  const windupDuration = options.windupDuration ?? (isLuyeWire ? 0.86 : 0);
  const canHit = options.canHit ?? (isLuyeWire ? Math.random() < 0.8 : true);
  const missOffset = options.missOffset ?? (Math.random() < 0.5 ? -1 : 1) * (0.42 + Math.random() * 0.34);
  const initialAim = getWireLaunchAim(startX, startY, target, projectileSpeed, canHit, missOffset, 0.18, 0.75);
  const dir = windupDuration > 0 ? { x: Math.cos(startAngle), y: Math.sin(startAngle) } : initialAim;
  const orbitRadius = options.orbitRadius ?? (kind === "chase-wire" ? 48 : isLuyeWire ? 76 : 15);
  const windupCenterX = options.windupCenterX ?? (isLuyeWire && kind === "wire" ? caster.x : startX);
  const windupCenterY = options.windupCenterY ?? (isLuyeWire && kind === "wire" ? caster.y : startY);
  rebars.push({
    ownerId: caster.id,
    targetId: target.id,
    kind,
    x: startX,
    y: startY,
    vx: dir.x * projectileSpeed,
    vy: dir.y * projectileSpeed,
    angle: Math.atan2(dir.y, dir.x),
    spinAngle: 0,
    spin: options.spin ?? 0,
    speed: projectileSpeed,
    turnRate: options.turnRate ?? (isLuyeWire ? 4.25 : 5.5),
    radius: options.radius ?? (isLuyeWire ? 13 : 12),
    length: options.length ?? (isLuyeWire ? 78 : 50),
    damage,
    life: options.life ?? 2.6,
    color: options.color ?? (isLuyeWire ? "#ffd76a" : "#aeb4ac"),
    glow: options.glow ?? (isLuyeWire ? "rgba(255, 196, 58, 0.72)" : null),
    canHit,
    missOffset,
    tethered: options.tethered ?? caster.role === "luye",
    originX: options.originX,
    originY: options.originY,
    windupDuration,
    windupRemaining: windupDuration,
    windupCenterX,
    windupCenterY,
    orbitRadius,
    orbitStartAngle: Math.random() * Math.PI * 2,
    orbitTurns: options.orbitTurns ?? 2,
    launched: windupDuration <= 0,
    curveSeed: Math.random() * Math.PI * 2,
  });
  addRing(caster.x, caster.y, caster.accent, 0.55);
}

function getWireLaunchAim(x, y, target, speed, canHit, missOffset, minLead = 0.08, maxLead = 0.42) {
  const aim = getProjectileAim(x, y, target, speed, minLead, maxLead);
  return canHit ? aim : rotateVector(aim, missOffset);
}

function rotateVector(vector, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: vector.x * cos - vector.y * sin,
    y: vector.x * sin + vector.y * cos,
  };
}

function angleDifference(a, b) {
  return Math.atan2(Math.sin(a - b), Math.cos(a - b));
}

function getProjectileAim(x, y, target, speed, minLead = 0.08, maxLead = 0.42) {
  const distanceToTarget = length(target.x - x, target.y - y);
  const leadTime = clamp(distanceToTarget / speed, minLead, maxLead);
  const predictedX = clamp(
    target.x + target.vx * leadTime,
    arena.padding + target.radius,
    arena.width - arena.padding - target.radius,
  );
  const predictedY = clamp(
    target.y + target.vy * leadTime,
    arena.padding + target.radius,
    arena.height - arena.padding - target.radius,
  );
  return normalize(predictedX - x, predictedY - y);
}

function triggerLuyeChase(caster, target, skill) {
  if (!target) return;
  skill.used = true;
  skill.activeRemaining = 2.35;
  audio?.playSfx("seal");
  addUltimateEffect("luye", target.x, target.y);
  addDamageText(caster.x, caster.y - caster.radius - 14, "追毫", "#ff6464");
  addRing(caster.x, caster.y, caster.accent, 1);
  addSparks(caster.x, caster.y, "#ff6464", 30);

  const cornerInset = arena.padding + 8;
  const chaseOrigins = [
    { x: cornerInset, y: cornerInset },
    { x: arena.width - cornerInset, y: cornerInset },
    { x: arena.width - cornerInset, y: arena.height - cornerInset },
    { x: cornerInset, y: arena.height - cornerInset },
    { x: cornerInset, y: arena.height / 2 },
    { x: arena.width - cornerInset, y: arena.height / 2 },
  ];
  chaseOrigins.forEach((origin, index) => {
    window.setTimeout(() => {
      if (gameOver || !fighters?.includes(caster)) return;
      const originalTarget = findCombatBodyById(target.id);
      const liveTarget =
        originalTarget && originalTarget.hp > 0 && !originalTarget.hidden
          ? originalTarget
          : selectTarget(caster, getOpponentController(caster));
      if (!liveTarget) return;
      summonMetalWire(caster, liveTarget, skill.damage, {
        kind: "chase-wire",
        startX: origin.x,
        startY: origin.y,
        originX: origin.x,
        originY: origin.y,
        tethered: true,
        speed: 540,
        turnRate: 5.25,
        radius: 14,
        length: 88,
        life: 2.65,
        orbitRadius: 52,
        windupDuration: 0.88,
        color: "#ffe08a",
        glow: "rgba(255, 199, 62, 0.82)",
        silent: index > 0,
      });
    }, 1050 + index * 175);
  });
}

function summonBlackHole(caster, skill) {
  audio?.playSfx("blackHole");
  caster.hidden = true;
  caster.immune = true;
  caster.vx = 0;
  caster.vy = 0;
  blackHoles.push({
    ownerId: caster.id,
    x: caster.x,
    y: caster.y,
    radius: caster.radius * 2,
    age: 0,
    duration: skill.duration,
    damage: skill.damage,
    trappedIds: new Set(),
  });
  addRing(caster.x, caster.y, "#0b0d12", 1.3);
}

function shouldTriggerSkill(fighter) {
  const trigger = fighter.skill.trigger;
  if (trigger.type === "cooldown") return true;
  if (trigger.type === "condition") {
    return fighter.hp <= trigger.hpBelow || fighter.contactCount >= trigger.contactsAtLeast;
  }
  return false;
}

function startSkill(fighter, enemy) {
  const skill = fighter.skill;
  skill.active = true;
  skill.remaining = skill.duration;

  if (fighter.id === "red") {
    const dir = normalize(enemy.x - fighter.x, enemy.y - fighter.y);
    fighter.vx += dir.x * 250;
    fighter.vy += dir.y * 250;
    addRing(fighter.x, fighter.y, fighter.color, 0.75);
  }

  if (fighter.id === "blue") {
    fighter.damageTakenMultiplier = 0.35;
    addRing(fighter.x, fighter.y, fighter.accent, 1);
  }
}

function endSkill(fighter) {
  const skill = fighter.skill;
  skill.active = false;
  skill.remaining = 0;
  skill.cooldownRemaining = skill.trigger.cooldown;
  fighter.damageTakenMultiplier = 1;
}

function updatePhysics(dt) {
  updateGlobalFreeze(dt);
  for (const controller of fighters) {
    if (isSquadController(controller)) {
      for (const unit of getCombatBodies(controller)) {
        const enemy = selectTarget(unit);
        updateSoldierUnit(unit, enemy, dt);
        moveCombatBody(unit, enemy, dt);
      }
      continue;
    }
    const enemy = selectTarget(controller);
    updateSlowState(controller, dt);
    updateElementalStates(controller, dt);
    controller.wallSfxCooldown = Math.max(0, controller.wallSfxCooldown - dt);
    updateSkill(controller, enemy, dt);
    moveCombatBody(controller, enemy, dt);
  }

  for (const controller of fighters) {
    if (!isSquadController(controller)) continue;
    const units = getCombatBodies(controller);
    for (let i = 0; i < units.length; i += 1) {
      for (let j = i + 1; j < units.length; j += 1) {
        resolveBallCollision(units[i], units[j], false);
      }
    }
  }

  for (let i = 0; i < fighters.length; i += 1) {
    for (let j = i + 1; j < fighters.length; j += 1) {
      const controllerA = fighters[i];
      const controllerB = fighters[j];
      const applyCombatEffects = controllerA.teamId !== controllerB.teamId;
      for (const bodyA of getCombatBodies(controllerA)) {
        for (const bodyB of getCombatBodies(controllerB)) {
          resolveBallCollision(bodyA, bodyB, applyCombatEffects);
        }
      }
    }
  }
  updateRebars(dt);
  updateIceShards(dt);
  updateEarthDragons(dt);
  updateZhiqingScatterRocks(dt);
  updateThrownScythes(dt);
  updateBullets(dt);
  updateLightShields(dt);
  updateFoldingFans(dt);
  updateFireballs(dt);
  updateAgenProjectiles(dt);
  updateXuanliProjectiles(dt);
  updateXuanliUltimates(dt);
  updateQidaoRocks(dt);
  updateLuoxiaoheiMetalPlates(dt);
  updateLuoxiaoheiTeleports(dt);
  updateLuoxiaoheiClones(dt);
  updateJiulaoInsightZones(dt);
  updateJiulaoMetalThorns(dt);
  updateDreamTrances(dt);
  updateDanjinFormation(dt);
  updateBlackHoles(dt);
  updateTrees(dt);
  updateFengxiDomainLines(dt);
  updateEffects(dt);
  updateUltimateEffects(dt);
  updateDamageTexts(dt);
}

function updateDanjinFormation(dt) {
  if (!danjinFormation.active) return;

  for (const eye of danjinFormation.eyes) {
    eye.age += dt;
  }
  danjinFormation.eyeLockRemaining = Math.max(0, danjinFormation.eyeLockRemaining - dt);

  if (!danjinFormation.broken && danjinFormation.eyeLockRemaining <= 0) {
    const breakers = fighters.filter((fighter) => (
      (fighter.role === "luoxiaohei" || fighter.role === "luye")
      && fighter.hp > 0
      && !fighter.hidden
    ));
    for (let i = danjinFormation.eyes.length - 1; i >= 0; i -= 1) {
      const eye = danjinFormation.eyes[i];
      const breaker = breakers.find((fighter) => circleHit(fighter, eye, fighter.radius + eye.radius));
      if (!breaker) continue;
      danjinFormation.eyes.splice(i, 1);
      addRing(eye.x, eye.y, "#fff3a8", 0.62);
      addSparks(eye.x, eye.y, "#fff7c8", 18);
    }

    if (danjinFormation.eyes.length === 0) {
      breakDanjinFormation();
    }
    return;
  }
  if (!danjinFormation.broken) return;

  danjinFormation.recoveryRemaining = Math.max(0, danjinFormation.recoveryRemaining - dt);
  if (danjinFormation.recoveryRemaining <= 0) {
    resetDanjinFormation();
  }
}

function breakDanjinFormation() {
  if (!danjinFormation.active || danjinFormation.broken) return;
  danjinFormation.broken = true;
  danjinFormation.recoveryRemaining = 1;
  addUltimateEffect("danjinBreak", arena.width / 2, arena.height / 2);
  addRing(arena.width / 2, arena.height / 2, "#fff1a2", 1.5);
  addSparks(arena.width / 2, arena.height / 2, "#fff1a2", 42);
}

function isDanjinSealingMetalSkills(fighter) {
  return battleMode === "2v1"
    && danjinFormation.active
    && (fighter.role === "luoxiaohei" || fighter.role === "luye");
}

function moveCombatBody(fighter, enemy, dt) {
  if (fighter.hidden || fighter.trapped) return;
  if (fighter.frozenRemaining > 0) return;
  if (isFrozenByXuhuai(fighter)) return;
  applyAi(fighter, enemy, dt);
  fighter.x += fighter.vx * dt;
  fighter.y += fighter.vy * dt;
  const minX = arena.padding + fighter.radius;
  const maxX = arena.width - arena.padding - fighter.radius;
  const minY = arena.padding + fighter.radius;
  const maxY = arena.height - arena.padding - fighter.radius;
  let hitWall = false;
  if (fighter.x < minX || fighter.x > maxX) {
    fighter.x = clamp(fighter.x, minX, maxX);
    fighter.vx *= -0.96;
    addSparks(fighter.x, fighter.y, fighter.color, 5);
    hitWall = true;
  }
  if (fighter.y < minY || fighter.y > maxY) {
    fighter.y = clamp(fighter.y, minY, maxY);
    fighter.vy *= -0.96;
    addSparks(fighter.x, fighter.y, fighter.color, 5);
    hitWall = true;
  }
  if (hitWall && fighter.wallSfxCooldown <= 0) {
    audio?.playSfx("wallHit");
    fighter.wallSfxCooldown = 0.18;
  }
}

function updateSoldierUnit(unit, enemy, dt) {
  updateSlowState(unit, dt);
  updateElementalStates(unit, dt);
  updateSealState(unit, dt);
  unit.wallSfxCooldown = Math.max(0, unit.wallSfxCooldown - dt);
  if (unit.frozenRemaining > 0) return;
  if (isFrozenByXuhuai(unit)) return;
  if (unit.sealed || !enemy) return;
  unit.rifleCooldown = Math.max(0, unit.rifleCooldown - dt);
  if (unit.rifleCooldown <= 0) {
    fireRifleBullet(unit, enemy);
    unit.rifleCooldown = 3;
  }
}

function fireRifleBullet(unit, target) {
  const aim = normalize(target.x + target.vx * 0.12 - unit.x, target.y + target.vy * 0.12 - unit.y);
  bullets.push({
    ownerId: unit.teamId,
    x: unit.x + aim.x * (unit.radius + 15),
    y: unit.y + aim.y * (unit.radius + 15),
    vx: aim.x * 510,
    vy: aim.y * 510,
    angle: Math.atan2(aim.y, aim.x),
    radius: 4,
    damage: 1,
    life: 1.8,
  });
  addSparks(unit.x + aim.x * (unit.radius + 15), unit.y + aim.y * (unit.radius + 15), "#f3d27a", 4);
  audio?.playSfx("rifleShot");
}

function resolveBallCollision(a, b, applyCombatEffects = true) {
  if (a.hidden || b.hidden || a.trapped || b.trapped) return;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = length(dx, dy);
  const minDist = a.radius + b.radius;
  if (dist >= minDist || dist === 0) return;

  const nx = dx / dist;
  const ny = dy / dist;
  const overlap = minDist - dist;
  a.x -= (nx * overlap) / 2;
  a.y -= (ny * overlap) / 2;
  b.x += (nx * overlap) / 2;
  b.y += (ny * overlap) / 2;

  const rvx = b.vx - a.vx;
  const rvy = b.vy - a.vy;
  const velocityAlongNormal = rvx * nx + rvy * ny;
  const separating = velocityAlongNormal > 0;

  const restitution = 0.94;
  const lowSpeedBoost = Math.max(0, 72 - Math.abs(velocityAlongNormal));
  const impulse =
    separating
      ? lowSpeedBoost * 0.42
      : (-(1 + restitution) * velocityAlongNormal) / (1 / a.mass + 1 / b.mass) + lowSpeedBoost * 0.28;
  const impulseX = impulse * nx;
  const impulseY = impulse * ny;
  a.vx -= impulseX / a.mass;
  a.vy -= impulseY / a.mass;
  b.vx += impulseX / b.mass;
  b.vy += impulseY / b.mass;

  if (lowSpeedBoost > 24) {
    const tx = -ny;
    const ty = nx;
    const side = a.id === "red" ? 1 : -1;
    const tangentImpulse = 18 * side;
    a.vx -= tx * tangentImpulse;
    a.vy -= ty * tangentImpulse;
    b.vx += tx * tangentImpulse;
    b.vy += ty * tangentImpulse;
  }

  if (!applyCombatEffects) return;

  a.contactCount += 1;
  b.contactCount += 1;
  if (tryTriggerQidaoSelfDestruct(a, b) || tryTriggerQidaoSelfDestruct(b, a)) {
    addSparks(a.x + nx * a.radius, a.y + ny * a.radius, "#f0c45c", 14);
    addRing(a.x + nx * a.radius, a.y + ny * a.radius, "#f0c45c", 0.58);
    return;
  }
  tryApplyFengxiSeal(a, b);
  tryApplyFengxiSeal(b, a);
  applyCollisionDamage(a, b);
  applyCollisionDamage(b, a);
  addSparks(a.x + nx * a.radius, a.y + ny * a.radius, "#f0c45c", 14);
  addRing(a.x + nx * a.radius, a.y + ny * a.radius, "#f0c45c", 0.58);
}

function tryTriggerQidaoSelfDestruct(attacker, defender) {
  const controller = getControllerForBody(attacker);
  if (controller !== attacker || attacker.role !== "qidao" || attacker.hp <= 0 || gameOver) return false;
  const skill = attacker.skills?.selfDestruct;
  if (!skill || skill.used || attacker.hp > skill.hpBelow) return false;
  skill.used = true;
  skill.ready = false;
  const x = (attacker.x + defender.x) / 2;
  const y = (attacker.y + defender.y) / 2;
  audio?.playSfx("earth");
  addUltimateEffect("qidao", x, y);
  addRing(x, y, "#ff7a2f", 2.35);
  addRing(x, y, "#fff0b8", 1.42);
  addRing(attacker.x, attacker.y, "#d0a15f", 1.2);
  addSparks(x, y, "#ff6d28", 74);
  addSparks(x, y, "#f5d48a", 46);
  addSparks(attacker.x, attacker.y, "#d0a15f", 30);
  addDamageText(attacker.x, attacker.y - attacker.radius - 18, "自爆", "#ffd079");
  const defenderController = getControllerForBody(defender);
  const before = defenderController?.hp ?? defender.hp;
  damage(defender, skill.damage, { x, y, kind: "qidao-self-destruct" });
  const after = defenderController?.hp ?? defender.hp;
  const defeated = before > 0 && after <= 0;
  if (defeated) {
    if (!gameOver && isTeamDefeated(defenderController.teamId)) scheduleRoundFinish(attacker, 1.1);
    return true;
  }
  attacker.hp = 0;
  attacker.hidden = true;
  addDamageText(attacker.x, attacker.y - attacker.radius - 8, "失败", "#ff9f6e");
  addSparks(attacker.x, attacker.y, "#d0a15f", 26);
  if (!gameOver && isTeamDefeated(attacker.teamId)) scheduleRoundFinish(getOpponentController(attacker), 1.1);
  return true;
}

function tryApplyFengxiSeal(attacker, defender) {
  if (attacker.role !== "fengxi") return;
  const sealSkill = attacker.skills.seal;
  if (!sealSkill.ready || sealSkill.used) return;
  sealSkill.ready = false;
  sealSkill.used = true;
  attacker.color = attacker.rageColor;
  defender.sealed = true;
  defender.sealRemaining = sealSkill.duration;
  defender.sealedById = attacker.id;
  audio?.playSfx("seal");
  addUltimateEffect("seal", defender.x, defender.y);
  addRing(defender.x, defender.y, "#ef4b4f", 0.85);
  addDamageText(defender.x, defender.y - defender.radius - 12, "封", "#ef4b4f");
}

function applyCollisionDamage(attacker, defender) {
  const mingwangBoostDamage = attacker.role === "mingwang" && attacker.skills?.boost?.activeRemaining > 0
    ? attacker.skills.boost.collisionDamage
    : 0;
  if (!attacker.collision.canDamage && mingwangBoostDamage <= 0) return;
  if (defender.immune) return;
  const baseDamage = resolveNezhaCollisionDamage(attacker);
  const amount = Math.round((mingwangBoostDamage || baseDamage) * defender.damageTakenMultiplier);
  if (amount <= 0) return;
  damage(defender, amount, attacker);
  if (mingwangBoostDamage > 0) {
    addDamageText(defender.x, defender.y - defender.radius - 24, "强化", "#ffb7a8");
    addRing(defender.x, defender.y, "#ff8b8b", 0.55);
  }
  if (attacker.collision.slowDuration) {
    defender.slowRemaining = attacker.collision.slowDuration;
    defender.slowMultiplier = attacker.collision.slowMultiplier;
    addRing(defender.x, defender.y, "#c8f5ff", 0.65);
  }
}

function damage(fighter, amount, source = null) {
  if (fighter.immune) return;
  if (triggerXuhuaiIceAgeIfLethal(fighter, amount, source)) return;
  if (isProtectedByXuhuaiIceAge(fighter)) return;
  if (isDamageBlockedByShield(fighter, source)) {
    addShieldBlockEffect(fighter, source);
    return;
  }
  const isQidaoSelfDestructDamage = source?.kind === "qidao-self-destruct";
  const before = fighter.hp;
  fighter.hp = clamp(fighter.hp - amount, 0, fighter.maxHp);
  const actualDamage = Math.round(before - fighter.hp);
  if (actualDamage > 0) {
    audio?.playSfx("hit");
    addDamageText(fighter.x, fighter.y - fighter.radius - 8, actualDamage);
  }
  if (fighter.role === "mingwang" && fighter.hp <= 0 && triggerMingwangReviveIfLethal(fighter)) {
    return;
  }
  if (fighter.role === "mingwang" && fighter.hp > 0) {
    triggerMingwangHealing(fighter, before, before - actualDamage);
  }
  if (fighter.controller) {
    if (fighter.hp <= 0) {
      fighter.hidden = true;
      addSparks(fighter.x, fighter.y, "#d3c79b", 18);
    }
    const squad = fighter.controller;
    squad.hp = squad.units.reduce((total, unit) => total + unit.hp, 0);
    if (squad.hp <= 0 && !gameOver && !isQidaoSelfDestructDamage) {
      finishIfTeamDefeated(squad);
    }
    return;
  }
  if (fighter.role === "fengxi" && !fighter.skills.seal.used && fighter.hp <= fighter.skills.seal.hpBelow) {
    fighter.skills.seal.ready = true;
    fighter.color = fighter.rageColor;
  }
  if (fighter.role === "luye" && fighter.hp > 0 && fighter.hp <= fighter.skills.treasureShield.hpBelow) {
    activateLuyeTreasureShield(fighter);
  }
  if (fighter.role === "nezha" && fighter.hp > 0 && !fighter.skills.qiankun.used && fighter.hp <= fighter.skills.qiankun.hpBelow) {
    activateNezhaQiankun(fighter);
  }
  if (fighter.hp <= 0 && !gameOver && !isQidaoSelfDestructDamage) {
    fighter.hidden = true;
    addSparks(fighter.x, fighter.y, fighter.accent, 20);
    finishIfTeamDefeated(fighter);
  }
}

function triggerXuhuaiIceAgeIfLethal(fighter, amount, source = null) {
  if (fighter.role !== "xuhuai") return false;
  const skill = fighter.skills?.iceAge;
  if (!skill || skill.used || fighter.hp <= 0 || fighter.hp - amount > 0) return false;
  skill.used = true;
  globalFreeze.active = true;
  globalFreeze.remaining = skill.duration;
  globalFreeze.duration = skill.duration;
  globalFreeze.casterId = fighter.id;
  globalFreeze.casterTeamId = fighter.teamId;
  const angle = source ? Math.atan2(source.y - fighter.y, source.x - fighter.x) : -Math.PI / 2;
  const blockX = fighter.x + Math.cos(angle) * fighter.radius;
  const blockY = fighter.y + Math.sin(angle) * fighter.radius;
  audio?.playSfx("ice");
  addUltimateEffect("iceAge", arena.width / 2, arena.height / 2);
  addRing(fighter.x, fighter.y, "#bdefff", 1.15);
  addSparks(blockX, blockY, "#d9f8ff", 34);
  addDamageText(fighter.x, fighter.y - fighter.radius - 18, "冰河时代", "#d9f8ff");
  addDamageText(blockX, blockY - 18, "免疫", "#eefcff");
  return true;
}

function isProtectedByXuhuaiIceAge(fighter) {
  if (!globalFreeze.active || globalFreeze.casterId !== fighter?.id) return false;
  return fighter.role === "xuhuai";
}

function isDamageBlockedByShield(fighter, source) {
  const controller = getControllerForBody(fighter);
  if (controller?.role === "luye" && fighter === controller) {
    const shield = controller.skills?.treasureShield;
    if (shield?.active && shield.charges > 0) return true;
  }
  if (!source) return false;
  if (controller?.role === "nezha" && fighter === controller) {
    const qiankun = controller.skills?.qiankun;
    if (qiankun?.active && qiankun.rings.some((ring) => ring.active)) return true;
  }
  if (!["dasong", "lingyao"].includes(controller?.role) || fighter !== controller) return false;
  const skill = controller.skills?.stoneShield;
  if (!skill?.active || skill.absentRemaining > 0) return false;
  const incomingAngle = Math.atan2(source.y - fighter.y, source.x - fighter.x);
  return Math.abs(angleDifference(incomingAngle, skill.angle)) <= 1.08;
}

function addShieldBlockEffect(fighter, source) {
  const angle = Math.atan2((source?.y ?? fighter.y) - fighter.y, (source?.x ?? fighter.x + 1) - fighter.x);
  const x = fighter.x + Math.cos(angle) * fighter.radius;
  const y = fighter.y + Math.sin(angle) * fighter.radius;
  audio?.playSfx("wallHit");
  addSparks(x, y, fighter.accent, 14);
  addRing(x, y, fighter.accent, 0.5);
  addDamageText(x, y - 12, "抵消", fighter.accent);
  if (fighter.role === "luye") {
    consumeLuyeTreasureShield(fighter, x, y);
  }
  if (fighter.role === "nezha") {
    consumeNezhaQiankunRing(fighter, angle, x, y);
  }
}

function consumeLuyeTreasureShield(fighter, x, y) {
  const shield = fighter.skills?.treasureShield;
  if (!shield?.active) return;
  shield.charges = Math.max(0, shield.charges - 1);
  addDamageText(fighter.x, fighter.y - fighter.radius - 20, `盾${shield.charges}`, "#ffe0ca");
  if (shield.charges > 0) return;
  shield.active = false;
  shield.shatterAge = 0.78;
  audio?.playSfx("scytheHit");
  addSparks(x, y, "#ffe0ca", 28);
  addSparks(fighter.x, fighter.y, "#ffffff", 18);
  addRing(fighter.x, fighter.y, "#ffe0ca", 1.15);
}

function consumeNezhaQiankunRing(fighter, incomingAngle, x, y) {
  const qiankun = fighter.skills?.qiankun;
  if (!qiankun?.active) return;
  const activeRings = qiankun.rings.filter((ring) => ring.active);
  if (!activeRings.length) {
    qiankun.active = false;
    return;
  }
  const ring = activeRings.reduce((nearest, current) =>
    Math.abs(angleDifference(current.angle, incomingAngle)) < Math.abs(angleDifference(nearest.angle, incomingAngle)) ? current : nearest,
  );
  ring.active = false;
  audio?.playSfx("scytheHit");
  addDamageText(fighter.x, fighter.y - fighter.radius - 20, `圈${activeRings.length - 1}`, "#ffd36a");
  addSparks(x, y, "#ffd36a", 22);
  addRing(x, y, "#ffd36a", 0.72);
  if (!qiankun.rings.some((item) => item.active)) {
    qiankun.active = false;
    addSparks(fighter.x, fighter.y, "#ffef9c", 18);
  }
}

function updateRebars(dt) {
  for (let i = rebars.length - 1; i >= 0; i -= 1) {
    const rebar = rebars[i];
    rebar.life -= dt;
    const target = findCombatBodyById(rebar.targetId);
    if (rebar.windupRemaining > 0) {
      rebar.windupRemaining = Math.max(0, rebar.windupRemaining - dt);
      const windupProgress = 1 - rebar.windupRemaining / rebar.windupDuration;
      const orbitAngle = rebar.orbitStartAngle + windupProgress * Math.PI * 2 * rebar.orbitTurns;
      const wobble = 1 + Math.sin(windupProgress * Math.PI * 4) * 0.12;
      const radiusEase = 0.42 + easeOutCubic(windupProgress) * 0.58;
      rebar.currentOrbitRadius = rebar.orbitRadius * radiusEase * wobble;
      rebar.x = rebar.windupCenterX + Math.cos(orbitAngle) * rebar.currentOrbitRadius;
      rebar.y = rebar.windupCenterY + Math.sin(orbitAngle) * rebar.currentOrbitRadius;
      rebar.angle = orbitAngle + Math.PI / 2;
      if (rebar.windupRemaining > 0) continue;
      if (target && !target.hidden && !target.trapped) {
        const aim = getWireLaunchAim(rebar.x, rebar.y, target, rebar.speed, rebar.canHit, rebar.missOffset, 0.08, 0.42);
        rebar.vx = aim.x * rebar.speed;
        rebar.vy = aim.y * rebar.speed;
        rebar.angle = Math.atan2(rebar.vy, rebar.vx);
        rebar.launched = true;
      }
    }

    if (rebar.canHit && target && !target.hidden && !target.trapped) {
      const aim = getProjectileAim(rebar.x, rebar.y, target, rebar.speed, 0.08, 0.42);
      const current = normalize(rebar.vx, rebar.vy);
      const steer = clamp(rebar.turnRate * dt, 0, 0.24);
      const next = normalize(current.x * (1 - steer) + aim.x * steer, current.y * (1 - steer) + aim.y * steer);
      rebar.vx = next.x * rebar.speed;
      rebar.vy = next.y * rebar.speed;
      rebar.angle = Math.atan2(rebar.vy, rebar.vx);
    }

    rebar.x += rebar.vx * dt;
    rebar.y += rebar.vy * dt;
    rebar.spinAngle = (rebar.spinAngle || 0) + (rebar.spin || 0) * dt;

    if (rebar.canHit && rebar.launched && target && !target.hidden && !target.trapped && circleHit(rebar, target, rebar.radius + target.radius * 0.92)) {
      damage(target, rebar.damage, rebar);
      addSparks(rebar.x, rebar.y, rebar.kind === "wire" || rebar.kind === "chase-wire" ? "#ffd76a" : "#d7d0bf", 12);
      addRing(rebar.x, rebar.y, "#f0c45c", 0.45);
      rebars.splice(i, 1);
      continue;
    }

    if (
      rebar.life <= 0 ||
      rebar.x < -80 ||
      rebar.x > arena.width + 80 ||
      rebar.y < -80 ||
      rebar.y > arena.height + 80
    ) {
      rebars.splice(i, 1);
    }
  }
}

function updateIceShards(dt) {
  for (let i = iceShards.length - 1; i >= 0; i -= 1) {
    const shard = iceShards[i];
    shard.life -= dt;
    shard.x += shard.vx * dt;
    shard.y += shard.vy * dt;

    const target = getEnemyBodies(shard.ownerId).find((body) => !body.trapped && circleHit(shard, body, shard.radius + body.radius * 0.7));
    if (target && !target.hidden) {
      damage(target, shard.damage, shard);
      addSparks(shard.x, shard.y, "#c8f5ff", 12);
      addRing(shard.x, shard.y, "#c8f5ff", 0.45);
      iceShards.splice(i, 1);
      continue;
    }

    if (
      shard.life <= 0 ||
      shard.x < -80 ||
      shard.x > arena.width + 80 ||
      shard.y < -80 ||
      shard.y > arena.height + 80
    ) {
      iceShards.splice(i, 1);
    }
  }
}

function updateEarthDragons(dt) {
  for (let i = earthDragons.length - 1; i >= 0; i -= 1) {
    const pillar = earthDragons[i];
    pillar.age += dt;
    pillar.life -= dt;

    const rect = getEarthPillarRect(pillar);
    for (const target of getEnemyBodies(pillar.ownerId)) {
      if (!target.immune && !pillar.hitIds.has(target.id) && circleRectHit(target, rect)) {
        pillar.hitIds.add(target.id);
        damage(target, pillar.damage, { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 });
        addSparks(target.x, target.y, "#d79a55", 16);
        addRing(target.x, target.y, "#e7be72", 0.55);
      }
    }

    if (pillar.life <= 0) {
      earthDragons.splice(i, 1);
    }
  }
}

function updateZhiqingScatterRocks(dt) {
  for (let i = zhiqingScatterRocks.length - 1; i >= 0; i -= 1) {
    const item = zhiqingScatterRocks[i];
    item.age += dt;
    item.life -= dt;
    const owner = fighters?.find((fighter) => fighter.id === item.ownerId);

    if (item.kind === "cluster") {
      if (owner && owner.hp > 0 && !owner.hidden) {
        item.x = owner.x;
        item.y = owner.y;
      }
      if (item.age >= item.gatherDuration) {
        const baseAngle = Math.random() * Math.PI * 2;
        for (let j = 0; j < item.projectileCount; j += 1) {
          const angle = baseAngle + (j / item.projectileCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.54;
          const speed = 265 + Math.random() * 80;
          zhiqingScatterRocks.push({
            kind: "rock",
            ownerId: item.ownerId,
            ownerTeamId: item.ownerTeamId,
            x: item.x + Math.cos(angle) * 24,
            y: item.y + Math.sin(angle) * 24,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            radius: 15 + Math.random() * 5,
            damage: item.damage,
            age: 0,
            life: 2.4,
            angle,
            spin: (Math.random() > 0.5 ? 1 : -1) * (4.8 + Math.random() * 2.4),
          });
        }
        audio?.playSfx("earth");
        addRing(item.x, item.y, "#d6a260", 1.05);
        addSparks(item.x, item.y, "#c58c4f", 28);
        zhiqingScatterRocks.splice(i, 1);
      }
      continue;
    }

    if (item.kind === "burst") {
      if (owner && owner.hp > 0 && !owner.hidden) {
        item.x = owner.x;
        item.y = owner.y;
      }

      while (item.fired < item.projectileCount && item.age >= item.nextFireAt && item.age <= item.duration + 0.03) {
        const target = findCombatBodyById(item.targetId)
          || getEnemyBodies(item.ownerId).find((body) => body.hp > 0 && !body.hidden);
        const fallbackAngle = -Math.PI * 0.5 + (Math.random() - 0.5) * Math.PI;
        const speed = 335 + Math.random() * 70;
        const lead = target ? clamp(length(target.x - item.x, target.y - item.y) / speed, 0.08, 0.32) : 0;
        const aim = target
          ? normalize(target.x + target.vx * lead - item.x, target.y + target.vy * lead - item.y)
          : { x: Math.cos(fallbackAngle), y: Math.sin(fallbackAngle) };
        const jitter = (Math.random() - 0.5) * 0.28;
        const angle = Math.atan2(aim.y, aim.x) + jitter;
        zhiqingScatterRocks.push({
          kind: "rock",
          ownerId: item.ownerId,
          ownerTeamId: item.ownerTeamId,
          x: item.x + Math.cos(angle) * 27,
          y: item.y + Math.sin(angle) * 27,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 14 + Math.random() * 4,
          damage: item.damage,
          label: "土暴",
          age: 0,
          life: 2.35,
          angle,
          spin: (Math.random() > 0.5 ? 1 : -1) * (5.4 + Math.random() * 2.8),
        });
        item.fired += 1;
        item.nextFireAt += item.fireInterval;
        audio?.playSfx("earth");
        addSparks(item.x + Math.cos(angle) * 30, item.y + Math.sin(angle) * 30, "#d6a260", 10);
      }

      if (item.life <= 0 || item.fired >= item.projectileCount && item.age >= item.duration) {
        zhiqingScatterRocks.splice(i, 1);
      }
      continue;
    }

    item.x += item.vx * dt;
    item.y += item.vy * dt;
    item.angle += item.spin * dt;
    item.vx *= 0.992;
    item.vy *= 0.992;

    let removed = false;
    for (const target of getEnemyBodies(item.ownerId)) {
      if (target.hidden || target.immune) continue;
      if (!circleHit(item, target, item.radius + target.radius * 0.75)) continue;
      damage(target, item.damage, { x: item.x, y: item.y, kind: "zhiqing-scatter-rock" });
      addDamageText(target.x, target.y - target.radius - 18, item.label || "飞石", "#d6a260");
      addRing(item.x, item.y, "#c58c4f", 0.58);
      addSparks(item.x, item.y, "#b77a42", 18);
      zhiqingScatterRocks.splice(i, 1);
      removed = true;
      break;
    }
    if (removed) continue;

    if (
      item.life <= 0 ||
      item.x < -90 ||
      item.x > arena.width + 90 ||
      item.y < -90 ||
      item.y > arena.height + 90
    ) {
      zhiqingScatterRocks.splice(i, 1);
    }
  }
}

function updateThrownScythes(dt) {
  for (let i = thrownScythes.length - 1; i >= 0; i -= 1) {
    const item = thrownScythes[i];
    item.age += dt;
    item.life -= dt;

    const target = findCombatBodyById(item.targetId);
    if (target && !target.hidden && !target.immune) {
      const lead = clamp(length(target.x - item.x, target.y - item.y) / item.speed, 0.08, 0.36);
      const aim = normalize(target.x + target.vx * lead - item.x, target.y + target.vy * lead - item.y);
      const current = normalize(item.vx, item.vy);
      const steer = clamp(item.turnRate * dt, 0, 0.18);
      const next = normalize(current.x * (1 - steer) + aim.x * steer, current.y * (1 - steer) + aim.y * steer);
      item.vx = next.x * item.speed;
      item.vy = next.y * item.speed;
    }

    item.x += item.vx * dt;
    item.y += item.vy * dt;
    item.angle += item.spin * dt;

    if (target && !target.hidden && !target.immune && !item.hit && flyingScytheHitsTarget(item, target)) {
      item.hit = true;
      damage(target, item.damage, item);
      audio?.playSfx("scytheHit");
      addSparks(item.x, item.y, "#d9d4e8", 34);
      addRing(item.x, item.y, "#d9d4e8", 0.9);
      thrownScythes.splice(i, 1);
      continue;
    }

    if (
      item.life <= 0 ||
      item.x < -100 ||
      item.x > arena.width + 100 ||
      item.y < -100 ||
      item.y > arena.height + 100
    ) {
      thrownScythes.splice(i, 1);
    }
  }
}

function updateBullets(dt) {
  for (let i = bullets.length - 1; i >= 0; i -= 1) {
    const bullet = bullets[i];
    bullet.life -= dt;
    bullet.x += bullet.vx * dt;
    bullet.y += bullet.vy * dt;
    const target = getEnemyBodies(bullet.ownerId).find((body) => circleHit(bullet, body, bullet.radius + body.radius));
    if (target) {
      damage(target, bullet.damage, bullet);
      addSparks(bullet.x, bullet.y, "#e7cf85", 6);
      addRing(bullet.x, bullet.y, "#e7cf85", 0.24);
      bullets.splice(i, 1);
      continue;
    }
    if (bullet.life <= 0 || bullet.x < -20 || bullet.x > arena.width + 20 || bullet.y < -20 || bullet.y > arena.height + 20) {
      bullets.splice(i, 1);
    }
  }
}

function updateLightShields(dt) {
  for (let i = lightShields.length - 1; i >= 0; i -= 1) {
    const item = lightShields[i];
    item.life -= dt;
    item.x += item.vx * dt;
    item.y += item.vy * dt;
    item.angle += item.spin * dt;

    for (const target of getEnemyBodies(item.ownerId)) {
      if (target.hidden || target.immune || item.hitIds.has(target.id)) continue;
      if (!circleHit(item, target, item.radius + target.radius)) continue;
      item.hitIds.add(target.id);
      damage(target, item.damage, item);
      audio?.playSfx("wallHit");
      addSparks(item.x, item.y, "#9ef8ff", 18);
      addRing(item.x, item.y, "#78f0ff", 0.65);
    }

    if (
      item.life <= 0 ||
      item.x < -90 ||
      item.x > arena.width + 90 ||
      item.y < -90 ||
      item.y > arena.height + 90
    ) {
      lightShields.splice(i, 1);
    }
  }
}

function updateFoldingFans(dt) {
  for (let i = foldingFans.length - 1; i >= 0; i -= 1) {
    const fan = foldingFans[i];
    fan.age += dt;
    fan.life -= dt;

    const target = findCombatBodyById(fan.targetId);
    if (target && !target.hidden && !target.immune) {
      const lead = clamp(length(target.x - fan.x, target.y - fan.y) / fan.speed, 0.08, 0.3);
      const aim = normalize(target.x + target.vx * lead - fan.x, target.y + target.vy * lead - fan.y);
      const current = normalize(fan.vx, fan.vy);
      const steer = clamp(3.4 * dt, 0, 0.14);
      const next = normalize(current.x * (1 - steer) + aim.x * steer, current.y * (1 - steer) + aim.y * steer);
      fan.vx = next.x * fan.speed;
      fan.vy = next.y * fan.speed;
      fan.angle = Math.atan2(fan.vy, fan.vx);
    }

    fan.x += fan.vx * dt;
    fan.y += fan.vy * dt;
    fan.spinAngle += fan.spin * dt;

    if (target && !target.hidden && !target.immune && circleHit(fan, target, fan.radius + target.radius * 0.78)) {
      damage(target, fan.damage, fan);
      addSparks(fan.x, fan.y, "#ffb06f", 14);
      addRing(fan.x, fan.y, "#f3a35f", 0.5);
      foldingFans.splice(i, 1);
      continue;
    }

    if (
      fan.life <= 0 ||
      fan.x < -80 ||
      fan.x > arena.width + 80 ||
      fan.y < -80 ||
      fan.y > arena.height + 80
    ) {
      foldingFans.splice(i, 1);
    }
  }
}

function updateFireballs(dt) {
  for (let i = fireballs.length - 1; i >= 0; i -= 1) {
    const fireball = fireballs[i];
    fireball.age += dt;
    fireball.life -= dt;
    const target = findCombatBodyById(fireball.targetId);

    if (target && !target.hidden && !target.immune) {
      const lead = clamp(length(target.x - fireball.x, target.y - fireball.y) / fireball.speed, 0.08, 0.34);
      const aim = normalize(target.x + target.vx * lead - fireball.x, target.y + target.vy * lead - fireball.y);
      const current = normalize(fireball.vx, fireball.vy);
      const steer = clamp(2.8 * dt, 0, 0.12);
      const next = normalize(current.x * (1 - steer) + aim.x * steer, current.y * (1 - steer) + aim.y * steer);
      fireball.vx = next.x * fireball.speed;
      fireball.vy = next.y * fireball.speed;
    }

    fireball.x += fireball.vx * dt;
    fireball.y += fireball.vy * dt;

    if (target && !target.hidden && !target.immune && circleHit(fireball, target, fireball.radius + target.radius * 0.86)) {
      damage(target, fireball.damage, fireball);
      addSparks(fireball.x, fireball.y, "#ff8a2a", 34);
      addSparks(fireball.x, fireball.y, "#ffd15a", 18);
      addRing(fireball.x, fireball.y, "#ff6a2a", 1.05);
      fireballs.splice(i, 1);
      continue;
    }

    if (
      fireball.life <= 0 ||
      fireball.x < -90 ||
      fireball.x > arena.width + 90 ||
      fireball.y < -90 ||
      fireball.y > arena.height + 90
    ) {
      fireballs.splice(i, 1);
    }
  }
}

function updateAgenProjectiles(dt) {
  for (let i = agenProjectiles.length - 1; i >= 0; i -= 1) {
    const projectile = agenProjectiles[i];
    projectile.age += dt;
    projectile.life -= dt;
    projectile.x += projectile.vx * dt;
    projectile.y += projectile.vy * dt;
    const target = findCombatBodyById(projectile.targetId);

    if (target && !target.hidden && !target.immune && circleHit(projectile, target, projectile.radius + target.radius * 0.78)) {
      damage(target, projectile.damage, projectile);
      if (projectile.type === "ice") {
        target.frozenRemaining = Math.max(target.frozenRemaining || 0, projectile.freezeDuration);
        addRing(target.x, target.y, "#bff8ff", 0.78);
        addSparks(target.x, target.y, "#dffcff", 22);
        addDamageText(target.x, target.y - target.radius - 18, "冻结", "#dffcff");
      } else {
        target.burnRemaining = Math.max(target.burnRemaining || 0, projectile.burnDuration);
        target.burnTickRemaining = 1;
        addRing(target.x, target.y, "#48dfff", 0.72);
        addSparks(target.x, target.y, "#5ce7ff", 24);
        addDamageText(target.x, target.y - target.radius - 18, "焚烧", "#7ef0ff");
      }
      agenProjectiles.splice(i, 1);
      continue;
    }

    if (
      projectile.life <= 0 ||
      projectile.x < -90 ||
      projectile.x > arena.width + 90 ||
      projectile.y < -90 ||
      projectile.y > arena.height + 90
    ) {
      agenProjectiles.splice(i, 1);
    }
  }
}

function updateQidaoRocks(dt) {
  for (let i = qidaoRocks.length - 1; i >= 0; i -= 1) {
    const rock = qidaoRocks[i];
    rock.age += dt;
    rock.life -= dt;
    const owner = fighters?.find((fighter) => fighter.id === rock.ownerId);
    const target = findCombatBodyById(rock.targetId);

    if (rock.phase === "gather") {
      if (owner && owner.hp > 0 && !owner.hidden) {
        rock.x = owner.x;
        rock.y = owner.y;
      }
      if (rock.age >= rock.gatherDuration) {
        const liveTarget =
          target && !target.hidden && !target.immune
            ? target
            : owner ? selectTarget(owner, getOpponentController(owner)) : null;
        if (!liveTarget || !owner) {
          qidaoRocks.splice(i, 1);
          continue;
        }
        const aim = getProjectileAim(rock.x, rock.y, liveTarget, rock.speed, 0.08, 0.38);
        rock.vx = aim.x * rock.speed;
        rock.vy = aim.y * rock.speed;
        rock.angle = Math.atan2(rock.vy, rock.vx);
        rock.phase = "throw";
        rock.launched = true;
        rock.age = 0;
        rock.targetId = liveTarget.id;
        addSparks(rock.x, rock.y, "#d0a15f", 18);
      }
      continue;
    }

    if (target && !target.hidden && !target.immune) {
      const lead = clamp(length(target.x - rock.x, target.y - rock.y) / rock.speed, 0.08, 0.36);
      const aim = normalize(target.x + target.vx * lead - rock.x, target.y + target.vy * lead - rock.y);
      const current = normalize(rock.vx, rock.vy);
      const steer = clamp(2.55 * dt, 0, 0.12);
      const next = normalize(current.x * (1 - steer) + aim.x * steer, current.y * (1 - steer) + aim.y * steer);
      rock.vx = next.x * rock.speed;
      rock.vy = next.y * rock.speed;
      rock.angle = Math.atan2(rock.vy, rock.vx);
    }

    rock.x += rock.vx * dt;
    rock.y += rock.vy * dt;
    rock.angle += rock.spin * dt;

    if (target && !target.hidden && !target.immune && circleHit(rock, target, rock.radius + target.radius * 0.82)) {
      damage(target, rock.damage, rock);
      addSparks(rock.x, rock.y, "#d0a15f", 26);
      addRing(rock.x, rock.y, "#d09b58", 0.78);
      qidaoRocks.splice(i, 1);
      continue;
    }

    if (
      rock.life <= 0 ||
      rock.x < -100 ||
      rock.x > arena.width + 100 ||
      rock.y < -100 ||
      rock.y > arena.height + 100
    ) {
      qidaoRocks.splice(i, 1);
    }
  }
}

function updateXuanliProjectiles(dt) {
  for (let i = xuanliProjectiles.length - 1; i >= 0; i -= 1) {
    const projectile = xuanliProjectiles[i];
    projectile.age += dt;
    projectile.life -= dt;
    projectile.trailTick += dt;
    if (projectile.trail.length === 0 || projectile.trailTick >= 0.04) {
      projectile.trail.push({ x: projectile.x, y: projectile.y, age: 0, radius: projectile.radius });
      projectile.trailTick = 0;
    }
    projectile.trail.forEach((point) => {
      point.age += dt;
    });
    while (projectile.trail.length > 12 || (projectile.trail[0] && projectile.trail[0].age > 0.42)) {
      projectile.trail.shift();
    }

    const target = findCombatBodyById(projectile.targetId);
    if (target && !target.hidden && !target.immune) {
      const lead = clamp(length(target.x - projectile.x, target.y - projectile.y) / projectile.speed, 0.08, 0.34);
      const aim = normalize(target.x + target.vx * lead - projectile.x, target.y + target.vy * lead - projectile.y);
      const current = normalize(projectile.vx, projectile.vy);
      const normal = { x: -current.y, y: current.x };
      const curveStrength = Math.sin(projectile.age * 4.2) * projectile.curve * 0.16;
      const desired = normalize(aim.x + normal.x * curveStrength, aim.y + normal.y * curveStrength);
      const steer = clamp(projectile.turnRate * dt, 0, 0.13);
      const next = normalize(current.x * (1 - steer) + desired.x * steer, current.y * (1 - steer) + desired.y * steer);
      projectile.vx = next.x * projectile.speed;
      projectile.vy = next.y * projectile.speed;
    }

    projectile.x += projectile.vx * dt;
    projectile.y += projectile.vy * dt;

    if (target && !target.hidden && !target.immune && circleHit(projectile, target, projectile.radius + target.radius * 0.76)) {
      damage(target, projectile.damage, projectile);
      if (projectile.type === "ice") {
        target.slowRemaining = projectile.slowDuration;
        target.slowMultiplier = projectile.slowMultiplier;
      }
      addRing(target.x, target.y, projectile.type === "fire" ? "#ff7a2e" : "#eefcff", 0.72);
      addSparks(target.x, target.y, projectile.type === "fire" ? "#ff8f3f" : "#effcff", 22);
      xuanliProjectiles.splice(i, 1);
      continue;
    }

    if (
      projectile.life <= 0 ||
      projectile.x < -90 ||
      projectile.x > arena.width + 90 ||
      projectile.y < -90 ||
      projectile.y > arena.height + 90
    ) {
      xuanliProjectiles.splice(i, 1);
    }
  }
}

function updateXuanliUltimates(dt) {
  for (let i = xuanliUltimates.length - 1; i >= 0; i -= 1) {
    const orb = xuanliUltimates[i];
    orb.age += dt;

    if (orb.phase === "gather") {
      if (orb.age >= orb.gatherDuration) {
        orb.phase = "chase";
        orb.age = 0;
        const target = findCombatBodyById(orb.targetId);
        const aim = target ? normalize(target.x - orb.x, target.y - orb.y) : { x: 1, y: 0 };
        orb.vx = aim.x * orb.speed;
        orb.vy = aim.y * orb.speed;
        addRing(orb.x, orb.y, "#fff7df", 1.08);
        addSparks(orb.x, orb.y, "#ff9b42", 16);
        addSparks(orb.x, orb.y, "#effcff", 16);
      }
      continue;
    }

    orb.chaseRemaining -= dt;
    orb.trailTick += dt;
    if (orb.trail.length === 0 || orb.trailTick >= 0.045) {
      orb.trail.push({ x: orb.x, y: orb.y, age: 0 });
      orb.trailTick = 0;
    }
    orb.trail.forEach((point) => {
      point.age += dt;
    });
    while (orb.trail.length > 16 || (orb.trail[0] && orb.trail[0].age > 0.55)) {
      orb.trail.shift();
    }

    const target = findCombatBodyById(orb.targetId);
    if (target && !target.hidden && !target.immune) {
      const lead = clamp(length(target.x - orb.x, target.y - orb.y) / orb.speed, 0.08, 0.42);
      const desired = normalize(target.x + target.vx * lead - orb.x, target.y + target.vy * lead - orb.y);
      const current = normalize(orb.vx, orb.vy);
      const steer = clamp(orb.turnRate * dt, 0, 0.16);
      const next = normalize(current.x * (1 - steer) + desired.x * steer, current.y * (1 - steer) + desired.y * steer);
      orb.vx = next.x * orb.speed;
      orb.vy = next.y * orb.speed;
    }

    orb.x += orb.vx * dt;
    orb.y += orb.vy * dt;

    if (target && !target.hidden && !target.immune && circleHit(orb, target, orb.radius + target.radius * 0.78)) {
      damage(target, orb.damage, orb);
      addRing(target.x, target.y, "#fff2d8", 1.08);
      addSparks(target.x, target.y, "#ff8440", 28);
      addSparks(target.x, target.y, "#effcff", 28);
      xuanliUltimates.splice(i, 1);
      continue;
    }

    if (
      orb.chaseRemaining <= 0 ||
      orb.x < -120 ||
      orb.x > arena.width + 120 ||
      orb.y < -120 ||
      orb.y > arena.height + 120
    ) {
      xuanliUltimates.splice(i, 1);
    }
  }
}

function updateLuoxiaoheiMetalPlates(dt) {
  for (let i = luoxiaoheiMetalPlates.length - 1; i >= 0; i -= 1) {
    const plate = luoxiaoheiMetalPlates[i];
    plate.age += dt;
    plate.life -= dt;
    plate.spinAngle += plate.spin * dt;

    const target = findCombatBodyById(plate.targetId);
    if (target && !target.hidden && !target.immune) {
      const lead = clamp(length(target.x - plate.x, target.y - plate.y) / plate.speed, 0.08, 0.34);
      const aim = normalize(target.x + target.vx * lead - plate.x, target.y + target.vy * lead - plate.y);
      const current = normalize(plate.vx, plate.vy);
      const normal = { x: -current.y, y: current.x };
      const curveStrength = Math.sin(plate.age * 4.4) * plate.curve * 0.16;
      const desired = normalize(aim.x + normal.x * curveStrength, aim.y + normal.y * curveStrength);
      const steer = clamp(plate.turnRate * dt, 0, 0.14);
      const next = normalize(current.x * (1 - steer) + desired.x * steer, current.y * (1 - steer) + desired.y * steer);
      plate.vx = next.x * plate.speed;
      plate.vy = next.y * plate.speed;
    }

    plate.x += plate.vx * dt;
    plate.y += plate.vy * dt;

    if (target && !target.hidden && !target.immune && circleHit(plate, target, plate.radius + target.radius * 0.76)) {
      damage(target, plate.damage, plate);
      audio?.playSfx("scytheHit");
      addSparks(plate.x, plate.y, "#cbd4d2", 18);
      addRing(plate.x, plate.y, "#b8c0bd", 0.56);
      luoxiaoheiMetalPlates.splice(i, 1);
      continue;
    }

    if (
      plate.life <= 0 ||
      plate.x < -90 ||
      plate.x > arena.width + 90 ||
      plate.y < -90 ||
      plate.y > arena.height + 90
    ) {
      luoxiaoheiMetalPlates.splice(i, 1);
    }
  }
}

function updateLuoxiaoheiTeleports(dt) {
  for (let i = luoxiaoheiTeleports.length - 1; i >= 0; i -= 1) {
    const portal = luoxiaoheiTeleports[i];
    portal.age += dt;
    const caster = fighters?.find((fighter) => fighter.id === portal.ownerId);
    const target = findCombatBodyById(portal.targetId);

    if (!caster || caster.hp <= 0) {
      luoxiaoheiTeleports.splice(i, 1);
      continue;
    }

    if (!portal.hit && portal.age >= portal.emergeAt) {
      portal.hit = true;
      caster.hidden = false;
      caster.trapped = false;
      caster.x = portal.exitX;
      caster.y = portal.exitY;
      const direction = target && !target.hidden
        ? normalize(target.x - caster.x, target.y - caster.y)
        : normalize(portal.exitX - portal.entryX, portal.exitY - portal.entryY);
      caster.vx = direction.x * caster.speed * 0.62;
      caster.vy = direction.y * caster.speed * 0.62;
      if (target && !target.hidden && !target.immune) {
        damage(target, portal.damage, { x: caster.x, y: caster.y, kind: "luoxiaohei-teleport" });
        addRing(target.x, target.y, "#9ed78f", 0.62);
        addSparks(target.x, target.y, "#d8f8cf", 20);
      }
      addRing(caster.x, caster.y, "#101317", 0.86);
      addDamageText(caster.x, caster.y - caster.radius - 16, "传送", "#dff7d7");
    }

    if (portal.age >= portal.duration) {
      if (caster.hidden) {
        caster.hidden = false;
        caster.trapped = false;
        caster.x = portal.exitX;
        caster.y = portal.exitY;
      }
      luoxiaoheiTeleports.splice(i, 1);
    }
  }
}

function updateLuoxiaoheiClones(dt) {
  for (let i = luoxiaoheiClones.length - 1; i >= 0; i -= 1) {
    const clone = luoxiaoheiClones[i];
    clone.age += dt;
    clone.life -= dt;
    const owner = fighters?.find((fighter) => fighter.id === clone.ownerId);
    const target = findCombatBodyById(clone.targetId);

    if (clone.phase === "hold") {
      clone.holdRemaining = Math.max(0, clone.holdRemaining - dt);
      if (owner && owner.hp > 0 && !owner.hidden) {
        clone.orbitAngle += dt * clone.orbitSpeed;
        const orbit = owner.radius + 22 + Math.sin(elapsed * 5.2 + clone.wobble) * 2.5;
        clone.x = owner.x + Math.cos(clone.orbitAngle) * orbit;
        clone.y = owner.y + Math.sin(clone.orbitAngle) * orbit;
      }
      if (clone.holdRemaining <= 0) {
        const aim = target && !target.hidden
          ? getProjectileAim(clone.x, clone.y, target, clone.speed, 0.08, 0.34)
          : normalize(Math.cos(clone.orbitAngle), Math.sin(clone.orbitAngle));
        clone.vx = aim.x * clone.speed;
        clone.vy = aim.y * clone.speed;
        clone.phase = "fly";
        clone.life = 2.2;
      }
      continue;
    }

    if (target && !target.hidden && !target.immune) {
      const lead = clamp(length(target.x - clone.x, target.y - clone.y) / clone.speed, 0.08, 0.32);
      const aim = normalize(target.x + target.vx * lead - clone.x, target.y + target.vy * lead - clone.y);
      const current = normalize(clone.vx, clone.vy);
      const steer = clamp(3.5 * dt, 0, 0.16);
      const next = normalize(current.x * (1 - steer) + aim.x * steer, current.y * (1 - steer) + aim.y * steer);
      clone.vx = next.x * clone.speed;
      clone.vy = next.y * clone.speed;
    }

    clone.x += clone.vx * dt;
    clone.y += clone.vy * dt;

    if (target && !target.hidden && !target.immune && circleHit(clone, target, clone.radius + target.radius * 0.62)) {
      damage(target, clone.damage, clone);
      addSparks(clone.x, clone.y, "#bfeeb5", 12);
      addRing(clone.x, clone.y, "#9ed78f", 0.42);
      luoxiaoheiClones.splice(i, 1);
      continue;
    }

    if (
      clone.life <= 0 ||
      clone.x < -60 ||
      clone.x > arena.width + 60 ||
      clone.y < -60 ||
      clone.y > arena.height + 60
    ) {
      luoxiaoheiClones.splice(i, 1);
    }
  }
}

function updateJiulaoInsightZones(dt) {
  for (let i = jiulaoInsightZones.length - 1; i >= 0; i -= 1) {
    const zone = jiulaoInsightZones[i];
    zone.age += dt;

    const owner = fighters?.find((fighter) => fighter.id === zone.ownerId);
    const ownerTeamId = zone.ownerTeamId || owner?.teamId;
    const targets = ownerTeamId
      ? fighters.filter((fighter) => fighter.teamId !== ownerTeamId).flatMap(getCombatBodies)
      : getEnemyBodies(zone.ownerId);

    for (const target of targets) {
      const targetController = getControllerForBody(target);
      if (target.id === zone.ownerId || targetController?.teamId === ownerTeamId) continue;
      if (target.hidden || target.immune || zone.hitIds.has(target.id)) continue;
      if (!circleHit(zone, target, zone.radius + target.radius * 0.58)) continue;
      zone.hitIds.add(target.id);
      target.slowRemaining = Math.max(target.slowRemaining || 0, zone.slowDuration);
      target.slowMultiplier = Math.min(target.slowMultiplier || 1, zone.slowMultiplier);
      damage(target, zone.damage, { x: target.x, y: target.y, kind: "jiulao-insight" });
      addDamageText(target.x, target.y - target.radius - 18, "洞察", "#dce9f0");
      addRing(target.x, target.y, "#dce9f0", 0.58);
      addSparks(target.x, target.y, "#eaf5f8", 14);
    }

    if (zone.age >= zone.duration) {
      jiulaoInsightZones.splice(i, 1);
    }
  }
}

function updateJiulaoMetalThorns(dt) {
  for (let i = jiulaoMetalThorns.length - 1; i >= 0; i -= 1) {
    const thorn = jiulaoMetalThorns[i];
    thorn.age += dt;
    const owner = fighters?.find((fighter) => fighter.id === thorn.ownerId);
    if (owner && owner.hp > 0 && !owner.hidden) {
      thorn.x = owner.x;
      thorn.y = owner.y;
    }

    const progress = easeOutCubic(clamp(thorn.age / 0.24, 0, 1));
    const activeLength = thorn.length * progress;
    const wave = Math.sin(thorn.age * 18 + thorn.side) * thorn.sway;
    const dir = normalize(
      thorn.dirX * Math.cos(wave) - thorn.dirY * Math.sin(wave),
      thorn.dirX * Math.sin(wave) + thorn.dirY * Math.cos(wave),
    );
    const start = {
      x: thorn.x + dir.x * 18,
      y: thorn.y + dir.y * 18,
    };
    const end = {
      x: thorn.x + dir.x * activeLength,
      y: thorn.y + dir.y * activeLength,
    };

    if (thorn.age >= 0.12 && thorn.age <= 0.58) {
      for (const target of getEnemyBodies(thorn.ownerId)) {
        if (target.hidden || target.immune || thorn.hitIds.has(target.id)) continue;
        if (distancePointToSegment(target, start, end) > target.radius + 13) continue;
        thorn.hitIds.add(target.id);
        damage(target, thorn.damage, { x: target.x, y: target.y, kind: "jiulao-thorn" });
        audio?.playSfx("scytheHit");
        addDamageText(target.x, target.y - target.radius - 18, "凌荆", "#d6dde2");
        addRing(target.x, target.y, "#cbd5dc", 0.62);
        addSparks(target.x, target.y, "#dce4e8", 20);
      }
    }

    if (thorn.age >= thorn.life) {
      jiulaoMetalThorns.splice(i, 1);
    }
  }
}

function updateDreamTrances(dt) {
  for (let i = dreamTrances.length - 1; i >= 0; i -= 1) {
    const trance = dreamTrances[i];
    trance.remaining -= dt;
    const target = findCombatBodyById(trance.targetId);
    if (!target || target.hidden) {
      dreamTrances.splice(i, 1);
      continue;
    }
    target.trapped = true;
    target.vx = 0;
    target.vy = 0;
    if (trance.remaining > 0) continue;

    target.trapped = false;
    target.vx = target.id?.includes("red") ? 140 : -140;
    target.vy = target.id?.includes("red") ? -86 : 86;
    damage(target, trance.damage, { x: target.x, y: target.y });
    addDamageText(target.x, target.y - target.radius - 22, "梦醒", "#ff8f72");
    addRing(target.x, target.y, "#d3232d", 1);
    addSparks(target.x, target.y, "#ff6b59", 28);
    dreamTrances.splice(i, 1);
  }
}

function flyingScytheHitsTarget(item, target) {
  if (circleHit(item, target, item.radius + target.radius * 0.9)) return true;
  const dir = normalize(item.vx, item.vy);
  const side = { x: -dir.y, y: dir.x };
  const sweepStart = {
    x: item.x - dir.x * 24 - side.x * 34,
    y: item.y - dir.y * 24 - side.y * 34,
  };
  const sweepEnd = {
    x: item.x + dir.x * 38 + side.x * 34,
    y: item.y + dir.y * 38 + side.y * 34,
  };
  return distancePointToSegment(target, sweepStart, sweepEnd) <= target.radius + 24;
}

function getEarthPillarRect(pillar) {
  const grow = easeOutCubic(clamp(pillar.age / pillar.growTime, 0, 1));
  const length = pillar.length * grow;
  if (pillar.edge === "top") {
    return {
      x: pillar.x - pillar.thickness / 2,
      y: arena.padding,
      width: pillar.thickness,
      height: length,
    };
  }
  if (pillar.edge === "bottom") {
    return {
      x: pillar.x - pillar.thickness / 2,
      y: arena.height - arena.padding - length,
      width: pillar.thickness,
      height: length,
    };
  }
  if (pillar.edge === "left") {
    return {
      x: arena.padding,
      y: pillar.y - pillar.thickness / 2,
      width: length,
      height: pillar.thickness,
    };
  }
  return {
    x: arena.width - arena.padding - length,
    y: pillar.y - pillar.thickness / 2,
    width: length,
    height: pillar.thickness,
  };
}

function updateBlackHoles(dt) {
  for (let i = blackHoles.length - 1; i >= 0; i -= 1) {
    const hole = blackHoles[i];
    hole.age += dt;
    const owner = findCombatBodyById(hole.ownerId);

    for (const fighter of getEnemyBodies(hole.ownerId)) {
      if (fighter.hidden) continue;
      const touched = circleHit(hole, fighter, hole.radius + fighter.radius * 0.65);
      if (touched) {
        hole.trappedIds.add(fighter.id);
        fighter.trapped = true;
        fighter.vx = 0;
        fighter.vy = 0;
      }
    }

    if (hole.age >= hole.duration) {
      if (owner) {
        owner.hidden = false;
        owner.immune = false;
        owner.x = clamp(hole.x, arena.padding + owner.radius, arena.width - arena.padding - owner.radius);
        owner.y = clamp(hole.y, arena.padding + owner.radius, arena.height - arena.padding - owner.radius);
        owner.vx = 160;
        owner.vy = -120;
      }

      for (const trappedId of hole.trappedIds) {
        const trapped = findCombatBodyById(trappedId);
        if (!trapped) continue;
        trapped.trapped = false;
        trapped.x = clamp(hole.x + hole.radius + trapped.radius + 8, arena.padding + trapped.radius, arena.width - arena.padding - trapped.radius);
        trapped.y = clamp(hole.y, arena.padding + trapped.radius, arena.height - arena.padding - trapped.radius);
        trapped.vx = 150;
        trapped.vy = 95;
        damage(trapped, hole.damage, hole);
        addRing(trapped.x, trapped.y, "#111827", 0.8);
      }

      addSparks(hole.x, hole.y, "#7c6bf2", 20);
      blackHoles.splice(i, 1);
    }
  }
}

function updateTrees(dt) {
  for (let i = trees.length - 1; i >= 0; i -= 1) {
    const tree = trees[i];
    tree.age += dt;

    for (const fighter of getEnemyBodies(tree.ownerId)) {
      if (fighter.hidden || fighter.immune) continue;
      if (!circleRectHit(fighter, tree)) continue;

      const currentCarry = tree.damageCarry.get(fighter.id) || 0;
      const nextCarry = currentCarry + tree.damagePerSecond * dt;
      const wholeDamage = Math.floor(nextCarry);
      if (wholeDamage > 0) {
        damage(fighter, wholeDamage);
      }
      tree.damageCarry.set(fighter.id, nextCarry - wholeDamage);
    }

    if (tree.age >= tree.duration) {
      trees.splice(i, 1);
    }
  }
}

function updateFengxiDomainLines(dt) {
  for (let i = fengxiDomainLines.length - 1; i >= 0; i -= 1) {
    const line = fengxiDomainLines[i];
    line.age += dt;
    line.life -= dt;
    line.x += line.vx * dt;

    const minX = Math.min(line.x - line.width / 2, line.x + line.width / 2);
    const maxX = Math.max(line.x - line.width / 2, line.x + line.width / 2);
    const minY = line.y - line.thickness * 1.6;
    const maxY = line.y + line.thickness * 1.6;

    for (const target of getEnemyBodies(line.ownerId)) {
      if (target.hidden || target.immune || line.hitIds.has(target.id)) continue;
      const overlapsX = target.x + target.radius >= minX && target.x - target.radius <= maxX;
      const overlapsY = target.y + target.radius >= minY && target.y - target.radius <= maxY;
      if (!overlapsX || !overlapsY) continue;
      line.hitIds.add(target.id);
      damage(target, line.damage, { x: target.x, y: line.y, kind: "fengxi-domain-line" });
      addRing(target.x, line.y, "#b8dcff", 0.48);
      addSparks(target.x, line.y, "#d8efff", 10);
    }

    const passedEnd = line.vx > 0
      ? line.x - line.width / 2 > line.endX
      : line.x + line.width / 2 < line.endX;
    if (line.life <= 0 || passedEnd) {
      fengxiDomainLines.splice(i, 1);
    }
  }
}

function circleHit(a, b, radius) {
  return length(a.x - b.x, a.y - b.y) <= radius;
}

function circleRectHit(circle, rect) {
  const nearestX = clamp(circle.x, rect.x, rect.x + rect.width);
  const nearestY = clamp(circle.y, rect.y, rect.y + rect.height);
  return length(circle.x - nearestX, circle.y - nearestY) <= circle.radius;
}

function distancePointToSegment(point, start, end) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const segmentLengthSq = dx * dx + dy * dy || 1;
  const t = clamp(((point.x - start.x) * dx + (point.y - start.y) * dy) / segmentLengthSq, 0, 1);
  const closestX = start.x + dx * t;
  const closestY = start.y + dy * t;
  return length(point.x - closestX, point.y - closestY);
}

function finishRound(winner) {
  roundEnding = false;
  pendingRoundWinner = null;
  pendingRoundFinishRemaining = 0;
  gameOver = true;
  roundWinner = winner;
  ui.resultText.textContent = `${getWinnerLabel(winner)} 获胜`;
  ui.resultImage.src = roleMeta[winner.role].image;
  ui.resultImage.alt = winner.name;
  ui.resultSubtitle.textContent = `用时 ${ui.timer.textContent}`;
  ui.result.hidden = false;
}

function getWinnerLabel(winner) {
  if (battleMode !== "2v1" || winner.teamId !== "red") return winner.name;
  return getTeamControllers("red").map((fighter) => fighter.name).join("、");
}

function getRoleImage(role) {
  const imageKey = role === "scythe" ? "haoke" : role === "fengxiDomain" ? "fengxi" : role;
  return roleImages[imageKey];
}

function scheduleRoundFinish(winner, delay = 0) {
  if (gameOver || roundEnding) return;
  const fengxiDomain = getDefeatedFengxiDomainForEnding(winner);
  if (fengxiDomain) {
    addUltimateEffect("fengxiDomainDefeat", arena.width / 2, arena.height / 2);
    addRing(fengxiDomain.x, fengxiDomain.y, "#88d463", 1.4);
    delay = Math.max(delay, 5);
  }
  if (!delay) {
    finishRound(winner);
    return;
  }
  roundEnding = true;
  pendingRoundWinner = winner;
  pendingRoundFinishRemaining = delay;
}

function getDefeatedFengxiDomainForEnding(winner) {
  if (battleMode !== "2v1" || !winner) return null;
  return fighters.find((fighter) => (
    fighter.role === "fengxiDomain"
    && fighter.hp <= 0
    && fighter.teamId !== winner.teamId
    && isTeamDefeated(fighter.teamId)
  )) || null;
}

function updatePendingRoundFinish(dt) {
  if (!roundEnding || gameOver) return;
  pendingRoundFinishRemaining = Math.max(0, pendingRoundFinishRemaining - dt);
  updateEffects(dt);
  updateUltimateEffects(dt);
  updateDamageTexts(dt);
  if (pendingRoundFinishRemaining <= 0 && pendingRoundWinner) {
    finishRound(pendingRoundWinner);
  }
}

function addRing(x, y, color, size = 1) {
  effects.push({ x, y, color, age: 0, life: 0.45, size });
}

function addSparks(x, y, color, count) {
  for (let i = 0; i < count; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 70 + Math.random() * 170;
    sparks.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      color,
      age: 0,
      life: 0.26 + Math.random() * 0.22,
    });
  }
}

function addDamageText(x, y, amount, colorOverride = null) {
  const isNumber = typeof amount === "number";
  damageTexts.push({
    x,
    y,
    text: isNumber ? `-${amount}` : amount,
    color: colorOverride || (isNumber ? "#ff4d4f" : "#ef4b4f"),
    age: 0,
    life: isNumber ? 0.85 : 1.1,
    vy: isNumber ? -34 : -22,
  });
}

function addUltimateEffect(type, x = arena.width / 2, y = arena.height / 2) {
  const life = type === "seal" ? 1.9 : type === "luye" ? 1.35 : type === "ximuzi" ? 2 : type === "iceAge" ? 3 : type === "qidao" ? 1.1 : type === "zhiqingEarthBurst" ? 1.45 : type === "mingwangRevive" ? 1.65 : type === "fengxiDomainIntro" ? 2.7 : type === "fengxiDomainDefeat" ? 5 : type === "danjinIntro" ? 2.1 : type === "danjinBreak" ? 1.2 : 1.45;
  ultimateEffects.push({
    type,
    x,
    y,
    age: 0,
    life,
    angle: type === "scythe" ? Math.random() * Math.PI * 2 : 0,
    points: type === "luye" ? createLuyeLightPoints(x, y) : null,
    growth: type === "fengxiDomainDefeat" ? createFengxiDomainDefeatGrowth() : null,
  });
}

function createFengxiDomainDefeatGrowth() {
  const trees = Array.from({ length: 8 }, (_, index) => {
    const t = index / 7;
    return {
      x: arena.padding + t * (arena.width - arena.padding * 2) + (Math.random() - 0.5) * 42,
      width: 250 + Math.random() * 170,
      bottomOffset: 28 + Math.random() * 86,
      delay: Math.random() * 0.3,
      seed: Math.random() * 100,
    };
  });
  const vines = Array.from({ length: 16 }, (_, index) => {
    const fromTop = index % 3 === 0;
    return {
      origin: fromTop ? "top" : "bottom",
      x: arena.padding + Math.random() * (arena.width - arena.padding * 2),
      y: fromTop ? -28 - Math.random() * 40 : arena.height + 18 + Math.random() * 42,
      height: fromTop ? 280 + Math.random() * 220 : 350 + Math.random() * 260,
      angle: (Math.random() - 0.5) * (fromTop ? 0.48 : 0.66),
      flipX: Math.random() < 0.5,
      delay: Math.random() * 0.46,
      seed: Math.random() * 100,
    };
  });
  return { trees, vines };
}

function createLuyeLightPoints(targetX, targetY) {
  const points = [];
  for (let i = 0; i < 32; i += 1) {
    const edge = i % 4;
    const x = edge === 0 ? Math.random() * arena.width : edge === 1 ? arena.width + 40 : edge === 2 ? Math.random() * arena.width : -40;
    const y = edge === 0 ? -40 : edge === 1 ? Math.random() * arena.height : edge === 2 ? arena.height + 40 : Math.random() * arena.height;
    points.push({
      x,
      y,
      tx: targetX + (Math.random() - 0.5) * 70,
      ty: targetY + (Math.random() - 0.5) * 70,
      size: 2 + Math.random() * 3.8,
      delay: Math.random() * 0.28,
    });
  }
  return points;
}

function updateEffects(dt) {
  for (let i = effects.length - 1; i >= 0; i -= 1) {
    effects[i].age += dt;
    if (effects[i].age >= effects[i].life) effects.splice(i, 1);
  }

  for (let i = sparks.length - 1; i >= 0; i -= 1) {
    const spark = sparks[i];
    spark.age += dt;
    spark.x += spark.vx * dt;
    spark.y += spark.vy * dt;
    spark.vx *= 0.95;
    spark.vy *= 0.95;
    if (spark.age >= spark.life) sparks.splice(i, 1);
  }
}

function updateUltimateEffects(dt) {
  for (let i = ultimateEffects.length - 1; i >= 0; i -= 1) {
    ultimateEffects[i].age += dt;
    if (ultimateEffects[i].age >= ultimateEffects[i].life) ultimateEffects.splice(i, 1);
  }
}

function updateDamageTexts(dt) {
  for (let i = damageTexts.length - 1; i >= 0; i -= 1) {
    const item = damageTexts[i];
    item.age += dt;
    item.y += item.vy * dt;
    item.vy *= 0.985;
    if (item.age >= item.life) damageTexts.splice(i, 1);
  }
}

function updateUi() {
  const red = fighters[0];
  const redAlly = battleMode === "2v1" ? fighters[1] : null;
  const blue = battleMode === "2v1" ? fighters[2] : fighters[1];
  ui.redHp.style.width = `${(red.hp / red.maxHp) * 100}%`;
  ui.blueHp.style.width = `${(blue.hp / blue.maxHp) * 100}%`;
  ui.redHpText.textContent = getHealthLabel(red);
  ui.blueHpText.textContent = getHealthLabel(blue);
  setSkillText(ui.redSkill, red);
  setSkillText(ui.blueSkill, blue);
  if (redAlly) {
    ui.redAllyHp.style.width = `${(redAlly.hp / redAlly.maxHp) * 100}%`;
    ui.redAllyHpText.textContent = getHealthLabel(redAlly);
    setSkillText(ui.redAllySkill, redAlly);
  }
  const minutes = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const seconds = String(Math.floor(elapsed % 60)).padStart(2, "0");
  ui.timer.textContent = `${minutes}:${seconds}`;
}

function getHealthLabel(fighter) {
  if (isSquadController(fighter)) {
    const survivors = fighter.units.filter((unit) => unit.hp > 0).length;
    return `${survivors} / 5 存活 · 单位 15 HP`;
  }
  return `${Math.ceil(fighter.hp)} / ${fighter.maxHp} HP`;
}

function setSkillText(element, fighter) {
  if (fighter.sealed) {
    element.textContent = `封印 ${fighter.sealRemaining.toFixed(1)}s`;
    element.classList.add("ready");
    return;
  }

  if (fighter.role === "infinite") {
    const rebar = Math.max(0, fighter.skills.rebar.cooldownRemaining);
    const hole = Math.max(0, fighter.skills.blackHole.cooldownRemaining);
    if (fighter.hidden) {
      const activeHole = blackHoles.find((item) => item.ownerId === fighter.id);
      const remaining = activeHole ? activeHole.duration - activeHole.age : 0;
      element.textContent = `领域吞噬 ${Math.max(0, remaining).toFixed(1)}s`;
      element.classList.add("ready");
      return;
    }
    element.textContent = `金${rebar.toFixed(1)}s / 域${hole.toFixed(1)}s`;
    element.classList.toggle("ready", rebar <= 0 || hole <= 0);
    return;
  }

  if (fighter.role === "fengxi") {
    const tree = Math.max(0, fighter.skills.tree.cooldownRemaining);
    if (fighter.skills.seal.used) {
      element.textContent = `木${tree.toFixed(1)}s / 豪夺已用`;
    } else if (fighter.skills.seal.ready) {
      element.textContent = `木${tree.toFixed(1)}s / 豪夺就绪`;
    } else {
      element.textContent = `木${tree.toFixed(1)}s / 豪夺待触发`;
    }
    element.classList.toggle("ready", fighter.skills.seal.ready || tree <= 0);
    return;
  }

  if (fighter.role === "fengxiDomain") {
    const tree = Math.max(0, fighter.skills.tree.cooldownRemaining);
    const domain = Math.max(0, fighter.skills.domain.cooldownRemaining);
    element.textContent = `木${tree.toFixed(1)}s / 领域${domain.toFixed(1)}s`;
    element.classList.toggle("ready", tree <= 0 || domain <= 0);
    return;
  }

  if (fighter.role === "xuhuai") {
    const ice = Math.max(0, fighter.skills.iceBurst.cooldownRemaining);
    const iceAge = fighter.skills.iceAge;
    const ageText = globalFreeze.active && globalFreeze.casterId === fighter.id
      ? `冰河时代${globalFreeze.remaining.toFixed(1)}s`
      : iceAge.used ? "冰河时代已用" : "冰河时代待触发";
    const slowText = fighter.slowRemaining > 0 ? " / 减速中" : "";
    element.textContent = `冰${ice.toFixed(1)}s / ${ageText}${slowText}`;
    element.classList.toggle("ready", ice <= 0 || (globalFreeze.active && globalFreeze.casterId === fighter.id));
    return;
  }

  if (fighter.role === "agen") {
    const skill = fighter.skills.elemental;
    const nextText = skill.nextType === "ice" ? "御冰" : "焚焰火";
    element.textContent = `${nextText} ${Math.max(0, skill.cooldownRemaining).toFixed(1)}s`;
    element.classList.toggle("ready", skill.cooldownRemaining <= 0);
    return;
  }

  if (fighter.role === "qidao") {
    const gather = fighter.skills.gatherStone;
    const selfDestruct = fighter.skills.selfDestruct;
    const explodeText = selfDestruct.used ? "自爆已用" : fighter.hp <= selfDestruct.hpBelow ? "自爆就绪" : "自爆待触发";
    element.textContent = `聚石 ${Math.max(0, gather.cooldownRemaining).toFixed(1)}s / ${explodeText}`;
    element.classList.toggle("ready", gather.cooldownRemaining <= 0 || (!selfDestruct.used && fighter.hp < selfDestruct.hpBelow));
    return;
  }

  if (fighter.role === "xuanli") {
    const skill = fighter.skills.icefire;
    const ultimate = fighter.skills.doubleHeaven;
    const activeUltimate = xuanliUltimates.find((orb) => orb.ownerId === fighter.id);
    const ultimateText = activeUltimate
      ? activeUltimate.phase === "gather" ? "两重天汇聚" : `两重天${activeUltimate.chaseRemaining.toFixed(1)}s`
      : ultimate.used ? "两重天已用" : "两重天待触发";
    element.textContent = `冰火 ${Math.max(0, skill.cooldownRemaining).toFixed(1)}s / ${ultimateText}`;
    element.classList.toggle("ready", skill.cooldownRemaining <= 0 || Boolean(activeUltimate));
    return;
  }

  if (fighter.role === "luoxiaohei") {
    const metal = fighter.skills.metal;
    const teleport = fighter.skills.teleport;
    const clone = fighter.skills.clone;
    const cloneActive = luoxiaoheiClones.some((item) => item.ownerId === fighter.id);
    const cloneText = cloneActive ? "黑咻发动" : clone.used ? "黑咻已用" : "黑咻待触发";
    const metalText = isDanjinSealingMetalSkills(fighter) ? "御金封印" : `御金 ${Math.max(0, metal.cooldownRemaining).toFixed(1)}s`;
    element.textContent = `${metalText} / 传送 ${Math.max(0, teleport.cooldownRemaining).toFixed(1)}s / ${cloneText}`;
    element.classList.toggle("ready", isDanjinSealingMetalSkills(fighter) || metal.cooldownRemaining <= 0 || teleport.cooldownRemaining <= 0 || cloneActive);
    return;
  }

  if (fighter.role === "jiulao") {
    const insight = fighter.skills.insight;
    const thorn = fighter.skills.thorn;
    element.textContent = `洞察 ${Math.max(0, insight.cooldownRemaining).toFixed(1)}s / 凌荆 ${Math.max(0, thorn.cooldownRemaining).toFixed(1)}s`;
    element.classList.toggle("ready", insight.cooldownRemaining <= 0 || thorn.cooldownRemaining <= 0);
    return;
  }

  if (fighter.role === "zhiqing") {
    const gather = fighter.skills.gatherStone;
    const burst = fighter.skills.earthBurst;
    const activeBurst = zhiqingScatterRocks.some((item) => item.kind === "burst" && item.ownerId === fighter.id);
    const activeFlyStone = zhiqingScatterRocks.some((item) => item.ownerId === fighter.id && item.kind !== "burst");
    const burstText = activeBurst
      ? "土暴发动"
      : burst.used ? "土暴已用" : "土暴待触发";
    const flyStoneText = activeFlyStone ? "飞石发动" : `飞石 ${Math.max(0, gather.cooldownRemaining).toFixed(1)}s`;
    element.textContent = `${flyStoneText} / ${burstText}`;
    element.classList.toggle("ready", activeBurst || activeFlyStone || gather.cooldownRemaining <= 0 || (!burst.used && fighter.hp < burst.hpBelow));
    return;
  }

  if (fighter.role === "mingwang") {
    const boost = fighter.skills.boost;
    const heal = fighter.skills.heal;
    const revive = fighter.skills.revive;
    const boostText = boost.activeRemaining > 0
      ? `强化${boost.activeRemaining.toFixed(1)}s`
      : `强化 ${Math.max(0, boost.cooldownRemaining).toFixed(1)}s`;
    const healUsed = heal.thresholds.filter((item) => item.used).length;
    const healText = heal.effectRemaining > 0 ? "治愈发动" : `治愈${healUsed}/2`;
    const reviveText = revive.effectRemaining > 0 ? "复生发动" : revive.used ? "复生已用" : "复生待触发";
    element.textContent = `${boostText} / ${healText} / ${reviveText}`;
    element.classList.toggle("ready", boost.activeRemaining > 0 || boost.cooldownRemaining <= 0 || heal.effectRemaining > 0 || revive.effectRemaining > 0);
    return;
  }

  if (fighter.role === "chinian") {
    const earth = Math.max(0, fighter.skills.earth.cooldownRemaining);
    element.textContent = `土${earth.toFixed(1)}s`;
    element.classList.toggle("ready", earth <= 0);
    return;
  }

  if (fighter.role === "scythe") {
    const skill = fighter.skills.scythe;
    if (skill.thrown) {
      element.textContent = `飞镰恢复 ${skill.returnRemaining.toFixed(1)}s`;
    } else if (!skill.flyingUsed && fighter.hp <= 10) {
      element.textContent = "飞镰就绪";
    } else {
      element.textContent = skill.flyingUsed ? "旋镰 / 飞镰已用" : "旋镰 / 飞镰待触发";
    }
    element.classList.add("ready");
    return;
  }

  if (fighter.role === "qingquan") {
    element.textContent = "双刀近身";
    element.classList.add("ready");
    return;
  }

  if (fighter.role === "lingyao") {
    const shield = fighter.skills.stoneShield;
    if (!shield.unlocked) {
      element.textContent = "双剑 / 流石甲待触发";
    } else if (shield.absentRemaining > 0) {
      element.textContent = `双剑 / 甲恢复 ${shield.absentRemaining.toFixed(1)}s`;
    } else {
      element.textContent = `双剑 / 甲${Math.max(0, shield.cooldownRemaining).toFixed(1)}s`;
    }
    element.classList.toggle("ready", shield.unlocked && shield.active && shield.cooldownRemaining <= 0);
    return;
  }

  if (fighter.role === "dasong") {
    const skill = fighter.skills.stoneShield;
    if (skill.absentRemaining > 0) {
      element.textContent = `流石甲恢复 ${skill.absentRemaining.toFixed(1)}s`;
    } else {
      element.textContent = `流石甲 ${Math.max(0, skill.cooldownRemaining).toFixed(1)}s`;
    }
    element.classList.toggle("ready", skill.active && skill.cooldownRemaining <= 0);
    return;
  }

  if (fighter.role === "luye") {
    const wire = fighter.skills.wire;
    const chase = fighter.skills.chase;
    const shield = fighter.skills.treasureShield;
    if (isDanjinSealingMetalSkills(fighter)) {
      element.textContent = shield.active ? `御金封印 / 追毫封印 / 琼圆盾${shield.charges}` : "御金封印 / 追毫封印";
    } else if (chase.activeRemaining > 0) {
      element.textContent = `追毫 ${chase.activeRemaining.toFixed(1)}s`;
    } else if (shield.active) {
      element.textContent = `御金 ${Math.max(0, wire.cooldownRemaining).toFixed(1)}s / 琼圆盾${shield.charges}`;
    } else {
      element.textContent = chase.used
        ? `御金 ${Math.max(0, wire.cooldownRemaining).toFixed(1)}s / 追毫已用`
        : `御金 ${Math.max(0, wire.cooldownRemaining).toFixed(1)}s / 追毫待触发`;
    }
    element.classList.toggle("ready", isDanjinSealingMetalSkills(fighter) || chase.activeRemaining > 0 || shield.active || wire.cooldownRemaining <= 0);
    return;
  }

  if (fighter.role === "ximuzi") {
    const fan = fighter.skills.fan;
    const dream = fighter.skills.dream;
    if (dream.activeRemaining > 0) {
      element.textContent = `戏梦 ${dream.activeRemaining.toFixed(1)}s`;
    } else {
      element.textContent = dream.used
        ? `飞扇 ${Math.max(0, fan.cooldownRemaining).toFixed(1)}s / 戏梦已用`
        : `飞扇 ${Math.max(0, fan.cooldownRemaining).toFixed(1)}s / 戏梦待触发`;
    }
    element.classList.toggle("ready", dream.activeRemaining > 0 || fan.cooldownRemaining <= 0);
    return;
  }

  if (fighter.role === "nezha") {
    const qiankun = fighter.skills.qiankun;
    const activeRings = qiankun.rings.filter((ring) => ring.active).length;
    const ringText = qiankun.active ? `乾坤圈${activeRings}` : qiankun.used ? "乾坤圈已用" : "乾坤圈待触发";
    element.textContent = `御火 / ${ringText}`;
    element.classList.toggle("ready", qiankun.active);
    return;
  }

  if (fighter.role === "soldier") {
    element.textContent = "步枪齐射";
    element.classList.add("ready");
    return;
  }

  const skill = fighter.skill;
  element.classList.toggle("ready", !skill.active && skill.cooldownRemaining <= 0);
  if (skill.active) {
    element.textContent = `${skill.name}生效 ${skill.remaining.toFixed(1)}s`;
  } else if (skill.cooldownRemaining > 0.05) {
    element.textContent = `${skill.name} ${skill.cooldownRemaining.toFixed(1)}s`;
  } else if (skill.trigger.type === "condition") {
    element.textContent = `${skill.name}待触发`;
  } else {
    element.textContent = `${skill.name}就绪`;
  }
}

function getFighterSkillLabel(fighter) {
  if (fighter.sealed) return `封印 ${fighter.sealRemaining.toFixed(1)}s`;
  if (fighter.role === "infinite") {
    if (fighter.hidden) {
      const activeHole = blackHoles.find((item) => item.ownerId === fighter.id);
      return `领域吞噬 ${Math.max(0, activeHole ? activeHole.duration - activeHole.age : 0).toFixed(1)}s`;
    }
    return `金${Math.max(0, fighter.skills.rebar.cooldownRemaining).toFixed(1)}s / 域${Math.max(0, fighter.skills.blackHole.cooldownRemaining).toFixed(1)}s`;
  }
  if (fighter.role === "fengxi") {
    const tree = Math.max(0, fighter.skills.tree.cooldownRemaining);
    if (fighter.skills.seal.used) return `木${tree.toFixed(1)}s / 豪夺已用`;
    if (fighter.skills.seal.ready) return `木${tree.toFixed(1)}s / 豪夺就绪`;
    return `木${tree.toFixed(1)}s / 豪夺待触发`;
  }
  if (fighter.role === "fengxiDomain") {
    const tree = Math.max(0, fighter.skills.tree.cooldownRemaining);
    const domain = Math.max(0, fighter.skills.domain.cooldownRemaining);
    return `木${tree.toFixed(1)}s / 领域${domain.toFixed(1)}s`;
  }
  if (fighter.role === "xuhuai") {
    const ageText = globalFreeze.active && globalFreeze.casterId === fighter.id
      ? `冰河时代${globalFreeze.remaining.toFixed(1)}s`
      : fighter.skills.iceAge.used ? "冰河时代已用" : "冰河时代待触发";
    return `冰${Math.max(0, fighter.skills.iceBurst.cooldownRemaining).toFixed(1)}s / ${ageText}`;
  }
  if (fighter.role === "agen") {
    const skill = fighter.skills.elemental;
    return `${skill.nextType === "ice" ? "御冰" : "焚焰火"} ${Math.max(0, skill.cooldownRemaining).toFixed(1)}s`;
  }
  if (fighter.role === "qidao") {
    const gather = fighter.skills.gatherStone;
    const selfDestruct = fighter.skills.selfDestruct;
    const explodeText = selfDestruct.used ? "自爆已用" : fighter.hp <= selfDestruct.hpBelow ? "自爆就绪" : "自爆待触发";
    return `聚石 ${Math.max(0, gather.cooldownRemaining).toFixed(1)}s / ${explodeText}`;
  }
  if (fighter.role === "xuanli") {
    const activeUltimate = xuanliUltimates.find((orb) => orb.ownerId === fighter.id);
    const ultimate = fighter.skills.doubleHeaven;
    const ultimateText = activeUltimate
      ? activeUltimate.phase === "gather" ? "两重天汇聚" : `两重天${activeUltimate.chaseRemaining.toFixed(1)}s`
      : ultimate.used ? "两重天已用" : "两重天待触发";
    return `冰火 ${Math.max(0, fighter.skills.icefire.cooldownRemaining).toFixed(1)}s / ${ultimateText}`;
  }
  if (fighter.role === "luoxiaohei") {
    const metal = fighter.skills.metal;
    const teleport = fighter.skills.teleport;
    const clone = fighter.skills.clone;
    const cloneActive = luoxiaoheiClones.some((item) => item.ownerId === fighter.id);
    const cloneText = cloneActive ? "黑咻发动" : clone.used ? "黑咻已用" : "黑咻待触发";
    const metalText = isDanjinSealingMetalSkills(fighter) ? "御金封印" : `御金 ${Math.max(0, metal.cooldownRemaining).toFixed(1)}s`;
    return `${metalText} / 传送 ${Math.max(0, teleport.cooldownRemaining).toFixed(1)}s / ${cloneText}`;
  }
  if (fighter.role === "jiulao") {
    const insight = fighter.skills.insight;
    const thorn = fighter.skills.thorn;
    return `洞察 ${Math.max(0, insight.cooldownRemaining).toFixed(1)}s / 凌荆 ${Math.max(0, thorn.cooldownRemaining).toFixed(1)}s`;
  }
  if (fighter.role === "zhiqing") {
    const gather = fighter.skills.gatherStone;
    const burst = fighter.skills.earthBurst;
    const activeBurst = zhiqingScatterRocks.some((item) => item.kind === "burst" && item.ownerId === fighter.id);
    const activeFlyStone = zhiqingScatterRocks.some((item) => item.ownerId === fighter.id && item.kind !== "burst");
    const burstText = activeBurst
      ? "土暴发动"
      : burst.used ? "土暴已用" : "土暴待触发";
    const flyStoneText = activeFlyStone ? "飞石发动" : `飞石 ${Math.max(0, gather.cooldownRemaining).toFixed(1)}s`;
    return `${flyStoneText} / ${burstText}`;
  }
  if (fighter.role === "mingwang") {
    const boost = fighter.skills.boost;
    const heal = fighter.skills.heal;
    const revive = fighter.skills.revive;
    const boostText = boost.activeRemaining > 0
      ? `强化${boost.activeRemaining.toFixed(1)}s`
      : `强化 ${Math.max(0, boost.cooldownRemaining).toFixed(1)}s`;
    const healUsed = heal.thresholds.filter((item) => item.used).length;
    const healText = heal.effectRemaining > 0 ? "治愈发动" : `治愈${healUsed}/2`;
    const reviveText = revive.effectRemaining > 0 ? "复生发动" : revive.used ? "复生已用" : "复生待触发";
    return `${boostText} / ${healText} / ${reviveText}`;
  }
  if (fighter.role === "chinian") return `土${Math.max(0, fighter.skills.earth.cooldownRemaining).toFixed(1)}s`;
  if (fighter.role === "scythe") {
    const skill = fighter.skills.scythe;
    if (skill.thrown) return `飞镰恢复 ${skill.returnRemaining.toFixed(1)}s`;
    return skill.flyingUsed ? "旋镰 / 飞镰已用" : "旋镰 / 飞镰待触发";
  }
  if (fighter.role === "qingquan") return "双刀近身";
  if (fighter.role === "lingyao") {
    const shield = fighter.skills.stoneShield;
    if (!shield.unlocked) return "双剑近身 / 流石甲待触发";
    return shield.absentRemaining > 0
      ? `双剑 / 甲恢复 ${shield.absentRemaining.toFixed(1)}s`
      : `双剑 / 甲${Math.max(0, shield.cooldownRemaining).toFixed(1)}s`;
  }
  if (fighter.role === "dasong") {
    const skill = fighter.skills.stoneShield;
    return skill.absentRemaining > 0
      ? `流石甲恢复 ${skill.absentRemaining.toFixed(1)}s`
      : `流石甲 ${Math.max(0, skill.cooldownRemaining).toFixed(1)}s`;
  }
  if (fighter.role === "luye") {
    const wire = fighter.skills.wire;
    const chase = fighter.skills.chase;
    const shield = fighter.skills.treasureShield;
    if (isDanjinSealingMetalSkills(fighter)) {
      return shield.active ? `御金封印 / 追毫封印 / 琼圆盾${shield.charges}` : "御金封印 / 追毫封印";
    }
    if (chase.activeRemaining > 0) return `追毫 ${chase.activeRemaining.toFixed(1)}s`;
    if (shield.active) return `御金 ${Math.max(0, wire.cooldownRemaining).toFixed(1)}s / 琼圆盾${shield.charges}`;
    return chase.used
      ? `御金 ${Math.max(0, wire.cooldownRemaining).toFixed(1)}s / 追毫已用`
      : `御金 ${Math.max(0, wire.cooldownRemaining).toFixed(1)}s / 追毫待触发`;
  }
  if (fighter.role === "ximuzi") {
    const fan = fighter.skills.fan;
    const dream = fighter.skills.dream;
    if (dream.activeRemaining > 0) return `戏梦 ${dream.activeRemaining.toFixed(1)}s`;
    return dream.used
      ? `飞扇 ${Math.max(0, fan.cooldownRemaining).toFixed(1)}s / 戏梦已用`
      : `飞扇 ${Math.max(0, fan.cooldownRemaining).toFixed(1)}s / 戏梦待触发`;
  }
  if (fighter.role === "nezha") {
    const qiankun = fighter.skills.qiankun;
    const activeRings = qiankun.rings.filter((ring) => ring.active).length;
    const ringText = qiankun.active ? `乾坤圈${activeRings}` : qiankun.used ? "乾坤圈已用" : "乾坤圈待触发";
    return `御火 / ${ringText}`;
  }
  if (fighter.role === "soldier") return "步枪射击 / 独立作战";
  return "技能准备中";
}

function getSupportedRecordingFormat() {
  const formats = [
    { mimeType: "video/webm;codecs=vp8,opus", extension: "webm", label: "WebM" },
    { mimeType: "video/webm;codecs=vp9,opus", extension: "webm", label: "WebM" },
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
  [ui.recordStatus, ui.startRecordStatus].forEach((element) => {
    if (element) element.textContent = status;
  });
  [ui.recordBtn, ui.startRecordBtn].forEach((button) => {
    if (!button) return;
    button.textContent = mode === "recording" ? "停止录制" : mode === "ready" ? "保存视频" : "录制";
    button.classList.toggle("recording", mode === "recording");
  });
}

function startRecording() {
  if (recorder?.state === "recording") return;
  if (!window.MediaRecorder || typeof canvas.captureStream !== "function") {
    setRecordingUi("不支持");
    return;
  }

  audio?.unlock();
  const recordingScale = 1.25;
  const recordingWidth = 960;
  const currentArenaRatio = arena.width > 0 && arena.height > 0 ? arena.width / arena.height : 960 / 600;
  const recordingArenaHeight = Math.round(recordingWidth / currentArenaRatio);
  const recordingPanelGap = 18;
  const recordingPanelHeight = 286;
  const recordingFrameRate = 24;
  const recordingCanvas = document.createElement("canvas");
  const recordingHeight = recordingArenaHeight + recordingPanelGap + recordingPanelHeight + recordingPanelGap;
  recordingCanvas.width = Math.round(recordingWidth * recordingScale);
  recordingCanvas.height = Math.round(recordingHeight * recordingScale);
  const recordingCtx = recordingCanvas.getContext("2d");
  let videoStream = recordingCanvas.captureStream(0);
  let videoTrack = videoStream.getVideoTracks()[0];
  const submitsFramesManually = typeof videoTrack?.requestFrame === "function";
  if (!submitsFramesManually) {
    videoStream.getTracks().forEach((track) => track.stop());
    videoStream = recordingCanvas.captureStream(recordingFrameRate);
    videoTrack = videoStream.getVideoTracks()[0];
  }
  const tracks = [...videoStream.getVideoTracks(), ...(audio?.stream?.getAudioTracks() || [])];
  const stream = new MediaStream(tracks);
  recordingFormat = getSupportedRecordingFormat();
  recordingVideoStream = videoStream;
  pendingRecording = null;

  recordedChunks = [];
  try {
    const recordingOptions = {
      videoBitsPerSecond: 8000000,
      audioBitsPerSecond: 128000,
    };
    if (recordingFormat.mimeType) recordingOptions.mimeType = recordingFormat.mimeType;
    recorder = new MediaRecorder(stream, recordingOptions);
  } catch (error) {
    console.error("Unable to create recording", error);
    videoStream.getTracks().forEach((track) => track.stop());
    recordingVideoStream = null;
    setRecordingUi("录制不可用");
    return;
  }
  recorder.format = recordingFormat;
  recorder.onerror = (event) => {
    console.error("Recording failed", event.error);
    setRecordingUi("录制失败");
  };
  recorder.ondataavailable = (event) => {
    if (!event.data?.size) return;
    recordedChunks.push(event.data);
  };
  recorder.onstop = async () => {
    if (recorder.frameTimer) window.cancelAnimationFrame(recorder.frameTimer);
    recordingVideoStream?.getTracks().forEach((track) => track.stop());
    recordingVideoStream = null;
    const blob = new Blob(recordedChunks, { type: recordingFormat.mimeType || "video/webm" });
    const fileName = `ball-arena-${Date.now()}.${recordingFormat.extension}`;
    if (blob.size === 0) {
      setRecordingUi("录制失败：未生成数据");
      recorder = null;
      return;
    }
    pendingRecording = { blob, fileName, format: recordingFormat };
    setRecordingUi(`已录制 ${formatRecordingSize(blob.size)}`, "ready");
    recorder = null;
  };

  const recordingFrameInterval = 1000 / recordingFrameRate;
  let lastRecordingFrameAt = 0;

  function drawFrame(now = performance.now()) {
    if (recorder?.state !== "recording") return;
    if (now - lastRecordingFrameAt < recordingFrameInterval - 1) {
      recorder.frameTimer = window.requestAnimationFrame(drawFrame);
      return;
    }
    lastRecordingFrameAt = now;
    drawRecordingFrame(recordingCtx, recordingWidth, recordingHeight, recordingArenaHeight, recordingScale);
    if (submitsFramesManually) videoTrack.requestFrame();
    recorder.frameTimer = window.requestAnimationFrame(drawFrame);
  }

  try {
    recorder.start(250);
    setRecordingUi("录制中", "recording");
    drawRecordingFrame(recordingCtx, recordingWidth, recordingHeight, recordingArenaHeight, recordingScale);
    if (submitsFramesManually) videoTrack.requestFrame();
    recorder.frameTimer = window.requestAnimationFrame(drawFrame);
  } catch (error) {
    console.error("Unable to start recording", error);
    videoStream.getTracks().forEach((track) => track.stop());
    recordingVideoStream = null;
    recorder = null;
    setRecordingUi("录制启动失败");
  }
}

function stopRecording() {
  if (recorder?.state !== "recording") return;
  setRecordingUi("视频处理中");
  try {
    recorder.requestData();
    recorder.stop();
  } catch (error) {
    console.error("Unable to stop recording", error);
    setRecordingUi("录制停止失败");
  }
}

async function savePendingRecording() {
  if (!pendingRecording) return;
  const { blob, fileName } = pendingRecording;
  setRecordingUi("保存中");
  try {
    const response = await fetch("/api/recordings", {
      method: "POST",
      headers: {
        "Content-Type": blob.type || "video/webm",
        "X-Recording-Name": fileName,
      },
      body: blob,
    });
    if (!response.ok) throw new Error(`Save failed with status ${response.status}`);
    const saved = await response.json();
    if (!saved.size) throw new Error("Saved recording is empty");
    pendingRecording = null;
    setRecordingUi(`已保存 ${saved.format || "视频"} ${formatRecordingSize(saved.size)}`);
  } catch (error) {
    console.error("Failed to save recording", error);
    setRecordingUi("保存服务未连接", "ready");
  }
}

async function toggleRecording() {
  if (recorder?.state === "recording") {
    stopRecording();
  } else if (pendingRecording) {
    try {
      await savePendingRecording();
    } catch (error) {
      console.error("Unable to save recording", error);
    }
  } else {
    startRecording();
  }
}

function drawRecordingFrame(targetCtx, width, height, arenaHeight, recordingScale = 1) {
  const panelY = arenaHeight + 18;
  const panelHeight = height - arenaHeight - 36;
  targetCtx.setTransform(recordingScale, 0, 0, recordingScale, 0, 0);
  targetCtx.clearRect(0, 0, width, height);
  targetCtx.fillStyle = "#101313";
  targetCtx.fillRect(0, 0, width, height);
  if (matchStarted) {
    targetCtx.drawImage(canvas, 0, 0, width, arenaHeight);
    drawRecordingRoundLabel(targetCtx);
    if (gameOver && roundWinner) drawRecordingResult(targetCtx, roundWinner, width, arenaHeight);
  } else {
    drawRecordingIntro(targetCtx, width, arenaHeight);
  }

  if (battleMode === "2v1") {
    const panelGap = 12;
    const panelWidth = (width - 36 - panelGap * 2) / 3;
    drawCachedRecordingPanel(targetCtx, "red-a", fighters[0], 18, panelY, panelWidth, panelHeight, "#ff9a7d");
    drawCachedRecordingPanel(targetCtx, "red-b", fighters[1], 18 + panelWidth + panelGap, panelY, panelWidth, panelHeight, "#ffb28a");
    drawCachedRecordingPanel(targetCtx, "blue", fighters[2], 18 + (panelWidth + panelGap) * 2, panelY, panelWidth, panelHeight, "#6ce7d3");
    return;
  }
  drawCachedRecordingPanel(targetCtx, "red", fighters[0], 18, panelY, 452, panelHeight, "#ff9a7d");
  drawCachedRecordingPanel(targetCtx, "blue", fighters[1], 490, panelY, 452, panelHeight, "#6ce7d3");
}

function drawRecordingRoundLabel(targetCtx) {
  const minutes = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const seconds = String(Math.floor(elapsed % 60)).padStart(2, "0");
  targetCtx.fillStyle = "#aeb8b0";
  targetCtx.font = "500 12px Inter, system-ui, sans-serif";
  targetCtx.fillText("ROUND", 20, 30);
  targetCtx.fillStyle = "#f2f5ef";
  targetCtx.font = "800 28px Inter, system-ui, sans-serif";
  targetCtx.fillText(`${minutes}:${seconds}`, 76, 34);
}

function drawRecordingIntro(targetCtx, width, height) {
  const introCanvas = getCachedRecordingIntro(width, height);
  targetCtx.drawImage(introCanvas, 0, 0, width, height);
  drawRecordingLightning(targetCtx, width / 2, height / 2 - 18);
}

function drawRecordingIntroStatic(targetCtx, width, height) {
  const red = fighters[0];
  const redAlly = battleMode === "2v1" ? fighters[1] : null;
  const blue = battleMode === "2v1" ? fighters[2] : fighters[1];
  const cardWidth = 258;
  const cardHeight = 430;
  const cardY = 78;
  const leftX = 52;
  const rightX = width - 52 - cardWidth;

  targetCtx.fillStyle = "#111615";
  targetCtx.fillRect(0, 0, width, height);
  const glow = targetCtx.createRadialGradient(width / 2, height / 2, 12, width / 2, height / 2, 230);
  glow.addColorStop(0, "rgba(240, 196, 92, 0.2)");
  glow.addColorStop(1, "rgba(240, 196, 92, 0)");
  targetCtx.fillStyle = glow;
  targetCtx.fillRect(0, 0, width, height);

  if (battleMode === "2v1" && redAlly) {
    const allyGap = 16;
    const allyCardHeight = (cardHeight - allyGap) / 2;
    drawRecordingIntroCard(targetCtx, red, leftX, cardY, cardWidth, allyCardHeight);
    drawRecordingIntroCard(targetCtx, redAlly, leftX, cardY + allyCardHeight + allyGap, cardWidth, allyCardHeight);
  } else {
    drawRecordingIntroCard(targetCtx, red, leftX, cardY, cardWidth, cardHeight);
  }
  drawRecordingIntroCard(targetCtx, blue, rightX, cardY, cardWidth, cardHeight);

  targetCtx.fillStyle = "#f0c45c";
  targetCtx.textAlign = "center";
  targetCtx.font = "900 72px Inter, system-ui, sans-serif";
  targetCtx.fillText("VS", width / 2, height / 2 - 16);
  targetCtx.fillStyle = "#f2f5ef";
  targetCtx.font = "600 22px Inter, system-ui, sans-serif";
  targetCtx.fillText("准备开战", width / 2, height / 2 + 42);
  targetCtx.textAlign = "start";
}

function drawRecordingLightning(targetCtx, x, y) {
  if (!imageReady(visualImages.lightning)) return;
  const seconds = performance.now() / 1000;
  const mainPhase = seconds % 2;
  const echoPhase = (seconds + 1.12) % 2;
  const drawFlash = (phase, scale, mirror) => {
    let alpha = 0;
    if (phase < 0.14) alpha = phase < 0.08 ? 0.92 : 0.35;
    if (alpha <= 0) return;
    targetCtx.save();
    targetCtx.translate(x, y);
    targetCtx.scale(mirror ? -scale : scale, scale);
    targetCtx.globalAlpha = alpha;
    targetCtx.shadowColor = "rgba(113, 208, 255, 0.8)";
    targetCtx.shadowBlur = 18;
    targetCtx.drawImage(visualImages.lightning, -86, -146, 172, 292);
    targetCtx.restore();
  };

  const pulse = 0.2 + (Math.sin(seconds * Math.PI * 1.25) + 1) * 0.14;
  const glow = targetCtx.createRadialGradient(x, y, 8, x, y, 112);
  glow.addColorStop(0, `rgba(95, 203, 255, ${pulse})`);
  glow.addColorStop(1, "rgba(95, 203, 255, 0)");
  targetCtx.fillStyle = glow;
  targetCtx.fillRect(x - 112, y - 148, 224, 296);
  drawFlash(mainPhase, 1, false);
  drawFlash(echoPhase, 0.88, true);
}

function drawRecordingResult(targetCtx, winner, width, height) {
  const resultCanvas = getCachedRecordingResult(winner, width, height);
  targetCtx.drawImage(resultCanvas, 0, 0, width, height);
}

function drawRecordingResultStatic(targetCtx, winner, width, height) {
  const image = getRoleImage(winner.role);
  targetCtx.save();
  targetCtx.fillStyle = "rgba(9, 12, 12, 0.78)";
  targetCtx.fillRect(0, 0, width, height);

  const glow = targetCtx.createRadialGradient(width / 2, height / 2 - 20, 20, width / 2, height / 2 - 20, 210);
  glow.addColorStop(0, "rgba(240, 196, 92, 0.24)");
  glow.addColorStop(1, "rgba(240, 196, 92, 0)");
  targetCtx.fillStyle = glow;
  targetCtx.fillRect(0, 0, width, height);

  targetCtx.textAlign = "center";
  targetCtx.fillStyle = "#f0c45c";
  targetCtx.font = "800 17px Inter, system-ui, sans-serif";
  targetCtx.fillText("WINNER", width / 2, height / 2 - 170);

  const portraitSize = 152;
  const portraitX = width / 2 - portraitSize / 2;
  const portraitY = height / 2 - 145;
  targetCtx.save();
  targetCtx.beginPath();
  targetCtx.arc(width / 2, portraitY + portraitSize / 2, portraitSize / 2, 0, Math.PI * 2);
  targetCtx.clip();
  targetCtx.fillStyle = "#1b2020";
  targetCtx.fillRect(portraitX, portraitY, portraitSize, portraitSize);
  if (imageReady(image)) {
    targetCtx.drawImage(image, portraitX, portraitY, portraitSize, portraitSize);
  }
  targetCtx.restore();
  targetCtx.strokeStyle = "rgba(240, 196, 92, 0.94)";
  targetCtx.lineWidth = 4;
  targetCtx.beginPath();
  targetCtx.arc(width / 2, portraitY + portraitSize / 2, portraitSize / 2 + 4, 0, Math.PI * 2);
  targetCtx.stroke();

  targetCtx.fillStyle = "#f2f5ef";
  targetCtx.font = "900 45px Inter, system-ui, sans-serif";
  targetCtx.fillText(`${getWinnerLabel(winner)} 获胜`, width / 2, height / 2 + 74);
  targetCtx.fillStyle = "#aeb8b0";
  targetCtx.font = "500 19px Inter, system-ui, sans-serif";
  targetCtx.fillText(`对战结束  ·  用时 ${ui.timer.textContent}`, width / 2, height / 2 + 112);
  targetCtx.textAlign = "start";
  targetCtx.restore();
}

function drawRecordingIntroCard(targetCtx, fighter, x, y, width, height) {
  const image = getRoleImage(fighter.role);
  targetCtx.save();
  targetCtx.beginPath();
  roundedRectPath(targetCtx, x, y, width, height, 8);
  targetCtx.clip();
  targetCtx.fillStyle = "#1b2020";
  targetCtx.fillRect(x, y, width, height);
  if (imageReady(image)) {
    const sourceRatio = image.naturalWidth / image.naturalHeight;
    const targetRatio = width / height;
    if (sourceRatio > targetRatio) {
      const sourceWidth = image.naturalHeight * targetRatio;
      targetCtx.drawImage(image, (image.naturalWidth - sourceWidth) / 2, 0, sourceWidth, image.naturalHeight, x, y, width, height);
    } else {
      const sourceHeight = image.naturalWidth / targetRatio;
      targetCtx.drawImage(image, 0, (image.naturalHeight - sourceHeight) / 2, image.naturalWidth, sourceHeight, x, y, width, height);
    }
  }
  const shade = targetCtx.createLinearGradient(0, y + height * 0.38, 0, y + height);
  shade.addColorStop(0, "rgba(9, 11, 11, 0)");
  shade.addColorStop(1, "rgba(9, 11, 11, 0.92)");
  targetCtx.fillStyle = shade;
  targetCtx.fillRect(x, y, width, height);
  targetCtx.restore();

  targetCtx.strokeStyle = "rgba(242, 245, 239, 0.2)";
  targetCtx.lineWidth = 2;
  targetCtx.beginPath();
  roundedRectPath(targetCtx, x, y, width, height, 8);
  targetCtx.stroke();
  targetCtx.fillStyle = "#f2f5ef";
  targetCtx.font = "800 34px Inter, system-ui, sans-serif";
  targetCtx.fillText(fighter.name, x + 20, y + height - 24);
}

function createRecordingLayer(width, height) {
  const layer = document.createElement("canvas");
  layer.width = Math.max(1, Math.round(width));
  layer.height = Math.max(1, Math.round(height));
  return layer;
}

function getImageCacheToken(image) {
  if (!imageReady(image)) return "pending";
  return `${image.naturalWidth}x${image.naturalHeight}`;
}

function getRecordingIntroCacheKey(width, height) {
  return [
    Math.round(width),
    Math.round(height),
    ...fighters.map((fighter) => {
      const image = getRoleImage(fighter.role);
      return `${fighter.role}:${fighter.name}:${getImageCacheToken(image)}`;
    }),
  ].join("|");
}

function getCachedRecordingIntro(width, height) {
  const key = getRecordingIntroCacheKey(width, height);
  if (!recordingCaches.intro || recordingCaches.intro.key !== key) {
    const layer = createRecordingLayer(width, height);
    drawRecordingIntroStatic(layer.getContext("2d"), width, height);
    recordingCaches.intro = { key, layer };
  }
  return recordingCaches.intro.layer;
}

function getRecordingResultCacheKey(winner, width, height) {
  const image = getRoleImage(winner.role);
  return [
    Math.round(width),
    Math.round(height),
    winner.id,
    winner.role,
    winner.name,
    ui.timer.textContent,
    getImageCacheToken(image),
  ].join("|");
}

function getCachedRecordingResult(winner, width, height) {
  const key = getRecordingResultCacheKey(winner, width, height);
  if (!recordingCaches.result || recordingCaches.result.key !== key) {
    const layer = createRecordingLayer(width, height);
    drawRecordingResultStatic(layer.getContext("2d"), winner, width, height);
    recordingCaches.result = { key, layer };
  }
  return recordingCaches.result.layer;
}

function getRecordingPanelCacheKey(fighter, width, height, color) {
  const image = getRoleImage(fighter.role);
  const meta = roleMeta[fighter.role] || {};
  return [
    Math.round(width),
    Math.round(height),
    color,
    fighter.id,
    fighter.role,
    fighter.name,
    Math.ceil(fighter.hp),
    fighter.maxHp,
    getHealthLabel(fighter),
    getFighterSkillLabel(fighter),
    meta.copy || "",
    getImageCacheToken(image),
  ].join("|");
}

function drawCachedRecordingPanel(targetCtx, cacheId, fighter, x, y, width, height, color) {
  const key = getRecordingPanelCacheKey(fighter, width, height, color);
  const cached = recordingCaches.panels.get(cacheId);
  if (!cached || cached.key !== key) {
    const layer = createRecordingLayer(width, height);
    drawRecordingPanel(layer.getContext("2d"), fighter, 0, 0, width, height, color);
    recordingCaches.panels.set(cacheId, { key, layer });
  }
  targetCtx.drawImage(recordingCaches.panels.get(cacheId).layer, x, y, width, height);
}

function resetRecordingCaches() {
  recordingCaches.panels.clear();
  recordingCaches.intro = null;
  recordingCaches.result = null;
}

function drawRecordingPanel(targetCtx, fighter, x, y, width, height, color) {
  const meta = roleMeta[fighter.role];
  targetCtx.save();
  targetCtx.fillStyle = "rgba(27, 32, 32, 0.96)";
  targetCtx.strokeStyle = "rgba(242, 245, 239, 0.16)";
  targetCtx.lineWidth = 1;
  targetCtx.beginPath();
  roundedRectPath(targetCtx, x, y, width, height, 8);
  targetCtx.fill();
  targetCtx.stroke();

  const image = getRoleImage(fighter.role);
  targetCtx.save();
  targetCtx.beginPath();
  targetCtx.arc(x + 43, y + 44, 25, 0, Math.PI * 2);
  targetCtx.clip();
  if (imageReady(image)) targetCtx.drawImage(image, x + 17, y + 17, 56, 56);
  targetCtx.restore();

  targetCtx.fillStyle = "#f2f5ef";
  targetCtx.font = "800 24px Inter, system-ui, sans-serif";
  targetCtx.fillText(fighter.name, x + 82, y + 41);
  targetCtx.font = "500 15px Inter, system-ui, sans-serif";
  targetCtx.fillStyle = "#aeb8b0";
  targetCtx.fillText(getFighterSkillLabel(fighter), x + 82, y + 66);

  const hpX = x + 18;
  const hpY = y + 90;
  const hpWidth = width - 36;
  targetCtx.fillStyle = "rgba(242, 245, 239, 0.08)";
  targetCtx.fillRect(hpX, hpY, hpWidth, 12);
  targetCtx.fillStyle = color;
  targetCtx.fillRect(hpX, hpY, hpWidth * (fighter.hp / fighter.maxHp), 12);
  targetCtx.fillStyle = "#f2f5ef";
  targetCtx.font = "500 15px Inter, system-ui, sans-serif";
  targetCtx.fillText(getHealthLabel(fighter), hpX, hpY + 34);

  targetCtx.strokeStyle = "rgba(242, 245, 239, 0.1)";
  targetCtx.beginPath();
  targetCtx.moveTo(hpX, y + 136);
  targetCtx.lineTo(x + width - 18, y + 136);
  targetCtx.stroke();

  const lines = meta.copy ? meta.copy.replaceAll("<br />", "\n").split("\n") : [];
  targetCtx.fillStyle = "#d9dfd8";
  targetCtx.font = "650 18px Inter, system-ui, sans-serif";
  let copyY = y + 150;
  lines.forEach((line) => {
    copyY += wrapRecordingText(targetCtx, line, hpX, copyY, hpWidth, 22) + 5;
  });
  targetCtx.restore();
}

function roundedRectPath(targetCtx, x, y, width, height, radius) {
  if (typeof targetCtx.roundRect === "function") {
    targetCtx.roundRect(x, y, width, height, radius);
    return;
  }
  const r = Math.min(radius, width / 2, height / 2);
  targetCtx.moveTo(x + r, y);
  targetCtx.lineTo(x + width - r, y);
  targetCtx.quadraticCurveTo(x + width, y, x + width, y + r);
  targetCtx.lineTo(x + width, y + height - r);
  targetCtx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  targetCtx.lineTo(x + r, y + height);
  targetCtx.quadraticCurveTo(x, y + height, x, y + height - r);
  targetCtx.lineTo(x, y + r);
  targetCtx.quadraticCurveTo(x, y, x + r, y);
}

function wrapRecordingText(targetCtx, text, x, y, maxWidth, lineHeight) {
  let line = "";
  let lineY = y;
  let lineCount = 0;
  for (const char of text) {
    const next = line + char;
    if (targetCtx.measureText(next).width > maxWidth && line) {
      targetCtx.fillText(line, x, lineY);
      lineCount += 1;
      line = char;
      lineY += lineHeight;
    } else {
      line = next;
    }
  }
  if (line) {
    targetCtx.fillText(line, x, lineY);
    lineCount += 1;
  }
  return lineCount * lineHeight;
}

function draw() {
  resetFrameState();
  ctx.clearRect(0, 0, arena.width, arena.height);
  drawArena();
  drawEffects();
  drawDanjinEyes();
  drawTrees();
  drawFengxiDomainLines();
  drawBlackHoles();
  drawRebars();
  drawIceShards();
  drawEarthDragons();
  drawZhiqingScatterRocks();
  drawThrownScythes();
  drawBullets();
  drawLightShields();
  drawFoldingFans();
  drawFireballs();
  drawAgenProjectiles();
  drawXuanliProjectiles();
  drawXuanliUltimates();
  drawLuoxiaoheiTeleports();
  drawLuoxiaoheiMetalPlates();
  drawLuoxiaoheiClones();
  drawJiulaoInsightZones();
  drawQidaoRocks();
  for (const fighter of fighters) {
    try {
      if (isSquadController(fighter)) {
        fighter.units.filter((unit) => unit.hp > 0).forEach(drawSoldierUnit);
      } else {
        drawFighter(fighter);
      }
    } catch (error) {
      console.error(`Failed to draw ${fighter.name}`, error);
    }
  }
  drawJiulaoMetalThorns();
  drawDamageTexts();
  drawUltimateEffects();
}

function resetFrameState() {
  if (typeof ctx.reset === "function") {
    ctx.reset();
  }
  ctx.setTransform(arena.scale, 0, 0, arena.scale, 0, 0);
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
  ctx.setLineDash([]);
}

function drawArena() {
  const pad = arena.padding;
  const width = arena.width - pad * 2;
  const height = arena.height - pad * 2;
  ctx.save();
  drawArenaBrickBackground(pad, width, height);
  ctx.strokeStyle = "rgba(214, 231, 220, 0.74)";
  ctx.lineWidth = 3;
  ctx.strokeRect(pad, pad, width, height);
  ctx.strokeStyle = "rgba(214, 231, 220, 0.13)";
  ctx.lineWidth = 1;
  ctx.setLineDash([10, 12]);
  ctx.beginPath();
  ctx.moveTo(arena.width / 2, pad);
  ctx.lineTo(arena.width / 2, arena.height - pad);
  ctx.stroke();
  ctx.restore();
}

function drawArenaBrickBackground(pad, width, height) {
  const key = `${Math.round(width)}x${Math.round(height)}`;
  if (!arenaBrickBackground || arenaBrickBackgroundSize !== key) {
    arenaBrickBackground = createArenaBrickBackground(width, height);
    arenaBrickBackgroundSize = key;
  }
  ctx.drawImage(arenaBrickBackground, pad, pad, width, height);
}

function createArenaBrickBackground(width, height) {
  const buffer = document.createElement("canvas");
  buffer.width = Math.max(1, Math.round(width));
  buffer.height = Math.max(1, Math.round(height));
  const bctx = buffer.getContext("2d");
  bctx.fillStyle = "#121716";
  bctx.fillRect(0, 0, buffer.width, buffer.height);

  const tileW = 78;
  const tileH = 34;
  for (let y = 0; y < buffer.height + tileH; y += tileH) {
    const row = Math.floor(y / tileH);
    const offset = row % 2 === 0 ? 0 : -tileW / 2;
    for (let x = offset; x < buffer.width + tileW; x += tileW) {
      const shade = 17 + ((row * 7 + Math.floor(x / tileW) * 5) % 12);
      bctx.fillStyle = `rgb(${shade}, ${shade + 8}, ${shade + 6})`;
      bctx.fillRect(x + 1, y + 1, tileW - 2, tileH - 2);
      bctx.fillStyle = "rgba(255,255,255,0.025)";
      bctx.fillRect(x + 3, y + 3, tileW - 6, 3);
      bctx.fillStyle = "rgba(0,0,0,0.18)";
      bctx.fillRect(x + 2, y + tileH - 5, tileW - 4, 3);
    }
  }

  bctx.strokeStyle = "rgba(2, 6, 5, 0.45)";
  bctx.lineWidth = 1;
  for (let y = 0; y < buffer.height + tileH; y += tileH) {
    bctx.beginPath();
    bctx.moveTo(0, y);
    bctx.lineTo(buffer.width, y);
    bctx.stroke();
  }

  const vignette = bctx.createRadialGradient(
    buffer.width / 2,
    buffer.height / 2,
    Math.min(buffer.width, buffer.height) * 0.24,
    buffer.width / 2,
    buffer.height / 2,
    Math.max(buffer.width, buffer.height) * 0.68,
  );
  vignette.addColorStop(0, "rgba(255,255,255,0.025)");
  vignette.addColorStop(1, "rgba(0,0,0,0.42)");
  bctx.fillStyle = vignette;
  bctx.fillRect(0, 0, buffer.width, buffer.height);

  return buffer;
}

function drawFighter(fighter) {
  if (fighter.hidden) return;
  const pulse = 1 + Math.sin(elapsed * 9) * 0.03;
  ctx.save();
  ctx.translate(fighter.x, fighter.y);

  ctx.globalAlpha = 0.2;
  ctx.fillStyle = fighter.color;
  ctx.beginPath();
  ctx.arc(0, 0, fighter.radius + 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  if (fighter.skill?.active && fighter.id === "blue") {
    ctx.strokeStyle = fighter.accent;
    ctx.lineWidth = 5;
    ctx.globalAlpha = 0.78;
    ctx.beginPath();
    ctx.arc(0, 0, fighter.radius + 12 * pulse, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  if (fighter.role === "nezha") {
    drawNezhaFireAura(fighter);
  }

  drawFighterFace(fighter);

  if (fighter.role === "fengxi" && (fighter.skills.seal.ready || fighter.skills.seal.used)) {
    ctx.globalAlpha = 0.32;
    ctx.fillStyle = fighter.rageColor;
    ctx.beginPath();
    ctx.arc(0, 0, fighter.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  if (fighter.role === "xuhuai") {
    drawIceAura(fighter);
  }

  if (fighter.role === "scythe") {
    drawScytheWeapon(fighter);
  }

  if (["qingquan", "lingyao"].includes(fighter.role)) {
    drawTwinBlades(fighter);
  }

  if (["dasong", "lingyao"].includes(fighter.role)) {
    drawOrbitingShield(fighter);
  }

  if (fighter.role === "luye") {
    drawLuyeTreasureShield(fighter);
  }

  if (fighter.role === "nezha") {
    drawQiankunRings(fighter);
  }

  if (fighter.role === "mingwang") {
    drawMingwangAura(fighter);
  }

  drawElementalStatusEffects(fighter);

  ctx.strokeStyle = "rgba(255, 255, 255, 0.44)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, fighter.radius - 3, 0, Math.PI * 2);
  ctx.stroke();

  if (!fighter.role) {
    ctx.fillStyle = "rgba(17, 20, 20, 0.82)";
    ctx.beginPath();
    ctx.arc(0, 0, fighter.radius * 0.43, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#f8fbf5";
    ctx.font = "900 20px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(fighter.id === "red" ? "R" : "B", 0, 1);
  }

  if (fighter.sealed) {
    drawSealMark(fighter);
  }

  if (fighter.skill?.active && fighter.id === "red") {
    const dir = normalize(fighter.vx, fighter.vy);
    ctx.strokeStyle = fighter.accent;
    ctx.lineWidth = 7;
    ctx.globalAlpha = 0.55;
    ctx.beginPath();
    ctx.moveTo(-dir.x * (fighter.radius + 9), -dir.y * (fighter.radius + 9));
    ctx.lineTo(-dir.x * (fighter.radius + 44), -dir.y * (fighter.radius + 44));
    ctx.stroke();
  }

  ctx.restore();
}

function drawSoldierUnit(unit) {
  if (unit.hidden) return;
  const direction = normalize(unit.vx, unit.vy);
  const angle = Math.atan2(direction.y, direction.x);
  ctx.save();
  ctx.translate(unit.x, unit.y);
  ctx.globalAlpha = 0.2;
  ctx.fillStyle = unit.color;
  ctx.beginPath();
  ctx.arc(0, 0, unit.radius + 7, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = 1;
  const body = ctx.createRadialGradient(-5, -6, 2, 0, 0, unit.radius);
  body.addColorStop(0, "#b6c39f");
  body.addColorStop(0.32, "#778766");
  body.addColorStop(1, "#394536");
  ctx.fillStyle = body;
  ctx.beginPath();
  ctx.arc(0, 0, unit.radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.rotate(angle);
  ctx.strokeStyle = "#141817";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(3, 5);
  ctx.lineTo(unit.radius + 20, 5);
  ctx.stroke();
  ctx.strokeStyle = "#aa9368";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(4, 5);
  ctx.lineTo(12, 5);
  ctx.stroke();
  ctx.rotate(-angle);

  if (imageReady(visualImages.soldierHelmet)) {
    const sourceHeight = visualImages.soldierHelmet.naturalHeight * 0.7;
    ctx.drawImage(
      visualImages.soldierHelmet,
      0,
      0,
      visualImages.soldierHelmet.naturalWidth,
      sourceHeight,
      -22,
      -29,
      44,
      31,
    );
  } else {
    ctx.fillStyle = "#434936";
    ctx.strokeStyle = "#c1b78b";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(0, -4, unit.radius * 0.78, Math.PI, Math.PI * 2);
    ctx.lineTo(unit.radius * 0.88, -2);
    ctx.lineTo(-unit.radius * 0.88, -2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.fillStyle = "rgba(8, 12, 11, 0.7)";
  ctx.fillRect(unit.x - 18, unit.y - unit.radius - 11, 36, 4);
  ctx.fillStyle = "#cfb35d";
  ctx.fillRect(unit.x - 18, unit.y - unit.radius - 11, 36 * (unit.hp / unit.maxHp), 4);
  ctx.restore();
}

function drawIceAura(fighter) {
  ctx.save();
  const halo = ctx.createRadialGradient(0, 0, fighter.radius * 0.72, 0, 0, fighter.radius + 15);
  halo.addColorStop(0, "rgba(195, 242, 255, 0)");
  halo.addColorStop(0.55, "rgba(170, 232, 255, 0.12)");
  halo.addColorStop(1, "rgba(224, 252, 255, 0.28)");
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(0, 0, fighter.radius + 15, 0, Math.PI * 2);
  ctx.fill();

  for (let i = 0; i < 12; i += 1) {
    const angle = elapsed * 0.38 + i * (Math.PI * 2 / 12);
    const wobble = Math.sin(elapsed * 1.7 + i * 1.9) * 2.4;
    const inner = fighter.radius + 3 + wobble;
    const outer = fighter.radius + 14 + (i % 3) * 3;
    const width = 4.5 + (i % 2) * 2;
    const cx = Math.cos(angle) * inner;
    const cy = Math.sin(angle) * inner;
    const tipX = Math.cos(angle) * outer;
    const tipY = Math.sin(angle) * outer;
    const sideX = Math.cos(angle + Math.PI / 2) * width;
    const sideY = Math.sin(angle + Math.PI / 2) * width;

    const shard = ctx.createLinearGradient(cx, cy, tipX, tipY);
    shard.addColorStop(0, "rgba(106, 181, 224, 0.34)");
    shard.addColorStop(0.55, "rgba(203, 247, 255, 0.82)");
    shard.addColorStop(1, "rgba(255, 255, 255, 0.96)");
    ctx.fillStyle = shard;
    ctx.strokeStyle = "rgba(235, 253, 255, 0.82)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx + sideX, cy + sideY);
    ctx.lineTo(tipX, tipY);
    ctx.lineTo(cx - sideX * 0.72, cy - sideY * 0.72);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = "rgba(255, 255, 255, 0.64)";
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(tipX - Math.cos(angle) * 3, tipY - Math.sin(angle) * 3);
    ctx.stroke();
  }

  ctx.globalAlpha = 0.32;
  ctx.strokeStyle = "rgba(210, 248, 255, 0.8)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(0, 0, fighter.radius + 10, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawSealMark(fighter) {
  const scale = 1 + Math.sin(elapsed * 8) * 0.04;
  ctx.save();
  ctx.scale(scale, scale);
  ctx.fillStyle = "rgba(18, 8, 8, 0.78)";
  ctx.beginPath();
  ctx.arc(0, 0, fighter.radius * 0.42, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#ef4b4f";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = "#ffefef";
  ctx.font = "900 23px Inter, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("封", 0, 1);
  ctx.restore();
}

function drawScytheWeapon(fighter) {
  const skill = fighter.skills.scythe;
  if (skill.thrown) return;
  const angle = skill.angle;
  if (imageReady(visualImages.scythe)) {
    ctx.save();
    ctx.rotate(angle + Math.PI / 2);
    ctx.globalAlpha = 0.96;
    ctx.drawImage(visualImages.scythe, -13, -(fighter.radius + 98), 26, 148);
    ctx.restore();
    return;
  }

  const inner = fighter.radius + 2;
  const outer = fighter.radius + 72;
  const bladeX = Math.cos(angle) * outer;
  const bladeY = Math.sin(angle) * outer;
  const baseX = Math.cos(angle) * inner;
  const baseY = Math.sin(angle) * inner;
  const forward = skill.spinSpeed >= 0 ? 1 : -1;

  ctx.save();
  ctx.strokeStyle = "rgba(9, 10, 12, 0.94)";
  ctx.lineWidth = 3.6;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(baseX, baseY);
  ctx.lineTo(bladeX, bladeY);
  ctx.stroke();
  ctx.strokeStyle = "rgba(235, 238, 242, 0.82)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(baseX + Math.sin(angle) * 1.8, baseY - Math.cos(angle) * 1.8);
  ctx.lineTo(bladeX + Math.sin(angle) * 1.8, bladeY - Math.cos(angle) * 1.8);
  ctx.stroke();

  const gripStart = fighter.radius + 28;
  const gripEnd = fighter.radius + 42;
  ctx.strokeStyle = "#0b766f";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(Math.cos(angle) * gripStart, Math.sin(angle) * gripStart);
  ctx.lineTo(Math.cos(angle) * gripEnd, Math.sin(angle) * gripEnd);
  ctx.stroke();
  ctx.strokeStyle = "#b78b4a";
  ctx.lineWidth = 2;
  for (let i = 0; i < 3; i += 1) {
    const p = gripStart + 3 + i * 4;
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * p + Math.sin(angle) * 3, Math.sin(angle) * p - Math.cos(angle) * 3);
    ctx.lineTo(Math.cos(angle) * (p + 4) - Math.sin(angle) * 3, Math.sin(angle) * (p + 4) + Math.cos(angle) * 3);
    ctx.stroke();
  }

  ctx.translate(bladeX, bladeY);
  ctx.rotate(angle);

  ctx.fillStyle = "rgba(34, 31, 34, 0.96)";
  ctx.strokeStyle = "rgba(158, 148, 116, 0.9)";
  ctx.lineWidth = 1.1;
  ctx.beginPath();
  ctx.moveTo(-7, -5);
  ctx.lineTo(6, -3);
  ctx.lineTo(3, 5);
  ctx.lineTo(-9, 5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  const bladeGradient = ctx.createLinearGradient(-13, forward * 50, 10, forward * 2);
  bladeGradient.addColorStop(0, "rgba(28, 28, 31, 0.98)");
  bladeGradient.addColorStop(0.58, "rgba(70, 69, 75, 0.96)");
  bladeGradient.addColorStop(1, "rgba(9, 10, 12, 0.98)");
  ctx.fillStyle = bladeGradient;
  ctx.strokeStyle = "rgba(198, 190, 166, 0.9)";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(-3, -4);
  ctx.quadraticCurveTo(7, forward * 31, -1, forward * 68);
  ctx.quadraticCurveTo(-10, forward * 42, -17, forward * 8);
  ctx.quadraticCurveTo(-10, forward * 0, -3, -4);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = "rgba(206, 201, 184, 0.48)";
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(-6, forward * 5);
  ctx.quadraticCurveTo(0, forward * 31, -3, forward * 58);
  ctx.stroke();
  ctx.restore();
}

function drawTwinBlades(fighter) {
  const skill = fighter.skills.twinBlades;
  const inner = fighter.radius + 5;
  const outer = fighter.radius + 54;
  const drawBlade = (angle, alpha, glowWidth, coreWidth) => {
    const startX = Math.cos(angle) * inner;
    const startY = Math.sin(angle) * inner;
    const endX = Math.cos(angle) * outer;
    const endY = Math.sin(angle) * outer;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.lineCap = "round";
    ctx.strokeStyle = "rgba(44, 163, 224, 0.54)";
    ctx.shadowColor = "rgba(89, 220, 255, 0.92)";
    ctx.shadowBlur = 15;
    ctx.lineWidth = glowWidth;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.shadowBlur = 8;
    ctx.strokeStyle = "rgba(199, 248, 255, 0.98)";
    ctx.lineWidth = coreWidth;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.restore();
  };

  for (const trail of skill.trails) {
    const alpha = Math.max(0, 1 - trail.age / 0.14) * 0.3;
    trail.angles.forEach((angle) => {
      const direction = skill.spinSpeed >= 0 ? -1 : 1;
      const arcLength = 0.14 + (trail.age / 0.14) * 0.26;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = "rgba(102, 224, 255, 0.92)";
      ctx.shadowColor = "rgba(74, 205, 255, 0.84)";
      ctx.shadowBlur = 8;
      ctx.lineCap = "round";
      ctx.lineWidth = 3.4;
      ctx.beginPath();
      ctx.arc(0, 0, outer, angle, angle + direction * arcLength, direction < 0);
      ctx.stroke();
      ctx.restore();
    });
  }

  getTwinBladeAngles(skill).forEach((angle) => drawBlade(angle, 0.98, 12, 4));

  ctx.save();
  ctx.fillStyle = "#c2ebf4";
  ctx.strokeStyle = "#1d475e";
  ctx.lineWidth = 1.3;
  getTwinBladeAngles(skill).forEach((angle) => {
    const gripX = Math.cos(angle) * (fighter.radius + 3);
    const gripY = Math.sin(angle) * (fighter.radius + 3);
    ctx.translate(gripX, gripY);
    ctx.rotate(angle);
    ctx.fillRect(-10, -3, 17, 6);
    ctx.strokeRect(-10, -3, 17, 6);
    ctx.rotate(-angle);
    ctx.translate(-gripX, -gripY);
  });
  ctx.restore();
}

function drawThrownScythes() {
  for (const item of thrownScythes) {
    ctx.save();
    ctx.translate(item.x, item.y);
    ctx.rotate(item.angle);
    ctx.globalAlpha = 0.9;

    ctx.strokeStyle = "rgba(217, 212, 232, 0.28)";
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.arc(0, 0, 28 + Math.sin(item.age * 18) * 3, 0, Math.PI * 2);
    ctx.stroke();

    if (imageReady(visualImages.scythe)) {
      ctx.rotate(Math.PI / 2);
      ctx.globalAlpha = 0.98;
      ctx.drawImage(visualImages.scythe, -15, -86, 30, 170);
      ctx.restore();
      continue;
    }

    const bladeGradient = ctx.createLinearGradient(-18, -42, 8, 34);
    bladeGradient.addColorStop(0, "rgba(28, 28, 31, 0.98)");
    bladeGradient.addColorStop(0.55, "rgba(70, 69, 75, 0.96)");
    bladeGradient.addColorStop(1, "rgba(9, 10, 12, 0.98)");
    ctx.fillStyle = bladeGradient;
    ctx.strokeStyle = "rgba(213, 205, 178, 0.94)";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(-4, -6);
    ctx.quadraticCurveTo(8, 26, -1, 58);
    ctx.quadraticCurveTo(-12, 34, -18, 7);
    ctx.quadraticCurveTo(-11, 0, -4, -6);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = "rgba(9, 10, 12, 0.94)";
    ctx.lineWidth = 3.4;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(0, -28);
    ctx.lineTo(0, 24);
    ctx.stroke();

    ctx.restore();
  }
}

function drawLightShields() {
  for (const item of lightShields) {
    ctx.save();
    ctx.translate(item.x, item.y);
    ctx.rotate(item.angle);
    drawShieldArc(item.radius, 0.94, true);
    ctx.restore();
  }
}

function drawBullets() {
  for (const bullet of bullets) {
    ctx.save();
    ctx.translate(bullet.x, bullet.y);
    ctx.rotate(bullet.angle);
    ctx.strokeStyle = "rgba(243, 210, 122, 0.46)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-13, 0);
    ctx.lineTo(-3, 0);
    ctx.stroke();
    ctx.fillStyle = "#ffe6a2";
    ctx.shadowColor = "#f0c45c";
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(0, 0, bullet.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function drawFoldingFans() {
  for (const fan of foldingFans) {
    ctx.save();
    ctx.translate(fan.x, fan.y);
    ctx.rotate(fan.angle + fan.spinAngle);
    const pulse = 1 + Math.sin(fan.age * 18) * 0.06;
    ctx.scale(pulse, pulse);

    ctx.globalAlpha = 0.2;
    ctx.strokeStyle = "rgba(255, 141, 92, 0.9)";
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.arc(0, 0, fan.radius + 8, -2.55, -0.58);
    ctx.stroke();

    ctx.globalAlpha = 0.96;
    ctx.shadowColor = "rgba(255, 105, 76, 0.72)";
    ctx.shadowBlur = 9;
    const leafGradient = ctx.createRadialGradient(-6, 9, 4, 0, 0, fan.radius + 22);
    leafGradient.addColorStop(0, "#2b1717");
    leafGradient.addColorStop(0.38, "#74302a");
    leafGradient.addColorStop(1, "#ef874d");
    ctx.fillStyle = leafGradient;
    ctx.strokeStyle = "rgba(42, 18, 16, 0.88)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-20, 13);
    ctx.arc(0, 13, fan.radius + 18, -2.78, -0.36, false);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(38, 18, 17, 0.72)";
    ctx.lineWidth = 1.3;
    for (let i = 0; i < 8; i += 1) {
      const angle = -2.66 + i * 0.31;
      ctx.beginPath();
      ctx.moveTo(-18, 13);
      ctx.lineTo(-18 + Math.cos(angle) * (fan.radius + 32), 13 + Math.sin(angle) * (fan.radius + 32));
      ctx.stroke();
    }

    ctx.fillStyle = "#2a1715";
    if (typeof ctx.roundRect === "function") {
      ctx.beginPath();
      ctx.roundRect(-24, 8, 15, 10, 3);
      ctx.fill();
    } else {
      ctx.fillRect(-24, 8, 15, 10);
    }
    ctx.restore();
  }
}

function drawFireballs() {
  for (const fireball of fireballs) {
    const dir = normalize(fireball.vx, fireball.vy);
    const pulse = 1 + Math.sin(elapsed * 12 + fireball.pulseSeed) * 0.08;
    ctx.save();
    ctx.translate(fireball.x, fireball.y);

    const tail = ctx.createLinearGradient(-dir.x * 72, -dir.y * 72, dir.x * 16, dir.y * 16);
    tail.addColorStop(0, "rgba(255, 74, 20, 0)");
    tail.addColorStop(0.45, "rgba(255, 74, 20, 0.28)");
    tail.addColorStop(1, "rgba(255, 211, 90, 0.72)");
    ctx.strokeStyle = tail;
    ctx.lineWidth = 20;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(-dir.x * 70, -dir.y * 70);
    ctx.quadraticCurveTo(-dir.x * 32 - dir.y * 10, -dir.y * 32 + dir.x * 10, 0, 0);
    ctx.stroke();

    const glow = ctx.createRadialGradient(0, 0, 4, 0, 0, fireball.radius * 2.4 * pulse);
    glow.addColorStop(0, "rgba(255, 244, 174, 0.98)");
    glow.addColorStop(0.24, "rgba(255, 177, 58, 0.9)");
    glow.addColorStop(0.58, "rgba(255, 70, 24, 0.54)");
    glow.addColorStop(1, "rgba(255, 70, 24, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(0, 0, fireball.radius * 2.4 * pulse, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#fff0a6";
    ctx.shadowColor = "rgba(255, 110, 24, 0.9)";
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(0, 0, fireball.radius * 0.72 * pulse, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function drawAgenProjectiles() {
  for (const projectile of agenProjectiles) {
    const dir = normalize(projectile.vx, projectile.vy);
    const pulse = 1 + Math.sin(elapsed * 10 + projectile.pulseSeed) * 0.08;
    ctx.save();
    ctx.translate(projectile.x, projectile.y);
    ctx.rotate(Math.atan2(dir.y, dir.x));
    ctx.globalCompositeOperation = "lighter";

    if (projectile.type === "ice") {
      const image = visualImages.iceCrystal;
      ctx.shadowColor = "rgba(166, 240, 255, 0.82)";
      ctx.shadowBlur = 10;
      if (imageReady(image)) {
        ctx.globalAlpha = 0.74;
        ctx.drawImage(image, -34, -17, 58 * pulse, 34 * pulse);
      }
      ctx.globalAlpha = 0.82;
      ctx.fillStyle = "rgba(212, 250, 255, 0.92)";
      ctx.strokeStyle = "rgba(65, 174, 215, 0.86)";
      ctx.lineWidth = 1.7;
      ctx.beginPath();
      ctx.moveTo(34 * pulse, 0);
      ctx.lineTo(-19 * pulse, -9 * pulse);
      ctx.lineTo(-9 * pulse, 0);
      ctx.lineTo(-19 * pulse, 9 * pulse);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    } else {
      const image = visualImages.agenFireball;
      ctx.shadowColor = "rgba(255, 82, 24, 0.92)";
      ctx.shadowBlur = 16;
      if (imageReady(image)) {
        ctx.globalAlpha = 0.9;
        const width = 82 * pulse;
        const height = 78 * pulse;
        ctx.drawImage(image, -54 * pulse, -height / 2, width, height);
      }
      const glow = ctx.createRadialGradient(18 * pulse, 0, 5, 18 * pulse, 0, 29 * pulse);
      glow.addColorStop(0, "rgba(255, 246, 198, 0.96)");
      glow.addColorStop(0.35, "rgba(255, 93, 28, 0.72)");
      glow.addColorStop(1, "rgba(181, 22, 10, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(18 * pulse, 0, 29 * pulse, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}

function drawXuanliProjectiles() {
  for (const projectile of xuanliProjectiles) {
    const isFire = projectile.type === "fire";
    const dir = normalize(projectile.vx, projectile.vy);
    const pulse = 1 + Math.sin(elapsed * 12 + projectile.pulseSeed) * 0.06;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";

    if (projectile.trail.length > 1) {
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      for (let i = 1; i < projectile.trail.length; i += 1) {
        const prev = projectile.trail[i - 1];
        const point = projectile.trail[i];
        const progress = i / projectile.trail.length;
        const ageFade = 1 - clamp(point.age / 0.42, 0, 1);
        const alpha = ageFade * progress * (isFire ? 0.32 : 0.27);
        ctx.strokeStyle = isFire
          ? `rgba(255, 96, 34, ${alpha})`
          : `rgba(200, 246, 255, ${alpha})`;
        ctx.lineWidth = projectile.radius * (0.32 + progress * 0.5);
        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
      }
      ctx.restore();
    }

    ctx.translate(projectile.x, projectile.y);
    ctx.rotate(Math.atan2(dir.y, dir.x));
    ctx.shadowColor = isFire ? "rgba(255, 74, 22, 0.9)" : "rgba(226, 252, 255, 0.9)";
    ctx.shadowBlur = isFire ? 10 : 8;

    if (isFire && imageReady(visualImages.agenFireball)) {
      const width = 50 * pulse;
      const height = 47 * pulse;
      ctx.globalAlpha = 0.9;
      ctx.drawImage(visualImages.agenFireball, -34 * pulse, -height / 2, width, height);
    } else if (!isFire && imageReady(visualImages.iceCrystal)) {
      ctx.globalAlpha = 0.76;
      ctx.drawImage(visualImages.iceCrystal, -21 * pulse, -12 * pulse, 42 * pulse, 24 * pulse);
    }

    const core = ctx.createRadialGradient(12, 0, 3, 12, 0, projectile.radius * 2.2);
    if (isFire) {
      core.addColorStop(0, "rgba(255, 245, 190, 0.95)");
      core.addColorStop(0.36, "rgba(255, 96, 28, 0.66)");
      core.addColorStop(1, "rgba(160, 24, 8, 0)");
    } else {
      core.addColorStop(0, "rgba(255, 255, 255, 0.95)");
      core.addColorStop(0.4, "rgba(220, 252, 255, 0.66)");
      core.addColorStop(1, "rgba(110, 205, 255, 0)");
    }
    ctx.fillStyle = core;
    ctx.beginPath();
    ctx.arc(12, 0, projectile.radius * 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function drawXuanliUltimates() {
  for (const orb of xuanliUltimates) {
    const spin = elapsed * 8 + orb.pulseSeed;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";

    if (orb.phase === "gather") {
      const t = clamp(orb.age / orb.gatherDuration, 0, 1);
      const eased = easeOutCubic(t);
      const orbit = 112 * (1 - eased) + 26;
      const fireX = lerp(orb.fireStartX, orb.centerX + Math.cos(spin) * orbit, eased);
      const fireY = lerp(orb.fireStartY, orb.centerY + Math.sin(spin) * orbit, eased);
      const iceX = lerp(orb.iceStartX, orb.centerX + Math.cos(spin + Math.PI) * orbit, eased);
      const iceY = lerp(orb.iceStartY, orb.centerY + Math.sin(spin + Math.PI) * orbit, eased);

      drawXuanliEnergyOrb(fireX, fireY, 17 + eased * 8, "fire", spin);
      drawXuanliEnergyOrb(iceX, iceY, 17 + eased * 8, "ice", -spin);
      drawXuanliSpiralCore(orb.centerX, orb.centerY, 22 + eased * 22, spin, 0.28 + eased * 0.34);
      ctx.restore();
      continue;
    }

    for (const point of orb.trail) {
      const progress = clamp(point.age / 0.55, 0, 1);
      const radius = orb.radius * (0.78 - progress * 0.34);
      const alpha = (1 - progress) * 0.26;
      const trail = ctx.createRadialGradient(point.x, point.y, 2, point.x, point.y, radius * 1.8);
      trail.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
      trail.addColorStop(0.34, `rgba(255, 96, 38, ${alpha * 0.66})`);
      trail.addColorStop(0.66, `rgba(190, 244, 255, ${alpha * 0.58})`);
      trail.addColorStop(1, "rgba(64, 142, 255, 0)");
      ctx.fillStyle = trail;
      ctx.beginPath();
      ctx.arc(point.x, point.y, radius * 1.8, 0, Math.PI * 2);
      ctx.fill();
    }

    drawXuanliSpiralCore(orb.x, orb.y, orb.radius * 1.45, spin, 0.82);
    ctx.restore();
  }
}

function drawLuoxiaoheiMetalPlates() {
  for (const plate of luoxiaoheiMetalPlates) {
    const dir = normalize(plate.vx, plate.vy);
    const spin = plate.spinAngle;
    const wobble = Math.sin(plate.age * 10) * 0.07;
    ctx.save();
    ctx.translate(plate.x, plate.y);
    ctx.rotate(Math.atan2(dir.y, dir.x) + spin * 0.12 + wobble);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.shadowColor = "rgba(190, 210, 214, 0.34)";
    ctx.shadowBlur = 6;

    const bodyGradient = ctx.createLinearGradient(-30, -18, 28, 14);
    bodyGradient.addColorStop(0, "#4d5c61");
    bodyGradient.addColorStop(0.45, "#a7b4b7");
    bodyGradient.addColorStop(1, "#657478");
    ctx.strokeStyle = bodyGradient;
    ctx.lineWidth = 11;
    ctx.beginPath();
    ctx.moveTo(-26, 16);
    ctx.quadraticCurveTo(1, -24, 32, -17);
    ctx.stroke();

    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(238, 248, 248, 0.6)";
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(-22, 12);
    ctx.quadraticCurveTo(2, -16, 27, -13);
    ctx.stroke();

    ctx.strokeStyle = "rgba(24, 29, 32, 0.48)";
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(-25, 19);
    ctx.quadraticCurveTo(2, -21, 33, -14);
    ctx.stroke();
    ctx.restore();
  }
}

function drawLuoxiaoheiTeleports() {
  for (const portal of luoxiaoheiTeleports) {
    const entryProgress = clamp(portal.age / portal.emergeAt, 0, 1);
    const exitProgress = clamp((portal.age - 0.14) / Math.max(0.1, portal.duration - 0.14), 0, 1);
    drawLuoxiaoheiPortal(
      portal.entryX,
      portal.entryY,
      36 - entryProgress * 9,
      0.82 * (1 - entryProgress * 0.28),
      -1,
    );
    drawLuoxiaoheiPortal(
      portal.exitX,
      portal.exitY,
      18 + easeOutCubic(exitProgress) * 23,
      0.18 + exitProgress * 0.78,
      1,
    );
  }
}

function drawLuoxiaoheiPortal(x, y, radius, alpha, spinDirection) {
  const spin = elapsed * 4.8 * spinDirection;
  ctx.save();
  ctx.translate(x, y);
  ctx.globalAlpha = clamp(alpha, 0, 1);
  ctx.globalCompositeOperation = "source-over";
  const core = ctx.createRadialGradient(0, 0, radius * 0.16, 0, 0, radius);
  core.addColorStop(0, "rgba(0, 0, 0, 0.96)");
  core.addColorStop(0.54, "rgba(7, 10, 13, 0.88)");
  core.addColorStop(1, "rgba(12, 18, 22, 0)");
  ctx.fillStyle = core;
  ctx.beginPath();
  ctx.ellipse(0, 0, radius * 1.02, radius * 0.58, spin * 0.08, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(158, 215, 143, 0.52)";
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.ellipse(0, 0, radius * 0.95, radius * 0.48, spin * 0.12, spin, spin + Math.PI * 1.45);
  ctx.stroke();
  ctx.strokeStyle = "rgba(75, 91, 96, 0.62)";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.ellipse(0, 0, radius * 0.82, radius * 0.42, -spin * 0.1, spin + Math.PI * 0.34, spin + Math.PI * 1.62);
  ctx.stroke();
  ctx.restore();
}

function drawLuoxiaoheiClones() {
  for (const clone of luoxiaoheiClones) {
    const pulse = 1 + Math.sin(elapsed * 9 + clone.wobble) * 0.08;
    ctx.save();
    ctx.translate(clone.x, clone.y);
    ctx.globalAlpha = clone.phase === "hold" ? 0.88 : 0.98;
    ctx.shadowColor = "rgba(158, 215, 143, 0.42)";
    ctx.shadowBlur = clone.phase === "hold" ? 7 : 4;
    ctx.fillStyle = "#080a0d";
    ctx.beginPath();
    ctx.arc(0, 0, clone.radius * pulse, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.fillStyle = "#9ed78f";
    ctx.beginPath();
    ctx.arc(-2.6, -1.6, 1.15, 0, Math.PI * 2);
    ctx.arc(2.6, -1.6, 1.15, 0, Math.PI * 2);
    ctx.fill();
    if (clone.phase === "fly") {
      const dir = normalize(clone.vx, clone.vy);
      ctx.strokeStyle = "rgba(158, 215, 143, 0.32)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-dir.x * 7, -dir.y * 7);
      ctx.lineTo(-dir.x * 20, -dir.y * 20);
      ctx.stroke();
    }
    ctx.restore();
  }
}

function drawJiulaoInsightZones() {
  const eyeImage = visualImages.jiulaoEye;
  for (const zone of jiulaoInsightZones) {
    const appear = clamp(zone.age / 0.22, 0, 1);
    const vanish = clamp((zone.duration - zone.age) / 0.32, 0, 1);
    const alpha = Math.min(appear, vanish) * 0.82;
    const pulse = 1 + Math.sin(elapsed * 5.8 + zone.seed) * 0.04;
    const radius = zone.radius * pulse;
    const spin = zone.age * zone.spin;

    ctx.save();
    ctx.translate(zone.x, zone.y);
    ctx.rotate(spin);
    ctx.globalAlpha = alpha;

    const aura = ctx.createRadialGradient(0, 0, radius * 0.16, 0, 0, radius);
    aura.addColorStop(0, "rgba(236, 247, 250, 0.18)");
    aura.addColorStop(0.45, "rgba(120, 160, 174, 0.18)");
    aura.addColorStop(1, "rgba(18, 27, 30, 0)");
    ctx.fillStyle = aura;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(218, 230, 235, 0.72)";
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.ellipse(0, 0, radius * 0.78, radius * 0.36, 0, 0, Math.PI * 2);
    ctx.stroke();

    if (imageReady(eyeImage)) {
      const width = radius * 1.7;
      const height = radius * 1.7;
      ctx.save();
      ctx.rotate(-spin);
      ctx.globalAlpha = alpha * 0.92;
      ctx.shadowColor = "rgba(220, 236, 241, 0.72)";
      ctx.shadowBlur = 14;
      ctx.drawImage(eyeImage, -width / 2, -height / 2, width, height);
      ctx.restore();
    } else {
      ctx.fillStyle = "rgba(220, 233, 238, 0.78)";
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.14, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}

function drawJiulaoMetalThorns() {
  for (const thorn of jiulaoMetalThorns) {
    const progress = easeOutCubic(clamp(thorn.age / 0.32, 0, 1));
    const fade = clamp((thorn.life - thorn.age) / 0.26, 0, 1);
    const activeLength = thorn.length * progress;
    if (activeLength <= 2) continue;
    const wave = Math.sin(thorn.age * 18 + thorn.side) * thorn.sway;
    const dir = normalize(
      thorn.dirX * Math.cos(wave) - thorn.dirY * Math.sin(wave),
      thorn.dirX * Math.sin(wave) + thorn.dirY * Math.cos(wave),
    );
    const side = { x: -dir.y, y: dir.x };
    const baseX = thorn.x + dir.x * 18;
    const baseY = thorn.y + dir.y * 18;
    const tipX = thorn.x + dir.x * activeLength;
    const tipY = thorn.y + dir.y * activeLength;
    const bendX = thorn.x + dir.x * activeLength * 0.5 + side.x * 30 * thorn.side;
    const bendY = thorn.y + dir.y * activeLength * 0.5 + side.y * 30 * thorn.side;

    ctx.save();
    ctx.globalAlpha = fade;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.shadowColor = "rgba(66, 86, 76, 0.52)";
    ctx.shadowBlur = 13;
    ctx.strokeStyle = "rgba(64, 88, 77, 0.62)";
    ctx.lineWidth = 15;
    ctx.beginPath();
    ctx.moveTo(baseX, baseY);
    ctx.quadraticCurveTo(bendX, bendY, tipX, tipY);
    ctx.stroke();

    ctx.shadowColor = "rgba(216, 226, 229, 0.58)";
    ctx.shadowBlur = 9;
    ctx.strokeStyle = "#7f8b91";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(baseX, baseY);
    ctx.quadraticCurveTo(bendX, bendY, tipX, tipY);
    ctx.stroke();

    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(225, 231, 234, 0.82)";
    ctx.lineWidth = 2.1;
    ctx.beginPath();
    ctx.moveTo(baseX + side.x * 2.3, baseY + side.y * 2.3);
    ctx.quadraticCurveTo(bendX + side.x * 2.3, bendY + side.y * 2.3, tipX + side.x * 1.2, tipY + side.y * 1.2);
    ctx.stroke();

    const barbCount = Math.max(5, Math.floor(activeLength / 31));
    for (let i = 1; i <= barbCount; i += 1) {
      const t = i / (barbCount + 1);
      const sprout = clamp((progress - t * 0.82) / 0.18, 0, 1);
      if (sprout <= 0) continue;
      const curveOffset = Math.sin(t * Math.PI) * 30 * thorn.side;
      const x = baseX + dir.x * activeLength * t + side.x * curveOffset;
      const y = baseY + dir.y * activeLength * t + side.y * curveOffset;
      const barbSide = i % 2 === 0 ? 1 : -1;
      const branch = (12 + (i % 3) * 4) * sprout;
      const endX = x - dir.x * branch + side.x * branch * 0.86 * barbSide;
      const endY = y - dir.y * branch + side.y * branch * 0.86 * barbSide;
      ctx.strokeStyle = `rgba(103, 114, 119, ${0.94 * sprout})`;
      ctx.lineWidth = 3.2 * sprout;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      ctx.fillStyle = `rgba(211, 219, 223, ${0.9 * sprout})`;
      ctx.beginPath();
      ctx.moveTo(endX, endY);
      ctx.lineTo(endX + dir.x * 8 * sprout - side.x * 2.4 * barbSide, endY + dir.y * 8 * sprout - side.y * 2.4 * barbSide);
      ctx.lineTo(endX + side.x * 5.5 * barbSide * sprout, endY + side.y * 5.5 * barbSide * sprout);
      ctx.closePath();
      ctx.fill();
    }

    ctx.fillStyle = "rgba(224, 231, 234, 0.94)";
    ctx.beginPath();
    ctx.moveTo(tipX + dir.x * 17, tipY + dir.y * 17);
    ctx.lineTo(tipX - dir.x * 8 + side.x * 7, tipY - dir.y * 8 + side.y * 7);
    ctx.lineTo(tipX - dir.x * 8 - side.x * 7, tipY - dir.y * 8 - side.y * 7);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }
}

function drawXuanliEnergyOrb(x, y, radius, type, spin) {
  const isFire = type === "fire";
  const glow = ctx.createRadialGradient(x, y, 2, x, y, radius * 2.4);
  if (isFire) {
    glow.addColorStop(0, "rgba(255, 248, 194, 0.95)");
    glow.addColorStop(0.32, "rgba(255, 92, 28, 0.72)");
    glow.addColorStop(1, "rgba(142, 18, 6, 0)");
  } else {
    glow.addColorStop(0, "rgba(255, 255, 255, 0.94)");
    glow.addColorStop(0.36, "rgba(210, 248, 255, 0.74)");
    glow.addColorStop(1, "rgba(92, 180, 255, 0)");
  }
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(x, y, radius * 2.4, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(spin);
  ctx.strokeStyle = isFire ? "rgba(255, 222, 130, 0.78)" : "rgba(245, 255, 255, 0.78)";
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.86, -0.3, Math.PI * 1.2);
  ctx.stroke();
  ctx.restore();
}

function drawXuanliSpiralCore(x, y, radius, spin, alpha) {
  const core = ctx.createRadialGradient(x, y, 2, x, y, radius * 1.42);
  core.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
  core.addColorStop(0.3, `rgba(255, 113, 44, ${alpha * 0.68})`);
  core.addColorStop(0.58, `rgba(214, 250, 255, ${alpha * 0.72})`);
  core.addColorStop(1, "rgba(68, 146, 255, 0)");
  ctx.fillStyle = core;
  ctx.beginPath();
  ctx.arc(x, y, radius * 1.42, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(spin);
  ctx.lineCap = "round";
  for (let i = 0; i < 4; i += 1) {
    ctx.rotate(Math.PI / 2);
    ctx.strokeStyle = i % 2 === 0 ? `rgba(255, 147, 72, ${alpha * 0.82})` : `rgba(230, 252, 255, ${alpha * 0.82})`;
    ctx.lineWidth = radius * 0.13;
    ctx.beginPath();
    ctx.arc(0, 0, radius * (0.26 + i * 0.12), 0.2, Math.PI * 1.16);
    ctx.stroke();
  }
  ctx.restore();
}

function drawElementalStatusEffects(fighter) {
  const frozen = fighter.frozenRemaining > 0;
  const burning = fighter.burnRemaining > 0;
  if (!frozen && !burning) return;

  if (frozen) {
    const pulse = 1 + Math.sin(elapsed * 12) * 0.03;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = 0.68;
    ctx.strokeStyle = "rgba(206, 250, 255, 0.94)";
    ctx.lineWidth = 6;
    ctx.shadowColor = "rgba(176, 242, 255, 0.86)";
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(0, 0, (fighter.radius + 5) * pulse, 0, Math.PI * 2);
    ctx.stroke();

    ctx.globalAlpha = 0.44;
    const shell = ctx.createRadialGradient(-fighter.radius * 0.3, -fighter.radius * 0.35, 4, 0, 0, fighter.radius + 7);
    shell.addColorStop(0, "rgba(255, 255, 255, 0.44)");
    shell.addColorStop(0.48, "rgba(172, 236, 255, 0.35)");
    shell.addColorStop(1, "rgba(55, 173, 235, 0.18)");
    ctx.fillStyle = shell;
    ctx.beginPath();
    ctx.arc(0, 0, fighter.radius + 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = 0.92;
    ctx.strokeStyle = "rgba(242, 254, 255, 0.85)";
    ctx.lineWidth = 1.7;
    for (let i = 0; i < 7; i += 1) {
      const angle = i * Math.PI * 2 / 7 + 0.28 + Math.sin(elapsed * 3 + i) * 0.08;
      ctx.beginPath();
      ctx.moveTo(Math.cos(angle) * 6, Math.sin(angle) * 6);
      ctx.lineTo(Math.cos(angle) * (fighter.radius + 7), Math.sin(angle) * (fighter.radius + 7));
      ctx.stroke();
    }

    ctx.fillStyle = "rgba(225, 250, 255, 0.92)";
    ctx.strokeStyle = "rgba(88, 205, 255, 0.88)";
    ctx.lineWidth = 1.2;
    for (let i = 0; i < 8; i += 1) {
      const angle = elapsed * -0.5 + i * Math.PI * 2 / 8;
      const inner = fighter.radius + 2 + (i % 2) * 2;
      const outer = fighter.radius + 13 + Math.sin(elapsed * 5 + i) * 2;
      const side = angle + 0.14;
      ctx.beginPath();
      ctx.moveTo(Math.cos(angle) * outer, Math.sin(angle) * outer);
      ctx.lineTo(Math.cos(side) * inner, Math.sin(side) * inner);
      ctx.lineTo(Math.cos(angle - 0.14) * inner, Math.sin(angle - 0.14) * inner);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  }

  if (burning) {
    const image = visualImages.agenFireball;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    const pulse = 1 + Math.sin(elapsed * 12.5) * 0.06;
    ctx.globalAlpha = 0.82;
    ctx.shadowColor = "rgba(255, 71, 18, 0.95)";
    ctx.shadowBlur = 18;
    const heat = ctx.createRadialGradient(0, 0, fighter.radius * 0.35, 0, 0, fighter.radius + 21);
    heat.addColorStop(0, "rgba(255, 231, 118, 0.18)");
    heat.addColorStop(0.56, "rgba(255, 78, 24, 0.3)");
    heat.addColorStop(1, "rgba(255, 26, 8, 0)");
    ctx.fillStyle = heat;
    ctx.beginPath();
    ctx.arc(0, 0, fighter.radius + 21, 0, Math.PI * 2);
    ctx.fill();

    if (imageReady(image)) {
      for (let i = 0; i < 3; i += 1) {
        const angle = -Math.PI / 2 + (i - 1) * 0.42 + Math.sin(elapsed * 3.1 + i) * 0.05;
        const size = (fighter.radius * (2.45 + i * 0.16)) * pulse;
        const x = Math.cos(angle) * (fighter.radius * 0.2);
        const y = Math.sin(angle) * (fighter.radius * 0.15) - fighter.radius * 0.08;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle + Math.PI / 2);
        ctx.globalAlpha = i === 1 ? 0.54 : 0.32;
        ctx.drawImage(image, -size * 0.58, -size * 0.52, size * 1.06, size);
        ctx.restore();
      }
    }

    ctx.strokeStyle = "rgba(255, 164, 54, 0.88)";
    ctx.lineWidth = 4.5;
    ctx.beginPath();
    ctx.arc(0, 0, fighter.radius + 8 * pulse, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = "rgba(255, 67, 21, 0.62)";
    ctx.lineWidth = 2;
    for (let i = 0; i < 6; i += 1) {
      const angle = -Math.PI * 0.82 + i * Math.PI * 0.33 + Math.sin(elapsed * 4 + i) * 0.08;
      ctx.beginPath();
      ctx.moveTo(Math.cos(angle) * (fighter.radius - 3), Math.sin(angle) * (fighter.radius - 3));
      ctx.quadraticCurveTo(
        Math.cos(angle + 0.18) * (fighter.radius + 8),
        Math.sin(angle + 0.18) * (fighter.radius + 8) - 6,
        Math.cos(angle + 0.08) * (fighter.radius + 18),
        Math.sin(angle + 0.08) * (fighter.radius + 18) - 10,
      );
      ctx.stroke();
    }

    ctx.fillStyle = "rgba(255, 219, 98, 0.88)";
    for (let i = 0; i < 8; i += 1) {
      const angle = -elapsed * 2.1 + i * 2.399;
      const emberRadius = fighter.radius + 10 + (i % 3) * 4;
      const emberSize = 1.6 + (i % 2) * 1.2;
      ctx.beginPath();
      ctx.arc(Math.cos(angle) * emberRadius, Math.sin(angle) * emberRadius, emberSize, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

function drawMingwangAura(fighter) {
  const boost = fighter.skills?.boost;
  const heal = fighter.skills?.heal;
  const revive = fighter.skills?.revive;
  const boostActive = boost?.activeRemaining > 0;
  const healActive = heal?.effectRemaining > 0;
  const reviveActive = revive?.effectRemaining > 0;
  if (!boostActive && !healActive && !reviveActive) return;

  ctx.save();
  if (boostActive) {
    const ratio = clamp(boost.activeRemaining / boost.duration, 0, 1);
    const pulse = 1 + Math.sin(elapsed * 18) * 0.08;
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = 0.42 + Math.sin(elapsed * 14) * 0.08;
    ctx.strokeStyle = "rgba(255, 196, 174, 0.9)";
    ctx.lineWidth = 5;
    ctx.shadowColor = "rgba(255, 95, 88, 0.74)";
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(0, 0, (fighter.radius + 12 + (1 - ratio) * 7) * pulse, 0, Math.PI * 2);
    ctx.stroke();
  }

  if (healActive || reviveActive) {
    const remaining = Math.max(heal?.effectRemaining || 0, revive?.effectRemaining || 0);
    const duration = reviveActive ? 1.8 : 1.35;
    const progress = 1 - clamp(remaining / duration, 0, 1);
    const fade = 1 - easeOutCubic(progress);
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = 0.62 * fade;
    ctx.fillStyle = "rgba(255, 72, 82, 0.92)";
    ctx.shadowColor = "rgba(255, 72, 82, 0.88)";
    ctx.shadowBlur = 12;
    const size = fighter.radius * (0.5 + progress * 0.18);
    ctx.fillRect(-size * 0.16, -fighter.radius - 22 - size * 0.5, size * 0.32, size);
    ctx.fillRect(-size * 0.5, -fighter.radius - 22 - size * 0.16, size, size * 0.32);
    ctx.globalAlpha = 0.32 * fade;
    ctx.strokeStyle = "rgba(255, 154, 154, 0.86)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, 0, fighter.radius + 16 + progress * 24, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}

function drawQidaoRocks() {
  for (const rock of qidaoRocks) {
    if (rock.phase === "gather") {
      const progress = clamp(rock.age / rock.gatherDuration, 0, 1);
      const eased = easeOutCubic(progress);
      for (const pebble of rock.origins) {
        const wobble = Math.sin(elapsed * 9 + pebble.seed) * 5 * (1 - eased);
        const x = pebble.x + (rock.x - pebble.x) * eased + Math.cos(pebble.seed) * wobble;
        const y = pebble.y + (rock.y - pebble.y) * eased + Math.sin(pebble.seed) * wobble;
        drawQidaoStoneAt(x, y, pebble.radius + eased * 3.5, pebble.seed + elapsed * 1.6, 0.78);
      }
      ctx.save();
      ctx.globalAlpha = 0.24 + progress * 0.32;
      ctx.strokeStyle = "rgba(208, 161, 95, 0.82)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(rock.x, rock.y, 20 + progress * 26, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
      continue;
    }

    ctx.save();
    ctx.translate(rock.x, rock.y);
    ctx.rotate(rock.angle);
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 0.2;
    ctx.strokeStyle = "rgba(208, 161, 95, 0.82)";
    ctx.lineWidth = 13;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(-58, 0);
    ctx.lineTo(-20, 0);
    ctx.stroke();
    ctx.globalAlpha = 1;
    drawQidaoStoneAt(0, 0, rock.radius, rock.angle * 0.25, 0.98);
    ctx.restore();
  }
}

function drawQidaoStoneAt(x, y, radius, rotation = 0, alpha = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.globalAlpha = alpha;
  ctx.shadowColor = "rgba(83, 58, 39, 0.55)";
  ctx.shadowBlur = radius > 12 ? 9 : 4;
  if (imageReady(visualImages.rock)) {
    ctx.drawImage(visualImages.rock, -radius * 1.1, -radius * 1.05, radius * 2.2, radius * 2.1);
  } else {
    const gradient = ctx.createRadialGradient(-radius * 0.32, -radius * 0.36, 2, 0, 0, radius);
    gradient.addColorStop(0, "#e2be86");
    gradient.addColorStop(0.5, "#9b6b43");
    gradient.addColorStop(1, "#4d3629");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(radius * 0.95, -radius * 0.1);
    ctx.lineTo(radius * 0.45, radius * 0.78);
    ctx.lineTo(-radius * 0.62, radius * 0.68);
    ctx.lineTo(-radius * 0.98, -radius * 0.05);
    ctx.lineTo(-radius * 0.28, -radius * 0.88);
    ctx.lineTo(radius * 0.62, -radius * 0.72);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

function drawNezhaFireAura(fighter) {
  const radius = fighter.radius;
  const fire = fighter.skills?.fire;
  const burstRatio = fire?.burstRemaining > 0
    ? clamp(fire.burstRemaining / fire.burstDuration, 0, 1)
    : 0;
  const burstEase = burstRatio > 0 ? Math.sin(burstRatio * Math.PI) : 0;
  const intensity = 1 + burstEase * 0.55;
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  const haloRadius = radius + 34 + burstEase * 22;
  const halo = ctx.createRadialGradient(0, 0, radius * 0.48, 0, 0, haloRadius);
  halo.addColorStop(0, `rgba(255, 218, 102, ${0.08 + burstEase * 0.08})`);
  halo.addColorStop(0.55, `rgba(255, 96, 28, ${0.24 + burstEase * 0.16})`);
  halo.addColorStop(1, "rgba(255, 46, 18, 0)");
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(0, 0, haloRadius, 0, Math.PI * 2);
  ctx.fill();

  const image = visualImages.fireRing;
  if (imageReady(image)) {
    const baseSize = (radius + 36 + burstEase * 22) * 2;
    const pulse = 1 + Math.sin(elapsed * (5.1 + burstEase * 2.4)) * (0.035 + burstEase * 0.025);
    const layers = burstEase > 0 ? 3 : 2;
    for (let i = 0; i < layers; i += 1) {
      const layerScale = i === 0 ? 1 : i === 1 ? 0.83 : 1.14;
      const size = baseSize * pulse * layerScale;
      ctx.save();
      ctx.rotate(elapsed * (i === 0 ? 1.1 : -1.34 - burstEase * 0.38) + i * 0.74);
      ctx.globalAlpha = (i === 0 ? 0.78 : i === 1 ? 0.44 : 0.36) * intensity;
      ctx.drawImage(image, -size / 2, -size / 2, size, size);
      ctx.restore();
    }
  }
  ctx.restore();
}

function drawQiankunRings(fighter) {
  const qiankun = fighter.skills?.qiankun;
  if (!qiankun?.active) return;
  ctx.save();
  const orbitRadius = fighter.radius + 28;
  ctx.globalAlpha = 0.24;
  ctx.strokeStyle = "rgba(255, 214, 92, 0.68)";
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.ellipse(0, 0, orbitRadius, orbitRadius * 0.72, 0, 0, Math.PI * 2);
  ctx.stroke();

  qiankun.rings.forEach((ring, index) => {
    if (!ring.active) return;
    const depth = (Math.sin(ring.angle) + 1) / 2;
    const x = Math.cos(ring.angle) * orbitRadius;
    const y = Math.sin(ring.angle) * (orbitRadius * 0.72) + ring.bob;
    const scale = 0.82 + depth * 0.22;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(ring.angle + Math.PI / 2);
    ctx.scale(scale, (0.42 + depth * 0.2) * scale);
    ctx.globalAlpha = 0.58 + depth * 0.34;
    ctx.shadowColor = "rgba(255, 209, 84, 0.88)";
    ctx.shadowBlur = 10;
    ctx.strokeStyle = "rgba(255, 210, 84, 0.96)";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(0, 0, 17, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 4;
    ctx.strokeStyle = "rgba(255, 255, 210, 0.92)";
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.arc(0, 0, 12, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = "rgba(176, 107, 24, 0.82)";
    ctx.lineWidth = 1.6;
    for (let i = 0; i < 4; i += 1) {
      const mark = i * Math.PI / 2 + elapsed * 0.6;
      ctx.beginPath();
      ctx.arc(0, 0, 17, mark, mark + 0.22);
      ctx.stroke();
    }
    ctx.restore();
  });
  ctx.restore();
}

function drawOrbitingShield(fighter) {
  const skill = fighter.skills.stoneShield;
  if (!skill.active || skill.absentRemaining > 0) return;
  ctx.save();
  ctx.rotate(skill.angle);
  drawShieldArc(fighter.radius, 0.82, false);
  ctx.restore();
}

function drawLuyeTreasureShield(fighter) {
  const shield = fighter.skills?.treasureShield;
  if (!shield) return;
  if (shield.active) {
    const radius = fighter.radius + 13 + Math.sin(elapsed * 5.8) * 1.4;
    const strength = shield.charges / shield.maxCharges;
    const glow = ctx.createRadialGradient(0, 0, fighter.radius * 0.75, 0, 0, radius);
    glow.addColorStop(0, "rgba(255, 245, 232, 0.04)");
    glow.addColorStop(0.68, `rgba(255, 225, 202, ${0.12 + strength * 0.1})`);
    glow.addColorStop(1, "rgba(255, 236, 216, 0.28)");
    ctx.save();
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = `rgba(255, 235, 214, ${0.45 + strength * 0.24})`;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.52)";
    ctx.lineWidth = 1.1;
    for (let i = 0; i < shield.charges; i += 1) {
      const angle = elapsed * 0.85 + i * (Math.PI * 2 / shield.maxCharges);
      ctx.beginPath();
      ctx.arc(0, 0, radius - 4, angle, angle + 0.72);
      ctx.stroke();
    }
    const blockedCount = shield.maxCharges - shield.charges;
    if (blockedCount >= 2) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(0, 0, radius + 2, 0, Math.PI * 2);
      ctx.clip();
      const crackAlpha = blockedCount >= 3 ? 0.72 : 0.46;
      drawShieldCrackTexture(radius, crackAlpha, blockedCount >= 3 ? 1.08 : 0.92, -0.16, -0.04);
      ctx.restore();
    }
    ctx.restore();
  }

  if (shield.shatterAge > 0) {
    const progress = 1 - shield.shatterAge / 0.78;
    const radius = fighter.radius + 13;
    ctx.save();
    ctx.globalAlpha = Math.max(0, 1 - progress * 0.9);
    const crackedGlow = ctx.createRadialGradient(-radius * 0.18, -radius * 0.22, 4, 0, 0, radius + 8);
    crackedGlow.addColorStop(0, "rgba(255, 255, 255, 0.22)");
    crackedGlow.addColorStop(0.54, "rgba(210, 242, 255, 0.13)");
    crackedGlow.addColorStop(1, "rgba(255, 230, 214, 0.22)");
    ctx.fillStyle = crackedGlow;
    ctx.beginPath();
    ctx.arc(0, 0, radius + progress * 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(255, 255, 255, 0.88)";
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.arc(0, 0, radius + progress * 5, 0, Math.PI * 2);
    ctx.stroke();

    ctx.save();
    ctx.beginPath();
    ctx.arc(0, 0, radius + progress * 7, 0, Math.PI * 2);
    ctx.clip();
    const crackAlpha = Math.max(0, 1 - progress * 0.35);
    drawShieldCrackTexture(radius, crackAlpha, 1.22 + progress * 0.18, -0.12, -0.02, progress * 0.08);
    ctx.restore();

    ctx.fillStyle = "rgba(238, 252, 255, 0.82)";
    ctx.strokeStyle = "rgba(255, 235, 214, 0.72)";
    ctx.lineWidth = 0.9;
    for (let i = 0; i < 9; i += 1) {
      const angle = i * 1.37 + 0.3;
      const distance = radius * (0.48 + (i % 4) * 0.12) + progress * (10 + i * 1.6);
      const shardX = Math.cos(angle) * distance;
      const shardY = Math.sin(angle) * distance;
      const shardSize = 3.5 + (i % 3) * 1.6;
      ctx.globalAlpha = Math.max(0, 0.78 - progress * 0.68);
      ctx.beginPath();
      ctx.moveTo(shardX, shardY - shardSize);
      ctx.lineTo(shardX + shardSize * 0.72, shardY + shardSize * 0.2);
      ctx.lineTo(shardX - shardSize * 0.45, shardY + shardSize * 0.86);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  }
}

function drawShieldCrackTexture(radius, alpha, scale = 1, offsetX = 0, offsetY = 0, rotation = 0) {
  if (!imageReady(visualImages.shieldCrack)) {
    drawShieldCrack(radius, -0.92, 0.72, alpha, 0.16, 0);
    drawShieldCrack(radius, 0.18, 0.86, alpha * 0.86, 0.12, 1);
    drawShieldCrack(radius, 1.92, 0.68, alpha * 0.74, 0.1, 2);
    return;
  }

  const image = visualImages.shieldCrack;
  const drawSize = radius * 2.35 * scale;
  const imageRatio = image.naturalWidth / image.naturalHeight;
  let drawWidth = drawSize;
  let drawHeight = drawSize;
  if (imageRatio > 1) {
    drawHeight = drawSize / imageRatio;
  } else {
    drawWidth = drawSize * imageRatio;
  }

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(radius * offsetX, radius * offsetY);
  ctx.rotate(rotation);
  ctx.filter = "brightness(1.35) contrast(1.15) saturate(0.78)";
  ctx.drawImage(image, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
  ctx.filter = "none";
  ctx.globalCompositeOperation = "lighter";
  ctx.globalAlpha = alpha * 0.32;
  ctx.drawImage(image, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
  ctx.restore();
}

function drawShieldCrack(radius, angle, reach, alpha, progress, seed) {
  const startDistance = radius * (0.12 + seed * 0.04);
  const endDistance = radius * reach + progress * 10;
  const startX = Math.cos(angle) * startDistance;
  const startY = Math.sin(angle) * startDistance;
  const midAngle = angle + Math.sin(seed * 2.1) * 0.22;
  const midDistance = radius * (0.42 + seed * 0.03);
  const endAngle = angle + Math.sin(seed * 1.7 + 1.1) * 0.28;
  const endX = Math.cos(endAngle) * endDistance;
  const endY = Math.sin(endAngle) * endDistance;
  const midX = Math.cos(midAngle) * midDistance;
  const midY = Math.sin(midAngle) * midDistance;

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.lineCap = "round";
  ctx.strokeStyle = "rgba(28, 56, 68, 0.62)";
  ctx.lineWidth = 3.2;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(midX, midY);
  ctx.lineTo(endX, endY);
  ctx.stroke();

  ctx.strokeStyle = "rgba(255, 255, 255, 0.92)";
  ctx.lineWidth = 1.25;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(midX, midY);
  ctx.lineTo(endX, endY);
  ctx.stroke();

  const branches = [
    { t: 0.34, side: -1, length: 0.24 },
    { t: 0.58, side: 1, length: 0.2 },
    { t: 0.74, side: seed % 2 ? -1 : 1, length: 0.16 },
  ];
  for (const branch of branches) {
    const baseX = startX + (endX - startX) * branch.t;
    const baseY = startY + (endY - startY) * branch.t;
    const branchAngle = angle + branch.side * (0.72 + seed * 0.06);
    const branchLength = radius * branch.length * (1 + progress * 0.5);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.84)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(baseX, baseY);
    ctx.lineTo(baseX + Math.cos(branchAngle) * branchLength, baseY + Math.sin(branchAngle) * branchLength);
    ctx.stroke();
    ctx.strokeStyle = "rgba(28, 56, 68, 0.38)";
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(baseX, baseY);
    ctx.lineTo(baseX + Math.cos(branchAngle) * branchLength, baseY + Math.sin(branchAngle) * branchLength);
    ctx.stroke();
  }
  ctx.restore();
}

function drawShieldArc(radius, alpha = 0.8, launched = false) {
  const arcRadius = radius + (launched ? 9 : 15);
  const start = -1.08;
  const end = 1.08;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.shadowColor = "rgba(90, 244, 255, 0.78)";
  ctx.shadowBlur = launched ? 16 : 12;
  ctx.lineCap = "round";
  ctx.strokeStyle = "rgba(39, 210, 244, 0.28)";
  ctx.lineWidth = launched ? 12 : 10;
  ctx.beginPath();
  ctx.arc(0, 0, arcRadius, start, end);
  ctx.stroke();

  ctx.strokeStyle = "rgba(140, 251, 255, 0.86)";
  ctx.lineWidth = launched ? 5.5 : 4.8;
  ctx.beginPath();
  ctx.arc(0, 0, arcRadius, start, end);
  ctx.stroke();

  ctx.shadowBlur = launched ? 6 : 4;
  ctx.strokeStyle = "rgba(240, 255, 255, 0.96)";
  ctx.lineWidth = launched ? 1.8 : 1.5;
  ctx.beginPath();
  ctx.arc(0, 0, arcRadius - 4, start + 0.1, end - 0.1);
  ctx.stroke();

  ctx.strokeStyle = "rgba(87, 232, 255, 0.62)";
  ctx.lineWidth = 1.4;
  for (let i = 0; i < 3; i += 1) {
    const angle = start + (i + 1) * ((end - start) / 4);
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * (arcRadius - 6), Math.sin(angle) * (arcRadius - 6));
    ctx.lineTo(Math.cos(angle) * (arcRadius + 5), Math.sin(angle) * (arcRadius + 5));
    ctx.stroke();
  }

  if (launched) {
    ctx.globalAlpha = alpha * 0.34;
    ctx.strokeStyle = "rgba(204, 255, 255, 0.78)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(-radius * 1.35, 0);
    ctx.lineTo(-radius * 0.42, 0);
    ctx.stroke();
  }

  ctx.stroke();
  ctx.restore();
}

function drawFighterFace(fighter) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 0, fighter.radius, 0, Math.PI * 2);
  ctx.clip();

  if (fighter.role === "infinite" && roleImages.infinite.complete) {
    const size = fighter.radius * 3.05;
    ctx.drawImage(roleImages.infinite, -size * 0.47, -size * 0.36, size * 0.94, size * 1.26);
  } else if ((fighter.role === "fengxi" || fighter.role === "fengxiDomain") && roleImages.fengxi.complete) {
    const size = fighter.radius * 2.55;
    ctx.drawImage(roleImages.fengxi, -size * 0.5, -size * 0.43, size, size * 0.95);
  } else if (fighter.role === "xuhuai" && roleImages.xuhuai.complete) {
    const size = fighter.radius * 2.4;
    ctx.drawImage(roleImages.xuhuai, -size * 0.5, -size * 0.5, size, size * 1.12);
  } else if (fighter.role === "chinian" && roleImages.chinian.complete) {
    const size = fighter.radius * 2.55;
    ctx.drawImage(roleImages.chinian, -size * 0.48, -size * 0.5, size, size * 1.08);
  } else if (fighter.role === "scythe" && roleImages.haoke.complete) {
    const size = fighter.radius * 2.55;
    ctx.drawImage(roleImages.haoke, -size * 0.5, -size * 0.5, size, size * 1.12);
  } else if (fighter.role === "qingquan" && roleImages.qingquan.complete) {
    const size = fighter.radius * 2.5;
    ctx.drawImage(roleImages.qingquan, -size * 0.5, -size * 0.48, size, size * 1.1);
  } else if (fighter.role === "dasong" && roleImages.dasong.complete) {
    const size = fighter.radius * 2.45;
    ctx.drawImage(roleImages.dasong, -size * 0.5, -size * 0.46, size, size * 1.08);
  } else if (fighter.role === "lingyao" && roleImages.lingyao.complete) {
    const size = fighter.radius * 2.5;
    ctx.drawImage(roleImages.lingyao, -size * 0.5, -size * 0.48, size, size * 1.1);
  } else if (fighter.role === "luye" && roleImages.luye.complete) {
    const size = fighter.radius * 2.58;
    ctx.drawImage(roleImages.luye, -size * 0.52, -size * 0.5, size * 1.04, size * 1.12);
  } else if (fighter.role === "ximuzi" && roleImages.ximuzi.complete) {
    const size = fighter.radius * 2.65;
    ctx.drawImage(roleImages.ximuzi, -size * 0.55, -size * 0.48, size * 1.12, size * 1.08);
  } else if (fighter.role === "nezha" && roleImages.nezha.complete) {
    const size = fighter.radius * 2.62;
    ctx.drawImage(roleImages.nezha, -size * 0.52, -size * 0.5, size * 1.05, size * 1.1);
  } else if (fighter.role === "agen" && roleImages.agen.complete) {
    const size = fighter.radius * 2.58;
    ctx.drawImage(roleImages.agen, -size * 0.5, -size * 0.48, size, size * 1.1);
  } else if (fighter.role === "qidao" && roleImages.qidao.complete) {
    const size = fighter.radius * 3.1;
    ctx.drawImage(roleImages.qidao, -size * 0.54, -size * 0.34, size * 1.08, size * 1.72);
  } else if (fighter.role === "xuanli" && roleImages.xuanli.complete) {
    const size = fighter.radius * 2.72;
    ctx.drawImage(roleImages.xuanli, -size * 0.5, -size * 0.39, size, size * 1.44);
  } else if (fighter.role === "luoxiaohei" && roleImages.luoxiaohei.complete) {
    const size = fighter.radius * 2.9;
    ctx.drawImage(roleImages.luoxiaohei, -size * 0.56, -size * 0.48, size * 1.1, size * 1.35);
  } else if (fighter.role === "jiulao" && roleImages.jiulao.complete) {
    const size = fighter.radius * 3.02;
    ctx.drawImage(roleImages.jiulao, -size * 0.52, -size * 0.43, size * 1.04, size * 1.52);
  } else if (fighter.role === "zhiqing" && roleImages.zhiqing.complete) {
    const size = fighter.radius * 2.65;
    ctx.drawImage(roleImages.zhiqing, -size * 0.47, -size * 0.47, size * 1.1, size * 1.08);
  } else if (fighter.role === "mingwang" && roleImages.mingwang.complete) {
    const size = fighter.radius * 2.75;
    ctx.drawImage(roleImages.mingwang, -size * 0.5, -size * 0.35, size, size * 1.48);
  } else {
    const gradient = ctx.createRadialGradient(-11, -13, 4, 0, 0, fighter.radius);
    gradient.addColorStop(0, "#ffffff");
    gradient.addColorStop(0.18, fighter.accent);
    gradient.addColorStop(1, fighter.color);
    ctx.fillStyle = gradient;
    ctx.fillRect(-fighter.radius, -fighter.radius, fighter.radius * 2, fighter.radius * 2);
  }

  ctx.restore();
}

function drawRebars() {
  const heavyChaseWireLoad = rebars.filter((item) => item.kind === "chase-wire").length >= 4;
  for (const rebar of rebars) {
    if (rebar.tethered) {
      drawTetheredWire(rebar, heavyChaseWireLoad);
      continue;
    }
    if (rebar.kind === "boomerang") {
      drawInfiniteBoomerang(rebar);
      continue;
    }
    ctx.save();
    ctx.translate(rebar.x, rebar.y);
    ctx.rotate(rebar.angle);
    ctx.lineCap = "round";
    if (rebar.glow) {
      ctx.shadowColor = rebar.glow;
      ctx.shadowBlur = rebar.kind === "chase-wire" ? 14 : 8;
    }
    ctx.strokeStyle = rebar.color || "#aeb4ac";
    ctx.lineWidth = rebar.kind === "wire" || rebar.kind === "chase-wire" ? 4.5 : 8;
    ctx.beginPath();
    ctx.moveTo(-rebar.length / 2, 0);
    ctx.lineTo(rebar.length / 2, 0);
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = rebar.kind === "wire" || rebar.kind === "chase-wire" ? "rgba(255, 76, 76, 0.76)" : "#5e665f";
    ctx.lineWidth = rebar.kind === "wire" || rebar.kind === "chase-wire" ? 1.4 : 2;
    for (let x = -18; x <= 18; x += rebar.kind === "wire" || rebar.kind === "chase-wire" ? 18 : 12) {
      ctx.beginPath();
      ctx.moveTo(x - 5, -5);
      ctx.lineTo(x + 5, 5);
      ctx.stroke();
    }
    if (rebar.kind === "chase-wire") {
      ctx.strokeStyle = "rgba(255, 235, 215, 0.7)";
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.moveTo(-rebar.length / 2, -3.5);
      ctx.lineTo(rebar.length / 2, -3.5);
      ctx.stroke();
    }
    ctx.restore();
  }
}

function drawInfiniteBoomerang(rebar) {
  const image = visualImages.boomerang;
  const pulse = 1 + Math.sin(elapsed * 7 + rebar.spinAngle) * 0.025;
  ctx.save();
  ctx.translate(rebar.x, rebar.y);
  ctx.rotate(rebar.angle + rebar.spinAngle);
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 0.16;
  ctx.strokeStyle = "rgba(139, 92, 48, 0.46)";
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-42, 2);
  ctx.lineTo(-18, 0);
  ctx.stroke();

  ctx.globalAlpha = 0.96;
  ctx.shadowColor = "rgba(110, 62, 24, 0.32)";
  ctx.shadowBlur = 3;
  if (imageReady(image)) {
    const width = 94 * pulse;
    const height = 59 * pulse;
    ctx.drawImage(image, -width / 2, -height / 2, width, height);
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = 0.1;
    ctx.strokeStyle = "rgba(255, 207, 104, 0.45)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(0, 0, 38 * pulse, -0.55, Math.PI * 1.05);
    ctx.stroke();
  } else {
    ctx.strokeStyle = "#c28643";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(0, 0, 28, -2.58, -0.58);
    ctx.stroke();
  }
  ctx.restore();
}

function drawTetheredWire(rebar, lightMode = false) {
  const owner = findCombatBodyById(rebar.ownerId);
  if ((!owner || owner.hidden) && rebar.originX === undefined) return;
  const isLuyeWire = rebar.kind === "wire" || rebar.kind === "chase-wire";
  const originX = rebar.originX ?? owner.x;
  const originY = rebar.originY ?? owner.y;
  const originRadius = rebar.originX === undefined ? owner.radius * 0.72 : 0;
  const dx = rebar.x - originX;
  const dy = rebar.y - originY;
  const distance = Math.max(1, length(dx, dy));
  const dirX = dx / distance;
  const dirY = dy / distance;
  const startX = originX + dirX * originRadius;
  const startY = originY + dirY * originRadius;
  const midX = (startX + rebar.x) / 2;
  const midY = (startY + rebar.y) / 2;
  const wave =
    Math.sin(elapsed * (isLuyeWire ? 4.2 : 7.2) + rebar.curveSeed) * 0.52 +
    Math.sin(elapsed * (isLuyeWire ? 2.6 : 3.5) + rebar.curveSeed * 1.7) * 0.48;
  const bend = clamp(distance * (isLuyeWire ? 0.24 : 0.16), isLuyeWire ? 24 : 16, isLuyeWire ? 92 : 58) * wave;
  const normalX = -dirY;
  const normalY = dirX;
  const controlX = midX + normalX * bend;
  const controlY = midY + normalY * bend;
  const control1X = isLuyeWire ? startX + dx * 0.34 + normalX * bend * 0.92 : controlX;
  const control1Y = isLuyeWire ? startY + dy * 0.34 + normalY * bend * 0.92 : controlY;
  const control2X = isLuyeWire ? startX + dx * 0.72 - normalX * bend * 0.46 : controlX;
  const control2Y = isLuyeWire ? startY + dy * 0.72 - normalY * bend * 0.46 : controlY;

  const drawWirePath = () => {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    if (isLuyeWire) {
      ctx.bezierCurveTo(control1X, control1Y, control2X, control2Y, rebar.x, rebar.y);
    } else {
      ctx.quadraticCurveTo(controlX, controlY, rebar.x, rebar.y);
    }
    ctx.stroke();
  };

  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.shadowColor = rebar.glow || "rgba(255, 80, 80, 0.5)";
  ctx.shadowBlur = isLuyeWire ? (lightMode ? 5 : 13) : 10;
  ctx.strokeStyle = isLuyeWire
    ? rebar.kind === "chase-wire"
      ? "rgba(255, 183, 54, 0.42)"
      : "rgba(255, 196, 64, 0.34)"
    : "rgba(255, 95, 82, 0.36)";
  ctx.lineWidth = isLuyeWire ? (lightMode ? 4.8 : 6.2) : 6;
  drawWirePath();

  ctx.shadowBlur = lightMode ? 1.5 : 4;
  ctx.strokeStyle = rebar.color || "#f2d4b0";
  ctx.lineWidth = isLuyeWire ? (lightMode ? 1.9 : 2.35) : 2.6;
  drawWirePath();

  if (!lightMode || !isLuyeWire) {
    ctx.shadowBlur = 0;
    ctx.strokeStyle = isLuyeWire ? "rgba(255, 250, 204, 0.86)" : "rgba(255, 245, 232, 0.72)";
    ctx.lineWidth = isLuyeWire ? 0.9 : 1;
    const offset = isLuyeWire ? 1.25 : 1.7;
    ctx.beginPath();
    ctx.moveTo(startX + normalX * offset, startY + normalY * offset);
    if (isLuyeWire) {
      ctx.bezierCurveTo(
        control1X + normalX * offset,
        control1Y + normalY * offset,
        control2X + normalX * offset,
        control2Y + normalY * offset,
        rebar.x + normalX * offset,
        rebar.y + normalY * offset,
      );
    } else {
      ctx.quadraticCurveTo(controlX + normalX * offset, controlY + normalY * offset, rebar.x + normalX * offset, rebar.y + normalY * offset);
    }
    ctx.stroke();
  }

  if (rebar.windupRemaining > 0) {
    const orbitProgress = 1 - rebar.windupRemaining / rebar.windupDuration;
    const visibleRadius = rebar.currentOrbitRadius || rebar.orbitRadius;
    ctx.shadowBlur = isLuyeWire ? (lightMode ? 3 : 9) : 10;
    ctx.strokeStyle = isLuyeWire ? "rgba(255, 209, 80, 0.58)" : "rgba(255, 120, 92, 0.34)";
    ctx.lineWidth = isLuyeWire ? (lightMode ? 2.2 : 2.8) : 2.4;
    ctx.beginPath();
    ctx.arc(rebar.windupCenterX, rebar.windupCenterY, visibleRadius, rebar.orbitStartAngle, rebar.orbitStartAngle + Math.PI * 2 * rebar.orbitTurns * orbitProgress);
    ctx.stroke();
  }

  ctx.translate(rebar.x, rebar.y);
  ctx.rotate(rebar.angle);
  if (isLuyeWire) {
    drawGoldenWireSpearHead(rebar, lightMode);
  } else {
    ctx.fillStyle = "#f4d5b6";
    ctx.strokeStyle = "rgba(255, 76, 76, 0.88)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(15, 0);
    ctx.lineTo(-7, -5);
    ctx.lineTo(-2, 0);
    ctx.lineTo(-7, 5);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  ctx.restore();
}

function drawGoldenWireSpearHead(rebar, lightMode = false) {
  const headLength = rebar.kind === "chase-wire" ? 31 : 27;
  const headWidth = rebar.kind === "chase-wire" ? 15 : 13;
  const socketLength = 12;
  const gradient = ctx.createLinearGradient(-socketLength, 0, headLength, 0);
  gradient.addColorStop(0, "#8b5f16");
  gradient.addColorStop(0.32, "#ffcf58");
  gradient.addColorStop(0.68, "#fff0a6");
  gradient.addColorStop(1, "#f0a91f");

  ctx.shadowColor = rebar.glow || "rgba(255, 205, 70, 0.8)";
  ctx.shadowBlur = lightMode ? 4 : 9;
  ctx.fillStyle = gradient;
  ctx.strokeStyle = "rgba(255, 247, 185, 0.92)";
  ctx.lineWidth = 1.1;
  ctx.beginPath();
  ctx.moveTo(headLength, 0);
  ctx.lineTo(2, -headWidth * 0.48);
  ctx.lineTo(-socketLength, -headWidth * 0.26);
  ctx.lineTo(-4, 0);
  ctx.lineTo(-socketLength, headWidth * 0.26);
  ctx.lineTo(2, headWidth * 0.48);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.shadowBlur = 0;
  ctx.strokeStyle = "rgba(92, 54, 8, 0.7)";
  ctx.lineWidth = 1.3;
  ctx.beginPath();
  ctx.moveTo(-socketLength + 2, -headWidth * 0.34);
  ctx.lineTo(0, 0);
  ctx.lineTo(-socketLength + 2, headWidth * 0.34);
  ctx.stroke();

  ctx.strokeStyle = "rgba(255, 255, 218, 0.88)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(2, -headWidth * 0.28);
  ctx.lineTo(headLength * 0.78, -1.2);
  ctx.stroke();
}

function drawIceShards() {
  for (const shard of iceShards) {
    ctx.save();
    ctx.translate(shard.x, shard.y);
    ctx.rotate(shard.angle);
    ctx.fillStyle = "rgba(200, 245, 255, 0.9)";
    ctx.strokeStyle = "rgba(64, 148, 190, 0.9)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(shard.length / 2, 0);
    ctx.lineTo(-shard.length / 2, -7);
    ctx.lineTo(-shard.length / 3, 0);
    ctx.lineTo(-shard.length / 2, 7);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}

function drawEarthDragons() {
  for (const pillar of earthDragons) {
    const rect = getEarthPillarRect(pillar);
    const fade = Math.min(1, pillar.life / 0.35);
    const horizontal = pillar.edge === "left" || pillar.edge === "right";
    const length = horizontal ? rect.width : rect.height;
    const thickness = horizontal ? rect.height : rect.width;

    ctx.save();
    ctx.globalAlpha = fade;

    const gradient = horizontal
      ? ctx.createLinearGradient(rect.x, rect.y, rect.x + rect.width, rect.y)
      : ctx.createLinearGradient(rect.x, rect.y, rect.x, rect.y + rect.height);
    gradient.addColorStop(0, "rgba(69, 47, 31, 0.98)");
    gradient.addColorStop(0.28, "rgba(122, 78, 42, 0.98)");
    gradient.addColorStop(0.62, "rgba(170, 105, 52, 0.96)");
    gradient.addColorStop(1, "rgba(209, 154, 78, 0.94)");
    ctx.fillStyle = gradient;
    ctx.strokeStyle = "rgba(46, 32, 22, 0.98)";
    ctx.lineWidth = 3.4;

    ctx.beginPath();
    if (pillar.edge === "top") {
      drawJaggedPillarPath(rect.x, rect.y, rect.width, rect.height, 0, 1);
    } else if (pillar.edge === "bottom") {
      drawJaggedPillarPath(rect.x, rect.y, rect.width, rect.height, 0, -1);
    } else if (pillar.edge === "left") {
      drawJaggedPillarPath(rect.x, rect.y, rect.width, rect.height, 1, 0);
    } else {
      drawJaggedPillarPath(rect.x, rect.y, rect.width, rect.height, -1, 0);
    }
    ctx.fill();
    ctx.stroke();

    if (imageReady(visualImages.rockTexture)) {
      const texture = ctx.createPattern(visualImages.rockTexture, "repeat");
      if (texture) {
        ctx.save();
        ctx.beginPath();
        if (pillar.edge === "top") {
          drawJaggedPillarPath(rect.x, rect.y, rect.width, rect.height, 0, 1);
        } else if (pillar.edge === "bottom") {
          drawJaggedPillarPath(rect.x, rect.y, rect.width, rect.height, 0, -1);
        } else if (pillar.edge === "left") {
          drawJaggedPillarPath(rect.x, rect.y, rect.width, rect.height, 1, 0);
        } else {
          drawJaggedPillarPath(rect.x, rect.y, rect.width, rect.height, -1, 0);
        }
        ctx.clip();
        ctx.globalAlpha = fade * 0.62;
        ctx.fillStyle = texture;
        ctx.translate(rect.x, rect.y);
        ctx.scale(0.16, 0.16);
        ctx.fillRect(0, 0, rect.width / 0.16, rect.height / 0.16);
        ctx.globalCompositeOperation = "multiply";
        ctx.globalAlpha = fade * 0.42;
        ctx.fillStyle = "rgba(166, 99, 43, 0.92)";
        ctx.fillRect(0, 0, rect.width / 0.16, rect.height / 0.16);
        ctx.restore();
      }
    }

    ctx.save();
    ctx.beginPath();
    if (pillar.edge === "top") {
      drawJaggedPillarPath(rect.x, rect.y, rect.width, rect.height, 0, 1);
    } else if (pillar.edge === "bottom") {
      drawJaggedPillarPath(rect.x, rect.y, rect.width, rect.height, 0, -1);
    } else if (pillar.edge === "left") {
      drawJaggedPillarPath(rect.x, rect.y, rect.width, rect.height, 1, 0);
    } else {
      drawJaggedPillarPath(rect.x, rect.y, rect.width, rect.height, -1, 0);
    }
    ctx.clip();

    ctx.strokeStyle = "rgba(242, 187, 96, 0.22)";
    ctx.lineWidth = 2;
    const layerCount = Math.max(3, Math.floor(length / 54));
    for (let i = 1; i <= layerCount; i += 1) {
      const t = i / (layerCount + 1);
      ctx.beginPath();
      if (horizontal) {
        const x1 = rect.x + length * 0.08;
        const x2 = rect.x + length * 0.93;
        const y = rect.y + thickness * (0.28 + (i % 3) * 0.16);
        ctx.moveTo(x1, y + Math.sin(pillar.age * 2 + i) * 2);
        ctx.quadraticCurveTo(rect.x + length * 0.5, y + Math.sin(i * 1.6) * 7, x2, y + Math.cos(i * 1.2) * 4);
      } else {
        const y1 = rect.y + length * 0.08;
        const y2 = rect.y + length * 0.93;
        const x = rect.x + thickness * (0.28 + (i % 3) * 0.16);
        ctx.moveTo(x + Math.sin(pillar.age * 2 + i) * 2, y1);
        ctx.quadraticCurveTo(x + Math.sin(i * 1.6) * 7, rect.y + length * 0.5, x + Math.cos(i * 1.2) * 4, y2);
      }
      ctx.stroke();
    }

    ctx.strokeStyle = "rgba(34, 24, 18, 0.46)";
    ctx.lineWidth = 2.2;
    const crackCount = Math.max(3, Math.floor(length / 70));
    for (let i = 0; i < crackCount; i += 1) {
      const t = (i + 0.45) / crackCount;
      ctx.beginPath();
      if (horizontal) {
        const x = rect.x + length * t;
        const y = rect.y + thickness * (0.32 + (i % 3) * 0.18);
        ctx.moveTo(x, y);
        ctx.lineTo(x + 15, y + (i % 2 ? -9 : 9));
        ctx.lineTo(x + 28, y + (i % 2 ? -3 : 3));
      } else {
        const x = rect.x + thickness * (0.32 + (i % 3) * 0.18);
        const y = rect.y + length * t;
        ctx.moveTo(x, y);
        ctx.lineTo(x + (i % 2 ? -9 : 9), y + 15);
        ctx.lineTo(x + (i % 2 ? -3 : 3), y + 28);
      }
      ctx.stroke();
    }

    ctx.restore();
    ctx.restore();
  }
}

function drawZhiqingScatterRocks() {
  for (const item of zhiqingScatterRocks) {
    if (item.kind === "cluster") {
      const progress = clamp(item.age / item.gatherDuration, 0, 1);
      const eased = easeOutCubic(progress);
      for (const pebble of item.origins) {
        const swirl = pebble.seed + elapsed * (3.4 + (pebble.radius % 2));
        const wobble = Math.sin(elapsed * 8 + pebble.seed) * 7 * (1 - eased);
        const x = pebble.x + (item.x - pebble.x) * eased + Math.cos(swirl) * wobble;
        const y = pebble.y + (item.y - pebble.y) * eased + Math.sin(swirl) * wobble;
        drawQidaoStoneAt(x, y, pebble.radius + eased * 2.8, pebble.seed + elapsed * 2.2, 0.76);
      }
      ctx.save();
      ctx.globalAlpha = 0.22 + progress * 0.42;
      ctx.strokeStyle = "rgba(214, 162, 96, 0.88)";
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.arc(item.x, item.y, 18 + progress * 25, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
      continue;
    }

    if (item.kind === "burst") {
      const progress = clamp(item.age / item.duration, 0, 1);
      const pulse = 0.55 + Math.sin(elapsed * 18) * 0.12;
      for (const pebble of item.origins) {
        const gather = easeOutCubic(clamp(item.age / 0.36, 0, 1));
        const orbit = pebble.angle + elapsed * (2.8 + (pebble.radius % 2) * 0.8) + pebble.seed * 0.12;
        const distance = pebble.distance * (1 - gather * 0.46) + Math.sin(elapsed * 7 + pebble.seed) * 5;
        const x = item.x + Math.cos(orbit) * distance;
        const y = item.y + Math.sin(orbit) * distance * 0.74;
        drawQidaoStoneAt(x, y, pebble.radius + pulse * 2.2, pebble.seed + elapsed * 2.6, 0.68);
      }
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = 0.18 + (1 - progress) * 0.22;
      ctx.strokeStyle = "rgba(214, 162, 96, 0.86)";
      ctx.lineWidth = 3.2;
      ctx.beginPath();
      ctx.arc(item.x, item.y, 42 + Math.sin(elapsed * 14) * 5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 0.22;
      ctx.fillStyle = "rgba(130, 82, 44, 0.8)";
      ctx.beginPath();
      ctx.arc(item.x, item.y, 28 + pulse * 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      continue;
    }

    ctx.save();
    ctx.translate(item.x, item.y);
    ctx.rotate(item.angle);
    drawQidaoStoneAt(0, 0, item.radius, item.angle * 0.35, 0.98);
    ctx.restore();
  }
}

function drawJaggedPillarPath(x, y, width, height, dirX, dirY) {
  ctx.rect(x, y, width, height);
  ctx.closePath();
}

function drawTrees() {
  for (const tree of trees) {
    const progress = tree.age / tree.duration;
    const grow = easeOutCubic(clamp(tree.age / 0.45, 0, 1));
    const currentHeight = tree.height * grow;
    const baseY = tree.y + tree.height;
    const topY = baseY - currentHeight;
    const centerX = tree.x + tree.width / 2;
    const fade = Math.min(1, (1 - progress) * 2.2);

    ctx.save();
    ctx.globalAlpha = fade;

    if (imageReady(visualImages.vine)) {
      const sway = Math.sin(elapsed * 2.8 + centerX * 0.02) * tree.width * 0.035;
      const drawWidth = tree.width * 1.22;
      const drawHeight = tree.height * 1.1;
      const vineSprite = getVineClusterSprite(drawWidth, drawHeight);

      const glow = ctx.createRadialGradient(centerX, baseY - 8, 3, centerX, baseY - 8, tree.width * 0.8);
      glow.addColorStop(0, "rgba(88, 184, 83, 0.35)");
      glow.addColorStop(1, "rgba(19, 67, 36, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.ellipse(centerX, baseY, tree.width * 0.66, 18, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.save();
      ctx.beginPath();
      ctx.rect(tree.x - tree.width * 0.12, baseY - currentHeight, tree.width * 1.24, currentHeight + 12);
      ctx.clip();
      ctx.translate(centerX + sway, baseY);
      ctx.scale(1, -1);
      ctx.globalAlpha = fade;
      ctx.drawImage(vineSprite, -vineSprite.width / 2, 0);
      ctx.restore();
      ctx.restore();
      continue;
    }

    if (imageReady(visualImages.tree)) {
      const drawWidth = tree.width * 1.55;
      const drawHeight = tree.height * 1.08;
      const drawX = centerX - drawWidth / 2;
      const drawY = baseY - drawHeight;

      const shadow = ctx.createRadialGradient(centerX, baseY, 2, centerX, baseY, tree.width * 0.86);
      shadow.addColorStop(0, "rgba(24, 65, 35, 0.36)");
      shadow.addColorStop(1, "rgba(24, 65, 35, 0)");
      ctx.fillStyle = shadow;
      ctx.beginPath();
      ctx.ellipse(centerX, baseY, tree.width * 0.8, 15, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.save();
      ctx.beginPath();
      ctx.rect(drawX - 8, baseY - currentHeight, drawWidth + 16, currentHeight + 12);
      ctx.clip();
      ctx.shadowColor = "rgba(57, 120, 58, 0.35)";
      ctx.shadowBlur = 10;
      ctx.drawImage(visualImages.tree, drawX, drawY, drawWidth, drawHeight);
      ctx.restore();
      ctx.restore();
      continue;
    }

    const shadow = ctx.createRadialGradient(centerX, baseY, 2, centerX, baseY, tree.width * 0.74);
    shadow.addColorStop(0, "rgba(27, 72, 41, 0.42)");
    shadow.addColorStop(1, "rgba(27, 72, 41, 0)");
    ctx.fillStyle = shadow;
    ctx.beginPath();
    ctx.ellipse(centerX, baseY, tree.width * 0.68, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(76, 130, 71, 0.4)";
    ctx.lineWidth = 2;
    for (let root = -2; root <= 2; root += 1) {
      const startX = centerX + root * tree.width * 0.08;
      const endX = centerX + root * tree.width * 0.22;
      ctx.beginPath();
      ctx.moveTo(startX, baseY - 2);
      ctx.quadraticCurveTo((startX + endX) / 2, baseY + 7, endX, baseY + 1);
      ctx.stroke();
    }

    const trunkWidth = tree.width * 0.18;
    const trunkGradient = ctx.createLinearGradient(centerX - trunkWidth, 0, centerX + trunkWidth, 0);
    trunkGradient.addColorStop(0, "#4c3021");
    trunkGradient.addColorStop(0.45, "#7a5435");
    trunkGradient.addColorStop(1, "#2f2118");
    ctx.fillStyle = trunkGradient;
    ctx.beginPath();
    ctx.moveTo(centerX - trunkWidth * 0.55, baseY);
    ctx.bezierCurveTo(centerX - trunkWidth * 0.42, topY + currentHeight * 0.6, centerX - trunkWidth, topY + currentHeight * 0.22, centerX - trunkWidth * 0.22, topY + currentHeight * 0.08);
    ctx.bezierCurveTo(centerX + trunkWidth * 0.68, topY + currentHeight * 0.22, centerX + trunkWidth * 0.42, topY + currentHeight * 0.66, centerX + trunkWidth * 0.58, baseY);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = "rgba(38, 24, 16, 0.32)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX - trunkWidth * 0.15, baseY - currentHeight * 0.02);
    ctx.bezierCurveTo(centerX - trunkWidth * 0.32, topY + currentHeight * 0.56, centerX + trunkWidth * 0.2, topY + currentHeight * 0.34, centerX + trunkWidth * 0.1, topY + currentHeight * 0.13);
    ctx.stroke();

    drawTreeBranch(centerX - trunkWidth * 0.15, topY + currentHeight * 0.42, -1, tree.width * 0.32, currentHeight * 0.15);
    drawTreeBranch(centerX + trunkWidth * 0.18, topY + currentHeight * 0.36, 1, tree.width * 0.28, currentHeight * 0.14);
    drawTreeBranch(centerX - trunkWidth * 0.05, topY + currentHeight * 0.25, -1, tree.width * 0.2, currentHeight * 0.11);
    drawTreeBranch(centerX + trunkWidth * 0.05, topY + currentHeight * 0.22, 1, tree.width * 0.22, currentHeight * 0.12);

    const canopyGradient = ctx.createLinearGradient(0, topY, 0, topY + currentHeight * 0.56);
    canopyGradient.addColorStop(0, "#8bcf76");
    canopyGradient.addColorStop(0.5, "#2f8650");
    canopyGradient.addColorStop(1, "#174a34");
    ctx.fillStyle = canopyGradient;
    for (let layer = 0; layer < 7; layer += 1) {
      const layerY = topY + currentHeight * (0.08 + layer * 0.07);
      const layerWidth = tree.width * (0.42 + layer * 0.08);
      const layerHeight = currentHeight * (0.09 + layer * 0.01);
      ctx.beginPath();
      ctx.ellipse(centerX + Math.sin(layer * 1.7) * tree.width * 0.05, layerY, layerWidth / 2, layerHeight, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = fade * 0.56;
    ctx.fillStyle = "#b7e68d";
    for (let leaf = 0; leaf < 18; leaf += 1) {
      const angle = leaf * 2.41;
      const distance = tree.width * (0.12 + (leaf % 5) * 0.07);
      const leafX = centerX + Math.cos(angle) * distance;
      const leafY = topY + currentHeight * (0.15 + (leaf % 7) * 0.045);
      ctx.beginPath();
      ctx.ellipse(leafX, leafY, 3.5, 6, angle, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}

function drawFengxiDomainLines() {
  for (const line of fengxiDomainLines) {
    const progress = clamp(line.age / 0.18, 0, 1);
    const fadeOut = clamp(line.life / 0.28, 0, 1);
    const alpha = Math.min(progress, fadeOut);
    const pulse = 0.75 + Math.sin(elapsed * 16 + line.pulseSeed) * 0.18;
    const startX = line.x - line.width / 2;
    const endX = line.x + line.width / 2;

    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = alpha;
    ctx.lineCap = "round";
    ctx.shadowColor = "rgba(169, 214, 255, 0.7)";
    ctx.shadowBlur = 12;
    ctx.strokeStyle = `rgba(178, 218, 255, ${0.64 + pulse * 0.18})`;
    ctx.lineWidth = line.thickness;
    ctx.beginPath();
    ctx.moveTo(startX, line.y);
    ctx.lineTo(endX, line.y);
    ctx.stroke();

    ctx.shadowBlur = 3;
    ctx.strokeStyle = "rgba(245, 252, 255, 0.82)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(startX + 10, line.y - 1);
    ctx.lineTo(endX - 10, line.y - 1);
    ctx.stroke();

    ctx.strokeStyle = "rgba(82, 101, 116, 0.58)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(startX + 8, line.y + line.thickness * 0.72);
    ctx.lineTo(endX - 8, line.y + line.thickness * 0.72);
    ctx.stroke();
    ctx.restore();
  }
}

function drawTreeBranch(x, y, direction, width, lift) {
  ctx.save();
  ctx.strokeStyle = "rgba(67, 43, 28, 0.68)";
  ctx.lineCap = "round";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x + direction * width * 0.25, y - lift * 0.35, x + direction * width * 0.72, y - lift * 0.72, x + direction * width, y - lift);
  ctx.stroke();

  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x + direction * width * 0.55, y - lift * 0.58);
  ctx.lineTo(x + direction * width * 0.8, y - lift * 1.06);
  ctx.stroke();
  ctx.restore();
}

function easeOutCubic(value) {
  return 1 - Math.pow(1 - value, 3);
}

function drawBlackHoles() {
  for (const hole of blackHoles) {
    const progress = hole.age / hole.duration;
    const pulse = 1 + Math.sin(elapsed * 10) * 0.05;
    const radius = hole.radius * pulse;
    const gradient = ctx.createRadialGradient(hole.x, hole.y, 4, hole.x, hole.y, radius);
    gradient.addColorStop(0, "#020206");
    gradient.addColorStop(0.48, "#090916");
    gradient.addColorStop(0.78, "rgba(78, 71, 181, 0.72)");
    gradient.addColorStop(1, "rgba(240, 196, 92, 0)");

    ctx.save();
    ctx.globalAlpha = 0.95;
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(hole.x, hole.y, radius, 0, Math.PI * 2);
    ctx.fill();

    if (imageReady(visualImages.blackHoleReal)) {
      const imageSize = radius * 2.65 * (1 + Math.sin(elapsed * 3.1) * 0.025);
      ctx.save();
      ctx.translate(hole.x, hole.y);
      ctx.beginPath();
      ctx.arc(0, 0, radius * 1.18, 0, Math.PI * 2);
      ctx.clip();
      ctx.rotate(elapsed * 0.18);
      ctx.globalCompositeOperation = "multiply";
      ctx.globalAlpha = 0.78;
      ctx.drawImage(visualImages.blackHoleReal, -imageSize / 2, -imageSize / 2, imageSize, imageSize);
      ctx.restore();
    }

    const edgeMask = ctx.createRadialGradient(hole.x, hole.y, radius * 0.68, hole.x, hole.y, radius * 1.28);
    edgeMask.addColorStop(0, "rgba(0, 0, 0, 0)");
    edgeMask.addColorStop(0.72, "rgba(0, 0, 0, 0.18)");
    edgeMask.addColorStop(1, "rgba(9, 11, 14, 0.88)");
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = edgeMask;
    ctx.beginPath();
    ctx.arc(hole.x, hole.y, radius * 1.3, 0, Math.PI * 2);
    ctx.fill();

    const voidGradient = ctx.createRadialGradient(hole.x, hole.y, 2, hole.x, hole.y, radius * 0.82);
    voidGradient.addColorStop(0, "rgba(0, 0, 0, 0.98)");
    voidGradient.addColorStop(0.58, "rgba(0, 0, 8, 0.94)");
    voidGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = voidGradient;
    ctx.beginPath();
    ctx.arc(hole.x, hole.y, radius * 0.86, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = `rgba(240, 196, 92, ${0.45 + (1 - progress) * 0.3})`;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(hole.x, hole.y, radius * 0.76, elapsed * 1.6, Math.PI * 1.55 + elapsed * 1.6);
    ctx.stroke();

    const owner = fighters.find((fighter) => fighter.id === hole.ownerId);
    if (owner?.role === "infinite" && roleImages.infinite.complete) {
      ctx.save();
      ctx.globalAlpha = 0.18;
      ctx.beginPath();
      ctx.arc(hole.x, hole.y, owner.radius * 0.62, 0, Math.PI * 2);
      ctx.clip();
      const size = owner.radius * 2.1;
      ctx.drawImage(roleImages.infinite, hole.x - size * 0.52, hole.y - size * 0.5, size * 1.28, size);
      ctx.restore();

      ctx.globalAlpha = 0.75;
      ctx.strokeStyle = "rgba(240, 196, 92, 0.72)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(hole.x, hole.y, owner.radius * 0.62, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }
}

function drawDamageTexts() {
  for (const item of damageTexts) {
    const progress = item.age / item.life;
    ctx.save();
    ctx.globalAlpha = 1 - progress;
    ctx.font = "900 22px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgba(25, 8, 8, 0.78)";
    ctx.fillStyle = item.color;
    ctx.strokeText(item.text, item.x, item.y);
    ctx.fillText(item.text, item.x, item.y);
    ctx.restore();
  }
}

function drawUltimateEffects() {
  for (const effect of ultimateEffects) {
    const progress = effect.age / effect.life;
    if (effect.type === "fengxiDomainIntro") {
      ctx.save();
      const reveal = easeOutCubic(clamp(progress / 0.72, 0, 1));
      const fade = 1 - easeOutCubic(clamp((progress - 0.48) / 0.52, 0, 1));
      const maxRadius = Math.hypot(arena.width, arena.height);
      const radius = 24 + reveal * maxRadius;
      ctx.globalCompositeOperation = "lighter";
      const glow = ctx.createRadialGradient(effect.x, effect.y, 2, effect.x, effect.y, radius);
      glow.addColorStop(0, `rgba(255, 255, 255, ${0.76 * fade})`);
      glow.addColorStop(0.18, `rgba(245, 252, 255, ${0.42 * fade})`);
      glow.addColorStop(0.46, `rgba(214, 236, 255, ${0.18 * fade})`);
      glow.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(effect.x, effect.y, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 0.28 * fade;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, arena.width, arena.height);

      ctx.globalAlpha = fade;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "900 48px Inter, system-ui, sans-serif";
      ctx.lineWidth = 7;
      ctx.strokeStyle = "rgba(38, 55, 62, 0.62)";
      ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
      ctx.strokeText("领域", arena.width / 2, arena.height * 0.42);
      ctx.fillText("领域", arena.width / 2, arena.height * 0.42);

      ctx.globalAlpha = 0.86 * fade;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(effect.x, effect.y, radius * 0.22, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
      continue;
    }

    if (effect.type === "danjinIntro") {
      drawDanjinIntroEffect(effect, progress);
      continue;
    }

    if (effect.type === "danjinBreak") {
      drawDanjinBreakEffect(effect, progress);
      continue;
    }

    if (effect.type === "fengxiDomainDefeat") {
      drawFengxiDomainDefeatEffect(effect, progress);
      continue;
    }

    if (effect.type === "zhiqingEarthBurst") {
      ctx.save();
      const burst = Math.sin(Math.min(1, progress * 1.2) * Math.PI);
      const fade = 1 - easeOutCubic(progress);
      ctx.globalAlpha = 0.18 * fade;
      ctx.fillStyle = "#2a1b12";
      ctx.fillRect(0, 0, arena.width, arena.height);
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < 3; i += 1) {
        ctx.globalAlpha = (0.5 - i * 0.11) * fade;
        ctx.strokeStyle = i === 0 ? "rgba(241, 188, 112, 0.92)" : "rgba(152, 99, 56, 0.72)";
        ctx.lineWidth = 7 - i * 1.6;
        ctx.beginPath();
        ctx.arc(effect.x, effect.y, 38 + progress * (150 + i * 55), progress * 0.7 + i, Math.PI * 1.75 + progress * 0.7 + i);
        ctx.stroke();
      }
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = fade;
      ctx.font = "900 36px Inter, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.lineWidth = 6;
      ctx.strokeStyle = "rgba(59, 35, 20, 0.88)";
      ctx.fillStyle = "rgba(246, 202, 129, 0.96)";
      ctx.strokeText("土暴", effect.x, effect.y - 66 - burst * 10);
      ctx.fillText("土暴", effect.x, effect.y - 66 - burst * 10);
      ctx.restore();
      continue;
    }

    if (effect.type === "mingwangRevive") {
      ctx.save();
      const pulse = Math.sin(Math.min(1, progress * 1.28) * Math.PI);
      const fade = 1 - easeOutCubic(progress);
      ctx.globalAlpha = 0.14 * fade;
      ctx.fillStyle = "#2a0608";
      ctx.fillRect(0, 0, arena.width, arena.height);

      ctx.globalCompositeOperation = "lighter";
      const glow = ctx.createRadialGradient(effect.x, effect.y, 4, effect.x, effect.y, 210 + progress * 180);
      glow.addColorStop(0, `rgba(255, 238, 230, ${0.62 * fade})`);
      glow.addColorStop(0.3, `rgba(255, 72, 82, ${0.42 * fade})`);
      glow.addColorStop(1, "rgba(255, 72, 82, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(effect.x, effect.y, 210 + progress * 180, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(255, 178, 178, 0.9)";
      ctx.lineWidth = 6;
      ctx.globalAlpha = 0.78 * fade;
      for (let i = 0; i < 2; i += 1) {
        ctx.beginPath();
        ctx.arc(effect.x, effect.y, 48 + progress * (150 + i * 52), 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = fade;
      ctx.font = "900 38px Inter, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.lineWidth = 6;
      ctx.strokeStyle = "rgba(72, 18, 22, 0.88)";
      ctx.fillStyle = "rgba(255, 210, 204, 0.98)";
      ctx.strokeText("复生", effect.x, effect.y - 70 - pulse * 12);
      ctx.fillText("复生", effect.x, effect.y - 70 - pulse * 12);
      ctx.restore();
      continue;
    }

    if (effect.type === "scythe") {
      ctx.save();
      const pulse = Math.sin(Math.PI * progress);
      ctx.globalAlpha = (1 - progress) * 0.16;
      ctx.fillStyle = "#d9d4e8";
      ctx.fillRect(0, 0, arena.width, arena.height);

      const sweepX = -arena.width * 0.28 + progress * arena.width * 1.56;
      const sweepY = arena.height * (0.68 - progress * 0.24);
      ctx.save();
      ctx.translate(sweepX, sweepY);
      ctx.rotate(-0.88 + progress * 0.16);
      ctx.scale(5.2, 5.2);
      ctx.globalAlpha = pulse * 0.5;
      drawScytheSilhouette();
      ctx.restore();

      ctx.save();
      ctx.globalAlpha = pulse * 0.34;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.86)";
      ctx.lineWidth = 12;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(sweepX - 260, sweepY + 70);
      ctx.quadraticCurveTo(sweepX - 40, sweepY - 100, sweepX + 310, sweepY - 40);
      ctx.stroke();
      ctx.strokeStyle = "rgba(38, 32, 48, 0.48)";
      ctx.lineWidth = 22;
      ctx.beginPath();
      ctx.moveTo(sweepX - 310, sweepY + 94);
      ctx.quadraticCurveTo(sweepX - 70, sweepY - 118, sweepX + 350, sweepY - 48);
      ctx.stroke();
      ctx.restore();

      ctx.globalAlpha = (1 - progress) * 0.8;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.88)";
      ctx.lineWidth = 5 * (1 - progress) + 1;
      for (let i = 0; i < 2; i += 1) {
        const radius = 90 + progress * 420 + i * 42;
        ctx.beginPath();
        ctx.arc(arena.width / 2, arena.height / 2, radius, -0.4 + i * 0.3, Math.PI * 1.25 + i * 0.3);
        ctx.stroke();
      }

      ctx.globalAlpha = (1 - progress) * 0.72;
      ctx.strokeStyle = "rgba(38, 32, 48, 0.9)";
      ctx.lineWidth = 3;
      for (let i = 0; i < 4; i += 1) {
        const angle = i * (Math.PI * 2 / 8) + progress * 1.8;
        const x = arena.width / 2 + Math.cos(angle) * (70 + progress * 260);
        const y = arena.height / 2 + Math.sin(angle) * (70 + progress * 260);
        ctx.beginPath();
        ctx.moveTo(arena.width / 2, arena.height / 2);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
      ctx.restore();
      continue;
    }

    if (effect.type === "luye") {
      ctx.save();
      const burst = Math.sin(Math.min(1, progress * 1.25) * Math.PI);
      ctx.globalAlpha = (1 - progress * 0.38) * 0.52;
      ctx.fillStyle = "#060607";
      ctx.fillRect(0, 0, arena.width, arena.height);
      ctx.globalAlpha = (1 - progress * 0.52) * 0.2;
      ctx.fillStyle = "#6d080d";
      ctx.fillRect(0, 0, arena.width, arena.height);

      const pulseRadius = 90 + progress * 250;
      const pulse = ctx.createRadialGradient(effect.x, effect.y, 8, effect.x, effect.y, pulseRadius);
      pulse.addColorStop(0, "rgba(255, 90, 80, 0.38)");
      pulse.addColorStop(0.36, "rgba(130, 22, 26, 0.24)");
      pulse.addColorStop(1, "rgba(130, 22, 26, 0)");
      ctx.globalAlpha = (1 - progress) * 0.86;
      ctx.fillStyle = pulse;
      ctx.beginPath();
      ctx.arc(effect.x, effect.y, pulseRadius, 0, Math.PI * 2);
      ctx.fill();

      for (const point of effect.points || []) {
        const local = clamp((progress - point.delay) / (1 - point.delay), 0, 1);
        const eased = local * local * (3 - 2 * local);
        const x = point.x + (point.tx - point.x) * eased;
        const y = point.y + (point.ty - point.y) * eased;
        ctx.globalAlpha = (1 - local * 0.42) * (0.42 + burst * 0.34);
        ctx.fillStyle = "#ff5656";
        ctx.shadowColor = "rgba(255, 70, 70, 0.85)";
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(x, y, point.size * (1 + burst * 0.6), 0, Math.PI * 2);
        ctx.fill();
        if (local > 0.08) {
          ctx.strokeStyle = "rgba(255, 120, 98, 0.4)";
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(point.x + (point.tx - point.x) * Math.max(0, eased - 0.12), point.y + (point.ty - point.y) * Math.max(0, eased - 0.12));
          ctx.lineTo(x, y);
          ctx.stroke();
        }
      }

      ctx.shadowBlur = 0;
      ctx.globalAlpha = (1 - progress) * 0.86;
      ctx.strokeStyle = "rgba(255, 215, 190, 0.78)";
      ctx.lineWidth = 2.5;
      for (let i = 0; i < 3; i += 1) {
        ctx.beginPath();
        ctx.arc(effect.x, effect.y, 36 + progress * 110 + i * 24, progress * 2.3 + i, Math.PI * 1.35 + progress * 2.3 + i);
        ctx.stroke();
      }
      ctx.restore();
      continue;
    }

    if (effect.type === "qidao") {
      ctx.save();
      const appear = easeOutCubic(clamp(progress / 0.18, 0, 1));
      const burst = Math.sin(Math.min(1, progress * 1.18) * Math.PI);
      const fade = 1 - easeOutCubic(progress);
      ctx.globalAlpha = 0.28 * fade;
      ctx.fillStyle = "#180d08";
      ctx.fillRect(0, 0, arena.width, arena.height);
      ctx.globalAlpha = 0.16 * fade;
      ctx.fillStyle = "#fff0bd";
      ctx.fillRect(0, 0, arena.width, arena.height);

      const core = ctx.createRadialGradient(effect.x, effect.y, 4, effect.x, effect.y, 170 + progress * 220);
      core.addColorStop(0, `rgba(255, 255, 230, ${0.78 * fade})`);
      core.addColorStop(0.22, `rgba(255, 167, 52, ${0.56 * fade})`);
      core.addColorStop(0.58, `rgba(169, 82, 35, ${0.22 * fade})`);
      core.addColorStop(1, "rgba(97, 46, 24, 0)");
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(effect.x, effect.y, 170 + progress * 220, 0, Math.PI * 2);
      ctx.fill();

      const image = visualImages.qidaoExplosion;
      if (imageReady(image)) {
        const imageFade = appear * (1 - easeOutCubic(clamp((progress - 0.62) / 0.38, 0, 1)));
        const size = 210 + easeOutCubic(clamp(progress / 0.34, 0, 1)) * 250;
        ctx.save();
        ctx.translate(effect.x, effect.y);
        ctx.rotate(-0.08 + progress * 0.16);
        ctx.globalAlpha = 0.92 * imageFade;
        ctx.globalCompositeOperation = "lighter";
        ctx.drawImage(image, -size / 2, -size / 2, size, size);
        ctx.globalAlpha = 0.34 * imageFade;
        ctx.rotate(0.28);
        ctx.scale(0.82, 0.82);
        ctx.drawImage(image, -size / 2, -size / 2, size, size);
        ctx.restore();
      }

      ctx.globalAlpha = 0.86 * fade;
      ctx.lineCap = "round";
      for (let i = 0; i < 4; i += 1) {
        ctx.strokeStyle = i === 0 ? "rgba(255, 246, 190, 0.9)" : "rgba(255, 135, 42, 0.62)";
        ctx.lineWidth = 10 - i * 2;
        ctx.beginPath();
        ctx.arc(effect.x, effect.y, 42 + progress * (260 + i * 70), progress * 1.4 + i, Math.PI * 1.7 + progress * 1.4 + i);
        ctx.stroke();
      }

      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = "rgba(90, 45, 26, 0.8)";
      ctx.lineWidth = 2.4;
      for (let i = 0; i < 16; i += 1) {
        const angle = i * Math.PI * 2 / 16 + 0.12;
        const inner = 22 + burst * 20;
        const outer = 92 + progress * 210 + (i % 4) * 24;
        ctx.beginPath();
        ctx.moveTo(effect.x + Math.cos(angle) * inner, effect.y + Math.sin(angle) * inner);
        ctx.lineTo(effect.x + Math.cos(angle + Math.sin(i) * 0.08) * outer, effect.y + Math.sin(angle + Math.cos(i) * 0.08) * outer);
        ctx.stroke();
      }

      ctx.globalAlpha = fade;
      ctx.fillStyle = "rgba(255, 216, 102, 0.88)";
      ctx.font = "900 34px Inter, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.lineWidth = 5;
      ctx.strokeStyle = "rgba(75, 32, 18, 0.82)";
      ctx.strokeText("自爆", effect.x, effect.y - 64);
      ctx.fillText("自爆", effect.x, effect.y - 64);
      ctx.restore();
      continue;
    }

    if (effect.type === "ximuzi") {
      ctx.save();
      const burst = Math.sin(Math.min(1, progress * 1.35) * Math.PI);
      const fadeOut = 1 - easeOutCubic(clamp((progress - 0.68) / 0.32, 0, 1));
      ctx.globalAlpha = (0.22 + burst * 0.08) * fadeOut;
      ctx.fillStyle = "#120407";
      ctx.fillRect(0, 0, arena.width, arena.height);

      const centerX = arena.width / 2;
      const centerY = arena.height / 2 + 24;
      const aura = ctx.createRadialGradient(centerX, centerY, 30, centerX, centerY, 260);
      aura.addColorStop(0, `rgba(220, 35, 45, ${0.15 + burst * 0.12})`);
      aura.addColorStop(0.44, "rgba(126, 8, 18, 0.13)");
      aura.addColorStop(1, "rgba(126, 8, 18, 0)");
      ctx.globalAlpha = (1 - progress * 0.44) * fadeOut;
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 260, 0, Math.PI * 2);
      ctx.fill();

      drawNineTailFoxProjection(centerX, centerY, progress, burst);

      ctx.globalAlpha = (1 - progress) * 0.48 * fadeOut;
      ctx.strokeStyle = "rgba(255, 138, 104, 0.62)";
      ctx.lineWidth = 3;
      for (let i = 0; i < 3; i += 1) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, 92 + progress * 145 + i * 28, progress * 2.1 + i, progress * 2.1 + i + Math.PI * 1.35);
        ctx.stroke();
      }
      ctx.restore();
      continue;
    }

    if (effect.type === "iceAge") {
      ctx.save();
      const appear = easeOutCubic(clamp(progress / 0.18, 0, 1));
      const fadeOut = 1 - easeOutCubic(clamp((progress - 0.76) / 0.24, 0, 1));
      const alpha = appear * fadeOut;
      const pulse = Math.sin(Math.min(1, progress * 1.35) * Math.PI);

      ctx.globalAlpha = 0.22 * alpha;
      ctx.fillStyle = "#dff8ff";
      ctx.fillRect(0, 0, arena.width, arena.height);
      ctx.globalAlpha = (0.28 + pulse * 0.08) * alpha;
      ctx.fillStyle = "#7fdcff";
      ctx.fillRect(0, 0, arena.width, arena.height);

      const centerGlow = ctx.createRadialGradient(arena.width / 2, arena.height / 2, 26, arena.width / 2, arena.height / 2, arena.width * 0.68);
      centerGlow.addColorStop(0, `rgba(255, 255, 255, ${0.34 * alpha})`);
      centerGlow.addColorStop(0.42, `rgba(140, 230, 255, ${0.18 * alpha})`);
      centerGlow.addColorStop(1, "rgba(140, 230, 255, 0)");
      ctx.globalAlpha = 1;
      ctx.fillStyle = centerGlow;
      ctx.beginPath();
      ctx.arc(arena.width / 2, arena.height / 2, arena.width * 0.68, 0, Math.PI * 2);
      ctx.fill();

      if (imageReady(visualImages.iceBorder)) {
        const image = visualImages.iceBorder;
        const ratio = image.naturalHeight / image.naturalWidth;
        const width = Math.min(arena.width * 0.46, 430) * (1 + pulse * 0.025);
        const height = width * ratio;
        ctx.globalAlpha = 0.62 * alpha;
        const placements = [
          [0, 0, 0, 1, 1],
          [arena.width, 0, 0, -1, 1],
          [0, arena.height, 0, 1, -1],
          [arena.width, arena.height, 0, -1, -1],
        ];
        for (const [x, y, rotate, sx, sy] of placements) {
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(rotate);
          ctx.scale(sx, sy);
          ctx.drawImage(image, -width * 0.08, -height * 0.08, width, height);
          ctx.restore();
        }
      }

      ctx.globalAlpha = 0.5 * alpha;
      ctx.strokeStyle = "rgba(229, 252, 255, 0.82)";
      ctx.lineWidth = 1.4;
      for (let i = 0; i < 8; i += 1) {
        const baseX = (i % 4) * (arena.width / 3) + Math.sin(i * 1.7) * 18;
        const baseY = i < 4 ? 24 + i * 10 : arena.height - 36 - (i - 4) * 12;
        const length = 90 + (i % 3) * 34;
        const angle = (i < 4 ? 0.78 : -0.78) + Math.sin(progress * 3 + i) * 0.08;
        ctx.beginPath();
        ctx.moveTo(baseX, baseY);
        ctx.lineTo(baseX + Math.cos(angle) * length, baseY + Math.sin(angle) * length);
        ctx.lineTo(baseX + Math.cos(angle + 0.72) * length * 0.42, baseY + Math.sin(angle + 0.72) * length * 0.42);
        ctx.stroke();
      }

      ctx.globalAlpha = 0.78 * alpha;
      ctx.font = "900 58px Inter, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.lineWidth = 9;
      ctx.strokeStyle = "rgba(17, 86, 120, 0.72)";
      ctx.fillStyle = "#f0fdff";
      ctx.shadowColor = "rgba(175, 242, 255, 0.95)";
      ctx.shadowBlur = 14;
      ctx.strokeText("冰", arena.width / 2, arena.height / 2);
      ctx.fillText("冰", arena.width / 2, arena.height / 2);
      ctx.restore();
      continue;
    }

    if (effect.type !== "seal") continue;

    ctx.save();
    const burst = Math.sin(Math.min(1, progress * 2.4) * Math.PI);
    const sealX = effect.x ?? arena.width / 2;
    const sealY = effect.y ?? arena.height / 2;
    if (progress < 0.52) {
      const flashProgress = progress / 0.52;
      const flashAlpha = Math.pow(1 - flashProgress, 1.35);
      ctx.globalAlpha = flashAlpha * 0.96;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, arena.width, arena.height);
      const flashRadius = 90 + flashProgress * 560;
      const flashGlow = ctx.createRadialGradient(sealX, sealY, 8, sealX, sealY, flashRadius);
      flashGlow.addColorStop(0, `rgba(255, 255, 255, ${0.92 * flashAlpha})`);
      flashGlow.addColorStop(0.34, `rgba(230, 255, 226, ${0.62 * flashAlpha})`);
      flashGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.globalAlpha = 1;
      ctx.fillStyle = flashGlow;
      ctx.beginPath();
      ctx.arc(sealX, sealY, flashRadius, 0, Math.PI * 2);
      ctx.fill();
    }
    const domainRadius = 96 + progress * 112;
    const domainGlow = ctx.createRadialGradient(sealX, sealY, 26, sealX, sealY, domainRadius);
    domainGlow.addColorStop(0, "rgba(75, 179, 85, 0.4)");
    domainGlow.addColorStop(0.44, "rgba(13, 43, 25, 0.56)");
    domainGlow.addColorStop(1, "rgba(4, 18, 12, 0)");
    ctx.globalAlpha = (1 - progress * 0.58) * (0.76 + burst * 0.2);
    ctx.fillStyle = domainGlow;
    ctx.beginPath();
    ctx.arc(sealX, sealY, domainRadius, 0, Math.PI * 2);
    ctx.fill();

    if (imageReady(visualImages.vine)) {
      const vineHeight = 124 + progress * 82;
      const vineWidth = vineHeight * 0.66;
      const maxVineHeight = Math.min(210, arena.height * 0.34);
      const maxVineWidth = maxVineHeight * 0.66;
      const vineSprite = getScaledVisualSprite(visualImages.vine, "seal-vine", maxVineWidth, maxVineHeight);
      ctx.globalAlpha = (1 - progress) * (0.48 + burst * 0.2);
      ctx.save();
      ctx.translate(sealX - domainRadius * 0.54, sealY + domainRadius * 0.68);
      ctx.scale(1, -1);
      ctx.drawImage(vineSprite, -vineWidth * 0.42, 0, vineWidth, vineHeight);
      ctx.restore();
      ctx.save();
      ctx.translate(sealX + domainRadius * 0.54, sealY + domainRadius * 0.68);
      ctx.scale(-1, -1);
      ctx.drawImage(vineSprite, -vineWidth * 0.42, 0, vineWidth, vineHeight);
      ctx.restore();
    }

    const radius = 76 + progress * 142;
    if (imageReady(visualImages.sealCircle)) {
      const fieldWidth = Math.min(330, 172 + progress * 158);
      const fieldHeight = fieldWidth * (visualImages.sealCircle.naturalHeight / visualImages.sealCircle.naturalWidth);
      const maxFieldWidth = Math.min(330, arena.width * 0.42);
      const maxFieldHeight = maxFieldWidth * (visualImages.sealCircle.naturalHeight / visualImages.sealCircle.naturalWidth);
      const sealSprite = getScaledVisualSprite(
        visualImages.sealCircle,
        "seal-energy-green",
        maxFieldWidth,
        maxFieldHeight,
        "hue-rotate(78deg) saturate(1.2) brightness(1.18)",
      );
      ctx.save();
      ctx.translate(sealX, sealY);
      ctx.rotate(progress * 0.42 - 0.16);
      ctx.globalAlpha = (1 - progress * 0.48) * (0.45 + burst * 0.48);
      ctx.drawImage(sealSprite, -fieldWidth / 2, -fieldHeight / 2, fieldWidth, fieldHeight);
      ctx.restore();
    }

    ctx.globalAlpha = (1 - progress) * 0.88;
    ctx.strokeStyle = "rgba(130, 255, 132, 0.92)";
    ctx.lineWidth = 7 * (1 - progress) + 1;
    ctx.beginPath();
    ctx.arc(sealX, sealY, radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.globalAlpha = (1 - progress) * 0.42;
    ctx.strokeStyle = "rgba(118, 255, 118, 0.8)";
    ctx.lineWidth = 2.5;
    for (let i = 0; i < 3; i += 1) {
      const orbitRadius = 94 + progress * 126 + i * 14;
      ctx.beginPath();
      ctx.arc(sealX, sealY, orbitRadius, progress * 1.8 + i * 1.2, progress * 1.8 + i * 1.2 + Math.PI * 1.36);
      ctx.stroke();
    }

    ctx.globalAlpha = (1 - progress) * 0.96;
    ctx.font = "900 76px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineWidth = 11;
    ctx.strokeStyle = "rgba(2, 26, 12, 0.88)";
    ctx.fillStyle = "#e9ffe5";
    ctx.shadowColor = "rgba(106, 255, 112, 0.94)";
    ctx.shadowBlur = 18;
    ctx.strokeText("封", sealX, sealY);
    ctx.fillText("封", sealX, sealY);
    ctx.restore();
  }
}

function drawFengxiDomainDefeatEffect(effect, progress) {
  const growth = effect.growth;
  if (!growth) return;
  const fadeIn = clamp(progress / 0.14, 0, 1);
  const fadeOut = 1 - easeOutCubic(clamp((progress - 0.9) / 0.1, 0, 1));
  const alpha = fadeIn * fadeOut;

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "rgba(9, 34, 21, 0.26)";
  ctx.fillRect(0, 0, arena.width, arena.height);
  drawFengxiDefeatTreeSprites(growth.trees, progress, alpha);
  drawFengxiDefeatVineSprites(growth.vines, progress, alpha);
  ctx.restore();
}

function drawDanjinIntroEffect(effect, progress) {
  const appear = easeOutCubic(clamp(progress / 0.2, 0, 1));
  const fade = 1 - easeOutCubic(clamp((progress - 0.62) / 0.38, 0, 1));
  const alpha = appear * fade;
  const circleSize = Math.min(arena.width, arena.height) * (0.58 + easeOutCubic(clamp(progress / 0.64, 0, 1)) * 0.18);
  const pulse = Math.sin(Math.min(1, progress * 1.3) * Math.PI);
  const circle = getDanjinMagicCircleSprite(620, "#fff0a4");

  ctx.save();
  ctx.globalAlpha = 0.14 * alpha;
  ctx.fillStyle = "#fff4b4";
  ctx.fillRect(0, 0, arena.width, arena.height);

  ctx.translate(effect.x, effect.y);
  ctx.globalCompositeOperation = "lighter";
  ctx.shadowColor = "rgba(255, 228, 92, 0.86)";
  ctx.shadowBlur = 10 + pulse * 8;
  if (circle) {
    ctx.save();
    ctx.rotate(progress * 0.72);
    ctx.globalAlpha = alpha * (0.72 + pulse * 0.2);
    ctx.drawImage(circle, -circleSize / 2, -circleSize / 2, circleSize, circleSize);
    ctx.restore();
    ctx.save();
    ctx.rotate(-progress * 0.5 + 0.18);
    ctx.globalAlpha = alpha * 0.34;
    ctx.drawImage(circle, -circleSize * 0.42, -circleSize * 0.42, circleSize * 0.84, circleSize * 0.84);
    ctx.restore();
  } else {
    ctx.strokeStyle = `rgba(255, 235, 128, ${0.58 * alpha})`;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, 0, circleSize * 0.43, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = alpha;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "900 54px Inter, system-ui, sans-serif";
  ctx.lineWidth = 8;
  ctx.strokeStyle = "rgba(55, 42, 16, 0.76)";
  ctx.fillStyle = "rgba(255, 248, 196, 0.96)";
  ctx.shadowColor = "rgba(255, 225, 95, 0.86)";
  ctx.shadowBlur = 16 + pulse * 8;
  ctx.strokeText("断金阵", 0, -8);
  ctx.fillText("断金阵", 0, -8);
  ctx.restore();
}

function drawDanjinBreakEffect(effect, progress) {
  const fade = 1 - easeOutCubic(progress);
  const circle = getDanjinMagicCircleSprite(620, "#fff0a4");
  const size = Math.min(arena.width, arena.height) * 0.74;
  ctx.save();
  ctx.translate(effect.x, effect.y);
  ctx.globalCompositeOperation = "lighter";
  ctx.shadowColor = "rgba(255, 228, 92, 0.9)";
  ctx.shadowBlur = 12;
  if (circle) {
    for (let i = 0; i < 9; i += 1) {
      const angle = i * Math.PI * 2 / 9;
      const spread = easeOutCubic(progress) * (42 + (i % 3) * 18);
      ctx.save();
      ctx.translate(Math.cos(angle) * spread, Math.sin(angle) * spread);
      ctx.rotate(progress * (i % 2 === 0 ? 0.46 : -0.38) + i * 0.03);
      ctx.globalAlpha = fade * (0.42 + (i % 2) * 0.12);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, size * 0.56, angle - 0.32, angle + 0.32);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(circle, -size / 2, -size / 2, size, size);
      ctx.restore();
    }
  }

  ctx.globalAlpha = 0.58 * fade;
  ctx.strokeStyle = "rgba(255, 245, 176, 0.95)";
  ctx.lineWidth = 3.2 * fade + 1;
  for (let i = 0; i < 8; i += 1) {
    const angle = i * Math.PI * 2 / 8 + 0.1;
    const inner = 34 + progress * 76;
    const outer = size * 0.42 + progress * 72;
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * inner, Math.sin(angle) * inner);
    ctx.lineTo(Math.cos(angle + Math.sin(i) * 0.08) * outer, Math.sin(angle + Math.cos(i) * 0.08) * outer);
    ctx.stroke();
  }

  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 0.9 * fade;
  ctx.font = "900 42px Inter, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineWidth = 7;
  ctx.strokeStyle = "rgba(58, 38, 14, 0.78)";
  ctx.fillStyle = "#fff6bd";
  ctx.strokeText("破阵", 0, -6);
  ctx.fillText("破阵", 0, -6);
  ctx.restore();
}

function drawFengxiDefeatTreeSprites(trees, progress, alpha) {
  const image = visualImages.tree;
  if (!imageReady(image)) return;
  const ratio = image.naturalHeight / image.naturalWidth;
  for (const tree of trees) {
    const local = easeOutCubic(clamp((progress - tree.delay) / 0.58, 0, 1));
    if (local <= 0) continue;
    const sway = Math.sin(elapsed * 1.5 + tree.seed) * 5;
    const drawWidth = tree.width * (0.94 + local * 0.08);
    const drawHeight = drawWidth * ratio;
    const bottom = arena.height + tree.bottomOffset;
    const drawX = tree.x - drawWidth / 2 + sway;
    const drawY = bottom - drawHeight;
    const revealHeight = drawHeight * local;

    ctx.save();
    ctx.globalAlpha = alpha * (0.64 + local * 0.28);
    ctx.beginPath();
    ctx.rect(drawX - 18, bottom - revealHeight, drawWidth + 36, revealHeight + 24);
    ctx.clip();
    ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
    ctx.restore();
  }
}

function drawFengxiDefeatVineSprites(vines, progress, alpha) {
  const image = visualImages.vine;
  if (!imageReady(image)) return;
  const ratio = image.naturalWidth / image.naturalHeight;
  for (const vine of vines) {
    const local = easeOutCubic(clamp((progress - vine.delay) / 0.64, 0, 1));
    if (local <= 0) continue;
    const drawHeight = vine.height * (0.92 + local * 0.08);
    const drawWidth = drawHeight * ratio;
    const drift = Math.sin(elapsed * 1.9 + vine.seed) * 6;
    const alphaBoost = vine.origin === "top" ? 0.72 : 0.86;

    ctx.save();
    ctx.globalAlpha = alpha * alphaBoost * (0.62 + local * 0.28);
    ctx.translate(vine.x + drift, vine.y);
    ctx.rotate(vine.angle);
    ctx.scale(vine.flipX ? -1 : 1, 1);
    if (vine.origin === "top") {
      const y = -drawHeight * (1 - local) - 10;
      ctx.drawImage(image, -drawWidth / 2, y, drawWidth, drawHeight);
    } else {
      ctx.beginPath();
      ctx.rect(-drawWidth / 2 - 8, -drawHeight * local, drawWidth + 16, drawHeight * local + 12);
      ctx.clip();
      ctx.drawImage(image, -drawWidth / 2, -drawHeight, drawWidth, drawHeight);
    }
    ctx.restore();
  }
}

function drawNineTailFoxProjection(x, y, progress, burst) {
  const image = visualImages.nineTailFox;
  if (!imageReady(image)) {
    ctx.save();
    ctx.globalAlpha = (1 - progress) * 0.78;
    ctx.font = "900 86px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineWidth = 10;
    ctx.strokeStyle = "rgba(54, 4, 10, 0.9)";
    ctx.fillStyle = "#ff7868";
    ctx.strokeText("梦", x, y);
    ctx.fillText("梦", x, y);
    ctx.restore();
    return;
  }

  const fadeOut = 1 - easeOutCubic(clamp((progress - 0.68) / 0.32, 0, 1));
  const grow = 0.46 + easeOutCubic(clamp(progress / 0.74, 0, 1)) * 0.62 + easeOutCubic(progress) * 0.16;
  const tinted = getTintedImage(image, "ximuzi-nine-tail-red:v5", "rgba(214, 24, 38, 0.5)") || image;
  const baseWidth = Math.min(arena.width * 0.68, 660);
  const ratio = image.naturalHeight / image.naturalWidth;
  const drawWidth = baseWidth * grow * (1 + burst * 0.025);
  const drawHeight = drawWidth * ratio;
  const drawX = x - drawWidth / 2;
  const drawY = y - drawHeight * 0.56;

  ctx.save();
  ctx.globalAlpha = (0.2 + burst * 0.05) * fadeOut;
  ctx.filter = "blur(8px)";
  ctx.shadowColor = "rgba(255, 44, 58, 0.88)";
  ctx.shadowBlur = 28;
  ctx.drawImage(tinted, drawX - drawWidth * 0.018, drawY - drawHeight * 0.018, drawWidth * 1.036, drawHeight * 1.036);
  ctx.filter = "none";
  ctx.globalAlpha = (0.32 + burst * 0.06) * fadeOut;
  ctx.shadowColor = "rgba(255, 44, 58, 0.92)";
  ctx.shadowBlur = 16;
  ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
  ctx.globalCompositeOperation = "lighter";
  ctx.globalAlpha = (0.08 + burst * 0.08) * fadeOut;
  ctx.drawImage(tinted, drawX, drawY, drawWidth, drawHeight);
  ctx.restore();
}

function drawScytheSilhouette() {
  if (imageReady(visualImages.scythe)) {
    ctx.save();
    ctx.rotate(Math.PI / 2);
    ctx.drawImage(visualImages.scythe, -16, -94, 32, 188);
    ctx.restore();
    return;
  }

  ctx.strokeStyle = "rgba(18, 14, 24, 0.95)";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-10, 42);
  ctx.lineTo(10, -42);
  ctx.stroke();

  const bladeGradient = ctx.createLinearGradient(-26, -48, 16, 46);
  bladeGradient.addColorStop(0, "rgba(8, 8, 12, 0.98)");
  bladeGradient.addColorStop(0.62, "rgba(40, 35, 50, 0.9)");
  bladeGradient.addColorStop(1, "rgba(6, 6, 9, 0.98)");
  ctx.fillStyle = bladeGradient;
  ctx.strokeStyle = "rgba(236, 230, 213, 0.55)";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(-2, -24);
  ctx.quadraticCurveTo(20, 8, 2, 70);
  ctx.quadraticCurveTo(-18, 30, -26, -18);
  ctx.quadraticCurveTo(-14, -28, -2, -24);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "rgba(14, 12, 18, 0.98)";
  ctx.strokeStyle = "rgba(218, 204, 150, 0.62)";
  ctx.beginPath();
  ctx.moveTo(-8, -26);
  ctx.lineTo(9, -19);
  ctx.lineTo(4, -8);
  ctx.lineTo(-11, -11);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function drawEffects() {
  for (const effect of effects) {
    const progress = effect.age / effect.life;
    ctx.save();
    ctx.globalAlpha = 1 - progress;
    ctx.strokeStyle = effect.color;
    ctx.lineWidth = 4 * (1 - progress);
    ctx.beginPath();
    ctx.arc(effect.x, effect.y, 14 + progress * 58 * effect.size, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  for (const spark of sparks) {
    const progress = spark.age / spark.life;
    ctx.save();
    ctx.globalAlpha = 1 - progress;
    ctx.fillStyle = spark.color;
    ctx.beginPath();
    ctx.arc(spark.x, spark.y, 2.6 * (1 - progress), 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function drawDanjinEyes() {
  if (!danjinFormation.active || danjinFormation.broken) return;
  const sprite = getDanjinEyeSprite(76);
  for (const eye of danjinFormation.eyes) {
    const pulse = 0.72 + Math.sin(elapsed * 7.4 + eye.seed) * 0.28;
    const spin = elapsed * 1.8 + eye.seed;
    ctx.save();
    ctx.translate(eye.x, eye.y);
    ctx.rotate(spin);
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = 0.82 + pulse * 0.18;
    const size = 58 + pulse * 8;
    if (sprite) {
      ctx.drawImage(sprite, -size / 2, -size / 2, size, size);
    } else {
      ctx.fillStyle = "rgba(255, 244, 142, 0.86)";
      ctx.beginPath();
      ctx.arc(0, 0, eye.radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

function step(dt) {
  if (matchStarted && !paused && roundEnding && !gameOver) {
    elapsed += dt;
    updatePendingRoundFinish(dt);
    updateUi();
  } else if (matchStarted && !paused && !gameOver) {
    elapsed += dt;
    updatePhysics(dt);
    updateUi();
  }

  draw();
}

ui.playAgainBtn.addEventListener("click", resetGame);
ui.startBtn.addEventListener("click", startMatch);
ui.recordBtn?.addEventListener("click", toggleRecording);
ui.startRecordBtn?.addEventListener("click", toggleRecording);
rosterChecks.forEach((item) => item.addEventListener("change", handleRosterChange));
setupRosterScrolling();

window.addEventListener(
  "pointerdown",
  () => {
    audio?.unlock();
  },
  { once: true },
);
window.addEventListener(
  "keydown",
  () => {
    audio?.unlock();
  },
  { once: true },
);

window.addEventListener("resize", fitCanvas);

audio = createAudioEngine();
fitCanvas();
syncRosterChecksToSelectedRoles();
resetGame();
gameTimer = window.setInterval(() => {
  const now = Date.now();
  const dt = Math.max(0, Math.min((now - lastTime) / 1000, 0.033));
  lastTime = now;
  step(dt);
}, 16);
