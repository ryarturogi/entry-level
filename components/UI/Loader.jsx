import PropTypes from 'prop-types';

function Loader({ text = 'Loading...', className = '' }) {
  return (
    <div className={`loading ${className}`}>
      <div className="loading-blocks">
        <div className="block" />
        <div className="block" />
        <div className="block" />
      </div>
      <div className="loading-blocks__text">{text}</div>
    </div>
  );
}

export default Loader;

Loader.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
};
