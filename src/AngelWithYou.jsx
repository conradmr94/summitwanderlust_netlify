import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone as PhoneIcon, PhoneOff, Send } from 'lucide-react';

// Theme tokens — mirror of the SwiftUI Theme.swift in the iOS app.
// "Quiet, capable, never theatrical." Three moods:
//   • rest   — warm cream page, ink type
//   • active — dusk page, light ink (protection on / recording)
//   • alarm  — terracotta accent (siren / emergency only)
const C = {
  bg: '#FBFAF7',
  bg2: '#F4F1EA',
  bg3: '#ECE7DD',
  ink: '#2A2E33',
  ink2: '#51544F',
  ink3: '#8C8A82',
  mute: '#A8B0AA',
  line: 'rgba(42,46,51,0.10)',
  lineSoft: 'rgba(42,46,51,0.06)',
  accent: '#D87858',
  accentDeep: '#B25A40',
  accentSoft: '#F2D9CC',
  dusk: '#2C2A28',
  dusk2: '#1F1D1B',
  duskInk: '#F2EDE3',
  duskMute: 'rgba(242,237,227,0.55)',
  duskLine: 'rgba(242,237,227,0.10)',
  alarmBg: '#2A1410',
  alarmInk: '#FBE9DF',
  sage: '#E0E5DD',
};

const FONT_DISPLAY = "'Newsreader', 'Playfair Display', Georgia, serif";
const FONT_MONO = "'JetBrains Mono', ui-monospaced, SFMono-Regular, monospace";

// ── Atoms ────────────────────────────────────────────────────────────────

const Mono = ({ children, size = 11, color, style = {}, block = false }) => (
  <span
    style={{
      display: block ? 'block' : 'inline-block',
      fontFamily: FONT_MONO,
      fontSize: size,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color,
      ...style,
    }}
  >
    {children}
  </span>
);

const Headline = ({ children, color = C.ink, max = '6.5rem', min = '3rem' }) => (
  <h2
    style={{
      fontFamily: FONT_DISPLAY,
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: `clamp(${min}, 8vw, ${max})`,
      lineHeight: 0.98,
      letterSpacing: '-0.02em',
      color,
      marginBottom: '2rem',
    }}
  >
    {children}
  </h2>
);

const Body = ({ children, color = C.ink2, max = '38ch' }) => (
  <p
    style={{
      fontFamily: FONT_DISPLAY,
      fontStyle: 'italic',
      fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
      lineHeight: 1.5,
      color,
      maxWidth: max,
    }}
  >
    {children}
  </p>
);

const PhoneShell = ({ width = 300, bg = C.bg, children, style = {} }) => (
  <div
    className="relative rounded-[40px] overflow-hidden flex flex-col"
    style={{
      width,
      aspectRatio: '9 / 19.5',
      background: bg,
      border: '7px solid #0a0a0a',
      boxShadow: '0 30px 70px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.05)',
      ...style,
    }}
  >
    <div
      className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30 rounded-full"
      style={{ width: 92, height: 24, background: '#0a0a0a' }}
    />
    {children}
  </div>
);

// ── Section frame (page chrome) ──────────────────────────────────────────

const SectionFrame = ({ number, label, mood = 'rest', bg, fg, fgFaint, children }) => {
  const sectionBg = bg ?? (mood === 'active' ? C.dusk : mood === 'alarm' ? C.accent : C.bg);
  const ink = fg ?? (mood === 'rest' ? C.ink : C.duskInk);
  const inkFaint =
    fgFaint ??
    (mood === 'rest' ? C.ink3 : mood === 'alarm' ? 'rgba(251,233,223,0.7)' : C.duskMute);

  return (
    <section
      className="relative w-full flex flex-col"
      style={{ background: sectionBg, color: ink, minHeight: '100vh' }}
    >
      <div
        className="flex justify-between items-center pt-7 md:pt-9"
        style={{ paddingLeft: 72, paddingRight: 24 }}
      >
        <Mono color={inkFaint}>{number} / 06</Mono>
        <Mono color={inkFaint}>{label}</Mono>
      </div>

      <div className="flex-1 flex flex-col px-6 md:px-12 py-10 md:py-14">{children}</div>

      <div className="flex justify-between items-end px-6 md:px-12 pb-8">
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: '0.95rem',
            lineHeight: 1.15,
            color: inkFaint,
          }}
        >
          angel
          <br />
          with you
        </div>
        <Mono color={inkFaint}>ON-DEVICE · ALWAYS</Mono>
      </div>
    </section>
  );
};

// ── 01 / HERO ────────────────────────────────────────────────────────────

const HeroSection = () => (
  <SectionFrame number="01" label="HERO" mood="rest">
    <div className="flex-1 grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
      <div className="lg:col-span-6 max-w-xl">
        <h1
          style={{
            fontFamily: FONT_DISPLAY,
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(4.5rem, 11vw, 9.5rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            color: C.ink,
            marginBottom: '2rem',
          }}
        >
          angel
          <br />
          with you.
        </h1>
        <Body max="34ch">
          A safety app for the moments your hands are full, your voice is shaking, or your
          phone is in your pocket.
        </Body>
      </div>

      <div className="lg:col-span-6 flex justify-center lg:justify-end items-end">
        <HeroPhone />
      </div>
    </div>
  </SectionFrame>
);

const HeroPhone = () => (
  <PhoneShell width={300} bg={C.bg2}>
    <div className="flex-1 flex flex-col px-5 pt-12 pb-5">
      <div className="flex justify-between items-center mb-5 mt-1">
        <div className="flex items-center gap-1.5">
          <div className="w-1 h-1 rounded-full" style={{ background: C.ink3 }} />
          <span
            style={{
              fontFamily: FONT_DISPLAY,
              fontStyle: 'italic',
              fontSize: 11,
              color: C.ink3,
            }}
          >
            evidence
          </span>
        </div>
        <span
          style={{
            fontFamily: FONT_DISPLAY,
            fontStyle: 'italic',
            fontSize: 11,
            color: C.ink3,
          }}
        >
          settings
        </span>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: C.ink2 }} />
        <Mono size={9} color={C.ink2}>
          TONIGHT, APRIL 26
        </Mono>
      </div>

      <h3
        style={{
          fontFamily: FONT_DISPLAY,
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 44,
          lineHeight: 1,
          color: C.ink,
          marginBottom: 10,
        }}
      >
        Hey.
      </h3>

      <p
        style={{
          fontFamily: FONT_DISPLAY,
          fontStyle: 'italic',
          fontSize: 13,
          lineHeight: 1.4,
          color: C.ink2,
          marginBottom: 22,
        }}
      >
        when you&apos;re ready,
        <br />
        hand me your evening.
      </p>

      <div className="rounded-2xl p-4" style={{ background: C.bg3 }}>
        <p
          style={{
            fontFamily: FONT_DISPLAY,
            fontStyle: 'italic',
            fontSize: 11,
            lineHeight: 1.5,
            color: C.ink2,
            marginBottom: 10,
          }}
        >
          &quot;Hope this app will not be useful at all for your life. However, if it ever does —
        </p>
        <p
          style={{
            fontFamily: FONT_DISPLAY,
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: 15,
            color: C.ink,
          }}
        >
          angel with you.
        </p>
      </div>

      <div className="flex-1" />

      <div
        className="rounded-2xl flex items-center justify-center"
        style={{
          background: C.dusk,
          color: C.duskInk,
          padding: '14px 16px',
          fontFamily: FONT_DISPLAY,
          fontStyle: 'italic',
          fontSize: 14,
        }}
      >
        start protection →
      </div>
    </div>
  </PhoneShell>
);

// ── 02 / VOICE ───────────────────────────────────────────────────────────

const VoiceSection = () => (
  <SectionFrame number="02" label="VOICE" mood="rest" bg={C.sage}>
    <div className="flex-1 grid lg:grid-cols-12 gap-10 items-start">
      <div className="lg:col-span-6 max-w-xl">
        <Headline color={C.ink}>
          Your voice
          <br />
          is a panic
          <br />
          button.
        </Headline>
        <Body max="38ch">
          Say &quot;help&quot; and your contacts get a text with your location.
          <br />
          Say your safety word and i call them, and start recording.
          <br />
          Say &quot;scream&quot; and i blow a siren until you stop me.
        </Body>
      </div>

      <div className="lg:col-span-6 flex justify-center items-center mt-8 lg:mt-0">
        <VoiceRadial />
      </div>
    </div>
  </SectionFrame>
);

const VoiceRadial = () => (
  <div className="relative" style={{ width: 360, height: 360 }}>
    {[1, 0.78, 0.56, 0.34].map((s, i) => (
      <div
        key={i}
        className="absolute top-1/2 left-1/2 rounded-full"
        style={{
          width: `${s * 100}%`,
          height: `${s * 100}%`,
          transform: 'translate(-50%, -50%)',
          border: `1px solid ${C.line}`,
        }}
      />
    ))}

    <div
      className="absolute top-1/2 left-1/2 rounded-full flex items-center justify-center"
      style={{
        width: 110,
        height: 110,
        transform: 'translate(-50%, -50%)',
        background: C.dusk,
        boxShadow: '0 20px 50px rgba(0,0,0,0.20)',
      }}
    >
      <span
        style={{
          fontFamily: FONT_DISPLAY,
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 22,
          color: C.duskInk,
          textAlign: 'center',
          lineHeight: 1,
        }}
      >
        i&apos;m
        <br />
        here
      </span>
    </div>

    <Pill word='"help"' style={{ top: '12%', left: '18%' }} />
    <Pill word='"lemon"' style={{ top: '30%', right: '6%' }} />
    <Pill word='"scream"' style={{ bottom: '24%', left: '4%' }} />
    <Pill word='"camera"' style={{ bottom: '10%', right: '20%' }} />
  </div>
);

const Pill = ({ word, style }) => (
  <div
    className="absolute rounded-full px-4 py-2"
    style={{
      background: C.bg,
      border: `1px solid ${C.line}`,
      fontFamily: FONT_DISPLAY,
      fontStyle: 'italic',
      fontSize: 14,
      color: C.ink,
      boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
      ...style,
    }}
  >
    {word}
  </div>
);

// ── 03 / HANDS ───────────────────────────────────────────────────────────

const HandsSection = () => (
  <SectionFrame number="03" label="HANDS" mood="active">
    <div className="flex-1 grid lg:grid-cols-12 gap-10 items-start">
      <div className="lg:col-span-6 max-w-xl">
        <Headline color={C.duskInk}>
          Two taps.
          <br />
          Three taps.
          <br />
          A shake.
        </Headline>
        <Body color={C.duskMute} max="40ch">
          The back of the phone is a button.
          <br />
          You don&apos;t need to look. You don&apos;t need to speak.
        </Body>
      </div>

      <div className="lg:col-span-6 flex justify-center mt-12 lg:mt-0">
        <HandsPhone />
      </div>
    </div>
  </SectionFrame>
);

const HandsPhone = () => (
  <div className="relative" style={{ width: 320 }}>
    <Annotation
      number="2×"
      top="back-tap"
      bottom="records"
      style={{ top: -10, left: -70 }}
    />
    <Annotation
      number="3×"
      top="back-tap"
      bottom="calls your person"
      style={{ top: '38%', right: -80 }}
    />
    <Annotation
      number="↯"
      top="shake"
      bottom='"i am in trouble"'
      style={{ bottom: 30, left: -40 }}
    />

    <div style={{ transform: 'rotate(-2deg)' }}>
      <PhoneShell width={300} bg={C.dusk2}>
        <div
          className="flex-1 flex flex-col px-5 pt-12 pb-5"
          style={{ color: C.duskInk }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: C.duskMute }} />
            <Mono size={9} color={C.duskMute}>
              WATCHING · 11:47 PM
            </Mono>
          </div>

          <h3
            style={{
              fontFamily: FONT_DISPLAY,
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 40,
              lineHeight: 1,
              color: C.duskInk,
              marginBottom: 12,
            }}
          >
            I&apos;m with
            <br />
            you.
          </h3>

          <p
            style={{
              fontFamily: FONT_DISPLAY,
              fontStyle: 'italic',
              fontSize: 12,
              lineHeight: 1.4,
              color: C.duskMute,
              marginBottom: 22,
            }}
          >
            walk easy.
            <br />
            i&apos;ll watch the rest.
          </p>

          <div className="border-t mb-4" style={{ borderColor: C.duskLine }} />

          <Row label="EAR" value={'listening for "help", "lemon"'} />
          <Row label="HAND" value="ready for taps & shakes" />
          <Row label="PEOPLE" value="Marisa, Jordan, Mom" />
        </div>
      </PhoneShell>
    </div>
  </div>
);

const Row = ({ label, value }) => (
  <div className="flex items-baseline gap-3 py-1.5">
    <Mono size={8} color={C.duskMute} style={{ width: 56, flexShrink: 0 }}>
      {label}
    </Mono>
    <span
      style={{
        fontFamily: FONT_DISPLAY,
        fontStyle: 'italic',
        fontSize: 11,
        color: C.duskInk,
      }}
    >
      {value}
    </span>
  </div>
);

const Annotation = ({ number, top, bottom, style }) => (
  <div
    className="absolute rounded-2xl px-3 py-2 z-20 flex items-center gap-2.5"
    style={{
      background: 'rgba(31,29,27,0.9)',
      border: '1px solid rgba(242,237,227,0.10)',
      backdropFilter: 'blur(6px)',
      ...style,
    }}
  >
    <div
      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
      style={{ background: 'rgba(242,237,227,0.10)' }}
    >
      <span
        style={{
          fontFamily: FONT_MONO,
          fontSize: 11,
          color: C.duskInk,
        }}
      >
        {number}
      </span>
    </div>
    <div>
      <p
        style={{
          fontFamily: FONT_DISPLAY,
          fontStyle: 'italic',
          fontWeight: 600,
          fontSize: 11,
          color: C.duskInk,
          lineHeight: 1.1,
        }}
      >
        {top}
      </p>
      <p
        style={{
          fontFamily: FONT_DISPLAY,
          fontStyle: 'italic',
          fontSize: 10,
          color: C.duskMute,
          lineHeight: 1.15,
          whiteSpace: 'nowrap',
        }}
      >
        {bottom}
      </p>
    </div>
  </div>
);

// ── 04 / EXIT ────────────────────────────────────────────────────────────

const ExitSection = () => (
  <SectionFrame number="04" label="EXIT" mood="alarm">
    <div className="flex-1 grid lg:grid-cols-12 gap-10 items-start">
      <div className="lg:col-span-6 max-w-xl">
        <Headline color={C.alarmInk}>
          An exit,
          <br />
          in your
          <br />
          pocket.
        </Headline>
        <Body color="rgba(251,233,223,0.85)" max="38ch">
          Trigger a believable incoming call. Step away.
          <br />
          Say &quot;Sorry, mom needs me.&quot; Walk out.
        </Body>
      </div>

      <div className="lg:col-span-6 flex justify-center mt-12 lg:mt-0">
        <ExitPhone />
      </div>
    </div>
  </SectionFrame>
);

const ExitPhone = () => (
  <PhoneShell width={300} bg={C.dusk2}>
    <div
      className="flex-1 flex flex-col items-center px-6 pt-14 pb-8"
      style={{ color: C.duskInk }}
    >
      <Mono size={10} color={C.duskMute} block style={{ textAlign: 'center', marginBottom: 24 }}>
        INCOMING
        <br />
        CALL
      </Mono>

      <div
        className="rounded-full flex items-center justify-center mb-6"
        style={{
          width: 80,
          height: 80,
          background: 'rgba(242,237,227,0.16)',
        }}
      >
        <span
          style={{
            fontFamily: FONT_DISPLAY,
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 36,
            color: C.duskInk,
          }}
        >
          M
        </span>
      </div>

      <h3
        style={{
          fontFamily: FONT_DISPLAY,
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 38,
          color: C.duskInk,
          lineHeight: 1,
        }}
      >
        Mom
      </h3>
      <p
        style={{
          fontFamily: FONT_DISPLAY,
          fontStyle: 'italic',
          fontSize: 13,
          color: C.duskMute,
          marginTop: 6,
        }}
      >
        mobile
      </p>

      <div className="flex-1" />

      <div className="flex gap-12 items-center">
        <div className="flex flex-col items-center gap-2">
          <div
            className="rounded-full flex items-center justify-center"
            style={{ width: 48, height: 48, background: '#C84133' }}
          >
            <PhoneOff className="w-5 h-5" style={{ color: C.duskInk }} />
          </div>
          <span
            style={{
              fontFamily: FONT_DISPLAY,
              fontStyle: 'italic',
              fontSize: 11,
              color: C.duskMute,
            }}
          >
            decline
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div
            className="rounded-full flex items-center justify-center"
            style={{ width: 48, height: 48, background: '#3FA764' }}
          >
            <PhoneIcon className="w-5 h-5" style={{ color: C.duskInk }} />
          </div>
          <span
            style={{
              fontFamily: FONT_DISPLAY,
              fontStyle: 'italic',
              fontSize: 11,
              color: C.duskMute,
            }}
          >
            answer
          </span>
        </div>
      </div>
    </div>
  </PhoneShell>
);

// ── 05 / STEALTH ─────────────────────────────────────────────────────────

const StealthSection = () => (
  <SectionFrame number="05" label="STEALTH" mood="active">
    <div className="flex-1 grid lg:grid-cols-12 gap-10 items-start">
      <div className="lg:col-span-6 max-w-xl">
        <Headline color={C.duskInk}>
          Records
          <br />
          when you
          <br />
          can&apos;t watch.
        </Headline>
        <Body color={C.duskMute} max="38ch">
          Say &quot;camera&quot; and the back camera starts recording.
          <br />
          The screen stays normal. No preview. No tell.
        </Body>
      </div>

      <div className="lg:col-span-6 flex justify-center mt-12 lg:mt-0">
        <StealthPhone />
      </div>
    </div>
  </SectionFrame>
);

const StealthPhone = () => (
  <PhoneShell width={300} bg={C.dusk2}>
    <div
      className="flex-1 flex flex-col items-center px-5 pt-14 pb-8"
      style={{ color: C.duskInk }}
    >
      <div
        className="flex items-center gap-2 px-3 py-1.5 rounded-full mb-10"
        style={{
          background: 'rgba(216,120,88,0.18)',
          border: `1px solid ${C.accent}`,
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: C.accent }} />
        <Mono size={9} color={C.accentSoft}>
          REC · STEALTH
        </Mono>
      </div>

      <p
        style={{
          fontFamily: FONT_DISPLAY,
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 60,
          color: C.duskInk,
          lineHeight: 1,
        }}
      >
        11:47
      </p>
      <p
        style={{
          fontFamily: FONT_DISPLAY,
          fontStyle: 'italic',
          fontSize: 13,
          color: C.duskMute,
          marginTop: 6,
          marginBottom: 24,
        }}
      >
        Friday, April 26
      </p>

      <div className="w-full space-y-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl p-3"
            style={{
              background: 'rgba(242,237,227,0.05)',
              border: `1px solid ${C.duskLine}`,
            }}
          >
            <Mono
              size={8}
              color={C.duskMute}
              block
              style={{ marginBottom: 4 }}
            >
              MESSAGES · JUST NOW
            </Mono>
            <p
              style={{
                fontFamily: FONT_DISPLAY,
                fontStyle: 'italic',
                fontSize: 13,
                color: C.duskInk,
              }}
            >
              are you almost home?
            </p>
          </div>
        ))}
      </div>
    </div>
  </PhoneShell>
);

// ── 06 / CLOSING + SUPPORT ───────────────────────────────────────────────

const ClosingSection = () => {
  const navigate = useNavigate();
  const [formTitle, setFormTitle] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(formTitle || 'Contact from Angel With You');
    const body = encodeURIComponent(formMessage);
    window.location.href = `mailto:admin@summitwanderlust.com?subject=${subject}&body=${body}`;
    setSubmitStatus('success');
    setFormTitle('');
    setFormMessage('');
    setTimeout(() => setSubmitStatus(null), 3000);
  };

  return (
    <SectionFrame number="06" label="QUIET" mood="rest">
      <div className="flex-1 flex flex-col items-center py-8 gap-16">
        <div className="max-w-2xl text-center pt-8">
          <h2
            style={{
              fontFamily: FONT_DISPLAY,
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              lineHeight: 0.98,
              letterSpacing: '-0.02em',
              color: C.ink,
              marginBottom: '0.5rem',
            }}
          >
            You shouldn&apos;t need it.
          </h2>
          <h2
            style={{
              fontFamily: FONT_DISPLAY,
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              lineHeight: 0.98,
              letterSpacing: '-0.02em',
              color: C.accent,
              marginBottom: '2.5rem',
            }}
          >
            But just in case.
          </h2>

          <p
            style={{
              fontFamily: FONT_DISPLAY,
              fontStyle: 'italic',
              fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
              color: C.ink2,
              marginBottom: '2rem',
            }}
          >
            Coming soon on iOS.
          </p>

          <div
            className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl"
            style={{ background: C.dusk, color: C.duskInk }}
          >
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <div className="text-left">
              <Mono size={9} color={C.duskMute} block>
                coming soon on the
              </Mono>
              <p
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontStyle: 'italic',
                  fontSize: 16,
                  fontWeight: 500,
                  color: C.duskInk,
                  marginTop: 2,
                }}
              >
                App Store
              </p>
            </div>
          </div>
        </div>

        <div className="w-12 h-px" style={{ background: C.line }} />

        <div className="w-full max-w-xl">
          <div className="text-center mb-7">
            <Mono color={C.ink3}>SUPPORT</Mono>
            <h3
              style={{
                fontFamily: FONT_DISPLAY,
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                lineHeight: 1.1,
                color: C.ink,
                marginTop: '0.5rem',
                marginBottom: '0.5rem',
              }}
            >
              Send us a note.
            </h3>
            <p
              style={{
                fontFamily: FONT_DISPLAY,
                fontStyle: 'italic',
                fontSize: '1rem',
                color: C.ink2,
              }}
            >
              we&apos;ll read every one.
            </p>
          </div>

          <form
            onSubmit={handleSupportSubmit}
            className="rounded-2xl p-6 md:p-8"
            style={{ background: C.bg2, border: `1px solid ${C.line}` }}
          >
            <div className="mb-4">
              <label
                htmlFor="support-title"
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 10,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: C.ink3,
                  display: 'block',
                  marginBottom: '0.5rem',
                }}
              >
                SUBJECT
              </label>
              <input
                id="support-title"
                type="text"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="What's this about?"
                required
                className="w-full px-4 py-3 rounded-xl outline-none"
                style={{
                  background: C.bg,
                  border: `1px solid ${C.line}`,
                  fontFamily: FONT_DISPLAY,
                  fontStyle: 'italic',
                  fontSize: '1rem',
                  color: C.ink,
                }}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="support-message"
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 10,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: C.ink3,
                  display: 'block',
                  marginBottom: '0.5rem',
                }}
              >
                MESSAGE
              </label>
              <textarea
                id="support-message"
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
                rows={5}
                placeholder="Tell us what's on your mind."
                required
                className="w-full px-4 py-3 rounded-xl outline-none resize-none"
                style={{
                  background: C.bg,
                  border: `1px solid ${C.line}`,
                  fontFamily: FONT_DISPLAY,
                  fontStyle: 'italic',
                  fontSize: '1rem',
                  color: C.ink,
                  lineHeight: 1.5,
                }}
              />
            </div>

            {submitStatus === 'success' && (
              <div
                className="rounded-xl px-4 py-3 mb-4"
                style={{
                  background: C.accentSoft,
                  border: `1px solid ${C.accent}`,
                  fontFamily: FONT_DISPLAY,
                  fontStyle: 'italic',
                  fontSize: 14,
                  color: C.accentDeep,
                }}
              >
                Your email client should open with the message ready to send.
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-2xl"
              style={{
                background: C.dusk,
                color: C.duskInk,
                padding: '14px 16px',
                fontFamily: FONT_DISPLAY,
                fontStyle: 'italic',
                fontSize: 15,
              }}
            >
              <Send className="w-4 h-4" />
              <span>send to admin@summitwanderlust.com</span>
            </button>
          </form>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/angel-with-you/privacy')}
            style={{
              fontFamily: FONT_MONO,
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: C.ink3,
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = C.ink)}
            onMouseLeave={(e) => (e.currentTarget.style.color = C.ink3)}
          >
            PRIVACY
          </button>
          <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: C.ink3 }}>·</span>
          <button
            onClick={() => navigate('/angel-with-you/terms')}
            style={{
              fontFamily: FONT_MONO,
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: C.ink3,
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = C.ink)}
            onMouseLeave={(e) => (e.currentTarget.style.color = C.ink3)}
          >
            TERMS
          </button>
        </div>
      </div>
    </SectionFrame>
  );
};

// ── Page ────────────────────────────────────────────────────────────────

const AngelWithYou = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: C.bg, color: C.ink, fontFamily: FONT_DISPLAY }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,200..800;1,200..800&family=JetBrains+Mono:wght@300..700&display=swap"
        rel="stylesheet"
      />

      <Link
        to="/"
        aria-label="Back"
        className="fixed top-4 left-4 z-50 w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-100"
        style={{
          background: 'rgba(251,250,247,0.85)',
          border: `1px solid ${C.line}`,
          color: C.ink,
          backdropFilter: 'blur(10px)',
          opacity: 0.85,
        }}
      >
        <ArrowLeft className="w-4 h-4" />
      </Link>

      <main>
        <HeroSection />
        <VoiceSection />
        <HandsSection />
        <ExitSection />
        <StealthSection />
        <ClosingSection />
      </main>
    </div>
  );
};

export default AngelWithYou;
