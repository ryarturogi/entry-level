import { Fragment, useState } from 'react'
import { Tab } from '@headlessui/react'
import { useUser, RequireAuth } from '@/hooks/useAuthUser'
import Header from '@/components/Header'
import Avatar from '@/components/UI/Avatar'
import { CheckCircleIcon } from '@heroicons/react/solid'

export default function Profile() {
  RequireAuth()
  const [selectedIndex, setSelectedIndex] = useState(0)

  const { user } = useUser()

  return (
    <>
      <Header pageTitle="Profile" />

      {user && (
        <main className="max-w-screen-lg px-4 mx-auto mt-10">
          <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
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
                    <Avatar avatar={user.user_metadata.avatar_url} size="sm" rounded />

                    {user.user_metadata.certified && (
                      <div className="relative top right-5" title="Certified account">
                        <CheckCircleIcon className="w-4 h-4 text-green-500 bg-white rounded-full" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h1>you&apos;re signed in</h1>
                    <h2 strong>Email: {user.email}</h2>
                    <h3 type="success">User data:</h3>

                    <pre>{JSON.stringify(user, null, 2)}</pre>
                  </div>
                </section>
              </Tab.Panel>
              <Tab.Panel>
                <section className="py-5">...</section>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </main>
      )}
    </>
  )
}
