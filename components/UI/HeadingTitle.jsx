import PropTypes from 'prop-types';

const HeadingTitle = ({ children }) => {
  return (
    <h1 className="flex items-center col-span-12 text-2xl font-semibold text-black">{children}</h1>
  );
};

HeadingTitle.propTypes = {
  children: PropTypes.string.isRequired,
};

export default HeadingTitle;
