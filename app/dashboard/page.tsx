"use client";

import React from "react";
import { Row, Col } from "antd";
import {
  UsergroupAddOutlined,
  TeamOutlined,
  RiseOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import PageContainer from "@/components/common/PageContainer";
import StatCard from "@/components/dashboard/StatCard";
import LeadTrendChart from "@/components/dashboard/LeadTrendChart";
import SourceDonutChart from "@/components/dashboard/SourceDonutChart";
import CampaignPerformance from "@/components/dashboard/CampaignPerformance";
import RecentLeads from "@/components/dashboard/RecentLeads";

export default function Dashboard() {
  return (
    <PageContainer 
      title="Dashboard Overview" 
      description="Welcome back! Here's a summary of your lead performance and activity."
    >
      <div className="dashboard-grid" style={{ perspective: "1000px" }}>
        <Row gutter={[24, 24]} className="mb-8">
          <Col xs={24} sm={12} lg={6}>
            <StatCard 
              title="Total Leads Today" 
              value="142" 
              icon={<UsergroupAddOutlined />} 
              trend="+12%" 
              trendUp={true} 
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard 
              title="Leads This Week" 
              value="845" 
              icon={<TeamOutlined />} 
              trend="+5%" 
              trendUp={true} 
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard 
              title="Conversion Rate" 
              value="18.2%" 
              icon={<RiseOutlined />} 
              trend="-2.1%" 
              trendUp={false} 
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard 
              title="Total Revenue" 
              value="$24,500" 
              icon={<DollarOutlined />} 
              trend="+14.5%" 
              trendUp={true} 
            />
          </Col>
        </Row>

        <Row gutter={[24, 24]} className="mb-8">
          <Col xs={24} lg={16}>
            <LeadTrendChart />
          </Col>
          <Col xs={24} lg={8}>
            <SourceDonutChart />
          </Col>
        </Row>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <CampaignPerformance />
          </Col>
          <Col xs={24} lg={12}>
            <RecentLeads />
          </Col>
        </Row>
      </div>
    </PageContainer>

  );
}