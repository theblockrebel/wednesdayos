# WednesdayOS

> *it is wednesday, my dudes*

**WednesdayOS** is a retro terminal AI assistant themed around the legendary Wednesday Frog meme. Powered by Claude (Anthropic). Runs entirely in your browser — no server, no backend, no nonsense.

---

## Demo

Open `index.html` in your browser. That's it.

---

## Features

- **Live AI chat** — powered by Claude via the Anthropic API
- **Wednesday-aware** — auto-detects if today is Wednesday and enters full power mode
- **4 vibes** — Wholesome, Unhinged, Zen, and Maximum Hype
- **Retro terminal UI** — green phosphor CRT aesthetic with scanlines
- **ASCII frog art** — summon the frog on demand
- **TUI dashboard** — live activity monitor
- **Chat commands** — `/wednesday`, `/frog`, `/vibe`, `/status`, `/reset`, `/help`
- **No backend** — pure HTML/CSS/JS, runs locally

---

## Getting Started

### 1. Get an Anthropic API key

Sign up at [console.anthropic.com](https://console.anthropic.com) and create an API key.

### 2. Open the app

```bash
git clone https://github.com/YOUR_USERNAME/wednesdayos.git
cd wednesdayos
open index.html   # macOS
# or just double-click index.html in your file explorer
```

### 3. Configure and launch

- Paste your API key in the setup screen
- Name your agent (default: `DUDES`)
- Pick a vibe
- Hit launch

Your API key is never stored anywhere — it lives only in memory for the session.

---

## Chat Commands

| Command | Description |
|---|---|
| `/wednesday` | Check wednesday status |
| `/frog` | Summon ASCII frog |
| `/status` | Session info |
| `/vibe` | Current vibe report |
| `/reset` | Wipe memory, fresh start |
| `/help` | List all commands |

---

## Vibes

| Vibe | Description |
|---|---|
| Wholesome wednesday energy | Warm, enthusiastic, genuinely loves wednesday |
| Absolutely unhinged frog mode | Chaotic, fragmented, wednesday is everything |
| Zen wednesday philosopher | Calm, reflective, wednesday as the middle path |
| Maximum wednesday hype | ALL CAPS ENERGY, wednesday is the universe |

---

## Tech Stack

- Pure HTML/CSS/JavaScript — zero dependencies, zero build step
- [Anthropic Claude API](https://docs.anthropic.com) (`claude-haiku-4-5`)
- [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) via Google Fonts

---

## Project Structure

```
wednesdayos/
├── index.html       # entire app — one file
├── README.md        # this file
├── LICENSE          # MIT
└── .gitignore       # standard ignores
```

---

## Deploying

Since it's a single HTML file, you can host it anywhere:

**GitHub Pages** — push to a repo, enable Pages, done.

**Netlify / Vercel** — drag and drop the folder.

**Locally** — just open `index.html`.

---

## Contributing

PRs welcome. Ideas:

- [ ] Persist API key in localStorage (opt-in)
- [ ] More ASCII frog art
- [ ] Wednesday countdown timer
- [ ] Sound effects (the original audio clip)
- [ ] Mobile layout improvements
- [ ] More vibe modes

---

## License

MIT — free to use, modify, distribute. keep it weird.

---

*built for the dudes. it is wednesday.*
