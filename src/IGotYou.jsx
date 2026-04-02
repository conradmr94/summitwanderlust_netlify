import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Mic, Phone, Video, Bell, Heart, Volume2, AlertTriangle } from 'lucide-react';

const features = [
  {
    icon: Mic,
    label: 'Voice Triggers',
    title: 'Just Say the Word',
    description: 'Say "help!" and your location is instantly texted to all emergency contacts. Say your custom safety word to call your primary contact. Say "scream" to blast a siren. Say "camera" to start stealth video.',
    gradient: 'from-rose-100 to-pink-50',
    iconColor: '#be185d',
    iconBg: '#fce7f3',
    border: '#fbcfe8',
  },
  {
    icon: Phone,
    label: 'Back Tap',
    title: 'Hidden Gestures',
    description: 'Double-tap the back of your phone to start audio recording. Triple-tap to immediately call your primary emergency contact or 911 — no unlocking, no opening the app.',
    gradient: 'from-purple-100 to-violet-50',
    iconColor: '#7c3aed',
    iconBg: '#ede9fe',
    border: '#ddd6fe',
  },
  {
    icon: AlertTriangle,
    label: 'Shake Detection',
    title: 'Panic in Your Hand',
    description: 'Shaking your phone automatically texts "I am in trouble" with your GPS location to your primary contact. A panic button you always have in your hand.',
    gradient: 'from-orange-100 to-amber-50',
    iconColor: '#c2410c',
    iconBg: '#ffedd5',
    border: '#fed7aa',
  },
  {
    icon: Bell,
    label: 'Check-In Timer',
    title: 'Auto-Alert if You Go Silent',
    description: 'Set a timer before heading somewhere risky. If you don\'t check in before it expires, the app automatically sends your location and an alert to all emergency contacts.',
    gradient: 'from-pink-100 to-rose-50',
    iconColor: '#be185d',
    iconBg: '#fce7f3',
    border: '#fbcfe8',
  },
  {
    icon: Phone,
    label: 'Fake Call',
    title: 'Escape Any Situation',
    description: 'Trigger a fake incoming call that looks completely real. Use it to step away from an uncomfortable situation naturally — no one will know it\'s not real.',
    gradient: 'from-teal-100 to-emerald-50',
    iconColor: '#0f766e',
    iconBg: '#ccfbf1',
    border: '#99f6e4',
  },
  {
    icon: Video,
    label: 'Stealth Video',
    title: 'Record Without a Trace',
    description: 'Start recording video discreetly with no visible indication on screen. Evidence captured quietly, whenever you need it.',
    gradient: 'from-blue-100 to-sky-50',
    iconColor: '#1d4ed8',
    iconBg: '#dbeafe',
    border: '#bfdbfe',
  },
  {
    icon: Volume2,
    label: 'Siren',
    title: 'Loud When It Counts',
    description: 'Blast a piercing siren that doesn\'t stop until you unlock your phone and tap the button. Draws immediate attention in any situation.',
    gradient: 'from-red-100 to-rose-50',
    iconColor: '#b91c1c',
    iconBg: '#fee2e2',
    border: '#fecaca',
  },
  {
    icon: Heart,
    label: 'Emergency Contacts',
    title: 'Up to 5 People in Your Corner',
    description: 'Add up to 5 emergency contacts. "Help!" broadcasts your location to all of them instantly. Your primary contact receives calls and individual texts for targeted situations.',
    gradient: 'from-rose-100 to-pink-50',
    iconColor: '#be185d',
    iconBg: '#fce7f3',
    border: '#fbcfe8',
  },
];


const IGotYou = () => {
  const navigate = useNavigate();
  const [visibleCards, setVisibleCards] = useState(new Set());
  const cardRefs = useRef([]);

  useEffect(() => {
    window.scrollTo(0, 0);
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
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen" style={{ background: '#fdf8f5', fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />

      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-200"
        style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid #fecdd3', color: '#9f1239', backdropFilter: 'blur(8px)', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back</span>
      </button>

      {/* ── HERO ── */}
      <header className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #fff0f3 0%, #fdf8f5 50%, #f5f0ff 100%)' }} />
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-30 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, #fda4af 0%, transparent 70%)' }} />

        <div className="relative max-w-3xl mx-auto px-6 pt-28 pb-20 text-center">
          {/* App icon */}
          <div className="mx-auto w-20 h-20 rounded-[22px] flex items-center justify-center mb-8 shadow-2xl"
            style={{ background: 'linear-gradient(145deg, #e11d48, #9f1239)', boxShadow: '0 20px 60px rgba(225,29,72,0.3)' }}>
            <Shield className="w-10 h-10 text-white" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
            style={{ background: '#fce7f3', color: '#be185d', border: '1px solid #fbcfe8' }}>
            Personal Safety · iOS App
          </div>

          <h1
            className="text-5xl md:text-7xl font-bold tracking-tight mb-5"
            style={{ fontFamily: "'Playfair Display', serif", color: '#1c0a12', lineHeight: 1.1 }}
          >
            i got you.
          </h1>

          <p className="text-xl md:text-2xl max-w-lg mx-auto leading-relaxed mb-4 font-light" style={{ color: '#6b2244' }}>
            Quietly protecting you — voice, gesture, and timer.
          </p>

          <p className="text-base max-w-md mx-auto leading-relaxed" style={{ color: '#9f6882' }}>
            No unlocking required. No visible indicators. Always ready.
          </p>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-8 mt-14 pt-10 border-t" style={{ borderColor: '#fecdd3' }}>
            {[
              { n: '8', label: 'Safety Features' },
              { n: '5', label: 'Emergency Contacts' },
              { n: '4', label: 'Voice Commands' },
            ].map(({ n, label }) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-bold mb-0.5" style={{ fontFamily: "'Playfair Display', serif", color: '#9f1239' }}>{n}</p>
                <p className="text-xs tracking-wide" style={{ color: '#9f6882' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ── QUOTE ── */}
      <section className="max-w-2xl mx-auto px-6 py-16">
        <div className="relative rounded-3xl p-10 text-center overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #fff0f3, #fdf4ff)', border: '1px solid #fecdd3' }}>
          {/* Large decorative quote mark */}
          <div className="absolute top-4 left-8 text-8xl font-serif leading-none select-none pointer-events-none" style={{ color: '#fecdd3' }}>"</div>
          <p
            className="relative text-lg md:text-xl leading-relaxed italic mb-5 z-10"
            style={{ fontFamily: "'Playfair Display', serif", color: '#6b2244' }}
          >
            Hope this app will not be useful at all for your life. Hope your life would be hazard free so that this app is absolutely useless.
          </p>
          <p
            className="text-lg md:text-xl leading-relaxed italic mb-6 z-10 relative"
            style={{ fontFamily: "'Playfair Display', serif", color: '#6b2244' }}
          >
            However, if it ever does —
          </p>
          <p className="text-2xl font-bold relative z-10" style={{ fontFamily: "'Playfair Display', serif", color: '#9f1239' }}>
            i got you.
          </p>
        </div>
      </section>

      {/* ── APP SCREENS ── */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-2" style={{ color: '#be185d' }}>App Preview</p>
          <h2 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#1c0a12' }}>Designed to Stay Out of Your Way</h2>
          <p className="text-sm mt-2" style={{ color: '#9f6882' }}>Clean, calm, and ready when you need it.</p>
        </div>

        {/* 3 phone mockups */}
        <div className="flex flex-col md:flex-row items-end justify-center gap-6">

          {/* Phone 1 — Home / Standby */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-[200px] h-[400px] rounded-[32px] overflow-hidden shadow-2xl relative flex flex-col"
              style={{ background: '#0f0610', border: '6px solid #1e0d1e', boxShadow: '0 40px 80px rgba(159,18,57,0.2), 0 0 0 1px #3a1030' }}>
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 rounded-b-xl z-10" style={{ background: '#0f0610' }} />
              {/* Status bar */}
              <div className="flex justify-between items-center px-5 pt-6 pb-2">
                <span className="text-white/50 text-[9px] font-medium">9:41</span>
                <div className="flex gap-1 items-center">
                  <div className="w-3 h-1.5 rounded-sm bg-white/40" />
                  <div className="w-0.5 h-1 rounded-sm bg-white/40" />
                </div>
              </div>
              {/* Content */}
              <div className="flex-1 flex flex-col items-center justify-center px-5 pb-8 gap-5">
                <div className="w-16 h-16 rounded-[18px] flex items-center justify-center shadow-lg"
                  style={{ background: 'linear-gradient(145deg, #e11d48, #9f1239)' }}>
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div className="text-center">
                  <p className="text-white text-base font-bold mb-1">I Got You</p>
                  <p className="text-white/40 text-[10px]">Listening · Protected</p>
                </div>
                {/* Status ring */}
                <div className="w-28 h-28 rounded-full flex items-center justify-center"
                  style={{ background: 'conic-gradient(#e11d48 0%, #7c3aed 60%, #1e0d1e 60%)', padding: 3 }}>
                  <div className="w-full h-full rounded-full flex items-center justify-center" style={{ background: '#0f0610' }}>
                    <div className="text-center">
                      <p className="text-white text-xl font-bold">ON</p>
                      <p className="text-white/30 text-[9px]">Active</p>
                    </div>
                  </div>
                </div>
                {/* Bottom row */}
                <div className="flex gap-3 mt-2">
                  {[Mic, Bell, Phone].map((Icon, j) => (
                    <div key={j} className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <Icon className="w-4 h-4 text-white/50" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-xs font-medium" style={{ color: '#9f6882' }}>Home · Always On</p>
          </div>

          {/* Phone 2 — Alert triggered (center, taller) */}
          <div className="flex flex-col items-center gap-3 md:-mb-8">
            <div className="w-[220px] h-[450px] rounded-[36px] overflow-hidden shadow-2xl relative flex flex-col"
              style={{ background: '#1a0008', border: '6px solid #3a1020', boxShadow: '0 50px 100px rgba(225,29,72,0.3), 0 0 0 1px #5a1830' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 rounded-b-xl z-10" style={{ background: '#1a0008' }} />
              <div className="flex justify-between items-center px-5 pt-6 pb-2">
                <span className="text-white/50 text-[9px] font-medium">9:41</span>
                <div className="flex gap-1 items-center">
                  <div className="w-3 h-1.5 rounded-sm bg-white/40" />
                  <div className="w-0.5 h-1 rounded-sm bg-white/40" />
                </div>
              </div>
              {/* Alert screen */}
              <div className="flex-1 flex flex-col px-5 pb-6 pt-4">
                {/* Alert banner */}
                <div className="rounded-2xl p-4 mb-4" style={{ background: 'rgba(225,29,72,0.15)', border: '1px solid rgba(225,29,72,0.3)' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#e11d48' }} />
                    <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider">Alert Sent</span>
                  </div>
                  <p className="text-white text-xs font-medium leading-tight">Location shared with 3 contacts</p>
                </div>
                {/* Contacts notified */}
                <p className="text-white/30 text-[9px] uppercase tracking-widest mb-2">Notified</p>
                {['Mom', 'Sarah K.', 'Jake M.'].map((name, j) => (
                  <div key={j} className="flex items-center gap-2.5 py-2.5 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                      style={{ background: `hsl(${j * 60 + 330}, 50%, 35%)` }}>{name[0]}</div>
                    <div className="flex-1">
                      <p className="text-white text-[11px] font-medium">{name}</p>
                      <p className="text-white/30 text-[9px]">Text + location sent</p>
                    </div>
                    <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: '#16a34a' }}>
                      <span className="text-white text-[7px]">✓</span>
                    </div>
                  </div>
                ))}
                {/* Map placeholder */}
                <div className="mt-4 rounded-xl flex-1 flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', minHeight: 80 }}>
                  <div className="text-center">
                    <div className="w-5 h-5 rounded-full mx-auto mb-1 flex items-center justify-center" style={{ background: '#e11d48' }}>
                      <span className="text-white text-[8px]">📍</span>
                    </div>
                    <p className="text-white/30 text-[9px]">Live location shared</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xs font-medium" style={{ color: '#9f1239' }}>Alert · Location Shared</p>
          </div>

          {/* Phone 3 — Emergency contacts */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-[200px] h-[400px] rounded-[32px] overflow-hidden shadow-2xl relative flex flex-col"
              style={{ background: '#07060f', border: '6px solid #1a1830', boxShadow: '0 40px 80px rgba(124,58,237,0.2), 0 0 0 1px #2d1a50' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 rounded-b-xl z-10" style={{ background: '#07060f' }} />
              <div className="flex justify-between items-center px-5 pt-6 pb-3">
                <span className="text-white/50 text-[9px] font-medium">9:41</span>
                <div className="flex gap-1 items-center">
                  <div className="w-3 h-1.5 rounded-sm bg-white/40" />
                  <div className="w-0.5 h-1 rounded-sm bg-white/40" />
                </div>
              </div>
              {/* Header */}
              <div className="px-5 mb-4">
                <p className="text-white text-sm font-bold">Emergency Contacts</p>
                <p className="text-white/30 text-[9px]">3 of 5 added</p>
              </div>
              {/* Contact list */}
              <div className="flex-1 px-5 space-y-2.5 overflow-hidden">
                {[
                  { name: 'Mom', role: 'Primary', color: '#7c3aed' },
                  { name: 'Sarah K.', role: 'Contact 2', color: '#be185d' },
                  { name: 'Jake M.', role: 'Contact 3', color: '#0891b2' },
                ].map((c, j) => (
                  <div key={j} className="flex items-center gap-3 p-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                      style={{ background: c.color }}>{c.name[0]}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-[11px] font-semibold truncate">{c.name}</p>
                      <p className="text-white/30 text-[9px]">{c.role}</p>
                    </div>
                    {j === 0 && (
                      <div className="px-1.5 py-0.5 rounded text-[8px] font-bold text-white" style={{ background: '#7c3aed' }}>★</div>
                    )}
                  </div>
                ))}
                {/* Add contact */}
                <div className="flex items-center gap-3 p-2.5 rounded-xl border border-dashed" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white/20 flex-shrink-0" style={{ border: '1px dashed rgba(255,255,255,0.15)' }}>+</div>
                  <p className="text-white/20 text-[10px]">Add contact</p>
                </div>
              </div>
              {/* Bottom */}
              <div className="px-5 py-4">
                <div className="w-full py-2.5 rounded-xl text-center text-xs font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #be185d)' }}>
                  Save &amp; Activate
                </div>
              </div>
            </div>
            <p className="text-xs font-medium" style={{ color: '#9f6882' }}>Contacts · Up to 5</p>
          </div>

        </div>
      </section>


      {/* ── FEATURE CARDS ── */}
      <section className="max-w-5xl mx-auto px-6 pb-8">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-2" style={{ color: '#be185d' }}>How It Works</p>
          <h2 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#1c0a12' }}>Every Feature, Explained</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            const visible = visibleCards.has(i);
            return (
              <div
                key={i}
                ref={(el) => (cardRefs.current[i] = el)}
                data-idx={i}
                className="rounded-2xl p-7 border transition-all duration-500"
                style={{
                  background: 'white',
                  borderColor: feat.border,
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(24px)',
                  transitionDelay: `${(i % 2) * 80}ms`,
                  boxShadow: '0 2px 20px rgba(0,0,0,0.04)',
                }}
              >
                {/* Icon + label row */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: feat.iconBg }}>
                    <Icon className="w-5 h-5" style={{ color: feat.iconColor }} />
                  </div>
                  <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: feat.iconColor }}>
                    {feat.label}
                  </span>
                </div>

                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: '#1c0a12' }}>
                  {feat.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#7a5060' }}>
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="max-w-2xl mx-auto px-6 py-24 text-center">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-8"
          style={{ background: 'linear-gradient(145deg, #e11d48, #9f1239)', boxShadow: '0 10px 30px rgba(225,29,72,0.25)' }}>
          <Shield className="w-7 h-7 text-white" />
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: '#1c0a12' }}>
          You shouldn&apos;t need it.
        </h2>
        <h2 className="text-3xl md:text-4xl font-bold mb-8 italic" style={{ fontFamily: "'Playfair Display', serif", color: '#9f1239' }}>
          But just in case.
        </h2>
        <p className="text-base mb-10" style={{ color: '#9f6882' }}>
          Coming soon on iOS
        </p>

        {/* App Store badge placeholder */}
        <div className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl"
          style={{ background: '#1c0a12', boxShadow: '0 8px 30px rgba(28,10,18,0.2)' }}>
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
          <div className="text-left">
            <p className="text-white/60 text-xs leading-none mb-0.5">Coming soon on the</p>
            <p className="text-white text-lg font-semibold leading-none">App Store</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IGotYou;
