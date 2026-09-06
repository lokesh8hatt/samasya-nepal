import Link from "next/link";

export function Nav() {
  return (
    <nav className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-black/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50"
        >
          🇳🇵 Samasya Nepal
        </Link>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium text-zinc-600 dark:text-zinc-400 sm:gap-x-6">
          <Link
            href="/problems?sort=score"
            className="whitespace-nowrap transition-colors hover:text-zinc-950 dark:hover:text-zinc-50"
          >
            Top problems
          </Link>
          <Link
            href="/problems"
            className="whitespace-nowrap transition-colors hover:text-zinc-950 dark:hover:text-zinc-50"
          >
            Browse problems
          </Link>
          <Link
            href="/submit"
            className="whitespace-nowrap transition-colors hover:text-zinc-950 dark:hover:text-zinc-50"
          >
            Submit a problem
          </Link>
          <Link
            href="/about"
            className="whitespace-nowrap transition-colors hover:text-zinc-950 dark:hover:text-zinc-50"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}
