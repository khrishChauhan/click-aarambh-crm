"use client";

import React from "react";
import { List, Avatar, Typography, Space } from "antd";
import SectionCard from "../common/SectionCard";
import StatusTag from "../common/StatusTag";

const { Text } = Typography;

const recentLeads = [
  { id: 1, name: "Rahul Sharma", source: "Meta Ads", status: "New", time: "2 mins ago" },
  { id: 2, name: "Anita Desai", source: "Google Ads", status: "Contacted", time: "15 mins ago" },
  { id: 3, name: "John Doe", source: "Website", status: "Interested", time: "1 hour ago" },
  { id: 4, name: "Priya Singh", source: "Referral", status: "Follow Up", time: "3 hours ago" },
  { id: 5, name: "Mark Miller", source: "Meta Ads", status: "New", time: "5 hours ago" },
];

const RecentLeads: React.FC = () => {
  return (
    <SectionCard title="Recent Leads Activity">
      <List
        dataSource={recentLeads}
        renderItem={(item) => (
          <List.Item style={{ borderBottom: "1px solid #1E2B27", cursor: "pointer" }} className="hover:bg-white/5 transition-colors px-2 rounded-lg">
            <List.Item.Meta
              avatar={
                <div className="w-10 h-10 flex items-center justify-center mr-3 neumorphic-logo">
                   <span className="text-[#82C21C] font-bold text-sm">
                     {item.name.split(' ').map(n => n[0]).join('')}
                   </span>
                </div>

              }
              title={
                <div className="flex justify-between items-center">
                  <Text strong style={{ color: "#E6F0ED" }}>{item.name}</Text>
                  <Text type="secondary" style={{ fontSize: "12px", color: "#9BA7A3" }}>{item.time}</Text>
                </div>
              }
              description={
                <div className="flex justify-between items-center mt-1">
                  <Text style={{ fontSize: "13px", color: "#9BA7A3" }}>{item.source}</Text>
                  <StatusTag status={item.status} />
                </div>
              }
            />
          </List.Item>
        )}
      />
    </SectionCard>
  );
};


export default RecentLeads;
