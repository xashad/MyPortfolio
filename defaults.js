/* ─────────────────────────────────────────────────────────────
   DEFAULT_CONTENT — mirrors the content currently hard-coded in
   index.html. It is the single source of truth for the editable
   sections.

   • The PUBLIC site only re-renders these sections when Supabase
     has SAVED content. With no saved content it keeps the static
     HTML, so the live site is unchanged until you start editing.
   • The ADMIN panel seeds its forms from this object the first time
     (before anything is saved), so what you edit matches the site.

   The flagship "Lagani" featured card (with its charts) stays static
   in index.html and is NOT part of this model.

   Fields marked “rich” may contain simple inline HTML (e.g.
   <strong>, <em>) and are rendered as HTML; everything else is
   plain text and is escaped.
   ───────────────────────────────────────────────────────────── */
window.DEFAULT_CONTENT = {
  hero: {
    eyebrow: "AI & Machine Learning Engineer",
    name: "Mohammad Ashad Khan",
    lead: "I build machine-learning systems you can actually trust.",
    // rich:
    sub: "MSc Artificial Intelligence at Milano-Bicocca. I pair strong <strong>computer-vision and deep-learning</strong> models with <strong>explainability</strong>, so every prediction comes with the reason behind it. Currently building <strong>Lagani</strong>, an explainable stock-risk platform for Nepal's NEPSE market.",
    meta: [
      { text: "Based in Milan, Italy", live: false },
      { text: "Open to AI / ML & CV roles", live: true },
      { text: "EN · NE · HI · UR · IT", live: false }
    ]
  },

  stats: [
    { n: "9", l: "Shipped projects" },
    { n: "6", l: "Certifications" },
    { n: "3", l: "Years building" },
    { n: "1", l: "Published paper" }
  ],

  about: {
    portrait: "assets/Profile/ProfileAshad1.jpeg",
    // rich paragraphs:
    paragraphs: [
      "I'm a Master's student in <strong>AI for Science &amp; Technology</strong> at the University of Milano-Bicocca, with a B.Tech in Computer Science from Lovely Professional University. My work sits at the intersection of <strong>computer vision, deep learning, and explainable AI</strong>.",
      "The thread through everything I build is <strong>trust</strong>. A model that predicts \"high risk\" or \"defective\" is useless if no one understands <em>why</em> — so I pair strong models (CNNs, Vision Transformers, gradient boosting) with explainability methods (Grad-CAM, LIME, SHAP, saliency, knowledge graphs).",
      "I'm also a <strong>full-stack developer</strong> (React, Next.js, Supabase). I don't stop at a notebook — I ship models as live, interactive products people can use."
    ],
    facts: [
      { k: "Location", v: "Milan, Italy", ok: false },
      { k: "Degree", v: "MSc AI", ok: false },
      { k: "Focus", v: "CV · DL · XAI", ok: false },
      { k: "Status", v: "Open to work", ok: true }
    ]
  },

  skills: [
    { title: "AI / Machine Learning", chips: ["PyTorch", "Deep Learning", "Computer Vision", "CNNs", "Vision Transformers", "NLP", "Transfer Learning", "Gradient Boosting", "Scikit-learn", "SBERT", "1D CNN"] },
    { title: "Explainable AI", chips: ["Grad-CAM", "LIME", "SHAP", "Saliency Maps", "t-SNE", "Knowledge Graphs", "TransE Embeddings"] },
    { title: "Vision & HCI", chips: ["OpenCV", "MediaPipe", "Gesture Control", "Depth Estimation", "Pygame", "Image Classification"] },
    { title: "Web / Full-Stack", chips: ["React", "Next.js", "TypeScript", "Node.js", "Express", "Tailwind CSS", "Streamlit"] },
    { title: "Data & Infra", chips: ["PostgreSQL", "MongoDB", "Supabase", "Neo4j", "Pandas", "NumPy"] },
    { title: "Languages & Tools", chips: ["Python", "JavaScript", "SQL", "Git", "Docker", "HTML / CSS"] }
  ],

  /* The non-featured project cards (Lagani is static in index.html). */
  projects: [
    {
      flag: "Vision Transformer · XAI", name: "FreshGuard",
      tagline: "AI fruit-quality inspection with explainable predictions",
      cats: ["xai", "cv"], metrics: [],
      points: [
        "Vision Transformer transfer-learning on FruitNet for fresh-vs-defective classification",
        "LIME super-pixel explanations show <em>which part</em> of the fruit drove each decision",
        "t-SNE projection of learned embeddings to visualise class separation"
      ],
      tech: ["ViT", "PyTorch", "Transfer Learning", "LIME", "t-SNE"],
      links: [{ label: "↗ Code", url: "https://github.com/xashad", soon: false }]
    },
    {
      flag: "Vision Transformer · XAI", name: "Bloom XAI",
      tagline: "Explainable flower classification with ViT transfer learning",
      cats: ["xai", "cv"], metrics: [],
      points: [
        "Fine-tuned a pretrained Vision Transformer on a multi-class flower dataset",
        "LIME local explanations + t-SNE embedding visualisation for interpretability",
        "Built as the AIML exam deliverable with a full report &amp; reproducible notebook"
      ],
      tech: ["ViT", "PyTorch", "LIME", "t-SNE"],
      links: [{ label: "↗ Code", url: "https://github.com/xashad", soon: false }]
    },
    {
      flag: "From-scratch CNN · XAI", name: "CIFAR-10 CNN + XAI",
      tagline: "A custom CNN benchmarked against three explainability methods",
      cats: ["xai", "cv"], metrics: [],
      points: [
        "Designed and trained a convolutional network from scratch on CIFAR-10",
        "Compared Grad-CAM, saliency maps and LIME to understand model attention",
        "Single reproducible Colab notebook — model, training &amp; explanations"
      ],
      tech: ["PyTorch", "Grad-CAM", "Saliency", "LIME"],
      links: [{ label: "↗ Code", url: "https://github.com/xashad", soon: false }]
    },
    {
      flag: "Deep Learning · Healthcare", name: "CardioNet",
      tagline: "Deep-learning ECG arrhythmia detection",
      cats: ["xai", "cv"], metrics: [],
      points: [
        "Custom 1D CNN on the MIT-BIH dataset for arrhythmia classification",
        "Interactive Streamlit dashboard for ECG visualisation &amp; real-time prediction",
        "Evaluated with accuracy, precision, recall, F1 &amp; confusion matrix"
      ],
      tech: ["PyTorch", "1D CNN", "Streamlit", "Scikit-learn"],
      links: [{ label: "↗ GitHub", url: "https://github.com/xashad/CardioNet", soon: false }]
    },
    {
      flag: "Computer Vision · HCI", name: "GestureRun",
      tagline: "Gesture-controlled endless runner",
      cats: ["cv"], metrics: [],
      points: [
        "Real-time webcam hand-gesture recognition for lane switching, jumping &amp; sliding",
        "Built for the HCI &amp; Intelligent Consumer Technologies course",
        "Runs in real time on a standard webcam via MediaPipe Hands"
      ],
      tech: ["OpenCV", "MediaPipe", "Pygame", "Python"],
      links: [{ label: "↗ GitHub", url: "https://github.com/xashad/GestureRun", soon: false }]
    },
    {
      flag: "NLP · Explainable Matching", name: "Resume & Job Match Scorer",
      tagline: "Semantic job matching with explainable AI",
      cats: ["xai", "web"], metrics: [],
      points: [
        "SBERT semantic similarity between resumes and job descriptions",
        "LIME explanations surface <em>which skills</em> drove each match score",
        "Neo4j skills knowledge graph for structured reasoning"
      ],
      tech: ["SBERT", "LIME", "Neo4j", "Python"],
      links: [{ label: "↗ Code", url: "https://github.com/xashad", soon: false }]
    },
    {
      flag: "Full-Stack · AI", name: "Dashvoard",
      tagline: "AI productivity dashboard",
      cats: ["web"], metrics: [],
      points: [
        "AI auto-categorisation parses URL metadata into Study / Work / Social / Shopping",
        "Granular per-link and per-folder privacy toggles",
        "React + Supabase real-time backend"
      ],
      tech: ["React", "Tailwind", "Supabase"],
      links: [{ label: "↗ Code", url: "https://github.com/xashad", soon: false }]
    },
    {
      flag: "Full-Stack · FinTech", name: "EchoBook",
      tagline: "Multi-ledger finance manager",
      cats: ["web"], metrics: [],
      points: [
        "Partitioned ledger separating Personal, Business &amp; Lending accounts",
        "Real-time balance, credit &amp; debit metrics",
        "Typed React + Supabase architecture"
      ],
      tech: ["React", "TypeScript", "Tailwind", "Supabase"],
      links: [{ label: "↗ Code", url: "https://github.com/xashad", soon: false }]
    }
  ],

  momentum: {
    /* rich strings */
    now: [
      "Adding <strong>SHAP &amp; counterfactual</strong> explanations to Lagani's risk model",
      "Exploring <strong>faithfulness of XAI</strong> methods as a thesis direction",
      "Shipping live demos of my Streamlit projects to the web",
      "Learning Italian (A1 → A2)"
    ],
    writing: [
      { title: "ICCS-2023 \"KILBY100\" — Conference Publication", sub: "Peer-reviewed · ICCS 2023", tag: "Published", url: "https://linkedin.com/in/xashad" },
      { title: "Why LIME explanations can be unstable — and what to do about it", sub: "Deep-dive on local-surrogate reliability", tag: "Draft", url: "" },
      { title: "Explaining a Vision Transformer's decisions on fruit quality", sub: "From attention maps to LIME on FreshGuard", tag: "Draft", url: "" }
    ]
  },

  experience: [
    { when: "May 2022 – Jun 2025", title: "Frontend Web Developer", org: "Securedsoft · Remote", desc: "Built responsive web interfaces with React, Tailwind & Supabase APIs; improved performance and cross-browser compatibility." },
    { when: "Apr 2024 – Feb 2025", title: "Computer Science Instructor", org: "Lumbini World School, Nepal", desc: "Taught programming fundamentals to K-12 students; delivered the Nepal STEM Alliance-certified Coding ToT curriculum." },
    { when: "Jan 2020 – May 2023", title: "Management Team Member", org: "Google Developer Student Club, LPU", desc: "Organised hackathons & workshops; mentored peers in software development." }
  ],

  education: [
    { title: "MSc Artificial Intelligence for Science & Technology", org: "Università degli Studi di Milano-Bicocca, Italy", desc: "Computer Vision, Deep Learning, Explainable AI, Big Data & Signal processing." },
    { title: "B.Tech Computer Science Engineering", org: "Lovely Professional University, India", desc: "Foundations in CS, software engineering & a published ICCS-2023 conference paper." }
  ],

  certs: [
    { title: "ICCS-2023 \"KILBY100\"", sub: "Conference Publication · May 2023" },
    { title: "Neo4j Certified Professional", sub: "Jun 2025" },
    { title: "AI Engineer for Developers Associate", sub: "DataCamp · Mar 2026" },
    { title: "AI Fundamentals", sub: "DataCamp · Mar 2026" },
    { title: "NASA ARSET Remote Sensing", sub: "Fundamentals · Nov 2025" },
    { title: "HP LIFE Design Thinking", sub: "Nov 2024" }
  ],

  contact: {
    heading: "Let's build something explainable.",
    text: "Open to AI / ML & Computer Vision roles, internships, and research collaborations. The fastest way to reach me is email — I reply within a day or two."
  }
};
