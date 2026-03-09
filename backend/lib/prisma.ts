import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";


import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import pg from "pg";

const { Pool } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connectionString = `${process.env.DATABASE_URL}`;

// Secure SSL configuration: Option B (Verify identity using CA)
const caPath = path.resolve(__dirname, "../certs/ca.pem");
let sslConfig: any = { rejectUnauthorized: true };

if (fs.existsSync(caPath)) {
  sslConfig.ca = fs.readFileSync(caPath).toString();
} else {
  // Fallback for local development or if file is missing (only if not strictly enforced)
  // For production with Render Secret Files, the path above will be correct.
  console.warn("CA Certificate not found at", caPath, ". SSL verification might fail if not provided via environment.");
}

const pool = new Pool({
  connectionString,
  ssl: sslConfig,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export { prisma };
