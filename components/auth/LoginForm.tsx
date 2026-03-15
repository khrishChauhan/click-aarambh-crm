"use client";

import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { UserOutlined, LockOutlined, AimOutlined } from "@ant-design/icons";

import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";

const { Title, Text } = Typography;

import { motion, useMotionValue, useMotionTemplate, useSpring, useTransform } from "framer-motion";

const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Mouse position for Spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 3D Tilt Values
  const rotateX = useSpring(useTransform(mouseY, [0, 400], [5, -5]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 400], [ -5, 5]), { stiffness: 150, damping: 20 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(200); // Reset to center
    mouseY.set(200);
  }


  const onFinish = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      if (values.username === "admin" && values.password === "123456") {
        login();
        message.success("Login successful! Redirecting...");
        router.push("/dashboard");
      } else {
        message.error("Invalid username or password");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="perspective-1000 w-full max-w-[400px]">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative w-full rounded-[14px] border border-[#1E2B27] bg-[#111C18] p-10 shadow-[0_10px_30px_rgba(0,0,0,0.35)] overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:border-transparent"

      >

      {/* Border Spotlight Gradient Layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[14px] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              #82C21C,
              transparent 80%
            )
          `,
        }}
      />

      {/* Surface Spotlight Gradient Layer */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[14px] bg-[#111C18] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(130, 194, 28, 0.1),
              transparent 80%
            )
          `,
        }}
      />


      <div className="relative z-10">
        <div className="text-center mb-10">
          <Title level={3} style={{ color: "#FFFFFF", margin: 0, fontWeight: 700 }}>
            Welcome Back
          </Title>
          <Text style={{ color: "#9BA7A3", fontSize: "15px" }}>
            Login to manage your CRM dashboard
          </Text>
        </div>

        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input 
              prefix={<UserOutlined style={{ color: "#82C21C" }} />} 
              placeholder="Username" 
              style={{ 
                background: "#0A1412", 
                border: "1px solid #1E2B27", 
                color: "#FFFFFF" 
              }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "#82C21C" }} />}
              placeholder="Password"
              style={{ 
                background: "#0A1412", 
                border: "1px solid #1E2B27", 
                color: "#FFFFFF" 
              }}
            />
          </Form.Item>

          <Form.Item className="mt-8">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              className="neumorphic-button-accent"
              style={{ 
                height: "48px",
                fontWeight: 600,
                fontSize: "16px"
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
