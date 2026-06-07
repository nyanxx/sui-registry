"use client";
import Link from "next/link";
import { MatrixBg } from "@/components/pets/matrix-bg";
import { Vignette } from "@/components/pets/vignette";
import { ScanLine } from "@/components/pets/scan-line";
import { GradientLine } from "@/components/pets/gradient-line";
import { Glitch } from "@/components/pets/glitch";
import { Flicker } from "@/components/pets/flicker";
import {
  Terminal,
  TerminalArg,
  TerminalBody,
  TerminalCommand,
  TerminalCursor,
  TerminalError,
  TerminalFlag,
  TerminalOutput,
  TerminalPrompt,
  TerminalTitleBar,
} from "@/components/pets/terminal";

export default function NotFoundPage() {
  const resolvedPath =
    typeof window !== "undefined" ? window.location.pathname : "/unknown";
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#02040c] px-4 py-20">
      <MatrixBg className="w-full h-full" speed={20} />
      <Vignette />
      <ScanLine />

      <Flicker>
        <div className="relative z-30 w-full max-w-160 text-center">
          <p className="mb-10 font-mono text-[11px] tracking-[0.2em] text-[#4fa3e0] opacity-70">
            {`SYS:ERROR \u00a0|\u00a0 CODE 404 \u00a0|\u00a0 PATH_NOT_RESOLVED`}
          </p>{" "}
          {/* glitch */}
          <Glitch color="white" variant="offset" duration={400}>
            <h1 className="text-9xl font-bol text-[#e8f4ff] font-bold leading-none tracking-tight  text-[clamp(120px,22vw,200px)] [text-shadow:0_0_60px_rgba(79,163,224,0.3)]">
              404
            </h1>
          </Glitch>
          <GradientLine className="mb-6 h-px w-full" />
          {/* message */}
          <div className="mb-8 space-y-3">
            <h2 className="font-mono text-[clamp(14px,2.5vw,18px)] font-normal uppercase tracking-[0.15em] text-[#7ab8d8]">
              Page not found
            </h2>
            <p className="font-mono text-[13px] leading-[1.8] tracking-wider text-[#3d6a8a] whitespace-pre-line">
              {`The coordinates you requested do not exist in this dimension.\nThepath may have been moved, deleted, or never existed.`}
            </p>
          </div>
          {/* terminal */}
          <Terminal animated variant={"fancy"} className="mb-6">
            <TerminalTitleBar className="flex-row-reverse" />
            <TerminalBody>
              <TerminalPrompt>
                <TerminalCommand>resolve</TerminalCommand>
                <TerminalFlag>--path</TerminalFlag>
                <TerminalArg>{resolvedPath}</TerminalArg>
                <TerminalCursor className="-translate-y-px" />
              </TerminalPrompt>
              <TerminalOutput>
                <TerminalError>✗ ERROR: destination unreachable</TerminalError>
              </TerminalOutput>
            </TerminalBody>
          </Terminal>
          {/* cta */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center rounded-sm border border-[#4fa3e0] bg-[#4fa3e0] px-6 py-2.5 font-mono text-[12px] uppercase tracking-[0.15em] text-[#02040c] transition-colors hover:border-[#7ab8d8] hover:bg-[#7ab8d8]"
            >
              ← Return home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center rounded-sm border border-[rgba(22,78,144,0.5)] bg-transparent px-6 py-2.5 font-mono text-[12px] uppercase tracking-[0.15em] text-[#4fa3e0] transition-colors hover:border-[#4fa3e0] hover:text-[#7ab8d8]"
            >
              ↩ Go back
            </button>
          </div>
          {/* footer */}
          <p className="mt-12 font-mono text-[11px] tracking-widest text-[#1e3d55]">
            ERR_PATH_404 &nbsp;·&nbsp; SESSION ACTIVE &nbsp;·&nbsp;
            {new Date().toISOString().split("T")[0]}
          </p>
        </div>
      </Flicker>
    </main>
  );
}
