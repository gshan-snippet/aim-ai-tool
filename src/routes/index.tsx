import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Wand2, Target, BookOpen, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Tool & Prompt Optimizer" },
      { name: "description", content: "Turn your idea into a structured execution plan powered by the best AI tools." },
      { property: "og:title", content: "AI Tool & Prompt Optimizer" },
      { property: "og:description", content: "Turn your idea into a structured execution plan powered by the best AI tools." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute -top-40 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -right-32 h-96 w-96 rounded-full bg-accent/40 blur-3xl" />

      <section className="relative mx-auto flex max-w-5xl flex-col items-center px-6 pt-24 pb-16 text-center">
        <div className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-white/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Goal → AI Tools → Execution Path
        </div>
        <h1 className="animate-fade-up text-5xl font-bold tracking-tight md:text-7xl" style={{ animationDelay: "0.05s" }}>
          AI Tool & <span className="text-gradient">Prompt Optimizer</span>
        </h1>
        <p className="animate-fade-up mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl" style={{ animationDelay: "0.15s" }}>
          Turn your idea into a structured execution plan powered by the best AI tools.
        </p>
        <Link
          to="/start"
          className="btn-gradient animate-fade-up mt-10 inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold"
          style={{ animationDelay: "0.25s" }}
        >
          Start Now <ArrowRight className="h-5 w-5" />
        </Link>
      </section>

      <section className="relative mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-5 md:grid-cols-2">
          {[
            { icon: Wand2, title: "Optimized Prompts", desc: "Convert raw ideas into clean, technical, AI-ready prompts." },
            { icon: Target, title: "Best AI Tools", desc: "Smart matching to the most suitable tools for your task." },
            { icon: ArrowRight, title: "Execution Path", desc: "Step-by-step phases that guide you from start to finish." },
            { icon: BookOpen, title: "Curated Resources", desc: "Handpicked learning material to complete your goal faster." },
          ].map((f, i) => (
            <div
              key={f.title}
              className="glass-card animate-fade-up rounded-2xl p-6"
              style={{ animationDelay: `${0.1 + i * 0.08}s` }}
            >
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-5xl px-6 pb-28">
        <h2 className="animate-fade-up text-center text-3xl font-bold md:text-4xl">How it works</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { n: "01", t: "Enter your task", d: "Tell us what you want to build or accomplish." },
            { n: "02", t: "Describe your goal", d: "Add context, constraints, level, timeline." },
            { n: "03", t: "Get your AI plan", d: "Refined prompt + tools + steps + resources." },
          ].map((s, i) => (
            <div
              key={s.n}
              className="glass-card animate-fade-up rounded-2xl p-6"
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              <div className="text-gradient text-3xl font-extrabold">{s.n}</div>
              <h3 className="mt-2 text-lg font-semibold">{s.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
