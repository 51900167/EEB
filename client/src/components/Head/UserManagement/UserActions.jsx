import React from 'react'
import ActionButton from './ActionButton'

const UserActions = ({ selectedUsers, onDelete }) => {
  const handleDelete = () => {
    // Thực hiện xóa các người dùng đã chọn
    onDelete(selectedUsers);
  };

  return (
      <div className="flex justify-end space-x-2 m-4 rounded-md">
        <ActionButton onClick={handleDelete} text="Xóa" colorClass="bg-red-500" />
      </div>
   
  );
};

export default UserActions
