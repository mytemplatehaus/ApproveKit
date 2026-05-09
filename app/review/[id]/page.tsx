"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { store, Project, Comment as ProjectComment } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, RotateCcw, Send, FileIcon, MessageSquare, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function ClientReviewPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [project, setProject] = useState<Project | null>(null);
  const [comments, setComments] = useState<ProjectComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [clientName, setClientName] = useState("");
  const [feedbackSuccess, setFeedbackSuccess] = useState("");

  useEffect(() => {
    if (id) {
      const p = store.getProject(id);
      if (p) {
        setProject(p);
        setClientName(p.clientName);
        setComments(store.getComments(id));
      }
    }
  }, [id]);

  if (!project) return (
     <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center p-8 border-slate-200">
           <h2 className="text-xl font-bold text-slate-800 mb-2">Project Not Found</h2>
           <p className="text-slate-500">This review link may be invalid or the project was deleted.</p>
        </Card>
     </div>
  );

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Pending Review': return 'warning';
      case 'Changes Requested': return 'danger';
      case 'Approved': return 'success';
      default: return 'default';
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !clientName.trim()) return;

    const comment: ProjectComment = {
       id: `comment-${Date.now()}`,
       projectId: project.id,
       authorName: clientName,
       text: newComment,
       createdAt: new Date().toISOString()
    };
    store.addComment(comment);
    setComments(store.getComments(project.id));
    setNewComment("");
  };

  const handleDecision = (decision: 'Approved' | 'Changes Requested') => {
     if (!clientName.trim()) {
        alert("Please enter your name below before making a decision.");
        return;
     }

     const updated = { ...project, status: decision };
     store.saveProject(updated);
     setProject(updated);

     const msg = decision === 'Approved' ? 'Client approved the project.' : 'Client requested changes.';
     store.addComment({
       id: `comment-${Date.now()}`,
       projectId: project.id,
       authorName: clientName,
       text: msg,
       createdAt: new Date().toISOString(),
       isStatusChange: true
    });
    setComments(store.getComments(project.id));
    setFeedbackSuccess(`Success! The project has been marked as ${decision}.`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
               <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white">
                  A
               </div>
               <div>
                  <span className="font-bold text-slate-900 tracking-tight block leading-tight">ApproveKit</span>
                  <span className="text-[10px] text-slate-500 tracking-wider uppercase">Client Portal</span>
               </div>
            </div>
            
            <div className="flex flex-col items-end">
               <span className="text-xs text-slate-500">Current Status</span>
               <Badge variant={getStatusBadgeVariant(project.status)}>
                  {project.status}
               </Badge>
            </div>
         </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
         {feedbackSuccess && (
            <div className="mb-8 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-3">
               <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
               <div>
                  <h3 className="font-semibold text-emerald-900">Feedback Submitted</h3>
                  <p className="text-emerald-700 text-sm mt-1">{feedbackSuccess}</p>
               </div>
            </div>
         )}
         
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
               
               <div className="space-y-4">
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900">{project.name}</h1>
                  <p className="text-slate-500">Review the details below and leave your feedback or approve the project.</p>
               </div>

               <Card className="overflow-hidden border-2 border-slate-200 shadow-lg">
                 {project.fileUrl ? (
                    <div className="aspect-video bg-slate-100 flex flex-col items-center justify-center p-8 text-center border-b border-slate-200">
                       <FileIcon className="h-16 w-16 text-slate-400 mb-4" />
                       <h3 className="text-lg font-medium text-slate-900 mb-2">Review File</h3>
                       <p className="text-slate-500 mb-6 max-w-sm text-sm">Click below to open the file, design, or video link provided by your agency.</p>
                       <a href={project.fileUrl} target="_blank" rel="noreferrer">
                         <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md">Open Review Link <ExternalLink className="ml-2 h-4 w-4" /></Button>
                       </a>
                    </div>
                 ) : (
                    <div className="aspect-video bg-slate-100 flex items-center justify-center p-8 border-b border-slate-200">
                       <p className="text-slate-500">No review link provided.</p>
                    </div>
                 )}
                 <div className="p-6 bg-white">
                    <h4 className="font-semibold text-slate-900 mb-2">Agency Notes</h4>
                    <p className="text-slate-700 whitespace-pre-wrap text-sm">{project.notes || "No additional notes."}</p>
                 </div>
               </Card>

               <Card id="comments">
                 <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                       <MessageSquare className="h-5 w-5 text-slate-500" /> Activity & Comments
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <div className="space-y-6 mb-8">
                      {comments.length === 0 ? (
                         <p className="text-sm text-slate-500 text-center py-4">No comments yet.</p>
                      ) : (
                         comments.sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()).map(comment => (
                            <div key={comment.id} className="flex gap-4">
                               <div className="shrink-0 mt-1">
                                  {comment.isStatusChange ? (
                                     <div className="h-8 w-8 rounded-full bg-yellow-100 text-yellow-700 border border-yellow-200 flex items-center justify-center">
                                        <RotateCcw className="h-4 w-4" />
                                     </div>
                                  ) : (
                                     <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs ${comment.authorName === clientName ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' : 'bg-slate-200 text-slate-700'}`}>
                                        {comment.authorName.charAt(0) || '?'}
                                     </div>
                                  )}
                               </div>
                               <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                     <span className="font-semibold text-sm text-slate-900">{comment.authorName}</span>
                                     <span className="text-xs text-slate-500">{formatDistanceToNow(new Date(comment.createdAt))} ago</span>
                                  </div>
                                  <div className={`text-sm ${comment.isStatusChange ? 'text-slate-500 italic' : 'text-slate-700 bg-slate-50 p-3 rounded-b-lg rounded-tr-lg inline-block border border-slate-200 shadow-sm'}`}>
                                     {comment.text}
                                  </div>
                               </div>
                            </div>
                         ))
                      )}
                    </div>

                    <form onSubmit={handleAddComment} className="border-t border-slate-100 pt-6 mt-6 space-y-4">
                       <div className="space-y-2">
                          <Label htmlFor="clientName" className="text-slate-700">Your Name</Label>
                          <Input 
                             id="clientName" 
                             value={clientName} 
                             onChange={(e) => setClientName(e.target.value)} 
                             required 
                             className="max-w-xs border-slate-300 focus:ring-indigo-600 text-slate-900"
                          />
                       </div>
                       <div className="space-y-2">
                          <Label htmlFor="comment" className="text-slate-700">Leave a Comment</Label>
                          <Textarea 
                             id="comment" 
                             placeholder="Add your feedback, specific timestamps, or questions here..." 
                             value={newComment}
                             onChange={(e) => setNewComment(e.target.value)}
                             required
                             className="border-slate-300 focus:ring-indigo-600 text-slate-900"
                          />
                       </div>
                       <div className="flex justify-end">
                          <Button type="submit" variant="soft-secondary" className="gap-2">
                             <Send className="h-4 w-4" /> Post Comment
                          </Button>
                       </div>
                    </form>
                 </CardContent>
               </Card>
            </div>

            <div className="lg:col-span-1">
               <Card className="sticky top-24 shadow-lg border-indigo-100">
                  <CardHeader className="bg-indigo-50/50 pb-4 border-b border-indigo-50">
                     <CardTitle className="text-lg text-indigo-900">Make a Decision</CardTitle>
                     <CardDescription className="text-indigo-700/70">Are you happy with the work or do you need changes?</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                     <Button 
                        size="lg" 
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-14 text-base shadow-md shadow-emerald-600/20"
                        onClick={() => handleDecision('Approved')}
                        disabled={project.status === 'Approved'}
                     >
                        <CheckCircle2 className="mr-2 h-5 w-5" /> 
                        {project.status === 'Approved' ? 'Already Approved' : 'Approve Project'}
                     </Button>
                     
                     <div className="relative py-2">
                       <div className="absolute inset-0 flex items-center" aria-hidden="true">
                         <div className="w-full border-t border-slate-200" />
                       </div>
                       <div className="relative flex justify-center text-xs font-bold leading-6 tracking-widest text-slate-400">
                         <span className="bg-white px-2">OR</span>
                       </div>
                     </div>

                     <Button 
                        size="lg" 
                        variant="soft-secondary" 
                        className="w-full border border-orange-200 text-orange-700 hover:bg-orange-50 h-14 text-base"
                        onClick={() => handleDecision('Changes Requested')}
                     >
                        <RotateCcw className="mr-2 h-5 w-5" /> Request Changes
                     </Button>
                     
                     <p className="text-xs text-slate-500 text-center mt-4 font-medium leading-relaxed">
                        By clicking either button, the agency will be notified instantly of your decision.
                     </p>
                  </CardContent>
               </Card>
            </div>
         </div>
      </main>
    </div>
  );
}
