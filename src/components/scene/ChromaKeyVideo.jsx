import React, { useEffect, useRef } from 'react';

export const ChromaKeyVideo = ({ src, className }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let animationFrameId;

    const computeFrame = () => {
      if (video.paused || video.ended) {
        return;
      }
      
      // Ensure canvas matches video dimensions
      if (canvas.width !== video.videoWidth) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }

      // Draw the current video frame to the canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Get pixels
      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const l = frame.data.length / 4;

      for (let i = 0; i < l; i++) {
        const r = frame.data[i * 4 + 0];
        const g = frame.data[i * 4 + 1];
        const b = frame.data[i * 4 + 2];
        
        // Simple green screen detection logic
        // If Green is significantly higher than Red and Blue, it's the green screen
        if (g > 100 && g > r * 1.4 && g > b * 1.4) {
          // Set alpha to 0 (transparent)
          frame.data[i * 4 + 3] = 0;
        }
      }
      
      // Put the modified pixels back onto the canvas
      ctx.putImageData(frame, 0, 0);
      
      animationFrameId = requestAnimationFrame(computeFrame);
    };

    const handlePlay = () => {
      // Small timeout to ensure video is ready
      setTimeout(() => {
        video.play().catch(e => console.error("Video play failed:", e));
        computeFrame();
      }, 100);
    };

    // Try starting the loop manually in case autoPlay already started it
    handlePlay();
    video.addEventListener('play', computeFrame);
    
    return () => {
      video.removeEventListener('play', computeFrame);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Hidden Video Element - Don't use display:none or frames stop updating */}
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        crossOrigin="anonymous"
        className="opacity-0 absolute pointer-events-none w-[1px] h-[1px]"
      />
      {/* Visible Canvas (Processed) */}
      <canvas ref={canvasRef} className="w-full h-full object-contain drop-shadow-2xl" />
    </div>
  );
};
