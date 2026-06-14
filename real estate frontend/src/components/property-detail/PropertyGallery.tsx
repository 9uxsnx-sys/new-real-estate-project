import React, { useState } from 'react';
import { ImageGalleryModal } from '../ui/ImageGalleryModal';

interface PropertyGalleryProps {
  images: string[];
  propertyName: string;
}

export const PropertyGallery: React.FC<PropertyGalleryProps> = ({ images, propertyName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInitialIndex, setModalInitialIndex] = useState(0);

  // DEBUG: Log images received
  console.log('[PropertyGallery] images:', images);
  console.log('[PropertyGallery] images.length:', images?.length);

  const openModal = (startIndex: number) => {
    setModalInitialIndex(startIndex);
    setIsModalOpen(true);
  };

  // Scenario 1: No images - hide the entire section
  if (!images || images.length === 0) {
    return null;
  }

  // Scenario 2: Only 1 image - full-width single image
  if (images.length === 1) {
    return (
      <>
        <div 
          className="w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-3xl cursor-pointer"
          onClick={() => openModal(0)}
        >
          <img
            src={images[0]}
            alt={`${propertyName}`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        <ImageGalleryModal
          images={images}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialIndex={modalInitialIndex}
        />
      </>
    );
  }

  // Scenario 3: Only 2 images - 50/50 split in one row
  if (images.length === 2) {
    return (
      <>
        <div className="grid grid-cols-2 gap-4 w-full">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="aspect-[16/9] overflow-hidden rounded-3xl cursor-pointer"
              onClick={() => openModal(index)}
            >
              <img
                src={image}
                alt={`${propertyName} - ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        <ImageGalleryModal
          images={images}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialIndex={modalInitialIndex}
        />
      </>
    );
  }

  // Scenario 4: 3+ images - original layout (1 main + 2 side) with +N overlay
  const galleryImages = images.slice(0, 3);
  const [mainImage, ...sideImages] = galleryImages;
  const remainingCount = images.length - 3;
  const hasMoreImages = remainingCount > 0;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_0.5fr] md:grid-rows-2 gap-4 w-full">
        {/* Main Large Image - Spans 2 rows */}
        <div 
          className="md:col-span-1 md:row-span-2 aspect-[16/10] md:aspect-auto md:h-full overflow-hidden rounded-3xl cursor-pointer"
          onClick={() => openModal(0)}
        >
          <img
            src={mainImage}
            alt={`${propertyName} - Main`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Side Images - 2 images stacked vertically, 1 per row */}
        {sideImages.map((image, index) => (
          <div 
            key={index} 
            className="relative aspect-[16/9] md:aspect-auto md:h-full overflow-hidden rounded-3xl cursor-pointer"
            onClick={() => openModal(index + 1)}
          >
            <img
              src={image}
              alt={`${propertyName} - ${index + 2}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
            {/* +X Overlay on the 2nd side image (bottom-right) */}
            {index === 1 && hasMoreImages && (
              <div 
                className="absolute inset-0 flex items-center justify-center rounded-3xl"
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

      {/* Image Gallery Modal */}
      <ImageGalleryModal
        images={images}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialIndex={modalInitialIndex}
      />
    </>
  );
};
