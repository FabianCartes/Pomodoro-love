import React, { useEffect, useRef } from 'react';

export const ChromaKeyImage = ({ src, className }) => {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      if (img.width === 0 || img.height === 0) return;
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const l = frame.data.length / 4;

      for (let i = 0; i < l; i++) {
        const r = frame.data[i * 4 + 0];
        const g = frame.data[i * 4 + 1];
        const b = frame.data[i * 4 + 2];
        
        // Remove green and despill edges
        if (g > r && g > b) {
          const maxRB = Math.max(r, b);
          if (g > maxRB * 1.3) {
            // Strong green, make transparent
            frame.data[i * 4 + 3] = 0; 
          } else if (g > maxRB) {
            // Edge/spill case, remove green tint by matching max of R/B
            frame.data[i * 4 + 1] = maxRB;
            // Slightly reduce alpha for softer edge blending
            const greenness = g - maxRB;
            frame.data[i * 4 + 3] = Math.max(0, 255 - (greenness * 5));
          }
        }
      }
      
      ctx.putImageData(frame, 0, 0);
    };

    imageRef.current = img;

    return () => {
      img.onload = null;
    };
  }, [src]);

  return (
    <div className={`relative flex items-center justify-center ${className || ''}`}>
      <canvas ref={canvasRef} className="w-full h-full object-contain drop-shadow-2xl" />
    </div>
  );
};
