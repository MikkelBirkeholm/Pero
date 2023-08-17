import "./globals.scss";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { NavigationEvents } from "@/components/Navigation/NavigationEvents";
import { Header } from "@/components/Header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pero",
  description: "Manage you",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Suspense fallback={null}>
          <NavigationEvents />
        </Suspense>
      </body>
    </html>
  );
}
