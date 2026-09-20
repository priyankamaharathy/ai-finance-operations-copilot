import type { Metadata } from "next";
import { QueryProvider } from "@/lib/query/query-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Finance Operations Copilot",
  description: "...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}