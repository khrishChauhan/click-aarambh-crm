"use client";

import React, { useState } from "react";
import { message } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";
import { authenticate } from "@/app/actions/auth";
import { motion } from "framer-motion";

// --- REUSABLE UI COMPONENTS ---

const InputField = ({ label, type, value, onChange, placeholder, required = false, extraLabel = null }: any) => (
  <div className="flex flex-col gap-2">
    <div className="flex justify-between items-center ml-1">
      <label className="text-[11px] uppercase tracking-wider text-[#8C947D]/80 font-semibold">
        {label}
      </label>
      {extraLabel}
    </div>
    <div className="relative group">
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full bg-[#000B0A]/60 border border-white/5 rounded-[14px] px-4 py-3.5 text-[#CDE8E4] text-sm placeholder:text-[#8C947D]/40 focus:outline-none focus:border-[#82C21C]/60 focus:ring-2 focus:ring-[#82C21C]/20 transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] relative z-10"
      />
      {/* Subtle hover glow underneath input */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#82C21C]/0 via-[#82C21C]/5 to-[#82C21C]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[14px] pointer-events-none" />
    </div>
  </div>
);

const SubmitButton = ({ loading, text }: any) => (
  <button
    type="submit"
    disabled={loading}
    className="mt-6 w-full relative group overflow-hidden rounded-[14px] p-[1px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100 disabled:cursor-not-allowed"
  >
    {/* Outer glow aura */}
    <div className="absolute -inset-2 bg-gradient-to-r from-[#82C21C] to-[#9CDF3B] opacity-40 group-hover:opacity-60 blur-xl transition-opacity duration-300" />
    
    {/* Actual Button Body */}
    <div className="relative w-full h-full bg-gradient-to-r from-[#82C21C] to-[#9CDF3B] text-[#001715] font-bold py-3.5 px-6 rounded-[13px] flex justify-center items-center gap-2 group-hover:brightness-110 transition-all duration-300 shadow-[0_4px_15px_rgba(156,223,59,0.3)]">
      {loading ? "Authenticating..." : text}
      {!loading && (
        <ArrowRightOutlined className="text-sm opacity-80 group-hover:translate-x-1 transition-transform duration-300" />
      )}
    </div>
  </button>
);

const LogoPulse = () => (
  <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-b from-[#82C21C]/10 to-transparent border border-[#82C21C]/30 flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(130,194,28,0.15)] group-hover:border-[#82C21C]/50 transition-colors duration-500">
    <div className="absolute inset-0 rounded-2xl bg-[#82C21C]/5 animate-ping opacity-20" style={{ animationDuration: '3s' }} />
    <div className="relative w-3 h-3 rounded-full bg-[#82C21C] shadow-[0_0_12px_rgba(130,194,28,1)]" />
  </div>
);

const LoginCard = ({ children }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    className="w-full max-w-[420px] rounded-[28px] relative group"
  >
    {/* Main Glassmorphic Card Container */}
    <div className="relative z-10 w-full p-10 overflow-hidden rounded-[28px] bg-[#001715]/30 backdrop-blur-2xl border border-white/5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8),0_0_40px_-10px_rgba(130,194,28,0.1)]">
      
      {/* Inner Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-transparent pointer-events-none" />
      
      {/* Soft Border Glow (Green tint on top edge) */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#82C21C]/40 to-transparent opacity-50 pointer-events-none" />

      {children}
    </div>
  </motion.div>
);

// --- MAIN FORM LOGIC ---

const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authenticate(email, password);
      if (res.success) {
        login();
        message.success("Login successful");
        router.push("/dashboard");
      } else {
        message.error(res.error || "Invalid credentials");
        setLoading(false);
      }
    } catch (err) {
      message.error("Authentication failed");
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center px-6">
      <LoginCard>
        <div className="relative z-10 flex flex-col">
          <div className="mb-10 text-center flex flex-col items-center">
            <LogoPulse />
            
            <h2 className="text-[28px] font-bold text-white tracking-wide mb-2 font-sans drop-shadow-[0_0_10px_rgba(130,194,28,0.2)]">
              ClickRM
            </h2>
            <p className="text-[#8C947D]/70 text-sm tracking-wide font-medium">
              Sign in to your workspace
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <InputField 
              label="Work Email"
              type="email"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              placeholder="name@company.com"
              required
            />

            <InputField 
              label="Password"
              type="password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              extraLabel={
                <a href="#" className="text-[11px] text-[#8C947D]/80 hover:text-[#CDE8E4] transition-colors font-medium">
                  Forgot password?
                </a>
              }
            />

            <SubmitButton loading={loading} text="Access Dashboard" />
          </form>

          <div className="mt-8 text-center">
            <p className="text-[#8C947D]/60 text-[13px] font-medium">
              Don't have an account?{" "}
              <a href="#" className="text-[#82C21C] hover:text-[#9CDF3B] hover:drop-shadow-[0_0_8px_rgba(130,194,28,0.5)] transition-all duration-300 ml-1">
                Contact Admin
              </a>
            </p>
          </div>
        </div>
      </LoginCard>
    </div>
  );
};

export default LoginForm;
