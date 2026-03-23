"use client";

import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { UserOutlined, LockOutlined, ChromeOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";
import { motion } from "framer-motion";

const { Title, Text } = Typography;

const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      // For demo purposes:
      if (values.username === "admin" && values.password === "123456") {
        login();
        message.success("Login successful! Redirecting...");
        router.push("/dashboard");
      } else {
        message.error("Invalid username or password");
        setLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="w-full max-w-[420px] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
      >
        {/* Subtle top accent gradient */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#82C21C]/50 to-transparent" />

        <div className="relative z-10">
          <div className="text-center mb-10">
             <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#82C21C]/10 border border-[#82C21C]/20 mb-6 transition-all duration-300">
               <ChromeOutlined className="text-2xl text-[#82C21C]" />
             </div>
            <Title level={3} style={{ color: "#FFFFFF", margin: 0, fontWeight: 700, fontSize: "28px", letterSpacing: "-0.5px" }}>
              Welcome back
            </Title>
            <Text style={{ color: "rgba(255, 255, 255, 0.45)", fontSize: "15px", display: "block", marginTop: "8px" }}>
              Please enter your details to sign in
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
              name="username"
              rules={[{ required: true, message: "Please input your username!" }]}
              className="mb-5"
            >
              <Input 
                prefix={<UserOutlined className="text-white/20 mr-2" />} 
                placeholder="Username or Email" 
                style={{ 
                  background: "rgba(255, 255, 255, 0.03)", 
                  border: "1px solid rgba(255, 255, 255, 0.08)", 
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
                style={{ 
                  background: "rgba(255, 255, 255, 0.03)", 
                  border: "1px solid rgba(255, 255, 255, 0.08)", 
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
                className="bg-[#82C21C] hover:bg-[#92D22C] border-none flex items-center justify-center"
                style={{ 
                  height: "54px",
                  borderRadius: "12px",
                  fontWeight: 600,
                  fontSize: "16px",
                  boxShadow: "0 10px 20px -5px rgba(130, 194, 28, 0.3)"
                }}
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;
