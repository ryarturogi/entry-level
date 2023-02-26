import Image from 'next/image';
import PropTypes from 'prop-types';

const SIZE_TO_CLASS_MAP = {
  xs: 'w-10 h-10',
  sm: 'w-16 h-16',
  md: 'w-24 h-24',
  lg: 'w-28 h-28',
  default: 'w-20 h-20',
};

function Avatar({ avatar, isRounded = false, size = 'default' }) {
  const sizeClass = SIZE_TO_CLASS_MAP[size];
  const roundedClass = isRounded ? 'rounded-full' : 'rounded-lg';

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden  bg-gray-100 px-2 ${roundedClass} ${sizeClass}`}
    >
      {isRounded ? (
        <Image alt="avatar" className="object-contain object-center" fill src={avatar} />
      ) : (
        <Image
          alt="avatar"
          className="object-contain object-center"
          height="100"
          src={avatar}
          width="100"
        />
      )}
    </div>
  );
}

Avatar.propTypes = {
  avatar: PropTypes.string.isRequired,
  isRounded: PropTypes.bool,
  size: PropTypes.string,
};

export default Avatar;
