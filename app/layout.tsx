import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import ThemeProvider from "@/components/ThemeProvider";
import AppLayout from "@/components/AppLayout";
import "./globals.css";


const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"], 
  variable: "--font-plus-jakarta-sans",
  weight: ['200', '300', '400', '500', '600', '700', '800']
});

export const metadata = {
  title: "Click Aarambh CRM",
  description: "Modern CRM dashboard",
};

import CursorGlow from "@/components/effects/CursorGlow";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${plusJakartaSans.variable} ${inter.variable} font-sans`} style={{ margin: 0, padding: 0 }}>
        <AntdRegistry>
          <ThemeProvider>
            <CursorGlow />
            <AppLayout>{children}</AppLayout>
          </ThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}