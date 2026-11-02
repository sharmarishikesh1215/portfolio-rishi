import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from './supabase';
import {
  Profile,
  HeroSettings,
  AboutSettings,
  HeaderSettings,
  SEOSettings,
  Project,
  Experience,
  Skill,
  ContactMessage,
} from '../types/portfolio';
import {
  defaultProfile,
  defaultHeroSettings,
  defaultAboutSettings,
  defaultHeaderSettings,
  defaultSEOSettings,
  defaultProjects,
  defaultExperiences,
  defaultSkills,
  defaultMessages,
} from './defaultData';

const STORAGE_KEYS = {
  PROFILE: 'rishi_portfolio_profile',
  HERO: 'rishi_portfolio_hero',
  ABOUT: 'rishi_portfolio_about',
  HEADER: 'rishi_portfolio_header',
  SEO: 'rishi_portfolio_seo',
  PROJECTS: 'rishi_portfolio_projects',
  EXPERIENCES: 'rishi_portfolio_experiences',
  SKILLS: 'rishi_portfolio_skills',
  MESSAGES: 'rishi_portfolio_messages',
};

// Safe LocalStorage helpers
function loadLocal<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key);
    if (saved) return JSON.parse(saved);
  } catch (err) {
    console.error(`Error loading ${key} from localStorage`, err);
  }
  return fallback;
}

function saveLocal<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Error saving ${key} to localStorage`, err);
  }
}

export function usePortfolioData() {
  const [profile, setProfileState] = useState<Profile>(() =>
    loadLocal(STORAGE_KEYS.PROFILE, defaultProfile)
  );
  const [heroSettings, setHeroSettingsState] = useState<HeroSettings>(() =>
    loadLocal(STORAGE_KEYS.HERO, defaultHeroSettings)
  );
  const [aboutSettings, setAboutSettingsState] = useState<AboutSettings>(() =>
    loadLocal(STORAGE_KEYS.ABOUT, defaultAboutSettings)
  );
  const [headerSettings, setHeaderSettingsState] = useState<HeaderSettings>(() =>
    loadLocal(STORAGE_KEYS.HEADER, defaultHeaderSettings)
  );
  const [seoSettings, setSeoSettingsState] = useState<SEOSettings>(() =>
    loadLocal(STORAGE_KEYS.SEO, defaultSEOSettings)
  );
  const [projects, setProjectsState] = useState<Project[]>(() =>
    loadLocal(STORAGE_KEYS.PROJECTS, defaultProjects)
  );
  const [experiences, setExperiencesState] = useState<Experience[]>(() =>
    loadLocal(STORAGE_KEYS.EXPERIENCES, defaultExperiences)
  );
  const [skills, setSkillsState] = useState<Skill[]>(() =>
    loadLocal(STORAGE_KEYS.SKILLS, defaultSkills)
  );
  const [messages, setMessagesState] = useState<ContactMessage[]>(() =>
    loadLocal(STORAGE_KEYS.MESSAGES, defaultMessages)
  );
  const [loading, setLoading] = useState(true);

  // Fetch initial data from Supabase if connected
  useEffect(() => {
    async function fetchData() {
      if (!isSupabaseConfigured || !supabase) {
        setLoading(false);
        return;
      }

      const client = supabase as any;

      try {
        // 1. Fetch Profile
        const { data: profileData } = await client
          .from('profiles')
          .select('*')
          .limit(1)
          .maybeSingle();

        if (profileData) {
          const loaded: Profile = {
            id: profileData.id,
            full_name: profileData.full_name,
            professional_title: profileData.professional_title,
            tagline: profileData.tagline,
            headline: profileData.headline,
            bio: profileData.bio,
            current_role: profileData.current_role,
            career_direction: profileData.career_direction,
            email: profileData.email,
            linkedin_url: profileData.linkedin_url,
            github_url: profileData.github_url,
            resume_url: profileData.resume_url,
            availability_status: profileData.availability_status,
            avatar_url: profileData.avatar_url,
          };
          setProfileState(loaded);
          saveLocal(STORAGE_KEYS.PROFILE, loaded);
        }

        // 2. Fetch Settings
        const { data: settingsData } = await client.from('site_settings').select('*');
        if (settingsData && settingsData.length > 0) {
          settingsData.forEach((row: any) => {
            if (row.setting_key === 'hero') {
              setHeroSettingsState(row.setting_value as HeroSettings);
              saveLocal(STORAGE_KEYS.HERO, row.setting_value);
            } else if (row.setting_key === 'about') {
              setAboutSettingsState(row.setting_value as AboutSettings);
              saveLocal(STORAGE_KEYS.ABOUT, row.setting_value);
            } else if (row.setting_key === 'header') {
              setHeaderSettingsState(row.setting_value as HeaderSettings);
              saveLocal(STORAGE_KEYS.HEADER, row.setting_value);
            } else if (row.setting_key === 'seo') {
              setSeoSettingsState(row.setting_value as SEOSettings);
              saveLocal(STORAGE_KEYS.SEO, row.setting_value);
            }
          });
        }

        // 3. Fetch Projects
        const { data: projectsData } = await client
          .from('projects')
          .select('*')
          .order('display_order', { ascending: true });

        if (projectsData && projectsData.length > 0) {
          const mappedProjects: Project[] = projectsData.map((p: any) => ({
            id: p.id,
            title: p.title,
            slug: p.slug,
            short_description: p.short_description,
            full_description: p.full_description,
            category: p.category,
            cover_image: p.cover_image,
            gallery_images: p.gallery_images as string[],
            technologies: (p.technologies as string[]) || [],
            testing_coverage: (p.testing_coverage as string[]) || [],
            key_highlights: (p.key_highlights as string[]) || [],
            github_url: p.github_url,
            demo_url: p.demo_url,
            featured: p.featured,
            published: p.published,
            display_order: p.display_order,
          }));
          setProjectsState(mappedProjects);
          saveLocal(STORAGE_KEYS.PROJECTS, mappedProjects);
        }

        // 4. Fetch Experiences
        const { data: experiencesData } = await client
          .from('experiences')
          .select('*')
          .order('display_order', { ascending: true });

        if (experiencesData && experiencesData.length > 0) {
          const mappedExp: Experience[] = experiencesData.map((e: any) => ({
            id: e.id,
            company: e.company,
            role: e.role,
            employment_type: e.employment_type,
            start_date: e.start_date,
            end_date: e.end_date,
            description: e.description,
            responsibilities: (e.responsibilities as string[]) || [],
            technologies: (e.technologies as string[]) || [],
            achievements: (e.achievements as string[]) || [],
            is_current: e.is_current,
            display_order: e.display_order,
          }));
          setExperiencesState(mappedExp);
          saveLocal(STORAGE_KEYS.EXPERIENCES, mappedExp);
        }

        // 5. Fetch Skills (with deduplication)
        const { data: skillsData } = await client
          .from('skills')
          .select('*')
          .order('display_order', { ascending: true });

        if (skillsData && skillsData.length > 0) {
          const deduped: Skill[] = [];
          const seen = new Set<string>();
          skillsData.forEach((s: any) => {
            const key = `${s.name.toLowerCase().trim()}_${s.category}`;
            if (!seen.has(key)) {
              seen.add(key);
              deduped.push(s as Skill);
            }
          });
          setSkillsState(deduped);
          saveLocal(STORAGE_KEYS.SKILLS, deduped);
        }

        // 6. Fetch Messages
        const { data: messagesData } = await client
          .from('contact_messages')
          .select('*')
          .order('created_at', { ascending: false });

        if (messagesData) {
          setMessagesState(messagesData as ContactMessage[]);
          saveLocal(STORAGE_KEYS.MESSAGES, messagesData);
        }
      } catch (err) {
        console.warn('Supabase fetch returned error; using local store fallback:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Update Profile
  const updateProfile = useCallback(async (newProfile: Profile) => {
    setProfileState(newProfile);
    saveLocal(STORAGE_KEYS.PROFILE, newProfile);
    if (isSupabaseConfigured && supabase) {
      await (supabase as any)
        .from('profiles')
        .upsert({ ...newProfile, updated_at: new Date().toISOString() });
    }
  }, []);

  // Update Hero Settings
  const updateHeroSettings = useCallback(async (newHero: HeroSettings) => {
    setHeroSettingsState(newHero);
    saveLocal(STORAGE_KEYS.HERO, newHero);
    if (isSupabaseConfigured && supabase) {
      await (supabase as any)
        .from('site_settings')
        .upsert(
          {
            setting_key: 'hero',
            setting_value: newHero,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'setting_key' }
        );
    }
  }, []);

  // Update About Settings
  const updateAboutSettings = useCallback(async (newAbout: AboutSettings) => {
    setAboutSettingsState(newAbout);
    saveLocal(STORAGE_KEYS.ABOUT, newAbout);
    if (isSupabaseConfigured && supabase) {
      await (supabase as any)
        .from('site_settings')
        .upsert(
          {
            setting_key: 'about',
            setting_value: newAbout,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'setting_key' }
        );
    }
  }, []);

  // Update Header Settings
  const updateHeaderSettings = useCallback(async (newHeader: HeaderSettings) => {
    setHeaderSettingsState(newHeader);
    saveLocal(STORAGE_KEYS.HEADER, newHeader);
    if (isSupabaseConfigured && supabase) {
      await (supabase as any)
        .from('site_settings')
        .upsert(
          {
            setting_key: 'header',
            setting_value: newHeader,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'setting_key' }
        );
    }
  }, []);

  // Update SEO Settings
  const updateSEOSettings = useCallback(async (newSEO: SEOSettings) => {
    setSeoSettingsState(newSEO);
    saveLocal(STORAGE_KEYS.SEO, newSEO);
    if (isSupabaseConfigured && supabase) {
      await (supabase as any)
        .from('site_settings')
        .upsert(
          {
            setting_key: 'seo',
            setting_value: newSEO,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'setting_key' }
        );
    }
  }, []);

  // Projects CRUD
  const saveProject = useCallback(async (project: Project) => {
    setProjectsState((prev) => {
      const exists = prev.some((p) => p.id === project.id);
      const updated = exists
        ? prev.map((p) => (p.id === project.id ? project : p))
        : [...prev, project];
      saveLocal(STORAGE_KEYS.PROJECTS, updated);
      return updated;
    });

    if (isSupabaseConfigured && supabase) {
      await (supabase as any).from('projects').upsert({
        ...project,
        updated_at: new Date().toISOString(),
      });
    }
  }, []);

  const deleteProject = useCallback(async (id: string) => {
    setProjectsState((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      saveLocal(STORAGE_KEYS.PROJECTS, updated);
      return updated;
    });

    if (isSupabaseConfigured && supabase) {
      await (supabase as any).from('projects').delete().eq('id', id);
    }
  }, []);

  const reorderProjects = useCallback(async (reordered: Project[]) => {
    const updated = reordered.map((p, idx) => ({ ...p, display_order: idx + 1 }));
    setProjectsState(updated);
    saveLocal(STORAGE_KEYS.PROJECTS, updated);

    if (isSupabaseConfigured && supabase) {
      for (const p of updated) {
        await (supabase as any)
          .from('projects')
          .update({ display_order: p.display_order })
          .eq('id', p.id);
      }
    }
  }, []);

  // Experiences CRUD
  const saveExperience = useCallback(async (experience: Experience) => {
    setExperiencesState((prev) => {
      const exists = prev.some((e) => e.id === experience.id);
      const updated = exists
        ? prev.map((e) => (e.id === experience.id ? experience : e))
        : [...prev, experience];
      saveLocal(STORAGE_KEYS.EXPERIENCES, updated);
      return updated;
    });

    if (isSupabaseConfigured && supabase) {
      await (supabase as any).from('experiences').upsert({
        ...experience,
        updated_at: new Date().toISOString(),
      });
    }
  }, []);

  const deleteExperience = useCallback(async (id: string) => {
    setExperiencesState((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      saveLocal(STORAGE_KEYS.EXPERIENCES, updated);
      return updated;
    });

    if (isSupabaseConfigured && supabase) {
      await (supabase as any).from('experiences').delete().eq('id', id);
    }
  }, []);

  // Skills CRUD
  const saveSkill = useCallback(async (skill: Skill) => {
    setSkillsState((prev) => {
      const exists = prev.some((s) => s.id === skill.id);
      const updated = exists
        ? prev.map((s) => (s.id === skill.id ? skill : s))
        : [...prev, skill];
      saveLocal(STORAGE_KEYS.SKILLS, updated);
      return updated;
    });

    if (isSupabaseConfigured && supabase) {
      await (supabase as any).from('skills').upsert(skill);
    }
  }, []);

  const deleteSkill = useCallback(async (id: string) => {
    setSkillsState((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      saveLocal(STORAGE_KEYS.SKILLS, updated);
      return updated;
    });

    if (isSupabaseConfigured && supabase) {
      await (supabase as any).from('skills').delete().eq('id', id);
    }
  }, []);

  // Contact Messages
  const addContactMessage = useCallback(
    async (msg: Omit<ContactMessage, 'id' | 'status' | 'created_at'>) => {
      const newMsg: ContactMessage = {
        ...msg,
        id: 'msg_' + Date.now(),
        status: 'unread',
        created_at: new Date().toISOString(),
      };

      setMessagesState((prev) => {
        const updated = [newMsg, ...prev];
        saveLocal(STORAGE_KEYS.MESSAGES, updated);
        return updated;
      });

      if (isSupabaseConfigured && supabase) {
        await (supabase as any).from('contact_messages').insert({
          name: newMsg.name,
          email: newMsg.email,
          subject: newMsg.subject,
          message: newMsg.message,
          status: 'unread',
        });
      }

      return newMsg;
    },
    []
  );

  const updateMessageStatus = useCallback(
    async (id: string, status: 'unread' | 'read' | 'archived') => {
      setMessagesState((prev) => {
        const updated = prev.map((m) => (m.id === id ? { ...m, status } : m));
        saveLocal(STORAGE_KEYS.MESSAGES, updated);
        return updated;
      });

      if (isSupabaseConfigured && supabase) {
        await (supabase as any).from('contact_messages').update({ status }).eq('id', id);
      }
    },
    []
  );

  const deleteMessage = useCallback(async (id: string) => {
    setMessagesState((prev) => {
      const updated = prev.filter((m) => m.id !== id);
      saveLocal(STORAGE_KEYS.MESSAGES, updated);
      return updated;
    });

    if (isSupabaseConfigured && supabase) {
      await (supabase as any).from('contact_messages').delete().eq('id', id);
    }
  }, []);

  // Reset to default seed
  const resetToDefaults = useCallback(() => {
    setProfileState(defaultProfile);
    setHeroSettingsState(defaultHeroSettings);
    setAboutSettingsState(defaultAboutSettings);
    setHeaderSettingsState(defaultHeaderSettings);
    setSeoSettingsState(defaultSEOSettings);
    setProjectsState(defaultProjects);
    setExperiencesState(defaultExperiences);
    setSkillsState(defaultSkills);
    setMessagesState(defaultMessages);

    saveLocal(STORAGE_KEYS.PROFILE, defaultProfile);
    saveLocal(STORAGE_KEYS.HERO, defaultHeroSettings);
    saveLocal(STORAGE_KEYS.ABOUT, defaultAboutSettings);
    saveLocal(STORAGE_KEYS.HEADER, defaultHeaderSettings);
    saveLocal(STORAGE_KEYS.SEO, defaultSEOSettings);
    saveLocal(STORAGE_KEYS.PROJECTS, defaultProjects);
    saveLocal(STORAGE_KEYS.EXPERIENCES, defaultExperiences);
    saveLocal(STORAGE_KEYS.SKILLS, defaultSkills);
    saveLocal(STORAGE_KEYS.MESSAGES, defaultMessages);
  }, []);

  return {
    loading,
    profile,
    heroSettings,
    aboutSettings,
    headerSettings,
    seoSettings,
    projects,
    experiences,
    skills,
    messages,
    updateProfile,
    updateHeroSettings,
    updateAboutSettings,
    updateHeaderSettings,
    updateSEOSettings,
    saveProject,
    deleteProject,
    reorderProjects,
    saveExperience,
    deleteExperience,
    saveSkill,
    deleteSkill,
    addContactMessage,
    updateMessageStatus,
    deleteMessage,
    resetToDefaults,
  };
}
