import React from 'react';

import config from '@/config/index.json';

const About = () => {
  const { company } = config;
  const { logo, name: companyName } = company;

  return (
    <div
      id="about"
      className="mx-auto container xl:px-20 lg:px-12 sm:px-6 px-4 py-12"
    >
      <div className="flex flex-col items-center justify-center">
        <div>
          <img src={logo} alt={companyName} className="w-16 h-16" />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6 mt-6">
          <a
  aria-label="instagram"
  href="https://www.instagram.com/doantrangmakeup"
  target="_blank"
  rel="noreferrer"
  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
>
  <svg
    className="fill-current text-gray-800 dark:text-white hover:text-primary flex-shrink-0"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="12" />
    <path
      fill="white"
      d="M12 7.5c-1.24 0-2.5 1.01-2.5 2.5s1.26 2.5 2.5 2.5 2.5-1.01 2.5-2.5-1.26-2.5-2.5-2.5zm0 4.17c-.92 0-1.67-.75-1.67-1.67s.75-1.67 1.67-1.67 1.67.75 1.67 1.67-.75 1.67-1.67 1.67z"
    />
    <path
      fill="white"
      d="M14.5 5.5h-5c-1.93 0-3.5 1.57-3.5 3.5v5c0 1.93 1.57 3.5 3.5 3.5h5c1.93 0 3.5-1.57 3.5-3.5V9c0-1.93-1.57-3.5-3.5-3.5zm2.67 8.5c0 1.47-1.2 2.67-2.67 2.67h-5c-1.47 0-2.67-1.2-2.67-2.67V9c0-1.47 1.2-2.67 2.67-2.67h5c1.47 0 2.67 1.2 2.67 2.67v5z"
    />
    <circle fill="white" cx="14.83" cy="8.17" r="0.58" />
  </svg>
  <span className="text-sm text-gray-800 dark:text-white">@doantrangmakeup</span>
</a>

          <a
            aria-label="facebook"
            href="https://www.facebook.com/oantrang.786996"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <svg
              className="fill-current text-gray-800 dark:text-white hover:text-primary flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z" />
            </svg>
            <span className="text-sm text-gray-800 dark:text-white">Hồ Nguyễn Đoan Trang</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;