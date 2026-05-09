"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { store, Project, Comment as ProjectComment } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Copy, ExternalLink, Calendar, User, FileIcon, Clock, Trash2, CheckCircle2, RotateCcw } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [project, setProject] = useState<Project | null>(null);
  const [comments, setComments] = useState<ProjectComment[]>([]);

  useEffect(() => {
    if (id) {
      const p = store.getProject(id);
      if (p) {
        setProject(p);
        setComments(store.getComments(id));
      } else {
        router.push('/dashboard');
      }
    }
  }, [id, router]);

  if (!project) return <div className="p-8 text-center">Loading...</div>;

  const reviewLink = typeof window !== 'undefined' ? `${window.location.origin}/review/${project.id}` : '';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(reviewLink);
    alert("Link copied!");
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this project?")) {
      store.deleteProject(project.id);
      router.push('/dashboard');
    }
  };

  const handleStatusChange = (newStatus: 'Pending Review' | 'Changes Requested' | 'Approved') => {
    const updated = { ...project, status: newStatus };
    store.saveProject(updated);
    setProject(updated);
    
    // Add system comment for history
    store.addComment({
       id: `comment-${Date.now()}`,
       projectId: project.id,
       authorName: 'System',
       text: `Agency marked project as ${newStatus}`,
       createdAt: new Date().toISOString(),
       isStatusChange: true
    });
    setComments(store.getComments(project.id));
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Pending Review': return 'warning';
      case 'Changes Requested': return 'danger';
      case 'Approved': return 'success';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center gap-2 mb-2">
         <Link href="/dashboard" className="text-slate-500 hover:text-slate-900">
             <ArrowLeft className="h-5 w-5" />
         </Link>
         <h2 className="text-2xl font-bold tracking-tight text-slate-800">Project Details</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle className="text-2xl mb-1">{project.name}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                   <Badge variant={getStatusBadgeVariant(project.status)}>
                     {project.status}
                   </Badge>
                   <span>•</span>
                   <span>{project.type}</span>
                </div>
              </div>
              <div className="flex gap-2">
                 <Button variant="soft" size="xs" onClick={handleCopyLink} className="hidden sm:inline-flex items-center gap-2">
                   <Copy className="h-4 w-4" /> Copy Link
                 </Button>
                 <Button variant="soft-secondary" size="xs" onClick={() => window.open(reviewLink, '_blank')} className="hidden sm:inline-flex items-center gap-2">
                   <ExternalLink className="h-4 w-4" /> Open Review
                 </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-4 border-t border-slate-100 mt-4">
               <div>
                  <h4 className="text-sm font-semibold text-slate-800 mb-2">Work File/Link</h4>
                  {project.fileUrl ? (
                     <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-center gap-3">
                           <FileIcon className="h-8 w-8 text-indigo-500" />
                           <a href={project.fileUrl} target="_blank" rel="noreferrer" className="text-indigo-600 font-medium hover:underline break-all">
                              {project.fileUrl}
                           </a>
                        </div>
                     </div>
                  ) : (
                     <p className="text-sm text-slate-500 italic">No file URL provided.</p>
                  )}
               </div>
               
               <div>
                  <h4 className="text-sm font-semibold text-slate-800 mb-2">Notes to Client</h4>
                  <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-700 whitespace-pre-wrap border border-slate-200">
                     {project.notes || "No notes provided."}
                  </div>
               </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
               <CardTitle>Comments & History</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="space-y-6">
                  {comments.length === 0 ? (
                     <p className="text-sm text-slate-500 text-center py-8">No comments or activity yet.</p>
                  ) : (
                     comments.sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()).map(comment => (
                        <div key={comment.id} className="flex gap-4">
                           <div className="shrink-0 mt-1">
                              {comment.isStatusChange ? (
                                 <div className="h-8 w-8 rounded-full bg-yellow-100 text-yellow-700 border border-yellow-200 flex items-center justify-center">
                                    <Clock className="h-4 w-4" />
                                 </div>
                              ) : (
                                 <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs ${comment.authorName === 'System' ? 'bg-slate-200 text-slate-600' : 'bg-indigo-100 text-indigo-700 border border-indigo-200'}`}>
                                    {comment.authorName.charAt(0)}
                                 </div>
                              )}
                           </div>
                           <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                 <span className="font-semibold text-sm text-slate-800">{comment.authorName}</span>
                                 <span className="text-xs text-slate-500">{formatDistanceToNow(new Date(comment.createdAt))} ago</span>
                                 {comment.isStatusChange && <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Status Update</Badge>}
                              </div>
                              <div className={`text-sm ${comment.isStatusChange ? 'text-slate-500 italic' : 'text-slate-700 bg-slate-50 p-3 rounded-b-lg rounded-tr-lg inline-block border border-slate-200'}`}>
                                 {comment.text}
                              </div>
                           </div>
                        </div>
                     ))
                  )}
               </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-80 space-y-6 shrink-0">
          <Card>
            <CardHeader>
               <CardTitle className="text-lg">Project Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                     <p className="text-sm font-medium text-slate-800">{project.clientName}</p>
                     <p className="text-xs text-slate-500">{project.clientEmail}</p>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-slate-400 shrink-0" />
                  <div>
                     <p className="text-xs text-slate-500">Deadline</p>
                     <p className="text-sm font-medium text-slate-800">{new Date(project.deadline).toLocaleDateString()}</p>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-slate-400 shrink-0" />
                  <div>
                     <p className="text-xs text-slate-500">Created</p>
                     <p className="text-sm font-medium text-slate-800">{new Date(project.createdAt).toLocaleDateString()}</p>
                  </div>
               </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
               <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
               <div className="grid grid-cols-2 gap-2 mb-4 md:hidden">
                  <Button variant="soft" size="xs" onClick={handleCopyLink} className="w-full">
                   <Copy className="h-4 w-4 mr-2" /> Link
                 </Button>
                 <Button variant="soft-secondary" size="xs" onClick={() => window.open(reviewLink, '_blank')} className="w-full">
                   <ExternalLink className="h-4 w-4 mr-2" /> Review
                 </Button>
               </div>
               
               <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Change Status</p>
               <Button 
                  variant="outline" 
                  className="w-full justify-start text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 border-emerald-200"
                  onClick={() => handleStatusChange('Approved')}
               >
                  <CheckCircle2 className="h-4 w-4 mr-2" /> Mark as Approved
               </Button>
               <Button 
                  variant="outline" 
                  className="w-full justify-start text-orange-600 hover:text-orange-700 hover:bg-orange-50 border-orange-200"
                  onClick={() => handleStatusChange('Changes Requested')}
               >
                  <RotateCcw className="h-4 w-4 mr-2" /> Mark as Changes Requested
               </Button>
               
               <div className="mt-8 pt-6 border-t border-slate-100">
                  <Button 
                     variant="ghost" 
                     className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                     onClick={handleDelete}
                  >
                     <Trash2 className="h-4 w-4 mr-2" /> Delete Project
                  </Button>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
