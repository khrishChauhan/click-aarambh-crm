"use client";

import React from "react";
import { Drawer, Typography, Space, Button, Popconfirm } from "antd";
import { DeleteOutlined, CloseOutlined } from "@ant-design/icons";
import LeadForm from "./LeadForm";


const { Title } = Typography;

interface LeadDrawerProps {
  visible: boolean;
  onClose: () => void;
  lead: { _id: string; [key: string]: any } | null;
  onSuccess: () => void;
  onDelete: (id: string) => void;
}


const LeadDrawer: React.FC<LeadDrawerProps> = ({ 
  visible, 
  onClose, 
  lead, 
  onSuccess,
  onDelete
}) => {


  return (
    <Drawer
      title={
        <Space size={12}>
          <Title level={4} style={{ margin: 0, color: "#FFFFFF" }}>
            {lead ? "Edit Lead Details" : "Lead Details"}
          </Title>
        </Space>
      }
      placement="right"
      onClose={onClose}
      open={visible}
      width={typeof window !== 'undefined' && window.innerWidth < 768 ? "100%" : 560}
      styles={{ 
        body: { 
          padding: "24px",
          background: "rgba(17, 28, 24, 0.6)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        },
        header: { 
          background: "rgba(17, 28, 24, 0.7)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          padding: "20px 24px"
        },
        content: {
          background: "transparent",
          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
        }
      }}

      extra={
        <Space>
           {lead && (
             <Popconfirm
                title="Delete this lead?"
                description="This action cannot be undone."
                onConfirm={() => onDelete(lead._id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="text" danger icon={<DeleteOutlined />} />
              </Popconfirm>
           )}
           <Button type="text" icon={<CloseOutlined />} onClick={onClose} />
        </Space>
      }
      closable={false}
      destroyOnClose
    >
      {lead && (
        <LeadForm 
          isEdit={true} 
          initialValues={lead} 
          onSuccess={onSuccess} 
          onCancel={onClose} 
        />
      )}
    </Drawer>
  );
};

export default LeadDrawer;
