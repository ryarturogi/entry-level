import Button from '@/components/UI/Button';
import { useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navigation from '../Header/navigation';

const Footer: React.FC = (): React.ReactElement => {
  const year: number = new Date().getFullYear();
  const router = useRouter();
  const user = useUser();

  return (
    <footer className="flex flex-col justify-center items-center w-full h-[400px] text-gray-800 bg-white  justify-content">
      <section className="flex flex-col items-center justify-center w-full h-full px-4 mx-auto text-center max-w-7xl">
        {/* <h1 className="mb-6 text-3xl font-semibold">The best place to start your tech career.</h1> */}
        {user ? (
          <h1 className="mb-6 text-3xl font-semibold">Post a job and find your next hire.</h1>
        ) : (
          <h1 className="mb-6 text-3xl font-semibold">Find your first job in tech.</h1>
        )}
        <p className="mb-10 text-2xl text-gray-600 font-extralight">
          {user ? (
            <small>Post a job and find your next hire.</small>
          ) : (
            <small>Find your first job in tech.</small>
          )}
        </p>

        {user ? (
          <Button
            color="primary"
            onClick={() => router.push('/jobs/new')}
            styles="w-fit h-[50px] text-base font-semibold rounded-lg shadow-md hover:shadow-lg"
          >
            Post a job
          </Button>
        ) : (
          <Button
            color="primary"
            onClick={() => router.push('/login')}
            styles="w-fit h-[50px] text-base font-semibold rounded-lg shadow-md hover:shadow-lg"
          >
            Start your journey
          </Button>
        )}
      </section>
      <hr className="w-full h-[1px] border-gray-300" />
      <section className="flex  items-center justify-between w-full px-8  text-center h-[120px] max-w-7xl mx-auto">
        <p className="text-lg text-gray-600 font-extralight">
          <small>© {year} EntryLevels.io All rights reserved.</small>
        </p>
        <nav className="flex items-start justify-between space-x-4 list-none">
          {Navigation.map((item) => (
            <li key={item.name}>
              <Link
                className="text-sm font-medium text-gray-400 hover:text-primary-700"
                href={item.pathname}
                title={item.name}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </nav>
      </section>
    </footer>
  );
};

export default Footer;
