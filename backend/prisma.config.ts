import "dotenv/config";
import { defineConfig } from "@prisma/config";


export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.NODE_ENV === "production"
      ? process.env.DATABASE_URL!
      : process.env.LOCAL_DATABASE_URL!
  },
});
