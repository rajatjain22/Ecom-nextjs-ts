"use client";

import { ReactNode, useState } from "react";
import { Session } from "next-auth";

import { SessionProvider } from "next-auth/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { PUBLIC_ROUTES } from "@/lib/routes";
import { usePathname } from "next/navigation";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Sidebar from "@/components/layout/Sidebar";

const queryClient = new QueryClient();

interface AuthProviderProps {
  children: ReactNode;
  session: Session | null;
}

const AuthProvider = ({ children, session }: AuthProviderProps) => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const isPublicPath = PUBLIC_ROUTES.includes(pathname);
  const isAdminPath = pathname.startsWith("/admin");

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        {!isPublicPath && !isAdminPath && <Header />}
        {!isPublicPath && isAdminPath && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
        <main className={` transition-transform duration-300 ease-in-out ml-0 ${!isPublicPath && sidebarOpen && 'md:ml-[--w-side]'}`}>
          {children}
        </main>
        {!isPublicPath && !isAdminPath && <Footer />}
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default AuthProvider;
