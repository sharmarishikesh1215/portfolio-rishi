import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { PortfolioProvider } from './context/PortfolioContext';

// Pages
import { HomePage } from './pages/HomePage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminHeroSettings } from './pages/admin/AdminHeroSettings';
import { AdminAboutSettings } from './pages/admin/AdminAboutSettings';
import { AdminExperiences } from './pages/admin/AdminExperiences';
import { AdminProjects } from './pages/admin/AdminProjects';
import { AdminSkills } from './pages/admin/AdminSkills';
import { AdminContactSettings } from './pages/admin/AdminContactSettings';
import { AdminMessages } from './pages/admin/AdminMessages';
import { AdminSEOSettings } from './pages/admin/AdminSEOSettings';
import { AdminSiteSettings } from './pages/admin/AdminSiteSettings';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PortfolioProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/projects/:slug" element={<ProjectDetailPage />} />

              {/* Admin Authentication */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Admin Protected Dashboard Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="hero" element={<AdminHeroSettings />} />
                <Route path="about" element={<AdminAboutSettings />} />
                <Route path="experiences" element={<AdminExperiences />} />
                <Route path="projects" element={<AdminProjects />} />
                <Route path="skills" element={<AdminSkills />} />
                <Route path="contact-info" element={<AdminContactSettings />} />
                <Route path="messages" element={<AdminMessages />} />
                <Route path="seo" element={<AdminSEOSettings />} />
                <Route path="site-settings" element={<AdminSiteSettings />} />
              </Route>

              {/* Catch-all redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </PortfolioProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;

