"use client";

import { useState, useEffect } from "react";
import { store, User } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  const [user, setUser] = useState<User>({ name: '', email: '', agencyName: '' });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setUser(store.getUser());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    store.setUser(user);
    setTimeout(() => {
       setIsSaving(false);
       alert("Settings saved successfully!");
       window.location.reload(); // Refresh to update layout header
    }, 500);
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
         <h2 className="text-2xl font-bold tracking-tight text-slate-800">Settings</h2>
         <p className="text-slate-500">Manage your agency profile and billing preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            <Card>
               <CardHeader>
                  <CardTitle>Agency Profile</CardTitle>
                  <CardDescription>Update your agency details to personalizer client review pages.</CardDescription>
               </CardHeader>
               <CardContent>
                  <form onSubmit={handleSave} className="space-y-6">
                     <div className="space-y-2">
                        <Label htmlFor="agencyName">Agency Name</Label>
                        <Input 
                           id="agencyName" 
                           name="agencyName" 
                           value={user.agencyName} 
                           onChange={handleChange} 
                           required 
                        />
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <Label htmlFor="name">Your Name</Label>
                           <Input 
                              id="name" 
                              name="name" 
                              value={user.name} 
                              onChange={handleChange} 
                              required 
                           />
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="email">Email Address</Label>
                           <Input 
                              id="email" 
                              name="email" 
                              type="email" 
                              value={user.email} 
                              onChange={handleChange} 
                              required 
                           />
                        </div>
                     </div>
                     
                     <div className="space-y-2 pt-4">
                        <Label>Brand Accent Color</Label>
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-md bg-indigo-600 shadow-inner"></div>
                           <Input type="text" value="#4f46e5" disabled className="w-32 bg-slate-50 text-slate-500" />
                           <span className="text-xs text-slate-500 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded">Pro Feature</span>
                        </div>
                     </div>
                     
                     <div className="flex justify-end pt-4">
                        <Button type="submit" disabled={isSaving}>
                           {isSaving ? "Saving..." : "Save Settings"}
                        </Button>
                     </div>
                  </form>
               </CardContent>
            </Card>

            <Card>
               <CardHeader>
                  <CardTitle>Email Notifications</CardTitle>
                  <CardDescription>Choose what updates you want to receive via email.</CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                     <div>
                        <h4 className="font-medium text-slate-800">Project Approved</h4>
                        <p className="text-sm text-slate-500">Get an email when a client approves a project.</p>
                     </div>
                     <div className="w-11 h-6 bg-indigo-600 rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                     </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                     <div>
                        <h4 className="font-medium text-slate-800">Changes Requested</h4>
                        <p className="text-sm text-slate-500">Get an email when a client requests changes.</p>
                     </div>
                     <div className="w-11 h-6 bg-indigo-600 rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                     </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg opacity-60">
                     <div>
                        <h4 className="font-medium text-slate-800">New Client Comment</h4>
                        <p className="text-sm text-slate-500">Get an email for every individual comment.</p>
                     </div>
                     <div className="w-11 h-6 bg-slate-200 rounded-full relative cursor-not-allowed">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                     </div>
                  </div>
               </CardContent>
            </Card>
         </div>

         <div className="lg:col-span-1">
            <Card className="border-indigo-100 shadow-md">
               <CardHeader className="pb-4">
                  <CardTitle className="flex justify-between items-center text-lg">
                     Subscription
                     <Badge variant="success" className="font-bold">Active</Badge>
                  </CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div>
                     <p className="text-sm text-slate-500">Current Plan</p>
                     <p className="text-2xl font-bold text-slate-800">Studio</p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                     <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Projects limit</span>
                        <span className="font-medium text-slate-800">Unlimited</span>
                     </div>
                     <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Billing cycle</span>
                        <span className="font-medium text-slate-800">Monthly ($79/mo)</span>
                     </div>
                  </div>
               </CardContent>
               <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => alert("Billing integration can be connected with Stripe later. This is a demo MVP.")}>
                     Manage Billing
                  </Button>
               </CardFooter>
            </Card>
         </div>
      </div>
    </div>
  );
}
