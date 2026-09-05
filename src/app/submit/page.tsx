import { submitProblem } from "@/app/actions";
import { getCategoriesWithCounts } from "@/lib/queries";

export const metadata = {
  title: "Submit a problem",
  description:
    "Submit a real, specific problem you've noticed in Nepal — reviewed before it goes live on Samasya Nepal.",
  alternates: { canonical: "/submit" },
};

export default async function SubmitPage({
  searchParams,
}: {
  searchParams: Promise<{ submitted?: string; error?: string }>;
}) {
  const { submitted, error } = await searchParams;
  const categories = await getCategoriesWithCounts();

  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
        Submit a problem
      </h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        See a real, specific problem in Nepal that belongs on this list?
        Submit it below. Every submission is reviewed before it goes live —
        we&apos;d rather have 300 well-checked problems than 10,000 vague
        ones.
      </p>

      {submitted && (
        <div className="mt-6 rounded-lg border border-green-300 bg-green-50 p-4 text-sm text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-300">
          Thanks — your submission is in the review queue.
        </div>
      )}
      {error === "missing" && (
        <div className="mt-6 rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-300">
          Please fill in a title, category, and description.
        </div>
      )}

      <form action={submitProblem} className="mt-8 flex flex-col gap-5">
        {/* Honeypot field — hidden from real users, bots often fill it in */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <div>
          <label className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Title
          </label>
          <input
            type="text"
            name="title"
            required
            maxLength={140}
            placeholder="Short, specific problem statement"
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Category
          </label>
          <input
            type="text"
            name="category"
            required
            list="category-options"
            placeholder="e.g. Healthcare, or pick an existing sector"
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          />
          <datalist id="category-options">
            {categories.map(({ category }) => (
              <option key={category} value={category} />
            ))}
          </datalist>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Description
          </label>
          <textarea
            name="description"
            required
            maxLength={2000}
            rows={5}
            placeholder="Who is affected, why it happens, and what the current gap is"
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Scale / impact{" "}
            <span className="font-normal text-zinc-500">(optional)</span>
          </label>
          <input
            type="text"
            name="scale"
            maxLength={300}
            placeholder="A real number if you have one, otherwise leave blank"
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Source link{" "}
            <span className="font-normal text-zinc-500">(optional)</span>
          </label>
          <input
            type="url"
            name="source"
            maxLength={300}
            placeholder="https://..."
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>

        <button
          type="submit"
          className="mt-2 rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
        >
          Submit for review
        </button>
      </form>
    </div>
  );
}
