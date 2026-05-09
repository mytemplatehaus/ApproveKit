"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { store, Project } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Copy, ExternalLink, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function CreateProjectPage() {
  const router = useRouter();
  const [createdProject, setCreatedProject] = useState<Project | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    clientName: "",
    clientEmail: "",
    type: "Video Edit",
    deadline: "",
    notes: "",
    fileUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      ...formData,
      status: 'Pending Review',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    store.saveProject(newProject);
    setCreatedProject(newProject);
  };

  if (createdProject) {
    const reviewLink = `${window.location.origin}/review/${createdProject.id}`;
    
    return (
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center gap-2 mb-8">
           <Link href="/dashboard" className="text-slate-500 hover:text-slate-900">
               <ArrowLeft className="h-5 w-5" />
           </Link>
           <h2 className="text-2xl font-bold tracking-tight text-slate-800">Project Created</h2>
        </div>

        <Card className="bg-emerald-50 border-emerald-200">
          <CardContent className="p-8 text-center flex flex-col items-center">
            <CheckCircle2 className="h-16 w-16 text-emerald-500 mb-6" />
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Your review link is ready!</h3>
            <p className="text-slate-600 mb-8 max-w-md">
              Send this private link to {createdProject.clientName}. They can review the work and leave feedback without creating an account.
            </p>
            
            <div className="w-full max-w-lg mb-8">
               <div className="flex mt-2 rounded-lg shadow-sm">
                 <div className="relative flex flex-grow items-stretch focus-within:z-10">
                   <input
                     type="text"
                     readOnly
                     className="block w-full rounded-none rounded-l-lg border-0 py-3 pl-4 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                     value={reviewLink}
                   />
                 </div>
                 <button
                   type="button"
                   onClick={() => {
                      navigator.clipboard.writeText(reviewLink);
                      alert("Link copied to clipboard!");
                   }}
                   className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-lg px-4 py-2 text-sm font-semibold text-slate-900 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 bg-white"
                 >
                   <Copy className="-ml-0.5 h-4 w-4 text-slate-400" />
                   Copy Link
                 </button>
               </div>
            </div>

            <div className="flex gap-4">
              <Button onClick={() => window.open(reviewLink, '_blank')} variant="outline" className="gap-2">
                <ExternalLink className="h-4 w-4" /> Open Review Page
              </Button>
              <Button onClick={() => router.push(`/dashboard/projects/${createdProject.id}`)}>
                Back to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <div className="flex items-center gap-2 mb-2">
         <Link href="/dashboard" className="text-slate-500 hover:text-slate-900">
             <ArrowLeft className="h-5 w-5" />
         </Link>
         <h2 className="text-2xl font-bold tracking-tight text-slate-800">Create New Project</h2>
      </div>
      <p className="text-slate-500">Create a new review portal for your client.</p>

      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
          <CardDescription>Enter the details for the work you want to be approved.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Project Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="e.g. Q3 Social Videos" 
                  required 
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Project Type</Label>
                <select 
                  id="type"
                  name="type"
                  className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option>Video Edit</option>
                  <option>Website Design</option>
                  <option>Thumbnail Design</option>
                  <option>Social Media Content</option>
                  <option>Branding</option>
                  <option>Other</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name</Label>
                <Input 
                  id="clientName" 
                  name="clientName" 
                  placeholder="e.g. John Smith" 
                  required 
                  value={formData.clientName}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="clientEmail">Client Email</Label>
                <Input 
                  id="clientEmail" 
                  name="clientEmail" 
                  type="email" 
                  placeholder="john@example.com" 
                  required 
                  value={formData.clientEmail}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fileUrl">File URL (Figma, Frame.io, Google Drive, Vercel, etc.)</Label>
              <Input 
                id="fileUrl" 
                name="fileUrl" 
                type="url" 
                placeholder="https://..." 
                value={formData.fileUrl}
                onChange={handleChange}
              />
               <p className="text-xs text-slate-500">Provide a link to the work you want reviewed.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline</Label>
              <Input 
                id="deadline" 
                name="deadline" 
                type="date" 
                required 
                value={formData.deadline}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes for client</Label>
              <Textarea 
                id="notes" 
                name="notes" 
                placeholder="e.g. Please review the pacing of the first 30 seconds." 
                value={formData.notes}
                onChange={handleChange}
              />
            </div>

            <div className="pt-4 flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => router.push('/dashboard')}>Cancel</Button>
              <Button type="submit">Create Review Link</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
