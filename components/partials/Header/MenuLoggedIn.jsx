import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Transition } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/outline';
import classNames from '@/utils/classsesNames';
import { SignOut } from '@/hooks/useAuthUser';
import { getSavedJobsCount } from '@/store/actions/savedJobsAction';
import Link from 'next/link';

const Navigation = [
  {
    label: 'Profile',
    href: '/profile',
  },
  {
    label: 'Saved Jobs',
    href: '/saved-jobs',
  },
];

function MenuLoggedIn() {
  const dispatch = useDispatch();
  const { savedJobsCount } = useSelector((state) => state.savedJobs);

  const logout = () => {
    if (typeof window !== 'undefined' && SignOut()) {
      window.location.reload();
    }
  };

  useEffect(() => {
    if (!savedJobsCount) {
      dispatch(getSavedJobsCount());
    }
  }, [dispatch, savedJobsCount]);

  return (
    <Menu as="div" className="relative z-50 ml-3">
      {({ open }) => (
        <div className="relative flex justify-start">
          <Menu.Button className="flex items-center pr-2 py-1 rounded-md text-sm font-medium space-x-1.5 text-gray-500 focus:outline-none transition-colors ease-linear duration-100 relative">
            <span className="sr-only">Open user menu</span>
            <UserCircleIcon className="w-7 h-7" />
            {/* {savedJobsCount > 0 && (
              <div
                title={`${savedJobsCount} saved job${savedJobsCount > 1 ? 's' : ''}`}
                className="absolute grid w-3.5 h-3.5 p-2 text-xs font-bold rounded-full place-content-center bottom-0 right-0 bg-accent-500 text-white"
              >
                {savedJobsCount}
              </div>
            )} */}
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
              {Navigation.map((item, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <Link href={item.href}>
                      <a
                        className={classNames(
                          active ? 'bg-accent-500 text-white' : 'text-gray-800 hover:bg-gray-100',
                          'pl-4 pr-2 py-2 text-sm relative flex items-center justify-between'
                        )}
                      >
                        {item.label}
                        {item.label === 'Saved Jobs' && savedJobsCount > 0 && (
                          <div
                            title={`${savedJobsCount} saved job${savedJobsCount > 1 ? 's' : ''}`}
                            className=" grid w-3.5 h-3.5 p-2 text-xs font-bold rounded-full place-content-center bg-accent-500 text-white"
                          >
                            {savedJobsCount}
                          </div>
                        )}
                      </a>
                    </Link>
                  )}
                </Menu.Item>
              ))}
              <Menu.Item>
                <a
                  className="block px-4 py-2 text-sm text-gray-800 cursor-pointer hover:bg-gray-100"
                  onClick={() => logout()}
                >
                  Sign out
                </a>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </div>
      )}
    </Menu>
  );
}

export default MenuLoggedIn;
