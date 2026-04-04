"use client";

import React from "react";
import { Typography, Space } from "antd";
import TypingTitle from "./TypingTitle";

const { Text } = Typography;

interface PageContainerProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  extra?: React.ReactNode;
  minimal?: boolean;
}

const PageContainer: React.FC<PageContainerProps> = ({ children, title, description, extra, minimal = false }) => {
  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="flex justify-between items-start mb-8 flex-wrap gap-4">
        <Space direction="vertical" size={4} className="w-full sm:w-auto">
          {minimal ? (
            <Typography.Title level={2} style={{ margin: 0, color: '#E6F0ED', fontWeight: 600 }}>
              {title}
            </Typography.Title>
          ) : (
            <TypingTitle text={title} />
          )}
          {description && (
            <div className={minimal ? "mt-1" : "-mt-5"}>
              <Text style={{ color: "#9BA7A3", fontSize: "14px", fontWeight: 400 }}>
                {description}
              </Text>
            </div>
          )}
        </Space>
        {extra && <div className="flex items-center gap-3">{extra}</div>}
      </div>
      {children}
    </div>
  );
};


export default PageContainer;
