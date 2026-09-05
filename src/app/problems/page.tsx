import Link from "next/link";
import { ProblemCard } from "@/components/ProblemCard";
import { getCategoriesWithCounts, getFilteredProblems } from "@/lib/queries";

type Filters = { q: string; category: string; sort: string };

function buildHref(overrides: Partial<Filters>, current: Filters) {
  const merged = { ...current, ...overrides };
  const params = new URLSearchParams();
  if (merged.q) params.set("q", merged.q);
  if (merged.category) params.set("category", merged.category);
  if (merged.sort) params.set("sort", merged.sort);
  const qs = params.toString();
  return qs ? `/problems?${qs}` : "/problems";
}

export const metadata = {
  title: "Browse problems",
  description:
    "Search and filter real, sourced problems in Nepal by sector — agriculture, healthcare, fintech, tourism, governance, and more.",
  alternates: { canonical: "/problems" },
};

export default async function ProblemsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const q = params.q?.trim() ?? "";
  const category = params.category ?? "";
  const sort = params.sort === "score" ? "score" : "";
  const current: Filters = { q, category, sort };

  const [problems, categories] = await Promise.all([
    getFilteredProblems({ q, category, sort: sort === "score" ? "score" : "title" }),
    getCategoriesWithCounts(),
  ]);

  return (
    <div>
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            {sort === "score" ? "Top problems" : "Browse problems"}
          </h1>
          <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
            {problems.length} shown
            {sort === "score"
              ? " — ranked by impact score, highest first."
              : " — search or filter by sector to find a problem worth solving."}
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <form
          action="/problems"
          method="GET"
          className="mb-6 flex flex-col gap-3 sm:flex-row"
        >
          <input type="hidden" name="category" value={category} />
          <input type="hidden" name="sort" value={sort} />
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Search problems (e.g. remittance, healthcare, farming)..."
            className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          />
          <button
            type="submit"
            className="shrink-0 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          >
            Search
          </button>
        </form>

        <div className="mb-4 flex gap-2">
          <Link
            href={buildHref({ sort: "" }, current)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              sort !== "score"
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "bg-white text-zinc-700 ring-1 ring-inset ring-zinc-300 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-300 dark:ring-zinc-700 dark:hover:bg-zinc-800"
            }`}
          >
            A–Z
          </Link>
          <Link
            href={buildHref({ sort: "score" }, current)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              sort === "score"
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "bg-white text-zinc-700 ring-1 ring-inset ring-zinc-300 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-300 dark:ring-zinc-700 dark:hover:bg-zinc-800"
            }`}
          >
            Top impact
          </Link>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          <Link
            href={buildHref({ category: undefined }, current)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              category === ""
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "bg-white text-zinc-700 ring-1 ring-inset ring-zinc-300 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-300 dark:ring-zinc-700 dark:hover:bg-zinc-800"
            }`}
          >
            All
          </Link>
          {categories.map(({ category: cat, count }) => (
            <Link
              key={cat}
              href={buildHref({ category: cat }, current)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                category === cat
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "bg-white text-zinc-700 ring-1 ring-inset ring-zinc-300 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-300 dark:ring-zinc-700 dark:hover:bg-zinc-800"
              }`}
            >
              {cat} <span className="text-zinc-400">({count})</span>
            </Link>
          ))}
        </div>

        {problems.length === 0 ? (
          <p className="rounded-lg border border-dashed border-zinc-300 p-8 text-center text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
            No problems match your search. Try a different keyword or clear
            the filter.
          </p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {problems.map((problem) => (
              <li key={problem.id}>
                <ProblemCard problem={problem} />
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
