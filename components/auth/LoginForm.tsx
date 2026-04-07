"use client";

import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { UserOutlined, LockOutlined, ChromeOutlined } from "@ant-design/icons";
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
        message.success("Login successful! Redirecting...");
        router.push("/dashboard");
      } else {
        message.error(res.error || "Invalid email or password");
        setLoading(false);
      }
    } catch (err) {
      message.error("Failed to authenticate. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[420px] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full rounded-2xl border border-[#1E2B27] bg-[#0B2522] bg-opacity-60 backdrop-blur-xl p-8 md:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative overflow-hidden"
      >
        {/* Subtle top accent gradient */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#82C21C]/50 to-transparent" />

        <div className="relative z-10">
          <div className="text-center mb-10">
             <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#82C21C]/10 border border-[#82C21C]/20 mb-6 transition-all duration-300">
               <UserOutlined className="text-2xl text-[#82C21C]" />
             </div>
            <Title level={3} style={{ color: "#FFFFFF", margin: 0, fontWeight: 700, fontSize: "28px", letterSpacing: "-0.5px" }}>
              Welcome Back
            </Title>
            <Text style={{ color: "rgba(255, 255, 255, 0.45)", fontSize: "15px", display: "block", marginTop: "8px" }}>
              Login to access your dashboard
            </Text>
          </div>

          <Form
            name="professional-login"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            size="large"
            requiredMark={false}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!", type: "email" }]}
              className="mb-5"
            >
              <Input 
                type="email"
                prefix={<UserOutlined className="text-white/20 mr-2" />} 
                placeholder="Email address" 
                className="professional-input"
                style={{ 
                  background: "#0E2B28", 
                  border: "1px solid #1E2B27", 
                  borderRadius: "12px",
                  color: "#FFFFFF",
                  padding: "12px 16px"
                }}
              />
            </Form.Item>


            <Form.Item
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
              className="mb-8"
            >
              <Input.Password
                prefix={<LockOutlined className="text-white/20 mr-2" />}
                placeholder="••••••••"
                className="professional-input"
                style={{ 
                  background: "#0E2B28", 
                  border: "1px solid #1E2B27", 
                  borderRadius: "12px",
                  color: "#FFFFFF",
                  padding: "12px 16px"
                }}
              />
            </Form.Item>


            <Form.Item className="m-0">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                className="bg-[#82C21C] hover:bg-[#92D22C] border-none flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(130,194,28,0.4)]"
                style={{ 
                  height: "54px",
                  borderRadius: "12px",
                  fontWeight: 600,
                  fontSize: "16px",
                  boxShadow: "0 10px 20px -5px rgba(130, 194, 28, 0.3)"
                }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>

        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;
