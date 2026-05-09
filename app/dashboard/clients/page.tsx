"use client";

import { useState, useEffect } from "react";
import { store, Client } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    setClients(store.getClients());
  }, []);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Pending Review': return 'warning';
      case 'Changes Requested': return 'danger';
      case 'Approved': return 'success';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-8">
      <div>
         <h2 className="text-2xl font-bold tracking-tight text-slate-800">Clients</h2>
         <p className="text-slate-500">Manage your clients and view their activity.</p>
      </div>

      <Card>
         <CardHeader>
            <CardTitle>Client Directory</CardTitle>
            <CardDescription>A list of all clients who have at least one project.</CardDescription>
         </CardHeader>
         <CardContent className="p-0">
            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 font-bold border-b border-slate-100">
                     <tr>
                        <th className="px-6 py-3">Client Name</th>
                        <th className="px-6 py-3 hidden sm:table-cell">Email</th>
                        <th className="px-6 py-3 text-center">Projects</th>
                        <th className="px-6 py-3 text-right">Latest Status</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 text-sm">
                     {clients.length === 0 ? (
                        <tr>
                           <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                              No clients yet. Create a project to add a client.
                           </td>
                        </tr>
                     ) : clients.map((client) => (
                        <tr key={client.id} className="hover:bg-slate-50/50 transition-colors">
                           <td className="px-6 py-4">
                              <div className="font-medium text-slate-800">{client.name}</div>
                              <div className="text-slate-500 text-xs mt-1 sm:hidden">{client.email}</div>
                           </td>
                           <td className="px-6 py-4 text-slate-600 hidden sm:table-cell">{client.email}</td>
                           <td className="px-6 py-4 text-center font-medium text-slate-800">
                              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-xs">
                                 {client.projectsCount}
                              </span>
                           </td>
                           <td className="px-6 py-4 text-right">
                              <Badge variant={getStatusBadgeVariant(client.latestStatus)}>
                                 {client.latestStatus}
                              </Badge>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </CardContent>
      </Card>
    </div>
  );
}
