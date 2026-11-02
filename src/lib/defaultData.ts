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

export const defaultProfile: Profile = {
  id: 'a0000000-0000-0000-0000-000000000001',
  full_name: 'Rishi',
  professional_title: 'Software Quality Engineer | Automation Engineer',
  tagline: 'Building confidence in every release.',
  headline: "I don't just test software. I engineer quality.",
  bio: 'Software Quality Assurance Engineer experienced in manual testing, automation engineering, API testing, mobile testing, and infrastructure-level validation. Passionate about building reliable applications, scalable automation frameworks, and efficient testing solutions.',
  current_role: 'Software QA Engineer – Frugal Testing',
  career_direction: 'SDET / Automation Engineer / Software Development Engineer',
  email: 'sharmarishikesh12.15@gmail.com',
  linkedin_url: 'https://linkedin.com/in/rishi-sqe',
  github_url: 'https://github.com/sharmarishikesh1215',
  resume_url: '/resume.pdf',
  availability_status: 'Available for SDET & Quality Engineering Roles',
  avatar_url: '',
};

export const defaultHeroSettings: HeroSettings = {
  main_headline: "Quality isn't an afterthought.\nIt's engineered.",
  sub_headline:
    "I'm Rishi — a Software Quality Engineer building reliable applications through intelligent automation, thoughtful testing, and engineering excellence.",
  primary_cta_text: 'Explore My Work',
  primary_cta_link: '#projects',
  secondary_cta_text: "Let's Connect",
  secondary_cta_link: '#contact',
  availability_status: 'Available for SDET & Quality Engineering Roles',
  enable_ambient_canvas: true,
  metrics: [
    { label: 'Defect Escape Rate', value: '< 0.1%', description: 'Production parity' },
    { label: 'Automated Coverage', value: '94%', description: 'Core workflows' },
    { label: 'Build Reliability', value: '99.8%', description: 'CI/CD uptime' },
  ],
};

export const defaultAboutSettings: AboutSettings = {
  heading: 'Engineering quality. One detail at a time.',
  subheading: 'Beyond manual checkpoints. Architecting verifiable, reproducible test systems.',
  paragraphs: [
    'As a Software QA Engineer at Frugal Testing, I approach quality from the ground up — not simply as a series of checks before a release, but as an architectural discipline woven into every commit, container, and deployment.',
    'My work spans the complete testing spectrum: from robust Selenium and Playwright browser automation suites to high-throughput RestAssured API contracts, Appium mobile test harnesses, and infrastructure sanity validation with Kafka, Redis, and Linux telemetry.',
    'I believe that the best testing is invisible until it saves the release. By shifting testing left and establishing resilient CI/CD quality gates, I help engineering teams deliver with speed without sacrificing stability.',
  ],
  statistics: [
    { label: 'Testing Domains', value: '3+', description: 'Web, Mobile & Backend Microservices' },
    { label: 'Technologies & Tools', value: '20+', description: 'Languages, Frameworks & CI/CD Stacks' },
    { label: 'Automation Frameworks', value: 'Multiple', description: 'Modular POM, Data-Driven & BDD' },
    { label: 'Validation Pipeline', value: 'Continuous', description: 'Automated Jenkins & GitHub Actions' },
  ],
  philosophy_pillars: [
    {
      title: 'Architectural Rigor',
      description:
        'Building maintainable, modular test frameworks utilizing the Page Object Model, thread-safe parallel runners, and resilient locators that resist brittle UI changes.',
    },
    {
      title: 'Shift-Left Integration',
      description:
        'Embedding regression gates and automated smoke verification directly into CI/CD pipelines to catch anomalies early when remediation cost is minimal.',
    },
    {
      title: 'Holistic Observability',
      description:
        'Validating not only client-side UI behavior, but asynchronous Kafka queues, Redis cache integrity, and Grafana system telemetry for full-stack certainty.',
    },
  ],
};

export const defaultHeaderSettings: HeaderSettings = {
  logo_text: 'Rishi',
  logo_badge: 'SQE',
  nav_links: [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ],
  resume_button_text: 'Resume',
  resume_url: '/resume.pdf',
};

export const defaultSEOSettings: SEOSettings = {
  meta_title: 'Rishi — Software Quality Engineer | Automation & SDET',
  meta_description:
    'Software Quality Assurance Engineer experienced in building scalable automation frameworks, API validation, mobile testing, and CI/CD quality engineering.',
  keywords:
    'Software Quality Engineer, SDET, Automation Engineer, Selenium, Playwright, Appium, RestAssured, Jenkins, TestNG, Java',
  og_image: '/og-image.png',
};

export const defaultProjects: Project[] = [
  {
    id: 'c0000000-0000-0000-0000-000000000001',
    title: 'E-Commerce Web Automation Framework',
    slug: 'ecommerce-web-automation-framework',
    short_description:
      'A scalable Selenium Java automation framework for validating an e-commerce web application with Page Object Model and Allure reporting.',
    full_description:
      'A production-grade test automation architecture designed to perform regression and sanity validation across complex e-commerce customer journeys. Built with thread-safe parallel execution capabilities, dynamic element synchronizers, and comprehensive Allure visual test reports.',
    category: 'Automation Testing',
    cover_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    technologies: ['Java', 'Selenium WebDriver', 'TestNG', 'Maven', 'Page Object Model', 'Allure Reports', 'Git'],
    testing_coverage: [
      'Login and session authentication validation across valid and invalid security permutations.',
      'Dynamic product search and debounce querying accuracy.',
      'Multi-parameter product filtering (category, price range, brand, availability).',
      'Persistent shopping cart state handling across page reloads and concurrent sessions.',
      'Multi-step checkout workflows with payment tokenization mock verifications.',
      'High-throughput regression testing executed in headless cross-browser grids.',
    ],
    key_highlights: [
      'Sample portfolio demonstration implementing strict clean-code Page Object Model design patterns.',
      'Parallel test execution with TestNG dataprovider threading for rapid build verification.',
      'Custom screenshot attachments on test failure integrated directly with Allure dashboards.',
    ],
    github_url: 'https://github.com/rishi-sqe/ecommerce-automation-framework',
    demo_url: '',
    featured: true,
    published: true,
    display_order: 1,
  },
  {
    id: 'c0000000-0000-0000-0000-000000000002',
    title: 'Banking API Automation Suite',
    slug: 'banking-api-automation-suite',
    short_description:
      'An API automation framework designed to validate secure banking transactions, account operations, and backend microservices.',
    full_description:
      'A robust API test suite engineered with Java and RestAssured for high-precision financial services validation. Handles OAuth2 token lifecycles, JSON Schema strict validation, transaction idempotency assertions, and edge-case boundary testing.',
    category: 'API Testing',
    cover_image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop',
    technologies: ['Java', 'RestAssured', 'TestNG', 'Maven', 'JSON Schema', 'Jackson', 'Postman'],
    testing_coverage: [
      'Mutual TLS and OAuth2 authentication bearer token generation and expiration handling.',
      'Account balance inquiry and ledger integrity validation across currency formats.',
      'Fund transfer idempotency and concurrent double-spend race condition tests.',
      'Transaction history pagination, filtering, and timestamp accuracy assertions.',
      'Comprehensive negative boundary scenarios (invalid payloads, rate limiting, SQL injection defense).',
      'Rigorous JSON schema and response header contract validation.',
    ],
    key_highlights: [
      'Sample portfolio demonstration modeling realistic banking microservice architectures.',
      'Custom response filter pipeline measuring API latency SLAs and logging request-response pairs.',
      'Automated mock server integration for consistent offline contract validation.',
    ],
    github_url: 'https://github.com/rishi-sqe/banking-api-automation',
    demo_url: '',
    featured: true,
    published: true,
    display_order: 2,
  },
  {
    id: 'c0000000-0000-0000-0000-000000000003',
    title: 'Mobile Application Testing Framework',
    slug: 'mobile-application-testing-framework',
    short_description:
      'Automated functional and compatibility testing of native Android applications using Appium and TestNG.',
    full_description:
      'A resilient mobile automation test harness architected to validate native Android apps across varying screen densities, Android OS versions, and network throttling profiles. Utilizes UIAutomator2 driver with robust locator fallbacks.',
    category: 'Mobile Testing',
    cover_image: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?q=80&w=1200&auto=format&fit=crop',
    technologies: ['Java', 'Appium', 'TestNG', 'Maven', 'Android UIAutomator2', 'ADB', 'Allure'],
    testing_coverage: [
      'Biometric and credentials-based login flows with secure storage validation.',
      'Native bottom navigation, drawer transitions, and deep linking resolution.',
      'Complex form input validation, keyboard dismissal, and scrollable containers.',
      'Push notification intercept verification and status bar payload parsing.',
      'Cross-device screen resolution, aspect ratio, and orientation compatibility.',
    ],
    key_highlights: [
      'Sample portfolio demonstration featuring ADB automation and capability management.',
      'Dynamic explicit wait helpers built specifically for hybrid and native Android view hierarchies.',
      'Automatic device screen capture and logcat extraction upon test failure.',
    ],
    github_url: 'https://github.com/rishi-sqe/mobile-appium-framework',
    demo_url: '',
    featured: true,
    published: true,
    display_order: 3,
  },
  {
    id: 'c0000000-0000-0000-0000-000000000004',
    title: 'Playwright End-to-End Testing',
    slug: 'playwright-e2e-testing-suite',
    short_description:
      'Modern high-speed browser automation for testing complex single-page web applications with parallel workers.',
    full_description:
      'Next-generation browser test automation utilizing Playwright with JavaScript/Node.js. Features auto-waiting, network request interception, visual comparison snapshots, and cross-browser testing across Chromium, WebKit, and Firefox.',
    category: 'Automation Testing',
    cover_image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
    technologies: ['Playwright', 'JavaScript', 'Node.js', 'Chromium', 'WebKit', 'Firefox', 'HTML Reports'],
    testing_coverage: [
      'Simultaneous cross-browser execution across Chromium, Firefox, and WebKit rendering engines.',
      'Complex single-page application UI state transitions and WebSocket communications.',
      'API interception, route mocking, and payload mutation for edge-case error states.',
      'Pixel-level visual regression and component snapshot comparison.',
      'High-speed parallel worker execution configured for ephemeral cloud runners.',
    ],
    key_highlights: [
      'Sample portfolio demonstration illustrating fast, flake-free modern web testing.',
      'Video recording and step-by-step trace viewer analysis enabled for failing scenarios.',
      'Zero-configuration multi-viewport responsive emulation (iPhone, iPad, Desktop 4K).',
    ],
    github_url: 'https://github.com/rishi-sqe/playwright-e2e-suite',
    demo_url: '',
    featured: true,
    published: true,
    display_order: 4,
  },
  {
    id: 'c0000000-0000-0000-0000-000000000005',
    title: 'CI/CD Continuous Testing Pipeline',
    slug: 'cicd-continuous-testing-pipeline',
    short_description:
      'Automated testing workflows integrated into continuous integration and delivery pipelines with automated gates.',
    full_description:
      'A robust continuous testing pipeline engineered with Jenkins and GitHub Actions. Automatically triggers smoke suites on pull requests, nightly regression matrices on main branches, and generates unified Allure telemetry dashboards with Slack alerts.',
    category: 'DevOps & CI/CD',
    cover_image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop',
    technologies: ['Jenkins', 'GitHub Actions', 'Docker', 'Maven', 'Allure Reports', 'Linux', 'Slack API'],
    testing_coverage: [
      'Automated pull request validation triggering containerized smoke test containers.',
      'Pre-merge build verification gates preventing broken artifacts from reaching staging.',
      'Scheduled nightly regression triggers across multi-agent Jenkins nodes.',
      'Automated Allure report publishing to static hosting with historical trends.',
      'Instant failure triage notifications with direct links to failure stack traces.',
    ],
    key_highlights: [
      'Sample portfolio demonstration featuring declarative Jenkinsfile and GitHub Actions workflows.',
      'Dockerized execution environment eliminating environment inconsistencies across developers.',
      'Pipeline caching of Maven dependencies reducing build execution cycles by over 50%.',
    ],
    github_url: 'https://github.com/rishi-sqe/cicd-quality-pipeline',
    demo_url: '',
    featured: true,
    published: true,
    display_order: 5,
  },
  {
    id: 'c0000000-0000-0000-0000-000000000006',
    title: 'Infrastructure & Deployment Validation',
    slug: 'infrastructure-deployment-validation',
    short_description:
      'Technical validation project demonstrating service health checks and deployment verification across distributed environments.',
    full_description:
      'A systems-level quality validation suite inspecting backend distributed services in Linux environments. Verifies port connectivity, Kafka consumer group lag, Redis/KeyDB cache eviction policies, and scrapes Grafana telemetry for anomaly detection post-deployment.',
    category: 'Monitoring & Infrastructure',
    cover_image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
    technologies: ['Linux', 'Shell Scripting', 'Kafka', 'Redis', 'KeyDB', 'Grafana', 'Docker', 'cURL'],
    testing_coverage: [
      'Distributed service availability and heartbeat probes across microservice clusters.',
      'TCP and HTTP port connectivity validation under firewall and security group rules.',
      'Post-deployment blue-green and canary smoke verification with rollback triggers.',
      'Kafka consumer lag monitoring and dead-letter queue inspection.',
      'KeyDB / Redis cluster connectivity, read/write latency, and replication checks.',
      'Log anomaly monitoring and Grafana metrics threshold validation.',
    ],
    key_highlights: [
      'Sample portfolio demonstration bridging QA automation with Site Reliability Engineering.',
      'Automated Bash validation scripts packaged as portable pre-flight and post-flight CLI tools.',
      'Grafana webhook integration reporting synthetic deployment health metrics.',
    ],
    github_url: 'https://github.com/rishi-sqe/infrastructure-validation-suite',
    demo_url: '',
    featured: true,
    published: true,
    display_order: 6,
  },
];

export const defaultExperiences: Experience[] = [
  {
    id: 'b0000000-0000-0000-0000-000000000001',
    company: 'Frugal Testing',
    role: 'Software QA Engineer',
    employment_type: 'Full-time',
    start_date: 'Oct 2023',
    end_date: 'Present',
    description:
      'Leading end-to-end quality assurance, test automation architecture, and deployment validation across complex web, mobile, and distributed backend ecosystems.',
    responsibilities: [
      'Web application manual and automation testing using Selenium Java with TestNG and Page Object Model.',
      'Mobile application functional and regression testing on Android devices using Appium.',
      'Backend API contract and payload validation utilizing Postman and RestAssured with automated schema assertions.',
      'CI/CD continuous testing integration orchestrating Jenkins pipelines and GitHub Actions workflows.',
      'Comprehensive test analytics and failure telemetry reporting using Allure Reports.',
      'Infrastructure deployment validation across distributed systems, inspecting Kafka event queues, Redis/KeyDB cache consistency, and Grafana performance dashboards.',
      'Environment sanity validation and production deployment support with zero-downtime regression gates.',
    ],
    technologies: [
      'Java',
      'Selenium',
      'TestNG',
      'Appium',
      'RestAssured',
      'Postman',
      'Jenkins',
      'GitHub Actions',
      'Allure Reports',
      'Kafka',
      'Redis',
      'KeyDB',
      'Grafana',
      'Linux',
      'Maven',
    ],
    achievements: [
      'Architected reusable Page Object Model framework reducing regression run times by 42%.',
      'Engineered zero-flakiness API validation suite covering 120+ microservice endpoints.',
      'Maintained 99.8% CI/CD pipeline pass reliability with automated test triage alerts.',
      'Pioneered infrastructure-level smoke validation across distributed Kafka & KeyDB nodes.',
    ],
    is_current: true,
    display_order: 1,
  },
];

export const defaultSkills: Skill[] = [
  // 1. Automation Testing
  { id: 's1', name: 'Selenium WebDriver', category: 'Automation Testing', display_order: 1, proficiency_level: 'Expert' },
  { id: 's2', name: 'Playwright', category: 'Automation Testing', display_order: 2, proficiency_level: 'Advanced' },
  { id: 's3', name: 'TestNG', category: 'Automation Testing', display_order: 3, proficiency_level: 'Expert' },
  { id: 's4', name: 'Page Object Model (POM)', category: 'Automation Testing', display_order: 4, proficiency_level: 'Expert' },
  { id: 's5', name: 'Cucumber BDD', category: 'Automation Testing', display_order: 5, proficiency_level: 'Intermediate' },
  { id: 's6', name: 'Allure Test Reporting', category: 'Automation Testing', display_order: 6, proficiency_level: 'Expert' },

  // 2. Manual Testing
  { id: 's7', name: 'Functional Testing', category: 'Manual Testing', display_order: 1, proficiency_level: 'Expert' },
  { id: 's8', name: 'Regression Testing', category: 'Manual Testing', display_order: 2, proficiency_level: 'Expert' },
  { id: 's9', name: 'Smoke & Sanity Testing', category: 'Manual Testing', display_order: 3, proficiency_level: 'Expert' },
  { id: 's10', name: 'Exploratory Testing', category: 'Manual Testing', display_order: 4, proficiency_level: 'Advanced' },
  { id: 's11', name: 'User Acceptance Testing (UAT)', category: 'Manual Testing', display_order: 5, proficiency_level: 'Advanced' },
  { id: 's12', name: 'Defect Lifecycle & Triage', category: 'Manual Testing', display_order: 6, proficiency_level: 'Expert' },

  // 3. API Testing
  { id: 's13', name: 'RestAssured', category: 'API Testing', display_order: 1, proficiency_level: 'Expert' },
  { id: 's14', name: 'Postman', category: 'API Testing', display_order: 2, proficiency_level: 'Expert' },
  { id: 's15', name: 'RESTful API Validation', category: 'API Testing', display_order: 3, proficiency_level: 'Expert' },
  { id: 's16', name: 'JSON Schema Validation', category: 'API Testing', display_order: 4, proficiency_level: 'Advanced' },
  { id: 's17', name: 'Swagger / OpenAPI', category: 'API Testing', display_order: 5, proficiency_level: 'Advanced' },

  // 4. Mobile Testing
  { id: 's18', name: 'Appium', category: 'Mobile Testing', display_order: 1, proficiency_level: 'Advanced' },
  { id: 's19', name: 'Android UIAutomator2', category: 'Mobile Testing', display_order: 2, proficiency_level: 'Advanced' },
  { id: 's20', name: 'ADB (Android Debug Bridge)', category: 'Mobile Testing', display_order: 3, proficiency_level: 'Advanced' },
  { id: 's21', name: 'Mobile Browser Emulation', category: 'Mobile Testing', display_order: 4, proficiency_level: 'Advanced' },

  // 5. Programming Languages
  { id: 's22', name: 'Java', category: 'Programming Languages', display_order: 1, proficiency_level: 'Advanced' },
  { id: 's23', name: 'JavaScript (ES6+)', category: 'Programming Languages', display_order: 2, proficiency_level: 'Advanced' },
  { id: 's24', name: 'TypeScript', category: 'Programming Languages', display_order: 3, proficiency_level: 'Intermediate' },
  { id: 's25', name: 'SQL', category: 'Programming Languages', display_order: 4, proficiency_level: 'Advanced' },
  { id: 's26', name: 'Bash / Shell Scripting', category: 'Programming Languages', display_order: 5, proficiency_level: 'Intermediate' },

  // 6. Frontend Development
  { id: 's27', name: 'React.js', category: 'Frontend Development', display_order: 1, proficiency_level: 'Intermediate' },
  { id: 's28', name: 'HTML5 & Semantic Markup', category: 'Frontend Development', display_order: 2, proficiency_level: 'Advanced' },
  { id: 's29', name: 'CSS3 & Tailwind CSS', category: 'Frontend Development', display_order: 3, proficiency_level: 'Advanced' },
  { id: 's30', name: 'DOM Inspection & Selectors', category: 'Frontend Development', display_order: 4, proficiency_level: 'Expert' },

  // 7. Backend Development
  { id: 's31', name: 'Node.js', category: 'Backend Development', display_order: 1, proficiency_level: 'Intermediate' },
  { id: 's32', name: 'Express.js', category: 'Backend Development', display_order: 2, proficiency_level: 'Intermediate' },
  { id: 's33', name: 'Microservice Architecture', category: 'Backend Development', display_order: 3, proficiency_level: 'Intermediate' },
  { id: 's34', name: 'REST API Development', category: 'Backend Development', display_order: 4, proficiency_level: 'Intermediate' },

  // 8. DevOps & CI/CD
  { id: 's35', name: 'Jenkins', category: 'DevOps & CI/CD', display_order: 1, proficiency_level: 'Advanced' },
  { id: 's36', name: 'GitHub Actions', category: 'DevOps & CI/CD', display_order: 2, proficiency_level: 'Advanced' },
  { id: 's37', name: 'Git & GitHub', category: 'DevOps & CI/CD', display_order: 3, proficiency_level: 'Advanced' },
  { id: 's38', name: 'Maven Build Tool', category: 'DevOps & CI/CD', display_order: 4, proficiency_level: 'Advanced' },
  { id: 's39', name: 'Docker Containers', category: 'DevOps & CI/CD', display_order: 5, proficiency_level: 'Intermediate' },

  // 9. Monitoring & Infrastructure
  { id: 's40', name: 'Linux Systems', category: 'Monitoring & Infrastructure', display_order: 1, proficiency_level: 'Advanced' },
  { id: 's41', name: 'Grafana Dashboards', category: 'Monitoring & Infrastructure', display_order: 2, proficiency_level: 'Intermediate' },
  { id: 's42', name: 'Apache Kafka', category: 'Monitoring & Infrastructure', display_order: 3, proficiency_level: 'Intermediate' },
  { id: 's43', name: 'Redis / KeyDB In-Memory Caching', category: 'Monitoring & Infrastructure', display_order: 4, proficiency_level: 'Intermediate' },
  { id: 's44', name: 'Infrastructure Sanity Checks', category: 'Monitoring & Infrastructure', display_order: 5, proficiency_level: 'Advanced' },

  // 10. Database Technologies
  { id: 's45', name: 'MongoDB', category: 'Database Technologies', display_order: 1, proficiency_level: 'Intermediate' },
  { id: 's46', name: 'SQL & Relational Databases', category: 'Database Technologies', display_order: 2, proficiency_level: 'Advanced' },
  { id: 's47', name: 'Data Integrity Verification', category: 'Database Technologies', display_order: 3, proficiency_level: 'Advanced' },
];

export const defaultMessages: ContactMessage[] = [
  {
    id: 'm1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@enterprise-tech.io',
    subject: 'Senior SDET / Automation Lead Opportunity',
    message:
      'Hi Rishi, we came across your work in test automation and distributed system validation. We are expanding our SDET infrastructure team and would love to connect about an upcoming automation leadership position.',
    status: 'unread',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'm2',
    name: 'David Miller',
    email: 'david.m@cloudscale.co',
    subject: 'Consulting on Playwright & Kafka testing',
    message:
      'Hello Rishi, loved your approach to infrastructure sanity testing. Would you be open to sharing your insights on how you validate Kafka consumer lag within CI/CD pipelines?',
    status: 'read',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
];

