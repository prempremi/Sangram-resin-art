export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface VisitEvent {
  id: string;
  path: string;
  timestamp: string;
  device: 'mobile' | 'desktop' | 'tablet';
  referrer: string;
  city?: string;
}

export interface AnalyticsData {
  totalVisitors: number;
  pageViews: number;
  recentVisits: VisitEvent[];
  deviceBreakdown: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
  topPages: {
    path: string;
    count: number;
  }[];
}

export interface CustomGalleryItem {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  image: string;
  caption: string;
  isPrivate: boolean;
  createdAt: string;
  uploadedBy?: string;
}
