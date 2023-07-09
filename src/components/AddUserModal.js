import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addUser } from '../redux/userSlice';
import { validateForm } from '../helpers/formValidation';
import { groupAccessOptions } from '../helpers/groupAccessOptions';
import InputField from './InputField';

const AddUserModal = () => {
  const users = useSelector(state => state.user.users);
  const dispatch = useDispatch();
  
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    expiredDate: '',
    groupAccess: '',
  });
  const [validationErrors, setValidationErrors] = useState({});

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleAddUser = (userData) => {
    const existingIds = users.map(user => user.id);
    const newId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
  
    dispatch(addUser({ id: newId, ...userData }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm(userData, users);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setTimeout(() => setValidationErrors({}), 3000)
      return;
    }

    handleAddUser(userData);

    setUserData({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      expiredDate: '',
      groupAccess: '',
    });

    setShowModal(false);
  };

  return (
    <div>
      <button
        onClick={toggleModal}
        className="px-4 py-2 my-3 bg-green-500 text-white rounded-lg"
      >
        Add User
      </button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-8 min-w-[100%] lg:min-w-[25%] max-h-[75%] overflow-y-scroll">
            <h2 className="text-2xl font-bold mb-4">Add User</h2>
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
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg ml-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddUserModal;