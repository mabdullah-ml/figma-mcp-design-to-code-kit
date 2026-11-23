import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Figma Dev Mode + MCP Design-to-Code Showcase",
  description: "Automated Figma MCP token extraction and typed Next.js component pipeline.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
