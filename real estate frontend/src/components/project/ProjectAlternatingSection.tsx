import * as React from 'react';
import { LargeImageComponent } from './LargeImageComponent';
import { InfoCardComponent } from './InfoCardComponent';
import type { Project } from '../../types';
import { getImageUrl } from '../../utils';

interface ProjectWithMeta extends Project {
  propertyCount: number;
  priceRange: { min: number; max: number };
  types: string[];
}

interface ProjectAlternatingSectionProps {
  project: Project | ProjectWithMeta;
  index: number;
  onExplore: () => void;
}

export const ProjectAlternatingSection = ({
  project,
  index,
  onExplore,
}: ProjectAlternatingSectionProps) => {
  const projectNumber = String(index + 1).padStart(2, '0');
  const isReversed = index % 2 === 1;

  const description = project.short_description ||
    `Discover luxury living at ${project.name}, featuring exceptional design and premium amenities.`;

  const firstImage = getImageUrl(project.first_image);
  const secondImage = getImageUrl(project.second_image);

  return (
    <section className="py-20 md:py-28 lg:py-36 bg-white border-b border-[rgb(230,230,230)]">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-10">
          {isReversed ? (
            <>
              <InfoCardComponent
                image={secondImage}
                title={project.name}
                description={description}
                onExplore={onExplore}
                projectNumber={projectNumber}
              />
              <LargeImageComponent
                image={firstImage}
                alt={project.name}
              />
            </>
          ) : (
            <>
              <LargeImageComponent
                image={firstImage}
                alt={project.name}
              />
              <InfoCardComponent
                image={secondImage}
                title={project.name}
                description={description}
                onExplore={onExplore}
                projectNumber={projectNumber}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectAlternatingSection;