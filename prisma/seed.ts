import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import problems from "./data/problems.json";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
});
const prisma = new PrismaClient({ adapter });

type SeedProblem = {
  title: string;
  category: string;
  description: string;
  severity_or_scale?: string;
  source?: string;
};

async function main() {
  const data = problems as SeedProblem[];

  await prisma.problem.deleteMany();
  await prisma.$executeRawUnsafe(
    `DELETE FROM sqlite_sequence WHERE name = 'Problem'`
  );

  for (const p of data) {
    await prisma.problem.create({
      data: {
        title: p.title,
        category: p.category,
        description: p.description,
        scale: p.severity_or_scale ?? null,
        source: p.source ?? null,
      },
    });
  }

  console.log(`Seeded ${data.length} problems.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
