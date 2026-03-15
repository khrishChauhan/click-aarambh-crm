"use client";

import React from "react";
import LoginForm from "@/components/auth/LoginForm";
import CursorGlow from "@/components/effects/CursorGlow";
import NoiseTexture from "@/components/effects/NoiseTexture";

export default function LoginPage() {
  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: "#082220" }}
    >
      <NoiseTexture />
      <CursorGlow />

      
      {/* Background patterns */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#1E2B27 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 w-full flex justify-center">
        <LoginForm />
      </div>
    </div>
  );
}
