import PropTypes from 'prop-types';

const Loader = ({ text = 'Loading...', className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center space-y-4 ${className}`}>
      <div className="loading-blocks">
        <div className="block" />
        <div className="block" />
        <div className="block" />
      </div>
      <div className="loading-blocks__text">{text}</div>
    </div>
  );
};

Loader.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  state: PropTypes.bool,
};

export default Loader;
