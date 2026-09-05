export const metadata = {
  title: "About",
  description:
    "Why Samasya Nepal exists, how problems are researched and sourced, and how the impact score works.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
        About this project
      </h1>
      <div className="mt-6 space-y-5 text-base leading-7 text-zinc-700 dark:text-zinc-300">
        <p>
          Most new founders start by brainstorming another food delivery app
          or another AI wrapper. Real, high-intent problems — the kind
          people actually complain about every day — are harder to find than
          they should be.
        </p>
        <p>
          <a
            href="https://razorpay.com/m/fix-my-itch/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-2 hover:text-zinc-500"
          >
            Razorpay&apos;s Fix My Itch
          </a>{" "}
          tackled this for India: a curated, AI- and human-researched list of
          10,000+ real problems, organized so founders can browse by sector
          instead of guessing. Samasya Nepal — &quot;samasya&quot; meaning
          problem in Nepali — applies the same idea to Nepal.
        </p>
        <p>
          Every entry here is researched from Nepali news outlets, government
          and NGO reports, and well-established public knowledge — never
          invented. Where a problem&apos;s scale is backed by a real number,
          we cite it. Where it isn&apos;t, we say so plainly rather than
          making one up.
        </p>
        <p>
          This is a living list. It keeps growing as more research is added
          — and now, as the community itself submits problems through the{" "}
          <a
            href="/submit"
            className="font-medium underline underline-offset-2 hover:text-zinc-500"
          >
            submission form
          </a>
          . Every submission is reviewed before it goes live, so the list
          stays specific and checkable rather than filling up with vague
          restatements of &quot;healthcare is bad&quot; or &quot;farmers need
          money.&quot;
        </p>
      </div>

      <h2 className="mt-12 text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
        How the impact score works
      </h2>
      <div className="mt-4 space-y-4 text-base leading-7 text-zinc-700 dark:text-zinc-300">
        <p>
          Every problem gets a 0–100 impact score, visible on its card and
          detail page, and used to power the &quot;Top impact&quot; sort on
          the browse page. It&apos;s a simple, transparent formula — not a
          black box:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Starts at a base of 45</li>
          <li>+25 if the problem has a quantified scale (a real number, not &quot;impact not quantified&quot;)</li>
          <li>+20 if it cites a real, named source rather than &quot;general knowledge&quot;</li>
          <li>up to +10 for a detailed, specific description</li>
        </ul>
        <p>
          It rewards exactly the things that make a problem buildable: you
          know how big it is, you can verify it, and it&apos;s specific
          enough to picture a product against.
        </p>
      </div>
    </div>
  );
}
