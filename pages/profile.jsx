import { Tab } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { Fragment, useState } from 'react';
import { formatDate, isToday, timeSince } from '@/utils/formatDate';

import Head from '@/components/partials/Head';
import Avatar from '@/components/UI/Avatar';
import { RequireAuth, useUser } from '@/hooks/useAuthUser';

export default function Profile() {
  RequireAuth();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { user } = useUser();

  const mappedUser = (user) => {
    switch (process.env.NEXT_PUBLIC_PROVIDER_NAME) {
      case 'supabase':
        return {
          id: user.id,
          email: user.email,
          phone: user.phone,
          avatar: user?.user_metadata?.avatar_url,
          name: user?.user_metadata?.name,
          createdAt: user.created_at,
        };
      case 'firebase':
        console.log(user);
        return {
          id: user.uid,
          email: user.email,
          name: user.displayName,
          avatar: user.photoURL,
          createdAt: user?.metadata?.creationTime,
        };
      default:
        return {};
    }
  };
  const userMapped = mappedUser(user);

  const profileImage = () => {
    if (userMapped.avatar) {
      return userMapped.avatar;
    }

    return userMapped.avatar;
  };

  return (
    <>
      <Head title="Profile" />

      {user && (
        <div className="max-w-screen-lg px-4 mx-auto mt-10">
          <Tab.Group onChange={setSelectedIndex} selectedIndex={selectedIndex}>
            <Tab.List className="space-x-2 text-base">
              <Tab as={Fragment}>
                {({ selected }) => (
                  <a
                    className={`${
                      selected
                        ? 'bg-accent-100 hover:bg-accent-100 text-white'
                        : 'bg-gray-200 hover:bg-accent-100 text-black hover:text-white'
                    } py-2 px-5 rounded cursor-pointer`}
                  >
                    Profile
                  </a>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <a
                    className={`${
                      selected
                        ? 'bg-accent-100 hover:bg-accent-100 text-white'
                        : 'bg-gray-200 hover:bg-accent-100 text-black hover:text-white'
                    } py-2 px-5 rounded cursor-pointer`}
                  >
                    Settings
                  </a>
                )}
              </Tab>
            </Tab.List>
            <Tab.Panels className="px-5 mt-3 bg-white border rounded">
              <Tab.Panel>
                <section className="py-5 space-y-5 text-gray-800">
                  <div className="flex items-end">
                    <Avatar avatar={profileImage()} isRounded size="sm" />

                    {user.user_metadata?.certified && (
                      <div className="relative top right-5" title="Certified account">
                        <CheckCircleIcon className="w-4 h-4 text-green-500 bg-white rounded-full" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h1 className="text-2xl font-semibold">{userMapped.name}</h1>
                    <p className="text-sm">
                      <span className="font-semibold">ID:</span> {userMapped.id}
                    </p>
                    <p className="text-sm">{userMapped.email}</p>

                    <p className="text-sm">
                      <span className="font-semibold">Joined:</span>
                      {isToday(new Date(userMapped.createdAt), new Date())
                        ? timeSince(userMapped.createdAt)
                        : formatDate(userMapped.createdAt)}
                    </p>

                    {userMapped.phone && (
                      <p className="text-sm">
                        <span className="font-semibold">Phone:</span> {userMapped.phone}
                      </p>
                    )}
                  </div>
                </section>
              </Tab.Panel>
              <Tab.Panel>
                <section className="py-5">...</section>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      )}
    </>
  );
}
