"use client";

import React, { useState } from "react";
import { Form, Input, Button, message, Select, DatePicker, Row, Col } from "antd";
import axios from "axios";
import { useTheme } from "../ThemeProvider";

interface LeadFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  initialValues?: { _id?: string; [key: string]: any };
  isEdit?: boolean;
}


const { Option } = Select;
const { TextArea } = Input;

const LeadForm: React.FC<LeadFormProps> = ({ onSuccess, onCancel, initialValues, isEdit }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { isDarkMode } = useTheme();

  const onFinish = async (values: Record<string, any>) => {

    setLoading(true);
    try {
      if (isEdit && initialValues?._id) {
        await axios.patch(`/api/leads/${initialValues._id}`, values);
        message.success("Lead updated successfully!");
      } else {

        await axios.post("/api/leads", values);
        message.success("Lead added successfully!");
      }
      onSuccess();
    } catch (error: any) {
      console.error("Error saving lead:", error);
      message.error(error.response?.data?.error || "Failed to save lead");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={initialValues || { status: "New" }}
      className="premium-form"
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input placeholder="e.g. Rahul Sharma" size="large" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Please input the phone number!" }]}
          >
            <Input placeholder="+91 98765 43210" size="large" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ type: "email", message: "Please enter a valid email!" }]}
          >
            <Input placeholder="example@email.com" size="large" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item label="Source" name="source">
            <Select placeholder="Select source" size="large">
              <Option value="Meta Ads">Meta Ads</Option>
              <Option value="Google Ads">Google Ads</Option>
              <Option value="Website">Website</Option>
              <Option value="Referral">Referral</Option>
              <Option value="Direct">Direct</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item label="Status" name="status">
            <Select placeholder="Set status" size="large">
              <Option value="New">New</Option>
              <Option value="Contacted">Contacted</Option>
              <Option value="Interested">Interested</Option>
              <Option value="Converted">Converted</Option>
              <Option value="Lost">Lost</Option>
              <Option value="Follow Up">Follow Up</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item label="Campaign" name="campaign">
            <Input placeholder="e.g. Summer_Sale_2024" size="large" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item label="City" name="city">
            <Input placeholder="e.g. Mumbai" size="large" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="Notes" name="notes">
            <TextArea rows={3} placeholder="Add any specific details here..." size="large" />
          </Form.Item>
        </Col>
      </Row>

      <div 
        className="flex justify-end gap-3 mt-4 pt-6"
        style={{ borderTop: `1px solid ${isDarkMode ? "#1E2B27" : "#F3F4F6"}` }}
      >
        <Button onClick={onCancel} size="large">
          Cancel
        </Button>
        <Button 
          type="primary" 
          htmlType="submit" 
          loading={loading} 
          size="large"
          style={{ backgroundColor: "#82C21C", borderColor: "#82C21C" }}
          className="hover:opacity-90 transition-opacity"
        >
          {isEdit ? "Update Lead" : "Add Lead"}
        </Button>
      </div>
    </Form>
  );
};

export default LeadForm;
