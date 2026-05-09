"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Use demo action - jump right to dashboard
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white shadow-md shadow-indigo-200">
              A
            </div>
            <span className="text-2xl font-bold text-slate-800 tracking-tight">ApproveKit</span>
          </Link>
        </div>
        
        <Card className="border-0 shadow-xl shadow-slate-200 bg-white">
          <CardHeader className="text-center space-y-2">
             <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">Welcome back</CardTitle>
             <CardDescription className="text-slate-500">Log in to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700">Email address</Label>
                <Input id="email" type="email" placeholder="jane@example.com" required defaultValue="demo@approvekit.com" className="bg-slate-50/50 border-slate-200 focus:ring-indigo-600" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                   <Label htmlFor="password" className="text-slate-700">Password</Label>
                   <Link href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
                </div>
                <Input id="password" type="password" required defaultValue="password123" className="bg-slate-50/50 border-slate-200 focus:ring-indigo-600" />
              </div>
              
              <Button type="submit" className="w-full mt-6 h-12 text-base shadow-md shadow-indigo-600/20 bg-indigo-600 hover:bg-indigo-700 text-white">Log In</Button>
            </form>
            
            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs font-bold leading-6 tracking-widest text-slate-400">
                <span className="bg-white px-2">OR</span>
              </div>
            </div>
            
            <div className="mt-6">
               <Button onClick={() => router.push("/dashboard")} variant="soft-secondary" className="w-full h-12 text-base font-medium border-slate-200">
                  Use demo account
               </Button>
            </div>
          </CardContent>
          <CardFooter className="justify-center pt-6 pb-6 border-t border-slate-100 mt-2">
            <p className="text-sm text-slate-600">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
