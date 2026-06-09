export type Tool = { name: string; reason: string };
export type Phase = { title: string; steps: string[] };
export type Resource = { title: string; url: string; type: string };
export type Plan = {
  refinedPrompt: string;
  tools: Tool[];
  phases: Phase[];
  resources: Resource[];
};

type Domain = "writing" | "design" | "coding" | "learning" | "business" | "video" | "data" | "general";

function detectDomain(text: string): Domain {
  const t = text.toLowerCase();
  if (/(resume|cv|cover letter|blog|article|copy|write|essay|email)/.test(t)) return "writing";
  if (/(logo|design|poster|brand|ui|ux|figma|illustration|graphic)/.test(t)) return "design";
  if (/(code|app|website|api|build|develop|react|python|software|bug)/.test(t)) return "coding";
  if (/(learn|study|course|tutorial|understand|master)/.test(t)) return "learning";
  if (/(business|startup|plan|marketing|strategy|pitch|investor)/.test(t)) return "business";
  if (/(video|edit|youtube|reel|tiktok|animation)/.test(t)) return "video";
  if (/(data|analysis|excel|chart|spreadsheet|sql|dashboard)/.test(t)) return "data";
  return "general";
}

const TOOLS: Record<Domain, Tool[]> = {
  writing: [
    { name: "ChatGPT", reason: "Best for drafting, rewriting, and structuring written content." },
    { name: "Grammarly", reason: "Polishes grammar, tone, and clarity across long-form writing." },
    { name: "Notion AI", reason: "Great for organizing drafts inside structured docs." },
    { name: "Claude", reason: "Strong at long, nuanced reasoning and editorial tasks." },
  ],
  design: [
    { name: "Canva", reason: "Fast, template-driven design for non-designers." },
    { name: "Midjourney", reason: "High-quality AI imagery for concepts and visuals." },
    { name: "Figma + AI plugins", reason: "Professional UI/brand work with AI assistance." },
    { name: "Adobe Firefly", reason: "Commercial-safe AI assets integrated with Adobe tools." },
  ],
  coding: [
    { name: "Lovable", reason: "Builds full web apps from natural-language prompts." },
    { name: "Cursor", reason: "AI-native IDE for fast coding and refactors." },
    { name: "GitHub Copilot", reason: "Inline completions inside your editor of choice." },
    { name: "Claude / ChatGPT", reason: "Deep reasoning for architecture and debugging." },
  ],
  learning: [
    { name: "ChatGPT", reason: "Personal tutor that adapts to your level." },
    { name: "Perplexity", reason: "Cited research answers for accurate self-study." },
    { name: "NotebookLM", reason: "Turns your sources into summaries and study guides." },
    { name: "YouTube + Transcript AI", reason: "Curated lectures with AI-summarized notes." },
  ],
  business: [
    { name: "ChatGPT", reason: "Drafts business plans, models, and pitch narratives." },
    { name: "Gamma", reason: "Generates polished pitch decks from outlines." },
    { name: "Perplexity", reason: "Market research with cited sources." },
    { name: "Notion AI", reason: "Organizes strategy docs and OKRs in one place." },
  ],
  video: [
    { name: "Runway", reason: "AI video generation and editing in the browser." },
    { name: "Descript", reason: "Edit video by editing the transcript — fast and simple." },
    { name: "CapCut", reason: "Free editor with strong AI features for short-form." },
    { name: "ElevenLabs", reason: "Realistic AI voiceovers in many languages." },
  ],
  data: [
    { name: "ChatGPT (Advanced Data Analysis)", reason: "Run Python on your data conversationally." },
    { name: "Julius AI", reason: "Chat-based analysis on spreadsheets and CSVs." },
    { name: "Rows", reason: "AI spreadsheet for analysis and dashboards." },
    { name: "Hex", reason: "Notebook-style analytics with AI assistance." },
  ],
  general: [
    { name: "ChatGPT", reason: "General-purpose reasoning and content generation." },
    { name: "Claude", reason: "Excellent for long context and structured outputs." },
    { name: "Perplexity", reason: "Research with citations for fact-grounded answers." },
    { name: "Notion AI", reason: "Captures and organizes the output into usable docs." },
  ],
};

const RESOURCES: Record<Domain, Resource[]> = {
  writing: [
    { title: "Prompt Engineering Guide", url: "https://www.promptingguide.ai/", type: "Guide" },
    { title: "Grammarly Blog — Writing Tips", url: "https://www.grammarly.com/blog/", type: "Articles" },
  ],
  design: [
    { title: "Canva Design School", url: "https://www.canva.com/designschool/", type: "Course" },
    { title: "Refactoring UI", url: "https://www.refactoringui.com/", type: "Book" },
  ],
  coding: [
    { title: "Lovable Docs", url: "https://docs.lovable.dev/", type: "Docs" },
    { title: "MDN Web Docs", url: "https://developer.mozilla.org/", type: "Reference" },
  ],
  learning: [
    { title: "Coursera", url: "https://www.coursera.org/", type: "Courses" },
    { title: "DeepLearning.AI Short Courses", url: "https://www.deeplearning.ai/short-courses/", type: "Courses" },
  ],
  business: [
    { title: "Y Combinator Startup School", url: "https://www.startupschool.org/", type: "Course" },
    { title: "Lean Canvas Template", url: "https://leanstack.com/lean-canvas", type: "Template" },
  ],
  video: [
    { title: "Runway Academy", url: "https://academy.runwayml.com/", type: "Course" },
    { title: "Descript Tutorials", url: "https://www.descript.com/tutorials", type: "Tutorials" },
  ],
  data: [
    { title: "Kaggle Learn", url: "https://www.kaggle.com/learn", type: "Course" },
    { title: "Mode SQL Tutorial", url: "https://mode.com/sql-tutorial/", type: "Tutorial" },
  ],
  general: [
    { title: "Prompt Engineering Guide", url: "https://www.promptingguide.ai/", type: "Guide" },
    { title: "OpenAI Cookbook", url: "https://cookbook.openai.com/", type: "Examples" },
  ],
};

const PHASES: Record<Domain, Phase[]> = {
  writing: [
    { title: "Research & Outline", steps: ["Clarify audience and tone", "Gather references", "Draft a structured outline"] },
    { title: "Draft with AI", steps: ["Generate first draft from outline", "Iterate section by section", "Add personal voice and examples"] },
    { title: "Polish & Publish", steps: ["Edit grammar and clarity", "Format for target platform", "Publish and share"] },
  ],
  design: [
    { title: "Discovery", steps: ["Collect inspiration and references", "Define brand/style direction", "Set deliverables and sizes"] },
    { title: "Create", steps: ["Generate concepts with AI", "Refine in Canva/Figma", "Iterate on feedback"] },
    { title: "Export & Ship", steps: ["Finalize assets", "Export at correct dimensions", "Hand off or publish"] },
  ],
  coding: [
    { title: "Scope", steps: ["Define core features", "Pick stack and tools", "Sketch data model"] },
    { title: "Build", steps: ["Scaffold the app with Lovable/Cursor", "Implement features iteratively", "Add tests as you go"] },
    { title: "Ship", steps: ["Polish UI and edge cases", "Deploy to production", "Collect feedback and iterate"] },
  ],
  learning: [
    { title: "Foundations", steps: ["Define what mastery looks like", "Pick one trusted curriculum", "Set a realistic weekly schedule"] },
    { title: "Practice", steps: ["Build small projects", "Use AI as a tutor for blockers", "Review and take notes"] },
    { title: "Apply", steps: ["Tackle a real-world problem", "Share your work publicly", "Iterate based on feedback"] },
  ],
  business: [
    { title: "Validate", steps: ["Define the problem and customer", "Run customer interviews", "Size the market"] },
    { title: "Plan", steps: ["Draft business model", "Build financial projections", "Create the pitch deck"] },
    { title: "Launch", steps: ["Set up channels", "Run a small pilot", "Measure, learn, iterate"] },
  ],
  video: [
    { title: "Pre-production", steps: ["Write a script or outline", "Plan shots and assets", "Prepare voice/visual style"] },
    { title: "Production", steps: ["Generate or record footage", "Layer voiceover and music", "Add captions and B-roll"] },
    { title: "Publish", steps: ["Export at platform specs", "Write title/description/tags", "Publish and analyze performance"] },
  ],
  data: [
    { title: "Define", steps: ["Frame the business question", "Identify data sources", "Set success metrics"] },
    { title: "Analyze", steps: ["Clean and explore data", "Run analysis with AI assistance", "Validate findings"] },
    { title: "Communicate", steps: ["Build visualizations", "Write narrative insights", "Share with stakeholders"] },
  ],
  general: [
    { title: "Clarify", steps: ["State the desired outcome", "List constraints and context", "Define success criteria"] },
    { title: "Execute", steps: ["Use the refined prompt with chosen tool", "Iterate on the output", "Combine multiple tools as needed"] },
    { title: "Finalize", steps: ["Review against success criteria", "Polish and format the result", "Ship or share"] },
  ],
};

export function generatePlan(task: string, goal: string): Plan {
  const domain = detectDomain(`${task} ${goal}`);
  const refinedPrompt = [
    `# Role`,
    `Act as an expert assistant specialized in ${domain} tasks.`,
    ``,
    `# Objective`,
    task.trim(),
    ``,
    `# Context & Constraints`,
    goal.trim(),
    ``,
    `# Deliverables`,
    `- A clear, structured output tailored to the objective.`,
    `- Step-by-step reasoning when helpful.`,
    `- Highlight assumptions and ask clarifying questions if critical info is missing.`,
    ``,
    `# Format`,
    `Use concise sections with headings, bullet points, and examples where useful.`,
  ].join("\n");

  return {
    refinedPrompt,
    tools: TOOLS[domain],
    phases: PHASES[domain],
    resources: RESOURCES[domain],
  };
}
