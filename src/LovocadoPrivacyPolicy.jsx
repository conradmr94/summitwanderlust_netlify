import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';

const LovocadoPrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#faf5f0] relative" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />

      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #fce7f3 0%, transparent 70%)' }} />
      </div>

      {/* Back button */}
      <button
        onClick={() => navigate('/lovocado')}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-stone-200/60 text-stone-600 hover:text-stone-900 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back</span>
      </button>

      <article className="max-w-2xl mx-auto px-6 pt-28 pb-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-5"
            style={{ background: 'linear-gradient(135deg, #f472b6, #ec4899)' }}>
            <Heart className="w-6 h-6 text-white" fill="white" />
          </div>
          <h1
            className="text-3xl md:text-4xl font-bold text-stone-800 mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Privacy Policy
          </h1>
          <p className="text-stone-400 text-sm">Last Updated: March 31, 2026</p>
        </div>

        {/* Policy content */}
        <div className="prose prose-stone max-w-none
          prose-headings:font-bold prose-headings:text-stone-800
          prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-stone-200 prose-h2:pb-2
          prose-h3:text-base prose-h3:mt-6 prose-h3:mb-2
          prose-p:text-stone-600 prose-p:leading-relaxed
          prose-li:text-stone-600
          prose-strong:text-stone-700
          prose-a:text-pink-500 prose-a:no-underline hover:prose-a:underline
        ">
          <p>
            Lovocado ("we," "our," or "the App") is a relationship companion app designed to help couples stay connected. This Privacy Policy explains how we collect, use, and protect your information.
          </p>

          <h2>1. Information We Collect</h2>

          <h3>1.1 Account Information</h3>
          <p>When you create an account, we collect:</p>
          <ul>
            <li><strong>Authentication credentials</strong> via Apple Sign-In or Google Sign-In (email address and display name)</li>
            <li><strong>Profile information</strong> you provide, such as your name, your partner's name, avatars, and anniversary date</li>
          </ul>

          <h3>1.2 Health & Fitness Data (HealthKit)</h3>
          <p>With your explicit permission, we access Apple HealthKit data including:</p>
          <ul>
            <li>Step count, calories burned, exercise minutes, and stand hours</li>
            <li>Heart rate data</li>
            <li>Workout session details (type, duration, distance, calories)</li>
          </ul>
          <p>
            <strong>HealthKit data is used solely within the App to power couple fitness features.</strong> We do not sell HealthKit data, use it for advertising, or share it with third parties beyond what is necessary to provide the App's core functionality. HealthKit data may be synced to our cloud service solely to share fitness activity between paired partners.
          </p>

          <h3>1.3 Location Data</h3>
          <p>With your explicit permission, we collect:</p>
          <ul>
            <li><strong>Precise location</strong> to enable place discovery, map features, and location-based check-ins</li>
            <li><strong>Geofenced regions</strong> (up to 20 saved places) to provide arrival-based reminders</li>
            <li><strong>Place visit history</strong> associated with your saved locations</li>
          </ul>
          <p>You can disable location access at any time through your device's Settings.</p>

          <h3>1.4 Photos & Camera</h3>
          <p>With your explicit permission, we access:</p>
          <ul>
            <li><strong>Photo library</strong> to attach photos to memories, messages, and shared content</li>
            <li><strong>Camera</strong> to capture new photos and videos within the App</li>
          </ul>
          <p>Photos you attach are stored in our cloud service to enable sharing with your partner.</p>

          <h3>1.5 Notifications</h3>
          <p>With your permission, we send local and push notifications for:</p>
          <ul>
            <li>Daily care task reminders</li>
            <li>Calendar event alerts</li>
            <li>Partner messages and activity updates</li>
          </ul>

          <h3>1.6 User-Generated Content</h3>
          <p>We store content you create within the App, including:</p>
          <ul>
            <li>Chat messages (text, images, videos, voice messages)</li>
            <li>Shared notes and lists</li>
            <li>Calendar events and reminders</li>
            <li>Saved places, trips, and itineraries</li>
            <li>Memories with photos, notes, and ratings</li>
            <li>Wellness check-ins (mood, energy, stress, sleep, gratitude entries)</li>
            <li>Couple challenges and goals</li>
            <li>Daily care task completions (hydration, meals, sleep, self-care tracking)</li>
          </ul>

          <h3>1.7 Automatically Collected Information</h3>
          <ul>
            <li>Basic device information necessary for app functionality</li>
            <li>We do <strong>not</strong> use analytics, advertising SDKs, or crash reporting services</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use your information exclusively to:</p>
          <ul>
            <li>Provide and maintain the App's features</li>
            <li>Sync shared content between you and your paired partner</li>
            <li>Send notifications you have opted into</li>
            <li>Display your fitness and wellness data within the App</li>
            <li>Improve and develop new App features</li>
          </ul>
          <p><strong>We do not:</strong></p>
          <ul>
            <li>Sell your personal data to third parties</li>
            <li>Use your data for advertising or marketing purposes</li>
            <li>Use HealthKit data for purposes unrelated to health and fitness features</li>
            <li>Share your data with data brokers</li>
            <li>Track you across other apps or websites</li>
          </ul>

          <h2>3. Data Storage & Security</h2>
          <ul>
            <li><strong>Cloud storage:</strong> Your data is stored on Google Firebase (Firestore and Cloud Storage), which provides encryption in transit and at rest. Firebase is hosted in the United States.</li>
            <li><strong>Local storage:</strong> Some data is cached on your device using standard iOS storage for offline access.</li>
            <li><strong>Authentication:</strong> We use industry-standard authentication via Apple and Google sign-in services.</li>
          </ul>

          <h2>4. Data Sharing</h2>
          <p>We share your data only in the following circumstances:</p>
          <ul>
            <li><strong>With your paired partner:</strong> Content you create in shared features (messages, places, notes, calendars, trips, memories, challenges) is visible to your paired partner.</li>
            <li><strong>Service providers:</strong> We use Google Firebase for cloud storage and authentication. Firebase processes your data pursuant to Google's data processing terms.</li>
            <li><strong>Legal requirements:</strong> We may disclose your information if required by law, regulation, or legal process.</li>
          </ul>
          <p>We do not share your data with any other third parties.</p>

          <h2>5. Data Retention & Deletion</h2>
          <ul>
            <li>Your data is retained for as long as your account is active.</li>
            <li>You may request deletion of your account and all associated data by contacting us at the email address below.</li>
            <li>Upon account deletion, we will delete your personal data from our systems within 30 days, except where retention is required by law.</li>
            <li>Data stored locally on your device can be removed by deleting the App.</li>
          </ul>

          <h2>6. Children's Privacy</h2>
          <p>
            Lovocado is not directed to children under 13. We do not knowingly collect personal information from children under 13. If we learn that we have collected personal information from a child under 13, we will delete that information promptly.
          </p>

          <h2>7. Your Rights</h2>
          <p>Depending on your jurisdiction, you may have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Export your data in a portable format</li>
            <li>Withdraw consent for optional data collection (HealthKit, Location, Photos, Notifications) at any time through your device's Settings</li>
          </ul>

          <h2>8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of material changes through the App or by other appropriate means. Your continued use of the App after changes become effective constitutes acceptance of the revised policy.
          </p>

          <h2>9. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or wish to exercise your data rights, please contact us at:
          </p>
          <p><strong>Email:</strong> summitwanderlust@gmail.com</p>

          <h2>10. California Residents (CCPA)</h2>
          <p>If you are a California resident, you have the right to:</p>
          <ul>
            <li>Know what personal information we collect and how it is used</li>
            <li>Request deletion of your personal information</li>
            <li>Opt out of the sale of personal information (we do not sell your data)</li>
            <li>Not be discriminated against for exercising your privacy rights</li>
          </ul>

          <h2>11. European Residents (GDPR)</h2>
          <p>If you are in the European Economic Area, our legal basis for processing your data is:</p>
          <ul>
            <li><strong>Consent</strong> for optional features (HealthKit, Location, Photos, Notifications)</li>
            <li><strong>Contract performance</strong> for core App functionality</li>
            <li><strong>Legitimate interest</strong> for App improvement and security</li>
          </ul>
          <p>You may contact your local data protection authority if you have concerns about our data practices.</p>
        </div>
      </article>
    </div>
  );
};

export default LovocadoPrivacyPolicy;
