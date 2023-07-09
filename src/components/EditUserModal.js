import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { updateUser } from '../redux/userSlice';
import { validateForm } from '../helpers/formValidation';
import InputField from './InputField';
import { groupAccessOptions } from '../helpers/groupAccessOptions';

const EditUserModal = ({ userId, onCancel }) => {
  const users = useSelector(state => state.user.users);
  const dispatch = useDispatch();
  const user = users.find(user => user.id === userId);

  const [userData, setUserData] = useState(user);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm(userData, users, userId);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    dispatch(updateUser({ userId, userData }));

    onCancel();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 min-w-[100%] lg:min-w-[25%] max-h-[75%] overflow-y-scroll">
        <h2 className="text-2xl font-bold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <InputField
            label="First Name"
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
            error={validationErrors.firstName}
          />
          <InputField
            label="Last Name"
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
            error={validationErrors.lastName}
          />
          <InputField
            label="Username"
            name="username"
            value={userData.username}
            onChange={handleChange}
            error={validationErrors.username}
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            value={userData.email}
            onChange={handleChange}
            error={validationErrors.email}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            value={userData.password}
            onChange={handleChange}
            error={validationErrors.password}
          />
          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={userData.confirmPassword}
            onChange={handleChange}
            error={validationErrors.confirmPassword}
          />
          <InputField
            label="Expired Date"
            name="expiredDate"
            type="date"
            value={userData.expiredDate}
            onChange={handleChange}
            error={validationErrors.expiredDate}
          />
          <InputField
            label="Group Access"
            name="groupAccess"
            value={userData.groupAccess}
            onChange={handleChange}
            error={validationErrors.groupAccess}
            options={groupAccessOptions}
          />
          <div className='flex justify-end'>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg ml-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;