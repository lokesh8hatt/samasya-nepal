import Link from "next/link";
import { ProblemCard } from "@/components/ProblemCard";
import {
  getCategoriesWithCounts,
  getFeaturedProblems,
  getStats,
} from "@/lib/queries";

export default async function Home() {
  const [stats, categories, featured] = await Promise.all([
    getStats(),
    getCategoriesWithCounts(),
    getFeaturedProblems(6),
  ]);

  const topCategories = categories.slice(0, 12);
  const maxCount = Math.max(...topCategories.map((c) => c.count), 1);

  return (
    <div>
      <section className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl dark:text-zinc-50">
            Real problems in Nepal, worth building for.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
            A researched, sourced list of everyday pain points — across
            agriculture, healthcare, fintech, tourism, governance, and more —
            for founders who want to build something that matters.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/problems"
              className="rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
            >
              Browse all problems
            </Link>
            <Link
              href="/about"
              className="rounded-lg border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
            >
              Why this exists
            </Link>
          </div>
          <div className="mx-auto mt-12 flex max-w-md justify-center gap-12">
            <div>
              <p className="text-3xl font-semibold text-zinc-950 dark:text-zinc-50">
                {stats.total}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-500">
                problems documented
              </p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-zinc-950 dark:text-zinc-50">
                {stats.categoryCount}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-500">
                sectors covered
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Explore by sector
          </h2>
          <Link
            href="/problems"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            View all {categories.length} sectors →
          </Link>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {topCategories.map(({ category, count }) => (
            <li key={category}>
              <Link
                href={`/category/${encodeURIComponent(category)}`}
                className="block rounded-xl border border-zinc-200 bg-white p-4 transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                    {category}
                  </span>
                  <span className="text-sm text-zinc-500 dark:text-zinc-500">
                    {count}
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800">
                  <div
                    className="h-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100"
                    style={{ width: `${(count / maxCount) * 100}%` }}
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Featured problems
          </h2>
          <Link
            href="/problems"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            View all →
          </Link>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((problem) => (
            <li key={problem.id}>
              <ProblemCard problem={problem} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
