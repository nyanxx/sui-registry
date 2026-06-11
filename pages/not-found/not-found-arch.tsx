import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="relative flex min-h-screen items-center justify-center px-6">
        <div className="absolute right-[15%] top-[20%] h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

        <div className="max-w-xl text-center">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Ref: 404
          </p>

          <h1 className="font-sans text-4xl font-semibold tracking-tight md:text-5xl">
            No record exists
            <br />
            for this reference.
          </h1>

          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            The page you&apos;re looking for may have been moved, removed, or
            never catalogued.
          </p>

          <p className="mt-2 text-base leading-relaxed text-muted-foreground">
            Continue browsing the archive or return to the studio.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/">
              <Button>Return Home</Button>
            </Link>

            <Link href="/gallery">
              <Button variant="secondary">Browse Gallery</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
