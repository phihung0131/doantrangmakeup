import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { scroller } from 'react-scroll';

import About from '@/components/About';
import Analytics from '@/components/Analytics';
import Canvas from '@/components/Canvas';
import ContactForm from '@/components/ContactForm';
import Header from '@/components/Header';
import LazyShow from '@/components/LazyShow';
import MainHero from '@/components/MainHero';
import MainHeroImage from '@/components/MainHeroImage';
import Product from '@/components/Product';

const App = () => {
  const router = useRouter();

  // Scroll đến section khi có hash trong URL
  useEffect(() => {
    const hash = router.asPath.split('#')[1];
    if (hash) {
      // Đợi DOM render và LazyShow load xong rồi mới scroll
      setTimeout(() => {
        scroller.scrollTo(hash, {
          duration: 1000,
          smooth: true,
          offset: -80, // Offset để không bị che bởi header (điều chỉnh theo chiều cao header của bạn)
        });
      }, 300);
    }
  }, [router.asPath]);

  return (
    <div className={`bg-background grid gap-y-16 overflow-hidden`}>
      <div className="relative bg-background min-h-screen lg:min-h-0">
        <div className="max-w-7xl mx-auto h-full">
          <MainHeroImage />

          <div className="relative z-10 h-screen lg:h-auto lg:pb-8 sm:lg:pb-16 md:lg:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 lg:bg-background flex flex-col">
            <Header />
            <div className="flex-1 flex items-center justify-center lg:block lg:mt-20 xl:mt-28">
              <MainHero />
            </div>
          </div>
        </div>
      </div>
      <Canvas />

      {/* Services Section */}
      <LazyShow>
        <div id="services">
          <Product />
          <Canvas />
        </div>
      </LazyShow>

      {/* Contact Section */}
      <LazyShow>
        <div id="contact">
          <ContactForm />
          <Canvas />
        </div>
      </LazyShow>

      <LazyShow>
        <About />
      </LazyShow>
      <Analytics />
    </div>
  );
};

export default App;
