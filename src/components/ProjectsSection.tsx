import { useEffect, useState } from 'react';
import { ArrowUpRight, Cpu, ExternalLink, Github, Globe, Layers, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  HARDWARE_PROJECTS,
  ProjectGroup,
  ProjectItem,
  SOFTWARE_PROJECTS,
} from '../data/portfolioData';

const GROUP_TABS: { id: ProjectGroup; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'hardware', label: 'Hardware Projects' },
  { id: 'software', label: 'Software Projects' },
];

function SchematicPreview({
  type,
  title,
}: {
  type?: ProjectItem['visualSchematic'];
  title: string;
}) {
  if (type === 'waveform') {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#0c1122] via-[#090d1a] to-[#1a1025] p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>UNO + MEGA BUS</span>
          <span className="text-amber-300/80">I2C · DHT11</span>
        </div>
        <svg viewBox="0 0 320 120" className="w-full h-28" aria-hidden="true">
          <defs>
            <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="50%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
          </defs>
          <line x1="0" y1="60" x2="320" y2="60" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 4" />
          <path
            d="M 0 60 Q 20 18, 40 60 T 80 60 T 120 60 T 160 60 T 200 60 T 240 60 T 280 60 T 320 60"
            fill="none"
            stroke="url(#waveGrad1)"
            strokeWidth="2.2"
          />
          <path
            d="M 0 78 L 35 78 L 42 36 L 92 36 L 99 88 L 155 88 L 162 42 L 220 42 L 227 78 L 320 78"
            fill="none"
            stroke="rgba(125,211,252,0.45)"
            strokeWidth="1.4"
          />
        </svg>
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>TFT + OLED Display</span>
          <span>Dual-Board Hardware</span>
        </div>
      </div>
    );
  }

  if (type === 'orbit') {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#070b18] via-[#0c1226] to-[#1c1129] p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>ORBIT MISSION</span>
          <span className="text-amber-300/80">Aerospace</span>
        </div>
        <svg viewBox="0 0 320 130" className="w-full h-28" aria-hidden="true">
          <ellipse
            cx="160"
            cy="65"
            rx="115"
            ry="34"
            transform="rotate(-14 160 65)"
            fill="none"
            stroke="rgba(251,191,36,0.45)"
            strokeWidth="1.3"
            strokeDasharray="4 4"
          />
          <ellipse
            cx="160"
            cy="65"
            rx="84"
            ry="24"
            transform="rotate(18 160 65)"
            fill="none"
            stroke="rgba(129,140,248,0.45)"
            strokeWidth="1.2"
          />
          <circle cx="160" cy="65" r="22" fill="#111831" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="256" cy="40" r="5" fill="#fbbf24" />
        </svg>
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>Satellite Systems</span>
          <span>Telemetry &amp; Electronics</span>
        </div>
      </div>
    );
  }

  if (type === 'iot') {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#0b1020] via-[#080c18] to-[#171127] p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>ESP32 + BLYNK IOT</span>
          <span className="text-sky-300/80">Relay Grid</span>
        </div>
        <div className="grid grid-cols-3 gap-2.5 my-auto font-mono text-[11px]">
          <div className="rounded border border-amber-400/30 bg-amber-400/10 p-2.5 text-center text-amber-200">
            ESP32 Core
          </div>
          <div className="rounded border border-sky-400/30 bg-sky-400/10 p-2.5 text-center text-sky-200">
            Blynk App
          </div>
          <div className="rounded border border-violet-400/30 bg-violet-400/10 p-2.5 text-center text-violet-200">
            Relay Bank
          </div>
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>Sensor Feedback</span>
          <span>Remote Switching</span>
        </div>
      </div>
    );
  }

  if (type === 'network') {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#0b1020] via-[#080c18] to-[#171127] p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>Active Recall Engine</span>
          <span className="text-sky-300/80">StudySprint</span>
        </div>
        <svg viewBox="0 0 320 130" className="w-full h-28" aria-hidden="true">
          <g stroke="rgba(148,163,184,0.28)" strokeWidth="1.2">
            <line x1="60" y1="34" x2="160" y2="65" />
            <line x1="60" y1="98" x2="160" y2="65" />
            <line x1="160" y1="65" x2="255" y2="32" stroke="rgba(251,191,36,0.55)" />
            <line x1="160" y1="65" x2="260" y2="96" />
          </g>
          <circle cx="60" cy="34" r="6" fill="#0f172a" stroke="#818cf8" strokeWidth="1.8" />
          <circle cx="60" cy="98" r="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.8" />
          <circle cx="160" cy="65" r="9" fill="#1e1b2e" stroke="#fbbf24" strokeWidth="2" />
          <circle cx="255" cy="32" r="6" fill="#0f172a" stroke="#f472b6" strokeWidth="1.8" />
          <circle cx="260" cy="96" r="6" fill="#0f172a" stroke="#818cf8" strokeWidth="1.8" />
        </svg>
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>Study Guides</span>
          <span>Focus Workspace</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-[#0e1222] via-[#090c17] to-[#1a1324] p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span>{title}</span>
        <span className="text-amber-300/80">Web App</span>
      </div>
      <div className="space-y-2.5 my-auto font-mono text-[11px]">
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded border border-white/10 bg-white/[0.03] px-2.5 py-2 text-slate-300 text-center">
            Interface
          </div>
          <div className="rounded border border-amber-400/30 bg-amber-400/10 px-2.5 py-2 text-amber-200 text-center">
            Core Logic
          </div>
          <div className="rounded border border-violet-400/30 bg-violet-400/10 px-2.5 py-2 text-violet-200 text-center">
            State
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
        <span>Production Build</span>
        <span>Live Deployment</span>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  idx,
  failedImages,
  onImageError,
  onSelect,
}: {
  project: ProjectItem;
  idx: number;
  failedImages: Record<string, boolean>;
  onImageError: (id: string) => void;
  onSelect: (project: ProjectItem) => void;
}) {
  const imgBroken = failedImages[project.id];

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.45, delay: Math.min(idx * 0.04, 0.24), ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onSelect(project)}
      className="group flex flex-col rounded-xl bg-[#0b0f1d] border border-white/[0.08] hover:border-amber-300/40 transition-all duration-200 overflow-hidden cursor-pointer"
    >
      {/* Visual Preview Area */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#080c17] border-b border-white/[0.06]">
        {project.imageUrl && !imgBroken ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            referrerPolicy="no-referrer"
            onError={() => onImageError(project.id)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full transition-transform duration-500 group-hover:scale-[1.02]">
            <SchematicPreview type={project.visualSchematic} title={project.title} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f1d]/80 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Card Body */}
      <div className="flex-1 flex flex-col justify-between p-6">
        <div>
          <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-xs font-mono text-slate-400 mb-3">
            <span className="text-amber-300/90">{project.indexLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.status}</span>
          </div>

          <h4 className="font-display text-lg sm:text-xl font-semibold tracking-tight text-white group-hover:text-amber-200 transition-colors mb-2.5">
            {project.title}
          </h4>

          <p className="text-sm text-slate-400 leading-relaxed mb-5 line-clamp-3">
            {project.summary}
          </p>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono text-slate-300 pb-4 mb-4 border-b border-white/[0.06]">
            {project.technologies.map((tech, tIdx) => (
              <span key={tech} className="inline-flex items-center gap-2.5">
                <span>{tech}</span>
                {tIdx < project.technologies.length - 1 && (
                  <span aria-hidden="true" className="text-slate-600">
                    /
                  </span>
                )}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-200 hover:text-amber-300 transition-colors whitespace-nowrap"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Demo</span>
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-amber-300 transition-colors whitespace-nowrap"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}

              {!project.liveDemoUrl && !project.githubUrl && (
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400">
                  <Cpu className="w-3.5 h-3.5 text-amber-300/80" />
                  <span>Physical Build</span>
                </span>
              )}
            </div>

            <span className="inline-flex items-center gap-1 text-xs font-mono text-amber-300/90 group-hover:translate-x-0.5 transition-transform">
              <span>Details</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectsSection() {
  const [activeGroup, setActiveGroup] = useState<ProjectGroup>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const showHardware = activeGroup === 'all' || activeGroup === 'hardware';
  const showSoftware = activeGroup === 'all' || activeGroup === 'software';

  return (
    <section
      id="projects"
      className="relative py-24 sm:py-32 px-5 sm:px-8 border-t border-white/[0.06] bg-[#060810]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header + Hardware / Software Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <p className="text-xs font-mono tracking-[0.18em] text-amber-300/90 mb-3">
              02. Selected Work
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white [text-wrap:balance] mb-4">
              Hardware builds and live software projects
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Organized into two core disciplines: embedded electronics &amp; robotics prototypes on
              the workbench, and shipped AI &amp; web applications on the web.
            </p>
          </motion.div>

          <div
            role="tablist"
            aria-label="Filter projects by section"
            className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#0b0f1d] border border-white/[0.08] self-start lg:self-auto"
          >
            {GROUP_TABS.map((tab) => {
              const active = activeGroup === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => setActiveGroup(tab.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                    active
                      ? 'bg-amber-400 text-[#060810] font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-20">
          {/* Subsection 1: Hardware Projects */}
          {showHardware && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 mb-8 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <Cpu className="w-5 h-5 text-amber-300" />
                  <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                    01. Hardware Projects
                  </h3>
                </div>
                <span className="font-mono text-xs text-slate-400">
                  {HARDWARE_PROJECTS.length} Builds · Arduino · ESP32 · Robotics
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {HARDWARE_PROJECTS.map((project, idx) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    idx={idx}
                    failedImages={failedImages}
                    onImageError={(id) =>
                      setFailedImages((prev) => ({ ...prev, [id]: true }))
                    }
                    onSelect={setSelectedProject}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Subsection 2: Software Projects */}
          {showSoftware && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 mb-8 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-sky-300" />
                  <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                    02. Software Projects
                  </h3>
                </div>
                <span className="font-mono text-xs text-slate-400">
                  {SOFTWARE_PROJECTS.length} Live Applications · AI · Security · Web
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SOFTWARE_PROJECTS.map((project, idx) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    idx={idx}
                    failedImages={failedImages}
                    onImageError={(id) =>
                      setFailedImages((prev) => ({ ...prev, [id]: true }))
                    }
                    onSelect={setSelectedProject}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Full Project Specification Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[80] bg-[#04060c]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-project-title"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0b0f1d] border border-white/15 shadow-2xl"
            >
              <div className="relative aspect-[16/9] w-full bg-[#080c17] border-b border-white/[0.08] overflow-hidden">
                {selectedProject.imageUrl && !failedImages[selectedProject.id] ? (
                  <img
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <SchematicPreview
                    type={selectedProject.visualSchematic}
                    title={selectedProject.title}
                  />
                )}
                <button
                  type="button"
                  aria-label="Close project details"
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-[#060810]/80 backdrop-blur-md border border-white/15 text-slate-200 hover:text-white hover:border-amber-300/60 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <div className="flex items-center flex-wrap gap-2 text-xs font-mono text-slate-400 mb-2">
                    <span className="text-amber-300">{selectedProject.indexLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>
                      {selectedProject.group === 'hardware'
                        ? 'Hardware Project'
                        : 'Software Project'}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{selectedProject.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{selectedProject.status}</span>
                  </div>
                  <h3
                    id="modal-project-title"
                    className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white"
                  >
                    {selectedProject.title}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  {selectedProject.summary}
                </p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {selectedProject.description}
                </p>

                <div>
                  <h4 className="text-xs font-mono text-slate-400 mb-2.5">
                    Architecture &amp; Highlights
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    {selectedProject.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="text-amber-300 font-mono mt-0.5">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/[0.08]">
                  <div className="text-xs font-mono text-slate-400 mb-2">Technologies</div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-slate-200">
                    {selectedProject.technologies.map((tech, idx) => (
                      <span key={tech} className="inline-flex items-center gap-3">
                        <span>{tech}</span>
                        {idx < selectedProject.technologies.length - 1 && (
                          <span aria-hidden="true" className="text-slate-600">
                            ·
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                {(selectedProject.liveDemoUrl || selectedProject.githubUrl) && (
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {selectedProject.liveDemoUrl && (
                      <a
                        href={selectedProject.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-400 text-[#060810] font-semibold text-xs hover:brightness-110 transition-all cursor-pointer"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Open Live Demo</span>
                      </a>
                    )}
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/10 border border-white/15 text-slate-100 font-medium text-xs hover:border-amber-300/50 transition-all cursor-pointer"
                      >
                        <Github className="w-4 h-4" />
                        <span>View on GitHub</span>
                      </a>
                    )}
                  </div>
                )}

                {!selectedProject.liveDemoUrl && !selectedProject.githubUrl && (
                  <div className="rounded-lg bg-white/[0.03] border border-white/[0.08] px-4 py-3 flex items-center gap-2.5 text-xs text-slate-300">
                    <Layers className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>
                      Physical hardware build — schematics, photos, or repository links can be
                      attached anytime.
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
