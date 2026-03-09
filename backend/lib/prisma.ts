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
// Check both ../certs (dev) and ../../certs (prod dist)
const devCaPath = path.resolve(__dirname, "../certs/ca.pem");
const prodCaPath = path.resolve(__dirname, "../../certs/ca.pem");
const caPath = fs.existsSync(prodCaPath) ? prodCaPath : devCaPath;

let sslConfig: any = { rejectUnauthorized: true };

if (fs.existsSync(caPath)) {
  sslConfig.ca = fs.readFileSync(caPath).toString();
} else {
  console.warn("CA Certificate not found at", caPath, ". SSL verification might fail.");
}

const pool = new Pool({
  connectionString,
  ssl: sslConfig,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export { prisma };
