import * as React from "react";
import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/pets/copy-button";

// ─── Tokenizer ────────────────────────────────────────────────────────────────
// Lightweight — no external library. Handles JSX/TSX/JS/CSS well enough.
// Swap for Shiki or Prism if you need full multi-language support.

type Token = { type: string; value: string };

const TOKEN_PATTERNS: [string, RegExp][] = [
  ["comment", /^\/\/[^\n]*/],
  ["comment", /^\/\*[\s\S]*?\*\//],
  ["string", /^`[\s\S]*?`/],
  ["string", /^"(?:[^"\\]|\\.)*"/],
  ["string", /^'(?:[^'\\]|\\.)*'/],
  [
    "keyword",
    /^(?:import|export|default|from|const|let|var|function|return|if|else|type|interface|extends|implements|new|class|async|await|=>)\b/,
  ],
  ["tag", /^<\/?[A-Z][A-Za-z0-9]*/],
  ["tag", /^<\/?[a-z][a-z0-9-]*/],
  ["jsx-end", /^(?:\/?>)/],
  ["number", /^\d+(\.\d+)?/],
  ["operator", /^[{}()[\]=<>!&|.,;:+\-*/^%?]/],
  ["plain", /^[^\s{}<>()[\]=!&|.,;:+\-*/^%?`"']+/],
  ["space", /^\s+/],
];

function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  let rest = code;
  while (rest.length) {
    let matched = false;
    for (const [type, re] of TOKEN_PATTERNS) {
      const m = rest.match(re);
      if (m) {
        tokens.push({ type, value: m[0] });
        rest = rest.slice(m[0].length);
        matched = true;
        break;
      }
    }
    if (!matched) {
      tokens.push({ type: "plain", value: rest[0] });
      rest = rest.slice(1);
    }
  }
  return tokens;
}

// ─── Themes ───────────────────────────────────────────────────────────────────

export type CodeTheme =
  | "material"
  | "dracula"
  | "github-dark"
  | "retro"
  | "github-light"
  | "solarized-light";

type ThemeConfig = {
  bg: string; // code area background
  headerBg: string; // top bar background
  headerBorder: string;
  langColor: string; // language label color
  tokens: Record<string, string>;
};

const THEMES: Record<CodeTheme, ThemeConfig> = {
  material: {
    bg: "bg-[#0d1117]",
    headerBg: "bg-[#090e14]",
    headerBorder: "border-white/5",
    langColor: "text-zinc-600",
    tokens: {
      keyword: "text-[#c792ea]",
      string: "text-[#c3e88d]",
      comment: "text-[#546e7a] italic",
      number: "text-[#f78c6c]",
      tag: "text-[#89ddff]",
      "jsx-end": "text-[#89ddff]",
      operator: "text-[#89ddff]",
      plain: "text-[#eeffff]",
      space: "",
    },
  },
  dracula: {
    bg: "bg-[#282a36]",
    headerBg: "bg-[#1e1f29]",
    headerBorder: "border-white/5",
    langColor: "text-[#6272a4]",
    tokens: {
      keyword: "text-[#ff79c6]",
      string: "text-[#f1fa8c]",
      comment: "text-[#6272a4] italic",
      number: "text-[#bd93f9]",
      tag: "text-[#8be9fd]",
      "jsx-end": "text-[#8be9fd]",
      operator: "text-[#ff79c6]",
      plain: "text-[#f8f8f2]",
      space: "",
    },
  },
  "github-dark": {
    bg: "bg-[#0d1117]",
    headerBg: "bg-[#090c10]",
    headerBorder: "border-white/5",
    langColor: "text-[#8b949e]",
    tokens: {
      keyword: "text-[#ff7b72]",
      string: "text-[#a5d6ff]",
      comment: "text-[#8b949e] italic",
      number: "text-[#79c0ff]",
      tag: "text-[#7ee787]",
      "jsx-end": "text-[#e3b341]",
      operator: "text-[#e3b341]",
      plain: "text-[#c9d1d9]",
      space: "",
    },
  },
  retro: {
    bg: "bg-[#0a0a00]",
    headerBg: "bg-[#060600]",
    headerBorder: "border-[#3a3a00]",
    langColor: "text-[#8a7a00]",
    tokens: {
      keyword: "text-[#e8d000]",
      string: "text-[#80ff80]",
      comment: "text-[#607060] italic",
      number: "text-[#ffaa00]",
      tag: "text-[#00ffcc]",
      "jsx-end": "text-[#00ffcc]",
      operator: "text-[#aaaaaa]",
      plain: "text-[#c8c8b4]",
      space: "",
    },
  },
  "github-light": {
    bg: "bg-[#ffffff]",
    headerBg: "bg-[#f6f8fa]",
    headerBorder: "border-[#d0d7de]",
    langColor: "text-[#57606a]",
    tokens: {
      keyword: "text-[#cf222e]",
      string: "text-[#0a3069]",
      comment: "text-[#6e7781] italic",
      number: "text-[#0550ae]",
      tag: "text-[#116329]",
      "jsx-end": "text-[#953800]",
      operator: "text-[#953800]",
      plain: "text-[#24292f]",
      space: "",
    },
  },
  "solarized-light": {
    bg: "bg-[#fdf6e3]",
    headerBg: "bg-[#eee8d5]",
    headerBorder: "border-[#d3cbb8]",
    langColor: "text-[#93a1a1]",
    tokens: {
      keyword: "text-[#859900]",
      string: "text-[#2aa198]",
      comment: "text-[#93a1a1] italic",
      number: "text-[#d33682]",
      tag: "text-[#268bd2]",
      "jsx-end": "text-[#cb4b16]",
      operator: "text-[#cb4b16]",
      plain: "text-[#657b83]",
      space: "",
    },
  },
};

// ─── CodeBlock ────────────────────────────────────────────────────────────────

type CodeBlockProps = React.ComponentProps<"div"> & {
  code: string;
  language?: string;
  theme?: CodeTheme;
  showLines?: boolean;
  fileName?: string;
};

export function CodeBlock({
  code,
  language = "tsx",
  theme = "material",
  showLines = false,
  fileName,
  className,
  ...props
}: CodeBlockProps) {
  const tokens = React.useMemo(() => tokenize(code), [code]);
  const themeConfig = THEMES[theme];
  const lines = React.useMemo(() => code.split("\n"), [code]);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-b-lg border border-white/5 font-mono text-[13px]",
        themeConfig.bg,
        className,
      )}
      {...props}
    >
      {/* Header — fully themed */}
      <div
        className={cn(
          "flex items-center justify-between border-b px-4 py-2",
          themeConfig.headerBg,
          themeConfig.headerBorder,
        )}
      >
        <span
          className={cn(
            "text-[11px] uppercase tracking-widest",
            themeConfig.langColor,
          )}
        >
          {fileName ?? language}
        </span>
        <CopyButton text={code} variant={"ghost"}/>
      </div>

      {/* Code */}
      <pre className="overflow-x-auto p-5 leading-[1.75]">
        <code>
          {showLines
            ? lines.map((line, i) => (
                <div key={i} className="flex">
                  <span
                    className={cn(
                      "mr-5 w-5 shrink-0 select-none text-right text-xs leading-[1.75]",
                      themeConfig.langColor,
                      "opacity-40",
                    )}
                  >
                    {i + 1}
                  </span>
                  <span>
                    {tokenize(line).map((tok, j) => (
                      <span
                        key={j}
                        className={themeConfig.tokens[tok.type] ?? ""}
                      >
                        {tok.value}
                      </span>
                    ))}
                  </span>
                </div>
              ))
            : tokens.map((tok, i) => (
                <span key={i} className={themeConfig.tokens[tok.type] ?? ""}>
                  {tok.value}
                </span>
              ))}
        </code>
      </pre>
    </div>
  );
}

/**


<CodeBlock code={myCode} theme="dracula" language="tsx" showLines />
<CodeBlock code={myCode} theme="retro" fileName="error.log" />
<CodeBlock
  code={myCode}
  language="tsx"
  theme="dracula"
  showLines
  fileName="components/button.tsx"
/>
 */

/*
  LIGHT THEME ADDITIONS — paste into the THEMES object if needed:

  "github-light": {
    bg:           "bg-[#ffffff]",
    headerBg:     "bg-[#f6f8fa]",
    headerBorder: "border-[#d0d7de]",
    langColor:    "text-[#57606a]",
    tokens: {
      keyword:  "text-[#cf222e]",
      string:   "text-[#0a3069]",
      comment:  "text-[#6e7781] italic",
      number:   "text-[#0550ae]",
      tag:      "text-[#116329]",
      "jsx-end":"text-[#953800]",
      operator: "text-[#953800]",
      plain:    "text-[#24292f]",
      space:    "",
    },
  },

  "solarized-light": {
    bg:           "bg-[#fdf6e3]",
    headerBg:     "bg-[#eee8d5]",
    headerBorder: "border-[#d3cbb8]",
    langColor:    "text-[#93a1a1]",
    tokens: {
      keyword:  "text-[#859900]",
      string:   "text-[#2aa198]",
      comment:  "text-[#93a1a1] italic",
      number:   "text-[#d33682]",
      tag:      "text-[#268bd2]",
      "jsx-end":"text-[#cb4b16]",
      operator: "text-[#cb4b16]",
      plain:    "text-[#657b83]",
      space:    "",
    },
  },
*/
