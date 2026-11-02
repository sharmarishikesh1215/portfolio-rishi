# Supabase Setup Guide — Premium Software Quality Engineer Portfolio

This portfolio application includes complete, production-ready integration with **Supabase** for PostgreSQL database persistence, Row Level Security (RLS), Supabase Authentication, and Storage.

---

## 1. Create a Supabase Project

1. Go to [https://supabase.com/](https://supabase.com/) and sign in to your dashboard.
2. Click **New Project**.
3. Choose your project name (e.g. `rishi-portfolio-sqe`), set a secure database password, and select your preferred region.
4. Wait 1–2 minutes for the database cluster to provision.

---

## 2. Execute SQL Database Schema & RLS Policies

1. In your Supabase dashboard, click the **SQL Editor** tab on the left sidebar.
2. Click **New Query**.
3. Copy the entire contents of [`supabase/schema.sql`](./supabase/schema.sql) and paste it into the editor.
4. Click **Run** (or `Ctrl + Enter`).
   - This creates all required tables:
     - `public.profiles`
     - `public.site_settings`
     - `public.projects`
     - `public.experiences`
     - `public.skills`
     - `public.contact_messages`
   - Sets up indexes for high-speed queries.
   - Enables Row Level Security (RLS) policies allowing public read access to published items and authenticated-only write access for the administrator.
   - Configures storage buckets: `portfolio-media` and `documents`.

---

## 3. Seed Initial Portfolio Data

1. In the **SQL Editor**, click **New Query**.
2. Copy the entire contents of [`supabase/seed.sql`](./supabase/seed.sql) and paste it into the editor.
3. Click **Run**.
   - Populates Rishi's personal branding, title, and tagline.
   - Populates hero, about narrative, and philosophy pillars.
   - Populates initial experience at **Frugal Testing**.
   - Inserts all **6 initial portfolio demonstration projects** with detailed test coverage checklists:
     1. E-Commerce Web Automation Framework (Selenium + TestNG)
     2. Banking API Automation Suite (RestAssured)
     3. Mobile Application Testing Framework (Appium)
     4. Playwright End-to-End Testing
     5. CI/CD Continuous Testing Pipeline (Jenkins + GitHub Actions)
     6. Infrastructure & Deployment Validation (Linux + Kafka + Redis + Grafana)
   - Populates skills across all 10 technical categories.

---

## 4. Create an Administrator Account in Supabase Auth

1. Go to **Authentication** > **Users** in the Supabase dashboard.
2. Click **Add User** > **Create User**.
3. Enter your administrator email (e.g., `admin@rishi.dev` or your personal email) and a strong password.
4. Click **Create User**. Ensure the email is marked as confirmed.

> **Security Note:** Public sign-up is disabled by design. Only administrators explicitly created in the Supabase dashboard or via invite can access the `/admin` portal.

---

## 5. Configure Frontend Environment Variables

1. In your Supabase project dashboard, navigate to **Project Settings** (gear icon) > **API**.
2. Copy:
   - **Project URL**
   - **anon / public key**
3. Create or update your `.env` file in the root directory:

```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

4. Restart your development server (`npm run dev`) or rebuild (`npm run build`).

---

## 6. Offline / Preview Fallback Engine

If no Supabase credentials are provided or if you are running offline, the portfolio automatically operates using a high-fidelity **LocalStorage Store** seeded with all portfolio demonstrations and full CRUD functionality. 

- **Demo Admin Email:** `admin@rishi.dev`
- **Demo Admin Password:** `QualityFirst2026!`

When you connect your Supabase project, the app seamlessly switches to Supabase PostgreSQL and Supabase Auth.

