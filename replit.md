# KANTALAND Web - Complete Setup

## Overview
KANTALAND is a full-stack React + Express web application with admin content management system, synced to PostgreSQL for cross-browser data persistence.

## Why Changes Weren't Reflecting Before (FIXED)
- **Previous Problem**: Admin changes were only saved locally in each browser, not to the database
- **Solution**: Created Express backend to save all admin changes to PostgreSQL
- **Result**: Now all changes sync across all browsers and devices immediately

## Tech Stack
- **Frontend**: React 19, TypeScript, Vite
- **Backend**: Express.js on Node.js  
- **Database**: PostgreSQL with Prisma ORM
- **Deployment**: Replit Autoscale (both frontend and backend run together)

## Running Locally

### Development Mode
```bash
npm run dev:all
```
- Frontend: http://localhost:5000 (Vite dev server)
- Backend: http://localhost:3001 (Express API)
- Both servers run in parallel

### Production Mode (for testing)
```bash
npm run start
```
- Single server on port 5000
- Serves both API and frontend
- Mimics production deployment

## Admin Panel Usage
1. Click ADMIN in navigation
2. Login: `kantaland@gmail.com` / `KANTA0910`
3. Edit images, text, descriptions
4. Click **"Publish"** button (saves to PostgreSQL)
5. Changes appear instantly on all browsers/devices

## How It Works Now (Fixed Dec 22, 2025)

**Admin Flow:**
```
Admin edits content → Frontend updates state → Admin clicks "Publish"
  → Express API receives data → Saves to PostgreSQL
  → Other browsers load same data from database
  → All clients show identical content ✓
```

**Data Persistence:**
- **Local IndexedDB**: Browser cache (fast, instant feedback)
- **PostgreSQL**: Shared database (cross-browser sync)
- **Vite Proxy**: Routes API calls to backend in dev mode

## Deployment (www.kantaland.com)

### Configuration
- **Type**: Autoscale
- **Build**: `npm run build` (creates frontend bundle in `/dist`)
- **Run**: `npm run start` (starts Express server)
- **Port**: 5000 (Replit automatically exposes this)

### How It Works
1. Build process generates frontend files in `/dist`
2. Express server serves both API and static files
3. Admin changes POST to `/api/sync`
4. Backend saves to PostgreSQL  
5. All clients fetch updated data on page load/refresh

### To Deploy
- Click "Publish" on Replit
- Website updates automatically at www.kantaland.com
- Admin changes will now persist and sync across all users

## Files Changed (Dec 22, 2025)
- `server.ts` - New Express backend with `/api/sync` endpoints
- `package.json` - Added start, dev:server, dev:all scripts
- `vite.config.ts` - Added API proxy for dev mode
- `contexts/AdminContext.tsx` - Uses unified API URL
- All admin changes now sync to PostgreSQL instead of local storage only
