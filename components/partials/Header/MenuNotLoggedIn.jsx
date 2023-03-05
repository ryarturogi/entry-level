import Link from 'next/link';
import PropTypes from 'prop-types';

function MenuNotLoggedIn({ classes }) {
  return (
    <Link
      className={`px-3 py-2 text-sm font-medium text-gray-800 transition-all duration-100 ease-linear rounded hover:bg-primary-500 hover:text-white  ${classes}`}
      href="/login"
    >
      <span>Login</span>
    </Link>
  );
}

MenuNotLoggedIn.propTypes = {
  classes: PropTypes.string,
};

export default MenuNotLoggedIn;
