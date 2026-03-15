"use client";

import React from "react";
import { Drawer, Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";
import {
  DashboardOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import NoiseTexture from "../effects/NoiseTexture";


interface MobileMenuProps {
  visible: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible, onClose }) => {
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
    onClose();
  };

  const activeKey = pathname.startsWith("/leads") ? "/leads" : "/dashboard";

  return (
    <Drawer
      placement="left"
      onClose={onClose}
      open={visible}
      width={280}
      styles={{ 
        body: { padding: 0, background: "#0E2B27", overflow: "hidden", position: "relative" },
        header: { display: "none" }
      }}
    >
      <NoiseTexture />
      <div className="h-full flex flex-col relative z-10">
        <div className="flex items-center h-16 px-6 border-b border-[#1E2B27]">

          <div className="w-8 h-8 rounded-lg bg-[#82C21C] flex items-center justify-center mr-3">
             <span className="text-white font-bold">A</span>
          </div>
          <span className="text-lg font-bold" style={{ color: "#E6F0ED" }}>
            Click Aarambh
          </span>
        </div>
        
        <Menu
          mode="inline"
          selectedKeys={[activeKey]}
          onClick={handleMenuClick}
          items={menuItems}
          theme="dark"
          style={{ borderRight: 0, paddingTop: 16, background: "transparent" }}
        />
      </div>
    </Drawer>
  );
};

export default MobileMenu;

