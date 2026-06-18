export interface Project {
  id: string;
  title: string;
  topic: string;
  language: string;
  length: string; // 'shorts' | 'medium' | 'long'
  voiceType: string;
  style: string;
  createdAt: string;
  status: 'draft' | 'completed' | 'generating' | 'failed';
  script?: ScriptData;
  scenes?: Scene[];
  audioUrl?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  seo?: SEOData;
}

export interface ScriptData {
  hook: string;
  intro: string;
  body: string;
  outro: string;
  cta: string;
}

export interface Scene {
  id: string;
  sceneNumber: number;
  narrative: string;
  imagePrompt: string;
  imageUrl?: string;
  voiceoverUrl?: string;
  duration: number; // in seconds
  subtitles: { text: string; start: number; end: number }[];
}

export interface SEOData {
  titles: string[];
  description: string;
  tags: string[];
  hashtags: string[];
}

export interface ThumbnailLayer {
  id: string;
  type: 'text' | 'image' | 'sticker';
  content: string;
  x: number;
  y: number;
  fontSize?: number;
  color?: string;
  bgColor?: string;
}

export interface UserSettings {
  geminiKey: string;
  openRouterKey: string;
  huggingFaceKey: string;
}

export interface UserProfile {
  email: string;
  isLoggedIn: boolean;
  name?: string;
}
