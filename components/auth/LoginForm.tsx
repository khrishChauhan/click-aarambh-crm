"use client";

import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";

const { Title, Text } = Typography;

const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = (values: any) => {
    setLoading(true);
    // Hardcoded check
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
    <Card
      style={{
        width: "100%",
        maxWidth: 400,
        borderRadius: "16px",
        background: "rgba(17, 28, 24, 0.6)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
      }}
      styles={{ body: { padding: "40px" } }}
    >

      <div className="text-center mb-10">
        <div 
          className="w-12 h-12 rounded-xl bg-[#82C21C] flex items-center justify-center mx-auto mb-4"
          style={{ boxShadow: "0 0 20px rgba(130, 194, 28, 0.4)" }}
        >
          <span className="text-white font-bold text-xl">A</span>
        </div>
        <Title level={3} style={{ color: "#FFFFFF", margin: 0, fontWeight: 800 }}>
          Welcome Back
        </Title>
        <Text style={{ color: "#E6F0ED", fontSize: "15px", opacity: 0.9 }}>
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
              background: "#050505", 
              border: "1px solid #222222", 
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
              background: "#050505", 
              border: "1px solid #222222", 
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
            style={{ 
              backgroundColor: "#82C21C", 
              borderColor: "#82C21C", 
              height: "48px",
              fontWeight: 600,
              fontSize: "16px"
            }}
            className="hover:opacity-90 transition-opacity"
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginForm;
