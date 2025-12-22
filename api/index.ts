import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================
// DATABASE CONNECTION SETUP
// ============================================
// For Vercel serverless: Prisma Client with connection pooling
// In production, DATABASE_URL should point to a connection pooler (PgBouncer) or Neon
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['info', 'warn', 'error'] : ['error'],
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing Prisma connection...');
  await prisma.$disconnect();
  process.exit(0);
});

// ============================================
// EXPRESS APP SETUP
// ============================================
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '4.5mb' }));
app.use(express.urlencoded({ limit: '4.5mb' }));

// CORS Headers with cache control
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );
  // Critical: Disable caching for API responses
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

// OPTIONS handler
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// ============================================
// SYNC ENDPOINTS - MAIN API
// ============================================

// GET: Fetch data from PostgreSQL
app.get('/api/sync', async (req: Request, res: Response) => {
  try {
    const entry = await prisma.kantaStore.findUnique({
      where: { id: 'production' },
      select: { data: true, updatedAt: true },
    });

    if (entry) {
      res.status(200).json(entry.data);
    } else {
      res.status(200).json({ empty: true });
    }
  } catch (error: any) {
    console.error('DB Fetch Error:', error.message);

    // Handle case where table might not exist yet
    if (error.code === 'P2021' || error.message.includes('does not exist')) {
      return res.status(200).json({ empty: true });
    }

    return res.status(500).json({
      error: error.message || 'Database Connection Error',
      details: 'Ensure DATABASE_URL is set correctly.',
    });
  }
});

// POST: Save data to PostgreSQL with auth
app.post('/api/sync', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;

    // Authentication check
    if (authHeader !== 'Bearer KANTA0910') {
      console.warn('Unauthorized sync attempt from', req.ip);
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const body = req.body;
    if (!body || typeof body !== 'object') {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    // Verify payload size
    const payloadSize = Buffer.byteLength(JSON.stringify(body), 'utf-8');
    const payloadMB = payloadSize / (1024 * 1024);
    if (payloadMB > 4.4) {
      return res.status(413).json({
        error: `Payload too large (${payloadMB.toFixed(2)}MB)`,
        maxSize: '4.5MB',
      });
    }

    // Upsert: Create if doesn't exist, update if it does
    const result = await prisma.kantaStore.upsert({
      where: { id: 'production' },
      update: { data: body },
      create: { id: 'production', data: body },
      select: { id: true, updatedAt: true },
    });

    console.log('✓ Data saved to database successfully at', result.updatedAt);
    return res.status(200).json({
      success: true,
      timestamp: result.updatedAt,
      message: 'Data synchronized to database',
    });
  } catch (error: any) {
    console.error('Prisma Fatal Error:', error.message);
    return res.status(500).json({
      error: error.message || 'Database Connection Error',
      details: 'Ensure DATABASE_URL is set correctly.',
      code: error.code,
    });
  }
});

// Health check endpoint
app.get('/api/health', async (req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Database connection failed' });
  }
});

// ============================================
// STATIC FILE SERVING (for production builds)
// ============================================
// In Vercel, the frontend is typically built separately, but we support serving it here
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// SPA fallback: serve index.html for non-API routes
app.use((req: Request, res: Response) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(distPath, 'index.html'), (err) => {
      if (err) {
        res.status(404).json({ error: 'Not Found' });
      }
    });
  } else {
    res.status(404).json({ error: 'Not Found' });
  }
});

// ============================================
// ERROR HANDLING
// ============================================
app.use((err: any, req: Request, res: Response) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Export for Vercel
export default app;

// Always listen on the provided PORT or 5000 for Replit compatibility
const PORT = parseInt(process.env.PORT || '5000', 10);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✓ Server running on http://0.0.0.0:${PORT}`);
});
