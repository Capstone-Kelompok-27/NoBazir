import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { RoleContextProvider } from "./_context/roleContext";

export const metadata: Metadata = {
  title: "NoBazir",
  description: "Say no to mubazzir with NoBazir",
  icons: [{ rel: "icon", url: "/nobazir-logo.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <RoleContextProvider>{children}</RoleContextProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
