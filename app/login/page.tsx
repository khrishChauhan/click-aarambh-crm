"use client";

import React from "react";
import LoginForm from "@/components/auth/LoginForm";
import NoiseTexture from "@/components/effects/NoiseTexture";

export default function LoginPage() {
  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-6 relative overflow-hidden"
      style={{ 
        background: "radial-gradient(circle at center, #0B2B28 0%, #051412 100%)",
      }}
    >
      {/* Decorative Glow Elements for Premium Feel */}
      <div 
        className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-20"
        style={{ background: "#82C21C" }}
      />
      <div 
        className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-10"
        style={{ background: "#4A7A00" }}
      />

      <NoiseTexture />

      <div className="relative z-10 w-full flex justify-center animate-in fade-in zoom-in duration-700">
        <LoginForm />
      </div>

    </div>
  );
}

