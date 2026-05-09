export interface Project {
  id: string;
  name: string;
  clientName: string;
  clientEmail: string;
  type: string;
  status: 'Pending Review' | 'Changes Requested' | 'Approved';
  deadline: string;
  notes: string;
  fileUrl?: string; // Optional for now
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  projectId: string;
  authorName: string;
  text: string;
  createdAt: string;
  isStatusChange?: boolean;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  projectsCount: number;
  latestStatus: string;
}

export interface User {
  name: string;
  email: string;
  agencyName: string;
}

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'YouTube Intro Edit',
    clientName: 'Sarah Johnson',
    clientEmail: 'sarah@example.com',
    type: 'Video Edit',
    status: 'Pending Review',
    deadline: '2026-05-20',
    notes: 'Please review the intro pacing and captions.',
    fileUrl: 'https://example.com/video.mp4',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj-2',
    name: 'Homepage Design Mockup',
    clientName: 'Mike Adams',
    clientEmail: 'mike@example.com',
    type: 'Website Design',
    status: 'Changes Requested',
    deadline: '2026-05-25',
    notes: 'Review the hero section and pricing layout.',
    fileUrl: 'https://example.com/design.fig',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj-3',
    name: 'Podcast Clips Batch',
    clientName: 'Emma Wilson',
    clientEmail: 'emma@example.com',
    type: 'Social Media Content',
    status: 'Approved',
    deadline: '2026-05-18',
    notes: 'Review the short-form clips for Instagram and TikTok.',
    fileUrl: 'https://example.com/clips.zip',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const INITIAL_COMMENTS: Comment[] = [
  {
    id: 'comment-1',
    projectId: 'proj-1',
    authorName: 'Sarah Johnson',
    text: 'Could we make the transition at 0:05 a bit faster?',
    createdAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'comment-2',
    projectId: 'proj-2',
    authorName: 'Mike Adams',
    text: 'Please make the logo bigger and change the accent color to blue.',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    isStatusChange: true
  }
];

export const store = {
  getProjects: (): Project[] => {
    if (typeof window === 'undefined') return INITIAL_PROJECTS;
    const stored = localStorage.getItem('approvekit_projects');
    if (!stored) {
      localStorage.setItem('approvekit_projects', JSON.stringify(INITIAL_PROJECTS));
      return INITIAL_PROJECTS;
    }
    return JSON.parse(stored);
  },
  saveProject: (project: Project) => {
    if (typeof window === 'undefined') return;
    const projects = store.getProjects();
    const existingIndex = projects.findIndex(p => p.id === project.id);
    if (existingIndex >= 0) {
      projects[existingIndex] = { ...project, updatedAt: new Date().toISOString() };
    } else {
      projects.push(project);
    }
    localStorage.setItem('approvekit_projects', JSON.stringify(projects));
  },
  deleteProject: (id: string) => {
    if (typeof window === 'undefined') return;
    const projects = store.getProjects().filter(p => p.id !== id);
    localStorage.setItem('approvekit_projects', JSON.stringify(projects));
  },
  getProject: (id: string): Project | undefined => {
    return store.getProjects().find(p => p.id === id);
  },
  getComments: (projectId: string): Comment[] => {
    if (typeof window === 'undefined') return INITIAL_COMMENTS.filter(c => c.projectId === projectId);
    const stored = localStorage.getItem(`approvekit_comments`);
    if (!stored) {
      localStorage.setItem(`approvekit_comments`, JSON.stringify(INITIAL_COMMENTS));
      return INITIAL_COMMENTS.filter(c => c.projectId === projectId);
    }
    return JSON.parse(stored).filter((c: Comment) => c.projectId === projectId);
  },
  addComment: (comment: Comment) => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('approvekit_comments');
    const comments: Comment[] = stored ? JSON.parse(stored) : INITIAL_COMMENTS;
    comments.push(comment);
    localStorage.setItem('approvekit_comments', JSON.stringify(comments));
  },
  getClients: (): Client[] => {
    const projects = store.getProjects();
    const clientMap = new Map<string, Client>();
    
    projects.forEach(p => {
      if (clientMap.has(p.clientEmail)) {
        const client = clientMap.get(p.clientEmail)!;
        client.projectsCount += 1;
        client.latestStatus = p.status;
      } else {
        clientMap.set(p.clientEmail, {
          id: p.clientEmail,
          name: p.clientName,
          email: p.clientEmail,
          projectsCount: 1,
          latestStatus: p.status
        });
      }
    });
    
    return Array.from(clientMap.values());
  },
  getUser: (): User => {
    if (typeof window === 'undefined') return { name: 'Demo User', email: 'demo@approvekit.com', agencyName: 'Creative Agency Studio' };
    const stored = localStorage.getItem('approvekit_user');
    if (!stored) return { name: 'Demo User', email: 'demo@approvekit.com', agencyName: 'Creative Agency Studio' };
    return JSON.parse(stored);
  },
  setUser: (user: User) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('approvekit_user', JSON.stringify(user));
  }
};
