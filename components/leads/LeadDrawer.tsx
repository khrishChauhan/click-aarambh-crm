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
          background: "#111C18",
        },
        header: { 
          background: "#15221E",
          borderBottom: "1px solid #1E2B27",
          padding: "20px 24px"
        },
        content: {
          background: "#111C18",
          borderLeft: "1px solid #1E2B27",
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
                <Button 
                  type="text" 
                  danger 
                  icon={<DeleteOutlined />} 
                  className="neumorphic-button"
                  style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}
                />
              </Popconfirm>
           )}
           <Button 
            type="text" 
            icon={<CloseOutlined />} 
            onClick={onClose} 
            className="neumorphic-button"
            style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", color: "#E6F0ED" }}
          />


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
