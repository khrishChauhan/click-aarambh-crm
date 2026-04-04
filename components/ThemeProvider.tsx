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
    colorBgContainer: "#111C18",
    colorBgElevated: "#182621",
    colorPrimary: "#82C21C",
    colorTextBase: "#FFFFFF",
    colorTextSecondary: "#9BA7A3",
    colorBorder: "#1E2B27",
    colorBorderSecondary: "#1E2B27",
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode: true, toggleTheme: () => {} }}>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            fontFamily: "var(--font-plus-jakarta-sans), var(--font-inter), sans-serif",
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
              itemColor: "#E6F0ED",
              itemHoverBg: "rgba(255, 255, 255, 0.08)",
              itemHoverColor: "#FFFFFF",
            },
            Card: {
              colorBgContainer: "#111C18",
              colorBorderSecondary: "#1E2B27",
              boxShadowTertiary: "0 6px 18px rgba(0, 0, 0, 0.35)",
            },
            Table: {
              headerBg: "#15221E",
              headerColor: "#E6F0ED",
              rowHoverBg: "rgba(255,255,255,0.02)",
              borderColor: "#1E2B27",
            },
            Drawer: {
              colorBgElevated: "#111C18",
              colorBorderSecondary: "#1E2B27",
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
              colorBgContainer: "#0A1412",
              colorText: "#FFFFFF",
              colorTextPlaceholder: "#6A7A75",
            },
            Select: {
              colorPrimary: "#82C21C",
              colorPrimaryHover: "#9EDC2E",
              colorBgContainer: "#0A1412",
              colorText: "#FFFFFF",
              colorTextPlaceholder: "#6A7A75",
              colorBgElevated: "#182621",
              selectorBg: "#0A1412",
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



