import Image from 'next/image';
import { useRouter } from 'next/router';
import { AVATAR_SIZE_MAP, SIZE_TO_CLASS_MAP } from './constants';
import { AvatarProps } from './types';
import React from 'react';

const Avatar: React.FC<AvatarProps> = (props: AvatarProps): React.ReactElement => {
  const { avatar, isRounded = false, size = 'default', url } = props;
  const router = useRouter();
  const sizeClass = SIZE_TO_CLASS_MAP[size];
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
