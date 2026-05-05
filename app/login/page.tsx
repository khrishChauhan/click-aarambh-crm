"use client";

import React from "react";
import LoginForm from "@/components/auth/LoginForm";
import NoiseTexture from "@/components/effects/NoiseTexture";

export default function LoginPage() {
  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-6 relative bg-[#000B0A]"
    >
      {/* Dark Grid Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #1E2B27 1px, transparent 1px),
            linear-gradient(to bottom, #1E2B27 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Faint Glowing Gradient Orb */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
        <div className="w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-[#82C21C]/5 blur-[120px]" />
      </div>

      <NoiseTexture />

      <div className="relative z-10 w-full flex justify-center">
        <LoginForm />
      </div>
    </div>
  );
}
