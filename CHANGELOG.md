# Changelog

## [1.0.0] — 2026-03-16

### Added
- Initial release of WednesdayOS
- Core agent engine with memory and session management
- Wednesday proximity detection and power factor system
- 4 vibe modes: wholesome, unhinged, zen, hype
- Retro terminal UI with CRT scanline effect
- ASCII frog sprite system with 5 variants
- Full slash command system (/frog, /wednesday, /status, /vibe, /reset, /help)
- TUI dashboard with live activity monitor
- Serverless API proxy via Vercel (keeps API key hidden)
- IBM Plex Mono typography
- Wednesday-aware system prompting
- Stats tracking (messages, frogs summoned, vibe level)

### Security
- API key never exposed to client
- All Anthropic calls proxied through serverless function
- CORS configured for production domains only

---

## [0.9.0] — 2026-03-10 (beta)

### Added
- Beta terminal UI
- Basic Claude integration
- Wednesday detection

### Fixed
- Frog art rendering on mobile
- Session memory leak on /reset

---

*it is wednesday, my dudes*
