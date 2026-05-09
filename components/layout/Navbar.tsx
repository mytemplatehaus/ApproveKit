"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="fixed top-0 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md z-50">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white">
              A
            </div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">ApproveKit</span>
          </Link>
        </div>
        <nav className="flex items-center gap-4">
          <Link 
            href="/login" 
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Log in
          </Link>
          <Link href="/signup">
            <Button>Start Free</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
