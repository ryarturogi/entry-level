import Avatar from '@/components/UI/Avatar';
import Head from '@/components/partials/Head';
import { PROVIDERS } from '@/constants/index';
import { Tab } from '@headlessui/react';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';

const Profile = () => {
  const router = useRouter();
  const user = useUser();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [userMapped, setUserMapped] = useState({});

  const mappedUser = (user) => {
    if (!user) {
      return {};
    }

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

  useEffect(() => {
    if (!user?.id) {
      void router.push('/login');
    }

    setUserMapped(mappedUser(user));
  }, [user?.id]);

  return (
    <>
      <Head title="Profile" />
      <div className="max-w-sm px-4 pt-10 mx-auto">
        <Tab.Group onChange={setSelectedIndex} selectedIndex={selectedIndex}>
          <Tab.List className="space-x-2 text-base">
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`${
                    selected
                      ? 'bg-primary-700 hover:bg-primary-800 text-white'
                      : 'bg-gray-200 hover:bg-primary-800 text-black hover:text-white'
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
                      ? 'bg-primary-700 hover:bg-primary-800 text-white'
                      : 'bg-gray-200 hover:bg-primary-800 text-black hover:text-white'
                  } py-2 px-5 rounded cursor-pointer`}
                  type="button"
                >
                  Settings
                </button>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels className="flex flex-col items-center justify-center p-5 mt-3 bg-white border rounded-xl">
            <Tab.Panel>
              <section className="flex flex-col items-center justify-center py-5 space-y-2 text-gray-800">
                <div className="flex items-end mb-1">
                  <Avatar avatar={userMapped?.avatar} isRounded size="md" />

                  {user?.user_metadata?.certified && (
                    <div className="relative top right-5" title="Certified account">
                      <CheckCircleIcon className="w-4 h-4 bg-white rounded-full text-primary-500" />
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="mb-1 text-xl font-semibold">{userMapped.name}</h1>

                  <div className="flex items-center justify-center space-x-2">
                    <Link href={`mailto:${userMapped.email}`} title="Drop me a message">
                      <EnvelopeIcon className="inline-block w-5 h-5" />
                    </Link>
                    {userMapped.phone && (
                      <Link href={`mailto:${userMapped.phone}`} title="Drop me a message">
                        <PhoneIcon className="inline-block w-5 h-5" />
                      </Link>
                    )}
                  </div>

                  {userMapped.phone && (
                    <p className="text-sm">
                      <span className="font-semibold">Phone:</span> {userMapped.phone}
                    </p>
                  )}
                </div>
              </section>
            </Tab.Panel>
            <Tab.Panel>
              <section className="py-5 text-lg font-semibold text-center">
                <span>TODO: Settings Panel</span>
                <br />
                <span>...</span>
              </section>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
};

export default Profile;
