import React, { useEffect, useState } from 'react';
import Head from '@/components/partials/Head';
import Hero from '@/components/UI/Hero';
import JobsList from '@/components/Jobs/JobsList';
import JobsSortBy from '@/components/Jobs/JobsSortBy';
import Pagination from '@/components/UI/Pagination';
import Filters from '@/components/Jobs/Filters';
import useFilteredJobs from '@/hooks/useFilteredJobs';
import { useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { ROLES } from '@/constants/register';

const Home = (): React.ReactElement => {
  const router = useRouter();
  const user = useUser();

  const [action, setAction] = useState({
    title: 'Get Started',
    handler: () => router.push('/register'),
  });

  const [pageOptions, setPageOptions] = useState({
    offset: 0,
    limit: 10,
  });

  const [jobs, totalCount, loading, error, handleFiltersChange, memoizedFilters] = useFilteredJobs(
    pageOptions.offset,
    pageOptions.limit
  );

  const handlePageChange = (offset) => {
    setPageOptions({ ...pageOptions, offset });
  };

  const handleLimitChange = (e) => {
    setPageOptions({ ...pageOptions, limit: Number(e.target.value), offset: 0 });
  };

  useEffect(() => {
    const role = user?.user_metadata?.role;
    const title = role === ROLES.COMPANY ? 'Post a job' : 'Find a job';
    const path = role === ROLES.COMPANY ? '/jobs/new' : '/jobs';

    setAction({
      title: title,
      handler: () => router.push(path),
    });
  }, [router, user]);

  return (
    <div className="min-h-screen mb-20">
      <Head />
      <Hero action={action} />

      <section className="flex flex-col w-full gap-10 mx-auto max-w-8xl sm:grid sm:grid-cols-12">
        <section className="col-span-12 lg:col-span-8 h-fit">
          <header className="flex flex-col items-center justify-between pb-6 pl-5 sm:flex-row">
            <h2 className="text-lg font-semibold sm:text-xl md:text-2xl">Job postings</h2>

            <div className="flex flex-col items-end gap-2">
              <JobsSortBy onChange={handleFiltersChange} />
              {/* Pagination simple next/prev */}
              {totalCount > 10 && (
                <Pagination
                  error={error}
                  handleLimitChange={handleLimitChange}
                  handlePageChange={handlePageChange}
                  limit={pageOptions.limit}
                  loading={loading}
                  offset={pageOptions.offset}
                  totalCount={totalCount}
                />
              )}
            </div>
          </header>

          <JobsList error={error} jobs={jobs} loading={loading} />
        </section>

        <Filters filters={memoizedFilters} onChange={handleFiltersChange} />
      </section>
    </div>
  );
};

export default Home;
