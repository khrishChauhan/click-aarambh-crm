"use client";

import React from "react";
import { Progress, List, Typography } from "antd";
import SectionCard from "../common/SectionCard";

const { Text } = Typography;

const campaignData = [
  { name: "Summer Sale 2024", count: 425, percentage: 85, color: "#82C21C" },
  { name: "Winter Clearance", count: 210, percentage: 45, color: "#2DD4BF" },
  { name: "Flash Deal #3", count: 185, percentage: 40, color: "#3B82F6" },
  { name: "New Arrival Blast", count: 142, percentage: 32, color: "#8B5CF6" },
];

const CampaignPerformance: React.FC = () => {
  return (
    <SectionCard title="Campaign Performance">
      <List
        dataSource={campaignData}
        renderItem={(item) => (
          <List.Item style={{ borderBottom: "1px solid #1E2B27", padding: "16px 0" }}>
            <div className="w-full">
              <div className="flex justify-between items-center mb-2">
                <Text strong style={{ color: "#FFFFFF" }}>{item.name}</Text>
                <Text style={{ color: "#E6F0ED" }}>{item.count} leads</Text>
              </div>
              <Progress 
                percent={item.percentage} 
                strokeColor={item.color} 
                trailColor="#0E1614"
                showInfo={false} 
                size="small"
              />
            </div>
          </List.Item>
        )}
      />
    </SectionCard>
  );
};

export default CampaignPerformance;

