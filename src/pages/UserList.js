import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeUser } from '../redux/userSlice';
import AddUserModal from '../components/AddUserModal';
import EditUserModal from '../components/EditUserModal';
import Pagination from '../components/Pagination';

const UserList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [editingUserId, setEditingUserId] = useState(null);
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const users = useSelector(state => state.user.users);
  const dispatch = useDispatch();

  const sortedUsers = [...users].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (aValue < bValue) {
      return sortOrder === 'asc' ? -1 : 1;
    } else if (aValue > bValue) {
      return sortOrder === 'asc' ? 1 : -1;
    } else {
      return 0;
    }
  });

  const filteredUsers = sortedUsers.filter(user => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      user.firstName.toLowerCase().includes(searchTermLower) ||
      user.lastName.toLowerCase().includes(searchTermLower) ||
      user.username.toLowerCase().includes(searchTermLower) ||
      user.email.toLowerCase().includes(searchTermLower)
    );
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleRemoveUser = (userId) => {
    dispatch(removeUser(userId));
  };

  const handleEditUser = (user) => {
    setEditingUserId(user.id);
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg w-64"
        />
      </div>
      <AddUserModal />
      {editingUserId && (
        <EditUserModal userId={editingUserId} onCancel={handleCancelEdit} />
      )}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th
                className="text-left px-6 py-3 cursor-pointer"
                onClick={() => handleSort('firstName')}
              >
                First Name {sortColumn === 'firstName' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
              </th>
              <th
                className="text-left px-6 py-3 cursor-pointer"
                onClick={() => handleSort('lastName')}
              >
                Last Name {sortColumn === 'lastName' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
              </th>
              <th
                className="text-left px-6 py-3 cursor-pointer"
                onClick={() => handleSort('username')}
              >
                Username {sortColumn === 'username' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
              </th>
              <th
                className="text-left px-6 py-3 cursor-pointer"
                onClick={() => handleSort('email')}
              >
                Email {sortColumn === 'email' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
              </th>
              <th
                className="text-left px-6 py-3 cursor-pointer"
                onClick={() => handleSort('expiredDate')}
              >
                Expired Date {sortColumn === 'expiredDate' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
              </th>
              <th
                className="text-left px-6 py-3 cursor-pointer"
                onClick={() => handleSort('groupAccess')}
              >
                Group Access {sortColumn === 'groupAccess' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
              </th>
              <th className="text-center px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map(user => (
              <tr key={user.id} className='bg-white border-b'>
                <td className="px-6 py-3">{user.firstName}</td>
                <td className="px-6 py-3">{user.lastName}</td>
                <td className="px-6 py-3">{user.username}</td>
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3">{user.expiredDate}</td>
                <td className="px-6 py-3">{user.groupAccess}</td>
                <td className="text-center inline-flex px-6 py-3">
                  <button
                    onClick={() => handleRemoveUser(user.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg ml-2"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => handleEditUser(user)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg ml-2"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalItems={filteredUsers.length}
        itemsPerPage={usersPerPage}
        currentPage={currentPage}
        onPageChange={paginate}
      />
    </div>
  );
};

export default UserList;