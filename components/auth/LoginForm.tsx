"use client";

import React, { useState } from "react";
import { message } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";
import { authenticate } from "@/app/actions/auth";
import { motion } from "framer-motion";

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
    <div className="w-full max-w-[420px] px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full rounded-[24px] bg-[#001715]/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] p-10 relative overflow-hidden group"
      >
        {/* Subtle Ambient Glow inside card */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-[#82C21C]/10 blur-[60px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col">
          <div className="mb-10 text-center flex flex-col items-center">
            {/* Minimal Logo */}
            <div className="w-10 h-10 rounded-xl bg-[#82C21C]/10 border border-[#82C21C]/20 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(130,194,28,0.15)]">
              <div className="w-4 h-4 rounded-full bg-[#82C21C] shadow-[0_0_10px_rgba(130,194,28,0.8)]" />
            </div>
            
            <h2 className="text-2xl font-semibold text-[#CDE8E4] tracking-tight mb-2 font-sans">
              ClickRM
            </h2>
            <p className="text-[#8C947D] text-sm tracking-wide">
              Sign in to your workspace
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] uppercase tracking-wider text-[#8C947D] font-medium ml-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="name@company.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-[#CDE8E4] text-sm placeholder:text-[#8C947D]/50 focus:outline-none focus:border-[#82C21C]/50 focus:ring-1 focus:ring-[#82C21C]/50 transition-all duration-300 shadow-inner"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[11px] uppercase tracking-wider text-[#8C947D] font-medium">
                  Password
                </label>
                <a href="#" className="text-[11px] text-[#8C947D] hover:text-[#CDE8E4] transition-colors">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-[#CDE8E4] text-sm placeholder:text-[#8C947D]/50 focus:outline-none focus:border-[#82C21C]/50 focus:ring-1 focus:ring-[#82C21C]/50 transition-all duration-300 shadow-inner"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full bg-[#82C21C] hover:bg-[#9CDF3B] text-[#001715] font-semibold py-3.5 rounded-xl text-sm transition-all duration-300 active:scale-[0.98] shadow-[0_4px_14px_0_rgba(130,194,28,0.2)] hover:shadow-[0_6px_20px_rgba(130,194,28,0.3)] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {loading ? "Authenticating..." : "Login"}
              {!loading && <ArrowRightOutlined className="text-xs" />}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[#8C947D] text-xs">
              Don't have an account?{" "}
              <a href="#" className="text-[#CDE8E4] hover:text-[#82C21C] transition-colors font-medium">
                Contact Admin
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;
