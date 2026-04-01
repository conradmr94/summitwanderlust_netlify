import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap } from 'lucide-react';

const MotivePrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f5fa] relative" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />

      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #fef3c7 0%, transparent 70%)' }} />
      </div>

      {/* Back button */}
      <button
        onClick={() => navigate('/motive')}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-stone-200/60 text-stone-600 hover:text-stone-900 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back</span>
      </button>

      <article className="max-w-2xl mx-auto px-6 pt-28 pb-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-5"
            style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)' }}>
            <Zap className="w-6 h-6 text-white" fill="white" />
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
          prose-a:text-amber-500 prose-a:no-underline hover:prose-a:underline
        ">
          <p>
            Summit Wanderlust ("we," "our," or "us") operates the motive. mobile application (the "App"). This Privacy Policy explains how we collect, use, and protect your information when you use the App.
          </p>

          <h2>Information We Collect</h2>

          <h3>Information We Do Not Collect</h3>
          <p>The App is designed with your privacy in mind. We do not collect, store, or transmit any personal information. Specifically:</p>
          <ul>
            <li>We do not collect your name, email address, or contact information.</li>
            <li>We do not track your location.</li>
            <li>We do not use analytics or tracking tools.</li>
            <li>We do not use cookies or similar technologies.</li>
            <li>We do not collect usage data or device identifiers.</li>
            <li>We do not share any data with third parties.</li>
          </ul>

          <h3>Data Stored Locally on Your Device</h3>
          <p>The App stores the following data locally on your device only. This data never leaves your device and is not accessible to us:</p>
          <ul>
            <li>Your quote preferences (time windows, categories)</li>
            <li>Notification settings</li>
            <li>Ambient sound preferences</li>
            <li>Quote interaction history (liked, dismissed)</li>
          </ul>
          <p>This data is stored using Apple's standard on-device storage (UserDefaults and local files) and is removed when you delete the App.</p>

          <h3>Subscriptions</h3>
          <p>The App offers auto-renewable subscriptions managed entirely by Apple through the App Store. When you subscribe:</p>
          <ul>
            <li>Payment is processed by Apple, not by us.</li>
            <li>We do not have access to your payment information, Apple ID, or billing details.</li>
            <li>Subscription status is verified on your device using Apple's StoreKit framework.</li>
          </ul>
          <p>For details on how Apple handles your purchase data, please refer to <a href="https://www.apple.com/privacy/" target="_blank" rel="noopener noreferrer">Apple's Privacy Policy</a>.</p>

          <h2>Notifications</h2>
          <p>If you enable notifications, the App schedules local notifications on your device. These notifications are generated and delivered entirely on your device. No notification data is sent to external servers.</p>

          <h2>Children's Privacy</h2>
          <p>The App does not knowingly collect personal information from children under the age of 13. Since we do not collect any personal information from any user, the App is compliant with the Children's Online Privacy Protection Act (COPPA).</p>

          <h2>Data Security</h2>
          <p>Since we do not collect or transmit personal data, there is no risk of your personal information being accessed, altered, or disclosed from our systems. All App data remains on your device under the protection of your device's built-in security features.</p>

          <h2>Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date above. You are advised to review this Privacy Policy periodically for any changes.</p>

          <h2>Your Rights</h2>
          <p>Since we do not collect any personal data, there is no personal data for us to provide, modify, or delete. If you wish to remove all locally stored App data, simply delete the App from your device.</p>

          <h2>Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p><strong>Summit Wanderlust</strong><br />Email: admin@summitwanderlust.com</p>
        </div>
      </article>
    </div>
  );
};

export default MotivePrivacyPolicy;
