# WednesdayOS

> *it is wednesday, my dudes*

A retro terminal AI assistant powered by Claude. Users just open the site and chat — no API key needed on their end. Your key stays hidden on the server.

---

## Deploy to Vercel (free)

### 1. Push this repo to GitHub

### 2. Go to vercel.com
Sign up with GitHub, click **Add New Project**, import your repo. Done.

### 3. Add your API key
In Vercel dashboard → **Settings → Environment Variables**
- Name: `ANTHROPIC_API_KEY`
- Value: your key from console.anthropic.com
- Save → Redeploy

Your site is live. Users chat for free, they never see your key.

---

## Custom Domain
Vercel dashboard → Settings → Domains → add your domain.

---

## Structure
```
wednesdayos/
├── index.html      # full frontend
├── api/
│   └── chat.js     # hides your API key
├── vercel.json     # config
└── README.md
```

---

## Cost
- Vercel: free
- Anthropic API: ~$0.001/message. 1000 messages = ~$1.

---

*it is wednesday, my dudes*
