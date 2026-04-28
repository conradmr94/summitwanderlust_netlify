import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const C = {
  bg: '#FBFAF7',
  bg2: '#F4F1EA',
  bg3: '#ECE7DD',
  ink: '#2A2E33',
  ink2: '#51544F',
  ink3: '#8C8A82',
  line: 'rgba(42,46,51,0.10)',
  accent: '#D87858',
  accentSoft: '#F2D9CC',
};

const FONT_DISPLAY = "'Newsreader', 'Playfair Display', Georgia, serif";
const FONT_MONO = "'JetBrains Mono', ui-monospaced, SFMono-Regular, monospace";

const Mono = ({ children, size = 11, color = C.ink3, style = {}, block = false }) => (
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

const H2 = ({ children }) => (
  <h2
    style={{
      fontFamily: FONT_DISPLAY,
      fontStyle: 'italic',
      fontWeight: 400,
      fontSize: '1.75rem',
      lineHeight: 1.2,
      color: C.ink,
      marginTop: '2.5rem',
      marginBottom: '0.75rem',
    }}
  >
    {children}
  </h2>
);

const H3 = ({ children }) => (
  <h3
    style={{
      fontFamily: FONT_MONO,
      fontSize: 11,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: C.ink2,
      marginTop: '1.75rem',
      marginBottom: '0.5rem',
    }}
  >
    {children}
  </h3>
);

const P = ({ children }) => (
  <p
    style={{
      fontFamily: FONT_DISPLAY,
      fontSize: '1.05rem',
      lineHeight: 1.65,
      color: C.ink2,
      marginBottom: '1rem',
    }}
  >
    {children}
  </p>
);

const UL = ({ children }) => (
  <ul
    style={{
      fontFamily: FONT_DISPLAY,
      fontSize: '1.05rem',
      lineHeight: 1.65,
      color: C.ink2,
      marginBottom: '1rem',
      paddingLeft: '1.5rem',
      listStyleType: 'disc',
    }}
  >
    {children}
  </ul>
);

const LI = ({ children }) => (
  <li style={{ marginBottom: '0.4rem' }}>{children}</li>
);

const HR = () => (
  <hr
    style={{
      border: 'none',
      borderTop: `1px solid ${C.line}`,
      margin: '2.5rem 0',
    }}
  />
);

const Code = ({ children }) => (
  <code
    style={{
      fontFamily: FONT_MONO,
      fontSize: '0.92em',
      background: C.bg3,
      padding: '0.1em 0.35em',
      borderRadius: 4,
      color: C.ink,
    }}
  >
    {children}
  </code>
);

const AngelWithYouPrivacy = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: C.bg, color: C.ink, fontFamily: FONT_DISPLAY, minHeight: '100vh' }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,200..800;1,200..800&family=JetBrains+Mono:wght@300..700&display=swap"
        rel="stylesheet"
      />

      <button
        onClick={() => navigate('/angel-with-you')}
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
      </button>

      <div
        className="flex justify-between items-center pt-7 md:pt-9"
        style={{ paddingLeft: 72, paddingRight: 24 }}
      >
        <Mono>PRIVACY</Mono>
        <Mono>ANGEL WITH YOU</Mono>
      </div>

      <article className="max-w-2xl mx-auto px-6 md:px-8 pt-10 md:pt-14 pb-20">
        <Mono style={{ marginBottom: '0.75rem' }}>PRIVACY POLICY</Mono>
        <h1
          style={{
            fontFamily: FONT_DISPLAY,
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(2.75rem, 5.5vw, 4.5rem)',
            lineHeight: 0.98,
            letterSpacing: '-0.02em',
            color: C.ink,
            marginBottom: '1rem',
          }}
        >
          Your data,
          <br />
          on your device.
        </h1>
        <Mono color={C.ink3}>EFFECTIVE APRIL 27, 2026</Mono>

        <HR />

        <H2>The short version</H2>
        <P>
          Angel With You does not have a server. We do not collect, transmit, store, or sell any of your
          personal information. Everything the app does happens entirely on your iPhone.
        </P>
        <P>
          There are no user accounts. There is no analytics SDK. There is no advertising. There is no
          telemetry. We — the people who built this app — cannot see any of your data, because none of
          it ever leaves your device.
        </P>

        <HR />

        <H2>What data the app handles, and where it lives</H2>
        <P>
          The app processes the following information <em>only on your device</em>:
        </P>

        <H3>Audio</H3>
        <UL>
          <LI>
            The microphone is used while protection is active to listen for your trigger words
            ("Help!", your custom safety word, your custom siren word, "Camera").
          </LI>
          <LI>
            Speech recognition runs <em>on-device</em> using Apple's <Code>SFSpeechRecognizer</Code>{' '}
            with <Code>requiresOnDeviceRecognition = true</Code>. No audio is sent to Apple, to us, or
            to any other party for transcription.
          </LI>
          <LI>
            Voice recordings you create (via double-tap, the safety word trigger, or the check-in
            timer) are saved as audio files inside the app's private sandbox on your iPhone. Only you
            can access them through the app.
          </LI>
        </UL>

        <H3>Video</H3>
        <UL>
          <LI>
            Stealth video recordings (triggered by saying "Camera") are captured using the back camera
            with no on-screen preview. The resulting video files are saved inside the app's private
            sandbox on your iPhone.
          </LI>
          <LI>Video is never streamed, uploaded, or transmitted anywhere.</LI>
        </UL>

        <H3>Location</H3>
        <UL>
          <LI>
            Your GPS coordinates are read using Apple's CoreLocation framework while protection is
            active.
          </LI>
          <LI>
            Location is used for one purpose only: to include your coordinates and an Apple Maps link
            in the SMS messages you send to your emergency contacts.
          </LI>
          <LI>
            Location is not stored in a database, not logged, and not shared with anyone other than
            the contacts you have chosen to text.
          </LI>
          <LI>
            You can disable location sharing in Settings ("Include Location") at any time.
          </LI>
        </UL>

        <H3>Motion</H3>
        <UL>
          <LI>
            The accelerometer is read at 200 Hz via CoreMotion while protection is active in order to
            detect back-of-phone taps and shake gestures.
          </LI>
          <LI>Motion data is processed in memory only. It is never stored or transmitted.</LI>
        </UL>

        <H3>Emergency contacts and settings</H3>
        <UL>
          <LI>
            The names and phone numbers of the contacts you save, your custom safety word, your custom
            siren word, your emergency message, your fake-call name, and your other settings are
            stored locally in your iPhone's <Code>UserDefaults</Code> (the standard local settings
            store for iOS apps).
          </LI>
          <LI>This information stays on your device. We never receive it.</LI>
        </UL>

        <H3>Notifications</H3>
        <UL>
          <LI>
            Local notifications (for example, when your check-in timer is about to expire) are
            scheduled and delivered locally by iOS. They are not sent through any push-notification
            server.
          </LI>
        </UL>

        <HR />

        <H2>When the app communicates with the outside world</H2>
        <P>
          The app itself makes <strong>zero network requests</strong>. It has no backend.
        </P>
        <P>
          However, when you trigger an emergency action, the app hands off to standard iOS apps so
          that messages and calls can actually reach your contacts:
        </P>
        <UL>
          <LI>
            <strong>SMS:</strong> The app opens the system Messages app (using the <Code>sms:</Code>{' '}
            URL scheme) with your contacts pre-filled and your emergency message pre-filled. The
            actual sending of the text message is done by iOS Messages over your cellular carrier,
            exactly as if you had typed and sent the message yourself.
          </LI>
          <LI>
            <strong>Phone calls:</strong> The app opens the system Phone app (using the{' '}
            <Code>tel:</Code> URL scheme) to place calls to your primary contact or to 911. The call
            is placed by iOS over your cellular carrier.
          </LI>
        </UL>
        <P>
          What this means: once you hand off to Messages or Phone, your message and call are subject
          to your <strong>carrier's</strong> privacy practices, and the records of those messages and
          calls live on your phone and your carrier's network — not in our app. We never see them.
        </P>

        <HR />

        <H2>What we do not do</H2>
        <P>We do not:</P>
        <UL>
          <LI>Operate any servers that receive your data</LI>
          <LI>Use any analytics, crash-reporting, or telemetry SDKs</LI>
          <LI>Use any advertising SDKs or show ads</LI>
          <LI>Sell, rent, or share any data with third parties</LI>
          <LI>Track you across other apps or websites</LI>
          <LI>Require an account, email address, or login</LI>
          <LI>Use cookies (the app is not a website)</LI>
          <LI>Use Apple's iCloud sync to back up recordings or settings</LI>
        </UL>

        <HR />

        <H2>Permissions the app requests, and why</H2>
        <div
          className="rounded-2xl overflow-hidden my-4"
          style={{ border: `1px solid ${C.line}`, background: C.bg2 }}
        >
          {[
            ['Microphone', 'To listen for trigger words and to record audio evidence'],
            ['Speech Recognition', 'To transcribe audio into trigger words on-device'],
            ['Camera', 'To record stealth video evidence'],
            ['Location (When In Use)', 'To include GPS coordinates in emergency SMS messages'],
            ['Motion & Fitness', 'To detect back-of-phone taps and shake gestures'],
            ['Notifications', 'To alert you when your check-in timer is about to expire'],
          ].map(([perm, why], i, arr) => (
            <div
              key={perm}
              className="grid md:grid-cols-3 gap-3 px-5 py-4"
              style={{
                borderBottom: i < arr.length - 1 ? `1px solid ${C.line}` : 'none',
              }}
            >
              <div>
                <Mono color={C.ink}>{perm}</Mono>
              </div>
              <div className="md:col-span-2">
                <span style={{ fontFamily: FONT_DISPLAY, fontSize: '1rem', color: C.ink2 }}>
                  {why}
                </span>
              </div>
            </div>
          ))}
        </div>
        <P>
          You can revoke any of these permissions at any time in iOS Settings → Privacy &amp;
          Security. Some app features will stop working without their corresponding permission, but
          the rest of the app will continue to function.
        </P>

        <HR />

        <H2>Children's privacy</H2>
        <P>
          The app is intended for users aged 17 and older. It is not designed for or directed at
          children under 13. Because the app does not collect any personal information, no
          information about children (or anyone else) is collected.
        </P>

        <HR />

        <H2>Your control over your data</H2>
        <P>Because all data lives on your device:</P>
        <UL>
          <LI>
            To delete your emergency contacts, settings, or recordings, you can do so from inside the
            app or by deleting the app entirely. Uninstalling the app removes everything it stored.
          </LI>
          <LI>
            There is nothing to "request a copy of" or "request deletion of" from us, because we
            never had it.
          </LI>
          <LI>There is no opt-out from data collection, because there is no data collection.</LI>
        </UL>

        <HR />

        <H2>Changes to this policy</H2>
        <P>
          If we ever change how the app handles data, we will update this document and update the
          "Last updated" date above. Material changes will also be noted in the App Store release
          notes for the version that introduces them.
        </P>

        <HR />

        <H2>Contact</H2>
        <P>
          If you have questions about this Privacy Policy, you can reach the developer at{' '}
          <a
            href="mailto:admin@summitwanderlust.com"
            style={{ color: C.accent, textDecoration: 'underline' }}
          >
            admin@summitwanderlust.com
          </a>
          .
        </P>
      </article>

      <div className="flex justify-between items-end px-6 md:px-12 pb-8">
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: '0.95rem',
            lineHeight: 1.15,
            color: C.ink3,
          }}
        >
          angel
          <br />
          with you
        </div>
        <Mono>ON-DEVICE · ALWAYS</Mono>
      </div>
    </div>
  );
};

export default AngelWithYouPrivacy;
