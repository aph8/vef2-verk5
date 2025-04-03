'use client';

import { Image as DatoImage } from 'react-datocms';
import '@/styles/ImageGallery.scss';
import { ResponsiveImage } from '@/lib/datocms';
import { useState } from 'react';

interface ImageGalleryProps {
  images: { responsiveImage: ResponsiveImage }[];
  containerHeight?: number;
  customWidth?: number; 
  quality?: number;
}

export default function ImageGallery({
  images,
  containerHeight = 600,
  customWidth = 1600,
  quality = 100
}: ImageGalleryProps) {

  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="gallery-container" style={{ height: containerHeight }}>
      <DatoImage data={images[current].responsiveImage} />
      {images.length > 1 && (
        <div className="gallery-controls">
          <button onClick={prevSlide}>←</button>
          <button onClick={nextSlide}>→</button>
        </div>
      )}
    </div>
  );
}
