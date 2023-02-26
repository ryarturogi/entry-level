import { formatDate, isToday, timeSince } from '@/utils/formatDate';
import { Tab } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Fragment, useState } from 'react';

import Head from '@/components/partials/Head';
import Avatar from '@/components/UI/Avatar';
import { PROVIDERS } from '@/constants/index';
import { RequireAuth, useUser } from '@/hooks/useAuthUser';

const Profile = () => {
  RequireAuth();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { user } = useUser();

  const mappedUser = (user) => {
    switch (process.env.NEXT_PUBLIC_PROVIDER_NAME) {
      case PROVIDERS.SUPABASE:
        return {
          id: user.id,
          email: user.email,
          phone: user.phone,
          avatar: user?.user_metadata?.avatar_url,
          name: user?.user_metadata?.name,
          createdAt: user.created_at,
        };
      case PROVIDERS.FIREBASE:
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

  return (
    <>
      <Head title="Profile" />

      {user && (
        <div className="max-w-screen-lg px-4 mx-auto mt-10">
          <Tab.Group onChange={setSelectedIndex} selectedIndex={selectedIndex}>
            <Tab.List className="space-x-2 text-base">
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`${
                      selected
                        ? 'bg-primary-100 hover:bg-primary-100 text-white'
                        : 'bg-gray-200 hover:bg-primary-100 text-black hover:text-white'
                    } py-2 px-5 rounded cursor-pointer`}
                    type="button"
                  >
                    Profile
                  </button>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`${
                      selected
                        ? 'bg-primary-100 hover:bg-primary-100 text-white'
                        : 'bg-gray-200 hover:bg-primary-100 text-black hover:text-white'
                    } py-2 px-5 rounded cursor-pointer`}
                    type="button"
                  >
                    Settings
                  </button>
                )}
              </Tab>
            </Tab.List>
            <Tab.Panels className="px-5 mt-3 bg-white border rounded">
              <Tab.Panel>
                <section className="py-5 space-y-5 text-gray-800">
                  <div className="flex items-end">
                    <Avatar avatar={userMapped?.avatar} isRounded size="sm" />

                    {user.user_metadata?.certified && (
                      <div className="relative top right-5" title="Certified account">
                        <CheckCircleIcon className="w-4 h-4 bg-white rounded-full text-primary-500" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h1 className="text-2xl font-semibold">{userMapped.name}</h1>
                    {/* <p className="text-sm">
                      <span className="font-semibold">ID:</span> {userMapped.id}
                    </p> */}
                    <p className="text-sm">Email: {userMapped.email}</p>

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
};

export default Profile;
