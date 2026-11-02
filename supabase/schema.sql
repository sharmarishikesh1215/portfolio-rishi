-- ==============================================================================
-- SUPABASE SCHEMA: Premium Software Quality Engineer Portfolio (Rishi)
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL DEFAULT 'Rishi',
    professional_title TEXT NOT NULL DEFAULT 'Software Quality Engineer | Automation Engineer',
    tagline TEXT NOT NULL DEFAULT 'Building confidence in every release.',
    headline TEXT NOT NULL DEFAULT 'I don''t just test software. I engineer quality.',
    bio TEXT NOT NULL DEFAULT 'Software Quality Assurance Engineer experienced in manual testing, automation engineering, API testing, mobile testing, and infrastructure-level validation. Passionate about building reliable applications, scalable automation frameworks, and efficient testing solutions.',
    "current_role" TEXT DEFAULT 'Software QA Engineer - Frugal Testing',
    current_position TEXT DEFAULT 'Software QA Engineer - Frugal Testing',
    career_direction TEXT DEFAULT 'SDET / Automation Engineer / Software Development Engineer',
    email TEXT DEFAULT 'sharmarishikesh12.15@gmail.com',
    linkedin_url TEXT DEFAULT 'https://linkedin.com/in/rishi-sqe',
    github_url TEXT DEFAULT 'https://github.com/sharmarishikesh1215',
    resume_url TEXT DEFAULT '/resume.pdf',
    availability_status TEXT DEFAULT 'Available for SDET & Quality Engineering Roles',
    avatar_url TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. SITE SETTINGS TABLE (Key-Value JSON store for Hero, About, SEO, etc.)
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    setting_key TEXT UNIQUE NOT NULL,
    setting_value JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Automation Testing',
    cover_image TEXT DEFAULT '',
    gallery_images JSONB DEFAULT '[]'::jsonb,
    technologies JSONB NOT NULL DEFAULT '[]'::jsonb,
    testing_coverage JSONB NOT NULL DEFAULT '[]'::jsonb,
    key_highlights JSONB DEFAULT '[]'::jsonb,
    github_url TEXT DEFAULT '',
    demo_url TEXT DEFAULT '',
    featured BOOLEAN DEFAULT true,
    published BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. EXPERIENCES TABLE
CREATE TABLE IF NOT EXISTS public.experiences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company TEXT NOT NULL,
    role TEXT NOT NULL,
    employment_type TEXT DEFAULT 'Full-time',
    start_date TEXT NOT NULL,
    end_date TEXT DEFAULT 'Present',
    description TEXT NOT NULL,
    responsibilities JSONB NOT NULL DEFAULT '[]'::jsonb,
    technologies JSONB NOT NULL DEFAULT '[]'::jsonb,
    achievements JSONB DEFAULT '[]'::jsonb,
    is_current BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. SKILLS TABLE
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    proficiency_level TEXT DEFAULT 'Advanced',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT skills_name_category_key UNIQUE (name, category)
);

-- 6. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread', -- 'unread', 'read', 'archived'
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- INDEXES for fast retrieval
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_published ON public.projects(published);
CREATE INDEX IF NOT EXISTS idx_projects_order ON public.projects(display_order);
CREATE INDEX IF NOT EXISTS idx_experiences_order ON public.experiences(display_order);
CREATE INDEX IF NOT EXISTS idx_skills_category ON public.skills(category);
CREATE INDEX IF NOT EXISTS idx_skills_order ON public.skills(display_order);
CREATE INDEX IF NOT EXISTS idx_messages_status ON public.contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_messages_created ON public.contact_messages(created_at DESC);

-- Automatic updated_at trigger function
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_profiles_modtime ON public.profiles;
CREATE TRIGGER update_profiles_modtime
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_modified_column();

DROP TRIGGER IF EXISTS update_settings_modtime ON public.site_settings;
CREATE TRIGGER update_settings_modtime
    BEFORE UPDATE ON public.site_settings
    FOR EACH ROW EXECUTE FUNCTION update_modified_column();

DROP TRIGGER IF EXISTS update_projects_modtime ON public.projects;
CREATE TRIGGER update_projects_modtime
    BEFORE UPDATE ON public.projects
    FOR EACH ROW EXECUTE FUNCTION update_modified_column();

DROP TRIGGER IF EXISTS update_experiences_modtime ON public.experiences;
CREATE TRIGGER update_experiences_modtime
    BEFORE UPDATE ON public.experiences
    FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- 1. Profiles
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone."
    ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can update profiles." ON public.profiles;
CREATE POLICY "Admins can update profiles."
    ON public.profiles FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 2. Site Settings
DROP POLICY IF EXISTS "Public settings are viewable by everyone." ON public.site_settings;
CREATE POLICY "Public settings are viewable by everyone."
    ON public.site_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage site settings." ON public.site_settings;
CREATE POLICY "Admins can manage site settings."
    ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 3. Projects
DROP POLICY IF EXISTS "Published projects are viewable by everyone." ON public.projects;
CREATE POLICY "Published projects are viewable by everyone."
    ON public.projects FOR SELECT USING (published = true);

DROP POLICY IF EXISTS "Admins have full access to projects." ON public.projects;
CREATE POLICY "Admins have full access to projects."
    ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 4. Experiences
DROP POLICY IF EXISTS "Experiences are viewable by everyone." ON public.experiences;
CREATE POLICY "Experiences are viewable by everyone."
    ON public.experiences FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins have full access to experiences." ON public.experiences;
CREATE POLICY "Admins have full access to experiences."
    ON public.experiences FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 5. Skills
DROP POLICY IF EXISTS "Skills are viewable by everyone." ON public.skills;
CREATE POLICY "Skills are viewable by everyone."
    ON public.skills FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins have full access to skills." ON public.skills;
CREATE POLICY "Admins have full access to skills."
    ON public.skills FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 6. Contact Messages
DROP POLICY IF EXISTS "Anyone can submit a contact message." ON public.contact_messages;
CREATE POLICY "Anyone can submit a contact message."
    ON public.contact_messages FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins have full access to contact messages." ON public.contact_messages;
CREATE POLICY "Admins have full access to contact messages."
    ON public.contact_messages FOR ALL TO authenticated USING (true) WITH CHECK (true);
