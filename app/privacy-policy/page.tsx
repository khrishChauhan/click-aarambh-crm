import LegalPageLayout from "@/components/LegalPageLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Click Aarambh",
  description: "Privacy Policy for Click Aarambh CRM and WhatsApp services.",
};

export default function PrivacyPolicy() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="April 13, 2026">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
        <p>
          At Click Aarambh, we are committed to protecting your privacy. This Privacy Policy explains how we collect, 
          use, disclose, and safeguard your information when you use our CRM platform and WhatsApp Cloud API 
          integration services.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Data We Collect</h2>
        <p>We may collect the following personal information directly from users or through our automated systems:</p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li><strong>Name:</strong> To identify and communicate with you personally.</li>
          <li><strong>Phone Number:</strong> To facilitate communications via WhatsApp and other CRM channels.</li>
          <li><strong>Messages:</strong> Content of communications sent through our platform for processing and CRM logging.</li>
          <li><strong>Usage Data:</strong> Information about how you interact with our platform.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Data</h2>
        <p>The information we collect is used for the following purposes:</p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>To provide and maintain our CRM service.</li>
          <li>To facilitate communication between you and your leads/customers.</li>
          <li>To improve our automated messaging and synchronization systems.</li>
          <li>To provide customer support and respond to inquiries.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Data Sharing & Disclosure</h2>
        <p>
          <strong>We do not sell, trade, or otherwise transfer your personal information to third parties.</strong> 
          Your data is used strictly for the operation of the Click Aarambh services you have opted into.
        </p>
        <p className="mt-4">
          We may share data with service providers (like Meta) solely to facilitate the core functionality of 
          the WhatsApp Cloud API integration as requested by you.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
        <p>
          We implement a variety of security measures to maintain the safety of your personal information. 
          Your data is stored on secure servers and access is restricted to authorized personnel only. 
          However, no method of transmission over the Internet or electronic storage is 100% secure.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
        <p>
          You have the right to request access to the data we hold about you, or to request that we delete or 
          modify any of your personal information. To exercise these rights, please refer to our Data Deletion 
          page or contact us directly.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at:
        </p>
        <div className="mt-4 p-4 rounded-lg bg-white/5 border border-white/10">
          <p>Email: support@clickaarambh.com</p>
        </div>
      </section>
    </LegalPageLayout>
  );
}
