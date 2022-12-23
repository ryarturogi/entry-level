import Link from 'next/link';

function MenuNotLoggedIn({ classes }) {
  return (
    <div className="flex space-x-4">
      <Link
        className={`px-3 py-2 text-sm font-medium text-gray-800 transition-all duration-100 ease-linear rounded hover:bg-primary-500 hover:text-white ${classes}`}
        href="/login"
      >
        Login
      </Link>
    </div>
  );
}

export default MenuNotLoggedIn;
