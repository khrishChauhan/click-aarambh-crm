"use client";

import React from "react";
import LoginForm from "@/components/auth/LoginForm";
import NoiseTexture from "@/components/effects/NoiseTexture";
import CursorGlow from "@/components/effects/CursorGlow";

export default function LoginPage() {
  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-6 relative overflow-hidden"
      style={{ 
        background: "#082220",
      }}
    >

      <NoiseTexture />
      <CursorGlow />

      <div className="relative z-10 w-full flex justify-center animate-in fade-in zoom-in duration-700">
        <LoginForm />
      </div>

    </div>
  );
}

