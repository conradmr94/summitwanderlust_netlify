import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap, Home, Bell, CreditCard, Settings } from 'lucide-react';

const screenshots = [
  {
    src: '/motive/home.PNG',
    alt: 'Home Dashboard',
    label: 'Home',
    description: 'Your daily overview — see your goals, streaks, and what matters most at a glance.',
    icon: Home,
    accent: '#f59e0b',
  },
  {
    src: '/motive/alarm.PNG',
    alt: 'Smart Reminders',
    label: 'Reminders',
    description: 'Set smart alarms and nudges that keep you on track throughout the day.',
    icon: Bell,
    accent: '#ef4444',
  },
  {
    src: '/motive/payment.PNG',
    alt: 'Premium',
    label: 'Premium',
    description: 'Unlock the full experience with premium features designed to keep you motivated.',
    icon: CreditCard,
    accent: '#10b981',
  },
  {
    src: '/motive/settings.PNG',
    alt: 'Settings',
    label: 'Settings',
    description: 'Customize your experience — notifications, themes, and preferences, all in one place.',
    icon: Settings,
    accent: '#6366f1',
  },
];

const Motive = () => {
  const navigate = useNavigate();
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [heroVisible, setHeroVisible] = useState(false);
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

  return (
    <div className="min-h-screen bg-[#f5f5fa] relative overflow-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />

      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #fef3c7 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #c7d2fe 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #fde68a 0%, transparent 70%)' }} />
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
          {/* Icon */}
          <div className="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-8"
            style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)' }}>
            <Zap className="w-10 h-10 text-white" fill="white" />
          </div>

          <h1
            className="text-5xl md:text-7xl font-bold text-stone-800 mb-4 tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            motive
          </h1>
          <p className="text-lg md:text-xl text-stone-500 max-w-md mx-auto leading-relaxed mb-3">
            Stay focused. Stay driven.
          </p>
          <p className="text-sm text-stone-400 max-w-lg mx-auto leading-relaxed">
            Build better habits, track your progress, and stay motivated every single day.
          </p>
        </div>

        {/* Decorative divider */}
        <div className="mt-14 flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-300/50" />
          <Zap className="w-3 h-3 text-amber-400" fill="currentColor" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-300/50" />
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
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-300/50" />
              <Zap className="w-4 h-4 text-amber-400" fill="currentColor" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-300/50" />
            </div>
            <p
              className="text-2xl md:text-3xl font-bold text-stone-800 mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Your motivation, always within reach.
            </p>
            <p className="text-stone-400 text-sm">Available soon on iOS</p>
          </div>
        </div>

        {/* Privacy Policy link */}
        <div className="mt-16 text-center">
          <a
            href="/motive/privacy-policy"
            onClick={(e) => { e.preventDefault(); navigate('/motive/privacy-policy'); }}
            className="text-sm text-stone-400 hover:text-amber-500 transition-colors duration-200 underline underline-offset-4 decoration-stone-300 hover:decoration-amber-400"
          >
            Privacy Policy
          </a>
        </div>
      </main>
    </div>
  );
};

export default Motive;
