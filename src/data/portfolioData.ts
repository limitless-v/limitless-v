export interface TabItem {
  id: string;
  label: string;
}

export interface BentoSkillItem {
  name: string;
  score: number;
  assessment: string;
}

export type BentoSkill = BentoSkillItem;

export interface BentoCard {
  id: string;
  title: string;
  tag: string;
  colSpan: string; // e.g. 'bento-span-7', 'bento-span-5', 'bento-span-6'
  skills: BentoSkillItem[];
}

export const NAV_TABS: TabItem[] = [
  { id: 'hero', label: 'main.c' },
  { id: 'about', label: 'about.py' },
  { id: 'skills', label: 'skills.h' },
  { id: 'contact', label: 'contact.sh' },
];

export const HERO_DATA = {
  status: 'OPEN TO WORK',
  name: '> limitless-v',
  buildLogs: [
    'compiling: full-stack & ai developer...',
    'linking: react · node · flask · python...',
    'build succeeded. 0 errors, 0 warnings.'
  ],
  chips: [
    'Python',
    'TypeScript',
    'React.js',
    'Flask',
    'RAG / LLM APIs (academic)',
    'C / C++ (academic)',
    'Embedded Systems (exploring)'
  ],
  ctaText: './get-in-touch',
  ctaHref: '#contact'
};

export const ABOUT_DATA = {
  sectionNumber: '01 — about.py',
  title: 'Compiled from curiosity, low-level habits, and shipped products.',
  bioParagraphs: [
    "I'm limitless-v, a Full Stack & AI Developer.",
    "My interest started with C, C++, and Python — I've worked with them at an academic and self-study level, and I'm actively exploring embedded systems as I go deeper into low-level programming. That curiosity carries into everything I build day-to-day: React/TypeScript frontends, Node/Express and Flask backends, and AI tooling built on RAG pipelines and the OpenAI/Gemini APIs.",
    "I like working at the intersection of machine learning, AI tooling, and practical web applications — and I'm always learning, whether that's at work or getting closer to the hardware on my own time."
  ],
  codeSnippet: `// whoami.c
struct Developer {
  char* name     = "limitless-v";
  char* role     = "Full Stack & AI Dev";
  char* roots[3]    = {"C", "C++", "Python"};
  char* exploring   = "Embedded Systems";
  bool  shipping    = true;
  bool  stillLearning = true;
};`
};

export const SKILLS_DATA = {
  sectionNumber: '02 — skills.h',
  title: 'Engineering Evaluation & Skills Bento',
  description: 'An honest, data-driven assessment across systems engineering, domain logic, security, devops, and applied AI.',
  bentoCards: [
    {
      id: 'core-engineering',
      title: 'Problem Solving & Architecture',
      tag: 'Core Mastery',
      colSpan: 'bento-span-7',
      skills: [
        {
          name: 'Problem Solving',
          score: 8.0,
          assessment: 'Strong inclination to investigate root causes rather than settling for quick cosmetic fixes.'
        },
        {
          name: 'Debugging / Troubleshooting',
          score: 8.0,
          assessment: 'Top practical ability; repeatedly works through messy, complex real-world issues.'
        },
        {
          name: 'Full-Stack Development',
          score: 7.0,
          assessment: 'Hands-on understanding of end-to-end web workflows and real application state.'
        },
        {
          name: 'Software Architecture',
          score: 6.0,
          assessment: 'Understands module boundaries; scaling and distributed architecture have room to grow.'
        }
      ]
    },
    {
      id: 'domain-logic',
      title: 'Domain & Business Systems',
      tag: 'Production Rules',
      colSpan: 'bento-span-5',
      skills: [
        {
          name: 'Booking & Reservation Systems',
          score: 8.0,
          assessment: 'Extensive hands-on experience handling multi-condition real-world booking rules.'
        },
        {
          name: 'Payments & Business Logic',
          score: 7.5,
          assessment: 'Strong practical exposure: Razorpay, transaction state, dynamic taxes, pricing, and cancellations.'
        }
      ]
    },
    {
      id: 'api-frontend-data',
      title: 'APIs, Frontend & Data Layer',
      tag: 'Stack Delivery',
      colSpan: 'bento-span-6',
      skills: [
        {
          name: 'API Development & Integration',
          score: 7.5,
          assessment: 'Strong area: pagination, schema validation, rate limits, 3rd-party webhooks, debugging.'
        },
        {
          name: 'Frontend / UI',
          score: 7.0,
          assessment: 'Solid practical grasp of UI/UX flows, micro-interactions, and responsive layout.'
        },
        {
          name: 'Backend Development',
          score: 6.5,
          assessment: 'Comfortable with APIs and backend routing; scaling & concurrency knowledge in development.'
        },
        {
          name: 'SQL / Databases',
          score: 6.0,
          assessment: 'Solid database application design and SQL safety; advanced query profiling in progress.'
        }
      ]
    },
    {
      id: 'security-linux',
      title: 'Security, Systems & Networking',
      tag: 'Low Level & Defense',
      colSpan: 'bento-span-6',
      skills: [
        {
          name: 'Application Security',
          score: 7.0,
          assessment: 'Practical understanding of SQLi, CORS, HTTP headers, authentication, and vulnerability scans.'
        },
        {
          name: 'Linux Environment',
          score: 6.5,
          assessment: 'Comfortable with CLI, WSL, Arch/BlackArch; growing toward senior Linux sysadmin depth.'
        },
        {
          name: 'Testing & QA',
          score: 6.5,
          assessment: 'Capable in API testing and automated validations; building comprehensive test engineering depth.'
        },
        {
          name: 'Networking',
          score: 6.0,
          assessment: 'Understands HTTP protocols, APIs, CORS, and network boundaries.'
        },
        {
          name: 'Pentesting / Security Tools',
          score: 5.5,
          assessment: 'Active exploratory toolkit (Wapiti, BlackArch); evolving toward professional pentesting.'
        }
      ]
    },
    {
      id: 'devops-workflows',
      title: 'Git, CI/CD & Cloud Delivery',
      tag: 'Operations',
      colSpan: 'bento-span-6',
      skills: [
        {
          name: 'Git / GitHub Workflows',
          score: 8.0,
          assessment: 'Fluid with branches, PR reviews, conflict resolution, rebase, and remote management.'
        },
        {
          name: 'CI/CD Automation',
          score: 6.5,
          assessment: 'Reliable GitHub Actions and PR-based automation pipelines.'
        },
        {
          name: 'Cloud / Deployment',
          score: 5.5,
          assessment: 'Deployment experience across AWS SSM and Vercel; maturing cloud infrastructure skills.'
        },
        {
          name: 'DevOps',
          score: 5.5,
          assessment: 'Practical deployment experience; growing toward full IaC and container orchestration.'
        }
      ]
    },
    {
      id: 'applied-ai',
      title: 'AI & Applied Intelligence',
      tag: 'AI Engineering',
      colSpan: 'bento-span-6',
      skills: [
        {
          name: 'AI Application Development',
          score: 7.0,
          assessment: 'Integrates AI models deeply into product features rather than simple conversational wrappers.'
        },
        {
          name: 'Generative AI & Prompting',
          score: 7.0,
          assessment: 'Practical structured prompting for development, automated testing, and product pipelines.'
        },
        {
          name: 'LLM Engineering',
          score: 5.5,
          assessment: 'Active exploration of RAG, vector embeddings, evaluations, and agentic workflows.'
        },
        {
          name: 'Machine Learning',
          score: 3.0,
          assessment: 'Theoretical & baseline familiarity; model training & mathematics in progress.'
        }
      ]
    }
  ] as BentoCard[]
};

export const CONTACT_DATA = {
  sectionNumber: '03 — contact.sh',
  title: "Let's build something",
  description: 'Open to full-stack, AI tooling, and anything that lets me get close to the metal again.',
  terminalPath: '~/limitless-v — zsh',
  commands: [
    { prompt: '$ whoami', output: 'limitless-v — full stack & ai developer' }
  ]
};

export const FOOTER_DATA = {
  copyright: '© 2026 limitless-v. Built & compiled with care.',
  tech: 'black & white / monospace / react-bits-inspired'
};
