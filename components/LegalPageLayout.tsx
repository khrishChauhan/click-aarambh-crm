import React from "react";
import Link from "next/link";

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#082220] text-gray-200 py-16 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#82C21C]/30 selection:text-[#82C21C]">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12 border-b border-white/10 pb-8">
          <Link 
            href="/" 
            className="text-[#82C21C] hover:text-[#95d62b] transition-colors mb-8 inline-block font-medium"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
            {title}
          </h1>
          <p className="text-sm text-gray-400">
            Last updated: {lastUpdated}
          </p>
        </header>

        <main className="max-w-none space-y-12 text-gray-300 leading-relaxed">
          {children}
        </main>

        <footer className="mt-20 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Click Aarambh. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <Link href="/privacy-policy" className="hover:text-[#82C21C] transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-[#82C21C] transition-colors">Terms of Service</Link>
            <Link href="/data-deletion" className="hover:text-[#82C21C] transition-colors">Data Deletion</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
