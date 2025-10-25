// MainHeroImage.tsx
import React from 'react';

const MainHeroImage = () => {
  return (
    <>
      {/* Mobile: Full screen background with overlay */}
      <div className="absolute inset-0 lg:hidden">
        <img
          className="w-full h-full object-cover"
          src="/assets/images/hinh_to.jpeg"
          alt="happy team image"
        />
        {/* Gradient overlay - từ đen sang trong suốt */}
<div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"></div>
      </div>
      
      {/* Desktop: Right side image */}
      <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="w-full h-full object-cover"
          src="/assets/images/hinh_to.jpeg"
          alt="happy team image"
        />
      </div>
    </>
  );
};

export default MainHeroImage;