"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function ClientLayout({
    children,
    navbar,
    footer
}: {
    children: React.ReactNode,
    navbar: React.ReactNode,
    footer: React.ReactNode
}) {
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Hide Navbar, Footer, and FloatingButtons on admin and login pages
    // On first mount, we MUST match the server's render.
    // If we assume server knows the pathname (standard in Next RSC), we just need to keep it stable.
    const isAdminPage = pathname?.startsWith("/veela-travels-2026");
    const isLoginPage = pathname === "/login";
    const shouldHide = isAdminPage || isLoginPage;

    // By not rendering navbar/footer until mounted, we ensure the first render matches (nothing)
    // BUT this is bad for SEO/SSR for non-admin pages.
    // Instead, we just need to ensure the logic matches exactly.
    // Next.js 15 usePathname() returns the stable pathname on both server and client.

    return (
        <div suppressHydrationWarning>
            {!shouldHide && navbar}
            
            {children}
            
            {!shouldHide && footer}
        </div>
    );
}
