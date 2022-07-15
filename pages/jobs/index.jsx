import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Jobs() {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/jobs') {
      router.push('/');
    }
  }, [router]);
}
