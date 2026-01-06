import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 text-stone-900">
      {/* Top Navigation */}
      <div className="sticky top-0 z-20 p-6 bg-stone-50/80 backdrop-blur-sm">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-stone-200">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-8 h-8 text-blue-500" />
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold text-stone-900">Privacy Policy for BreatheMindful</h1>
              <p className="text-sm text-stone-600 mt-1">Last Updated: {currentDate}</p>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-stone max-w-none space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-semibold text-stone-900 mb-4">Introduction</h2>
              <p className="text-stone-700 leading-relaxed">
                BreatheMindful ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we handle information when you use our mobile application (the "App").
              </p>
            </section>

            {/* Our Privacy Commitment */}
            <section>
              <h2 className="text-2xl font-semibold text-stone-900 mb-4">Our Privacy Commitment</h2>
              <p className="text-stone-700 leading-relaxed">
                We do not collect, store, or transmit any personal data to our servers or third parties. All data generated and used by the App is stored exclusively on your device and remains under your complete control.
              </p>
            </section>

            {/* Data Storage */}
            <section>
              <h2 className="text-2xl font-semibold text-stone-900 mb-4">Data Storage</h2>
              <p className="text-stone-700 leading-relaxed mb-4">
                All data created and used by BreatheMindful is stored locally on your device, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-stone-700 ml-4">
                <li>Breathing session history and preferences</li>
                <li>Focus session data and productivity metrics</li>
                <li>Sleep tracking information and sleep scores</li>
                <li>Analytics and insights generated from your usage</li>
                <li>App settings and preferences</li>
              </ul>
              <p className="text-stone-700 leading-relaxed mt-4">
                This data never leaves your device and is not accessible to us or any third parties.
              </p>
            </section>

            {/* Permissions and Data Access */}
            <section>
              <h2 className="text-2xl font-semibold text-stone-900 mb-4">Permissions and Data Access</h2>
              <p className="text-stone-700 leading-relaxed mb-4">
                BreatheMindful requests the following permissions to provide core functionality:
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-stone-900 mb-2">HealthKit Access</h3>
                  <ul className="list-disc list-inside space-y-2 text-stone-700 ml-4">
                    <li><strong>Read Access:</strong> The App reads your sleep analysis data, respiratory rate, and mindful session history from Apple Health to provide sleep quality insights, analyze sleep stages, track wake events, and display your wellness data across devices.</li>
                    <li><strong>Write Access:</strong> The App saves your sleep sessions and breathing exercises to Apple Health so they appear in the Health app and sync across your Apple devices.</li>
                    <li><strong>Data Processing:</strong> All HealthKit data processing occurs on your device. We do not access, store, or transmit this data to any external servers.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-stone-900 mb-2">Microphone Access</h3>
                  <p className="text-stone-700 leading-relaxed">
                    The App uses microphone access (when enabled) to detect sleep disturbances like snoring for audio monitoring features. All audio processing occurs on your device in real-time. We do not record, store, or transmit any audio data.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-stone-900 mb-2">Notifications</h3>
                  <p className="text-stone-700 leading-relaxed">
                    The App uses local notifications to alert you when your sleep alarm goes off. These notifications are generated and delivered entirely on your device.
                  </p>
                </div>
              </div>
            </section>

            {/* HealthKit Data */}
            <section>
              <h2 className="text-2xl font-semibold text-stone-900 mb-4">HealthKit Data</h2>
              <p className="text-stone-700 leading-relaxed mb-4">
                When you grant HealthKit permissions, the App:
              </p>
              <ul className="list-disc list-inside space-y-2 text-stone-700 ml-4">
                <li><strong>Reads:</strong> Sleep analysis data (sleep stages, wake events), respiratory rate, and mindful session history</li>
                <li><strong>Writes:</strong> Sleep sessions tracked in the App and breathing exercises as mindful minutes</li>
              </ul>
              <p className="text-stone-700 leading-relaxed mt-4">
                This data is managed by Apple Health and synced across your Apple devices through iCloud (if enabled in your Apple Health settings). We have no access to this data beyond what is necessary to display it within the App on your device.
              </p>
            </section>

            {/* Third-Party Services */}
            <section>
              <h2 className="text-2xl font-semibold text-stone-900 mb-4">Third-Party Services</h2>
              <p className="text-stone-700 leading-relaxed">
                BreatheMindful does not use any third-party analytics services, advertising networks, or data collection frameworks. We do not share, sell, or transmit your data to any third parties.
              </p>
            </section>

            {/* Data Deletion */}
            <section>
              <h2 className="text-2xl font-semibold text-stone-900 mb-4">Data Deletion</h2>
              <p className="text-stone-700 leading-relaxed mb-4">
                Since all data is stored locally on your device, you can delete all App data at any time by:
              </p>
              <ul className="list-disc list-inside space-y-2 text-stone-700 ml-4">
                <li>Deleting the App from your device, which removes all locally stored data</li>
                <li>Using your device's settings to clear App data</li>
              </ul>
            </section>

            {/* Changes to This Privacy Policy */}
            <section>
              <h2 className="text-2xl font-semibold text-stone-900 mb-4">Changes to This Privacy Policy</h2>
              <p className="text-stone-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy in the App and updating the "Last Updated" date.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-semibold text-stone-900 mb-4">Your Rights</h2>
              <p className="text-stone-700 leading-relaxed mb-4">
                You have complete control over your data:
              </p>
              <ul className="list-disc list-inside space-y-2 text-stone-700 ml-4">
                <li>All data is stored locally on your device</li>
                <li>You can revoke HealthKit permissions at any time through your device's Settings</li>
                <li>You can delete the App and all associated data at any time</li>
                <li>You control whether to grant microphone or notification permissions</li>
              </ul>
            </section>

            {/* Contact Us */}
            <section>
              <h2 className="text-2xl font-semibold text-stone-900 mb-4">Contact Us</h2>
              <p className="text-stone-700 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-stone-700 leading-relaxed mt-2">
                <a 
                  href="https://summitwanderlust.com/breathe-with-me" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  https://summitwanderlust.com/breathe-with-me
                </a>
              </p>
            </section>

            {/* Consent */}
            <section>
              <h2 className="text-2xl font-semibold text-stone-900 mb-4">Consent</h2>
              <p className="text-stone-700 leading-relaxed">
                By using BreatheMindful, you consent to this Privacy Policy. If you do not agree with this policy, please do not use the App.
              </p>
            </section>

            {/* Summary */}
            <section className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-8">
              <h2 className="text-xl font-semibold text-stone-900 mb-2">Summary</h2>
              <p className="text-stone-700 leading-relaxed">
                BreatheMindful stores all data locally on your device. We do not collect, transmit, or share any personal information. Your privacy is our priority.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
