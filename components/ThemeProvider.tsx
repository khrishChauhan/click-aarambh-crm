"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ConfigProvider, theme } from "antd";

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check local storage or system preference on mount
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setIsDarkMode(true);
    } else if (
      saved === null &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setIsDarkMode(true);
    }
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  const customTokens = isDarkMode
    ? {
        // Dark Mode
        colorBgLayout: "#0B1412",
        colorBgContainer: "#111C18",
        colorBgElevated: "#111C18",
        colorPrimary: "#82C21C",
        colorTextBase: "#E6F0ED",
        colorTextSecondary: "#9BA7A3",
        colorBorder: "#1E2B27",
        colorBorderSecondary: "#1E2B27",
      }
    : {
        // Light Mode
        colorBgLayout: "#F7F9F8",
        colorBgContainer: "#FFFFFF",
        colorBgElevated: "#FFFFFF",
        colorPrimary: "#82C21C",
        colorTextBase: "#1F2937",
        colorTextSecondary: "#6B7280",
        colorBorder: "#E5E7EB",
        colorBorderSecondary: "#E5E7EB",
      };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
            fontFamily: "var(--font-inter), sans-serif",
            ...customTokens,
          },
          components: {
            Layout: {
              headerBg: isDarkMode ? "#082220" : "#FFFFFF",
              siderBg: isDarkMode ? "#111C18" : "#FFFFFF",
              bodyBg: isDarkMode ? "#0B1412" : "#F7F9F8",
            },
            Menu: {
              itemSelectedBg: isDarkMode ? "rgba(130, 194, 28, 0.15)" : "rgba(130, 194, 28, 0.1)",
              itemSelectedColor: "#82C21C",
              itemColor: isDarkMode ? "#9BA7A3" : "#6B7280",
              itemHoverBg: isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)",
              itemHoverColor: isDarkMode ? "#E6F0ED" : "#1F2937",
            },
            Card: {
              colorBorderSecondary: isDarkMode ? "#1E2B27" : "#E5E7EB",
              boxShadowTertiary: isDarkMode
                ? "0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            },
            Table: {
              headerBg: isDarkMode ? "#111C18" : "#F9FAFB",
              headerColor: isDarkMode ? "#9BA7A3" : "#6B7280",
              rowHoverBg: isDarkMode ? "rgba(255,255,255,0.02)" : "#F3F4F6",
              borderColor: isDarkMode ? "#1E2B27" : "#E5E7EB",
            },
            Drawer: {
              colorBgElevated: isDarkMode ? "#111C18" : "#FFFFFF",
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}
