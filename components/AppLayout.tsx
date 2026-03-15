"use client";

import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import MobileMenu from "./layout/MobileMenu";
import { isLoggedIn } from "@/lib/auth";
import NoiseTexture from "./effects/NoiseTexture";

const { Content } = Layout;


export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  
  const pathname = usePathname();
  const router = useRouter();

  const isLoginPage = pathname === "/login";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    
    // Auth check
    if (!isLoginPage && !isLoggedIn()) {
      router.push("/login");
    } else {
      setIsAuthChecking(false);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [isLoginPage, router]);

  if (isAuthChecking && !isLoginPage) {
    return <div style={{ height: "100vh", background: "#082220" }} />;
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <Layout style={{ minHeight: "100vh", background: "#082220", position: "relative" }}>
      <Sidebar 
        collapsed={collapsed} 
        onCollapse={setCollapsed} 
        isMobile={isMobile} 
      />
      
      <MobileMenu 
        visible={mobileMenuVisible} 
        onClose={() => setMobileMenuVisible(false)} 
      />

      <Layout style={{ background: "transparent", position: "relative" }}>
        <NoiseTexture />
        <Header 
          pageTitle={pathname.startsWith("/leads") ? "Leads Management" : "Dashboard"}
          collapsed={collapsed} 
          onToggleCollapse={() => setCollapsed(!collapsed)} 
          isMobile={isMobile}
          onShowMobileMenu={() => setMobileMenuVisible(true)}
        />
        
        <Content
          className="md:p-8 p-4 overflow-x-hidden relative z-10"
          style={{ transition: "all 0.2s" }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );

}

