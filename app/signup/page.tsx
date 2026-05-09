"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

export default function SignUpPage() {
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
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
             <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">Create your account</CardTitle>
             <CardDescription className="text-slate-500">Start managing client approvals the right way</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-700">Full name</Label>
                <Input id="name" placeholder="Jane Doe" required className="bg-slate-50/50 border-slate-200 focus:ring-indigo-600" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700">Email address</Label>
                <Input id="email" type="email" placeholder="jane@example.com" required className="bg-slate-50/50 border-slate-200 focus:ring-indigo-600" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="agency" className="text-slate-700">Agency name</Label>
                <Input id="agency" placeholder="Creative Studio" required className="bg-slate-50/50 border-slate-200 focus:ring-indigo-600" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700">Password</Label>
                <Input id="password" type="password" required className="bg-slate-50/50 border-slate-200 focus:ring-indigo-600" />
              </div>
              
              <Button type="submit" className="w-full mt-6 h-12 text-base shadow-md shadow-indigo-600/20 bg-indigo-600 hover:bg-indigo-700 text-white">Create Account</Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center pt-6 pb-6 border-t border-slate-100 mt-2">
            <p className="text-sm text-slate-600">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Log in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
