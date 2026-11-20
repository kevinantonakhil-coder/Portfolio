import { useState } from 'react';
import { Code2, Cpu, Shield, BrainCircuit } from 'lucide-react';
import { motion } from 'motion/react';
import { ASSETS, PROFILE } from '../data/portfolioData';

const DISCIPLINE_ICONS = {
  software: Code2,
  ai: BrainCircuit,
  security: Shield,
  hardware: Cpu,
} as const;

export default function AboutSection() {
  const [selectedId, setSelectedId] = useState<string>(PROFILE.focusDisciplines[0].id);
  const [imgError, setImgError] = useState(false);

  const activeDiscipline =
    PROFILE.focusDisciplines.find((d) => d.id === selectedId) ?? PROFILE.focusDisciplines[0];

  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 px-5 sm:px-8 border-t border-white/[0.06] bg-[#060810]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 sm:mb-16 max-w-2xl"
        >
          <p className="text-xs font-mono tracking-[0.18em] text-amber-300/90 mb-3">
            01. About
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white [text-wrap:balance]">
            Where software architecture meets physical hardware
          </h2>
        </motion.div>

        {/* Split-Screen Editorial Bio + Studio Image (items-stretch for equal column presence) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-between gap-8"
          >
            <div className="space-y-5">
              <p className="text-base sm:text-lg leading-relaxed text-slate-200 font-medium">
                {PROFILE.aboutLead}
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-slate-400">
                {PROFILE.aboutBody}
              </p>
            </div>

            {/* Interactive Discipline Detail Panel */}
            <div className="rounded-xl bg-[#0b0f1d] border border-white/[0.08] p-6">
              <div className="flex items-center justify-between gap-4 pb-4 mb-4 border-b border-white/[0.07]">
                <span className="text-xs font-mono text-slate-400">Active Focus Area</span>
                <span className="text-xs font-mono text-amber-300">{activeDiscipline.title}</span>
              </div>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed mb-3">
                {activeDiscipline.summary}
              </p>
              <p className="font-mono text-xs text-slate-400">{activeDiscipline.sampleFocus}</p>
            </div>
          </motion.div>

          {/* Right Column: Dusk Studio Workbench Photo */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col"
          >
            <div className="relative flex-1 min-h-[280px] lg:min-h-full rounded-xl overflow-hidden border border-white/[0.09] bg-[#0b0f1d]">
              {!imgError ? (
                <img
                  src={ASSETS.aboutStudio}
                  alt="Developer and electronics workbench at dusk with sunset window light"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-8 bg-gradient-to-br from-[#12172a] via-[#0c101f] to-[#1d1224]">
                  <span className="font-mono text-xs text-slate-400">
                    Software &amp; Hardware Lab Preview
                  </span>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#060810]/90 via-[#060810]/45 to-transparent p-5">
                <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                  <span>{PROFILE.locationPlaceholder}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-amber-300">Software &amp; Electronics Workbench</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-Width 4-Column Interactive Discipline Strip below the split */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {PROFILE.focusDisciplines.map((item) => {
            const Icon = DISCIPLINE_ICONS[item.id as keyof typeof DISCIPLINE_ICONS] ?? Code2;
            const isSelected = item.id === selectedId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                className={`text-left p-5 rounded-xl border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                  isSelected
                    ? 'bg-[#11172a] border-amber-400/50 text-white'
                    : 'bg-[#090d19] border-white/[0.07] text-slate-300 hover:border-white/20 hover:bg-[#0d1223]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon
                    className={`w-5 h-5 ${isSelected ? 'text-amber-300' : 'text-slate-400'}`}
                  />
                  <span className="text-xs font-mono text-slate-500">
                    {isSelected ? 'Selected' : 'Inspect'}
                  </span>
                </div>
                <h3 className="font-display text-base font-semibold tracking-tight text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">{item.summary}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
