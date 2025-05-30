import { useState, useEffect } from 'react';

interface LazyImagePro {
    lowResSrc: string,
    highResSrc: string,
    alt: string,
    className: string,
}

const LazyImage = ({ lowResSrc, highResSrc, alt, className } :LazyImagePro ) => {
  const [src, setSrc] = useState(lowResSrc);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = highResSrc;
    img.onload = () => {
      setSrc(highResSrc);
      setLoaded(true);
    };
  }, [highResSrc]);

  return (
    <img
        className={className}
        src={src}
        alt={alt}
        style={{
        // transition: 'opacity 0.2s ease-in-out',
        opacity: loaded ? 1 : 1,
      }}
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
        }} 
        onTouchStart={(e) => {
          e.stopPropagation()
          e.preventDefault()
        }}
        onFocus={(e) => {
          e.stopPropagation()
          e.preventDefault()
        }}
    />
  );
};

export default LazyImage;
