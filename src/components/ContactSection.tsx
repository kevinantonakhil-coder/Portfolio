import { FormEvent, useState } from 'react';
import { Check, Copy, ExternalLink, Github, Mail, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { CONTACT_CHANNELS, PROFILE } from '../data/portfolioData';

const CHANNEL_ICONS = {
  email: Mail,
  github: Github,
} as const;

export default function ContactSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formFeedback, setFormFeedback] = useState<string | null>(null);

  const handleCopy = async (id: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderEmail.trim() || !message.trim()) {
      setFormFeedback('Please fill in your name, email, and message before sending.');
      return;
    }

    const subject = encodeURIComponent(`Portfolio Inquiry from ${senderName.trim()}`);
    const body = encodeURIComponent(
      `Name: ${senderName.trim()}\nEmail: ${senderEmail.trim()}\n\n${message.trim()}`
    );
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    setFormFeedback(
      `Opening your email client addressed to ${PROFILE.email}. You can also copy the address directly on the left.`
    );
  };

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 px-5 sm:px-8 border-t border-white/[0.06] bg-[#060810]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Editorial CTA + Verified Contact Channels */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-8"
          >
            <div>
              <p className="text-xs font-mono tracking-[0.18em] text-amber-300/90 mb-3">
                06. Contact
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white [text-wrap:balance] mb-4">
                Let&apos;s build something meaningful together
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-lg">
                Reach out directly for collaborations across web engineering, AI applications,
                cybersecurity learning, or hardware and robotics builds.
              </p>
            </div>

            {/* Verified Channel List (Email + GitHub only) */}
            <div className="space-y-3">
              {CONTACT_CHANNELS.map((channel) => {
                const Icon = CHANNEL_ICONS[channel.id];
                const isCopied = copiedId === channel.id;
                const isExternal = channel.id === 'github';
                return (
                  <div
                    key={channel.id}
                    className="flex items-center justify-between gap-4 p-4 rounded-xl bg-[#0b0f1d] border border-white/[0.08] hover:border-amber-300/35 transition-colors"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-amber-300 shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs text-slate-400">{channel.label}</div>
                        <a
                          href={channel.href}
                          target={isExternal ? '_blank' : undefined}
                          rel={isExternal ? 'noopener noreferrer' : undefined}
                          className="font-mono text-xs sm:text-sm text-slate-100 hover:text-amber-300 transition-colors truncate block"
                        >
                          {channel.value}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleCopy(channel.id, channel.value)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/10 text-xs font-mono text-slate-300 hover:text-amber-200 transition-colors cursor-pointer"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-amber-300" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>

                      <a
                        href={channel.href}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        aria-label={`Open ${channel.label}`}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-amber-400/15 border border-amber-400/30 text-amber-300 hover:bg-amber-400 hover:text-[#060810] transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Interactive Message Composer */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl bg-[#0b0f1d] border border-white/[0.09] p-6 sm:p-8 space-y-5"
            >
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/[0.07]">
                <h3 className="font-display text-xl font-semibold text-white">Send a Message</h3>
                <span className="font-mono text-xs text-amber-300/90 truncate">
                  {PROFILE.email}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="block text-xs font-medium text-slate-300">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#070a14] border border-white/10 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-300/60"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="block text-xs font-medium text-slate-300">
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#070a14] border border-white/10 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-300/60"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="block text-xs font-medium text-slate-300">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details about your project, collaboration, or engineering inquiry..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#070a14] border border-white/10 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-300/60 resize-y"
                />
              </div>

              {formFeedback && (
                <div className="rounded-lg bg-amber-400/10 border border-amber-400/30 px-4 py-3 text-xs text-amber-200 leading-relaxed">
                  {formFeedback}
                </div>
              )}

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-amber-400 to-rose-400 text-[#060810] font-semibold text-sm hover:brightness-110 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send via Email</span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
