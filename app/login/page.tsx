"use client";

import React from "react";
import LoginForm from "@/components/auth/LoginForm";
import NoiseTexture from "@/components/effects/NoiseTexture";
import CursorGlow from "@/components/effects/CursorGlow";

export default function LoginPage() {
  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-6 relative overflow-hidden bg-[#001715]"
    >
      {/* Background Layers */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#82C21C]/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#82C21C]/5 blur-[120px]" />
      </div>

      <NoiseTexture />
      <CursorGlow />

      <div className="relative z-10 w-full flex justify-center">
        <LoginForm />
      </div>
    </div>
  );
}


