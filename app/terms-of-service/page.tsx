import LegalPageLayout from "@/components/LegalPageLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Click Aarambh",
  description: "Terms and conditions for using Click Aarambh CRM and services.",
};

export default function TermsOfService() {
  return (
    <LegalPageLayout title="Terms of Service" lastUpdated="April 13, 2026">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
        <p>
          By accessing or using Click Aarambh CRM, you agree to be bound by these Terms of Service. 
          If you do not agree to these terms, please do not use our services.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
        <p>
          Click Aarambh provides a CRM platform integrated with WhatsApp Cloud API for lead management 
          and customer communication automation.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">3. User Responsibilities</h2>
        <p>
          Users are responsible for maintaining the confidentiality of their account credentials and for 
          all activities that occur under their account. You agree to use the service in compliance 
          with all applicable laws and Meta's WhatsApp Business Policy.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">4. Prohibited Uses</h2>
        <p>You may not use the service for:</p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>Sending spam or unsolicited messages.</li>
          <li>Sending illegal, harmful, or deceptive content.</li>
          <li>Attempting to interfere with the proper functioning of the service.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">5. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your access to the service at our sole discretion, 
          without notice, for conduct that we believe violates these Terms or is harmful to other users 
          of the service or us.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">6. Limitation of Liability</h2>
        <p>
          Click Aarambh shall not be liable for any indirect, incidental, special, consequential, or 
          punitive damages resulting from your use of or inability to use the service.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">7. Changes to Terms</h2>
        <p>
          We may modify these terms at any time. We will post the revised terms on this page with an 
          updated "Last updated" date.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">8. Contact</h2>
        <p>
          Questions about the Terms of Service should be sent to support@clickaarambh.com.
        </p>
      </section>
    </LegalPageLayout>
  );
}
