"use client";
import { BgPattern } from "@/components/pets/bg-pattern";
import { CodeBlock } from "@/components/pets/code-block";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/pets/tabs";

interface SnippetCardProps {
  snippet: Snippet;
}

function SnippetCard({ snippet }: SnippetCardProps) {
  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        {/* tab */}
        <Tabs defaultValue="preview">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="preview">
            <div className="flex min-h-45 items-center justify-center bg-[#fafafa] p-10">
              {/* bg-muted  */}
              {snippet.preview}
            </div>
          </TabsContent>
          <TabsContent value="code">
            <CodeBlock
              code={snippet.code}
              language="tsx"
              theme="dracula"
              showLines
            />
          </TabsContent>
        </Tabs>
      </div>
      {/* snippet meta */}
      <div className="mt-3 space-y-0.5 px-1">
        <p className="text-[13px] font-semibold tracking-tight text-card-foreground">
          {snippet.title}
        </p>
        {snippet.description && (
          <p className="text-[12px] leading-relaxed text-muted-foreground">
            {snippet.description}
          </p>
        )}
      </div>
    </div>
  );
}

export default function CodeShowcasePage() {
  return (
    <>
      <BgPattern
        pattern="plus"
        spacing="sm"
        opacity="soft"
        className="mask-b-to-15%"
      />
      <main className="min-h-screen bg-background text-foreground px-6 py-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-3xl">
          {/* header */}
          <div className="mb-12 border-b border-border/40 pb-8">
            <p className="mb-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              UI Library
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Components
            </h1>
            <p className="mt-2 text-[14px] text-muted-foreground">
              Copy-paste ready UI snippets. Click Code to see the source.
            </p>
          </div>
          {/* snippet card */}
          <div className="grid grid-cols-1 gap-10">
            {SNIPPETS.map((snippet) => (
              <SnippetCard key={snippet.id} snippet={snippet} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

/////////////////////////////////////////////////////////////////////////////////////
/////  snippet-data.tsx
/////////////////////////////////////////////////////////////////////////////////////

// ─── SNIPPETS DATA ────────────────────────────────────────────────────────────
// Add / remove / reorder entries here. Each entry maps to one SnippetCard.

interface Snippet {
  id: string;
  title: string;
  description?: string;
  code: string;
  preview: React.ReactNode;
  language?: string;
}

const SNIPPETS: Snippet[] = [
  {
    id: "badge",
    title: "Badge",
    description: "Compact status label. Swap color via className.",
    language: "tsx",
    code: `function Badge({ label, variant = "default" }: {
  label: string;
  variant?: "default" | "success" | "warning" | "danger";
}) {
  const styles = {
    default: "bg-zinc-100 text-zinc-600",
    success: "bg-emerald-50 text-emerald-700",
    warning: "bg-amber-50 text-amber-700",
    danger:  "bg-red-50 text-red-700",
  };
  return (
    <span className={\`inline-flex items-center rounded-full px-2.5 py-0.5
      text-xs font-medium \${styles[variant]}\`}>
      {label}
    </span>
  );
}`,
    preview: (
      <div className="flex flex-wrap gap-2">
        {[
          { label: "Default", cls: "bg-zinc-100 text-zinc-600" },
          { label: "Success", cls: "bg-emerald-50 text-emerald-700" },
          { label: "Warning", cls: "bg-amber-50 text-amber-700" },
          { label: "Danger", cls: "bg-red-50 text-red-700" },
        ].map((b) => (
          <span
            key={b.label}
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${b.cls}`}
          >
            {b.label}
          </span>
        ))}
      </div>
    ),
  },
  {
    id: "button-group",
    title: "Button Group",
    description: "Segmented control for toggling between options.",
    language: "tsx",
    code: `function ButtonGroup({ options, value, onChange }: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="inline-flex rounded-lg border border-zinc-200 bg-zinc-50 p-1 gap-1">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={\`rounded-md px-3 py-1.5 text-sm font-medium transition-all
            \${value === opt
              ? "bg-white text-zinc-900 shadow-sm"
              : "text-zinc-500 hover:text-zinc-700"}\`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}`,
    preview: <ButtonGroupPreview />,
  },
  {
    id: "inline-input",
    title: "Input with inline label",
    description: "Label floats inside the border. No extra DOM wrapper needed.",
    language: "tsx",
    code: `function InlineInput({ label, type = "text", placeholder }: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="relative w-full max-w-sm">
      <input
        type={type}
        placeholder={placeholder ?? " "}
        className="peer w-full rounded-lg border border-zinc-200 bg-white px-3 pb-2
          pt-5 text-sm text-zinc-900 outline-none transition
          focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
      />
      <label className="pointer-events-none absolute left-3 top-1.5 text-[10px]
        font-medium uppercase tracking-wider text-zinc-400
        transition-all peer-placeholder-shown:top-3.5
        peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case
        peer-placeholder-shown:tracking-normal">
        {label}
      </label>
    </div>
  );
}`,
    preview: (
      <div className="relative w-full max-w-xs">
        <input
          type="text"
          placeholder=" "
          className="peer w-full rounded-lg border border-zinc-200 bg-white px-3 pb-2 pt-5 text-sm text-zinc-900 outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
        />
        <label className="pointer-events-none absolute left-3 top-1.5 text-[10px] font-medium uppercase tracking-wider text-zinc-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal">
          Email address
        </label>
      </div>
    ),
  },
  {
    id: "avatar-stack",
    title: "Avatar Stack",
    description: "Overlapping avatars with overflow count.",
    language: "tsx",
    code: `function AvatarStack({ users, max = 4 }: {
  users: { name: string; color: string }[];
  max?: number;
}) {
  const visible = users.slice(0, max);
  const overflow = users.length - max;
  return (
    <div className="flex items-center -space-x-2">
      {visible.map((u) => (
        <div key={u.name} title={u.name}
          className={\`flex h-8 w-8 items-center justify-center rounded-full
            ring-2 ring-white text-xs font-semibold text-white \${u.color}\`}>
          {u.name[0]}
        </div>
      ))}
      {overflow > 0 && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full
          bg-zinc-100 ring-2 ring-white text-xs font-medium text-zinc-500">
          +{overflow}
        </div>
      )}
    </div>
  );
}`,
    preview: (
      <div className="flex items-center -space-x-2">
        {[
          { name: "Alice", color: "bg-violet-500" },
          { name: "Ben", color: "bg-sky-500" },
          { name: "Carmen", color: "bg-emerald-500" },
          { name: "David", color: "bg-amber-500" },
        ].map((u) => (
          <div
            key={u.name}
            title={u.name}
            className={`flex h-8 w-8 items-center justify-center rounded-full ring-2 ring-white text-xs font-semibold text-white ${u.color}`}
          >
            {u.name[0]}
          </div>
        ))}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 ring-2 ring-white text-xs font-medium text-zinc-500">
          +3
        </div>
      </div>
    ),
  },
];

/////////////////////////////////////////////////////////////////////////////////////
/////  stateful-snippets.tsx
/////////////////////////////////////////////////////////////////////////////////////

// ─── Preview components that need their own state ────────────────────────────
// Any preview that uses hooks must be a proper named component, not an IIFE.

import { useState } from "react";

function ButtonGroupPreview() {
  const opts = ["Day", "Week", "Month"];
  const [val, setVal] = useState("Week");
  return (
    <div className="inline-flex rounded-lg border border-zinc-200 bg-zinc-50 p-1 gap-1">
      {opts.map((opt) => (
        <button
          key={opt}
          onClick={() => setVal(opt)}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
            val === opt
              ? "bg-white text-zinc-900 shadow-sm"
              : "text-zinc-500 hover:text-zinc-700"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
