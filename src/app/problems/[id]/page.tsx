import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProblemCard } from "@/components/ProblemCard";
import { getProblemById, getRelatedProblems } from "@/lib/queries";
import { getImpactScore } from "@/lib/scoring";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const problem = await getProblemById(Number(id));
  if (!problem) return {};

  const description = problem.description.slice(0, 155);
  return {
    title: problem.title,
    description,
    alternates: { canonical: `/problems/${problem.id}` },
    openGraph: { title: problem.title, description },
  };
}

export default async function ProblemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const problem = await getProblemById(Number(id));

  if (!problem) {
    notFound();
  }

  const related = await getRelatedProblems(problem.category, problem.id);
  const score = getImpactScore(problem);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Problems",
        item: `${SITE_URL}/problems`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: problem.category,
        item: `${SITE_URL}/category/${encodeURIComponent(problem.category)}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: problem.title,
        item: `${SITE_URL}/problems/${problem.id}`,
      },
    ],
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-zinc-500 dark:text-zinc-500">
        <Link
          href="/problems"
          className="hover:text-zinc-800 dark:hover:text-zinc-300"
        >
          ← All problems
        </Link>
        <span>/</span>
        <Link
          href={`/category/${encodeURIComponent(problem.category)}`}
          className="hover:text-zinc-800 dark:hover:text-zinc-300"
        >
          {problem.category}
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <span className="w-fit rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
          {problem.category}
        </span>
        <span
          title="Impact score: rewards a quantified scale, a real citation, and a detailed description"
          className="rounded-full border border-zinc-300 px-2.5 py-1 text-xs font-semibold text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
        >
          Impact score: {score}
        </span>
      </div>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
        {problem.title}
      </h1>
      <p className="mt-4 text-base leading-7 text-zinc-700 dark:text-zinc-300">
        {problem.description}
      </p>

      <dl className="mt-8 grid gap-4 rounded-xl border border-zinc-200 bg-white p-5 text-sm dark:border-zinc-800 dark:bg-zinc-900 sm:grid-cols-2">
        <div>
          <dt className="font-medium text-zinc-500 dark:text-zinc-400">
            Scale / impact
          </dt>
          <dd className="mt-1 text-zinc-800 dark:text-zinc-200">
            {problem.scale ?? "Impact not quantified"}
          </dd>
        </div>
        <div>
          <dt className="font-medium text-zinc-500 dark:text-zinc-400">
            Source
          </dt>
          <dd className="mt-1 text-zinc-800 dark:text-zinc-200">
            {problem.source && problem.source !== "general knowledge" ? (
              <a
                href={problem.source}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-zinc-600 dark:hover:text-zinc-400"
              >
                {problem.source}
              </a>
            ) : (
              "General knowledge"
            )}
          </dd>
        </div>
      </dl>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
            More in {problem.category}
          </h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {related.map((r) => (
              <li key={r.id}>
                <ProblemCard problem={r} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
