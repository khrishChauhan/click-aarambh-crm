"use client";

import React from "react";
import { Tag } from "antd";

interface StatusTagProps {
  status: string;
}

const statusStyles: Record<string, { bg: string, color: string }> = {
  New: { bg: "#3B82F6", color: "#FFFFFF" },
  Contacted: { bg: "#F59E0B", color: "#FFFFFF" },
  Interested: { bg: "#8B5CF6", color: "#FFFFFF" },
  Converted: { bg: "#82C21C", color: "#FFFFFF" },
  Lost: { bg: "#EF4444", color: "#FFFFFF" },
  "Follow Up": { bg: "#2DD4BF", color: "#FFFFFF" },
};

const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
  const style = statusStyles[status] || { bg: "#4B5563", color: "#FFFFFF" };
  return (
    <span 
      style={{ 
        background: style.bg,
        color: style.color,
        padding: "2px 8px",
        borderRadius: "4px", 
        fontWeight: 700,
        textTransform: "uppercase",
        fontSize: "10px",
        display: "inline-block",
        letterSpacing: "0.5px"
      }}
    >
      {status}
    </span>
  );
};


export default StatusTag;
