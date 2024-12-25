"use client";

import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Sidebar } from "@/components/Sidebar";
import { AppWrapper } from "@/components/Wrapper";
import { useUIStore } from "@/stores/UIStore";
import { Astronaut } from "@/components/loaders/Astronaut";

export default function RootLayout({ children }) {
      const { isLoader } = useUIStore();
    return (
        <html lang="en">
            <body className="text-[var(--tertiary-text)]">
                <SessionProvider>
                    <AppWrapper>
                        <Sidebar />
                        {children}
                    </AppWrapper>
                    {isLoader && <Astronaut />}
                </SessionProvider>
            </body>
        </html>
    );
}
