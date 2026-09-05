import { notFound } from "next/navigation";
import { approveProblem, rejectProblem } from "@/app/actions";
import { getPendingProblems } from "@/lib/queries";

export default async function ModeratePage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;

  if (!process.env.ADMIN_SECRET || key !== process.env.ADMIN_SECRET) {
    notFound();
  }

  const pending = await getPendingProblems();

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
        Pending submissions
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        {pending.length} awaiting review.
      </p>

      {pending.length === 0 ? (
        <p className="mt-8 text-zinc-500 dark:text-zinc-500">
          Nothing in the queue right now.
        </p>
      ) : (
        <ul className="mt-8 flex flex-col gap-4">
          {pending.map((problem) => (
            <li
              key={problem.id}
              className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <span className="w-fit rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                {problem.category}
              </span>
              <h2 className="mt-2 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                {problem.title}
              </h2>
              <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {problem.description}
              </p>
              {problem.scale && (
                <p className="mt-2 text-xs font-medium text-zinc-800 dark:text-zinc-300">
                  Scale: {problem.scale}
                </p>
              )}
              {problem.source && (
                <p className="mt-1 text-xs text-zinc-500">
                  Source: {problem.source}
                </p>
              )}
              <div className="mt-4 flex gap-3">
                <form action={approveProblem}>
                  <input type="hidden" name="id" value={problem.id} />
                  <input type="hidden" name="key" value={key} />
                  <button
                    type="submit"
                    className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
                  >
                    Approve
                  </button>
                </form>
                <form action={rejectProblem}>
                  <input type="hidden" name="id" value={problem.id} />
                  <input type="hidden" name="key" value={key} />
                  <button
                    type="submit"
                    className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
                  >
                    Reject
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
