import LegalPageLayout from "@/components/LegalPageLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Deletion Instructions | Click Aarambh",
  description: "How to request deletion of your data from Click Aarambh CRM.",
};

export default function DataDeletion() {
  return (
    <LegalPageLayout title="Data Deletion Instructions" lastUpdated="April 13, 2026">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Requesting Data Deletion</h2>
        <p>
          At Click Aarambh, we respect your right to privacy and give you control over your personal data. 
          If you would like to have your personal data removed from our systems, please follow the 
          instructions below.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">How to Request</h2>
        <p>You can request data deletion through any of the following methods:</p>
        <div className="mt-8 space-y-6">
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-lg font-semibold text-[#82C21C] mb-2">Email Request</h3>
            <p>
              Send an email to <strong>support@clickaarambh.com</strong> with the subject line "Data Deletion Request". 
              Please include the phone number or name associated with your data.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-lg font-semibold text-[#82C21C] mb-2">WhatsApp Request</h3>
            <p>
              You can send a message directly to our official WhatsApp account requesting account or 
              data deletion.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">What Happens After Requesting?</h2>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>We will verify your identity to ensure the request is legitimate.</li>
          <li>Once verified, we will remove your personal identifying information (Name, Phone, Chat History) from our active databases.</li>
          <li>The process is typically completed within 7 business days.</li>
          <li>You will receive a confirmation once the deletion is successful.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Exclusions</h2>
        <p>
          Please note that we may retain certain information where required by law or for legitimate 
          business purposes (e.g., invoices for accounting, or data required for security and 
          fraud prevention).
        </p>
      </section>
    </LegalPageLayout>
  );
}
