export function Footer() {
  return (
    <footer className="border-t border-zinc-200 py-10 dark:border-zinc-800">
      <div className="mx-auto max-w-6xl px-6 text-sm text-zinc-500 dark:text-zinc-500">
        <p>
          Samasya Nepal is an independent, community-researched list of real
          problems in Nepal — inspired by{" "}
          <a
            href="https://razorpay.com/m/fix-my-itch/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-zinc-800 dark:hover:text-zinc-300"
          >
            Razorpay&apos;s Fix My Itch
          </a>
          . Built for founders, students, and builders looking for their
          next idea.
        </p>
      </div>
    </footer>
  );
}
