"use client";

import React from "react";
import dynamic from "next/dynamic";
import SectionCard from "../common/SectionCard";
import { useTheme } from "../ThemeProvider";

const Pie = dynamic(() => import("@ant-design/plots").then((mod) => mod.Pie), { ssr: false });

const SourceDonutChart: React.FC = () => {
  const data = [
    { type: "Meta Ads", value: 35 },
    { type: "Google Ads", value: 25 },
    { type: "Website", value: 20 },
    { type: "Referral", value: 15 },
    { type: "Direct", value: 5 },
  ];

  const config = {
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    innerRadius: 0.6,
    theme: "dark", // Explicitly set dark theme
    color: ["#82C21C", "#2DD4BF", "#3B82F6", "#8B5CF6", "#F59E0B"],
    label: {
      text: "value",
      style: {
        fill: "#FFFFFF",
        fontSize: 14,
        fontWeight: "bold",
      },
    },
    legend: {
      itemLabelFill: "#FFFFFF",
      itemLabelFontSize: 14,
      itemValueFill: "#FFFFFF",
      position: "bottom",
    },
    annotations: [
      {
        type: "text",
        style: {
          text: "Total",
          x: "50%",
          y: "45%",
          textAlign: "center",
          fontSize: 16,
          fill: "#FFFFFF",
          opacity: 0.9,
        },
      },
      {
        type: "text",
        style: {
          text: "1,245",
          x: "50%",
          y: "55%",
          textAlign: "center",
          fontSize: 32,
          fill: "#FFFFFF",
          fontWeight: 800,
        },
      },
    ],

    state: {
      active: {
        paletteIndex: 0,
        fillOpacity: 0.8,
      },
    },
  };

  return (
    <SectionCard title="Leads by Source">
      <div style={{ height: 350 }}>
        <Pie {...config} />
      </div>
    </SectionCard>
  );
};


export default SourceDonutChart;
