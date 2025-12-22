# Kantaland Web - Deployment Guide

## Architecture Overview

This is a **full-stack application** with:
- **Frontend**: React + Vite (builds to `dist/`)
- **Backend**: Express API (`api/index.ts`) - serverless on Vercel
- **Database**: PostgreSQL (managed via Prisma ORM)
- **Data Sync**: Real-time admin editor syncing via `/api/sync` endpoint

## Local Development

### Prerequisites
```bash
npm install
```

### Environment Setup
Create `.env.local`:
```env
DATABASE_URL=postgresql://user:pass@localhost:5432/kantaland_db
NODE_ENV=development
PORT=3001
GEMINI_API_KEY=your_key_here
```

### Run Development Servers
```bash
# Terminal 1: Express backend (port 3001)
npm run dev:server

# Terminal 2: Vite frontend (port 5000)
npm run dev

# Or both together:
npm run dev:all
```

The frontend at `http://localhost:5000` proxies API requests to `http://localhost:3001` via Vite's proxy configuration.

## Database Setup

### Create PostgreSQL Database
```bash
createdb kantaland_db
```

### Run Prisma Migrations
```bash
# Generate Prisma client
npx prisma generate

# Apply migrations
npx prisma migrate deploy

# Or push schema (for development)
npx prisma db push
```

### View Database
```bash
npx prisma studio
```

## Production Deployment (Vercel)

### Step 1: Prepare Repository
```bash
# Ensure all changes are committed
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Configure:
   - **Framework Preset**: Node.js
   - **Root Directory**: `.` (current directory)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 3: Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables, add:

```
DATABASE_URL=postgresql://user:password@host:port/dbname?sslmode=require
NODE_ENV=production
```

**⚠️ Important**: For PostgreSQL on Vercel free tier:
- Use a **connection pooler** like [Neon](https://neon.tech) (built-in pooling)
- Or use [PgBouncer](https://www.pgbouncer.org/) as a proxy
- Regular PostgreSQL connections will timeout in serverless

### Step 4: Run Migrations on Deployment

Add a **Deployment Hook** to run migrations after build:

1. Project Settings → Git → Deploy Hooks
2. Create hook named "Prisma Migrate"
3. Command: `npx prisma migrate deploy`

### Step 5: Deploy

```bash
# First deployment triggers automatically on git push
# Or manually in Vercel dashboard
```

## API Endpoints

### GET `/api/sync`
Fetch the latest site state from database.

**Response:**
```json
{
  "siteData": { ... },
  "songs": [ ... ],
  "videos": [ ... ],
  ...
}
```

### POST `/api/sync`
Save site state to database (admin only).

**Headers:**
```
Authorization: Bearer KANTA0910
Content-Type: application/json
```

**Request Body:**
```json
{
  "siteData": { ... },
  "songs": [ ... ],
  ...
}
```

**Response:**
```json
{
  "success": true,
  "timestamp": "2025-12-22T10:30:00Z",
  "message": "Data synchronized to database"
}
```

### GET `/api/health`
Check if the database connection is healthy.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-12-22T10:30:00Z"
}
```

## Database Schema

```sql
CREATE TABLE "KantaStore" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "data" JSONB NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
);
```

- **id**: Always `'production'` for live site data
- **data**: JSON object containing entire site state
- **createdAt**: Creation timestamp
- **updatedAt**: Last update timestamp

## Data Flow

1. **Frontend Load**:
   - React app loads
   - `AdminContext` makes GET request to `/api/sync`
   - Database returns latest state OR empty object
   - App uses IndexedDB as local cache fallback

2. **Admin Edit**:
   - Editor clicks "Publish"
   - `AdminContext` makes POST request to `/api/sync`
   - Server saves to PostgreSQL
   - Frontend shows confirmation

3. **Multi-Device Sync**:
   - Each device fetches from same database
   - Admin edits appear across all devices immediately
   - Local cache ensures offline access

## Troubleshooting

### Database Connection Errors

**Error**: `error: connect ECONNREFUSED 127.0.0.1:5432`
- **Solution**: Ensure PostgreSQL is running
  ```bash
  # macOS
  brew services start postgresql
  
  # Linux
  sudo systemctl start postgresql
  ```

### API Not Responding

**Error**: `POST /api/sync 404 Not Found`
- **Solution**: Check `api/index.ts` is in the correct location
- **Solution**: Verify `vercel.json` routes are correct

### Payload Too Large

**Error**: `413 Payload too large`
- **Solution**: Delete unused media files
- **Solution**: Compress images in admin editor

### Unauthorized Sync

**Error**: `401 Unauthorized`
- **Solution**: Check `Authorization: Bearer KANTA0910` header is set
- **Solution**: Verify auth token in `AdminContext` matches `api/index.ts`

## Security Considerations

- ✅ All API requests require Bearer token authentication
- ✅ Passwords never stored or transmitted
- ✅ Database URL kept in environment variables
- ⚠️ Set strong `ADMIN_TOKEN` in production (change `KANTA0910`)
- ⚠️ Use HTTPS only (Vercel provides this automatically)
- ⚠️ Consider IP whitelisting for admin endpoints

## Performance Optimization

- Frontend: Built with Vite for fast development and production builds
- Backend: Serverless functions auto-scale with Vercel
- Database: Prisma provides efficient query building
- Caching: No-cache headers ensure fresh data on every request

## Monitoring

Check Vercel dashboard for:
- Build logs
- Deployment status
- Function execution time
- Error rates

View database with:
```bash
npx prisma studio
```

## Support

For issues:
1. Check Vercel deployment logs
2. Check server-side logs in `api/index.ts`
3. Check browser console (DevTools)
4. Check PostgreSQL connection: `psql $DATABASE_URL`
