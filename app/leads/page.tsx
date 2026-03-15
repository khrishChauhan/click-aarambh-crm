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
  Modal,
  message,
  Popconfirm,
} from "antd";
import { useTheme } from "@/components/ThemeProvider";
import LeadForm from "@/components/LeadForm";
import axios from "axios";
import dayjs from "dayjs";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface ILead {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  status: string;
  source?: string;
  city?: string;
  revenue?: number;
  notes?: string;
  campaign?: string;
  nextFollowUp?: string | Date;
  createdAt: string;
}

export default function Leads() {
  const { isDarkMode } = useTheme();
  const [leads, setLeads] = useState<ILead[]>([]);
  const [loading, setLoading] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLead, setSelectedLead] = useState<ILead | null>(null);
  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    fetchLeads();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/leads");
      setLeads(response.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
      message.error("Failed to load leads");
    } finally {
      setLoading(false);
    }
  };

  const [form] = Form.useForm();

  const statusColors: Record<string, string> = {
    New: "blue",
    Contacted: "orange",
    Interested: "green",
    Lost: "red",
  };

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
        <Tag color={statusColors[status] || "default"}>{(status || "New").toUpperCase()}</Tag>
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
      render: (date: string) => (date ? dayjs(date).format("YYYY-MM-DD") : "-"),
    },
    {
      title: "Actions",
      key: "action",
      render: (_: unknown, record: ILead) => (
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

  const openDrawer = (record: ILead) => {
    setSelectedLead(record);
    form.setFieldsValue({
      ...record,
      nextFollowUp: record.nextFollowUp ? dayjs(record.nextFollowUp) : null,
    });
    setDrawerVisible(true);
  };


  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedLead(null);
  };

  const handleUpdate = async () => {
    if (!selectedLead) return;
    try {
      const values = await form.validateFields();
      await axios.patch(`/api/leads/${selectedLead._id}`, values);
      message.success("Lead updated successfully!");
      closeDrawer();
      fetchLeads();
    } catch (error) {
      console.error("Update error:", error);
      message.error("Failed to update lead");
    }
  };

  const handleDelete = async () => {
    if (!selectedLead) return;
    try {
      await axios.delete(`/api/leads/${selectedLead._id}`);
      message.success("Lead deleted successfully!");
      closeDrawer();
      fetchLeads();
    } catch (error) {
      console.error("Delete error:", error);
      message.error("Failed to delete lead");
    }
  };


  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="flex justify-between items-center mb-6">
        <Title level={2} style={{ margin: 0, color: isDarkMode ? "#E6F0ED" : "#1F2937" }}>
          Leads Management
        </Title>
        <Button
          type="primary"
          onClick={() => setModalVisible(true)}
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
          dataSource={leads}
          rowKey="_id"
          loading={loading}
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

      <Modal
        title="Add New Lead"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <LeadForm 
          onSuccess={() => {
            setModalVisible(false);
            fetchLeads();
          }} 
          onCancel={() => setModalVisible(false)} 
        />
      </Modal>

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
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
              <Input size="large" />
            </Form.Item>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item label="Phone" name="phone" className="m-0" rules={[{ required: true }]}>
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
              <Form.Item label="Revenue Potential" name="revenue" className="m-0">
                <Input size="large" type="number" />
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item label="Source" name="source" className="m-0">
                <Select size="large">
                  <Option value="Meta Ads">Meta Ads</Option>
                  <Option value="Google Ads">Google Ads</Option>
                  <Option value="Direct">Direct</Option>
                  <Option value="Referral">Referral</Option>
                </Select>
              </Form.Item>
              <Form.Item label="City" name="city" className="m-0">
                <Input size="large" />
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item label="Next Follow-up" name="nextFollowUp" className="m-0">
                <DatePicker size="large" style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item label="Campaign" name="campaign" className="m-0">
                <Input size="large" />
              </Form.Item>
            </div>

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
          <Popconfirm
            title="Are you sure you want to delete this lead?"
            onConfirm={handleDelete}
            okText="Yes"
            cancelText="No"
          >
            <Button size="large" danger style={{ flex: isMobile ? "1 1 45%" : "none" }}>Delete</Button>
          </Popconfirm>
          
          <Button size="large" type="primary" onClick={handleUpdate} style={{ backgroundColor: "#82C21C", borderColor: "#82C21C", flex: isMobile ? "1 1 100%" : "none" }}>
            Save Changes
          </Button>
        </div>
      </Drawer>
    </div>
  );
}
