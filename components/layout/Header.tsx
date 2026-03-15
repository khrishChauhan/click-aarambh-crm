"use client";

import React from "react";
import { Layout, Button, Input, Badge, Avatar, Space, Tooltip } from "antd";
import {
  MenuOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  LogoutOutlined,
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
        overflow: "hidden"
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
          style={{ 
            color: "#E6F0ED",
            fontSize: "18px",
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          className="hover:bg-white/5 transition-colors"
        />
        <h1 
          className="m-0 text-[18px] font-semibold tracking-tight truncate border-l border-[#1A1A1A] pl-4"
          style={{ color: "#E6F0ED" }}
        >
          {pageTitle}
        </h1>
      </div>
      
      {/* Right Section */}
      <div className="flex items-center gap-4">

        <Space size={16}>
          <Tooltip title="Notifications">
            <Badge dot offset={[-2, 6]} color="#FF4D4F">
              <Button
                type="text"
                icon={<BellOutlined />}
                style={{ 
                  color: "#E6F0ED", 
                  fontSize: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                className="group hover:bg-white/5 transition-all"
              />
            </Badge>
          </Tooltip>
          
          <div className="flex items-center gap-3 cursor-pointer group px-2 py-1 rounded-lg hover:bg-white/5 transition-all">
            <Avatar 
              size={32}
              style={{ backgroundColor: "#82C21C", fontWeight: 700, color: "#FFFFFF" }}
              className="group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(130,194,28,0.3)]"
            >
              KC
            </Avatar>
            {!isMobile && (
              <span className="text-sm font-semibold" style={{ color: "#FFFFFF" }}>
                Khrish
              </span>
            )}
          </div>

          <Button
            type="text"
            onClick={handleLogout}
            style={{ 
              color: "#E6F0ED", 
              fontWeight: 600,
              fontSize: "14px"
            }}
            className="hover:text-[#82C21C] transition-colors px-2"
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
