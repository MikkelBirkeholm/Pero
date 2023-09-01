import "./globals.scss";
import { Inter } from "next/font/google";

import { Header } from "@/components/Header/Header";

export const dynamic = "force-dynamic";

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
      </body>
    </html>
  );
}
// import { Suspense } from "react";
// import { NavigationEvents } from "@/components/Navigation/NavigationEvents";
// {        <Suspense fallback={null}>
//           <NavigationEvents />
//         </Suspense>}
