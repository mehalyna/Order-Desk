import type { Metadata } from "next";
import ThemeRegistry from './ThemeRegistry';

export const metadata: Metadata = {
  title: "Order Management Portal",
  description: "Internal portal for processing online store orders",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
