"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { store, Project } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, ExternalLink, Link2, Copy, FileIcon, MessageSquare } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default function DashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  useEffect(() => {
    setProjects(store.getProjects());
  }, []);

  const copyReviewLink = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const link = `${window.location.origin}/review/${id}`;
    navigator.clipboard.writeText(link);
    setCopiedLink(id);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Pending Review': return 'warning';
      case 'Changes Requested': return 'danger';
      case 'Approved': return 'success';
      default: return 'default';
    }
  };

  // Stats
  const totalProjects = projects.length;
  const pendingReview = projects.filter(p => p.status === 'Pending Review').length;
  const changesRequested = projects.filter(p => p.status === 'Changes Requested').length;
  const approved = projects.filter(p => p.status === 'Approved').length;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="hidden">
           <h2 className="text-2xl font-bold tracking-tight text-slate-900">Projects Overview</h2>
           <p className="text-slate-500">Manage your active projects and client approvals.</p>
        </div>
        <div className="ml-auto">
           <Link href="/dashboard/projects/new">
              <Button className="flex items-center gap-2">
                 <PlusCircle className="h-4 w-4" />
                 <span>Create Project</span>
              </Button>
           </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="p-5">
          <CardHeader className="p-0 pb-1">
            <CardTitle className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Projects</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-2xl font-bold text-slate-800">{totalProjects}</div>
          </CardContent>
        </Card>
        <Card className="p-5 border-l-4 border-l-yellow-400">
          <CardHeader className="p-0 pb-1">
            <CardTitle className="text-xs font-medium text-slate-500 uppercase tracking-wider">Pending Review</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-2xl font-bold text-slate-800">{pendingReview}</div>
          </CardContent>
        </Card>
        <Card className="p-5 border-l-4 border-l-orange-500">
          <CardHeader className="p-0 pb-1">
            <CardTitle className="text-xs font-medium text-slate-500 uppercase tracking-wider">Changes Req.</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-2xl font-bold text-slate-800">{changesRequested}</div>
          </CardContent>
        </Card>
        <Card className="p-5 border-l-4 border-l-emerald-500">
          <CardHeader className="p-0 pb-1">
            <CardTitle className="text-xs font-medium text-slate-500 uppercase tracking-wider">Approved</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-2xl font-bold text-slate-800">{approved}</div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
         <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-800">Recent Projects</h2>
            <button className="text-xs text-indigo-600 font-medium hover:underline">View All</button>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 font-bold border-b border-slate-100">
                  <tr>
                     <th className="px-6 py-3">Project Name</th>
                     <th className="px-6 py-3">Client</th>
                     <th className="px-6 py-3">Status</th>
                     <th className="px-6 py-3 hidden md:table-cell">Last Updated</th>
                     <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50 text-sm">
                  {projects.length === 0 ? (
                     <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                           No projects yet. Create your first review link.
                        </td>
                     </tr>
                  ) : projects.map((project) => (
                     <tr 
                        key={project.id} 
                        className="hover:bg-slate-50/50 transition-colors cursor-pointer"
                        onClick={() => router.push(`/dashboard/projects/${project.id}`)}
                     >
                        <td className="px-6 py-4 font-medium text-slate-800">
                           {project.name}
                        </td>
                        <td className="px-6 py-4 text-slate-600">{project.clientName}</td>
                        <td className="px-6 py-4">
                           <Badge variant={getStatusBadgeVariant(project.status)}>
                              {project.status}
                           </Badge>
                        </td>
                        <td className="px-6 py-4 text-slate-500 text-xs hidden md:table-cell">
                           {new Date(project.updatedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                           <Button 
                              variant="soft" 
                              size="xs" 
                              className="hidden sm:inline-flex"
                              onClick={(e) => copyReviewLink(project.id, e)}
                           >
                              {copiedLink === project.id ? "Copied!" : "Copy Link"}
                           </Button>
                           <Button variant="soft-secondary" size="xs" onClick={(e) => {
                             e.stopPropagation();
                             router.push(`/dashboard/projects/${project.id}`);
                           }}>
                             View
                           </Button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}
