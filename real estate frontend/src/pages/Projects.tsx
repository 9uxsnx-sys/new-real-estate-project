import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { ProjectAlternatingSection } from '../components/project';
import { ResponsiveFooter } from '@/components/layout';
import { SEO } from '../components/seo';
import { ProjectNotFound } from '../components/ui/ProjectNotFound';
import { useProjects, useContact } from '../hooks';
import type { Project } from '../types';

interface ProjectWithMeta extends Project {
  propertyCount: number;
  priceRange: { min: number; max: number };
}

export const Projects: React.FC = () => {
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const { t } = useTranslation();
  const currentLang = lang || 'en';

  const { projects, loading, error } = useProjects(currentLang);
  const { contact } = useContact();

  const handleProjectClick = (projectSlug: string) => {
    navigate(`/${currentLang}/projects/${projectSlug}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load projects. Please try again.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-black text-white rounded-full"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-[clamp(60px,7vh,80px)]">
      <SEO 
        title="Our Projects"
        description="Explore our premium real estate projects in Algeria. Discover exceptional residential and commercial developments designed for modern living."
        url="projects"
        lang={currentLang}
      />
      <section className="py-6 md:py-8 border-b border-[rgb(230,230,230)]">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-4 md:px-8 lg:px-20">
          <div>
            <h1
              className="text-[32px] md:text-[40px] lg:text-[48px] font-semibold text-[rgb(44,44,44)] leading-[1.2]"
              style={{ fontFamily: 'Geist, sans-serif' }}
            >
              {t('hero.ourProjects')}
            </h1>
          </div>
        </div>
      </section>

      {projects.length === 0 ? (
        <ProjectNotFound fullPage={false} showBackToProjects={false} />
      ) : (
        projects.slice(0, 4).map((project, index) => (
          <ProjectAlternatingSection
            key={project.id}
            project={project as ProjectWithMeta}
            index={index}
            onExplore={() => handleProjectClick(project.slug)}
          />
        )))}

      <ResponsiveFooter lang={currentLang} contact={contact} />
    </div>
  );
};

export default Projects;