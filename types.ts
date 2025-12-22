
export interface Video {
  id: string;
  referenceId?: string; 
  title: string;
  description: string;
  thumbnailUrl: string;
  date?: string; // For chronological sorting
  views: string;
  uploadedAt?: string; 
  tags: string[];
  mediaType?: 'youtube' | 'spotify' | 'image' | 'video' | 'article' | 'audio' | 'iframe';
  linkUrl?: string;
  showLink?: boolean; // Toggle for "Source Reference" button visibility
  gallery?: string[]; // Multiple media support
}

export interface Song {
  id: string;
  title: string;
  album: string;
  duration: string;
  coverUrl: string;
  spotifyUrl: string;
  releaseYear: string;
  label?: string;
}

export interface Beat {
  id: string;
  title: string;
  bpm: number;
  musicalKey: string;
  tags: string[];
  leasePrice: number;
  exclusivePrice: number;
  coverUrl: string;
  audioUrl: string;
}

export interface PressRelease {
  id: string;
  title: string;
  outlet: string;
  date: string;
  url: string;
  snippet: string;
  imageUrl?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface ProjectUpdate {
    id: string;
    date: string;
    title: string;
    content: string;
}

export interface ProjectMedia {
    id: string;
    type: 'image' | 'video' | 'audio' | 'youtube' | 'spotify' | 'iframe';
    url: string;
    name?: string;
}

export interface Project {
    id: string;
    title: string;
    category: string;
    fundingGoal: string;
    raised: string;
    progress: number;
    description: string;
    status: string;
    valuation: string;
    equity: string;
    minCheck: string;
    lockup: string;
    // Contract Fields
    contractBody?: string;
    wiringInstructions?: string;
    isSigned?: boolean;
    signedDate?: string;
    signature?: string;
    committedAmount?: string;
    // Updates
    updates?: ProjectUpdate[];
    // Data Room
    media?: ProjectMedia[];
}

export interface InvestorProfile {
    id: string;
    name: string;
    email: string;
    accessKey: string;
    assignedProjectIds: string[];
    lastActive?: string;
}

export enum Tab {
  HOME = 'HOME',
  INCUBATOR = 'INCUBATOR',
  HOLLYWOOD = 'HOLLYWOOD',
  M3 = 'M3',
  ARCHITECT = 'ARCHITECT',
  CONTACT = 'CONTACT',
  PRESS = 'PRESS',
  ADMIN = 'ADMIN',
  INVESTOR_LOGIN = 'INVESTOR_LOGIN',
  // New Footer Tabs
  DISTRIBUTION = 'DISTRIBUTION',
  PUBLISHING = 'PUBLISHING',
  CREATIVE_DIRECTION = 'CREATIVE_DIRECTION',
  VISUAL_IDENTITY = 'VISUAL_IDENTITY',
  PRIVACY_POLICY = 'PRIVACY_POLICY',
  TERMS_OF_USE = 'TERMS_OF_USE',
  SUBMISSIONS = 'SUBMISSIONS',
  CAREERS = 'CAREERS'
}
