"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { useEffect, useState } from "react";
import { store, User } from "@/lib/store";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(store.getUser());
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden h-screen w-full">
        <header className="bg-white border-b border-slate-200 h-16 shrink-0 flex items-center px-8 justify-between md:flex hidden">
           <h1 className="text-lg font-semibold text-slate-800">Agency Dashboard</h1>
           {user && (
              <div className="flex items-center gap-3">
                 <div className="h-8 w-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm">
                    {user.name.charAt(0)}
                 </div>
                 <div className="overflow-hidden">
                    <p className="text-xs font-semibold text-slate-800 truncate">{user.agencyName}</p>
                    <p className="text-[10px] text-slate-500 truncate">Agency Plan</p>
                 </div>
              </div>
           )}
        </header>
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-8 relative w-full">
          <div className="mx-auto w-full max-w-6xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
