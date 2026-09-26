# Project Handoff

本文件用于在新对话没有历史上下文时快速接手本项目。开始任何改动前，优先阅读本文件，然后按需求补读 `README.md`、`CHARACTERS.md`、`PERFORMANCE.md`、`ASSET_SOURCES.md`。

## Current Status

- 项目是本地网页端小游戏原型，核心是 Canvas 自动对战、角色技能表现、录屏观感和本地保存。
- 当前主线一：角色球体对战，入口为 `index.html`，默认 1v1。
- 当前主线二：2v1 架构，仍走 `index.html`，只有 URL 带 `mode=2v1` 或 `battle=2v1` 时启用。
- 当前主线三：独立足球 demo，入口为 `soccer.html`，主题和角色对战相互独立。
- 当前最新角色进度：已加入 1v1 角色 `明王`，调试版本 URL 为 `http://127.0.0.1:4173/index.html?v=20260907-mingwang2`。
- 明王当前数值：强化每 6 秒触发，持续 3 秒，速度变为 200%，强化期间碰撞造成 5 HP；治愈在首次低于 50 和 30 HP 时各恢复 10 HP；复生在首次 HP <= 0 时不判负，恢复 10 HP 并立即触发强化。
- 当前目录不是 git 仓库，不能依赖 `git diff` 追踪变更；改动后请用 `rg`、定点 `sed` 和浏览器验证确认。

## Run And Debug

在项目根目录启动本地服务：

```bash
python3 server.py
```

主角色对战：

```text
http://127.0.0.1:4173/index.html
```

2v1 模式：

```text
http://127.0.0.1:4173/index.html?mode=2v1
```

足球 demo：

```text
http://127.0.0.1:4173/soccer.html
```

浏览器缓存经常影响调试。每次改 `game.js`、`styles.css`、`soccer.js`、`soccer.css` 或图片资源后，推进 URL 或资源引用里的 `v=` 版本号，例如：

```text
http://127.0.0.1:4173/index.html?v=20260907-mingwang2
```

常用检查：

```bash
node --check game.js
node --check soccer.js
curl -I 'http://127.0.0.1:4173/index.html?v=版本号'
curl -I 'http://127.0.0.1:4173/soccer.html?v=版本号'
```

如果保存录屏提示服务未连接，通常是 `server.py` 没启动或 4173 端口上的旧服务异常。重启服务后再测录制保存。

## Key Files

- `index.html`: 主对战页 DOM，包括 Canvas、开赛页、结果页、角色面板、角色选择槽。
- `styles.css`: 主对战页布局、角色卡片、开赛/结算/2v1 样式、头像裁切样式。
- `game.js`: 主对战的全部逻辑，包括角色元数据、角色创建、自动运动、碰撞、技能、特效绘制、录屏合成和保存。
- `soccer.html`: 足球 demo 页面结构。
- `soccer.css`: 足球 demo 页面布局、开赛页、比分/球队信息。
- `soccer.js`: 足球 demo 逻辑，包括 60 秒实际比赛、0-90 分钟显示、足球物理、射门、守门员、比分、录屏。
- `server.py`: 本地静态服务和 `/api/recordings` 保存接口。
- `assets/`: 角色头像和静态图片资源。
- `assets/visuals/`: 技能、背景、特效等外部或本地处理后的视觉资源。
- `assets/sfx/`: 音效。
- `recordings/`: 浏览器录屏保存目录。
- `README.md`: 运行方式、项目文件说明、模式说明。
- `CHARACTERS.md`: 当前角色文案、技能行为、数值。
- `PERFORMANCE.md`: 录屏和重型特效性能注意事项。
- `ASSET_SOURCES.md`: 外部素材来源和用户提供素材记录。
- `WECHAT_MINIGAME_RESEARCH.md`: 微信小游戏发布调研，用户已表示暂时归档，不作为当前优先事项。

## Main Battle Architecture

`game.js` 是单文件主逻辑，关键区域如下：

- 顶部 DOM 和全局状态：`ui`、`arena`、各类特效数组、`roleImages`、`visualImages`、`battleMode`、录屏状态。
- `roleMeta`: 角色展示名称、头像、下方文案。
- `createFighters`: 根据 `battleMode` 创建 1v1 或 2v1 阵容。
- `createFighter`: 单个角色的基础属性、HP、速度、技能配置和模式专属覆盖。
- `renderSelectedRoles` / `renderFighterPanel`: 角色选择和下方面板刷新。
- `updateSkill`: 按角色分发技能更新逻辑。
- `updatePhysics`: 每帧物理、AI、技能、碰撞和状态更新。
- `resolveBallCollision`: 球体物理碰撞入口。
- `applyCollisionDamage` / `damage`: 统一伤害入口；新增免疫、护盾、复活、濒死大招等优先在这里处理。
- `draw`: 主绘制入口。
- `drawFighter` 和各角色绘制函数：头像、球体、光环、状态、武器、技能视觉。
- `drawUltimateEffects`: 全屏或半全屏大招视觉。
- `drawRecordingFrame`: 录屏合成入口，把场地、开赛页、角色面板、结果页画进独立录制 canvas。

主对战使用 `requestAnimationFrame` 驱动。角色自动移动，不是玩家操控。多数技能是 CD 自动触发或 HP 阈值自动触发。

## Battle Mode Rules

默认不带参数时必须保持 1v1，不要让 2v1 分支污染正常对战。

`battleMode` 来源：

```js
const battleMode = modeParams.get("mode") === "2v1" || modeParams.get("battle") === "2v1" ? "2v1" : "1v1";
```

维护原则：

- 所有 2v1 专属 UI、数值、技能、结算都用 `battleMode === "2v1"` 保护。
- 1v1 需要 2 个角色；2v1 需要 3 个角色。
- 2v1 点选顺序决定站位：第 1、2 个点选角色进入左侧阵营，第 3 个进入右侧阵营。
- 2v1 左侧两名角色互为队友，不能互相攻击、技能误伤或触发敌对效果。
- 技能找目标优先使用 `teamId`、`getEnemyControllers`、`getEnemyBodies`、`getCombatBodies`、`selectTarget`，避免直接按数组下标写死。
- 结算展示角色名；左侧双人获胜时展示两个角色名，不写“左侧阵营获胜”。
- 录屏 1v1 是两张下方面板，2v1 是三张下方面板并排。

当前 2v1 重点内容：

- 默认组合：`罗小黑`、`鹿野` 对战 `灵遥`。
- `风息（领域）`: 2v1 专用独立角色，HP 160，保留木系召唤，去除豪夺，新增每 6 秒 3 条较短金属领域线。
- `灵遥`: 仅 2v1 下 HP 为 100；普通 1v1 仍是默认 80。
- `断金阵`: 2v1 中 `灵遥`、`罗小黑`、`鹿野` 同场时，开局触发 7 个阵眼，封印罗小黑御金、鹿野御金和追毫；阵眼全被触碰后破阵，1 秒后恢复技能。

## Character Maintenance Workflow

新增或调整角色时通常需要同步：

1. `assets/角色图片`: 保存用户提供头像；文件名尽量稳定。
2. `game.js` 顶部 `roleImages`: 增加 `new Image()` 和 `src`，必要时加 `v=` 防缓存。
3. `game.js` 的 `roleMeta`: 增加名称、头像、文案。
4. `game.js` 的 `createFighter`: 配置颜色、速度、技能 CD、伤害、触发条件。
5. `game.js` 的 `updateSkill`: 给该角色加分发分支。
6. `game.js` 的技能更新函数、投射物/区域数组、命中检测和绘制函数。
7. `drawFighter`: 增加头像绘制和角色身上持续特效。
8. `setSkillText` 和 `getFighterSkillLabel`: 更新下方面板和录屏面板的技能状态文字。
9. `index.html`: 角色选择槽增加角色。
10. `styles.css`: 如果头像裁切不好，添加 `object-position`。
11. `CHARACTERS.md`: 同步文案、技能行为、伤害、CD、触发条件。
12. `ASSET_SOURCES.md`: 记录新图片、外部技能素材、生成素材来源。
13. 如涉及录屏、全屏特效、重型透明叠加、拖尾或缓存，更新 `PERFORMANCE.md`。

新增伤害类技能时优先走 `damage(target, amount, source)`。新增免疫、护盾、复活、濒死保护等规则时，优先检查 `damage()` 内已有顺序，避免绕过统一伤害入口。

## Current Character List

已有角色以 `CHARACTERS.md` 为准。当前角色包括：

- 无限
- 风息
- 风息（领域）
- 虚淮
- 池年
- 浩克
- 清泉
- 大松
- 灵遥
- 鹿野
- 人类士兵
- 西木子
- 哪吒
- 阿根
- 七刀（雅婷）
- 玄离
- 罗小黑
- 鸠老
- 芷清
- 明王

## Recent Work Log

最近一轮重点是回到 1v1 并新增/增强 `明王`：

- 用户提供头像 `/Users/xingyuwei/Desktop/截屏2026-09-01 22.32.26.png`，已保存为 `assets/mingwang.png`。
- `明王` 已加入角色选择槽。
- 文案：

```text
生灵系
技能：强化，治愈，复生
“你又养了一个治愈系？”
```

- 强化：每 6 秒自动触发，光晕视觉，3 秒速度变为 2 倍；强化期间碰撞伤害最新已增强为 5 HP。
- 治愈：首次低于 50 HP、30 HP 时各恢复 10 HP，红色医疗十字视觉。实现中有 `lastObservedHp` 用于避免复生后 10HP 被误判成阈值治疗。
- 复生：首次 HP <= 0 时触发，不判负，恢复 10 HP，并立即触发强化；同时有 `mingwangRevive` 大招视觉。
- 最新调试链接：`http://127.0.0.1:4173/index.html?v=20260907-mingwang2`。
- 已执行过 `node --check game.js` 和页面 `curl -I`，均正常。

## Soccer Demo

足球 demo 是独立主题，不要和角色对战角色技能互通。入口：

```text
http://127.0.0.1:4173/soccer.html
```

当前设定：

- 法国 vs 西班牙。
- 场地为横向足球场，左右球门。
- 双方各一名角色球体，另有一颗小足球持续运动。
- 角色互相有普通物理碰撞。
- 角色接触足球后向对方球门射门。
- 射门命中率已有平衡调整；守门员太强时优先调射门球速、守门员反应和扑救概率。
- 对方球员触碰射门球可拦截并转为对方射门。
- 每进一球比分改变，进球后足球在网底停留约 1.5 秒再复位。
- 实际比赛时长 60 秒，显示为 0-90 分钟区间。
- 结束时进球多者胜，比分相等平局。
- 录屏已优化为包含开赛页和结束页。

足球 demo 的调试重点通常在 `soccer.js` 顶部常量：

- `MATCH_DURATION`
- `MATCH_CLOCK_MINUTES`
- `SHOT_CHANCE`
- `BALL_MIN_SPEED`
- `BALL_RESTART_SPEED`
- `PLAYER_SHOT_COOLDOWN`
- `FORWARD_TOUCH_SPEED`
- `KEEPER_REACTION_WINDOW`
- `KEEPER_SHOT_SAVE_CHANCE`
- `GOAL_HOLD_TIME`

## Recording

主游戏和足球 demo 都有录制能力。录屏目标是视频观感稳定，不只是页面看起来能跑。

录制保存路径：

```text
recordings/
```

保存接口：

```text
POST /api/recordings
```

当前格式为 WebM。不要在浏览器内实时转 MP4/MOV，容易引入性能和兼容性问题。

修改录制相关内容后必须验证：

- 录制按钮可以开始/停止。
- 保存接口返回成功。
- `recordings/` 下生成非 0 字节 WebM。
- 视频画面连续，不停在第一帧。
- 开赛页、下方面板、结算页都录入。
- 不采集麦克风。

## Performance Rules

本项目经常叠加透明素材、光效、拖尾和录屏，性能风险较高。

优先策略：

- 静态或低频 UI 使用离屏 canvas 缓存。
- 大图素材提前缩放缓存，避免每帧重复缩放。
- 少用大半径 `shadowBlur` 和每帧 `ctx.filter`。
- 控制拖尾数量和生命周期。
- 全屏大招尽量短、少层、可缓存。
- 同场多个高频技能时可做视觉轻量化，但不要偷偷改伤害和命中逻辑。

性能相关改动后同步更新 `PERFORMANCE.md`。

## Asset Rules

素材分为用户提供、本地自绘、外部下载或本地处理后的外部素材。

维护规则：

- 用户提供角色头像记录到 `ASSET_SOURCES.md` 的 Character Images。
- 外部技能素材记录来源页和直接图片 URL。
- 不确定授权的外部素材只用于本地原型，不要默认可商用。
- 替换素材时尽量保持文件名稳定，并推进 `v=` 查询参数清缓存。
- 用户多次强调“不要使用合成素材”时，优先找外部透明 PNG/WebP/JPG，再做必要裁切/抠底/调色。

## Useful Search Patterns

查角色：

```bash
rg -n "mingwang|明王|角色名" game.js index.html styles.css CHARACTERS.md ASSET_SOURCES.md
```

查技能更新入口：

```bash
rg -n "function update.*Skills|updateSkill\\(" game.js
```

查伤害入口：

```bash
rg -n "damage\\(|\\.hp\\s*=|hp\\s*-=" game.js
```

查绘制入口：

```bash
rg -n "drawFighter|drawUltimateEffects|function draw.*角色或技能名" game.js
```

查录屏：

```bash
rg -n "record|Recording|drawRecording" game.js soccer.js server.py
```

## Verification Checklist

每次代码改动后至少做：

```bash
node --check game.js
```

如果改足球 demo：

```bash
node --check soccer.js
```

如果改页面资源或入口：

```bash
curl -I 'http://127.0.0.1:4173/index.html?v=新版本'
```

然后在浏览器中确认：

- 页面加载到新版本。
- 开赛页可见，开始按钮可用。
- 角色选择顺序正确。
- 下方面板文案和技能状态正确。
- 关键技能能触发，视觉和伤害符合需求。
- 没有 console error。
- 涉及录屏时做短录并检查保存文件。

## Collaboration Notes

- 用户偏好快速迭代视觉和数值，常用版本号 URL 对比效果。
- 当用户说“只针对 2v1”时，必须保持 1v1 数值和玩法不受影响。
- 当用户说“调试请使用 1v1 模式”时，使用不带 `mode=2v1` 的 `index.html` 链接。
- 用户对素材真实感敏感，若说“合成素材太假”，应优先更换外部素材并记录来源。
- 用户经常要求开内置浏览器查看；可用 Codex in-app browser 打开本地 URL，并保留最新调试页。
- 文案变更不仅改 UI，也要同步 `CHARACTERS.md`。
