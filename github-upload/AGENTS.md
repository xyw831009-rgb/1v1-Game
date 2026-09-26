# Collaboration Rules

- While actively working on a user request, send a short progress update at least every 2 minutes, stating the current step or blocker. This safety margin prevents the user from waiting 5 minutes without visible feedback.
- Before starting a potentially slow browser test, server restart, network request, media conversion, or file search, send a progress update first.
- Once a requested edit or verification is complete, send the outcome immediately rather than continuing silently with optional follow-up investigation.
- This rule governs active assistant work; it cannot emit a notification while the app, a tool call, or an interrupted turn is itself unresponsive.

# Game Performance Notes

- For visual skills with glow, trails, or residual light effects, keep rendering cost bounded: limit trail count and lifetime, lower `shadowBlur`, and avoid creating dense new trail objects every frame.
- When multiple characters use similar high-frequency effects at the same time, prefer an automatic lighter visual mode rather than changing combat logic.
- Cache static or repeated visuals such as arena backgrounds, textures, and reusable effect sprites; rebuild caches only when canvas size or source assets change.
- Treat full-screen effects and recording as higher-risk performance paths. Prefer local or partial effects unless the dramatic payoff clearly justifies the cost.

# Project Documentation

- Keep `README.md` updated when startup, recording, or project structure changes.
- Keep `CHARACTERS.md` updated when adding roles, changing role text, tuning skill damage/CD/conditions, or changing major skill visuals.
- Keep `PERFORMANCE.md` updated when changing recording, full-screen effects, high-frequency trails, cached render layers, or other performance-sensitive paths.
- Keep `ASSET_SOURCES.md` updated when adding or replacing external images, sounds, textures, or generated assets.
