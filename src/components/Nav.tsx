import Link from "next/link";

export function Nav() {
  return (
    <nav className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-black/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50"
        >
          🇳🇵 Samasya Nepal
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <Link
            href="/problems?sort=score"
            className="transition-colors hover:text-zinc-950 dark:hover:text-zinc-50"
          >
            Top problems
          </Link>
          <Link
            href="/problems"
            className="transition-colors hover:text-zinc-950 dark:hover:text-zinc-50"
          >
            Browse problems
          </Link>
          <Link
            href="/submit"
            className="transition-colors hover:text-zinc-950 dark:hover:text-zinc-50"
          >
            Submit a problem
          </Link>
          <Link
            href="/about"
            className="transition-colors hover:text-zinc-950 dark:hover:text-zinc-50"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}
