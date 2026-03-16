# Contributing to WednesdayOS

First off — it is wednesday, my dudes. Thank you for contributing.

## Ground Rules

- All PRs must be submitted on a Wednesday for maximum power
- Code must pass the vibe check
- No breaking the frog

## Getting Started

```bash
git clone https://github.com/theblockrebel/wednesdayos.git
cd wednesdayos
cp .env.example .env
# add your ANTHROPIC_API_KEY to .env
```

## Project Structure

```
src/
  core/         — agent engine, memory, sessions, vibe control
  terminal/     — renderer, command parser
  utils/        — wednesday detector, logger
api/
  chat.js       — vercel serverless function
config/
  config.js     — central configuration
tests/
  core.test.js  — unit tests
```

## Making Changes

1. Fork the repo
2. Create a branch: `git checkout -b feat/your-feature`
3. Make your changes
4. Run tests: `npm test`
5. Open a PR with a description

## Ideas Welcome

- More frog ASCII art
- Wednesday countdown timer with sound
- More vibe modes
- Mobile improvements
- i18n (it is wednesday in every language)

## Code Style

- Vanilla JS only — no unnecessary dependencies
- Comments on anything non-obvious
- Keep functions small
- Wednesday-aware where possible

---

*ribbit.*
