# KANTALAND Web

## Overview
KANTALAND is a React + TypeScript web application built with Vite. It's a digital collection/portfolio site featuring various sections including an incubator, Hollywood, press/news, and more.

## Tech Stack
- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS (via CDN in development)
- **Database**: PostgreSQL with Prisma ORM
- **AI**: Google Gemini API integration (via @google/genai)

## Project Structure
```
/
├── api/              # Vercel serverless functions (sync.js, setup.js)
├── components/       # React components
├── contexts/         # React context providers
├── services/         # Service modules (geminiService.ts)
├── prisma/           # Prisma schema and config
├── App.tsx           # Main app component
├── index.tsx         # Entry point
├── index.html        # HTML template
├── vite.config.ts    # Vite configuration
└── package.json      # Dependencies
```

## Running the Application
- Development: `npm run dev` (runs on port 5000)
- Build: `npm run build`
- Preview: `npm run preview`

## Database
- Uses PostgreSQL via Prisma
- Connection via `DATABASE_URL` environment variable
- Schema in `prisma/schema.prisma`

## Notes
- The `/api` folder contains Vercel serverless functions for data sync
- These API endpoints do not run in Vite dev mode - the app falls back to local data
- For full API functionality, deploy to a serverless platform

## Recent Changes (Dec 2025)
- Imported from GitHub to Replit
- Configured Vite to use port 5000 and allow all hosts
- Set up PostgreSQL database and Prisma
- Configured static deployment
