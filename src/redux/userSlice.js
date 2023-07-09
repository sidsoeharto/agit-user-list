import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        username: 'JohnDoe',
        email: 'john.doe@example.com',
        password: 'Asdf1234!',
        confirmPassword: 'Asdf1234!',
        expiredDate: '2023-07-31',
        groupAccess: 'Group 1'
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        username: 'JaneSmith',
        email: 'jane.smith@example.com',
        password: 'Asdf1234!',
        confirmPassword: 'Asdf1234!',
        expiredDate: '2023-07-31',
        groupAccess: 'Group 2'
      },
      {
        id: 3,
        firstName: 'Bob',
        lastName: 'Johnson',
        username: 'BobJohnson',
        email: 'bob.johnson@example.com',
        password: 'Asdf1234!',
        confirmPassword: 'Asdf1234!',
        expiredDate: '2023-07-31',
        groupAccess: 'Group 3'
      },
    ],
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    removeUser: (state, action) => {
      const userId = action.payload;
      state.users = state.users.filter(user => user.id !== userId);
    },
    updateUser: (state, action) => {
      const { userId, userData } = action.payload;
      const userIndex = state.users.findIndex(user => user.id === userId);
      if (userIndex !== -1) {
        state.users[userIndex] = {
          ...state.users[userIndex],
          ...userData,
        };
      }
    },
  },
});

export const { addUser, removeUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
