import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Jobs = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/jobs') {
      router.replace('/');
    }
  }, [router]);

  return null;
};

export default Jobs;
