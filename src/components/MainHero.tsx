import React from 'react';

import config from '@/config/index.json';

const MainHero = () => {
  const { mainHero } = config;
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="text-center lg:text-left">
        <h1 className="text-4xl tracking-tight font-extrabold text-white lg:text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block xl:inline font-display">ĐOAN TRANG</span>{' '}
          <span className={`block text-primary xl:inline font-display`}>
            MAKEUP
          </span>
        </h1>
        <p className="mt-3 text-base text-white lg:text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
          Tự tin tỏa sáng với <strong>Đoan Trang Makeup</strong> – nơi vẻ đẹp
          của bạn được chăm chút từ từng nét cọ. Chúng tôi mang đến phong cách
          trang điểm hiện đại, nhẹ nhàng, giúp bạn nổi bật nhưng vẫn giữ được
          nét riêng.
        </p>
        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
          <div className="rounded-md shadow">
            <a
              href={mainHero.primaryAction.href}
              className={`no-underline w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-background bg-primary hover:bg-border hover:text-primary md:py-4 md:text-lg md:px-10`}
            >
              Liên hệ ngay
            </a>
          </div>
          <div className="mt-3 sm:mt-0 sm:ml-3">
            <a
              href={mainHero.secondaryAction.href}
              className={`no-underline w-full flex items-center justify-center px-8 py-3 border border-solid text-base font-medium rounded-md border-primary text-secondary bg-background hover:bg-border hover:text-primary md:py-4 md:text-lg md:px-10`}
            >
              Bộ sưu tập
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainHero;
