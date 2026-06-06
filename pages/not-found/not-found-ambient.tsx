"use client";

import { Glow, GlowGroup } from "@/components/pets/glow";
import { BgPattern } from "@/components/pets/bg-pattern";
import Link from "next/link";
import { useRouter } from "next/navigation";

function NotFoundBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#faf8f4]">
      <GlowGroup className="h-screen">
        <Glow color="amber" size="lg" className="-left-32 -top-32" />
        <Glow color="amber" size="md" className="-bottom-40 -right-20" />
      </GlowGroup>
      <BgPattern
        pattern="dots"
        opacity="subtle"
        spacing="sm"
        className="mask-b-to-90%"
      />
    </div>
  );
}

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-8 px-4 py-20">
      <NotFoundBackground />
      <span className="inline-block rounded-full border border-amber-300/60 bg-amber-50 px-3 py-1 text-xs font-medium tracking-widest text-amber-700 uppercase">
        Error 404
      </span>
      <p
        className="select-none font-['Georgia',serif] text-[clamp(7rem,20vw,14rem)] font-bold leading-none tracking-tighter text-stone-800"
        aria-hidden="true"
      >
        404
      </p>

      <div className="space-y-3 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-stone-800">
          We lost this page
        </h1>
        <p className="mx-auto max-w-sm text-sm leading-relaxed text-stone-500">
          The page you&apos;re looking for has been moved, renamed, or never
          existed. Double-check the URL or head back home.
        </p>
      </div>

      <div className="flex w-full max-w-xs items-center gap-3">
        <span className="h-px flex-1 bg-stone-200" />
        <span className="text-xs text-stone-300">✦</span>
        <span className="h-px flex-1 bg-stone-200" />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href={"/"}
          className="rounded-full bg-stone-800 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
        >
          Back to home
        </Link>

        <button
          onClick={() => router.back()}
          className="rounded-full border border-stone-300 bg-transparent px-6 py-2.5 text-sm font-medium text-stone-600 transition-colors hover:border-stone-400 hover:text-stone-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-400"
        >
          Go back
        </button>
      </div>
      <p className="text-center text-xs text-stone-400">
        If you think this is a mistake, please contact support.
      </p>
    </main>
  );
}
