import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import ThemeProvider from "@/components/ThemeProvider";
import AppLayout from "@/components/AppLayout";
import "./globals.css";


const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Click Aarambh CRM",
  description: "Modern CRM dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ margin: 0, padding: 0 }}>
        <AntdRegistry>
          <ThemeProvider>
            <AppLayout>{children}</AppLayout>
          </ThemeProvider>
        </AntdRegistry>
      </body>

    </html>
  );
}