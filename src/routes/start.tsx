import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Loader2, Sparkles, Wand2, Wrench, ListChecks, BookOpen } from "lucide-react";
import { generatePlan, type Plan } from "@/lib/plan-generator";

export const Route = createFileRoute("/start")({
  head: () => ({
    meta: [
      { title: "Describe Your Goal — AI Tool & Prompt Optimizer" },
      { name: "description", content: "Describe your task and goal to receive an optimized AI prompt, tool recommendations, and an execution path." },
    ],
  }),
  component: StartPage,
});

function StartPage() {
  const [task, setTask] = useState("");
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<Plan | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim() || !goal.trim()) return;
    setLoading(true);
    setPlan(null);
    await new Promise((r) => setTimeout(r, 1400));
    setPlan(generatePlan(task, goal));
    setLoading(false);
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-6 py-12">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />

      <div className="relative mx-auto max-w-3xl">
        <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <div className="glass-card animate-fade-up rounded-3xl p-8 md:p-10">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" /> AI Planner
          </div>
          <h1 className="text-3xl font-bold md:text-4xl">Describe Your Goal</h1>
          <p className="mt-2 text-muted-foreground">
            Two quick inputs. We'll handle the rest.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium">
                What task do you want to complete?
              </label>
              <input
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="e.g. Build a resume, create a business plan, learn machine learning"
                className="w-full rounded-xl border border-input bg-white/70 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Explain your goal in detail
              </label>
              <textarea
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="Describe your objective, constraints, current level, tools you know, timeline, etc..."
                rows={6}
                className="w-full resize-none rounded-xl border border-input bg-white/70 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !task.trim() || !goal.trim()}
              className="btn-gradient inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:scale-100"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Analyzing your goal…
                </>
              ) : (
                <>
                  <Wand2 className="h-5 w-5" /> Generate AI Plan
                </>
              )}
            </button>
          </form>
        </div>

        {loading && (
          <div className="glass-card animate-fade-in mt-8 flex items-center gap-3 rounded-2xl p-6 text-sm text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            Crafting your optimized prompt, matching tools, and building your execution path…
          </div>
        )}

        {plan && (
          <div id="results" className="mt-10 space-y-6">
            <Section icon={Wand2} title="Refined AI Prompt" delay={0}>
              <pre className="whitespace-pre-wrap rounded-xl bg-secondary/60 p-4 font-mono text-sm text-foreground">
                {plan.refinedPrompt}
              </pre>
            </Section>

            <Section icon={Wrench} title="Recommended AI Tools" delay={0.08}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {plan.tools.map((t) => (
                  <li key={t.name} className="rounded-xl border border-border bg-white/60 p-4">
                    <div className="font-semibold">{t.name}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{t.reason}</div>
                  </li>
                ))}
              </ul>
            </Section>

            <Section icon={ListChecks} title="Execution Path" delay={0.16}>
              <ol className="space-y-3">
                {plan.phases.map((p, i) => (
                  <li key={i} className="rounded-xl border border-border bg-white/60 p-4">
                    <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                      Phase {i + 1}
                    </div>
                    <div className="mt-1 font-semibold">{p.title}</div>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                      {p.steps.map((s, j) => (
                        <li key={j}>{s}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </Section>

            <Section icon={BookOpen} title="Resources" delay={0.24}>
              <ul className="space-y-2">
                {plan.resources.map((r) => (
                  <li key={r.title}>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start justify-between rounded-xl border border-border bg-white/60 p-4 transition hover:border-primary/40 hover:bg-white"
                    >
                      <div>
                        <div className="font-medium group-hover:text-primary">{r.title}</div>
                        <div className="text-xs text-muted-foreground">{r.type}</div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </Section>
          </div>
        )}
      </div>
    </main>
  );
}

function Section({
  icon: Icon,
  title,
  children,
  delay,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <section
      className="glass-card animate-fade-up rounded-2xl p-6 md:p-8"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="mb-4 flex items-center gap-2">
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      {children}
    </section>
  );
}
