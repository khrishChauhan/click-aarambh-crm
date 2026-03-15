"use client";

import React from "react";
import { Layout, Button, Input, Badge, Avatar, Space, Tooltip } from "antd";
import {
  MenuOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";


import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth";
import NoiseTexture from "../effects/NoiseTexture";

const { Header: AntHeader } = Layout;


interface HeaderProps {
  pageTitle?: string;
  collapsed: boolean;
  onToggleCollapse: () => void;
  isMobile: boolean;
  onShowMobileMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  pageTitle = "Dashboard",
  collapsed, 
  onToggleCollapse, 
  isMobile, 
  onShowMobileMenu 
}) => {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <AntHeader
      className="px-6"
      style={{
        height: isMobile ? 56 : 64,
        padding: 0,
        position: "sticky",
        top: 0,
        zIndex: 90,
        width: "100%",
        background: "#0E2B27",
        borderBottom: "1px solid #1E2B27",
        lineHeight: isMobile ? "56px" : "64px",
        overflow: "hidden",
      }}

    >
      <NoiseTexture />
      <div className="flex items-center justify-between h-full relative z-10 w-full">

      {/* Left Section */}
      <div className="flex items-center gap-4 min-w-0">
        <Button
          type="text"
          icon={isMobile ? <MenuOutlined /> : (collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />)}
          onClick={isMobile ? onShowMobileMenu : onToggleCollapse}
          className="neumorphic-button ml-5"
          style={{ 
            color: "#E6F0ED",
            fontSize: "18px",
            width: 40,
            height: 40,
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        />
        <h1 
          className="m-0 text-[18px] font-semibold tracking-tight truncate border-l border-[#1E2B27] pl-4"
          style={{ color: "#E6F0ED" }}
        >
          {pageTitle}
        </h1>
      </div>
      
      {/* Right Section */}
      <div className="flex items-center gap-4">

        <Space size={12} align="center" className="h-full">
          <Tooltip title="Notifications">
            <Badge dot offset={[-2, 6]} color="#82C21C">
              <Button
                type="text"
                icon={<BellOutlined />}
                className="neumorphic-button"
                style={{ 
                  color: "#E6F0ED", 
                  fontSize: "20px",
                  width: 40,
                  height: 40,
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  lineHeight: 1
                }}
              />
            </Badge>
          </Tooltip>
          
          <div 
            className="flex items-center justify-center cursor-pointer px-4 neumorphic-button"
            style={{ height: 40, lineHeight: 1 }}
          >
            <span className="text-sm font-semibold" style={{ color: "#E6F0ED" }}>
              Admin
            </span>
          </div>

          <Button
            type="text"
            onClick={handleLogout}
            className="neumorphic-button mr-5"
            style={{ 
              color: "#E6F0ED", 
              fontWeight: 600,
              fontSize: "14px",
              height: 40,
              padding: "0 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              lineHeight: 1
            }}
          >
            Logout
          </Button>
        </Space>


      </div>
      </div>
    </AntHeader>
  );
};

export default Header;
