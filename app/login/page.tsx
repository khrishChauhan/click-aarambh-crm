"use client";

import React from "react";
import LoginForm from "@/components/auth/LoginForm";
import NoiseTexture from "@/components/effects/NoiseTexture";

export default function LoginPage() {
  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: "#082220" }}
    >
      <NoiseTexture />

      <div className="relative z-10 w-full flex justify-center">
        <LoginForm />
      </div>

    </div>
  );
}

