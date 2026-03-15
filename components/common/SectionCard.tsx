import React from "react";
import { Typography } from "antd";
import InteractiveCard from "./InteractiveCard";

const { Text } = Typography;

interface SectionCardProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  extra?: React.ReactNode;
  className?: string;
}

const SectionCard: React.FC<SectionCardProps> = ({ children, title, extra, className }) => {
  return (
    <InteractiveCard className={className}>
      {(title || extra) && (
        <div 
          className="flex justify-between items-center mb-6 pb-4"
          style={{ borderBottom: "1px solid #1E2B27" }}
        >
          {title && (
            <Text strong style={{ fontSize: "16px", color: "#FFFFFF" }}>
              {title}
            </Text>
          )}
          {extra && <div>{extra}</div>}
        </div>
      )}
      <div className="w-full">
        {children}
      </div>
    </InteractiveCard>
  );
};

export default SectionCard;
