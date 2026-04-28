import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, MapPin, Camera, Calendar, Users, Sparkles, Star, Map, Palette, Mail, Send, Shield } from 'lucide-react';

const screenshots = [
  {
    src: '/lovocado/login.png',
    alt: 'Lovocado Login',
    label: 'Welcome',
    description: 'Sign in with Apple, Google, or email to get started.',
    icon: Heart,
    accent: '#f472b6',
  },
  {
    src: '/lovocado/for-you-today.png',
    alt: 'For You - Today',
    label: 'For You',
    description: 'Track your anniversary, upcoming milestones, and daily prompts to stay connected.',
    icon: Calendar,
    accent: '#fb7185',
  },
  {
    src: '/lovocado/for-you-moments.png',
    alt: 'For You - Moments',
    label: 'Moments',
    description: 'Capture and revisit your favorite memories together — from first dates to spontaneous road trips.',
    icon: Star,
    accent: '#f9a8d4',
  },
  {
    src: '/lovocado/explore.png',
    alt: 'Explore',
    label: 'Explore',
    description: 'Discover date ideas for tonight. Dessert crawls, cozy cafes, park picnics — pick one and send it.',
    icon: Sparkles,
    accent: '#ec4899',
  },
  {
    src: '/lovocado/adventure.png',
    alt: 'Adventure Map',
    label: 'Adventure',
    description: 'Pin your favorite places on the map. Plan trips, book spots, and browse new destinations together.',
    icon: Map,
    accent: '#06b6d4',
  },
  {
    src: '/lovocado/profile.png',
    alt: 'Couple Profile',
    label: 'Profile',
    description: 'Your shared space — see your stats, milestones, and a year-in-review of your journey together.',
    icon: Users,
    accent: '#a78bfa',
  },
  {
    src: '/lovocado/theme.png',
    alt: 'Theme Settings',
    label: 'Personalize',
    description: 'Make it yours. Set a custom background photo, adjust blur and darkness, and pick your color palette.',
    icon: Palette,
    accent: '#f472b6',
  },
];

const Lovocado = () => {
  const navigate = useNavigate();
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [heroVisible, setHeroVisible] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setHeroVisible(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.idx);
            setVisibleCards((prev) => new Set([...prev, idx]));
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(formTitle || 'Contact from Lovocado');
    const body = encodeURIComponent(formMessage);
    window.location.href = `mailto:admin@summitwanderlust.com?subject=${subject}&body=${body}`;
    setSubmitStatus('success');
    setFormTitle('');
    setFormMessage('');
    setTimeout(() => setSubmitStatus(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#faf5f0] relative overflow-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />

      {/* Warm ambient background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #fce7f3 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #fde68a 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #fbcfe8 0%, transparent 70%)' }} />
      </div>

      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-stone-200/60 text-stone-600 hover:text-stone-900 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back</span>
      </button>

      {/* Hero Section */}
      <header className="relative pt-28 pb-16 px-6 text-center">
        <div
          className="transition-all duration-1000 ease-out"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          {/* Heart icon */}
          <div className="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-8"
            style={{ background: 'linear-gradient(135deg, #f472b6, #ec4899)' }}>
            <Heart className="w-10 h-10 text-white" fill="white" />
          </div>

          <h1
            className="text-5xl md:text-7xl font-bold text-stone-800 mb-4 tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            lovocado
          </h1>
          <p className="text-lg md:text-xl text-stone-500 max-w-md mx-auto leading-relaxed mb-3">
            Stay connected with your partner
          </p>
          <p className="text-sm text-stone-400 max-w-lg mx-auto leading-relaxed">
            Track milestones, plan adventures, capture moments, and build your story together — all in one beautiful app.
          </p>
        </div>

        {/* Decorative divider */}
        <div className="mt-14 flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-pink-300/50" />
          <Heart className="w-3 h-3 text-pink-300" fill="currentColor" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-pink-300/50" />
        </div>
      </header>

      {/* Screenshot Showcase */}
      <main className="max-w-6xl mx-auto px-6 pb-32">
        <div className="space-y-24 md:space-y-32">
          {screenshots.map((shot, i) => {
            const Icon = shot.icon;
            const isEven = i % 2 === 0;
            const visible = visibleCards.has(i);
            return (
              <div
                key={i}
                ref={(el) => (cardRefs.current[i] = el)}
                data-idx={i}
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 md:gap-16`}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(50px)',
                  transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
                }}
              >
                {/* Phone mockup */}
                <div className="flex-shrink-0 relative group">
                  {/* Glow behind phone */}
                  <div
                    className="absolute -inset-6 rounded-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                    style={{ background: `radial-gradient(circle, ${shot.accent}22, transparent 70%)` }}
                  />
                  {/* Phone frame */}
                  <div className="relative bg-stone-900 rounded-[2.5rem] p-2.5 shadow-2xl shadow-stone-300/50 transition-transform duration-500 group-hover:scale-[1.02]">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-stone-900 rounded-b-2xl z-10" />
                    {/* Screen */}
                    <div className="rounded-[2rem] overflow-hidden bg-white w-[260px] h-[563px] md:w-[280px] md:h-[607px]">
                      <img
                        src={shot.src}
                        alt={shot.alt}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className={`text-center ${isEven ? 'md:text-left' : 'md:text-right'} max-w-sm`}>
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-4`}
                    style={{ background: `${shot.accent}18`, color: shot.accent }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {shot.label}
                  </div>
                  <h2
                    className="text-2xl md:text-3xl font-bold text-stone-800 mb-3"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {shot.alt}
                  </h2>
                  <p className="text-stone-500 leading-relaxed">
                    {shot.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-32 text-center">
          <div className="inline-block">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-pink-300/50" />
              <Heart className="w-4 h-4 text-pink-400" fill="currentColor" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-pink-300/50" />
            </div>
            <p
              className="text-2xl md:text-3xl font-bold text-stone-800 mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Your love story, beautifully kept.
            </p>
            <p className="text-stone-400 text-sm">Available soon on iOS</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-32 max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-stone-200">
            <div className="flex items-center gap-3 mb-6">
              <Mail className="w-6 h-6 text-pink-500" />
              <h2 className="text-2xl font-semibold text-stone-900">Get in Touch</h2>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-stone-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition-all bg-white"
                  placeholder="Enter message title"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition-all resize-none bg-white"
                  placeholder="Enter your message..."
                  required
                />
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
                  Your email client should open shortly with the message prepared.
                </div>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-xl transition-all shadow-lg hover:shadow-xl"
              >
                <Send className="w-5 h-5" />
                <span>Open Email to admin@summitwanderlust.com</span>
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-stone-200">
              <a
                href="/lovocado/privacy-policy"
                onClick={(e) => { e.preventDefault(); navigate('/lovocado/privacy-policy'); }}
                className="text-sm text-stone-600 hover:text-pink-600 transition-colors inline-flex items-center gap-1"
              >
                <Shield className="w-4 h-4" />
                <span>Privacy Policy</span>
              </a>
            </div>
          </div>
        </div>

        {/* Privacy Policy link */}
        <div className="mt-16 text-center">
          <a
            href="/lovocado/privacy-policy"
            onClick={(e) => { e.preventDefault(); navigate('/lovocado/privacy-policy'); }}
            className="text-sm text-stone-400 hover:text-pink-500 transition-colors duration-200 underline underline-offset-4 decoration-stone-300 hover:decoration-pink-400"
          >
            Privacy Policy
          </a>
        </div>
      </main>
    </div>
  );
};

export default Lovocado;
