"use client";

import React from "react";
import { Table, Button, Space, Typography, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import StatusTag from "../common/StatusTag";

const { Text } = Typography;

interface ILead {
  _id: string;
  name: string;
  phone: string;
  status: string;
  source: string;
  city: string;
  createdAt: string;
}

interface LeadTableProps {
  data: ILead[];
  loading: boolean;
  onEdit: (record: ILead) => void;
}


const LeadTable: React.FC<LeadTableProps> = ({ 
  data, 
  loading, 
  onEdit 
}) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => ( // Removed record: ILead as it's not used

        <Space size={12}>
          <div 
            className="w-8 h-8 rounded-full bg-[#82C21C]/10 flex items-center justify-center text-[#82C21C] font-bold text-xs"
          >
            {text[0]}
          </div>
          <Text strong style={{ color: "#FFFFFF" }}>{text}</Text>
        </Space>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (text: string) => <Text style={{ color: "#E6F0ED" }}>{text}</Text>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => <StatusTag status={status || "New"} />,
    },
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
      render: (text: string) => (
        <Tag style={{ borderRadius: "10px", border: "none" }}>{text}</Tag>
      ),
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      render: (text: string) => <Text style={{ color: "#E6F0ED" }}>{text}</Text>,
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => (
        <Text style={{ color: "#E6F0ED" }}>
          {dayjs(date).format("MMM DD, YYYY")}
        </Text>
      ),
    },
    {
      title: "Actions",
      key: "action",
      align: "right" as const,
      render: (_: unknown, record: ILead) => (
        <Tooltip title="Edit">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={(e) => { e.stopPropagation(); onEdit(record); }}
            style={{ color: "#82C21C", fontSize: "18px" }}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey="_id"
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        style: { marginTop: "24px" },
      }}
      scroll={{ x: "max-content" }}
      className="premium-table"
    />
  );
};

interface TagProps {
  children: React.ReactNode;
  // color?: string; // Removed color prop
  style?: React.CSSProperties;
}

const Tag = ({ children, style }: TagProps) => {

  // const { isDarkMode } = useTheme(); // Removed useTheme hook
  return (
    <span 
      style={{
        padding: "2px 10px",
        borderRadius: "10px",
        fontSize: "12px",
        background: "rgba(130, 194, 28, 0.15)",
        color: "#82C21C",
        fontWeight: 600,
        ...style
      }}
    >
      {children}
    </span>
  );
};

export default LeadTable;
