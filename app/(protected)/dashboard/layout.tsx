import { SessionProvider } from "next-auth/react"

import { Navbar } from "./_components/navbar"
import { auth } from "@/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth();
  
  return (
    <SessionProvider session={session}>
      <div className="flex flex-row h-full w-full">
        <Navbar />
        <div className="flex flex-col w-full h-full bg-slate-900">
          {children}
        </div>
      </div>
    </SessionProvider>
  );
}