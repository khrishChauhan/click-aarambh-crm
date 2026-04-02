import React from "react";
import { Typography } from "antd";
import InteractiveCard from "./InteractiveCard";

const { Text } = Typography;

interface SectionCardProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  extra?: React.ReactNode;
  className?: string;
  disableHover3D?: boolean;
}

const SectionCard: React.FC<SectionCardProps> = ({ 
  children, 
  title, 
  extra, 
  className,
  disableHover3D = false
}) => {
  return (
    <InteractiveCard className={className} disableHover3D={disableHover3D}>
      {(title || extra) && (
        <div 
          className="flex justify-between items-center mb-6 pb-4"
          style={{ borderBottom: "1px solid #1E2B27" }}
        >
          {title && (
            <Text strong style={{ fontSize: "16px", color: "#E6F0ED" }}>
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
