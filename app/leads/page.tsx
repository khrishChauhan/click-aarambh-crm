"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  Tag,
  Button,
  Drawer,
  Form,
  Input,
  Select,
  DatePicker,
  Space,
  Typography,
  Card,
} from "antd";
import { useTheme } from "@/components/ThemeProvider";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export default function Leads() {
  const { isDarkMode } = useTheme();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [form] = Form.useForm();

  const statuses: Record<string, string> = {
    New: "blue",
    Contacted: "orange",
    Interested: "green",
    Lost: "red",
  };

  const dummyData = [
    {
      key: "1",
      name: "John Doe",
      phone: "+1 234-567-8901",
      email: "john@example.com",
      status: "New",
      source: "Website",
      city: "New York",
      createdAt: "2023-10-25",
    },
    {
      key: "2",
      name: "Jane Smith",
      phone: "+1 987-654-3210",
      email: "jane@example.com",
      status: "Interested",
      source: "Referral",
      city: "London",
      createdAt: "2023-10-24",
    },
    {
      key: "3",
      name: "Mike Johnson",
      phone: "+1 555-123-4567",
      email: "mike@example.com",
      status: "Contacted",
      source: "Campaign A",
      city: "Chicago",
      createdAt: "2023-10-23",
    },
    {
      key: "4",
      name: "Emily Davis",
      phone: "+1 555-987-6543",
      email: "emily@example.com",
      status: "Lost",
      source: "Cold Call",
      city: "Los Angeles",
      createdAt: "2023-10-22",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <span className="font-medium cursor-pointer text-[#82C21C] hover:underline">
          {text}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status: string) => (
        <Tag color={statuses[status] || "default"}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Actions",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            type="primary"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              openDrawer(record);
            }}
            style={{ backgroundColor: "#82C21C", borderColor: "#82C21C" }}
          >
            Details
          </Button>
        </Space>
      ),
    },
  ];

  const openDrawer = (record: any) => {
    setSelectedLead(record);
    form.setFieldsValue({
      ...record,
      salesAssigned: "Admin User",
      revenue: "$0.00",
    });
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedLead(null);
  };

  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="flex justify-between items-center mb-6">
        <Title level={2} style={{ margin: 0, color: isDarkMode ? "#E6F0ED" : "#1F2937" }}>
          Leads Management
        </Title>
        <Button
          type="primary"
          style={{ backgroundColor: "#82C21C", borderColor: "#82C21C", height: 40, padding: '0 24px', fontWeight: 600, borderRadius: 8 }}
        >
          Add New Lead
        </Button>
      </div>

      <Card
        bordered={false}
        style={{
          borderRadius: 12,
          background: isDarkMode ? "#111C18" : "#FFFFFF",
          boxShadow: isDarkMode ? "none" : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        }}
        styles={{ body: { padding: 0 } }}
      >
        <Table
          columns={columns}
          dataSource={dummyData}
          onRow={(record) => {
            return {
              onClick: () => {
                openDrawer(record);
              },
              className: "cursor-pointer transition-colors duration-200",
            };
          }}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 'max-content' }}
          className="custom-table"
        />
      </Card>

      <Drawer
        title={<span style={{ fontSize: 20 }}>Lead Details</span>}
        width={isMobile ? "100%" : 500}
        onClose={closeDrawer}
        open={drawerVisible}
        styles={{ 
          body: { paddingBottom: 80 },
          header: {
            borderBottom: `1px solid ${isDarkMode ? "#1E2B27" : "#E5E7EB"}`,
            padding: "16px 24px",
          }
        }}
      >
        {selectedLead && (
          <Form form={form} layout="vertical" className="space-y-4">
            <Form.Item label="Name" name="name">
              <Input size="large" />
            </Form.Item>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item label="Phone" name="phone" className="m-0">
                <Input size="large" />
              </Form.Item>
              <Form.Item label="Email" name="email" className="m-0">
                <Input size="large" />
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item label="Lead Status" name="status" className="m-0">
                <Select size="large">
                  <Option value="New">New</Option>
                  <Option value="Contacted">Contacted</Option>
                  <Option value="Interested">Interested</Option>
                  <Option value="Lost">Lost</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Sales Assigned" name="salesAssigned" className="m-0">
                <Input size="large" />
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item label="Source" name="source" className="m-0">
                <Input size="large" />
              </Form.Item>
              <Form.Item label="City" name="city" className="m-0">
                <Input size="large" />
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item label="Next Follow-up" name="nextFollowUp" className="m-0">
                <DatePicker size="large" style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item label="Revenue Potential" name="revenue" className="m-0">
                <Input size="large" />
              </Form.Item>
            </div>
            
            <Form.Item label="Campaign" name="campaign">
              <Input size="large" />
            </Form.Item>

            <Form.Item label="Notes" name="notes">
              <TextArea rows={4} size="large" placeholder="Add lead specific notes here..." />
            </Form.Item>
          </Form>
        )}
        
        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            borderTop: `1px solid ${isDarkMode ? "#1E2B27" : "#E5E7EB"}`,
            padding: "16px 24px",
            textAlign: "right",
            left: 0,
            background: isDarkMode ? "#111C18" : "#FFFFFF",
            display: "flex",
            justifyContent: isMobile ? "space-between" : "flex-end",
            gap: "12px",
            flexWrap: isMobile ? "wrap" : "nowrap",
          }}
          className="z-10"
        >
          <Button size="large" danger style={{ flex: isMobile ? "1 1 45%" : "none" }}>Delete</Button>
          <Button size="large" style={{ flex: isMobile ? "1 1 45%" : "none", color: "#82C21C", borderColor: "#82C21C" }}>
            Mark Converted
          </Button>
          <Button size="large" type="primary" onClick={closeDrawer} style={{ backgroundColor: "#82C21C", borderColor: "#82C21C", flex: isMobile ? "1 1 100%" : "none" }}>
            Save Changes
          </Button>
        </div>
      </Drawer>
    </div>
  );
}