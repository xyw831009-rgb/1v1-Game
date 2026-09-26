# WeChat Minigame Publishing Research

归档日期：2026-08-09

当前结论：暂时不考虑微信小游戏发布。若后续重启，需要把当前浏览器 H5/Canvas 原型迁移成微信小游戏运行时，而不是直接上传现有 `index.html`。

## Current Project Fit

- 当前项目是本地 Web/Canvas 原型：`index.html`、`styles.css`、`game.js`、`soccer.html`、`soccer.js`。
- 本地录制保存依赖 `MediaRecorder`、`canvas.captureStream()` 和 `server.py` 的 `/api/recordings`。
- 资源集中在 `assets/`，录屏输出在 `recordings/`。发布包应排除 `recordings/`。
- 角色对战已包含 1v1、2v1 和 `battleMode` 参数分支；足球 demo 是独立入口。

## Main Gaps

- 微信小游戏不是普通网页运行环境，入口通常是小游戏项目内的 `game.js`，主要基于全屏 Canvas，不应依赖现有 DOM/CSS 页面结构。
- 当前 UI 包含大量 HTML overlay、按钮、角色卡和 CSS 布局；迁移时需要改成 Canvas 绘制或重建小游戏 UI。
- 当前录制/保存能力不能照搬到正式微信环境。正式环境不能请求 `localhost`，也不能依赖本地 Python 服务。
- 网络请求需要配置合法 HTTPS/WSS 域名，正式环境不支持 `localhost` 或普通 IP 域名。
- 资源包需要瘦身、压缩和按需加载；大文件不适合全部放入首包。
- 外部素材、第三方 IP、真人照片、足球相关素材都有版权和审核风险，上线前需要授权或替换成原创/可商用素材。

## Suggested Restart Path

1. 明确发布范围：角色对战、足球 demo，或两者合并为小游戏内多模式。
2. 新建独立 `wxgame/` 目录，避免影响当前 H5 原型。
3. 抽离核心逻辑：角色数据、技能、碰撞、胜负、`battleMode` 配置。
4. 重写运行时入口：微信小游戏 `game.js`、`game.json`、资源加载、触摸事件。
5. 把开赛页、角色面板、录制按钮、结算页改为 Canvas 内绘制或小游戏兼容 UI。
6. 替换浏览器专属 API：`document`、DOM、CSS、`MediaRecorder`、`fetch("/api/recordings")`、本地 `server.py`。
7. 做资源授权清单和素材压缩，排除 `recordings/`。
8. 用微信开发者工具和真机测试 iOS/Android 性能、内存、音效和触控。
9. 准备注册、类目、名称头像简介、适龄提示、隐私政策、备案、服务器域名、版本审核。

## Cost Estimate

- 离线单机技术验证版：约 1.5-3 周。
- 完整保留多角色、多模式、特效、录制/上传、合规素材和真机优化：约 4-8 周以上，审核和备案时间另算。

## References

- 微信小游戏接入指南：https://developers.weixin.qq.com/minigame/introduction/guide/index.html
- 微信小游戏开发指南：https://developers.weixin.qq.com/minigame/dev/guide/
- 学习进阶指南：https://developers.weixin.qq.com/minigame/dev/guide/develop/develop.html
- 网络限制：https://developers.weixin.qq.com/minigame/dev/guide/base-ability/network.html
- 文件系统：https://developers.weixin.qq.com/minigame/dev/guide/base-ability/file-system.html
- 启动性能：https://developers.weixin.qq.com/minigame/dev/guide/performance/perf-action-start.html
