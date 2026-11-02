# Premium Apple-Inspired Software Quality Engineer Portfolio

A production-ready personal portfolio website for **Rishi** — Software Quality Assurance Engineer transitioning towards SDET and Software Development Engineering roles.

Taking deep visual and architectural inspiration from **Apple.com**, this application is designed as a digital experience that communicates engineering excellence, architectural rigor, and verifiable software quality.

---

##  Design Philosophy

- **Extreme Minimalism & Cleanliness:** Purposeful layouts with generous whitespace and clear hierarchy.
- **Apple Typography Aesthetics:** System font stack (`SF Pro Display` / `SF Pro Text` / `Inter`) with tight tracking on oversized editorial headlines and readable body copy.
- **Cinematic Dark & Light Modes:** Smooth transitions with Apple light (`#FFFFFF`, `#1D1D1F`, `#0071E3`) and dark (`#000000`, `#F5F5F7`, `#2997FF`) color palettes.
- **Interactive Live Test Terminal:** An interactive test suite runner embedded into the hero section demonstrating real-time TestNG, RestAssured, and Linux/Kafka assertions with live pass/fail telemetry.
- **Product Storytelling:** Alternating project showcases designed like Apple product pages, highlighting architecture, automated test coverage checklists, and engineering outcomes.
- **Reduced-Motion Accessibility:** Smooth interactions with native respect for user accessibility preferences.

---

## 1. Personal Branding

- **Name:** Rishi
- **Title:** Software Quality Engineer | Automation Engineer
- **Tagline:** *"Building confidence in every release."*
- **Headline:** *"I don't just test software. I engineer quality."*
- **Current Role:** Software QA Engineer – Frugal Testing
- **Career Direction:** SDET / Automation Engineer / Software Development Engineer

---

## 2. Website Sections

### 1. Navigation Header
- Frosted glass (`backdrop-blur-md`) top bar with subtle border on scroll.
- Rishi wordmark with dynamic `SQE` badge.
- Navigation links (`Home`, `About`, `Experience`, `Projects`, `Skills`, `Contact`).
- Apple-style dark/light mode toggle with smooth rotation animation.
- One-click Resume download button.
- Discreet gateway icon to the protected Admin Portal.
- All navigation links and button labels are editable via the Admin Dashboard.

### 2. Cinematic Hero Section
- Oversized headline:
  > *"Quality isn't an afterthought. It's engineered."*
- Supporting narrative and dynamic availability status pill (`Available for SDET & Quality Engineering Roles`).
- Primary CTA (`Explore My Work`) and Secondary CTA (`Let's Connect`).
- Interactive Apple mesh background glow canvas.
- Embedded **Interactive Test Automation Terminal Simulator** allowing visitors to execute Web (Selenium), API (RestAssured), and Infrastructure (Kafka/Redis) test suites live in the browser.
- Key verifiable metrics counters.

### 3. About Section
- Editorial heading: *"Engineering quality. One detail at a time."*
- Detailed introduction covering manual & automated testing, web & mobile, API contracts, CI/CD, and distributed infrastructure validation.
- Core technical competencies Bento cards.
- Three engineering philosophy principles: *Architectural Rigor*, *Shift-Left Integration*, and *Holistic Observability*.
- Fully editable statistics grid (`3+ Testing Domains`, `10+ Technologies`, `Multiple Automation Frameworks`, `Continuous Validation Pipeline`).

### 4. Experience Section
- Elegant vertical timeline with scroll animations.
- Initial role: **Software QA Engineer at Frugal Testing**.
- Detailed responsibilities covering Selenium POM, Appium, RestAssured, Jenkins, GitHub Actions, Allure, Kafka, Redis/KeyDB, and Grafana.
- Concise quantifiable outcomes and technology stack pills.

### 5. Selected Work & Projects Showcase
- Editorial heading: *"Selected work. Engineered with precision."*
- Alternating product storytelling layout with high-resolution visual previews, category badges, tech badges, and automated test coverage checklists.
- **6 Initial Curated Portfolio Demonstration Projects:**
  1. **E-Commerce Web Automation Framework:** Selenium 4.x, Java, TestNG, Maven, Page Object Model, Allure Reports.
  2. **Banking API Automation Suite:** Java, RestAssured, TestNG, Maven, JSON Schema, OAuth2.
  3. **Mobile Application Testing Framework:** Java, Appium, TestNG, Android UIAutomator2, ADB.
  4. **Playwright End-to-End Testing:** Playwright, JavaScript, Node.js, WebKit/Chromium/Firefox.
  5. **CI/CD Continuous Testing Pipeline:** Jenkins, GitHub Actions, Docker, Maven, Slack integration.
  6. **Infrastructure & Deployment Validation:** Linux, Shell Scripting, Kafka, Redis, KeyDB, Grafana.
- Interactive deep-dive modal (`ProjectModal`) and dedicated slug route (`/projects/:slug`) for every project.
- Clearly labeled as curated portfolio demonstrations.

### 6. Skills Matrix
- 10 interactive categorized disciplines with animated category filter pills:
  1. *Automation Testing* (Selenium WebDriver, Playwright, TestNG, POM, Cucumber BDD, Allure)
  2. *Manual Testing* (Functional, Regression, Smoke, Sanity, Exploratory, UAT)
  3. *API Testing* (RestAssured, Postman, REST validation, JSON Schema, OpenAPI)
  4. *Mobile Testing* (Appium, UIAutomator2, ADB, Mobile Browser Emulation)
  5. *Programming Languages* (Java, JavaScript, TypeScript, SQL, Bash/Shell)
  6. *Frontend Development* (React.js, HTML5, CSS3, Tailwind CSS, DOM Selectors)
  7. *Backend Development* (Node.js, Express.js, Microservices, REST APIs)
  8. *DevOps & CI/CD* (Jenkins, GitHub Actions, Git, Maven, Docker)
  9. *Monitoring & Infrastructure* (Linux, Grafana, Apache Kafka, Redis/KeyDB)
  10. *Database Technologies* (MongoDB, SQL, Data Integrity Verification)

### 7. Contact Section
- Heading: *"Have something worth building?"*
- One-click copy for email address.
- Direct links to LinkedIn, GitHub, and Resume PDF.
- Interactive contact form with input validation, spam honeypot protection, and celebratory confetti upon successful submission.

### 8. Footer
- Minimal Apple-inspired footer with copyright, links, and smooth back-to-top button.

---

## 3. Admin Dashboard (`/admin`)

A dedicated management portal protected with authentication:

- **Admin Route:** `/admin`
- **Login Route:** `/admin/login`
- **Initial Evaluation Admin Credentials:**
  - **Email:** `admin@rishi.dev`
  - **Password:** `QualityFirst2026!`

### Dashboard Features:
1. **Overview:** Total projects, published vs. draft count, contact submissions, and recent messages inbox.
2. **Hero & Header Settings:** Live preview editor for headlines, subheadings, CTAs, availability status, and navigation labels.
3. **About Settings:** Edit introduction, narrative paragraphs, and professional statistics counters.
4. **Experience Management:** Full CRUD for professional roles, employment dates, responsibilities, and technologies.
5. **Project Management:** Full CRUD with cover images, category assignment, technology tags, testing coverage points, external links, publish toggle, and drag/arrow reordering.
6. **Skills Matrix:** Add, categorize, and delete skills across all 10 categories.
7. **Contact Information:** Edit personal branding, email, LinkedIn, GitHub, and resume links.
8. **Messages Inbox:** View incoming contact submissions, mark as read/unread, archive, and delete.
9. **SEO Settings:** Real-time Google SERP preview, title tag, meta description, and Open Graph image configuration.
10. **System Settings:** Connection diagnostics, JSON data backup export, and one-click restore to seed defaults.

---

## 4. Tech Stack

- **Framework:** React 18 / Vite / TypeScript
- **Styling:** Tailwind CSS (Apple typography & color tokens)
- **Animations:** Framer Motion & CSS Keyframes
- **Icons:** Lucide React
- **Backend & Database:** Supabase PostgreSQL
- **Security:** Supabase Auth & Row Level Security (RLS)
- **Offline / Local Engine:** LocalStorage fallback provider ensuring 100% functionality out of the box without requiring external database initialization to start testing.

---

## 5. Getting Started

### Prerequisites
- Node.js 18+ & npm

### Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
```
Creates an optimized production bundle in the `dist` directory with separate vendor chunks.

### Preview Production Build
```bash
npm run preview
```

---

## 6. Supabase Database Setup

Follow the complete step-by-step instructions in [SUPABASE_SETUP.md](./SUPABASE_SETUP.md):
1. Run `supabase/schema.sql` in the Supabase SQL Editor.
2. Run `supabase/seed.sql` to populate initial data.
3. Add your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to `.env`.

---

## 7. Deployment

This application can be deployed instantly to **Vercel**, **Netlify**, or **Cloudflare Pages**:

### Vercel
1. Push your repository to GitHub.
2. Import the project in Vercel.
3. Framework Preset: **Vite**.
4. Set Environment Variables: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
5. Deploy!

