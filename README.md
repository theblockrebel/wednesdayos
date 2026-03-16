text

# WednesdayOS

<div align="center">

```
    (  )   (   )  )
     ) (   )  (  (
     _____________
    <  MY  DUDES  >
     ~~~~~~~~~~~~~
      (  o     o )
       |    ^    |
       |  \___/  |
        \_______/
```

**A high-performance, wednesday-aware AI terminal operating system.**
Powered by Anthropic Claude. Zero-dependency frontend. Serverless edge runtime.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/theblockrebel/wednesdayos)
![License](https://img.shields.io/badge/license-MIT-green)
![Model](https://img.shields.io/badge/model-claude--haiku-blue)
![Status](https://img.shields.io/badge/status-it%20is%20wednesday-brightgreen)

</div>

---

## Overview

WednesdayOS is a terminal-based AI assistant with a dynamic personality engine calibrated in real-time against wednesday proximity. Built on a serverless edge architecture, it delivers sub-200ms response routing with zero cold-start overhead on the frontend layer.

The system implements a multi-layer agent pipeline:

```
User Input
    │
    ▼
CommandParser        ← slash command interception & routing
    │
    ▼
VibeController       ← dynamic personality calibration
    │
    ▼
WednesdayDetector    ← real-time temporal power factor (0.1 – 1.0)
    │
    ▼
AgentCore            ← memory management, session orchestration
    │
    ▼
Serverless Proxy     ← api/chat.js edge function (key isolation)
    │
    ▼
Anthropic Claude API ← LLM inference layer
```

---

## Architecture

### Frontend
Pure HTML/CSS/JS — zero build step, zero dependencies, zero bundle size overhead. The entire UI is a single `index.html` with an embedded terminal emulator featuring:

- CRT phosphor scanline rendering via CSS `repeating-linear-gradient`
- Real-time TUI dashboard with activity stream
- IBM Plex Mono typography for authentic terminal aesthetics
- Wednesday-aware state management — UI adapts based on `Date.getDay()`

### Backend
Vercel serverless edge function (`api/chat.js`) acts as a secure proxy between the client and the Anthropic API. This pattern ensures:

- **API key isolation** — credentials never exposed to the client
- **CORS control** — requests only accepted from trusted origins
- **Rate limiting** — enforced at the edge layer
- **Zero server maintenance** — fully managed serverless infrastructure

### Agent System
The agent pipeline is implemented across multiple modules:

| Module | Responsibility |
|---|---|
| `AgentCore` | Lifecycle management, memory compression, session orchestration |
| `VibeController` | Personality calibration, temperature/topP tuning per vibe mode |
| `MemoryStore` | Short-term context with automatic compression at threshold |
| `SessionManager` | Token tracking, cost estimation, session persistence |
| `CommandParser` | Slash command parsing, alias resolution, command history |
| `WednesdayDetector` | Temporal power factor calculation, wednesday proximity scoring |

### Wednesday Power Factor
A core system metric — a float from `0.1` to `1.0` representing how close the current day is to Wednesday:

```
Wednesday  = 1.0  (full power)
Tue / Thu  = 0.8
Mon / Fri  = 0.6
Sun / Sat  = 0.4
```

This factor modulates agent temperature, response energy, and vibe multipliers in real-time.

---

## Features

- **Live AI chat** — streaming Claude responses via serverless proxy
- **Wednesday detection** — real-time power factor system
- **4 vibe modes** — Wholesome, Unhinged, Zen, Maximum Hype
- **Full slash command system** — `/wednesday`, `/frog`, `/status`, `/vibe`, `/reset`, `/help`
- **TUI dashboard** — live terminal activity monitor
- **Session memory** — rolling context window with auto-compression
- **ASCII frog sprite system** — 5 procedurally selected variants
- **Retro CRT terminal UI** — scanlines, phosphor green, IBM Plex Mono
- **Zero client-side API exposure** — all credentials isolated server-side
- **Edge-deployed** — global low-latency via Vercel edge network

---

## Deployment

### One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/theblockrebel/wednesdayos)

### Manual deploy

```bash
git clone https://github.com/theblockrebel/wednesdayos.git
cd wednesdayos
vercel deploy --prod
```

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `ANTHROPIC_API_KEY` | Yes | Anthropic API key from console.anthropic.com |

---

## Commands

| Command | Description |
|---|---|
| `/status` | Session info, token usage, wednesday factor |
| `/wednesday` | Real-time wednesday proximity report |
| `/frog` | Summon ASCII frog (cycles through 5 variants) |
| `/vibe` | Current vibe mode and power level |
| `/reset` | Flush memory, reinitialize session |
| `/help` | Full command reference |

---

## Vibe Modes

| Mode | Temperature | Wednesday Multiplier | Description |
|---|---|---|---|
| `wholesome` | 0.8 | 1.2x | Warm, enthusiastic, wednesday-loving |
| `unhinged` | 1.1 | 2.0x | Chaotic, fragmented, frog-brained |
| `zen` | 0.6 | 1.0x | Calm, reflective, wednesday as middle path |
| `hype` | 1.2 | 3.0x | Maximum energy, wednesday supremacist |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JS |
| Runtime | Vercel Serverless (Edge) |
| AI Model | Anthropic Claude Haiku |
| Typography | IBM Plex Mono |
| Deployment | Vercel + GitHub CI |
| Language | JavaScript, Java (SDK) |

---

## Project Structure

```
wednesdayos/
├── index.html                          # terminal UI — entire frontend
├── api/
│   └── chat.js                         # serverless proxy — key isolation
├── src/
│   ├── core/
│   │   ├── agent.js                    # agent lifecycle & orchestration
│   │   ├── memory.js                   # context memory with compression
│   │   ├── session.js                  # session tracking & cost estimation
│   │   └── vibe.js                     # personality calibration engine
│   ├── terminal/
│   │   ├── renderer.js                 # terminal output & ASCII art
│   │   └── commands.js                 # slash command parser
│   └── utils/
│       ├── wednesday.js                # wednesday detection & power factor
│       └── logger.js                   # structured logging
├── src/main/java/com/wednesdayos/      # Java SDK
│   ├── agent/                          # AgentCore, VibeController, AgentStats
│   ├── models/                         # Message, Session
│   ├── config/                         # AgentConfig (builder pattern)
│   ├── terminal/                       # CommandHandler
│   └── utils/                          # WednesdayDetector
├── config/
│   └── config.js                       # central configuration
├── tests/
│   └── core.test.js                    # unit test suite
├── vercel.json                         # vercel configuration
├── pom.xml                             # Maven build (Java SDK)
├── package.json                        # Node.js dependencies
└── .env.example                        # environment variable reference
```

---

## Contributing

PRs welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

Ideas on the roadmap:
- [ ] Wednesday countdown timer with audio
- [ ] WebSocket streaming responses
- [ ] Persistent memory via Vercel KV
- [ ] Mobile-optimized layout
- [ ] More vibe modes
- [ ] i18n — it is wednesday in every language

---

## License

MIT — free to use, modify, distribute. keep it weird.

---

<div align="center">

*built for the dudes.*
*it is wednesday.*

</div>

## 🌐 Official Links

- 🐦 [X / Twitter](https://x.com/IsWednesdayOS)
- 💻 [WednesdayOS Terminal](https://wednesdayos.xyz/)
- 🐸 [Official Meme Website](https://wednesdaymydudes.xyz/)
