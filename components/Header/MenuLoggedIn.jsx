import { Fragment } from 'react'
import Link from 'next/link'
import { Menu, Transition } from '@headlessui/react'
import { UserCircleIcon } from '@heroicons/react/outline'
import classNames from '@/utils/classsesNames'

import { SignOut } from '@/hooks/useAuthUser'

const MenuLoggedIn = () => (
  <Menu as="div" className="relative z-50 ml-3">
    {({ open }) => (
      <>
        <div className="relative flex justify-start">
          <Menu.Button className="flex items-center pr-2 py-1 rounded-md text-sm font-medium space-x-1.5 hover:text-white hover:bg-accent-500 text-gray-500 focus:outline-none transition-colors ease-linear duration-100">
            <span className="sr-only">Open user menu</span>
            <UserCircleIcon className="w-7 h-7" />
          </Menu.Button>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="absolute right-0 w-48 mt-10 font-medium origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <Menu.Item>
                {({ active }) => (
                  <Link href="/profile">
                    <a
                      className={classNames(
                        active ? 'bg-accent-500 text-white' : 'text-gray-800 hover:bg-gray-100',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Profile
                    </a>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                <a
                  onClick={() => SignOut()}
                  className="block px-4 py-2 text-sm text-gray-800 cursor-pointer hover:bg-gray-100"
                >
                  Sign out
                </a>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </div>
      </>
    )}
  </Menu>
)

export default MenuLoggedIn
