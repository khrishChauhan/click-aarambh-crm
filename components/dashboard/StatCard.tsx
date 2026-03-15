"use client";

import React from "react";
import { Typography, Space } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import SectionCard from "../common/SectionCard";

const { Text, Title } = Typography;


interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, trendUp }) => {
  return (
    <SectionCard className="h-full">
      <div className="flex justify-between items-start mb-6">
        <div 
          className="p-3 rounded-xl flex items-center justify-center"
          style={{ 
            background: "#0E2B27",
            border: "1px solid #1E2B27"
          }}
        >

          {React.isValidElement(icon) ? (
            React.cloneElement(icon as React.ReactElement<any>, { 
              style: { fontSize: "20px", color: "#82C21C" } 
            })
          ) : (
            icon
          )}
        </div>
      </div>

      <Space direction="vertical" size={4} className="w-full">
        <Text style={{ color: "#9BA7A3", fontSize: "14px", fontWeight: 500 }}>
          {title}
        </Text>
        <div className="flex items-end justify-between">
          <Title level={3} style={{ margin: 0, fontWeight: 700, color: "#FFFFFF" }}>
            {value}
          </Title>
          
          {trend && (
            <div 
              className="flex items-center px-2 py-1 rounded-md text-xs font-semibold"
              style={{ 
                color: trendUp ? "#82C21C" : "#FF4D4F",
                background: trendUp ? "rgba(130, 194, 28, 0.1)" : "rgba(255, 77, 79, 0.1)",
                border: trendUp ? "1px solid rgba(130, 194, 28, 0.15)" : "1px solid rgba(255, 77, 79, 0.15)"
              }}
            >
              {trendUp ? <ArrowUpOutlined className="mr-1" /> : <ArrowDownOutlined className="mr-1" />}
              {trend}
            </div>
          )}
        </div>
      </Space>


    </SectionCard>
  );
};


export default StatCard;
