import Image from 'next/image';

const setSize = (size) => {
  switch (size) {
    case 'xs':
      return 'w-10 h-10';
    case 'sm':
      return 'w-16 h-16';
    case 'md':
      return 'w-24 h-24';
    case 'lg':
      return 'w-28 h-28';
    default:
      return 'w-32 h-32';
  }
};
const setRounded = (isRounded) => {
  if (isRounded) {
    return 'rounded-full';
  }

  return 'rounded-sm';
};

function Avatar({ avatar, isRounded, size }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ring-2 ring-gray-100 px-2 
      ${setRounded(isRounded)} ${setSize(size)}`}
    >
      {isRounded ? (
        <Image alt="avatar" className="object-contain object-center" layout="fill" src={avatar} />
      ) : (
        <Image
          alt="avatar"
          className="object-contain object-center"
          height="100%"
          src={avatar}
          width="100%"
        />
      )}
    </div>
  );
}
export default Avatar;
