export type ProjectGroup = 'all' | 'hardware' | 'software';

export interface ProjectItem {
  id: string;
  indexLabel: string;
  group: 'hardware' | 'software';
  title: string;
  category: string;
  status: string;
  summary: string;
  description: string;
  highlights: string[];
  technologies: string[];
  imageUrl?: string;
  visualSchematic?: 'network' | 'waveform' | 'compiler' | 'orbit' | 'iot';
  liveDemoUrl?: string;
  githubUrl?: string;
}

export type SkillStatus = 'Used in projects' | 'Currently learning' | 'Explored';

export interface SkillEntry {
  name: string;
  status: SkillStatus;
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  items: SkillEntry[];
}

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  date: string;
  category: string;
  description: string;
  certificateImageUrl?: string;
  certificateNote: string;
  isPlaceholder?: boolean;
}

export interface ContactChannel {
  id: 'email' | 'github';
  label: string;
  value: string;
  href: string;
}

export const ASSETS = {
  heroSunset: '/src/assets/images/hero_sunset_horizon_1795181532205.jpg',
  aboutStudio: '/src/assets/images/about_studio_dusk_1795181535187.jpg',
  projectAiNeural: '/src/assets/images/project_ai_neural_1795181533556.jpg',
  projectCyberMesh: '/src/assets/images/project_cyber_mesh_1795181531867.jpg',
  projectRoboticsPcb: '/src/assets/images/project_robotics_pcb_1795181535436.jpg',
  certificateHackathonImage: '/assets/aistudio/image_5e70ca5b.png',
} as const;

export const PROFILE = {
  brand: 'KEV.DEV',
  fullName: 'Kevin Anton Akhil',
  greeting: "HELLO, I'M",
  name: 'Kevin Anton Akhil',
  subtitle: 'Developer. Builder. Innovator.',
  heroDescription:
    "I'm a developer passionate about building technology across software engineering, artificial intelligence, cybersecurity, and electronics.",
  aboutLead:
    "I'm Kevin Anton Akhil — a developer and hardware builder exploring how modern software, generative AI, cybersecurity concepts, and embedded electronics work together to solve practical problems.",
  aboutBody:
    'From shipping full-stack web apps and AI-assisted tools to wiring ESP32 and Arduino systems on the workbench, I focus on learning through hands-on building across both digital interfaces and physical hardware.',
  locationPlaceholder: 'Ras Al Khaimah, UAE',
  focusDisciplines: [
    {
      id: 'software',
      title: 'Software Engineering',
      summary:
        'Building responsive web interfaces, developer productivity tools, and AI-powered web applications using React, Tailwind CSS, JavaScript, TypeScript, and Vite.',
      sampleFocus: 'Stack: HTML · CSS · JavaScript · React · Tailwind CSS · Vite · Next.js',
    },
    {
      id: 'ai',
      title: 'Artificial Intelligence',
      summary:
        'Integrating generative AI workflows, prompt engineering, and semantic retrieval into focused web experiences using Google AI Studio.',
      sampleFocus: 'Focus: Google AI Studio · Prompt Engineering · Generative AI Integration',
    },
    {
      id: 'security',
      title: 'Cybersecurity',
      summary:
        'Practicing Linux command-line workflows while exploring cybersecurity fundamentals, security research, threat hunting concepts, and web app security.',
      sampleFocus: 'Focus: Linux CLI · Security Research · Web App Security Concepts',
    },
    {
      id: 'hardware',
      title: 'Robotics & Electronics',
      summary:
        'Designing microcontroller prototypes with Arduino and ESP32 boards, displays, relays, sensors, servos, and addressable LEDs.',
      sampleFocus: 'Hardware: ESP32-S3 · Arduino UNO / Mega / Nano · OLED / TFT · Sensors',
    },
  ],
  email: 'kevinantonakhil@gmail.com',
  githubHandle: 'kevinantonakhil-coder',
  githubUrl: 'https://github.com/kevinantonakhil-coder',
} as const;

export const HARDWARE_PROJECTS: ProjectItem[] = [
  {
    id: 'hw-01',
    indexLabel: 'H1',
    group: 'hardware',
    title: 'Smart Study Wellbeing Desk XP',
    category: 'Embedded Systems',
    status: 'Hardware Build',
    summary:
      'An intelligent study desk powered by ESP32 that transforms productivity into an interactive experience. It tracks study sessions, breaks and XP while suggesting wellbeing activities through interactive displays and LED feedback.',
    description:
      'Built around an ESP32-S3 controller, this physical desk companion blends time-boxing and gamified XP progression with tactile keypad controls, dual OLED/TFT readouts, and ambient WS2812B LED feedback to encourage healthy study habits.',
    highlights: [
      'Tracks active study sessions, scheduled breaks, and earned XP directly on hardware displays',
      'Delivers wellbeing activity prompts and visual session states via WS2812B LED feedback',
      'Physical keypad input paired with simultaneous OLED and TFT display interfaces',
    ],
    technologies: ['ESP32-S3', 'OLED', 'TFT', 'Keypad', 'WS2812B'],
    imageUrl: ASSETS.projectRoboticsPcb,
  },
  {
    id: 'hw-02',
    indexLabel: 'H2',
    group: 'hardware',
    title: 'Interactive Cell Simulator',
    category: 'Educational Electronics',
    status: 'Hardware Build',
    summary:
      'An educational electronics project that brings cell biology to life through an interactive display. It uses multiple Arduino boards and electronic components to present organelle information, visual indicators and interactive features.',
    description:
      'A multi-microcontroller educational build combining Arduino UNO and Arduino Mega boards with TFT and OLED screens, environmental sensing, and keypad navigation to let learners interactively explore cell organelles.',
    highlights: [
      'Coordinates multiple Arduino boards (UNO & Mega) for dedicated display and input handling',
      'Interactive organelle exploration using physical keypad selection and visual indicators',
      'Integrates DHT11 environmental sensing alongside dual TFT and OLED information screens',
    ],
    technologies: ['Arduino UNO', 'Mega', 'TFT', 'OLED', 'DHT11', 'Keypad'],
    visualSchematic: 'waveform',
  },
  {
    id: 'hw-03',
    indexLabel: 'H3',
    group: 'hardware',
    title: 'Smart Home Automation System',
    category: 'IoT & Automation',
    status: 'Hardware Prototype',
    summary:
      'An ESP32-powered home automation prototype designed to demonstrate connected home technology. Integrates hardware components with a mobile dashboard through Blynk for remote monitoring and control.',
    description:
      'A connected IoT prototype using an ESP32 microcontroller wired to relay modules and environmental sensors, bridging physical electrical switching with real-time mobile control via Blynk IoT.',
    highlights: [
      'Remote device switching and automation logic driven by ESP32 and relay modules',
      'Live sensor telemetry synced to a mobile Blynk IoT dashboard',
      'Demonstrates practical Wi-Fi IoT control loops and hardware-to-cloud integration',
    ],
    technologies: ['ESP32', 'Blynk IoT', 'Sensors', 'Relay Modules'],
    visualSchematic: 'iot',
  },
  {
    id: 'hw-04',
    indexLabel: 'H4',
    group: 'hardware',
    title: 'ORBIT — Satellite Project',
    category: 'Aerospace & Electronics',
    status: 'Engineering Project',
    summary:
      'An educational satellite engineering project exploring space technology, satellite systems and electronics. A showcase of aerospace engineering concepts and building technology beyond Earth.',
    description:
      'An interdisciplinary aerospace engineering initiative examining satellite subsystems, onboard electronics architecture, and mission-focused hardware design principles.',
    highlights: [
      'Explores core satellite subsystems including power, telemetry, and payload electronics',
      'Translates aerospace engineering principles into structured educational hardware design',
      'Highlights long-term interest in space technology and off-world electronics',
    ],
    technologies: ['Satellite Engineering', 'Electronics', 'Aerospace'],
    visualSchematic: 'orbit',
  },
  {
    id: 'hw-05',
    indexLabel: 'H5',
    group: 'hardware',
    title: 'Automatic Smart Dustbin',
    category: 'Robotics & Automation',
    status: 'Hardware Build',
    summary:
      'An automated waste bin designed to detect nearby objects and operate its lid without requiring physical contact. Uses distance sensing and servo-controlled movement to demonstrate practical automation.',
    description:
      'A contactless physical automation build combining ultrasonic distance measurement with calibrated servo motor actuation to open and close the bin lid smoothly when proximity is detected.',
    highlights: [
      'Real-time proximity detection using ultrasonic distance sensing',
      'Smooth, timed lid actuation powered by servo motor control',
      'Demonstrates reliable everyday mechanical-electronic automation',
    ],
    technologies: ['Ultrasonic Sensor', 'Servo Motor', 'Arduino', 'Automation'],
    imageUrl: ASSETS.aboutStudio,
  },
];

export const SOFTWARE_PROJECTS: ProjectItem[] = [
  {
    id: 'sw-01',
    indexLabel: 'S1',
    group: 'software',
    title: 'LEXORA AI',
    category: 'AI & Legal Intelligence',
    status: 'Live App',
    summary:
      'A UAE-focused private legal intelligence workspace featuring attested legal source tracking, semantic ML retrieval, Gemini-assisted analysis, and independent quote verification.',
    description:
      'Engineered to bring verifiable precision to UAE legal research, LEXORA AI pairs semantic retrieval and AI-assisted synthesis with strict citation attestation so every insight traces back to verified statutory sources.',
    highlights: [
      'Attested legal source tracking with independent quote verification workflows',
      'Semantic ML retrieval combined with Gemini-assisted legal analysis',
      'Focused dark workspace tailored for private UAE legal intelligence',
    ],
    technologies: ['Generative AI', 'Semantic Retrieval', 'JavaScript', 'Google AI Studio'],
    imageUrl: ASSETS.projectAiNeural,
    liveDemoUrl: 'https://lexora-ai-1.ai.studio',
    githubUrl: 'https://github.com/kevinantonakhil-coder/lexora-ai',
  },
  {
    id: 'sw-02',
    indexLabel: 'S2',
    group: 'software',
    title: 'FixMyRAK',
    category: 'Civic Tech & AI',
    status: 'Live App',
    summary:
      'An AI-powered community infrastructure reporting platform for Ras Al Khaimah, UAE — empowering residents to report civic issues, track resolution progress, and improve local neighborhoods.',
    description:
      'Built for local civic impact in Ras Al Khaimah, FixMyRAK streamlines community issue reporting with structured categorization, progress tracking, and an accessible web interface.',
    highlights: [
      'AI-assisted civic issue reporting workflow tailored for Ras Al Khaimah',
      'Transparent status tracking from initial report submission to resolution',
      'Built with TypeScript and modern responsive web architecture',
    ],
    technologies: ['TypeScript', 'React', 'Tailwind CSS', 'AI Integration'],
    visualSchematic: 'compiler',
    liveDemoUrl: 'https://kevinantonakhil-coder.github.io/fixmyrak-web/',
    githubUrl: 'https://github.com/kevinantonakhil-coder/fixmyrak-web',
  },
  {
    id: 'sw-03',
    indexLabel: 'S3',
    group: 'software',
    title: 'OBSCURA',
    category: 'Cybersecurity & Intelligence',
    status: 'Live App',
    summary:
      'A digital trust and intelligence platform built around the principle "See beyond the surface" — exploring security visibility, threat posture, and defensive intelligence.',
    description:
      'OBSCURA delivers a sleek, security-first interface focused on surfacing hidden digital risk signals and presenting digital trust concepts with clarity and authority.',
    highlights: [
      'High-contrast security intelligence interface built in TypeScript',
      'Explores digital trust, visibility, and cybersecurity concept presentation',
      'Deployed on GitHub Pages with clean modular frontend architecture',
    ],
    technologies: ['TypeScript', 'Cybersecurity Concepts', 'Web Security', 'GitHub Pages'],
    imageUrl: ASSETS.projectCyberMesh,
    liveDemoUrl: 'https://kevinantonakhil-coder.github.io/OBSCURA/',
    githubUrl: 'https://github.com/kevinantonakhil-coder/OBSCURA',
  },
  {
    id: 'sw-04',
    indexLabel: 'S4',
    group: 'software',
    title: 'StudySprint',
    category: 'AI Productivity',
    status: 'Live App',
    summary:
      'An elite AI-assisted study workspace engineered for academic momentum — generating customized study guides, active recall notes, and distraction-free focus sessions.',
    description:
      'StudySprint brings active recall science and AI-assisted study generation into one calm, focused workspace so learners can turn raw material into structured mastery sprints.',
    highlights: [
      'Customized study guide generation and structured active recall notes',
      'Distraction-free workspace parameters tailored for deep study sprints',
      'Built and deployed with Google AI Studio workflows',
    ],
    technologies: ['Google AI Studio', 'Generative AI', 'Prompt Engineering', 'Web App'],
    visualSchematic: 'network',
    liveDemoUrl: 'https://studysprintt.ai.studio',
  },
  {
    id: 'sw-05',
    indexLabel: 'S5',
    group: 'software',
    title: 'DevVault',
    category: 'Developer Dashboard',
    status: 'Live App',
    summary:
      'A local-first developer command center unifying project tracking, upcoming deadlines, weekly task completion, focus timers, productivity goals, and public GitHub repositories.',
    description:
      'Designed as a practical daily headquarters for developers, DevVault keeps tasks, sprint focus timers, activity logs, and GitHub repository overviews fast and local-first.',
    highlights: [
      'Local-first persistence for projects, deadlines, and productivity goals',
      'Integrated focus timer and weekly task distribution analytics',
      'Surfaces public GitHub repositories directly inside the dashboard',
    ],
    technologies: ['JavaScript', 'HTML', 'CSS', 'GitHub API'],
    visualSchematic: 'compiler',
    liveDemoUrl: 'https://kevinantonakhil-coder.github.io/DevVault/',
    githubUrl: 'https://github.com/kevinantonakhil-coder/DevVault',
  },
  {
    id: 'sw-06',
    indexLabel: 'S6',
    group: 'software',
    title: 'Vanta Motors',
    category: 'Automotive Showcase',
    status: 'Live App',
    summary:
      'A curated luxury and performance automotive showcase in Dubai, UAE — engineered with bold editorial typography, dramatic dark framing, and "Drive Beyond Ordinary" visual direction.',
    description:
      'Vanta Motors showcases high-performance and luxury vehicles through an atmospheric showroom layout focused on visual contrast, clean hierarchy, and responsive presentation.',
    highlights: [
      'Luxury automotive brand identity and dark-mode showroom layout',
      'Precision CSS styling and responsive showcase grid',
      'Crafted for high-impact visual presentation across desktop and mobile',
    ],
    technologies: ['HTML', 'CSS', 'Responsive Design', 'GitHub Pages'],
    liveDemoUrl: 'https://kevinantonakhil-coder.github.io/Vanta-Motors/',
    githubUrl: 'https://github.com/kevinantonakhil-coder/Vanta-Motors',
  },
  {
    id: 'sw-07',
    indexLabel: 'S7',
    group: 'software',
    title: 'Ember & Palm',
    category: 'Hospitality Web Experience',
    status: 'Live App',
    summary:
      'An atmospheric digital flagship for a wood-fire coastal kitchen and palm-grove courtyard — featuring editorial menu browsing, warm firelit visual storytelling, and table reservations.',
    description:
      'Ember & Palm translates the warmth of live-fire coastal dining into a refined web experience with intentional typography, curated menu views, and intuitive reservation flows.',
    highlights: [
      'Warm editorial typography paired with bespoke culinary storytelling',
      'Interactive menu browsing and table reservation flow',
      'Responsive multi-device layout deployed via GitHub Pages',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    liveDemoUrl: 'https://kevinantonakhil-coder.github.io/Ember-Palm/',
    githubUrl: 'https://github.com/kevinantonakhil-coder/Ember-Palm',
  },
  {
    id: 'sw-08',
    indexLabel: 'S8',
    group: 'software',
    title: 'Lunar Pet Care',
    category: 'Service Web Platform',
    status: 'Live App',
    summary:
      'A calm, modern pet-care platform for grooming, daycare, and boarding services — designed around warmth, clarity, and effortless everyday booking.',
    description:
      'Lunar Pet Care brings a friendly, trustworthy user experience to pet grooming and boarding with clean service breakdowns and responsive navigation.',
    highlights: [
      'Clear service architecture covering grooming, daycare, and boarding',
      'Warm, approachable visual design and balanced responsive layout',
      'Clean semantic HTML/CSS structure hosted on GitHub Pages',
    ],
    technologies: ['HTML', 'CSS', 'Responsive Design', 'GitHub Pages'],
    liveDemoUrl: 'https://kevinantonakhil-coder.github.io/Lunar-Pet-Care/',
    githubUrl: 'https://github.com/kevinantonakhil-coder/Lunar-Pet-Care',
  },
];

export const PROJECTS: ProjectItem[] = [...HARDWARE_PROJECTS, ...SOFTWARE_PROJECTS];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Programming Languages',
    subtitle: 'Core languages used across web, scripting, and microcontroller builds',
    items: [
      { name: 'HTML', status: 'Used in projects' },
      { name: 'CSS', status: 'Used in projects' },
      { name: 'JavaScript', status: 'Used in projects' },
      { name: 'Python', status: 'Used in projects' },
      { name: 'C / C++', status: 'Used in projects' },
      { name: 'Ruby', status: 'Currently learning' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    subtitle: 'Modern UI frameworks, styling, motion, and responsive web architecture',
    items: [
      { name: 'React', status: 'Used in projects' },
      { name: 'Tailwind CSS', status: 'Used in projects' },
      { name: 'Responsive Web Design', status: 'Used in projects' },
      { name: 'Progressive Web Apps (PWA)', status: 'Explored' },
      { name: 'Vite', status: 'Used in projects' },
      { name: 'Framer Motion', status: 'Used in projects' },
      { name: 'Next.js', status: 'Currently learning' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & Databases',
    subtitle: 'Practical backend integration and database/auth concepts explored',
    items: [
      { name: 'Supabase', status: 'Used in projects' },
      { name: 'REST APIs', status: 'Used in projects' },
      { name: 'Backend Integration', status: 'Used in projects' },
      { name: 'Firebase / BaaS Concepts', status: 'Explored' },
      { name: 'Auth & Database Concepts', status: 'Currently learning' },
    ],
  },
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    subtitle: 'Building practical AI-powered interfaces and prompt workflows',
    items: [
      { name: 'Google AI Studio', status: 'Used in projects' },
      { name: 'Generative AI Integration', status: 'Used in projects' },
      { name: 'AI-Assisted App Development', status: 'Used in projects' },
      { name: 'Prompt Engineering', status: 'Used in projects' },
      { name: 'AI-Powered Applications', status: 'Used in projects' },
    ],
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    subtitle: 'Practical Linux CLI usage alongside security concepts explored',
    items: [
      { name: 'Linux', status: 'Used in projects' },
      { name: 'Linux Command-Line Tools', status: 'Used in projects' },
      { name: 'Cybersecurity Fundamentals', status: 'Explored' },
      { name: 'Security Research', status: 'Explored' },
      { name: 'Threat Hunting Concepts', status: 'Explored' },
      { name: 'Web App Security Concepts', status: 'Explored' },
    ],
  },
  {
    id: 'electronics',
    title: 'Electronics & Embedded Systems',
    subtitle: 'Microcontrollers, displays, sensors, actuators, and circuit prototyping',
    items: [
      { name: 'Arduino UNO / Mega 2560 / Nano', status: 'Used in projects' },
      { name: 'ESP32 & ESP32-S3', status: 'Used in projects' },
      { name: 'OLED & TFT Displays', status: 'Used in projects' },
      { name: 'Ultrasonic & DHT11 Sensors', status: 'Used in projects' },
      { name: 'Servo Motors & Relay Modules', status: 'Used in projects' },
      { name: 'LED Modules, WS2812B & RFID', status: 'Used in projects' },
      { name: 'Breadboard Prototyping & I2C', status: 'Used in projects' },
    ],
  },
  {
    id: 'robotics',
    title: 'Robotics & Automation',
    subtitle: 'Physical computing, sensor-driven control, and connected hardware systems',
    items: [
      { name: 'Arduino-Based Automation', status: 'Used in projects' },
      { name: 'ESP32 Embedded Systems', status: 'Used in projects' },
      { name: 'Sensor Integration', status: 'Used in projects' },
      { name: 'Servo Motor Control', status: 'Used in projects' },
      { name: 'Hardware Prototyping', status: 'Used in projects' },
      { name: 'Smart Home Automation', status: 'Used in projects' },
      { name: 'Automated & Robotics Builds', status: 'Used in projects' },
    ],
  },
  {
    id: 'tools',
    title: 'Development Tools',
    subtitle: 'Daily workflow tools across software shipping and hardware flashing',
    items: [
      { name: 'Git & GitHub / GitHub Pages', status: 'Used in projects' },
      { name: 'Visual Studio Code', status: 'Used in projects' },
      { name: 'Arduino IDE', status: 'Used in projects' },
      { name: 'Linux', status: 'Used in projects' },
      { name: 'Vite & Supabase', status: 'Used in projects' },
      { name: 'Blynk IoT & Google AI Studio', status: 'Used in projects' },
    ],
  },
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'ach-01',
    title: 'RAKDOK & Google Hackathon 2026 — Certificate of Excellence',
    organization: 'Google for Education · Learn IT · Ras Al Khaimah Department of Knowledge · Higher Colleges of Technology',
    date: '2026',
    category: 'Hackathon',
    description:
      'Awarded the Google for Education Certificate of Excellence to Kevin Anton Akhil for participating in the RAKDOK and Google Hackathon 2026, presented in collaboration with Learn IT, the Ras Al Khaimah Department of Knowledge, and Higher Colleges of Technology.',
    certificateImageUrl: ASSETS.certificateHackathonImage,
    certificateNote: 'Verified Certificate',
    isPlaceholder: false,
  },
  {
    id: 'ach-02',
    title: '[ADDITIONAL ACHIEVEMENTS COMING SOON]',
    organization: '[UPCOMING CERTIFICATIONS, COMPETITIONS & MILESTONES]',
    date: 'Pending',
    category: 'Upcoming',
    description:
      'Additional hackathon awards, STEM accomplishments, and verified certificates will be added here as they are provided.',
    certificateNote: 'Ready for next credential upload',
    isPlaceholder: true,
  },
];

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    id: 'email',
    label: 'Direct Email',
    value: 'kevinantonakhil@gmail.com',
    href: 'mailto:kevinantonakhil@gmail.com',
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'github.com/kevinantonakhil-coder',
    href: 'https://github.com/kevinantonakhil-coder',
  },
];
