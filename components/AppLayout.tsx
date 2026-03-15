"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Layout, Menu, Button, Input, Badge, Avatar, Drawer } from "antd";
import {
  MenuOutlined,
  DashboardOutlined,
  TeamOutlined,
  SearchOutlined,
  BellOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useTheme } from "./ThemeProvider";

const { Header, Sider, Content } = Layout;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    if (isMobile) {
      setDrawerVisible(false);
    }
  };

  const SidebarContent = (
    <>
      <div
        className="flex items-center justify-center h-16"
        style={{
          borderBottom: `1px solid ${isDarkMode ? "#1E2B27" : "#E5E7EB"}`,
        }}
      >
        <span
          className="text-lg font-bold truncate px-4"
          style={{
            color: isDarkMode ? "#E6F0ED" : "#082220",
          }}
        >
          {collapsed && !isMobile ? "CA" : "Click Aarambh CRM"}
        </span>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[pathname.startsWith('/leads') ? '/leads' : '/dashboard']}
        onClick={handleMenuClick}
        items={menuItems}
        style={{
          borderRight: 0,
          paddingTop: 16,
        }}
      />
    </>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Desktop Sider */}
      {!isMobile && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={220}
          style={{
            borderRight: `1px solid ${isDarkMode ? "#1E2B27" : "#E5E7EB"}`,
          }}
        >
          {SidebarContent}
        </Sider>
      )}

      {/* Mobile Drawer Navigation */}
      {isMobile && (
        <Drawer
          placement="left"
          closable={false}
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
          width={250}
          styles={{ body: { padding: 0 } }}
        >
          <div style={{ background: isDarkMode ? "#111C18" : "#FFFFFF", minHeight: "100%" }}>
            {SidebarContent}
          </div>
        </Drawer>
      )}

      <Layout>
        <Header
          className="flex items-center justify-between"
          style={{
            padding: 0,
            height: 64,
            borderBottom: `1px solid ${isDarkMode ? "#1E2B27" : "#E5E7EB"}`,
            boxShadow: isDarkMode ? "none" : "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          }}
        >
          <div className="flex items-center flex-1">
            {isMobile ? (
              <Button
                type="text"
                icon={<MenuOutlined style={{ color: isDarkMode ? "#E6F0ED" : "#1F2937" }} />}
                onClick={() => setDrawerVisible(true)}
                className="ml-4 mr-2"
              />
            ) : (
              <Button
                type="text"
                icon={<MenuOutlined style={{ color: isDarkMode ? "#E6F0ED" : "#1F2937" }} />}
                onClick={() => setCollapsed(!collapsed)}
                className="ml-4 mr-4"
              />
            )}
            
            {!isMobile && (
              <Input
                placeholder="Search..."
                prefix={<SearchOutlined style={{ color: isDarkMode ? "#9BA7A3" : "#6B7280" }} />}
                style={{
                  maxWidth: 320,
                  backgroundColor: isDarkMode ? "rgba(255,255,255,0.05)" : "#F3F4F6",
                  border: isDarkMode ? "1px solid #1E2B27" : "none",
                  color: isDarkMode ? "#E6F0ED" : "inherit"
                }}
                className="hidden md:flex"
              />
            )}
            {isMobile && (
              <span className="font-semibold ml-2 text-lg" style={{ color: isDarkMode ? "#E6F0ED" : "#082220" }}>
                Click Aarambh
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4 pr-4">
            {/* Theme Toggle Button */}
            <Button 
               shape="circle" 
               type="text" 
               onClick={toggleTheme}
               className="flex items-center justify-center text-lg"
               style={{ color: isDarkMode ? "#82C21C" : "#082220" }}
            >
              {isDarkMode ? "☀️" : "🌙"}
            </Button>
            
            <Badge count={3} offset={[-4, 4]} color="#82C21C">
               <Button
                shape="circle"
                type="text"
                icon={<BellOutlined />}
                style={{ color: isDarkMode ? "#E6F0ED" : "#1F2937" }}
              />
            </Badge>
            
            <div className="flex items-center gap-2 cursor-pointer p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <Avatar icon={<UserOutlined />} src="https://api.dicebear.com/7.x/notionists/svg?seed=Admin" />
              {!isMobile && (
                <span className="text-sm font-medium" style={{ color: isDarkMode ? "#E6F0ED" : "#1F2937" }}>
                  Admin
                </span>
              )}
            </div>
          </div>
        </Header>
        
        <Content
          style={{
            margin: "0px",
            background: "none",
          }}
          className="overflow-x-hidden md:p-8 p-4"
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
