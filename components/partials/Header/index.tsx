import React from 'react';
import classNames from '@/utils/classsesNames';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useUser } from '@supabase/auth-helpers-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import MenuLoggedIn from './MenuLoggedIn';
import MenuNotLoggedIn from './MenuNotLoggedIn';
import Navigation from './navigation';
import { NavigationItem } from './types';

const Header: React.FC = (): React.ReactElement => {
  const router = useRouter();
  const user = useUser();

  return (
    <Disclosure as="nav" className="bg-white border-b border-gray-400">
      {({ open }: { open: boolean }) => {
        return (
          <>
            <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-800 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon aria-hidden="true" className="block w-6 h-6" />
                    ) : (
                      <Bars3Icon aria-hidden="true" className="block w-6 h-6" />
                    )}
                  </Disclosure.Button>
                </div>

                <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                  <Link className="flex items-center flex-shrink-0 text-white" href="/">
                    <Image alt="entry level devs" height={22} src="/logo.svg" width={82} />
                  </Link>
                </div>

                <div className="hidden sm:block sm:ml-2">
                  <div className="flex space-x-2">
                    {Navigation.map((item: NavigationItem) => (
                      <Link
                        aria-current={item.pathname === router.pathname ? 'page' : false}
                        className={classNames(
                          item.pathname === router.pathname
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-800 hover:bg-primary-700 hover:text-white',
                          'px-3 py-2 rounded text-sm'
                        )}
                        href={item.pathname}
                        key={item.name}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/** Notifications */}
                  {user?.id ? <MenuLoggedIn /> : <MenuNotLoggedIn />}
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {Navigation.map((item: NavigationItem) => (
                  <Link
                    aria-current={item.pathname === router.pathname ? 'page' : false}
                    className={classNames(
                      item.pathname === router.pathname
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    href={item.pathname}
                    key={item.name}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        );
      }}
    </Disclosure>
  );
};

export default Header;
