import defaultAVT from "../../../assets/Image/default_avt.png";

const UserRow = ({ user, isSelected, toggleUserSelection }) => {
  const {
    _id,
    avatar,
    lastName,
    firstName,
    email,
    username,
    address,
    status,
    contactNumber,
    createdAt,
    updatedAt,
  } = user;

  // Hàm xử lý ngày tháng
  const formatDate = (date) => new Date(date).toLocaleDateString();

  return (
    <tr className="even:bg-gray-100 odd:bg-white dark:even:bg-stone-800 dark:odd:bg-stone-900 border-b dark:border-stone-700">
      <td className="px-6 py-1 text-sm">
        <input
          type="checkbox"
          id={`checkbox-${_id}`}
          name={`checkbox-${_id}`}
          checked={isSelected}
          onChange={() => toggleUserSelection(_id)}
          aria-label={`Select user ${username}`}
        />
      </td>

      <td className="px-6 py-1 flex items-center font-medium whitespace-nowrap dark:text-white text-xs">
        <img
          src={avatar ? `http://localhost:8000/${avatar}` : defaultAVT}
          alt="Avatar"
          className="w-8 h-8 rounded-full"
        />
        
        <div className="ml-2">
          <div>
            {lastName} {firstName || "-"}
          </div>
          <div className="dark:text-white whitespace-nowrap">
            {email || "-"}
          </div>
        </div>
      </td>

      <td className="px-6 py-1 text-xs whitespace-nowrap">{username}</td>

      <td className="px-6 py-1 text-xs whitespace-nowrap">
        {address || "-"}
      </td>

      <td className="px-6 py-1 text-xs whitespace-nowrap">
        {status || "-"}
      </td>

      <td className="px-6 py-1 text-xs whitespace-nowrap">
        {contactNumber || "-"}
      </td>

      <td className="px-6 py-1 text-xs whitespace-nowrap">
        {formatDate(createdAt)}
      </td>
      
      <td className="px-6 py-1 text-xs whitespace-nowrap">
        {formatDate(updatedAt)}
      </td>
      
      <td className="px-6 py-1 text-xs whitespace-nowrap">
        <button aria-label="Action button">
          {/* <form></form> */}
        </button>
      </td>
    </tr>
  );
};

export default UserRow;