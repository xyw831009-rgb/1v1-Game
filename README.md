# 1v1-Game
A 1v1 mini-game where different characters use different skills to battle in an arena.
# Ball Arena Prototype

一个无需构建的本地网页端小游戏原型：角色球体自动运动、碰撞并释放技能，任一方 HP 归零后当局结束。项目同时包含独立足球对战 demo，当前重点是浏览器模拟、角色技能表现、2v1 阵营玩法、录屏效果和视频观感。

本仓库适合直接上传 GitHub 作为源码项目。项目没有 npm 依赖和打包步骤，使用 Python 标准库启动本地服务即可运行。

## How To Run

在项目根目录启动本地服务：

```bash
python3 server.py
```

打开：

```text
http://127.0.0.1:4173/index.html
```

如果端口 `4173` 已被占用，可先停止旧服务，或在 `server.py` 中调整端口后使用对应地址访问。

2v1 架构 demo 入口，只有带 `mode=2v1` 时才启用左二右一布局：

```text
http://127.0.0.1:4173/index.html?mode=2v1
```

2v1 角色槽按点选顺序分配位置：第 1、2 个点选角色进入左侧两格，第 3 个点选角色进入右侧。当前 2v1 默认组合为 `罗小黑`、`鹿野` 对战 `灵遥`。下方角色信息以三列并排展示，结算时左侧获胜会同时显示两名左侧角色名。

## Battle Mode Maintenance

主对战页通过 `game.js` 内的 `battleMode` 字段管理模式分支。URL 参数 `mode=2v1` 会开启 2v1；历史兼容参数 `battle=2v1` 也会开启 2v1；不带这些参数时默认保持 `1v1`。`v=...` 只用于缓存刷新，不应该参与玩法逻辑判断。

- 模式专属逻辑统一使用 `battleMode === "2v1"` 保护，避免影响默认 1v1。
- 角色数量和默认阵容由 `requiredRoleCount`、`defaultSelectedRoles` 管理。2v1 下第 1、2 个点选角色进入左侧阵营，第 3 个点选角色进入右侧阵营；1v1 下仍然是第 1 个左侧、第 2 个右侧。
- 技能选敌和碰撞关系优先使用 `teamId`、`getTeamControllers`、`getEnemyBodies`、`getCombatBodies` 这类队伍辅助逻辑，不要只按角色数组下标判断敌我。2v1 左侧两名角色互为队友，不应互相造成伤害或误伤。
- UI 差异放在 `body.two-v-one`、`.fighter-grid.two-v-one`、三列角色面板、开局页阵营卡片和结算文案分支里处理。
- 2v1 专属角色或数值调整应放在受 `battleMode` 保护的创建/更新路径里。当前例子包括：`灵遥` 仅在 2v1 下 HP 为 100、`风息（领域）` 作为独立 2v1 角色存在、`断金阵` 只在 2v1 阵容条件满足时触发。
- 录屏和结算逻辑也要跟随模式分支：1v1 录两张角色面板，2v1 录三张角色面板；胜利信息展示角色名，左侧双人获胜时展示两名角色名。

足球主题独立 demo 入口：

```text
http://127.0.0.1:4173/soccer.html
```

GitHub Pages 等静态托管可以展示页面和运行游戏，但不能提供 `server.py` 的 `POST /api/recordings` 保存接口。需要录制并保存 WebM 时，请在本地启动 `server.py`；如果只需要在线试玩，可直接将仓库部署到静态托管。

如果浏览器缓存了旧脚本，可以在 URL 后追加版本参数，例如：

```text
http://127.0.0.1:4173/index.html?v=copy-clean1
```

## Project Files

- `index.html`: 页面结构、开局页、角色面板、角色选择槽；默认 1v1，`mode=2v1` 时显示左侧双角色布局。
- `styles.css`: 页面布局、角色面板、开局/结算 UI、响应式样式。
- `game.js`: 游戏逻辑、角色技能、Canvas 绘制、录屏逻辑、音效逻辑。
- `soccer.html` / `soccer.css` / `soccer.js`: 独立足球对战 demo，当前为法国 vs 西班牙，复用主游戏的开赛页、场地 HUD、下方面板布局和录制入口，包含 60 秒比赛、0-90 分钟显示、比分、足球射门、拦截和守门员扑救逻辑。
- `server.py`: 本地静态服务和录屏保存接口。
- `assets/`: 角色头像、技能视觉素材、音效素材。
- `recordings/`: 浏览器录制后保存的 WebM 视频目录。
- `AGENTS.md`: 协作规则和性能原则。
- `handoff.md`: 新对话接手备份，汇总当前进度、架构、调试入口、维护流程和验证清单。
- `CHARACTERS.md`: 当前角色设定和技能行为说明。
- `PERFORMANCE.md`: 录屏与特效性能策略。
- `ASSET_SOURCES.md`: 外部素材来源记录。

## GitHub 上传

上传源码时建议保留整个项目目录结构，不要只上传 `index.html`。以下内容是运行所需的核心文件：

- `index.html`、`game.js`、`styles.css`: 角色对战主线。
- `soccer.html`、`soccer.js`、`soccer.css`: 独立足球 demo。
- `server.py`: 本地静态服务和录屏保存接口。
- `assets/`: 头像、技能视觉素材和音效。
- `README.md`、`handoff.md`、`CHARACTERS.md`、`PERFORMANCE.md`、`ASSET_SOURCES.md`: 使用与维护文档。

项目根目录的 `.gitignore` 会忽略本地录屏、编辑器配置和压缩包。`recordings/` 目录中的 WebM 是运行产生的个人测试文件，不建议提交到 GitHub；源码包只保留目录占位文件 `recordings/.gitkeep`。

本项目包含用户提供图片以及从外部来源取得的原型素材。公开仓库前请逐项确认图片、音效和视觉素材的授权范围；不能确认授权的素材仅适合本地演示，不应默认用于商业发布。当前没有附加开源许可证，如需允许他人复用代码，请另行添加合适的 `LICENSE` 文件。

## 发布包

当前目录下的 `github-upload.zip` 是便于上传或转存的源码包，包含项目源文件、文档和 `assets/`，排除了本地录屏文件。GitHub 页面上更推荐直接上传解压后的源码目录；压缩包主要用于备份或一次性传输。

## Recording

游戏内录屏会录制：

- 游戏场地
- 开局 VS 页面
- 下方角色面板，1v1 为双方两张面板，2v1 为三张角色面板并排
- 结算胜利页面
- 游戏内音效

录屏不会采集麦克风。保存接口会把文件写入项目内的相对目录：

```text
recordings/
```

当前保存格式是 WebM。需要 MP4/MOV 时，优先手动转换，不在游戏内做实时转码。

足球 demo 使用独立录制合成 canvas：录制时会把球场、比分 HUD、开赛 VS 页面和比赛结束页面画入同一条视频流，避免只捕获到足球场 canvas 而漏掉覆盖层。

## Current Priorities

- 录屏视频质量优先，不能简单通过降低分辨率、降低帧率、砍掉特效来解决问题。
- 新角色开发时，优先保证技能视觉可读性、命中反馈和录屏观感。
- 性能优化优先做缓存、预渲染、对象复用和绘制路径优化。
- 全屏大招要谨慎使用；如果性能有风险，优先做局部高冲击效果。

## Development Notes

- 新增角色时，同步更新 `game.js` 的 `roleMeta`、角色创建逻辑、技能更新逻辑、绘制逻辑、`index.html` 角色槽、`CHARACTERS.md`。
- 新增外部素材时，同步更新 `ASSET_SOURCES.md`。
- 改动录屏相关逻辑后，需要至少做一次短录测试，确认文件非 0 字节、画面连续、声音存在、角色面板和结算页可录入。

## Handoff

新对话接手项目时，先阅读 `handoff.md`，再根据任务补读 `CHARACTERS.md`、`PERFORMANCE.md` 和 `ASSET_SOURCES.md`。其中记录了当前角色、`battleMode` 规则、关键函数入口、调试 URL、录屏注意事项和验证清单。
