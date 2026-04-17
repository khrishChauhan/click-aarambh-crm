"use client";

import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { UserOutlined, LockOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";
import { authenticate } from "@/app/actions/auth";
import { motion } from "framer-motion";

const { Title, Text } = Typography;

const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await authenticate(values.email, values.password);
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
    <div className="w-full max-w-[440px] px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full rounded-[24px] bg-[#051F1D]/80 backdrop-blur-2xl p-10 md:p-14 relative group"
      >
        {/* Subtle Ambient Glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-b from-[#82C21C]/20 to-transparent rounded-[24px] opacity-20 group-hover:opacity-30 transition-opacity duration-500 blur-sm" />
        
        <div className="relative z-10">
          <div className="mb-12">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#82C21C]/10 mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-[#82C21C] animate-pulse" />
            </motion.div>
            
            <Title 
              level={2} 
              style={{ 
                color: "#FFFFFF", 
                margin: 0, 
                fontWeight: 600, 
                fontSize: "32px", 
                letterSpacing: "-0.03em",
                fontFamily: "var(--font-inter, 'Inter', sans-serif)"
              }}
            >
              Welcome Back
            </Title>
            <Text 
              style={{ 
                color: "#8C947D", 
                fontSize: "16px", 
                display: "block", 
                marginTop: "12px",
                letterSpacing: "-0.01em",
                fontFamily: "var(--font-inter, 'Inter', sans-serif)"
              }}
            >
              Enter your precision access keys
            </Text>
          </div>

          <Form
            name="emerald-login"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            size="large"
            requiredMark={false}
            className="space-y-6"
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Email is required", type: "email" }]}
              className="mb-6"
            >
              <Input 
                placeholder="Email address"
                prefix={<UserOutlined className="text-[#8C947D] mr-3 text-sm" />}
                className="minimal-input"
                style={{
                  background: "#0A2421",
                  border: "none",
                  borderBottom: "1px solid rgba(130, 194, 28, 0.1)",
                  borderRadius: "0",
                  color: "#FFFFFF",
                  padding: "16px 0",
                  fontSize: "15px",
                  boxShadow: "none"
                }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Password is required" }]}
              className="mb-10"
            >
              <Input.Password
                placeholder="Password"
                prefix={<LockOutlined className="text-[#8C947D] mr-3 text-sm" />}
                className="minimal-input"
                style={{
                  background: "#0A2421",
                  border: "none",
                  borderBottom: "1px solid rgba(130, 194, 28, 0.1)",
                  borderRadius: "0",
                  color: "#FFFFFF",
                  padding: "16px 0",
                  fontSize: "15px",
                  boxShadow: "none"
                }}
              />
            </Form.Item>

            <Form.Item className="m-0">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                className="emerald-button group/btn"
                style={{ 
                  height: "60px",
                  background: "#82C21C",
                  border: "none",
                  borderRadius: "16px",
                  fontWeight: 600,
                  fontSize: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  boxShadow: "0 10px 30px -10px rgba(130, 194, 28, 0.4)",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                }}
              >
                <span>Access Dashboard</span>
                <ArrowRightOutlined className="text-lg group-hover/btn:translate-x-1 transition-transform duration-300" />
              </Button>
            </Form.Item>
          </Form>

          <div className="mt-10 text-center">
            <Text 
              style={{ 
                color: "#8C947D", 
                fontSize: "14px",
                cursor: "pointer"
              }}
              className="hover:text-[#9CDF3B] transition-colors duration-300"
            >
              Request Access
            </Text>
          </div>
        </div>
      </motion.div>

      <style jsx global>{`
        .minimal-input:focus, .minimal-input-focused {
          border-bottom-color: #82C21C !important;
          background: transparent !important;
        }
        .minimal-input::placeholder {
          color: rgba(140, 148, 125, 0.4) !important;
        }
        .emerald-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px -10px rgba(130, 194, 28, 0.6) !important;
          background: #9CDF3B !important;
        }
        .emerald-button:active {
          transform: translateY(0);
        }
        /* Custom styles for antd input to remove background */
        .ant-input-affix-wrapper {
          background-color: transparent !important;
        }
        .ant-input {
          background-color: transparent !important;
        }
      `}</style>
    </div>
  );
};

export default LoginForm;

