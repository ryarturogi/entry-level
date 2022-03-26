import Image from 'next/image'

const Avatar = ({ avatar, rounded, size }) => {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ring-2 ring-gray-100 px-2 ${
        size === 'xs'
          ? 'w-10 h-10'
          : size === 'sm'
          ? 'w-16 h-16'
          : size === 'md'
          ? 'w-24 h-24'
          : size === 'lg'
          ? 'w-28 h-28'
          : 'w-32 h-32'
      } ${rounded ? 'rounded-full' : 'rounded-sm'}`}
    >
      {rounded ? (
        <Image className="object-contain object-center" src={avatar} alt="avatar" layout="fill" />
      ) : (
        <Image
          className="object-contain object-center"
          src={avatar}
          alt="avatar"
          width={'100%'}
          height={'100%'}
        />
      )}
    </div>
  )
}
export default Avatar
