export interface MediaItem {
  type: 'youtube' | 'video' | 'image' | 'iframe' | 'slideshow';
  url: string;
  thumbnail?: string;
  // For slideshow type
  images?: string[];
  title?: string;
}

export interface TeamMember {
  count: number;
  role: string;
}

export interface ContentBlock {
  type: 'text' | 'heading' | 'list' | 'image' | 'separator' | 'slideshow';
  content?: string;
  items?: string[];
  url?: string;
  images?: string[]; // For slideshow type
  title?: string; // For slideshow type
  size?: 'full' | 'large' | 'medium' | 'small';
  align?: 'left' | 'center' | 'right';
  textAlign?: 'left' | 'center' | 'right';
  variant?: 'accent' | 'quote' | 'highlight';
  group?: string; // Group ID to link blocks together in a row
  groupStack?: string; // Stack ID to create vertical columns within a group
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
