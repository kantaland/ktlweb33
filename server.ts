import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const prisma = new PrismaClient();
const PORT = parseInt(process.env.PORT || '5000', 10);

// Middleware
app.use(cors());
app.use(express.json({ limit: '4.5mb' }));

// CORS Headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  next();
});

// OPTIONS handler using middleware
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// GET: Fetch data from PostgreSQL
app.get('/api/sync', async (req: Request, res: Response) => {
  try {
    const entry = await prisma.kantaStore.findUnique({
      where: { id: 'production' }
    });

    if (entry) {
      return res.status(200).json(entry.data);
    } else {
      return res.status(200).json({ empty: true });
    }
  } catch (error: any) {
    console.error("DB Fetch Error:", error);
    
    // Handle case where table might not exist yet (P2021)
    if (error.code === 'P2021' || error.message.includes('does not exist')) {
      return res.status(200).json({ empty: true });
    }
    
    return res.status(500).json({
      error: error.message || 'Database Connection Error',
      details: 'Ensure DATABASE_URL is set correctly.'
    });
  }
});

// POST: Save data to PostgreSQL
app.post('/api/sync', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    
    // Check authorization
    if (authHeader !== 'Bearer KANTA0910') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const body = req.body;

    // Upsert: Create if doesn't exist, update if it does
    await prisma.kantaStore.upsert({
      where: { id: 'production' },
      update: { data: body },
      create: { id: 'production', data: body }
    });

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error("Prisma Fatal Error:", error);
    return res.status(500).json({
      error: error.message || 'Database Connection Error',
      details: 'Ensure DATABASE_URL is set correctly.'
    });
  }
});

// Serve built React frontend in production
app.use(express.static(path.join(__dirname, 'dist')));

// Handle SPA routing - serve index.html for all non-API routes
app.use((req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  } else {
    res.status(404).json({ error: 'Not Found' });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
