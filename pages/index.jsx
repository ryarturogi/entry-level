import Hero from '@/components/Home/Hero';
import JobSearch from '@/components/Jobs/JobSearch';
import JobsList from '@/components/Jobs/JobsList';
import Head from '@/components/partials/Head';

function Index() {
  return (
    <>
      <Head />
      <Hero />
      <JobSearch />
      <JobsList />
    </>
  );
}

export default Index;
