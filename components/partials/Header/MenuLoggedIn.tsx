import React, { Fragment, useEffect } from 'react';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import Image from 'next/image';
import useStore from '@/lib/store';
import classNames from '@/utils/classsesNames';
import { Menu, Transition } from '@headlessui/react';
import { ROLES } from '@/constants/register';
import { Navigation, UPLOAD_IMAGE_PATH } from './constants';
import { NewNavigationItem } from './types';

const MenuLoggedIn: React.FC = (): React.ReactElement => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const savedJobsCount = useStore((state) => state.savedJobsCount);

  const userData = user?.user_metadata;
  const avatarURL: string = userData?.avatar_url;
  const AVATAR_PATH: string =
    avatarURL?.startsWith('/avatars') || avatarURL?.startsWith('/company-logos')
      ? `${UPLOAD_IMAGE_PATH}${avatarURL}`
      : avatarURL;

  const clearSavedJobs: () => void = () => {
    // clear the store
    useStore.setState({
      savedJobs: [],
      savedJobsCount: 0,
    });
  };

  const logout: () => void = () => {
    if (typeof window === 'undefined') {
      return;
    }

    if (supabaseClient.auth.signOut()) {
      if (userData?.role === ROLES.CANDIDATE) {
        clearSavedJobs();
      }
    }
  };

  useEffect(() => {
    if (userData?.role !== ROLES.CANDIDATE) {
      return;
    }

    const newNavigation: NewNavigationItem[] = [
      ...Navigation,
      { label: 'Saved Jobs', href: '/saved-jobs' },
    ];

    Navigation.splice(0, Navigation.length, ...newNavigation);
  }, []);

  return (
    <Menu as="div" className="relative z-50 ml-3">
      {({ open }) => (
        <div className="relative flex justify-start">
          <Menu.Button className="flex items-center pr-2 py-1 rounded-md text-sm font-medium space-x-1.5 text-gray-500 focus:outline-none transition-colors ease-linear duration-100 relative">
            <span className="sr-only">Open user menu</span>
            {(userData?.avatar_url && (
              <Image
                alt="avatar"
                className="object-cover w-8 h-8 rounded-full"
                height={28}
                src={AVATAR_PATH}
                width={28}
              />
            )) || (
              <div className="flex items-center justify-center w-8 h-8 text-sm text-white rounded-full bg-primary-800">
                {userData?.full_name?.charAt(0)}
              </div>
            )}

            {savedJobsCount > 0 && userData?.role === ROLES.CANDIDATE && (
              <div
                className="absolute grid w-3.5 h-3.5 p-1.5 text-[10px] font-normal rounded-full place-content-center bottom-0 right-0 bg-primary-700 text-white"
                title={`${savedJobsCount} saved job${savedJobsCount > 1 ? 's' : ''}`}
              >
                {savedJobsCount}
              </div>
            )}
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
            show={open}
          >
            <Menu.Items
              className="absolute w-48 mt-10 font-medium origin-top-right bg-white rounded-md shadow-lg -right-1 ring-1 ring-black ring-opacity-5 focus:outline-none"
              static
            >
              {Navigation.map((item) => (
                <Menu.Item key={item.label}>
                  {({ active }) => (
                    <Link
                      className={classNames(
                        active ? 'bg-primary-500 text-white' : 'text-gray-800 hover:bg-gray-100',
                        'pl-4 pr-2 py-2 text-sm relative flex items-center justify-between'
                      )}
                      href={item.href}
                    >
                      {item.label}
                      {item.label === 'Saved Jobs' && savedJobsCount > 0 && (
                        <div
                          className=" grid w-3.5 h-3.5 p-2 text-xs font-bold rounded-full place-content-center bg-primary-500 text-white"
                          title={`${savedJobsCount} saved job${savedJobsCount > 1 ? 's' : ''}`}
                        >
                          {savedJobsCount} <span className="sr-only">saved jobs</span>
                        </div>
                      )}
                    </Link>
                  )}
                </Menu.Item>
              ))}
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? 'bg-primary-500 text-white' : 'text-gray-800 hover:bg-gray-100',
                      'pl-4 pr-2 py-2 text-sm relative w-full text-left'
                    )}
                    name="logout"
                    onClick={() => logout()}
                    type="button"
                  >
                    <span>Logout</span>
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </div>
      )}
    </Menu>
  );
};

export default MenuLoggedIn;
