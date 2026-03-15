"use client";

import React, { useState } from "react";
import { Form, Input, Button, message, Select } from "antd";
import axios from "axios";

interface LeadFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const { Option } = Select;

const LeadForm: React.FC<LeadFormProps> = ({ onSuccess, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: Record<string, any>) => {
    setLoading(true);
    try {
      await axios.post("/api/leads", values);
      message.success("Lead added successfully!");
      form.resetFields();
      onSuccess();
    } catch (error: any) {
      console.error("Error adding lead:", error);
      message.error(error.response?.data?.error || "Failed to add lead");
    } finally {
      setLoading(false);
    }
  };


  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ status: "New" }}
      style={{ display: "flex", flexDirection: "column"}}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input the name!" }]}
      >
        <Input placeholder="Enter lead name" />
      </Form.Item>

      <Form.Item
        label="Phone"
        name="phone"
        rules={[{ required: true, message: "Please input the phone number!" }]}
      >
        <Input placeholder="Enter phone number" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ type: "email", message: "Please enter a valid email!" }]}
      >
        <Input placeholder="Enter email" />
      </Form.Item>

      <Form.Item label="Source" name="source">
        <Select placeholder="Select source">
          <Option value="Meta Ads">Meta Ads</Option>
          <Option value="Google Ads">Google Ads</Option>
          <Option value="Direct">Direct</Option>
          <Option value="Referral">Referral</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Campaign" name="campaign">
        <Input placeholder="Enter campaign name" />
      </Form.Item>

      <Form.Item label="City" name="city">
        <Input placeholder="Enter city" />
      </Form.Item>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          Add Lead
        </Button>
      </div>
    </Form>
  );
};

export default LeadForm;
