import Link from 'next/link';
import Image from 'next/image';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <Image
            src="/burns-farm-logo.png"
            alt="Burns Farm Logo"
            width={200}
            height={100}
            className="mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="text-gray-600 mt-2">Last updated: {new Date().toLocaleDateString('en-GB')}</p>
        </div>

        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
          <p className="text-gray-700 mb-6">
            Burns Farm Caravan & Campsite (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, and safeguard your information when you use 
            our website and services.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
          <h3 className="text-xl font-medium text-gray-900 mb-3">2.1 Personal Information</h3>
          <p className="text-gray-700 mb-4">
            When you place an order, we collect:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
            <li>Name and contact details (email, phone number)</li>
            <li>Delivery address (cabin or pitch information)</li>
            <li>Order details and preferences</li>
            <li>Payment information (processed securely by our payment provider)</li>
          </ul>

          <h3 className="text-xl font-medium text-gray-900 mb-3">2.2 Cookies and Tracking</h3>
          <p className="text-gray-700 mb-4">
            We use cookies to enhance your experience:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
            <li><strong>Necessary Cookies:</strong> Required for website functionality</li>
            <li><strong>Analytics Cookies:</strong> Help us understand website usage (optional)</li>
            <li><strong>Marketing Cookies:</strong> Used for targeted advertising (optional)</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
          <p className="text-gray-700 mb-4">We use your information to:</p>
          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
            <li>Process and fulfill your orders</li>
            <li>Provide customer support</li>
            <li>Send order confirmations and updates</li>
            <li>Improve our website and services</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Protection</h2>
          <p className="text-gray-700 mb-6">
            We implement appropriate security measures to protect your personal information. 
            Your data is stored securely and only accessed by authorized personnel.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Rights</h2>
          <p className="text-gray-700 mb-4">Under UK GDPR, you have the right to:</p>
          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Data portability</li>
            <li>Withdraw consent for optional cookies</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookie Management</h2>
          <p className="text-gray-700 mb-4">
            You can manage your cookie preferences at any time by clicking the &quot;Customize&quot; 
            button in our cookie banner or by contacting us directly.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact Us</h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about this Privacy Policy or your data, please contact us:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-gray-700"><strong>Burns Farm Caravan & Campsite</strong></p>
            <p className="text-gray-700">St Johns-in-the-Vale</p>
            <p className="text-gray-700">Keswick, Cumbria CA12 4RR</p>
            <p className="text-gray-700">Email: info@burns-farm.co.uk</p>
            <p className="text-gray-700">Phone: 017687 75912</p>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Changes to This Policy</h2>
          <p className="text-gray-700 mb-6">
            We may update this Privacy Policy from time to time. We will notify you of any 
            changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            ← Back to Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
