import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Link as ScrollLink } from 'react-scroll';
import Link from 'next/link';
import { useRouter } from 'next/router';

import config from '@/config/index.json';

const Menu = () => {
  const { company } = config;
  const { name: companyName, logo } = company;
  const router = useRouter();
  const isHomePage = router.pathname === '/';

  return (
    <>
      <svg
        className={`hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-background transform translate-x-1/2`}
        fill="currentColor"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polygon points="50,0 100,0 50,100 0,100" />
      </svg>

      <Popover>
        <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
          <nav
            className="relative flex items-center justify-between sm:h-10 lg:justify-start"
            aria-label="Global"
          >
            <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
              <div className="flex items-center justify-between w-full md:w-auto">
                <Link href="/">
                  <a>
                    <span className="sr-only">{companyName}</span>
                    <img alt="logo" className="h-16 w-auto sm:h-16" src={logo} />
                  </a>
                </Link>
                <div className="-mr-2 flex items-center md:hidden">
                  <Popover.Button
                    className={`bg-background rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary`}
                  >
                    <span className="sr-only">Open main menu</span>
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
              <Link href="/gallery" passHref>
                <a className="font-medium text-gray-500 hover:text-gray-900 no-underline">
                  Bộ sưu tập
                </a>
              </Link>

              {isHomePage ? (
                // Nếu đang ở trang chủ, dùng ScrollLink
                <>
                  <ScrollLink
                    to="services"
                    spy={true}
                    smooth={true}
                    duration={1000}
                    className="cursor-pointer font-medium text-gray-500 hover:text-gray-900"
                  >
                    Dịch vụ
                  </ScrollLink>
                  <ScrollLink
                    to="contact"
                    spy={true}
                    smooth={true}
                    duration={1000}
                    className="cursor-pointer font-medium text-primary hover:text-secondary"
                  >
                    Liên hệ
                  </ScrollLink>
                </>
              ) : (
                // Nếu không ở trang chủ, dùng Link với hash
                <>
                  <Link href="/#services" passHref>
                    <a className="font-medium text-gray-500 hover:text-gray-900 no-underline">
                      Dịch vụ
                    </a>
                  </Link>
                  <Link href="/#contact" passHref>
                    <a className="font-medium text-primary hover:text-secondary no-underline">
                      Liên hệ
                    </a>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>

        <Transition
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
          >
            <div
              className={`rounded-lg shadow-md bg-background ring-1 ring-black ring-opacity-5 overflow-hidden`}
            >
              <div className="px-5 pt-4 flex items-center justify-between">
                <div>
                  <img className="h-8 w-auto" src={logo} alt="" />
                </div>
                <div className="-mr-2">
                  <Popover.Button
                    className={`bg-background rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary`}
                  >
                    <span className="sr-only">Close main menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link href="/gallery" passHref>
                  <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 no-underline">
                    Bộ sưu tập
                  </a>
                </Link>

                {isHomePage ? (
                  // Mobile: Nếu đang ở trang chủ, dùng ScrollLink
                  <>
                    <ScrollLink
                      to="services"
                      spy={true}
                      smooth={true}
                      duration={1000}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 cursor-pointer"
                    >
                      Dịch vụ
                    </ScrollLink>
                    <ScrollLink
                      to="contact"
                      spy={true}
                      smooth={true}
                      duration={1000}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 cursor-pointer"
                    >
                      Liên hệ
                    </ScrollLink>
                  </>
                ) : (
                  // Mobile: Nếu không ở trang chủ, dùng Link với hash
                  <>
                    <Link href="/#services" passHref>
                      <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 no-underline">
                        Dịch vụ
                      </a>
                    </Link>
                    <Link href="/#contact" passHref>
                      <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 no-underline">
                        Liên hệ
                      </a>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  );
};

export default Menu;
