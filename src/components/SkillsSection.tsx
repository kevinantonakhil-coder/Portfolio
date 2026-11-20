import { useState } from 'react';
import {
  Bot,
  BrainCircuit,
  Code2,
  Cpu,
  Database,
  Layout,
  ShieldCheck,
  Wrench,
} from 'lucide-react';
import { motion } from 'motion/react';
import { SKILL_CATEGORIES, SkillStatus } from '../data/portfolioData';

const CATEGORY_ICONS: Record<string, typeof Code2> = {
  languages: Code2,
  frontend: Layout,
  backend: Database,
  ai: BrainCircuit,
  cybersecurity: ShieldCheck,
  electronics: Cpu,
  robotics: Bot,
  tools: Wrench,
};

function statusLabelTone(status: SkillStatus) {
  switch (status) {
    case 'Used in projects':
      return 'text-amber-300/90';
    case 'Currently learning':
      return 'text-sky-300/90';
    case 'Explored':
      return 'text-slate-400';
  }
}

function shortStatusLabel(status: SkillStatus) {
  switch (status) {
    case 'Used in projects':
      return 'Applied';
    case 'Currently learning':
      return 'Learning';
    case 'Explored':
      return 'Explored';
  }
}

export default function SkillsSection() {
  const [selectedDomain, setSelectedDomain] = useState<string>('all');

  const visibleCategories =
    selectedDomain === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((cat) => cat.id === selectedDomain);

  return (
    <section
      id="skills"
      className="relative py-24 sm:py-32 px-5 sm:px-8 border-t border-white/[0.06] bg-[#070a14]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <p className="text-xs font-mono tracking-[0.18em] text-amber-300/90 mb-3">
              03. Technical Stack
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white [text-wrap:balance] mb-4">
              Multi-disciplinary tools across software and hardware
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Eight engineering domains reflecting tools applied in completed builds, technologies
              currently being learned, and concepts actively explored.
            </p>
          </motion.div>

          {/* Interactive Domain Filter */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#0b0f1d] border border-white/[0.08] self-start lg:self-auto max-w-full">
            <button
              type="button"
              onClick={() => setSelectedDomain('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedDomain === 'all'
                  ? 'bg-amber-400 text-[#060810] font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              All Domains
            </button>
            {SKILL_CATEGORIES.map((cat) => {
              const active = selectedDomain === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedDomain(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-amber-400 text-[#060810] font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {cat.title.split(' ')[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills Grid */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 ${
            selectedDomain === 'all' ? 'lg:grid-cols-4' : 'lg:grid-cols-1 max-w-2xl'
          } gap-5`}
        >
          {visibleCategories.map((category, idx) => {
            const Icon = CATEGORY_ICONS[category.id] ?? Code2;
            const categoryNumber = SKILL_CATEGORIES.findIndex((c) => c.id === category.id) + 1;
            return (
              <motion.div
                key={category.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-xl bg-[#0b0f1d] border border-white/[0.08] hover:border-amber-300/35 transition-colors p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-amber-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-slate-500 tabular-nums">
                      0{categoryNumber}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-semibold text-white mb-1">
                    {category.title}
                  </h3>
                  <p className="text-xs text-slate-400 mb-5 leading-relaxed">{category.subtitle}</p>
                </div>

                <ul className="space-y-2.5 pt-4 border-t border-white/[0.06]">
                  {category.items.map((skill) => (
                    <li
                      key={skill.name}
                      className="flex items-baseline justify-between gap-3 text-xs font-mono"
                    >
                      <span className="text-slate-200">{skill.name}</span>
                      <span
                        title={skill.status}
                        className={`text-[11px] shrink-0 ${statusLabelTone(skill.status)}`}
                      >
                        {shortStatusLabel(skill.status)}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Clean Unboxed Legend */}
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-slate-400">
          <span>
            <span className="text-amber-300/90">Applied</span> — Used in completed projects
          </span>
          <span>
            <span className="text-sky-300/90">Learning</span> — Currently learning
          </span>
          <span>
            <span className="text-slate-300">Explored</span> — Concept or workflow explored
          </span>
        </div>
      </div>
    </section>
  );
}
