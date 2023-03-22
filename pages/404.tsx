import Link from 'next/link';
import React from 'react';

const FourOhFour = (): React.ReactElement => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="mb-5 text-xl font-bold">404 - Page Not Found</h1>
      <p className="mb-5 text-lg">Sorry, the page you are looking for could not be found.</p>
      <Link className="text-lg hover:text-blue-500" href="/" replace>
        Go back home
      </Link>
    </div>
  );
};

export default FourOhFour;
