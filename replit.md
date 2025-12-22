# KANTALAND Web

## Overview
KANTALAND is a React + TypeScript web application built with Vite. It's a digital collection/portfolio site with an admin system for managing content, images, descriptions, and investor relationships.

## Tech Stack
- **Frontend**: React 19, TypeScript, Vite
- **Backend**: Express.js with Node.js
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS (via CDN in development)
- **AI**: Google Gemini API integration (via @google/genai)

## Project Structure
```
/
├── server.ts             # Express backend for /api/sync
├── api/                  # Legacy Vercel serverless functions (reference only)
├── components/           # React components (Hero, Admin, Editable, etc.)
├── contexts/             # AdminContext for state management
├── services/             # Service modules (geminiService.ts)
├── prisma/               # Prisma schema and migrations
├── App.tsx               # Main app component
├── index.tsx             # Entry point
├── index.html            # HTML template
├── vite.config.ts        # Vite configuration with API proxy
└── package.json          # Dependencies
```

## Running the Application
- **Development (both servers)**: `npm run dev:all`
  - Frontend: http://localhost:5000 (Vite)
  - Backend: http://localhost:3001 (Express)
- **Frontend only**: `npm run dev`
- **Backend only**: `npm run dev:server`
- **Build**: `npm run build`
- **Preview**: `npm run preview`

## Admin Panel
- Login at the ADMIN tab with credentials:
  - Email: `kantaland@gmail.com`
  - Password: `KANTA0910`
- Edit images, descriptions, and content
- Click "Publish" button to sync changes to PostgreSQL
- Changes will now appear across all browsers and devices instantly

## Database
- **Type**: PostgreSQL (Replit Neon-backed)
- **Connection**: Via `DATABASE_URL` environment variable
- **Schema**: Single `KantaStore` table (JSON storage model)
- **Syncing**: Backend `/api/sync` endpoint handles all data persistence

## How Data Sync Works (FIXED - Dec 22, 2025)
1. **Frontend changes** → AdminContext stores in local IndexedDB + calls backend
2. **Backend API** (/api/sync) → Saves data to PostgreSQL
3. **Load on page refresh** → Backend fetches from PostgreSQL, syncs to all clients
4. **Cross-browser sync** → All browsers load from same PostgreSQL database

### Before Fix
- Admin changes only persisted locally (IndexedDB per browser)
- Different browsers showed different data

### After Fix  
- Admin changes saved to PostgreSQL via Express backend
- All browsers/devices fetch from same database
- Changes reflect immediately across all clients

## Recent Changes (Dec 22, 2025)
- Imported from GitHub to Replit
- Configured Vite for Replit environment (port 5000, all hosts allowed)
- Set up PostgreSQL database with Prisma
- **NEW**: Created Express backend server for `/api/sync` endpoints
- **NEW**: Connected frontend and backend with Vite proxy
- **NEW**: All admin changes now sync to PostgreSQL instead of local storage only
- Configured static deployment

## Deployment Notes
- Frontend: Build with `npm run build` → outputs to `dist/`
- Backend: Currently runs as separate process on port 3001
- For production: Backend should be deployed to a backend service (e.g., Railway, Render)
