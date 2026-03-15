"use client";

import React from "react";
import { Layout, Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";
import {
  DashboardOutlined,
  TeamOutlined,
  AimOutlined,
} from "@ant-design/icons";

import NoiseTexture from "../effects/NoiseTexture";

const { Sider } = Layout;


interface SidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
  isMobile: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onCollapse, isMobile }) => {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "/leads",
      icon: <TeamOutlined />,
      label: "Leads",
    },
  ];

  const handleMenuClick = (e: { key: string }) => {
    router.push(e.key);
  };

  const activeKey = pathname.startsWith("/leads") ? "/leads" : "/dashboard";

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={240}
      theme="dark"
      style={{
        height: "100vh",
        position: isMobile ? "fixed" : "sticky",
        top: 0,
        left: 0,
        zIndex: 100,
        borderRight: "1px solid #1E2B27",
        background: "#0E2B27",
        overflow: "hidden"
      }}
      className={isMobile ? "hidden" : ""}
    >
      <NoiseTexture />
      <div className="flex flex-col h-full relative z-10">

        <div 
          className={`flex items-center h-16 px-6 ${collapsed ? "justify-center px-0" : ""}`}
          style={{ borderBottom: "1px solid #1E2B27" }}
        >
          <div className={`flex items-center justify-center flex-shrink-0 ${collapsed ? "" : "mr-3"}`}>
             <AimOutlined style={{ color: "#82C21C", fontSize: "20px" }} />
          </div>
          {!collapsed && (
            <span 
              className="text-lg font-bold tracking-tight whitespace-nowrap"
              style={{ color: "#FFFFFF" }}
            >
              Click Aarambh
            </span>
          )}
        </div>



        
        <Menu
          mode="inline"
          selectedKeys={[activeKey]}
          onClick={handleMenuClick}
          items={menuItems}
          theme="dark"
          style={{ 
            borderRight: 0, 
            paddingTop: 16,
            background: "transparent"
          }}
          className="custom-sidebar-menu"
        />
        <style jsx global>{`
          .custom-sidebar-menu.ant-menu-dark {
            padding: 12px !important;
          }
          .custom-sidebar-menu.ant-menu-dark .ant-menu-item {
            margin-bottom: 12px !important;
            border-radius: 10px !important;
            transition: all 0.2s ease !important;
            color: #9BA7A3 !important;
            box-shadow: inset 4px 4px 8px rgba(0, 0, 0, 0.4), inset -2px -2px 6px rgba(255, 255, 255, 0.02) !important;
            transform: translateY(1px);
          }
          .custom-sidebar-menu.ant-menu-dark .ant-menu-item:hover {
            color: #82C21C !important;
            transform: translateY(2px) !important;
            box-shadow: inset 6px 6px 12px rgba(0, 0, 0, 0.5), inset -3px -3px 8px rgba(255, 255, 255, 0.03) !important;
          }
          .custom-sidebar-menu.ant-menu-dark .ant-menu-item-selected {
            background-color: #0E2B27 !important;
            color: #82C21C !important;
            box-shadow: inset 8px 8px 16px rgba(0, 0, 0, 0.6), inset -4px -4px 10px rgba(255, 255, 255, 0.04) !important;
            font-weight: 600 !important;
            transform: translateY(2px) !important;
          }



        `}</style>


      </div>
    </Sider>
  );
};

export default Sidebar;
