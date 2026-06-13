import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { MapPin } from 'lucide-react';
import {
  PropertyGallery,
  PropertySpecs,
  PropertyFeatures,
  PropertyLocation,
} from '../components/property-detail';
import { ProjectSection, ProjectSectionData, ProjectContactSidebar } from '../components/project-detail';
import { PropertyCard } from '@/components/ui/property-card';
import { Footer } from '../components/sections';
import { SEO } from '../components/seo';
import { useProject, useProperties } from '../hooks';
import { formatPrice, getImageUrl } from '../utils';
import type { PropertyFeature as PropertyFeatureType } from '../types';

export const ProjectDetail: React.FC = () => {
  const navigate = useNavigate();
  const { projectId, lang } = useParams<{ projectId: string; lang: string }>();
  const { t, i18n } = useTranslation();
  const currentLang = lang || 'en';

  const pageRef = useRef<HTMLDivElement>(null);
  const backBtnRef = useRef<HTMLButtonElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const { project, loading: projectLoading, error: projectError } = useProject(projectId, currentLang);
  const { properties: projectProperties, loading: propertiesLoading } = useProperties(
    projectId ? { projectSlug: projectId } : {},
    currentLang
  );

  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      if (backBtnRef.current) {
        tl.fromTo(backBtnRef.current,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }
        );
      }

      if (titleRef.current) {
        tl.fromTo(titleRef.current,
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' },
          '-=0.3'
        );
      }

      const sections = pageRef.current.querySelectorAll('.border-b, .project-section');
      gsap.fromTo(sections,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: pageRef.current,
            start: 'top 80%'
          }
        }
      );

      const cards = pageRef.current.querySelectorAll('.property-card');
      if (cards.length > 0) {
        gsap.fromTo(cards,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cards[0],
              start: 'top 85%'
            }
          }
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, [project, projectProperties]);

  if (projectLoading) {
    return (
      <div className="min-h-screen bg-white pt-[clamp(60px,7vh,80px)]">
        <div className="max-w-[1360px] mx-auto px-4 md:px-8 lg:px-20 py-12">
          <div className="animate-pulse">
            <div className="h-8 w-32 bg-gray-200 rounded mb-6"></div>
            <div className="aspect-[16/9] bg-gray-200 rounded-3xl mb-6"></div>
            <div className="h-12 w-64 bg-gray-200 rounded mb-4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (projectError || !project) {
    return (
      <div className="min-h-screen bg-white pt-[clamp(60px,7vh,80px)]">
        <div className="max-w-[1360px] mx-auto px-4 md:px-8 lg:px-20 py-12 text-center">
          <h1
            className="text-2xl font-semibold text-[rgb(44,44,44)] mb-4"
            style={{ fontFamily: 'Geist, sans-serif' }}
          >
            {t('common.notFound')}
          </h1>
          <button
            onClick={() => navigate(`/${currentLang}/projects`)}
            className="px-6 py-3 bg-black text-white rounded-full hover:bg-[rgb(44,44,44)] transition-colors"
          >
            {t('project.backToProjects')}
          </button>
        </div>
      </div>
    );
  }

  const galleryImages = project.gallery && project.gallery.length > 0
    ? project.gallery.map((img: any) => getImageUrl(img, 'full')).filter(Boolean) as string[]
    : project.first_image 
      ? [getImageUrl(project.first_image, 'full')]
      : [];

  const features: PropertyFeatureType[] = project.features 
    ? project.features.map(f => ({ id: f.id, name: f.name || f }))
    : [];

  const customSections: ProjectSectionData[] = (project.custom_sections || []).map((section: any) => ({
    id: section.id,
    title: typeof section.title === 'string' ? section.title : section.title?.en || section.title?.fr || section.title?.ar || '',
    images: (section.gallery || []).map((g: any) => getImageUrl(g.image || g, 'full')).filter(Boolean),
    description: typeof section.description === 'string' 
      ? section.description 
      : section.description?.en || section.description?.fr || section.description?.ar || '',
    features: (section.features || []).map((f: any) => 
      typeof f === 'string' ? f : (f.name || '')
    ).filter(Boolean),
  }));

  return (
    <div ref={pageRef} className="min-h-screen bg-white">
      <SEO 
        title={project.name}
        description={project.description || project.short_description || `Discover ${project.name}, a premium real estate project featuring exceptional design and luxury living.`}
        image={galleryImages[0]}
        url={`projects/${projectId}`}
        lang={currentLang}
      />
      <div className="max-w-[1360px] mx-auto px-4 md:px-8 lg:px-20 py-4 md:py-6">
        <button
          ref={backBtnRef}
          onClick={() => navigate(`/${currentLang}/projects`)}
          className="flex items-center gap-2 text-[rgb(44,44,44)] hover:text-black transition-colors mb-4"
          style={{ fontFamily: 'Geist, sans-serif' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {i18n.language === 'ar' ? (
              <path d="M5 12h14M12 19l7-7-7-7" />
            ) : (
              <path d="M19 12H5M12 19l-7-7 7-7" />
            )}
          </svg>
          {t('project.backToProjects')}
        </button>

        <PropertyGallery images={galleryImages} propertyName={project.name} />

        <div className="mt-4 mb-2">
          <h2
            ref={titleRef}
            className="text-[28px] md:text-[36px] lg:text-[40px] font-semibold text-[rgb(44,44,44)]"
            style={{ fontFamily: 'Geist, sans-serif' }}
          >
            {project.name}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <MapPin size={20} strokeWidth={1.5} className="text-[rgb(136,136,136)]" />
            <p
              className="text-[rgb(136,136,136)]"
              style={{ fontFamily: 'Geist, sans-serif' }}
            >
              {project.place || ''}{project.place && project.city ? ', ' : ''}{project.city || ''}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_340px] gap-8 lg:gap-12 mt-6">
          <div className="order-1">
            <div className="py-6 border-b border-[rgb(230,230,230)]">
              <h3
                className="text-[20px] md:text-[24px] font-semibold text-[rgb(44,44,44)] mb-4"
                style={{ fontFamily: 'Geist, sans-serif' }}
              >
                {t('property.overview')}
              </h3>
              <p
                className="text-[14px] md:text-[16px] text-[rgb(44,44,44)] font-light leading-relaxed"
                style={{ fontFamily: 'Geist, sans-serif' }}
              >
                {project.description || project.short_description || `Discover ${project.name}, a premium real estate project featuring exceptional design and luxury living.`}
              </p>
            </div>

            <PropertyFeatures features={features} />

            {customSections.map((section, index) => (
              <div key={section.id} className="project-section">
                <ProjectSection {...section} index={index} />
              </div>
            ))}

            <PropertyLocation
              address={`${project.place}, ${project.city}`}
              googleMapUrl={project.google_map}
              lat={25.2048}
              lng={55.2708}
            />

            {Array.isArray(projectProperties) && projectProperties.length > 0 && (
              <div className="py-6 border-t border-b border-[rgb(230,230,230)]">
                <div className="flex items-center justify-between mb-6">
                  <h3
                    className="text-[20px] md:text-[24px] font-semibold text-[rgb(44,44,44)]"
                    style={{ fontFamily: 'Geist, sans-serif' }}
                  >
                    {t('project.propertiesInProject')}
                  </h3>

                  {projectProperties.length >= 1 && (
                    <button
                      onClick={() => navigate(`/${currentLang}/properties?project=${projectId}`)}
                      className="flex items-center gap-1 text-[14px] font-light text-[rgb(44,44,44)] hover:text-black transition-colors"
                      style={{ fontFamily: 'Geist, sans-serif' }}
                    >
                      {t('project.seeMore')}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {projectProperties.slice(0, 3).map((property) => (
                    <div key={property.id} className="property-card">
                      <PropertyCard
                        imageUrl={getImageUrl(property.image)}
                        price={formatPrice(property.price)}
                        title={property.name || property.property_code}
                        location={`${property.area}, ${property.city}`}
                        beds={property.beds}
                        baths={property.baths}
                        space={property.space_sqm}
                        propertyType={property.property_type}
                        onClick={() => navigate(`/${currentLang}/property/${property.id}`)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="order-2 px-6 md:px-0">
            <ProjectContactSidebar
              projectName={project.name}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectDetail;