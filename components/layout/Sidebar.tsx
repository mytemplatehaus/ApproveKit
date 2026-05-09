"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, PlusCircle, Users, Settings, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Projects', href: '/dashboard/projects', icon: FolderKanban },
    { name: 'Create Project', href: '/dashboard/projects/new', icon: PlusCircle },
    { name: 'Clients', href: '/dashboard/clients', icon: Users },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-200 bg-white">
        <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-indigo-600 font-bold text-white text-xs">A</div>
            <span className="font-bold text-slate-800">ApproveKit</span>
        </Link>
        <button onClick={() => setIsOpen(!isOpen)} className="text-slate-500 hover:text-slate-700">
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:flex md:flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-16 shrink-0 items-center px-6 border-b border-slate-100 justify-between md:justify-start">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white">
              A
            </div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">ApproveKit</span>
          </Link>
          <button onClick={closeSidebar} className="md:hidden text-slate-500">
             <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex flex-col flex-1 overflow-y-auto px-4 py-6">
          <nav className="flex-1 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeSidebar}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-indigo-50 text-indigo-700" 
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <Icon className={cn(
                    "h-5 w-5 shrink-0 transition-colors", 
                    isActive ? "text-indigo-700" : "text-slate-400 group-hover:text-slate-500")} 
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          
          <div className="mt-8 border-t border-slate-100 pt-6">
            <Link
              href="/"
              onClick={closeSidebar}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            >
              <LogOut className="h-5 w-5 shrink-0 text-slate-400" />
              Logout
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}
    </>
  );
}
