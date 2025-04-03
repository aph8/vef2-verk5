'use client';

import { useState } from 'react';
import Image from 'next/image';
import '@/styles/ImageComponent.scss';

interface ImageComponentProps {
  src?: string;
  alt?: string;
  containerHeight?: number | string;
  customWidth?: number;
  quality?: number;
  objectFit?: 'cover' | 'contain' | 'scale-down';
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  className?: string;
}

export default function ImageComponent({
  src,
  alt = 'mynd',
  containerHeight = 600, 
  customWidth = 1600, 
  quality = 100,
  objectFit = 'cover',
  placeholder = 'empty',
  blurDataURL,
  className = '',
}: ImageComponentProps) {
  const [loaded, setLoaded] = useState(false);

  if (!src) {
    return <div className={`no-image ${className}`}>[engin mynd]</div>;
  }

  const imageAlt = alt.trim() !== '' ? alt : 'mynd';
  const optimizedUrl = `${src}?w=${customWidth}&auto=format&q=${quality}`;

  return (
    <div
      className={`image-container ${className}`}
      style={{ position: 'relative', width: '100%', height: containerHeight }}
    >
      {!loaded && (
        <div className="image-loading-overlay">
          Loading...
        </div>
      )}
      <Image
        src={optimizedUrl}
        alt={imageAlt}
        fill
        style={{
          objectFit: objectFit,
          borderRadius: '8px',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
        }}
        onLoad={() => setLoaded(true)}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
      />
    </div>
  );
}
