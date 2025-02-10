import React, { Fragment } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import Image from 'next/image';
import useStore from '@/lib/store';
import classNames from '@/utils/classsesNames';
import { Menu, Transition } from '@headlessui/react';
import { ROLES } from '@/constants/register';
import { Navigation } from './constants';
import { MenuLoggedInProps } from './types';

const MenuLoggedIn: React.FC<MenuLoggedInProps> = (
  props: MenuLoggedInProps
): React.ReactElement => {
  const { user } = props;
  const supabaseClient = useSupabaseClient();
  const savedJobsCount = useStore((state) => state.savedJobsCount);

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
      if (user?.role === ROLES.CANDIDATE) {
        clearSavedJobs();
      }
    }
  };

  return (
    <Menu as="div" className="relative z-50 ml-3">
      {({ open }) => (
        <div className="relative flex justify-start">
          <Menu.Button className="flex items-center pr-2 py-1 rounded-md text-sm font-medium space-x-1.5 text-gray-500 focus:outline-none transition-colors ease-linear duration-100 relative">
            <span className="sr-only">Open user menu</span>
            {(user.avatar && (
              <Image
                alt="avatar"
                className="object-cover w-8 h-8 rounded-full"
                height={28}
                src={user.avatar}
                width={28}
              />
            )) || (
              <div className="flex items-center justify-center w-8 h-8 text-sm text-white rounded-full bg-primary-800">
                {user?.name?.charAt(0)}
              </div>
            )}

            {savedJobsCount > 0 && user?.role === ROLES.CANDIDATE && (
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
                    </Link>
                  )}
                </Menu.Item>
              ))}
              {user?.role === ROLES.CANDIDATE && (
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      className={classNames(
                        active ? 'bg-primary-500 text-white' : 'text-gray-800 hover:bg-gray-100',
                        'pl-4 pr-2 py-2 text-sm relative flex items-center justify-between w-full'
                      )}
                      href="/saved-jobs"
                    >
                      Saved Jobs
                      <div
                        className=" grid w-3.5 h-3.5 p-2 text-xs font-bold rounded-full place-content-center bg-primary-500 text-white"
                        title={`${savedJobsCount} saved job${savedJobsCount > 1 ? 's' : ''}`}
                      >
                        {savedJobsCount}
                        <span className="sr-only">saved jobs</span>
                      </div>
                    </Link>
                  )}
                </Menu.Item>
              )}
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
