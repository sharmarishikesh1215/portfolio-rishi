import React, { useState } from 'react';
import { Mail, Linkedin, Github, Download, Send, CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortfolio } from '../../context/PortfolioContext';

export const ContactSection: React.FC = () => {
  const { profile, addContactMessage } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '', // spam prevention hidden input
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    if (profile.email) {
      navigator.clipboard.writeText(profile.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Spam honeypot detection
    if (formData.honeypot) {
      setStatus('success');
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('submitting');
    try {
      await addContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim() || 'General Inquiry',
        message: formData.message.trim(),
      });

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });

      // Trigger subtle celebratory confetti
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#0071E3', '#2997FF', '#34C759'],
      });
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Failed to submit message. Please try again or reach out directly.');
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 px-6 bg-apple-gray-50 dark:bg-apple-dark-surface/30 transition-colors">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-widest text-apple-light-accent dark:text-apple-dark-accent font-semibold block mb-3">
            Inquiries &amp; Collaborations
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-apple-light-primary dark:text-apple-dark-primary mb-4">
            Have something worth building?
          </h2>
          <p className="text-lg sm:text-xl text-apple-light-secondary dark:text-apple-dark-secondary">
            Let's discuss engineering, automation, testing, or the next interesting challenge.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Direct Communication Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-white dark:bg-apple-dark-surface border border-black/5 dark:border-white/10 shadow-apple-card dark:shadow-apple-dark-card space-y-6">
              <h3 className="text-xl font-bold tracking-tight text-apple-light-primary dark:text-apple-dark-primary">
                Direct Channels
              </h3>
              <p className="text-sm text-apple-light-secondary dark:text-apple-dark-secondary leading-relaxed">
                Whether you are seeking a high-velocity SDET, looking to scale test automation architectures, or discussing quality principles, I respond within 24 hours.
              </p>

              {/* Email channel with one-click copy */}
              {profile.email && (
                <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-apple-light-accent/10 dark:bg-apple-dark-accent/10 text-apple-light-accent dark:text-apple-dark-accent">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary block">
                        Email Address
                      </span>
                      <a
                        href={`mailto:${profile.email}`}
                        className="text-xs sm:text-sm font-medium text-apple-light-primary dark:text-apple-dark-primary hover:text-apple-light-accent transition-colors"
                      >
                        {profile.email}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    type="button"
                    className="p-2 rounded-lg text-apple-light-secondary dark:text-apple-dark-secondary hover:text-apple-light-primary dark:hover:text-apple-dark-primary transition-colors"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              )}

              {/* Social Channels */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {profile.linkedin_url && (
                  <a
                    href={profile.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 hover:border-black/15 dark:hover:border-white/15 text-xs font-semibold text-apple-light-primary dark:text-apple-dark-primary transition-all"
                  >
                    <Linkedin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>LinkedIn</span>
                  </a>
                )}

                {profile.github_url && (
                  <a
                    href={profile.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 hover:border-black/15 dark:hover:border-white/15 text-xs font-semibold text-apple-light-primary dark:text-apple-dark-primary transition-all"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                )}
              </div>

              {/* Resume Download CTA */}
              <div className="pt-4 border-t border-black/5 dark:border-white/10">
                <a
                  href={profile.resume_url || '/resume.pdf'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex justify-center items-center gap-2 py-3 px-4 rounded-2xl bg-apple-light-accent dark:bg-apple-dark-accent text-white dark:text-black font-semibold text-xs transition-transform active:scale-95 shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Curriculum Vitae (PDF)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-apple-dark-surface border border-black/5 dark:border-white/10 shadow-apple-card dark:shadow-apple-dark-card">
              <h3 className="text-xl font-bold tracking-tight text-apple-light-primary dark:text-apple-dark-primary mb-2">
                Send a Message
              </h3>
              <p className="text-xs sm:text-sm text-apple-light-secondary dark:text-apple-dark-secondary mb-8">
                All submissions are securely logged and routed immediately.
              </p>

              {status === 'success' ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3 animate-in fade-in">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                  <h4 className="text-lg font-bold text-apple-light-primary dark:text-apple-dark-primary tracking-tight">
                    Message Delivered
                  </h4>
                  <p className="text-sm text-apple-light-secondary dark:text-apple-dark-secondary max-w-sm mx-auto">
                    Thank you for reaching out. I have received your note and will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    type="button"
                    className="mt-4 px-5 py-2 rounded-full text-xs font-semibold bg-white dark:bg-black text-apple-light-primary dark:text-apple-dark-primary border border-black/10 dark:border-white/10"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot field (hidden from real users) */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="honeypot"
                      tabIndex={-1}
                      value={formData.honeypot}
                      onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                      autoComplete="off"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-apple-light-secondary dark:text-apple-dark-secondary uppercase tracking-wider mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Steve Jobs"
                        className="w-full px-4 py-3 rounded-xl bg-apple-gray-100 dark:bg-black/40 border border-black/5 dark:border-white/10 text-sm text-apple-light-primary dark:text-apple-dark-primary placeholder:text-apple-light-secondary/50 focus:outline-none focus:border-apple-light-accent dark:focus:border-apple-dark-accent transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-apple-light-secondary dark:text-apple-dark-secondary uppercase tracking-wider mb-2">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="steve@apple.com"
                        className="w-full px-4 py-3 rounded-xl bg-apple-gray-100 dark:bg-black/40 border border-black/5 dark:border-white/10 text-sm text-apple-light-primary dark:text-apple-dark-primary placeholder:text-apple-light-secondary/50 focus:outline-none focus:border-apple-light-accent dark:focus:border-apple-dark-accent transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-apple-light-secondary dark:text-apple-dark-secondary uppercase tracking-wider mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="SDET Opportunity / Architecture Discussion"
                      className="w-full px-4 py-3 rounded-xl bg-apple-gray-100 dark:bg-black/40 border border-black/5 dark:border-white/10 text-sm text-apple-light-primary dark:text-apple-dark-primary placeholder:text-apple-light-secondary/50 focus:outline-none focus:border-apple-light-accent dark:focus:border-apple-dark-accent transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-apple-light-secondary dark:text-apple-dark-secondary uppercase tracking-wider mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Rishi, I'd like to talk about test automation architecture and..."
                      className="w-full px-4 py-3 rounded-xl bg-apple-gray-100 dark:bg-black/40 border border-black/5 dark:border-white/10 text-sm text-apple-light-primary dark:text-apple-dark-primary placeholder:text-apple-light-secondary/50 focus:outline-none focus:border-apple-light-accent dark:focus:border-apple-dark-accent transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-apple-light-primary dark:bg-white text-white dark:text-black font-semibold text-sm hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-50 shadow-apple-sm"
                  >
                    {status === 'submitting' ? (
                      <span>Sending message...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

