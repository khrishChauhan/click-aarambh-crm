"use client";

import React from "react";
import { Tag } from "antd";

interface StatusTagProps {
  status: string;
}

const statusStyles: Record<string, { color: string }> = {
  New: { color: "#3B82F6" },
  Contacted: { color: "#F59E0B" },
  Interested: { color: "#8B5CF6" },
  Converted: { color: "#82C21C" },
  Lost: { color: "#EF4444" },
  "Follow Up": { color: "#2DD4BF" },
};

const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
  const style = statusStyles[status] || { color: "#9BA7A3" };
  return (
    <span 
      style={{ 
        background: `${style.color}15`,
        color: style.color,
        border: `1px solid ${style.color}30`,
        padding: "2px 10px",
        borderRadius: "10px", 
        fontWeight: 600,
        fontSize: "11px",
        display: "inline-block",
      }}
    >
      {status}
    </span>
  );
};

export default StatusTag;


