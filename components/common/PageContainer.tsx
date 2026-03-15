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
}

const PageContainer: React.FC<PageContainerProps> = ({ children, title, description, extra }) => {
  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="flex justify-between items-start mb-8 flex-wrap gap-4">
        <Space direction="vertical" size={2} className="w-full sm:w-auto">
          <TypingTitle text={title} />
          {description && (
            <div className="-mt-5">
              <Text style={{ color: "#E6F0ED", fontSize: "14px", opacity: 0.85 }}>
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
