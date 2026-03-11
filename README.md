# Gold Mining Framework

An automated system for generating business ideas and deploying landing pages with waitlists. Built for speed — from niche selection to deployed page in ~45 minutes.

## Overview

The framework uses AI agents to:

1. **Select a niche** — Randomly picks from Health/Wealth/Relationships and drills down to a specific problem
2. **Collect Reddit data** — Scrapes authentic user frustrations from relevant subreddits
3. **Analyze pain points** — Applies thematic analysis to extract themes and opportunities
4. **Generate ideas** — Creates and scores multiple business ideas using the "Should I Build This?" framework
5. **Write copy** — Uses proven copywriting frameworks (PAS, AIDA, Before-After-Bridge)
6. **Design & build** — Creates a complete Astro + Tailwind landing page with waitlist
7. **Deploy** — Pushes to GitHub and deploys via Dokploy

## Directory Structure

```
gold-mining-framework/
├── .opencode/
│   └── agents/                    # All AI agent definitions
│       ├── gold-miner.md          # Main orchestrator agent
│       ├── data-collector.md      # Reddit scraper
│       ├── analysis-agent.md       # Thematic analysis
│       ├── critique-agent.md       # Analysis reviewer
│       ├── ideation-agent.md       # Business idea generator
│       ├── copywriter.md          # Landing page copy
│       ├── landing-page-designer.md # Design brief creator
│       └── landing-page-developer.md # Code implementation
├── landing-page-template/         # Base Astro + Tailwind template
├── shared-backend/                # Waitlist API server
├── tools/
│   └── reddit_scraper.py          # CLI tool for Reddit data collection
├── .env                           # Environment variables (not committed)
└── runs/                          # Created per-run (see below)
```

## Run Folder Convention

Every execution creates a **dedicated run folder** to keep artifacts isolated:

```
runs/<niche-slug>-<YYYY-MM-DD>/
├── 01_raw_data.md        ← Reddit posts & comments
├── 02_analysis.md        ← Thematic analysis with pain points
├── 02_ideas.md           ← Scored business ideas
├── 03_critique.md        ← Analysis review
├── 03_copy.md            ← Landing page copy
├── 04_design_brief.md    ← Visual design specs
└── site/                 ← Landing page code
    ├── src/
    ├── package.json
    ├── Dockerfile
    └── ...
```

## Workflow

```
gold-miner (orchestrator)
    │
    ├─► data-collector      → 01_raw_data.md
    ├─► analysis-agent      → 02_analysis.md
    ├─► ideation-agent      → 02_ideas.md
    ├─► critique-agent      → 03_critique.md
    ├─► copywriter          → 03_copy.md
    ├─► landing-page-designer → 04_design_brief.md
    └─► landing-page-developer → site/
```

## Required Environment Variables

Create a `.env` file at the repo root:

```bash
# Reddit API
REDDIT_CLIENT_ID=xxx
REDDIT_CLIENT_SECRET=xxx
REDDIT_USER_AGENT=gold-miner/1.0

# Dokploy (deployment)
DOKPLOY_TOKEN=xxx
DOKPLOY_URL=https://aitbytes.dev/

# GitHub (if deploying)
GITHUB_TOKEN=xxx
```

## Shared Backend

All landing pages share a single backend for waitlist functionality:

- **API URL**: `https://api-goldmine.aitbytes.dev`
- **Join Waitlist**: `POST /api/join-waitlist`
  - Body: `{ "email": "user@example.com", "projectName": "your-app-name" }`
- **Admin Read**: `GET /api/waitlist/:projectName` (header: `x-admin-key: goldmine-admin-2026`)

## Key Principles

1. **All paths relative to repo root** — No hardcoded absolute paths
2. **Run folders isolate each execution** — Keeps artifacts clean and versioned
3. **Subagents read from run folder** — Orchestrator passes the path to each agent
4. **Waitlist is mandatory** — Every landing page must have working signup forms
5. **Copy comes before design** — Copywriter creates the words, designer creates the visuals

## Usage

Invoke the `gold-miner` agent in OpenCode. It will:

1. Randomly select a niche (Health/Wealth/Relationships → sub-niche → problem area)
2. Validate with Google Trends
3. Create the run folder
4. Execute the full agent pipeline
5. Deploy the landing page to a `*.aitbytes.dev` subdomain

## References

- Based on [Starter Story's Gold Mining Framework](https://www.youtube.com/watch?v=L_FY6aW9cJ4)
- Uses "Should I Build This?" scoring framework for idea evaluation
- Y Combinator criteria for idea validation
