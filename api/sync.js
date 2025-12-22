
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

// Initialize Prisma Client with Accelerate
// Using a global variable to prevent multiple instances in serverless environment
let prisma;

const getPrisma = () => {
    if (!prisma) {
        if (process.env.NODE_ENV === 'production') {
            prisma = new PrismaClient().$extends(withAccelerate());
        } else {
            if (!global.prisma) {
                global.prisma = new PrismaClient().$extends(withAccelerate());
            }
            prisma = global.prisma;
        }
    }
    return prisma;
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4.5mb',
    },
  },
};

export default async function handler(request, response) {
  // CORS Headers
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  response.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
  
  response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  try {
    const db = getPrisma();

    // GET REQUEST: Fetch Data
    if (request.method === 'GET') {
      try {
        const entry = await db.kantaStore.findUnique({
          where: { id: 'production' }
        });
        
        if (entry) {
          return response.status(200).json(entry.data);
        } else {
          return response.status(200).json({ empty: true });
        }
      } catch (error) {
        console.error("DB Fetch Error:", error);
        // Handle case where table might not exist yet (P2021)
        if (error.code === 'P2021' || error.message.includes('does not exist')) {
           return response.status(200).json({ empty: true });
        }
        throw error;
      }
    } 
    
    // POST REQUEST: Save Data
    if (request.method === 'POST') {
      const authHeader = request.headers.authorization;
      if (authHeader !== 'Bearer KANTA0910') {
        return response.status(401).json({ error: 'Unauthorized' });
      }

      const body = request.body;

      // Upsert: Create if doesn't exist, update if it does
      await db.kantaStore.upsert({
        where: { id: 'production' },
        update: { data: body },
        create: { id: 'production', data: body },
      });
      
      return response.status(200).json({ success: true });
    }

    return response.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error("Prisma Fatal Error:", error);
    return response.status(500).json({ 
      error: error.message || 'Database Connection Error',
      details: 'Ensure DATABASE_URL is set correctly in Vercel/Environment.' 
    });
  }
}
