"use client";

import React from "react";
import { Card, Row, Col, Typography } from "antd";
import {
  UsergroupAddOutlined,
  TeamOutlined,
  RiseOutlined,
  DollarOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import { useTheme } from "@/components/ThemeProvider";

const { Title, Text } = Typography;

export default function Dashboard() {
  const { isDarkMode } = useTheme();

  const metrics = [
    {
      title: "Total Leads Today",
      value: "142",
      trend: "+12%",
      trendUp: true,
      icon: <UsergroupAddOutlined style={{ fontSize: 24, color: "#82C21C" }} />,
    },
    {
      title: "Leads This Week",
      value: "845",
      trend: "+5%",
      trendUp: true,
      icon: <TeamOutlined style={{ fontSize: 24, color: "#82C21C" }} />,
    },
    {
      title: "Conversion Rate",
      value: "18.2%",
      trend: "-2.1%",
      trendUp: false,
      icon: <RiseOutlined style={{ fontSize: 24, color: "#82C21C" }} />,
    },
    {
      title: "Revenue Generated",
      value: "$24,500",
      trend: "+14.5%",
      trendUp: true,
      icon: <DollarOutlined style={{ fontSize: 24, color: "#82C21C" }} />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <Title level={2} style={{ margin: 0, color: isDarkMode ? "#E6F0ED" : "#1F2937" }}>
          Dashboard Overview
        </Title>
        <Text style={{ color: isDarkMode ? "#9BA7A3" : "#6B7280" }}>
          Welcome back! Here's what's happening today.
        </Text>
      </div>

      <Row gutter={[24, 24]}>
        {metrics.map((metric, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card
              bordered={false}
              hoverable
              className={`transition-all duration-300 transform hover:-translate-y-1 ${
                isDarkMode ? "shadow-md hover:shadow-xl" : "shadow-sm hover:shadow-lg"
              }`}
              style={{
                borderRadius: 12,
                height: "100%",
                background: isDarkMode ? "#111C18" : "#FFFFFF",
              }}
              styles={{
                body: { padding: '24px' }
              }}
            >
              <div className="flex justify-between items-start mb-4">
                <Text
                  style={{
                    color: isDarkMode ? "#9BA7A3" : "#6B7280",
                    fontWeight: 500,
                    fontSize: 14,
                  }}
                >
                  {metric.title}
                </Text>
                <div
                  className="p-3 rounded-lg"
                  style={{
                    backgroundColor: isDarkMode ? "rgba(130, 194, 28, 0.15)" : "rgba(130, 194, 28, 0.1)",
                  }}
                >
                  {metric.icon}
                </div>
              </div>

              <div>
                <Title level={3} style={{ margin: 0, marginBottom: 8, color: isDarkMode ? "#E6F0ED" : "#1F2937" }}>
                  {metric.value}
                </Title>
                <div className="flex items-center gap-1">
                  {metric.trendUp ? (
                    <ArrowUpOutlined style={{ color: "#82C21C", fontSize: 14 }} />
                  ) : (
                    <ArrowDownOutlined style={{ color: "#ff4d4f", fontSize: 14 }} />
                  )}
                  <Text
                    style={{
                      color: metric.trendUp ? "#82C21C" : "#ff4d4f",
                      fontWeight: 500,
                    }}
                  >
                    {metric.trend}
                  </Text>
                  <Text style={{ color: isDarkMode ? "#7A8A85" : "#9CA3AF", fontSize: 12, marginLeft: 4 }}>
                    vs last period
                  </Text>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}