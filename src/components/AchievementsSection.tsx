import { useEffect, useState } from 'react';
import { Award, ExternalLink, FileCheck2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { ACHIEVEMENTS, AchievementItem } from '../data/portfolioData';

export default function AchievementsSection() {
  const [selected, setSelected] = useState<AchievementItem | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <section
      id="achievements"
      className="relative py-24 sm:py-32 px-5 sm:px-8 border-t border-white/[0.06] bg-[#060810]"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-12 sm:mb-14"
        >
          <p className="text-xs font-mono tracking-[0.18em] text-amber-300/90 mb-3">
            04. Achievements
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white [text-wrap:balance] mb-4">
            Hackathons, certifications, and milestones
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Verified certificates and hackathon recognition, with space reserved for upcoming
            credentials and awards.
          </p>
        </motion.div>

        {/* 2-Column Editorial Achievement Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ACHIEVEMENTS.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelected(item)}
              className={`group rounded-xl border transition-all p-6 sm:p-7 flex flex-col justify-between cursor-pointer ${
                item.isPlaceholder
                  ? 'bg-[#090d19] border-dashed border-white/15 hover:border-white/30'
                  : 'bg-[#0b0f1d] border-white/[0.09] hover:border-amber-300/45'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center flex-wrap gap-2 text-xs font-mono text-slate-400">
                    <span className={item.isPlaceholder ? 'text-slate-400' : 'text-amber-300'}>
                      {item.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{item.date}</span>
                  </div>
                  <Award
                    className={`w-5 h-5 shrink-0 transition-colors ${
                      item.isPlaceholder
                        ? 'text-slate-600'
                        : 'text-amber-300/80 group-hover:text-amber-300'
                    }`}
                  />
                </div>

                <h3 className="font-display text-xl font-semibold tracking-tight text-white group-hover:text-amber-200 transition-colors mb-1.5">
                  {item.title}
                </h3>

                <p className="text-xs font-mono text-slate-400 mb-4 leading-relaxed">
                  {item.organization}
                </p>

                <p className="text-sm text-slate-300 leading-relaxed mb-5">{item.description}</p>

                {item.certificateImageUrl && (
                  <div className="mb-5 rounded-lg overflow-hidden border border-white/10 bg-[#080c17] aspect-[16/10]">
                    <img
                      src={item.certificateImageUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/[0.06]">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400">
                  <FileCheck2 className="w-3.5 h-3.5 text-amber-300/80" />
                  <span>{item.certificateNote}</span>
                </span>

                {item.certificateImageUrl ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelected(item);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-300 hover:text-amber-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>View Certificate</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <span className="text-xs font-mono text-slate-500">Slot Ready</span>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Credential / Certificate Preview Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[80] bg-[#04060c]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="achievement-modal-title"
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0b0f1d] border border-white/15 p-6 sm:p-8 shadow-2xl space-y-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2">
                    <span className="text-amber-300">{selected.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{selected.date}</span>
                  </div>
                  <h3
                    id="achievement-modal-title"
                    className="font-display text-xl sm:text-2xl font-bold text-white"
                  >
                    {selected.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-1">{selected.organization}</p>
                </div>

                <button
                  type="button"
                  aria-label="Close credential preview"
                  onClick={() => setSelected(null)}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">{selected.description}</p>

              {selected.certificateImageUrl ? (
                <div className="space-y-4">
                  <div className="rounded-xl overflow-hidden border border-white/15 bg-[#080c17]">
                    <img
                      src={selected.certificateImageUrl}
                      alt={selected.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-auto block"
                    />
                  </div>
                  <div className="flex justify-end">
                    <a
                      href={selected.certificateImageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-400 text-[#060810] text-xs font-semibold hover:brightness-110 transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open Full Certificate Image</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-white/15 bg-[#080c17] p-6 text-center">
                  <FileCheck2 className="w-8 h-8 text-amber-300/75 mx-auto mb-2" />
                  <p className="font-mono text-xs text-slate-300">{selected.certificateNote}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Ready to display your next certificate or award
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
