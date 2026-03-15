"use client";

import React from "react";
import { Layout, Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";
import {
  DashboardOutlined,
  TeamOutlined,
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
          className="flex items-center h-16 px-6"
          style={{ borderBottom: "1px solid #1A1A1A" }}
        >
          <div className="w-8 h-8 rounded-lg bg-[#82C21C] flex items-center justify-center mr-3 flex-shrink-0">
             <span className="text-white font-bold">A</span>
          </div>
          {!collapsed && (
            <span 
              className="text-lg font-bold tracking-tight"
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
          className="custom-menu"
        />
      </div>
    </Sider>
  );
};

export default Sidebar;
