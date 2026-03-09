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
// Check multiple locations for resilience (certs folder, root, or cwd)
const pathsToCheck = [
  path.resolve(__dirname, "../certs/ca.pem"),    // dev (from lib/)
  path.resolve(__dirname, "../../certs/ca.pem"), // prod (dist/lib/)
  path.resolve(__dirname, "../../../ca.pem"),    // root relative to dist
  path.resolve(process.cwd(), "ca.pem"),         // Current Working Dir
  path.resolve(process.cwd(), "backend/ca.pem"),  // Repo root (if root is above backend)
];

const caPath = pathsToCheck.find(p => fs.existsSync(p));

let sslConfig: any = { rejectUnauthorized: true };

if (caPath) {
  console.log(`[Database] Found CA Certificate at: ${caPath}`);
  sslConfig.ca = fs.readFileSync(caPath).toString();
} else {
  console.error("[Database] CA Certificate NOT found. Checked paths:", pathsToCheck);
}

const pool = new Pool({
  connectionString,
  ssl: sslConfig,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export { prisma };
