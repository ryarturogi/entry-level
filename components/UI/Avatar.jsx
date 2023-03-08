import Image from 'next/image';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

const SIZE_TO_CLASS_MAP = {
  xs: 'w-10 h-10',
  sm: 'w-16 h-16',
  md: 'w-24 h-24',
  lg: 'w-28 h-28',
  default: 'w-20 h-20',
};

const AVATAR_SIZE_MAP = {
  height: 100,
  width: 100,
};

const Avatar = ({ avatar, isRounded = false, size = 'default', url }) => {
  const router = useRouter();
  const sizeClass = SIZE_TO_CLASS_MAP[size];
  const roundedClass = isRounded ? 'rounded-full' : 'rounded-lg';

  if (url) {
    return (
      <button className="focus:outline-none" onClick={() => router.push(url)} type="button">
        <Image
          alt="avatar"
          className={`relative flex items-center justify-center overflow-hidden  
        object-contain object-center w-20 h-20 ${roundedClass} ${sizeClass}`}
          height={AVATAR_SIZE_MAP.height}
          src={avatar}
          width={AVATAR_SIZE_MAP.width}
        />
      </button>
    );
  }

  return (
    <Image
      alt="avatar"
      className={`relative flex items-center justify-center overflow-hidden
    object-contain object-center bg-gray-100 ${roundedClass} ${sizeClass}`}
      height={AVATAR_SIZE_MAP.height}
      src={avatar}
      width={AVATAR_SIZE_MAP.width}
    />
  );
};

Avatar.propTypes = {
  avatar: PropTypes.string.isRequired,
  isRounded: PropTypes.bool,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'default']),
  url: PropTypes.string,
};

export default Avatar;
