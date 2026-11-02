export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
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
          avatar_url: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['profiles']['Row']>;
        Update: Partial<Database['public']['Tables']['profiles']['Row']>;
      };
      site_settings: {
        Row: {
          id: string;
          setting_key: string;
          setting_value: Json;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['site_settings']['Row']>;
        Update: Partial<Database['public']['Tables']['site_settings']['Row']>;
      };
      projects: {
        Row: {
          id: string;
          title: string;
          slug: string;
          short_description: string;
          full_description: string;
          category: string;
          cover_image: string;
          gallery_images: string[];
          technologies: string[];
          testing_coverage: string[];
          key_highlights: string[];
          github_url: string;
          demo_url: string;
          featured: boolean;
          published: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['projects']['Row']>;
        Update: Partial<Database['public']['Tables']['projects']['Row']>;
      };
      experiences: {
        Row: {
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
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['experiences']['Row']>;
        Update: Partial<Database['public']['Tables']['experiences']['Row']>;
      };
      skills: {
        Row: {
          id: string;
          name: string;
          category: string;
          display_order: number;
          proficiency_level: string;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['skills']['Row']>;
        Update: Partial<Database['public']['Tables']['skills']['Row']>;
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          status: 'unread' | 'read' | 'archived';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['contact_messages']['Row'], 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['contact_messages']['Row']>;
      };
    };
  };
}

