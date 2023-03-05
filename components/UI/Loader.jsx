import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function Loader({ text = 'Loading...', className = '', state = false }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  if (state && time < 5) {
    return (
      <div
        className={`flex flex-col items-center justify-center text-center space-y-4 ${className}`}
      >
        <div className="loading-blocks">
          <div className="block" />
          <div className="block" />
          <div className="block" />
        </div>
        <div className="loading-blocks__text">{text}</div>
      </div>
    );
  }
  return null;
}

Loader.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  state: PropTypes.bool,
};

export default Loader;
