export interface Profile {
  id: string;
  full_name: string;
  professional_title: string;
  tagline: string;
  headline: string;
  bio: string;
  current_role: string;
  career_direction: string;
  email: string;
  linkedin_url: string;
  github_url: string;
  resume_url: string;
  availability_status: string;
  avatar_url?: string;
}

export interface MetricItem {
  label: string;
  value: string;
  description?: string;
}

export interface HeroSettings {
  main_headline: string;
  sub_headline: string;
  primary_cta_text: string;
  primary_cta_link: string;
  secondary_cta_text: string;
  secondary_cta_link: string;
  availability_status: string;
  enable_ambient_canvas: boolean;
  metrics: MetricItem[];
}

export interface AboutSettings {
  heading: string;
  subheading: string;
  paragraphs: string[];
  statistics: MetricItem[];
  philosophy_pillars: {
    title: string;
    description: string;
  }[];
}

export interface NavLinkItem {
  label: string;
  href: string;
}

export interface HeaderSettings {
  logo_text: string;
  logo_badge: string;
  nav_links: NavLinkItem[];
  resume_button_text: string;
  resume_url: string;
}

export interface SEOSettings {
  meta_title: string;
  meta_description: string;
  keywords: string;
  og_image: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  category: string;
  cover_image: string;
  gallery_images?: string[];
  technologies: string[];
  testing_coverage: string[];
  key_highlights: string[];
  github_url: string;
  demo_url: string;
  featured: boolean;
  published: boolean;
  display_order: number;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  employment_type: string;
  start_date: string;
  end_date: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
  is_current: boolean;
  display_order: number;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  display_order: number;
  proficiency_level: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'archived';
  created_at: string;
}

export type SkillCategory =
  | 'Automation Testing'
  | 'Manual Testing'
  | 'API Testing'
  | 'Mobile Testing'
  | 'Programming Languages'
  | 'Frontend Development'
  | 'Backend Development'
  | 'DevOps & CI/CD'
  | 'Monitoring & Infrastructure'
  | 'Database Technologies';

