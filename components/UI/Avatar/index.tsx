import Image from 'next/image';
import { useRouter } from 'next/router';
import { AVATAR_SIZE_MAP, SIZE_MAP } from './constants';
import { AvatarProps } from './types';
import React from 'react';

const NoAvatar = (): React.ReactElement => (
  <svg
    className="w-full h-full p-4 text-gray-400"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Avatar: React.FC<AvatarProps> = (props: AvatarProps): React.ReactElement => {
  const { avatar, isRounded = false, size = 'default', url } = props;
  const router = useRouter();
  const sizeClass = SIZE_MAP[size];
  const roundedClass = isRounded ? 'rounded-full' : 'rounded-lg';

  if (url) {
    return (
      <button className="focus:outline-none" onClick={() => router.push(url)} type="button">
        <Image
          alt="avatar"
          className={`relative flex items-center justify-center overflow-hidden  
        object-contain object-center ${roundedClass} ${sizeClass}`}
          height={AVATAR_SIZE_MAP.height}
          src={avatar}
          width={AVATAR_SIZE_MAP.width}
        />
      </button>
    );
  }

  if (!avatar) {
    return (
      <div
        className={`relative h-${AVATAR_SIZE_MAP.height} flex items-center justify-center overflow-hidden
    object-contain object-center bg-gray-100 ${roundedClass} ${sizeClass}`}
      >
        <NoAvatar />
      </div>
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

export default Avatar;
