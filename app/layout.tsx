import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Review page",
  description: "Share a review about a product or a service you have experienced",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <ClerkProvider>
          <html lang="en">
            <body>
              <Navbar />
              <div className="h-full">
                {children}
              </div>
            </body>
          </html>
        </ClerkProvider>

      </body>
    </html>
  );
}
