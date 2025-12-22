# Data Sync Architecture - Technical Specification

## Overview
Kantaland Web uses a **real-time database synchronization** system that ensures:
- Admin edits persist to PostgreSQL database
- Changes sync across all devices automatically
- Offline-first with IndexedDB local caching
- Vercel-compatible serverless architecture

## Architecture Diagram

```
┌─────────────────────────────────────────┐
│         Frontend (React + Vite)         │
│  - AdminContext manages state           │
│  - Editable components for content      │
│  - GlobalEditorMenu for publish/sync    │
└─────────────────────────────────────────┘
                    │
                    │ GET /api/sync
                    │ POST /api/sync
                    ↓
┌─────────────────────────────────────────┐
│   Backend API (Express on Vercel)       │
│  - api/index.ts handles routing         │
│  - Prisma ORM for type-safe queries     │
│  - Connection pooling for serverless    │
└─────────────────────────────────────────┘
                    │
                    ↓
┌─────────────────────────────────────────┐
│   PostgreSQL Database                   │
│  - KantaStore table with JSONB data     │
│  - Single 'production' row as state     │
│  - Timestamps for sync tracking         │
└─────────────────────────────────────────┘
```

## State Flow

### 1. Initial Load
```typescript
// Browser loads app
1. React renders AdminContext provider
2. useEffect triggers initialization
3. GET /api/sync request
4. Response contains full state (siteData, songs, videos, etc)
5. setState(cloudData)
6. dbSave(cloudData) - save to IndexedDB for offline
```

### 2. Admin Edit
```typescript
// User makes changes in admin editor
1. EditableText component updates local state via onSave()
2. updateState() called in AdminContext
3. State changed via setState()
4. persist() function automatically triggered
5. dbSave(newState) - local cache updated immediately
6. fetch(POST /api/sync) - cloud sync in background
7. Server saves to database
8. Client shows confirmation
```

### 3. Multi-Device Sync
```typescript
// Device B accesses deployed site
1. GET /api/sync request from Device B
2. Server returns latest data from database
3. Device B updates its local state
4. All devices show same content
```

## API Endpoints

### GET /api/sync
**Purpose**: Fetch the latest site state

**Request**:
```bash
curl https://kantaland.vercel.app/api/sync
```

**Response (200 OK)**:
```json
{
  "siteData": {
    "hero": { "image": "...", "title": "..." },
    "incubator": { "vision": "..." },
    ...
  },
  "songs": [...],
  "videos": [...],
  "pressReleases": [...],
  "projects": [...],
  "investors": [...]
}
```

**Error Response (500)**:
```json
{
  "error": "Database Connection Error",
  "details": "Ensure DATABASE_URL is set correctly."
}
```

### POST /api/sync
**Purpose**: Save state to database (admin only)

**Request**:
```bash
curl -X POST https://kantaland.vercel.app/api/sync \
  -H "Authorization: Bearer KANTA0910" \
  -H "Content-Type: application/json" \
  -d '{...state...}'
```

**Headers Required**:
- `Authorization: Bearer KANTA0910` - Admin token
- `Content-Type: application/json`

**Request Body**: Complete state object
```json
{
  "siteData": { ... },
  "songs": [ ... ],
  "videos": [ ... ],
  ...
}
```

**Response (200 OK)**:
```json
{
  "success": true,
  "timestamp": "2025-12-22T10:30:00Z",
  "message": "Data synchronized to database"
}
```

**Error Responses**:
- `401 Unauthorized` - Missing or invalid auth token
- `400 Bad Request` - Invalid JSON payload
- `413 Payload Too Large` - Exceeds 4.5MB limit
- `500 Server Error` - Database connection failed

### GET /api/health
**Purpose**: Health check endpoint

**Request**:
```bash
curl https://kantaland.vercel.app/api/health
```

**Response (200 OK)**:
```json
{
  "status": "ok",
  "timestamp": "2025-12-22T10:30:00Z"
}
```

## Database Schema

```sql
CREATE TABLE "KantaStore" (
  id        TEXT PRIMARY KEY,      -- Always 'production'
  data      JSONB NOT NULL,        -- Complete state
  createdAt TIMESTAMP DEFAULT now(),
  updatedAt TIMESTAMP DEFAULT now()
);
```

**Data Structure**:
```typescript
interface GlobalState {
  siteData: SiteData;
  songs: Song[];
  beats: Beat[];
  videos: Video[];
  pressReleases: PressRelease[];
  projects: Project[];
  investors: InvestorProfile[];
}
```

## Synchronization Logic

### Persist Function (Auto-Sync)
```typescript
const persist = async (newState: GlobalState) => {
  // 1. Save locally immediately (fast)
  await dbSave(newState);  // IndexedDB
  
  // 2. Sync to cloud asynchronously
  const payload = JSON.stringify(newState);
  const sizeInMB = new Blob([payload]).size / (1024 * 1024);
  
  if (sizeInMB > 4.4) {
    console.warn('Payload too large, skipping sync');
    return;  // Keep local copy only
  }
  
  try {
    const res = await fetch('/api/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer KANTA0910'
      },
      body: payload
    });
    
    if (res.ok) {
      console.log('✓ Auto-sync completed');
    } else {
      console.warn('Auto-sync failed:', res.status);
    }
  } catch (e) {
    console.warn('Auto-sync network error:', e);
    // App continues working - data saved locally
  }
};
```

## Error Handling & Resilience

### Network Failure
- Changes saved to IndexedDB immediately
- Sync attempted asynchronously
- If sync fails, user continues editing
- Next successful request syncs all pending changes

### Database Unavailable
- GET request returns local IndexedDB cache
- POST request fails gracefully
- Admin sees warning: "Data saved locally"
- Next database connection resumes sync

### Payload Too Large
- Before sync, payload is validated
- If >4.4MB, user prompted to delete media
- Local changes still saved
- User can compress images and retry

## Connection Pooling (Vercel)

**Current Setup** (Development):
- Prisma Client with single connection
- Works for local development

**For Vercel Deployment**:
```typescript
// api/index.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Graceful shutdown
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
```

**Best Practice for High Load**:
Use Neon's built-in pooling:
```
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require&connection_limit=20
```

## Performance Optimization

### Compression
- Images auto-compressed to 600px width, 0.5 quality
- JSONB storage is efficient
- No unnecessary data fetches

### Caching Strategy
- `Cache-Control: no-store` - Ensures fresh data
- IndexedDB for offline access
- 20-item history for undo/redo

### Query Optimization
```typescript
// Prisma queries are optimized with select
await prisma.kantaStore.findUnique({
  where: { id: 'production' },
  select: { data: true, updatedAt: true }  // Only fetch needed fields
});
```

## Security

### Authentication
- Admin token: `Bearer KANTA0910` (change in production!)
- Token checked on every POST request
- GET requests public (anyone can view)

### Data Protection
- Environment variables keep DB URL safe
- .env never committed to git
- HTTPS enforced by Vercel

### Rate Limiting (Optional)
For production, add rate limiting:
```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100  // Limit each IP to 100 requests per windowMs
});

app.use('/api/sync', limiter);
```

## Monitoring & Debugging

### Check Database Connection
```bash
npx prisma studio
# Or via psql
psql $DATABASE_URL
SELECT * FROM "KantaStore";
```

### View Logs
```bash
# Development
npm run dev:all

# Production (Vercel Dashboard)
# Project Settings → Deployments → View Logs
```

### Test Endpoints
```bash
# Test GET
curl https://kantaland.vercel.app/api/sync

# Test Health
curl https://kantaland.vercel.app/api/health

# Test POST (admin only)
curl -X POST https://kantaland.vercel.app/api/sync \
  -H "Authorization: Bearer KANTA0910" \
  -H "Content-Type: application/json" \
  -d '{"siteData":{"hero":{"title":"test"}}}'
```

## Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| `✗ Cannot reach database` | Network error | Check DATABASE_URL is accessible |
| `✗ Unauthorized` | Wrong token | Verify `Authorization: Bearer KANTA0910` |
| `✗ Payload too large` | >4.5MB | Delete unused images/videos |
| `✗ Data not syncing` | CORS issue | Check vercel.json CORS settings |
| `✗ Showing old data` | Cache issue | Hard refresh (Ctrl+Shift+R) |

## Future Enhancements

1. **Real-time Sync** - WebSockets for instant multi-user updates
2. **Conflict Resolution** - Merge strategies for simultaneous edits
3. **Backup System** - Automatic daily database backups
4. **Audit Trail** - Track all changes by user and timestamp
5. **Compression** - Compress old backups to save storage
