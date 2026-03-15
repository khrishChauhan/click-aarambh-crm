"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ConfigProvider, theme } from "antd";

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

// Fixed to dark mode
const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: true,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  const customTokens = {
    colorBgLayout: "#082220",
    colorBgContainer: "rgba(17, 28, 24, 0.6)",
    colorBgElevated: "rgba(25, 38, 34, 0.8)", // Slightly more opaque for elevated surfaces
    colorPrimary: "#82C21C",
    colorTextBase: "#FFFFFF",
    colorTextSecondary: "#E6F0ED",
    colorBorder: "rgba(255, 255, 255, 0.08)",
    colorBorderSecondary: "rgba(255, 255, 255, 0.05)",
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode: true, toggleTheme: () => {} }}>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            fontFamily: "var(--font-inter), sans-serif",
            ...customTokens,
          },
          components: {
            Layout: {
              headerBg: "#0E2B27",
              siderBg: "#0E2B27",
              bodyBg: "transparent",
            },

            Menu: {
              itemSelectedBg: "rgba(130, 194, 28, 0.2)",
              itemSelectedColor: "#82C21C",
              itemColor: "#E6F0ED", // Off-white for unselected items
              itemHoverBg: "rgba(255, 255, 255, 0.08)",
              itemHoverColor: "#FFFFFF", // Pure white on hover
            },
            Card: {
              colorBgContainer: "#0E0E0E",
              colorBorderSecondary: "#1A1A1A",
              boxShadowTertiary: "0 4px 12px rgba(0, 0, 0, 0.6)",
            },
            Table: {
              headerBg: "#151515",
              headerColor: "#E6F0ED",
              rowHoverBg: "rgba(255,255,255,0.02)",
              borderColor: "#1A1A1A",
            },
            Drawer: {
              colorBgElevated: "#0E0E0E",
            },
            Button: {
              colorPrimary: "#82C21C",
              colorPrimaryHover: "#9EDC2E",
            },
            Form: {
              labelColor: "#E6F0ED",
              itemMarginBottom: 24,
            },
            Input: {
              activeBorderColor: "#82C21C",
              hoverBorderColor: "#82C21C",
              colorBgContainer: "#050505",
              colorText: "#FFFFFF",
              colorTextPlaceholder: "#9BA7A3",
            },
            Select: {
              colorPrimary: "#82C21C",
              colorPrimaryHover: "#9EDC2E",
              colorBgContainer: "#050505",
              colorText: "#FFFFFF",
              colorTextPlaceholder: "#9BA7A3",
              colorBgElevated: "#151515",
              selectorBg: "#050505",
              optionSelectedBg: "rgba(130, 194, 28, 0.2)",
              optionSelectedColor: "#82C21C",
              optionActiveBg: "rgba(255, 255, 255, 0.08)",
            },
          },
        }}

      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}



