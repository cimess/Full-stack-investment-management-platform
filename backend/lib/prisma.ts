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
// Check multiple locations for resilience
const pathsToCheck = [
  path.resolve(__dirname, "../certs/ca.pem"),    // local development
  path.resolve(__dirname, "../../certs/ca.pem"), // production (running from dist/)
  path.resolve(process.cwd(), "ca.pem"),         // Case where Render puts it in root
  path.resolve(process.cwd(), "backend/ca.pem"),  // Case where it's at repo root
];

const caPath = pathsToCheck.find(p => fs.existsSync(p));

let sslConfig: any = { rejectUnauthorized: true };

if (caPath) {
  sslConfig.ca = fs.readFileSync(caPath).toString();
} else {
  console.warn("CA Certificate not found. Checked paths:", pathsToCheck);
}

const pool = new Pool({
  connectionString,
  ssl: sslConfig,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export { prisma };
