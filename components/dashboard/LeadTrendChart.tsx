"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { Select } from "antd";
import SectionCard from "../common/SectionCard";
import { useTheme } from "../ThemeProvider";

// Dynamic import to avoid SSR issues with charts
const Area = dynamic(() => import("@ant-design/plots").then((mod) => mod.Area), { ssr: false });

const LeadTrendChart: React.FC = () => {
  const data = [
    { date: "Oct 19", leads: 45 },
    { date: "Oct 20", leads: 52 },
    { date: "Oct 21", leads: 38 },
    { date: "Oct 22", leads: 65 },
    { date: "Oct 23", leads: 48 },
    { date: "Oct 24", leads: 72 },
    { date: "Oct 25", leads: 85 },
  ];

  const config = {
    data,
    xField: "date",
    yField: "leads",
    theme: "dark",
    color: "#82C21C",
    padding: "auto",
    style: {
      fill: "linear-gradient(to bottom, #82C21C 0%, #082220 100%)",
      fillOpacity: 0.3,
      lineWidth: 3,
      stroke: "#82C21C",
    },
    axis: {
      x: {
        labelFill: "#FFFFFF",
        labelSpacing: 4,
        style: {
          labelFill: "#FFFFFF",
          lineStroke: "#333333",
        },
      },
      y: {
        labelFill: "#FFFFFF",
        labelSpacing: 4,
        style: {
          labelFill: "#FFFFFF",
          gridStroke: "#333333",
          gridLineDash: [4, 4],
        },
      },
    },

    point: {
      shapeField: "circle",
      sizeField: 5,
      style: {
        fill: "#FFFFFF",
        stroke: "#82C21C",
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: true,
      enterable: true,
      style: {
        backgroundColor: "#151515",
        borderRadius: "8px",
        border: "1px solid #1A1A1A",
        color: "#FFFFFF",
      },
    },
    interaction: {
      tooltip: {
        render: (event: any, { title, items }: any) => {
          return `
            <div style="padding: 12px; background: #151515; border: 1px solid #1A1A1A; border-radius: 8px;">
              <div style="color: #9BA7A3; margin-bottom: 4px; font-size: 12px;">${title}</div>
              <div style="color: #FFFFFF; font-weight: bold; font-size: 16px;">
                <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #82C21C; margin-right: 8px;"></span>
                ${items[0].value} Leads
              </div>
            </div>
          `;
        }
      }
    }
  };

  return (
    <SectionCard
      title="Lead Generation Trend"
      extra={
        <Select defaultValue="7days" size="small" variant="borderless" style={{ width: 120 }}>
          <Select.Option value="7days">Last 7 days</Select.Option>
          <Select.Option value="30days">Last 30 days</Select.Option>
        </Select>
      }
    >
      <div style={{ height: 350 }}>
        <Area {...config} />
      </div>
    </SectionCard>
  );
};


export default LeadTrendChart;
