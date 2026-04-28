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

const A = ({ href, children, external = false }) => (
  <a
    href={href}
    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    style={{ color: C.accent, textDecoration: 'underline' }}
  >
    {children}
  </a>
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
          Angel With You uses Firebase Authentication (a Google service) to manage your account. The
          only personal information that leaves your device is what is needed to sign you in: your
          email address, your display name (if you provide one), and an internal Firebase user ID.
          Everything else the app does — listening for trigger words, recording audio and video,
          reading your location, managing your emergency contacts, scheduling check-in timers —
          happens entirely on your iPhone.
        </P>
        <P>
          We do not run an analytics service. We do not run an ad network. We do not have third-party
          trackers in this app. We do not sell your data to anyone.
        </P>

        <HR />

        <H2>What information leaves your device, and where it goes</H2>

        <H3>Account information (Firebase Authentication)</H3>
        <P>
          To use the app you need an account. We use Firebase Authentication, a service operated by
          Google, to handle accounts. When you create an account, sign in, reset your password, or
          delete your account, the following information is sent to Google's Firebase servers:
        </P>
        <UL>
          <LI>
            The email address you sign up with (or the email address Apple shares when you use Sign
            in with Apple, which may be Apple's private relay address rather than your real email if
            you choose that option)
          </LI>
          <LI>The first name you provide during sign-up, used to greet you in the app</LI>
          <LI>An internal Firebase user ID that identifies your account</LI>
          <LI>Authentication tokens used to keep you signed in</LI>
          <LI>
            Sign-in and account-management events (sign-in, sign-out, password reset, account
            deletion)
          </LI>
        </UL>
        <P>
          Firebase processes this data on Google Cloud infrastructure. Google's handling of this data
          is governed by the{' '}
          <A href="https://firebase.google.com/support/privacy" external>
            Firebase Privacy and Security documentation
          </A>{' '}
          and Google's privacy policies. We do not store this data anywhere else.
        </P>
        <P>
          We use Firebase Authentication for one purpose only: to verify it is you when you open the
          app and to gate access to your subscription. We do not use Firebase Analytics, Firebase
          Crashlytics, Firebase Cloud Messaging, Firebase Storage, Firestore, Realtime Database, or
          any other Firebase product. We have not enabled Google Analytics for Firebase.
        </P>

        <H3>Subscription information (Apple App Store)</H3>
        <P>
          The app requires an active subscription. Subscriptions are sold and managed by Apple
          through the App Store, not by us. When you subscribe, Apple processes the transaction and
          shares aggregated, anonymized purchase data with us through App Store Connect (for example,
          "X subscriptions sold this week"). We do not receive your name, your billing address, or
          your payment method. Apple's handling of subscription data is governed by Apple's privacy
          policy.
        </P>

        <H3>SMS and phone calls</H3>
        <P>
          When you trigger an emergency, the app opens the iOS Messages app or the iOS Phone app to
          actually send the SMS or place the call. Once iOS Messages or iOS Phone takes over, your
          message and call go through your cellular carrier exactly as if you had typed and dialed
          yourself. Those messages and calls do not pass through our servers or through Firebase.
        </P>

        <HR />

        <H2>What stays on your device</H2>
        <P>
          The following data is processed and stored entirely on your iPhone, in the app's private
          storage. It is never transmitted to us, to Google, or to anyone else:
        </P>
        <UL>
          <LI>
            <strong>Audio.</strong> Speech recognition for your trigger words (<Code>Help</Code>,
            your safety word, your siren word, <Code>Camera</Code>) runs on-device using Apple's{' '}
            <Code>SFSpeechRecognizer</Code> with <Code>requiresOnDeviceRecognition = true</Code>. No
            audio is sent to Apple, Google, or any other party for transcription. Voice recordings
            you create are saved as audio files in the app's private sandbox.
          </LI>
          <LI>
            <strong>Video.</strong> Stealth video recordings are captured with no on-screen preview
            and saved in the app's private sandbox or, if you have granted the permission, written to
            your Photo Library on your device.
          </LI>
          <LI>
            <strong>Location.</strong> Your GPS coordinates are read using Apple's CoreLocation
            framework while protection is active. Location is included in the SMS messages you send
            to your emergency contacts. It is not stored, logged, or transmitted to us or to Google.
          </LI>
          <LI>
            <strong>Motion.</strong> Accelerometer data sampled at 200 Hz via CoreMotion is processed
            in memory only to detect back-of-phone taps and shake gestures. It is never stored or
            transmitted.
          </LI>
          <LI>
            <strong>Emergency contacts and settings.</strong> The names and phone numbers of the
            contacts you save, your custom safety word, your custom siren word, your emergency
            message, your fake-call name, and your other settings are stored locally in your
            iPhone's <Code>UserDefaults</Code>. They are not sent to Firebase or to anyone else.
          </LI>
          <LI>
            <strong>Address book access.</strong> When you pick an emergency contact from your
            iPhone contacts, the app reads your address book briefly via Apple's Contacts framework
            to show you the picker. Only the name and phone number of the contact you select are
            saved. The rest of your address book is not stored anywhere by the app and is not
            transmitted.
          </LI>
        </UL>

        <HR />

        <H2>What we do not do</H2>
        <P>We do not:</P>
        <UL>
          <LI>
            Use Firebase Analytics, Firebase Crashlytics, Google Analytics, or any other analytics
            service
          </LI>
          <LI>Use any advertising SDK or show ads</LI>
          <LI>Use any third-party tracker</LI>
          <LI>Sell, rent, or share data with third parties for their own purposes</LI>
          <LI>Track you across other apps or websites</LI>
          <LI>Use cookies or any web tracking technology</LI>
          <LI>Sync your recordings, contacts, or settings to iCloud or any other cloud service</LI>
        </UL>

        <HR />

        <H2>Service providers we rely on</H2>
        <P>
          The only third party that processes data on our behalf is{' '}
          <strong>Google (Firebase Authentication)</strong>, used solely for account management as
          described above. If you sign in with Apple, Apple acts as the identity provider for that
          sign-in flow. If you sign in with Google (when that option is enabled), Google acts as the
          identity provider for that sign-in flow.
        </P>

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
            ['Contacts', 'To let you pick emergency contacts from your address book'],
            [
              'Photo Library Add',
              'To save evidence videos to your Photo Library so you can find them later',
            ],
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
          Security. The app will continue to function for everything that does not depend on the
          revoked permission.
        </P>

        <HR />

        <H2>Account deletion and data deletion</H2>
        <P>
          You can delete your account from inside the app at any time (Settings → Account → Delete
          Account). Deleting your account immediately removes your record from Firebase
          Authentication. Local data (recordings, contacts, settings) is removed when you delete the
          app from your device.
        </P>
        <P>
          If you cannot reach the in-app delete button for any reason, you can also email the
          developer at the support address listed on the App's App Store page and request deletion.
        </P>

        <HR />

        <H2>Children's privacy</H2>
        <P>
          The app is intended for users aged 17 and older. It is not designed for or directed at
          children under 13. We do not knowingly collect personal information from children under 13.
          If you believe a child under 13 has created an account, contact the developer and we will
          delete the account.
        </P>

        <HR />

        <H2>Your rights</H2>
        <P>
          Depending on where you live (for example, in the EU under the GDPR or in California under
          the CCPA), you may have rights to access, correct, delete, or export the personal
          information that has been processed about you. Because the only personal information we
          process is what Firebase Authentication holds for you (your email, your display name, and
          your Firebase user ID), exercising these rights is straightforward:
        </P>
        <UL>
          <LI>
            To <strong>access</strong> your information, sign into the app and view your profile.
          </LI>
          <LI>
            To <strong>correct</strong> your email or display name, update them in the app.
          </LI>
          <LI>
            To <strong>delete</strong> your information, use the Delete Account flow inside the app.
          </LI>
          <LI>
            To <strong>export</strong> your information, contact the developer at the support
            address listed on the App's App Store page.
          </LI>
        </UL>

        <HR />

        <H2>Changes to this policy</H2>
        <P>
          If we change how the app handles data, we will update this document and update the "Last
          updated" date above. Material changes will also be noted in the App Store release notes
          for the version that introduces them.
        </P>

        <HR />

        <H2>Contact</H2>
        <P>
          For questions about this Privacy Policy, contact the developer at{' '}
          <A href="mailto:admin@summitwanderlust.com">admin@summitwanderlust.com</A>.
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
