"use client";

import React from "react";
import LoginForm from "@/components/auth/LoginForm";
import NoiseTexture from "@/components/effects/NoiseTexture";

const BackgroundWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen w-full flex items-center justify-center p-6 relative bg-[#000B0A] overflow-hidden">
    
    {/* 1. Radial gradient focus behind card (Depth) */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#82C21C]/[0.08] via-[#000B0A]/80 to-[#000B0A] pointer-events-none" />

    {/* 2. Low Opacity Grid Overlay */}
    <div 
      className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
      style={{
        backgroundImage: `
          linear-gradient(to right, #ffffff 1px, transparent 1px),
          linear-gradient(to bottom, #ffffff 1px, transparent 1px)
        `,
        backgroundSize: '32px 32px'
      }}
    />

    {/* 3. Soft Vignette (Edge Darkening) */}
    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,#000B0A_100%)] opacity-80" />

    <NoiseTexture />

    <div className="relative z-10 w-full flex justify-center">
      {children}
    </div>
  </div>
);

export default function LoginPage() {
  return (
    <BackgroundWrapper>
      <LoginForm />
    </BackgroundWrapper>
  );
}
