"use client";
import {
  RevealAction,
  RevealItem,
  RevealProvider,
} from "@/components/interactive/reveal-item";

const faqs = [
  {
    id: "1",
    question: "What is this UI library?",
    answer:
      "A collection of copy-paste components and sections built with Tailwind CSS and Radix primitives. No bloat, just what you need.",
  },
  {
    id: "2",
    question: "Do I need to install anything?",
    answer:
      "Just run pnpm dlx @nyanxx/sui add section faq and the files land directly in your project. No extra runtime dependencies.",
  },
  {
    id: "3",
    question: "Can I customize the components?",
    answer:
      "Yes — since the files are copied into your project, you own them completely. Edit them however you want.",
  },
];

export function FaqSection() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-16">
      <h2 className="mb-2 text-3xl font-bold tracking-tight">
        Frequently asked questions
      </h2>
      <p className="mb-10 text-muted-foreground">
        Everything you need to know about the library.
      </p>

      <div className="flex flex-col gap-4">
        {faqs.map((faq) => (
          <RevealProvider key={faq.id}>
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between gap-4">
                <span className="font-medium">{faq.question}</span>
                <RevealAction />
              </div>
              <RevealItem className="mt-3 text-sm text-muted-foreground">
                {faq.answer}
              </RevealItem>
            </div>
          </RevealProvider>
        ))}
      </div>
    </section>
  );
}
