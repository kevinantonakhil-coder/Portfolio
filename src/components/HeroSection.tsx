import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, Terminal } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ASSETS, PROFILE } from '../data/portfolioData';

const CODE_SNIPPET_LINES = [
  { num: '01', tokens: [{ text: 'import', cls: 'text-violet-300' }, { text: ' { SensorFusion, TelemetryStream } ', cls: 'text-slate-200' }, { text: 'from', cls: 'text-violet-300' }, { text: " '@kev/core'", cls: 'text-amber-300' }] },
  { num: '02', tokens: [{ text: '', cls: '' }] },
  { num: '03', tokens: [{ text: 'export async function', cls: 'text-violet-300' }, { text: ' calibrateHorizon', cls: 'text-sky-300' }, { text: '(nodeId: string) {', cls: 'text-slate-300' }] },
  { num: '04', tokens: [{ text: '  const', cls: 'text-violet-300' }, { text: ' imu ', cls: 'text-slate-200' }, { text: '= await', cls: 'text-violet-300' }, { text: ' SensorFusion.connect(nodeId);', cls: 'text-slate-200' }] },
  { num: '05', tokens: [{ text: '  const', cls: 'text-violet-300' }, { text: ' stream ', cls: 'text-slate-200' }, { text: '= new', cls: 'text-violet-300' }, { text: ' TelemetryStream({ rateHz: 240 });', cls: 'text-amber-200' }] },
  { num: '06', tokens: [{ text: '  return', cls: 'text-violet-300' }, { text: ' stream.pipe(imu.stabilize());', cls: 'text-slate-200' }] },
  { num: '07', tokens: [{ text: '}', cls: 'text-slate-300' }] },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [heroImageError, setHeroImageError] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.2]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame = 0;
    let width = 0;
    let height = 0;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      hue: string;
    }

    const particles: Particle[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seedParticles = () => {
      particles.length = 0;
      const count = width < 768 ? 22 : 42;
      const palette = ['251, 191, 36', '251, 113, 133', '167, 139, 250', '125, 211, 252'];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.35) * 0.18,
          vy: -0.12 - Math.random() * 0.25,
          radius: 0.9 + Math.random() * 1.6,
          alpha: 0.15 + Math.random() * 0.45,
          hue: palette[i % palette.length],
        });
      }
    };

    resize();
    seedParticles();

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.hue}, ${p.alpha})`;
        ctx.fill();
      }
      animationFrame = requestAnimationFrame(draw);
    };

    animationFrame = requestAnimationFrame(draw);
    const onResize = () => {
      resize();
      seedParticles();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#060810] flex flex-col justify-between pt-20 pb-10"
    >
      {/* Sunset Atmospheric Visual Backdrop */}
      <motion.div
        aria-hidden="true"
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none select-none"
      >
        {!heroImageError ? (
          <img
            src={ASSETS.heroSunset}
            alt=""
            referrerPolicy="no-referrer"
            onError={() => setHeroImageError(true)}
            className="w-full h-full object-cover object-[72%_58%] md:object-[68%_56%] opacity-90 scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_70%_58%,rgba(245,158,11,0.45)_0%,rgba(236,72,153,0.28)_24%,rgba(109,40,217,0.2)_48%,#060810_78%)]" />
        )}

        {/* Measured Contrast Scrims preserving left-side readability & seamless bottom transition */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#060810] via-[#060810]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060810] via-transparent to-[#060810]/65" />

        {/* Subtle Solar Horizon Breathing Bloom */}
        <motion.div
          animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.04, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden md:block absolute right-[12%] top-[36%] w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.22)_0%,rgba(244,114,182,0.12)_42%,transparent_72%)] blur-2xl"
        />
      </motion.div>

      {/* Subtle Floating Atmospheric Particles */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Main Content Container */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 max-w-7xl w-full mx-auto px-5 sm:px-8 my-auto py-8 lg:py-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Hero Typography & Primary Actions */}
          <div className="lg:col-span-6 max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-xs sm:text-sm tracking-[0.22em] text-amber-300/95 font-medium mb-3"
            >
              {PROFILE.greeting}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl sm:text-5xl lg:text-[4rem] font-bold tracking-tight leading-[1.04] text-white [text-wrap:balance] mb-4"
            >
              {PROFILE.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-xl sm:text-2xl lg:text-[1.75rem] font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-200 to-violet-200 mb-5"
            >
              {PROFILE.subtitle}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-[1.0625rem] leading-relaxed text-slate-300 max-w-lg mb-8"
            >
              {PROFILE.heroDescription}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4"
            >
              <button
                type="button"
                onClick={() => scrollTo('projects')}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-gradient-to-r from-amber-400 to-rose-400 text-[#060810] font-semibold text-sm hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060810]"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0d1221]/80 backdrop-blur-md border border-white/20 text-slate-100 font-medium text-sm hover:border-amber-300/60 hover:bg-[#131a2f]/90 transition-all cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
              >
                <span>Get In Touch</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Integrated Futuristic Coding Environment over the Twilight Horizon */}
          <div className="lg:col-span-6 relative flex flex-col items-end justify-center lg:min-h-[440px]">
            {/* Subtle Technical Horizon Vector Lines */}
            <svg
              aria-hidden="true"
              viewBox="0 0 520 360"
              className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none opacity-45"
            >
              <defs>
                <linearGradient id="horizonArcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity="0.15" />
                  <stop offset="50%" stopColor="#f472b6" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              <path
                d="M 40 70 Q 250 10 470 120"
                fill="none"
                stroke="url(#horizonArcGrad)"
                strokeWidth="1"
                strokeDasharray="4 6"
              />
              <path
                d="M 110 310 Q 300 220 490 250"
                fill="none"
                stroke="url(#horizonArcGrad)"
                strokeWidth="1"
              />
              <circle cx="470" cy="120" r="2.5" fill="#fbbf24" opacity="0.8" />
              <circle cx="110" cy="310" r="2.5" fill="#818cf8" opacity="0.7" />
            </svg>

            {/* Translucent Floating Code Editor Window (positioned slightly high-right so sun horizon breathes underneath) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[450px] lg:-translate-y-10 rounded-xl bg-[#090d1a]/70 backdrop-blur-xl border border-white/15 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.75)] overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-white/[0.03]">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-300/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400/70" />
                </div>
                <span className="font-mono text-[11px] text-slate-400">horizon_ctrl.ts</span>
                <span className="font-mono text-[11px] text-amber-300/80">TypeScript</span>
              </div>
              <div className="p-4 font-mono text-[11.5px] sm:text-xs leading-relaxed overflow-x-auto">
                {CODE_SNIPPET_LINES.map((line) => (
                  <div key={line.num} className="flex gap-3 whitespace-pre">
                    <span className="text-slate-600 select-none w-4 text-right">{line.num}</span>
                    <span>
                      {line.tokens.map((tok, idx) => (
                        <span key={idx} className={tok.cls}>
                          {tok.text}
                        </span>
                      ))}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Compact Floating Terminal Preview Window */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[360px] mt-4 lg:mt-0 lg:translate-y-6 lg:-translate-x-10 rounded-xl bg-[#080c17]/80 backdrop-blur-xl border border-indigo-400/20 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.85)] overflow-hidden"
            >
              <div className="flex items-center justify-between px-3.5 py-2 border-b border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-300">
                  <Terminal className="w-3.5 h-3.5 text-amber-300" />
                  <span>kev@workbench</span>
                </div>
                <button
                  type="button"
                  onClick={() => scrollTo('terminal')}
                  className="font-mono text-[11px] text-sky-300 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Open CLI
                </button>
              </div>
              <div className="p-3.5 font-mono text-[11.5px] leading-relaxed space-y-1.5 text-slate-300">
                <div>
                  <span className="text-amber-300">$</span> cargo build --release --target thumbv7em
                </div>
                <div className="text-slate-400 pl-3">Compiled firmware target in 1.42s</div>
                <div>
                  <span className="text-amber-300">$</span> pytest tests/vision_pipeline.py
                </div>
                <div className="text-sky-300/90 pl-3">14 passed · hardware &amp; software synced</div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Subtle Scroll Indicator */}
      <div className="relative z-10 flex justify-center pt-2">
        <button
          type="button"
          onClick={() => scrollTo('about')}
          className="group inline-flex flex-col items-center gap-2 text-xs font-mono tracking-wider text-slate-400 hover:text-amber-200 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded px-3 py-1"
        >
          <span>Scroll to explore</span>
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-4 h-4 text-amber-300/80 group-hover:text-amber-300" />
          </motion.span>
        </button>
      </div>
    </section>
  );
}
