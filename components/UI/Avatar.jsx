const Avatar = ({ avatar }) => {
  return (
    <div className="flex items-center justify-center w-24 h-24">
      <img
        className="inline-block object-contain object-center w-full h-full px-2 rounded-lg shadow-inner ring-2 ring-gray-300"
        src={avatar}
        alt="avatar"
      />
    </div>
  )
}
export default Avatar
