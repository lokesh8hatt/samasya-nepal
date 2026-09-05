import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProblemCard } from "@/components/ProblemCard";
import { getFilteredProblems } from "@/lib/queries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: rawCategory } = await params;
  const category = decodeURIComponent(rawCategory);
  const problems = await getFilteredProblems({ category });
  if (problems.length === 0) return {};

  const description = `${problems.length} real, sourced problems in Nepal's ${category} sector — browse them for your next startup idea.`;
  return {
    title: `${category} problems in Nepal`,
    description,
    alternates: { canonical: `/category/${encodeURIComponent(category)}` },
    openGraph: { title: `${category} problems in Nepal`, description },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: rawCategory } = await params;
  const category = decodeURIComponent(rawCategory);
  const problems = await getFilteredProblems({ category });

  if (problems.length === 0) {
    notFound();
  }

  return (
    <div>
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <Link
            href="/problems"
            className="text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
          >
            ← All problems
          </Link>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            {category}
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            {problems.length} problem{problems.length === 1 ? "" : "s"} in
            this sector.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem) => (
            <li key={problem.id}>
              <ProblemCard problem={problem} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
