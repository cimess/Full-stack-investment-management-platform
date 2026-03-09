import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";


import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import pg from "pg";

import logger from "../winstonlog/logger.js";

const { Pool } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Clean connection string to avoid conflicts
let connectionString =process.env.NODE_ENV === "production" ? `${process.env.DATABASE_URL}` : `${process.env.LOCAL_DATABASE_URL}`;
if (connectionString && connectionString.includes("sslmode=")) {
  connectionString = connectionString.split("?")[0] || "";
}

// Secure SSL configuration: Option B (Verify identity using CA)
const pathsToCheck = [
  path.resolve(__dirname, "../certs/ca.pem"),    // local dev
  path.resolve(__dirname, "../../certs/ca.pem"), // prod (dist/lib/)
  path.resolve(__dirname, "../../ca.pem"),       // prod root (relative to dist/lib)
  path.resolve(process.cwd(), "ca.pem"),         // Current Working Dir
  path.resolve(process.cwd(), "backend/ca.pem"),  // Repo root
];

const caPath = pathsToCheck.find(p => fs.existsSync(p));

let sslConfig: any = process.env.NODE_ENV === "production" ? { rejectUnauthorized: true } : { rejectUnauthorized: false } 

if (process.env.NODE_ENV === "production") {
if (process.env.DATABASE_CA_CERT) {
  logger.info("[Database] Using CA Certificate from: Environment Variable (DATABASE_CA_CERT)");
  // Replace actual newlines if the env var comes with literal \n strings
  sslConfig.ca = process.env.DATABASE_CA_CERT.replace(/\\n/g, "\n");
} else if (caPath) {
  logger.info(`[Database] Using CA Certificate from: ${caPath}`);
  sslConfig.ca = fs.readFileSync(caPath).toString();
} else {
  logger.error("[Database] CA Certificate NOT found. Connection will fail due to strict TLS verification.");
  logger.error(`[Database] Current Directory: ${process.cwd()}`);
  try {
    const files = fs.readdirSync(process.cwd());
    logger.error(`[Database] Files in CWD: ${files.join(", ")}`);
    const parentFiles = fs.readdirSync(path.resolve(process.cwd(), ".."));
    logger.error(`[Database] Files in Parent: ${parentFiles.join(", ")}`);
  } catch (e) {
    logger.error("[Database] Could not list directories.");
  }
}
}
const pool = new Pool({
  connectionString,
  ssl: sslConfig,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export { prisma };
