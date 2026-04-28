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
  accentDeep: '#B25A40',
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

const H2 = ({ children, num }) => (
  <h2
    style={{
      fontFamily: FONT_DISPLAY,
      fontStyle: 'italic',
      fontWeight: 400,
      fontSize: '1.6rem',
      lineHeight: 1.2,
      color: C.ink,
      marginTop: '2.5rem',
      marginBottom: '0.75rem',
    }}
  >
    {num && (
      <Mono color={C.ink3} size={11} style={{ marginRight: '0.6em', verticalAlign: 'middle' }}>
        {num}
      </Mono>
    )}
    {children}
  </h2>
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

const PCaps = ({ children }) => (
  <p
    style={{
      fontFamily: FONT_DISPLAY,
      fontSize: '0.92rem',
      lineHeight: 1.55,
      color: C.ink2,
      marginBottom: '1rem',
      letterSpacing: '0.01em',
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

const AngelWithYouTerms = () => {
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
        <Mono>TERMS</Mono>
        <Mono>ANGEL WITH YOU</Mono>
      </div>

      <article className="max-w-2xl mx-auto px-6 md:px-8 pt-10 md:pt-14 pb-20">
        <Mono style={{ marginBottom: '0.75rem' }}>TERMS OF SERVICE</Mono>
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
          The fine print,
          <br />
          plainly said.
        </h1>
        <Mono color={C.ink3}>EFFECTIVE APRIL 27, 2026</Mono>

        <HR />

        <P>
          By downloading, installing, or using Angel With You (the "App"), you agree to these Terms
          of Service ("Terms"). If you do not agree, do not use the App.
        </P>

        <H2 num="01">What the App is</H2>
        <P>
          Angel With You is a personal-safety utility for iOS. It allows you to trigger
          pre-configured actions — sending SMS messages to contacts you have saved, placing phone
          calls, recording audio, recording video, and playing a loud siren — using voice triggers,
          back-of-phone tap gestures, shake detection, and a check-in timer.
        </P>
        <P>
          The App runs entirely on your device. It has no servers, no accounts, and no backend
          service. See the Privacy Policy for details.
        </P>

        <H2 num="02">Eligibility</H2>
        <P>
          You must be at least 17 years old to use the App, and you must be legally capable of
          entering into a binding agreement under the laws of your jurisdiction. By using the App you
          represent that you meet these requirements.
        </P>

        <div
          className="rounded-2xl px-6 py-5 my-8"
          style={{
            background: C.accentSoft,
            border: `1px solid ${C.accent}`,
          }}
        >
          <Mono color={C.accentDeep} style={{ marginBottom: '0.5rem' }}>
            03 · READ THIS CAREFULLY
          </Mono>
          <h2
            style={{
              fontFamily: FONT_DISPLAY,
              fontStyle: 'italic',
              fontWeight: 500,
              fontSize: '1.5rem',
              lineHeight: 1.2,
              color: C.accentDeep,
              marginBottom: '0.75rem',
            }}
          >
            The App is not an emergency service.
          </h2>
          <P>
            Angel With You is a convenience tool that helps you reach the people and services you
            have already chosen to contact. It is <strong>not</strong> an emergency response service,
            a monitoring service, a security service, or a substitute for calling 911 (or your local
            emergency number) directly.
          </P>
          <P>You acknowledge and agree that:</P>
          <UL>
            <LI>
              The App does not guarantee that any SMS message will be delivered, that any phone call
              will connect, that any contact will answer, that any recording will succeed, or that
              any siren will be heard.
            </LI>
            <LI>
              Delivery of SMS messages and completion of phone calls depends on your cellular
              carrier, your signal strength, your battery level, your phone's hardware, your
              operating system, the recipient's carrier, the recipient's device, and many other
              factors entirely outside our control.
            </LI>
            <LI>
              Voice trigger detection depends on Apple's on-device speech recognition. It can fail to
              recognize your trigger words — particularly in noisy environments, when the phone is
              muffled, or when battery saver modes restrict background processing.
            </LI>
            <LI>
              Tap and shake detection depends on the iPhone's accelerometer and on iOS's willingness
              to keep the app running. Either may fail.
            </LI>
            <LI>
              GPS location depends on satellite reception, which can be poor or unavailable indoors,
              underground, or in dense urban areas.
            </LI>
            <LI>
              Sending an emergency SMS opens the iOS Messages app and requires the message to be
              transmitted by your carrier. The App cannot send a message if you have no service.
            </LI>
            <LI>
              The App requires you to have already configured emergency contacts and granted the
              relevant iOS permissions. If you have not done so, the corresponding features will not
              work.
            </LI>
          </UL>
          <P>
            <strong>
              In an emergency, your first and best option is always to call 911 (or your local
              emergency number) directly.
            </strong>{' '}
            Do not rely on the App as your only line of defense.
          </P>
        </div>

        <H2 num="04">Permissions and your responsibilities</H2>
        <P>
          To work, the App needs you to grant iOS permissions for the microphone, speech recognition,
          camera, location, motion, and notifications. You are responsible for granting and
          maintaining these permissions. You are also responsible for:
        </P>
        <UL>
          <LI>Keeping your emergency contacts accurate and up to date</LI>
          <LI>Keeping your iPhone charged</LI>
          <LI>Keeping iOS and the App updated</LI>
          <LI>Testing the App's features periodically so you know what to expect when you need them</LI>
          <LI>Choosing trigger words that you are unlikely to say by accident</LI>
          <LI>Configuring the check-in timer at appropriate intervals for your situation</LI>
        </UL>

        <H2 num="05">Recording laws are your responsibility</H2>
        <P>
          The App can record audio and video. Laws regarding the recording of conversations, of other
          people, and of public or private spaces vary widely by jurisdiction. In some places,
          recording another person without their consent is a crime, even in self-defense situations.
        </P>
        <P>
          You — not us — are responsible for understanding and complying with the recording laws of
          the jurisdiction you are in. Use of the App's recording features in violation of applicable
          law is a breach of these Terms and is solely your responsibility.
        </P>

        <H2 num="06">The siren</H2>
        <P>
          The siren feature plays a loud, alternating tone at maximum volume. It is intentionally
          designed to attract attention. Do not trigger the siren in environments where loud noise
          could cause harm, such as while operating a vehicle, near small children, near people with
          hearing aids or medical devices, in libraries or hospitals, or in any setting where the
          noise may cause panic or injury. You assume responsibility for any consequences of
          triggering it.
        </P>

        <H2 num="07">The fake call</H2>
        <P>
          The "fake call" feature simulates an incoming phone call to give you a pretext to leave a
          situation. It is a tool, not a deception platform. Do not use it to defraud, harass, or
          deceive anyone in a way that would be illegal where you are.
        </P>

        <H2 num="08">SMS, phone, and carrier costs</H2>
        <P>
          When you trigger an SMS or phone call, the App hands off to your iPhone's Messages and
          Phone apps, which use your cellular carrier. Standard carrier rates for SMS and voice calls
          apply. The App does not control, subsidize, or refund those charges.
        </P>
        <P>
          Calls placed to 911 (or your local emergency number) by the App are placed in the same way
          as if you had dialed yourself. You are responsible for ensuring 911 is the correct number
          to call in your jurisdiction.
        </P>

        <H2 num="09">License</H2>
        <P>
          You are granted a limited, non-exclusive, non-transferable, revocable license to use the
          App on iOS devices that you own or control, in accordance with Apple's App Store Terms of
          Service. You may not copy, modify, distribute, sell, lease, reverse-engineer (except as
          permitted by law), or attempt to extract the source code of the App.
        </P>

        <H2 num="10">Updates</H2>
        <P>
          We may release updates to the App from time to time. Some updates may add, modify, or
          remove features. We are not obligated to maintain or support the App indefinitely.
        </P>

        <H2 num="11">Disclaimer of warranties</H2>
        <PCaps>
          THE APP IS PROVIDED "AS IS" AND "AS AVAILABLE," WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
          IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS
          FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, ACCURACY, AND UNINTERRUPTED OR ERROR-FREE
          OPERATION.
        </PCaps>
        <PCaps>
          WE DO NOT WARRANT THAT THE APP WILL DETECT THREATS, PROTECT YOU FROM HARM, ALERT ANY THIRD
          PARTY, RECORD ANY EVIDENCE, OR FUNCTION CORRECTLY IN ANY GIVEN SITUATION.
        </PCaps>

        <H2 num="12">Limitation of liability</H2>
        <PCaps>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT WILL THE DEVELOPER BE LIABLE FOR ANY
          INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR ANY
          LOSS OF PROFITS, REVENUE, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF
          OR RELATED TO YOUR USE OF (OR INABILITY TO USE) THE APP — INCLUDING, WITHOUT LIMITATION,
          ANY HARM, INJURY, LOSS, OR DAMAGE THAT RESULTS FROM:
        </PCaps>
        <UL>
          <LI>THE APP'S FAILURE TO DETECT A TRIGGER WORD, GESTURE, OR EVENT;</LI>
          <LI>
            ANY FAILURE TO DELIVER AN SMS, PLACE A CALL, RECORD AUDIO OR VIDEO, OR PLAY THE SIREN;
          </LI>
          <LI>ANY DELAY IN ALERTING YOUR EMERGENCY CONTACTS OR EMERGENCY SERVICES;</LI>
          <LI>ANY ACTION OR INACTION BY YOUR EMERGENCY CONTACTS OR EMERGENCY SERVICES;</LI>
          <LI>ANY USE OR MISUSE OF AUDIO OR VIDEO RECORDINGS CREATED WITH THE APP;</LI>
          <LI>ANY USE OR MISUSE OF THE FAKE-CALL FEATURE;</LI>
          <LI>ANY HARM CAUSED BY THE SIREN'S VOLUME OR FREQUENCY;</LI>
          <LI>LOSS OF, OR INABILITY TO ACCESS, RECORDINGS OR SETTINGS STORED ON YOUR DEVICE.</LI>
        </UL>
        <PCaps>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE DEVELOPER'S TOTAL CUMULATIVE LIABILITY ARISING
          OUT OF OR RELATED TO THE APP IS LIMITED TO THE GREATER OF (A) THE AMOUNT YOU PAID FOR THE
          APP IN THE 12 MONTHS PRECEDING THE EVENT GIVING RISE TO THE CLAIM, OR (B) FIVE U.S. DOLLARS
          ($5.00).
        </PCaps>
        <P>
          Some jurisdictions do not allow the exclusion or limitation of certain warranties or
          liabilities, so portions of the above may not apply to you. In those jurisdictions, our
          liability is limited to the smallest extent permitted by law.
        </P>

        <H2 num="13">Indemnification</H2>
        <P>
          You agree to defend, indemnify, and hold harmless the developer from and against any
          claims, damages, liabilities, and expenses (including reasonable attorneys' fees) arising
          from your use of the App, your violation of these Terms, your violation of any law
          (including recording laws), or your infringement of any third party's rights.
        </P>

        <H2 num="14">Termination</H2>
        <P>
          You may stop using the App at any time by uninstalling it. We may suspend or end your right
          to use the App if you breach these Terms. Sections 3, 5, 11, 12, 13, and 16 survive
          termination.
        </P>

        <H2 num="15">Apple-specific terms</H2>
        <P>
          You acknowledge that these Terms are between you and the developer of the App, not Apple,
          and that Apple is not responsible for the App or its content. Apple has no obligation to
          provide maintenance or support for the App. In the event of any failure of the App to
          conform to any applicable warranty, you may notify Apple, and Apple will refund the
          purchase price (if any) for the App; to the maximum extent permitted by law, Apple has no
          other warranty obligation with respect to the App. Apple and Apple's subsidiaries are
          third-party beneficiaries of these Terms and, upon your acceptance of these Terms, have the
          right (and will be deemed to have accepted the right) to enforce these Terms against you as
          a third-party beneficiary.
        </P>

        <H2 num="16">Governing law and disputes</H2>
        <P>
          These Terms are governed by the laws of the jurisdiction in which the developer resides,
          without regard to conflict-of-law principles. Any dispute arising out of or related to
          these Terms or the App shall be resolved exclusively in the courts of that jurisdiction,
          and you consent to personal jurisdiction there.
        </P>
        <P>
          If you are a consumer in a jurisdiction whose law grants you mandatory rights that cannot
          be waived, nothing in these Terms is intended to override those rights.
        </P>

        <H2 num="17">Changes to these Terms</H2>
        <P>
          We may revise these Terms from time to time. The "Last updated" date at the top reflects
          the most recent revision. Material changes will be noted in the App Store release notes for
          the version that introduces them. Your continued use of the App after a revision
          constitutes acceptance of the revised Terms.
        </P>

        <H2 num="18">Contact</H2>
        <P>
          For questions about these Terms, contact the developer at{' '}
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

export default AngelWithYouTerms;
