import Link from 'next/link';

export default function FourOhFour() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="text-xl">404 - Page Not Found</h1>
      <Link href="/" replace>
        <a className="text-lg hover:text-blue-500">Go back home</a>
      </Link>
    </div>
  );
}
