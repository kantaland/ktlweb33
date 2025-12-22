
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

// Use same logic as sync.js for consistency
let prisma;
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient().$extends(withAccelerate());
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient().$extends(withAccelerate());
  }
  prisma = global.prisma;
}

export default async function handler(request, response) {
  try {
    console.log("Running DB Setup...");
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "kanta_store" (
        "id" TEXT NOT NULL,
        "data" JSONB NOT NULL,
        CONSTRAINT "kanta_store_pkey" PRIMARY KEY ("id")
      );
    `;
    
    return response.status(200).json({ 
      success: true, 
      message: "Database initialized successfully via Prisma Accelerate."
    });
  } catch (error) {
    console.error("Setup Error:", error);
    return response.status(500).json({ error: error.message });
  }
}
