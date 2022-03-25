import Link from 'next/link'

const MenuNotLoggedIn = ({ classes }) => (
  <div className="flex space-x-4">
    <Link href="/login">
      <a
        className={`px-3 py-2 text-sm font-medium text-gray-800 transition-all duration-100 ease-linear rounded hover:bg-accent-800 hover:text-white ${classes}`}
      >
        Login
      </a>
    </Link>
  </div>
)

export default MenuNotLoggedIn
