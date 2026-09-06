import { prisma } from "@/lib/prisma";
import { sortByImpactScore } from "@/lib/scoring";

export async function getStats() {
  const [total, categoryRows] = await Promise.all([
    prisma.problem.count({ where: { approved: true } }),
    prisma.problem.findMany({
      where: { approved: true },
      distinct: ["category"],
      select: { category: true },
    }),
  ]);
  return { total, categoryCount: categoryRows.length };
}

export async function getCategoriesWithCounts() {
  const rows = await prisma.problem.groupBy({
    by: ["category"],
    where: { approved: true },
    _count: { _all: true },
    orderBy: { category: "asc" },
  });
  return rows
    .map((r) => ({ category: r.category, count: r._count._all }))
    .sort((a, b) => b.count - a.count);
}

export async function getFilteredProblems(filters: {
  q?: string;
  category?: string;
  sort?: "score" | "title";
}) {
  const q = filters.q?.trim() ?? "";
  const category = filters.category ?? "";
  const problems = await prisma.problem.findMany({
    where: {
      approved: true,
      AND: [
        category ? { category } : {},
        q
          ? {
              OR: [
                { title: { contains: q } },
                { description: { contains: q } },
              ],
            }
          : {},
      ],
    },
    orderBy: { title: "asc" },
  });
  return filters.sort === "score" ? sortByImpactScore(problems) : problems;
}

export async function getPaginatedProblems(filters: {
  q?: string;
  category?: string;
  sort?: "score" | "title";
  page?: number;
  pageSize?: number;
}) {
  const pageSize = filters.pageSize ?? 24;
  const all = await getFilteredProblems(filters);
  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.min(Math.max(1, filters.page ?? 1), totalPages);
  const start = (page - 1) * pageSize;
  return {
    items: all.slice(start, start + pageSize),
    total,
    page,
    totalPages,
    pageSize,
  };
}

export async function getProblemById(id: number) {
  return prisma.problem.findFirst({ where: { id, approved: true } });
}

export async function getRelatedProblems(category: string, excludeId: number) {
  return prisma.problem.findMany({
    where: { category, approved: true, NOT: { id: excludeId } },
    take: 4,
    orderBy: { id: "asc" },
  });
}

export async function getFeaturedProblems(take: number) {
  const problems = await prisma.problem.findMany({
    where: { approved: true },
  });
  return sortByImpactScore(problems).slice(0, take);
}

export async function getPendingProblems() {
  return prisma.problem.findMany({
    where: { approved: false },
    orderBy: { createdAt: "asc" },
  });
}
