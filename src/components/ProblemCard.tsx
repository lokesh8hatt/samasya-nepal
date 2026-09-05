import Link from "next/link";
import type { Problem } from "@/generated/prisma/client";
import { getImpactScore } from "@/lib/scoring";

export function ProblemCard({ problem }: { problem: Problem }) {
  const score = getImpactScore(problem);
  return (
    <Link
      href={`/problems/${problem.id}`}
      className="group flex flex-col gap-2 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="flex items-center justify-between">
        <span className="w-fit rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
          {problem.category}
        </span>
        <span
          title="Impact score: rewards a quantified scale, a real citation, and a detailed description"
          className="text-xs font-semibold text-zinc-400 dark:text-zinc-600"
        >
          {score}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-zinc-950 group-hover:underline dark:text-zinc-50">
        {problem.title}
      </h3>
      <p className="line-clamp-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        {problem.description}
      </p>
      {problem.scale && (
        <p className="mt-auto text-xs font-medium text-zinc-800 dark:text-zinc-300">
          {problem.scale}
        </p>
      )}
    </Link>
  );
}
