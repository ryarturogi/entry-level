import Header from '@/components/Header';
import Hero from '@/components/Home/Hero';
import JobSearch from '@/components/Jobs/JobSearch';
import JobsList from '@/components/Jobs/JobsList';

function Index() {
  return (
    <>
      <Header />
      <main className="pb-10" role="main">
        <Hero />
        <JobSearch />
        <JobsList />
      </main>
    </>
  );
}

export default Index;
