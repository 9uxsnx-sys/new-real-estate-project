import * as React from 'react';
import { useState } from 'react';
import { Check } from 'lucide-react';
import { ImageGalleryModal } from '../ui/ImageGalleryModal';

export interface ProjectSectionData {
  id: string;
  title: string;
  images: string[];
  description?: string;
  features?: string[];
}

interface ProjectSectionProps extends ProjectSectionData {
  index?: number;
}

export const ProjectSection: React.FC<ProjectSectionProps> = ({
  title,
  images,
  description,
  features,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInitialIndex, setModalInitialIndex] = useState(0);

  const openModal = (startIndex: number) => {
    setModalInitialIndex(startIndex);
    setIsModalOpen(true);
  };

  // Check if section has any content to display
  const hasContent = title || description || (features && features.length > 0);
  const hasImages = images && images.length > 0;

  // If no images AND no other content, hide the entire section
  if (!hasImages && !hasContent) {
    return null;
  }

  // Scenario 1: No images but has other content - show section without gallery
  if (!hasImages) {
    return (
      <div className="py-6 border-b border-[rgb(230,230,230)]">
        {title && (
          <h2
            className="text-[24px] md:text-[28px] font-semibold text-[rgb(44,44,44)] mb-6"
            style={{ fontFamily: 'Geist, sans-serif' }}
          >
            {title}
          </h2>
        )}

        {description && (
          <div className="mb-6">
            <h3 className="text-[18px] md:text-[20px] font-semibold text-[rgb(44,44,44)] mb-3" style={{ fontFamily: 'Geist, sans-serif' }}>Overview</h3>
            <p className="text-[14px] md:text-[16px] text-[rgb(44,44,44)] font-light leading-relaxed" style={{ fontFamily: 'Geist, sans-serif' }}>{description}</p>
          </div>
        )}

        {features && features.length > 0 && (
          <div>
            <h3 className="text-[18px] md:text-[20px] font-semibold text-[rgb(44,44,44)] mb-3" style={{ fontFamily: 'Geist, sans-serif' }}>Features</h3>
            <div className="flex flex-col gap-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check size={16} strokeWidth={2} className="text-[rgb(100,100,100)] flex-shrink-0" />
                  <span className="text-[14px] text-[rgb(44,44,44)] font-light" style={{ fontFamily: 'Geist, sans-serif' }}>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Scenario 2: Only 1 image - full-width single image
  if (images.length === 1) {
    return (
      <div className="py-6 border-b border-[rgb(230,230,230)]">
        {title && (
          <h2
            className="text-[24px] md:text-[28px] font-semibold text-[rgb(44,44,44)] mb-6"
            style={{ fontFamily: 'Geist, sans-serif' }}
          >
            {title}
          </h2>
        )}
        <div 
          className="w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-2xl cursor-pointer mb-6"
          onClick={() => openModal(0)}
        >
          <img
            src={images[0]}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        {description && (
          <div className="mb-6">
            <h3 className="text-[18px] md:text-[20px] font-semibold text-[rgb(44,44,44)] mb-3" style={{ fontFamily: 'Geist, sans-serif' }}>Overview</h3>
            <p className="text-[14px] md:text-[16px] text-[rgb(44,44,44)] font-light leading-relaxed" style={{ fontFamily: 'Geist, sans-serif' }}>{description}</p>
          </div>
        )}

        {features && features.length > 0 && (
          <div>
            <h3 className="text-[18px] md:text-[20px] font-semibold text-[rgb(44,44,44)] mb-3" style={{ fontFamily: 'Geist, sans-serif' }}>Features</h3>
            <div className="flex flex-col gap-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check size={16} strokeWidth={2} className="text-[rgb(100,100,100)] flex-shrink-0" />
                  <span className="text-[14px] text-[rgb(44,44,44)] font-light" style={{ fontFamily: 'Geist, sans-serif' }}>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <ImageGalleryModal images={images} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialIndex={modalInitialIndex} />
      </div>
    );
  }

  // Scenario 3: Only 2 images - 50/50 split in one row
  if (images.length === 2) {
    return (
      <div className="py-6 border-b border-[rgb(230,230,230)]">
        {title && (
          <h2
            className="text-[24px] md:text-[28px] font-semibold text-[rgb(44,44,44)] mb-6"
            style={{ fontFamily: 'Geist, sans-serif' }}
          >
            {title}
          </h2>
        )}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="aspect-[16/9] overflow-hidden rounded-2xl cursor-pointer"
              onClick={() => openModal(index)}
            >
              <img
                src={image}
                alt={`${title} - ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        {description && (
          <div className="mb-6">
            <h3 className="text-[18px] md:text-[20px] font-semibold text-[rgb(44,44,44)] mb-3" style={{ fontFamily: 'Geist, sans-serif' }}>Overview</h3>
            <p className="text-[14px] md:text-[16px] text-[rgb(44,44,44)] font-light leading-relaxed" style={{ fontFamily: 'Geist, sans-serif' }}>{description}</p>
          </div>
        )}

        {features && features.length > 0 && (
          <div>
            <h3 className="text-[18px] md:text-[20px] font-semibold text-[rgb(44,44,44)] mb-3" style={{ fontFamily: 'Geist, sans-serif' }}>Features</h3>
            <div className="flex flex-col gap-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check size={16} strokeWidth={2} className="text-[rgb(100,100,100)] flex-shrink-0" />
                  <span className="text-[14px] text-[rgb(44,44,44)] font-light" style={{ fontFamily: 'Geist, sans-serif' }}>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <ImageGalleryModal images={images} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialIndex={modalInitialIndex} />
      </div>
    );
  }

  // Scenario 4: Only 3 images - asymmetric layout (1 main + 2 side)
  if (images.length === 3) {
    return (
      <div className="py-6 border-b border-[rgb(230,230,230)]">
        {title && (
          <h2
            className="text-[24px] md:text-[28px] font-semibold text-[rgb(44,44,44)] mb-6"
            style={{ fontFamily: 'Geist, sans-serif' }}
          >
            {title}
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_0.5fr] md:grid-rows-2 gap-4 mb-6">
          {/* Main Large Image - Spans 2 rows */}
          <div 
            className="md:col-span-1 md:row-span-2 aspect-[16/10] md:aspect-auto md:h-full overflow-hidden rounded-2xl cursor-pointer"
            onClick={() => openModal(0)}
          >
            <img
              src={images[0]}
              alt={`${title} - Main`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Side Images - 2 images stacked vertically */}
          {[images[1], images[2]].map((image, index) => (
            <div 
              key={index} 
              className="aspect-[16/9] md:aspect-auto md:h-full overflow-hidden rounded-2xl cursor-pointer"
              onClick={() => openModal(index + 1)}
            >
              <img
                src={image}
                alt={`${title} - ${index + 2}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        {description && (
          <div className="mb-6">
            <h3 className="text-[18px] md:text-[20px] font-semibold text-[rgb(44,44,44)] mb-3" style={{ fontFamily: 'Geist, sans-serif' }}>Overview</h3>
            <p className="text-[14px] md:text-[16px] text-[rgb(44,44,44)] font-light leading-relaxed" style={{ fontFamily: 'Geist, sans-serif' }}>{description}</p>
          </div>
        )}

        {features && features.length > 0 && (
          <div>
            <h3 className="text-[18px] md:text-[20px] font-semibold text-[rgb(44,44,44)] mb-3" style={{ fontFamily: 'Geist, sans-serif' }}>Features</h3>
            <div className="flex flex-col gap-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check size={16} strokeWidth={2} className="text-[rgb(100,100,100)] flex-shrink-0" />
                  <span className="text-[14px] text-[rgb(44,44,44)] font-light" style={{ fontFamily: 'Geist, sans-serif' }}>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <ImageGalleryModal images={images} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialIndex={modalInitialIndex} />
      </div>
    );
  }

  // Scenario 5: 3+ images - same layout as primary gallery (1 main + 2 side) with +N overlay
  const galleryImages = images.slice(0, 3);
  const [mainImage, ...sideImages] = galleryImages;
  const remainingCount = images.length - 3;
  const hasMoreImages = remainingCount > 0;

  return (
    <div className="py-6 border-b border-[rgb(230,230,230)]">
      {title && (
        <h2
          className="text-[24px] md:text-[28px] font-semibold text-[rgb(44,44,44)] mb-6"
          style={{ fontFamily: 'Geist, sans-serif' }}
        >
          {title}
        </h2>
      )}
      
      {/* Gallery Grid - Same as primary gallery: 1 main + 2 side */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_0.5fr] md:grid-rows-2 gap-4 mb-6">
        {/* Main Large Image - Spans 2 rows */}
        <div 
          className="md:col-span-1 md:row-span-2 aspect-[16/10] md:aspect-auto md:h-full overflow-hidden rounded-2xl cursor-pointer"
          onClick={() => openModal(0)}
        >
          <img
            src={mainImage}
            alt={`${title} - Main`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Side Images - 2 images stacked vertically */}
        {sideImages.map((image, index) => (
          <div 
            key={index} 
            className="relative aspect-[16/9] md:aspect-auto md:h-full overflow-hidden rounded-2xl cursor-pointer"
            onClick={() => openModal(index + 1)}
          >
            <img
              src={image}
              alt={`${title} - ${index + 2}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
            {/* +X Overlay on the 2nd side image (bottom-right) */}
            {index === 1 && hasMoreImages && (
              <div 
                className="absolute inset-0 flex items-center justify-center rounded-2xl"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
              >
                <span 
                  className="text-white text-2xl font-semibold"
                  style={{ fontFamily: 'Geist, sans-serif' }}
                >
                  +{remainingCount}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {description && (
        <div className="mb-6">
          <h3 className="text-[18px] md:text-[20px] font-semibold text-[rgb(44,44,44)] mb-3" style={{ fontFamily: 'Geist, sans-serif' }}>Overview</h3>
          <p className="text-[14px] md:text-[16px] text-[rgb(44,44,44)] font-light leading-relaxed" style={{ fontFamily: 'Geist, sans-serif' }}>{description}</p>
        </div>
      )}

      {features && features.length > 0 && (
        <div>
          <h3 className="text-[18px] md:text-[20px] font-semibold text-[rgb(44,44,44)] mb-3" style={{ fontFamily: 'Geist, sans-serif' }}>Features</h3>
          <div className="flex flex-col gap-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <Check size={16} strokeWidth={2} className="text-[rgb(100,100,100)] flex-shrink-0" />
                <span className="text-[14px] text-[rgb(44,44,44)] font-light" style={{ fontFamily: 'Geist, sans-serif' }}>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image Gallery Modal */}
      <ImageGalleryModal
        images={images}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialIndex={modalInitialIndex}
      />
    </div>
  );
};
