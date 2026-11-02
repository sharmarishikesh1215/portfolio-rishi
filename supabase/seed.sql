-- ==============================================================================
-- SEED DATA: Premium Software Quality Engineer Portfolio (Rishi)
-- ==============================================================================

-- 1. Insert Profile
INSERT INTO public.profiles (
    id,
    full_name,
    professional_title,
    tagline,
    headline,
    bio,
    current_role,
    career_direction,
    email,
    linkedin_url,
    github_url,
    resume_url,
    availability_status
) VALUES (
    'a0000000-0000-0000-0000-000000000001',
    'Rishi',
    'Software Quality Engineer | Automation Engineer',
    'Building confidence in every release.',
    'I don''t just test software. I engineer quality.',
    'Software Quality Assurance Engineer experienced in manual testing, automation engineering, API testing, mobile testing, and infrastructure-level validation. Passionate about building reliable applications, scalable automation frameworks, and efficient testing solutions.',
    'Software QA Engineer – Frugal Testing',
    'SDET / Automation Engineer / Software Development Engineer',
    'sharmarishikesh12.15@gmail.com',
    'https://linkedin.com/in/rishi-sqe',
    'https://github.com/sharmarishikesh1215',
    '/resume.pdf',
    'Available for SDET & Quality Engineering Roles'
) ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    professional_title = EXCLUDED.professional_title,
    tagline = EXCLUDED.tagline,
    headline = EXCLUDED.headline,
    bio = EXCLUDED.bio;

-- 2. Insert Site Settings
INSERT INTO public.site_settings (setting_key, setting_value) VALUES
('hero', '{
    "main_headline": "Quality isn''t an afterthought.\nIt''s engineered.",
    "sub_headline": "I''m Rishi — a Software Quality Engineer building reliable applications through intelligent automation, thoughtful testing, and engineering excellence.",
    "primary_cta_text": "Explore My Work",
    "primary_cta_link": "#projects",
    "secondary_cta_text": "Let''s Connect",
    "secondary_cta_link": "#contact",
    "availability_status": "Available for SDET & Automation Roles",
    "enable_ambient_canvas": true,
    "metrics": [
        {"label": "Defect Escape Rate", "value": "< 0.1%"},
        {"label": "Automated Coverage", "value": "94%"},
        {"label": "Build Reliability", "value": "99.8%"}
    ]
}'::jsonb),
('about', '{
    "heading": "Engineering quality. One detail at a time.",
    "subheading": "Beyond manual checkpoints. Architecting verifiable, reproducible test systems.",
    "paragraphs": [
        "As a Software QA Engineer at Frugal Testing, I approach quality from the ground up — not simply as a series of checks before a release, but as an architectural discipline woven into every commit, container, and deployment.",
        "My work spans the complete testing spectrum: from robust Selenium and Playwright browser automation suites to high-throughput RestAssured API contracts, Appium mobile test harnesses, and infrastructure sanity validation with Kafka, Redis, and Linux telemetry."
    ],
    "statistics": [
        {"label": "Testing Domains", "value": "3+", "description": "Web, Mobile & Backend Microservices"},
        {"label": "Technologies & Tools", "value": "20+", "description": "Languages, Frameworks & CI/CD Stacks"},
        {"label": "Automation Frameworks", "value": "Multiple", "description": "Modular POM, Data-Driven & BDD"},
        {"label": "Validation Pipeline", "value": "Continuous", "description": "Automated Jenkins & GitHub Actions"}
    ],
    "philosophy_pillars": [
        {
            "title": "Architectural Rigor",
            "description": "Building maintainable, modular test frameworks utilizing the Page Object Model, thread-safe parallel runners, and resilient locators."
        },
        {
            "title": "Shift-Left Integration",
            "description": "Embedding regression gates and automated smoke verification directly into CI/CD pipelines to catch anomalies early."
        },
        {
            "title": "Holistic Observability",
            "description": "Validating not only client-side UI behavior, but asynchronous Kafka queues, Redis cache integrity, and Grafana system telemetry."
        }
    ]
}'::jsonb),
('header', '{
    "logo_text": "Rishi",
    "logo_badge": "SQE",
    "nav_links": [
        {"label": "Home", "href": "#hero"},
        {"label": "About", "href": "#about"},
        {"label": "Experience", "href": "#experience"},
        {"label": "Projects", "href": "#projects"},
        {"label": "Skills", "href": "#skills"},
        {"label": "Contact", "href": "#contact"}
    ],
    "resume_button_text": "Resume",
    "resume_url": "/resume.pdf"
}'::jsonb),
('seo', '{
    "meta_title": "Rishi — Software Quality Engineer | Automation & SDET",
    "meta_description": "Software Quality Assurance Engineer experienced in building scalable automation frameworks, API validation, mobile testing, and CI/CD quality engineering.",
    "keywords": "Software Quality Engineer, SDET, Automation Engineer, Selenium, Playwright, Appium, RestAssured, Jenkins, TestNG",
    "og_image": "/og-image.png"
}'::jsonb)
ON CONFLICT (setting_key) DO UPDATE SET setting_value = EXCLUDED.setting_value;

-- 3. Insert Initial Experience (Frugal Testing)
INSERT INTO public.experiences (
    id,
    company,
    role,
    employment_type,
    start_date,
    end_date,
    description,
    responsibilities,
    technologies,
    achievements,
    is_current,
    display_order
) VALUES (
    'b0000000-0000-0000-0000-000000000001',
    'Frugal Testing',
    'Software QA Engineer',
    'Full-time',
    'Oct 2023',
    'Present',
    'Leading end-to-end quality assurance, test automation architecture, and deployment validation across complex web, mobile, and distributed backend ecosystems.',
    '[
        "Web application manual and automation testing using Selenium Java with TestNG and Page Object Model.",
        "Mobile application functional and regression testing on Android devices using Appium.",
        "Backend API contract and payload validation utilizing Postman and RestAssured with automated schema assertions.",
        "CI/CD continuous testing integration orchestrating Jenkins pipelines and GitHub Actions workflows.",
        "Comprehensive test analytics and failure telemetry reporting using Allure Reports.",
        "Infrastructure deployment validation across distributed systems, inspecting Kafka event queues, Redis/KeyDB cache consistency, and Grafana performance dashboards.",
        "Environment sanity validation and production deployment support with zero-downtime regression gates."
    ]'::jsonb,
    '["Java", "Selenium", "TestNG", "Appium", "RestAssured", "Postman", "Jenkins", "GitHub Actions", "Allure Reports", "Kafka", "Redis", "KeyDB", "Grafana", "Linux", "Maven"]'::jsonb,
    '[
        "Architected reusable Page Object Model framework reducing regression run times by 42%.",
        "Engineered zero-flakiness API validation suite covering 120+ microservice endpoints.",
        "Maintained 99.8% CI/CD pipeline pass reliability with automated test triage alerts."
    ]'::jsonb,
    true,
    1
) ON CONFLICT (id) DO UPDATE SET
    company = EXCLUDED.company,
    role = EXCLUDED.role,
    responsibilities = EXCLUDED.responsibilities,
    technologies = EXCLUDED.technologies;

-- 4. Insert 6 Initial Demonstration Projects (Clearly labeled sample/demonstrations)
INSERT INTO public.projects (
    id,
    title,
    slug,
    short_description,
    full_description,
    category,
    cover_image,
    technologies,
    testing_coverage,
    key_highlights,
    github_url,
    demo_url,
    featured,
    published,
    display_order
) VALUES
(
    'c0000000-0000-0000-0000-000000000001',
    'E-Commerce Web Automation Framework',
    'ecommerce-web-automation-framework',
    'A scalable Selenium Java automation framework for validating an e-commerce web application with Page Object Model and Allure reporting.',
    'A production-grade test automation architecture designed to perform regression and sanity validation across complex e-commerce customer journeys. Built with thread-safe parallel execution capabilities, dynamic element synchronizers, and comprehensive Allure visual test reports.',
    'Automation Testing',
    '/images/project-ecommerce.png',
    '["Java", "Selenium WebDriver", "TestNG", "Maven", "Page Object Model", "Allure Reports", "Git"]'::jsonb,
    '[
        "Login and session authentication validation across valid and invalid security permutations.",
        "Dynamic product search and debounce querying accuracy.",
        "Multi-parameter product filtering (category, price range, brand, availability).",
        "Persistent shopping cart state handling across page reloads and concurrent sessions.",
        "Multi-step checkout workflows with payment tokenization mock verifications.",
        "High-throughput regression testing executed in headless cross-browser grids."
    ]'::jsonb,
    '[
        "Sample portfolio demonstration implementing strict clean-code Page Object Model design patterns.",
        "Parallel test execution with TestNG dataprovider threading for rapid build verification.",
        "Custom screenshot attachments on test failure integrated directly with Allure dashboards."
    ]'::jsonb,
    'https://github.com/rishi-sqe/ecommerce-automation-framework',
    '',
    true,
    true,
    1
),
(
    'c0000000-0000-0000-0000-000000000002',
    'Banking API Automation Suite',
    'banking-api-automation-suite',
    'An API automation framework designed to validate secure banking transactions, account operations, and backend microservices.',
    'A robust API test suite engineered with Java and RestAssured for high-precision financial services validation. Handles OAuth2 token lifecycles, JSON Schema strict validation, transaction idempotency assertions, and edge-case boundary testing.',
    'API Testing',
    '/images/project-banking-api.png',
    '["Java", "RestAssured", "TestNG", "Maven", "JSON Schema", "Jackson", "Postman"]'::jsonb,
    '[
        "Mutual TLS and OAuth2 authentication bearer token generation and expiration handling.",
        "Account balance inquiry and ledger integrity validation across currency formats.",
        "Fund transfer idempotency and concurrent double-spend race condition tests.",
        "Transaction history pagination, filtering, and timestamp accuracy assertions.",
        "Comprehensive negative boundary scenarios (invalid payloads, rate limiting, SQL injection defense).",
        "Rigorous JSON schema and response header contract validation."
    ]'::jsonb,
    '[
        "Sample portfolio demonstration modeling realistic banking microservice architectures.",
        "Custom response filter pipeline measuring API latency SLAs and logging request-response pairs.",
        "Automated mock server integration for consistent offline contract validation."
    ]'::jsonb,
    'https://github.com/rishi-sqe/banking-api-automation',
    '',
    true,
    true,
    2
),
(
    'c0000000-0000-0000-0000-000000000003',
    'Mobile Application Testing Framework',
    'mobile-application-testing-framework',
    'Automated functional and compatibility testing of native Android applications using Appium and TestNG.',
    'A resilient mobile automation test harness architected to validate native Android apps across varying screen densities, Android OS versions, and network throttling profiles. Utilizes UIAutomator2 driver with robust locator fallbacks.',
    'Mobile Testing',
    '/images/project-mobile-appium.png',
    '["Java", "Appium", "TestNG", "Maven", "Android UIAutomator2", "ADB", "Allure"]'::jsonb,
    '[
        "Biometric and credentials-based login flows with secure storage validation.",
        "Native bottom navigation, drawer transitions, and deep linking resolution.",
        "Complex form input validation, keyboard dismissal, and scrollable containers.",
        "Push notification intercept verification and status bar payload parsing.",
        "Cross-device screen resolution, aspect ratio, and orientation compatibility."
    ]'::jsonb,
    '[
        "Sample portfolio demonstration featuring ADB automation and capability management.",
        "Dynamic explicit wait helpers built specifically for hybrid and native Android view hierarchies.",
        "Automatic device screen capture and logcat extraction upon test failure."
    ]'::jsonb,
    'https://github.com/rishi-sqe/mobile-appium-framework',
    '',
    true,
    true,
    3
),
(
    'c0000000-0000-0000-0000-000000000004',
    'Playwright End-to-End Testing',
    'playwright-e2e-testing-suite',
    'Modern high-speed browser automation for testing complex single-page web applications with parallel workers.',
    'Next-generation browser test automation utilizing Playwright with JavaScript/Node.js. Features auto-waiting, network request interception, visual comparison snapshots, and cross-browser testing across Chromium, WebKit, and Firefox.',
    'Automation Testing',
    '/images/project-playwright.png',
    '["Playwright", "JavaScript", "Node.js", "Chromium", "WebKit", "Firefox", "HTML Reports"]'::jsonb,
    '[
        "Simultaneous cross-browser execution across Chromium, Firefox, and WebKit rendering engines.",
        "Complex single-page application UI state transitions and WebSocket communications.",
        "API interception, route mocking, and payload mutation for edge-case error states.",
        "Pixel-level visual regression and component snapshot comparison.",
        "High-speed parallel worker execution configured for ephemeral cloud runners."
    ]'::jsonb,
    '[
        "Sample portfolio demonstration illustrating fast, flake-free modern web testing.",
        "Video recording and step-by-step trace viewer analysis enabled for failing scenarios.",
        "Zero-configuration multi-viewport responsive emulation (iPhone, iPad, Desktop 4K)."
    ]'::jsonb,
    'https://github.com/rishi-sqe/playwright-e2e-suite',
    '',
    true,
    true,
    4
),
(
    'c0000000-0000-0000-0000-000000000005',
    'CI/CD Continuous Testing Pipeline',
    'cicd-continuous-testing-pipeline',
    'Automated testing workflows integrated into continuous integration and delivery pipelines with automated gates.',
    'A robust continuous testing pipeline engineered with Jenkins and GitHub Actions. Automatically triggers smoke suites on pull requests, nightly regression matrices on main branches, and generates unified Allure telemetry dashboards with Slack alerts.',
    'DevOps & CI/CD',
    '/images/project-cicd.png',
    '["Jenkins", "GitHub Actions", "Docker", "Maven", "Allure Reports", "Linux", "Slack API"]'::jsonb,
    '[
        "Automated pull request validation triggering containerized smoke test containers.",
        "Pre-merge build verification gates preventing broken artifacts from reaching staging.",
        "Scheduled nightly regression triggers across multi-agent Jenkins nodes.",
        "Automated Allure report publishing to static hosting with historical trends.",
        "Instant failure triage notifications with direct links to failure stack traces."
    ]'::jsonb,
    '[
        "Sample portfolio demonstration featuring declarative Jenkinsfile and GitHub Actions workflows.",
        "Dockerized execution environment eliminating environment inconsistencies across developers.",
        "Pipeline caching of Maven dependencies reducing build execution cycles by over 50%."
    ]'::jsonb,
    'https://github.com/rishi-sqe/cicd-quality-pipeline',
    '',
    true,
    true,
    5
),
(
    'c0000000-0000-0000-0000-000000000006',
    'Infrastructure & Deployment Validation',
    'infrastructure-deployment-validation',
    'Technical validation project demonstrating service health checks and deployment verification across distributed environments.',
    'A systems-level quality validation suite inspecting backend distributed services in Linux environments. Verifies port connectivity, Kafka consumer group lag, Redis/KeyDB cache eviction policies, and scrapes Grafana telemetry for anomaly detection post-deployment.',
    'Monitoring & Infrastructure',
    '/images/project-infra.png',
    '["Linux", "Shell Scripting", "Kafka", "Redis", "KeyDB", "Grafana", "Docker", "cURL"]'::jsonb,
    '[
        "Distributed service availability and heartbeat probes across microservice clusters.",
        "TCP and HTTP port connectivity validation under firewall and security group rules.",
        "Post-deployment blue-green and canary smoke verification with rollback triggers.",
        "Kafka consumer lag monitoring and dead-letter queue inspection.",
        "KeyDB / Redis cluster connectivity, read/write latency, and replication checks.",
        "Log anomaly monitoring and Grafana metrics threshold validation."
    ]'::jsonb,
    '[
        "Sample portfolio demonstration bridging QA automation with Site Reliability Engineering.",
        "Automated Bash validation scripts packaged as portable pre-flight and post-flight CLI tools.",
        "Grafana webhook integration reporting synthetic deployment health metrics."
    ]'::jsonb,
    'https://github.com/rishi-sqe/infrastructure-validation-suite',
    '',
    true,
    true,
    6
)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    short_description = EXCLUDED.short_description,
    full_description = EXCLUDED.full_description,
    technologies = EXCLUDED.technologies,
    testing_coverage = EXCLUDED.testing_coverage,
    key_highlights = EXCLUDED.key_highlights;

-- 5. Insert Skills (10 Categories as specified)
INSERT INTO public.skills (name, category, display_order, proficiency_level) VALUES
-- 1. Automation Testing
('Selenium WebDriver', 'Automation Testing', 1, 'Expert'),
('Playwright', 'Automation Testing', 2, 'Advanced'),
('TestNG', 'Automation Testing', 3, 'Expert'),
('Page Object Model (POM)', 'Automation Testing', 4, 'Expert'),
('Cucumber BDD', 'Automation Testing', 5, 'Intermediate'),
('Allure Test Reporting', 'Automation Testing', 6, 'Expert'),

-- 2. Manual Testing
('Functional Testing', 'Manual Testing', 1, 'Expert'),
('Regression Testing', 'Manual Testing', 2, 'Expert'),
('Smoke & Sanity Testing', 'Manual Testing', 3, 'Expert'),
('Exploratory Testing', 'Manual Testing', 4, 'Advanced'),
('User Acceptance Testing (UAT)', 'Manual Testing', 5, 'Advanced'),
('Defect Lifecycle & Triage', 'Manual Testing', 6, 'Expert'),

-- 3. API Testing
('RestAssured', 'API Testing', 1, 'Expert'),
('Postman', 'API Testing', 2, 'Expert'),
('RESTful API Validation', 'API Testing', 3, 'Expert'),
('JSON Schema Validation', 'API Testing', 4, 'Advanced'),
('Swagger / OpenAPI', 'API Testing', 5, 'Advanced'),

-- 4. Mobile Testing
('Appium', 'Mobile Testing', 1, 'Advanced'),
('Android UIAutomator2', 'Mobile Testing', 2, 'Advanced'),
('ADB (Android Debug Bridge)', 'Mobile Testing', 3, 'Advanced'),
('Mobile Browser Emulation', 'Mobile Testing', 4, 'Advanced'),

-- 5. Programming Languages
('Java', 'Programming Languages', 1, 'Advanced'),
('JavaScript (ES6+)', 'Programming Languages', 2, 'Advanced'),
('TypeScript', 'Programming Languages', 3, 'Intermediate'),
('SQL', 'Programming Languages', 4, 'Advanced'),
('Bash / Shell Scripting', 'Programming Languages', 5, 'Intermediate'),

-- 6. Frontend Development
('React.js', 'Frontend Development', 1, 'Intermediate'),
('HTML5 & Semantic Markup', 'Frontend Development', 2, 'Advanced'),
('CSS3 & Tailwind CSS', 'Frontend Development', 3, 'Advanced'),
('DOM Inspection & Selectors', 'Frontend Development', 4, 'Expert'),

-- 7. Backend Development
('Node.js', 'Backend Development', 1, 'Intermediate'),
('Express.js', 'Backend Development', 2, 'Intermediate'),
('Microservice Architecture', 'Backend Development', 3, 'Intermediate'),
('REST API Development', 'Backend Development', 4, 'Intermediate'),

-- 8. DevOps & CI/CD
('Jenkins', 'DevOps & CI/CD', 1, 'Advanced'),
('GitHub Actions', 'DevOps & CI/CD', 2, 'Advanced'),
('Git & GitHub', 'DevOps & CI/CD', 3, 'Advanced'),
('Maven Build Tool', 'DevOps & CI/CD', 4, 'Advanced'),
('Docker Containers', 'DevOps & CI/CD', 5, 'Intermediate'),

-- 9. Monitoring & Infrastructure
('Linux Systems', 'Monitoring & Infrastructure', 1, 'Advanced'),
('Grafana Dashboards', 'Monitoring & Infrastructure', 2, 'Intermediate'),
('Apache Kafka', 'Monitoring & Infrastructure', 3, 'Intermediate'),
('Redis / KeyDB In-Memory Caching', 'Monitoring & Infrastructure', 4, 'Intermediate'),
('Infrastructure Sanity Checks', 'Monitoring & Infrastructure', 5, 'Advanced'),

-- 10. Database Technologies
('MongoDB', 'Database Technologies', 1, 'Intermediate'),
('SQL & Relational Databases', 'Database Technologies', 2, 'Advanced'),
('Data Integrity Verification', 'Database Technologies', 3, 'Advanced')
ON CONFLICT DO NOTHING;

