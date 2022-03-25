const Avatar = ({ avatar }) => {
  return (
    <div className="flex items-center justify-center w-20 h-20">
      <img
        className="inline-block object-cover object-center w-full h-full rounded-lg shadow-inner ring-2 ring-gray-300"
        src={avatar}
        alt="avatar"
      />
    </div>
  )
}
export default Avatar
