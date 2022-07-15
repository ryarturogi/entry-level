import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Jobs() {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/jobs') {
      router.push('/');
    }
  }, []);
}
