import { FormEvent, KeyboardEvent, useRef, useState } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';
import { motion } from 'motion/react';
import {
  ACHIEVEMENTS,
  CONTACT_CHANNELS,
  HARDWARE_PROJECTS,
  PROFILE,
  SKILL_CATEGORIES,
  SOFTWARE_PROJECTS,
} from '../data/portfolioData';

interface TerminalEntry {
  id: number;
  command: string;
  lines: { text: string; tone?: 'default' | 'accent' | 'muted' | 'sky' | 'error' }[];
}

const AVAILABLE_COMMANDS = [
  'help',
  'about',
  'projects',
  'skills',
  'achievements',
  'contact',
  'whoami',
  'ls',
  'clear',
];

const INITIAL_ENTRIES: TerminalEntry[] = [
  {
    id: 1,
    command: 'help',
    lines: [
      { text: 'KEV.DEV Interactive Shell — available commands:', tone: 'accent' },
      { text: '  help           List all available commands', tone: 'default' },
      { text: '  about          Display developer introduction & focus areas', tone: 'default' },
      { text: '  projects       Display hardware & software projects', tone: 'default' },
      { text: '  skills         Display technical stack across 8 domains', tone: 'default' },
      { text: '  achievements   Display verified certificates & milestones', tone: 'default' },
      { text: '  contact        Display email and GitHub profile', tone: 'default' },
      { text: '  clear          Clear terminal output', tone: 'default' },
    ],
  },
];

export default function TerminalSection() {
  const [entries, setEntries] = useState<TerminalEntry[]>(INITIAL_ENTRIES);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>(['help']);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [focused, setFocused] = useState(false);

  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollOutputToBottom = () => {
    requestAnimationFrame(() => {
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight;
      }
    });
  };

  const executeCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    const cmd = trimmed.toLowerCase();

    if (cmd === 'clear') {
      setEntries([]);
      setHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(-1);
      setInput('');
      return;
    }

    let lines: TerminalEntry['lines'] = [];

    switch (cmd) {
      case 'help':
        lines = INITIAL_ENTRIES[0].lines;
        break;
      case 'whoami':
        lines = [
          { text: `${PROFILE.fullName} (${PROFILE.name}) — ${PROFILE.subtitle}`, tone: 'accent' },
          { text: PROFILE.heroDescription, tone: 'default' },
        ];
        break;
      case 'about':
        lines = [
          { text: 'Developer Overview', tone: 'accent' },
          { text: PROFILE.aboutLead, tone: 'default' },
          { text: '', tone: 'default' },
          { text: 'Core Disciplines:', tone: 'sky' },
          ...PROFILE.focusDisciplines.map((d) => ({
            text: `  • ${d.title}: ${d.summary}`,
            tone: 'muted' as const,
          })),
        ];
        break;
      case 'projects':
        lines = [
          { text: `Hardware Projects (${HARDWARE_PROJECTS.length})`, tone: 'accent' },
          ...HARDWARE_PROJECTS.map((p) => ({
            text: `  [${p.indexLabel}] ${p.title} — ${p.technologies.join(' · ')}`,
            tone: 'default' as const,
          })),
          { text: '', tone: 'default' },
          { text: `Software Projects (${SOFTWARE_PROJECTS.length})`, tone: 'sky' },
          ...SOFTWARE_PROJECTS.map((p) => ({
            text: `  [${p.indexLabel}] ${p.title} — ${p.liveDemoUrl ?? p.category}`,
            tone: 'default' as const,
          })),
        ];
        break;
      case 'skills':
        lines = [
          { text: 'Technical Stack (8 Domains)', tone: 'accent' },
          ...SKILL_CATEGORIES.map((cat) => ({
            text: `  ${cat.title}: ${cat.items.map((i) => i.name).join(', ')}`,
            tone: 'default' as const,
          })),
        ];
        break;
      case 'achievements':
        lines = [
          { text: 'Achievements & Credentials', tone: 'accent' },
          ...ACHIEVEMENTS.filter((a) => !a.isPlaceholder).map((a) => ({
            text: `  • ${a.title} (${a.date})`,
            tone: 'default' as const,
          })),
        ];
        break;
      case 'contact':
        lines = [
          { text: 'Contact Channels', tone: 'accent' },
          ...CONTACT_CHANNELS.map((c) => ({
            text: `  ${c.label.padEnd(16, ' ')} ${c.value}`,
            tone: 'default' as const,
          })),
        ];
        break;
      case 'ls':
        lines = [
          {
            text: 'about.md   hardware/   software/   skills.json   certificates/   contact.txt',
            tone: 'sky',
          },
        ];
        break;
      default:
        lines = [
          {
            text: `Command not found: "${trimmed}". Type "help" to list available commands.`,
            tone: 'error',
          },
        ];
    }

    setEntries((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        command: trimmed,
        lines,
      },
    ]);
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);
    setInput('');
    scrollOutputToBottom();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    executeCommand(input);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInput(history[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      if (historyIndex >= history.length - 1) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInput(history[nextIdx]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const val = input.trim().toLowerCase();
      if (!val) return;
      const match = AVAILABLE_COMMANDS.find((c) => c.startsWith(val));
      if (match) setInput(match);
    }
  };

  const toneClass = (tone?: TerminalEntry['lines'][number]['tone']) => {
    switch (tone) {
      case 'accent':
        return 'text-amber-300 font-medium';
      case 'sky':
        return 'text-sky-300';
      case 'muted':
        return 'text-slate-400';
      case 'error':
        return 'text-rose-400';
      default:
        return 'text-slate-200';
    }
  };

  return (
    <section
      id="terminal"
      className="relative py-24 sm:py-32 px-5 sm:px-8 border-t border-white/[0.06] bg-[#070a14]"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 sm:mb-12"
        >
          <p className="text-xs font-mono tracking-[0.18em] text-amber-300/90 mb-3">
            05. Interactive Console
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance] mb-3">
            Explore the portfolio from the command line
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Type a command below, press Tab to autocomplete, use Up/Down arrows for history, or
            click a quick command button.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => inputRef.current?.focus()}
          className="rounded-2xl bg-[#080c17] border border-white/15 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.8)] overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 sm:px-5 py-3 bg-white/[0.03] border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-400/80" aria-hidden="true" />
              <span className="w-3 h-3 rounded-full bg-amber-300/80" aria-hidden="true" />
              <span className="w-3 h-3 rounded-full bg-sky-400/80" aria-hidden="true" />
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
              <TerminalIcon className="w-3.5 h-3.5 text-amber-300" />
              <span>kev@kev.dev:~</span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                executeCommand('clear');
              }}
              className="font-mono text-xs text-slate-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              clear
            </button>
          </div>

          <div
            ref={outputRef}
            className="p-4 sm:p-6 h-[340px] sm:h-[380px] overflow-y-auto font-mono text-xs sm:text-[13px] leading-relaxed space-y-4"
          >
            {entries.length === 0 && (
              <div className="text-slate-500">
                Terminal cleared. Type <span className="text-amber-300">help</span> to view
                commands.
              </div>
            )}

            {entries.map((entry) => (
              <div key={entry.id} className="space-y-1.5">
                <div className="flex items-center gap-2 text-slate-200">
                  <span className="text-amber-300 select-none">kev@dev:~$</span>
                  <span>{entry.command}</span>
                </div>
                <div className="pl-0 sm:pl-2 space-y-1 whitespace-pre-wrap break-words">
                  {entry.lines.map((line, i) => (
                    <div key={i} className={toneClass(line.tone)}>
                      {line.text || '\u00A0'}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="px-4 sm:px-6 py-3.5 bg-[#060912] border-t border-white/[0.08] flex items-center gap-2.5 font-mono text-xs sm:text-[13px]"
          >
            <label htmlFor="kev-terminal-input" className="text-amber-300 shrink-0 select-none">
              kev@dev:~$
            </label>
            <div className="relative flex-1 flex items-center">
              <input
                ref={inputRef}
                id="kev-terminal-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Type 'help', 'projects', 'skills'..."
                autoComplete="off"
                spellCheck={false}
                className="w-full bg-transparent text-slate-100 placeholder:text-slate-600 focus:outline-none caret-amber-300"
              />
              {!input && !focused && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 w-2 h-4 bg-amber-300/80 animate-pulse"
                />
              )}
            </div>
            <button
              type="submit"
              className="px-3 py-1.5 rounded bg-white/10 hover:bg-amber-400 hover:text-[#060810] text-slate-200 text-xs font-medium transition-colors cursor-pointer shrink-0"
            >
              Run
            </button>
          </form>

          <div className="px-4 sm:px-6 py-3 bg-[#05070e] border-t border-white/[0.06] flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] text-slate-500 mr-1">Quick run:</span>
            {['help', 'about', 'projects', 'skills', 'achievements', 'contact'].map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  executeCommand(cmd);
                }}
                className="px-2.5 py-1 rounded bg-white/[0.04] hover:bg-amber-400/15 border border-white/[0.08] hover:border-amber-300/40 font-mono text-[11px] text-slate-300 hover:text-amber-200 transition-colors cursor-pointer"
              >
                {cmd}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
