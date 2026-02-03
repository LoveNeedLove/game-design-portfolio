export interface MediaItem {
  type: 'youtube' | 'video' | 'image' | 'iframe';
  url: string;
  thumbnail?: string;
}

export interface TeamMember {
  count: number;
  role: string;
}

export interface ContentBlock {
  type: 'text' | 'heading' | 'list' | 'image';
  content?: string;
  items?: string[];
  url?: string;
  size?: 'full' | 'large' | 'medium' | 'small';
  align?: 'left' | 'center' | 'right';
  variant?: 'accent' | 'quote' | 'highlight';
}

export interface Task {
  title: string;
  description: string;
  illustrations?: MediaItem[];
  content?: ContentBlock[];
}

export interface Project {
  id: string;
  featured: boolean;
  title: string;
  description: string;
  shortDescription: string;
  date: string;
  developmentTime: string;
  genres: string[];
  roles: string[];
  teamSize: TeamMember[];
  mission: string;
  tasks: Task[];
  challenge: string;
  solution: string;
  coverImage: string;
  overlayColor: string;
  bannerColor: string;
  featuredTextColor: string;
  secondaryTextColor: string;
  mediaList: MediaItem[];
  linkUrl?: string;
  linkTitle?: string;
}
