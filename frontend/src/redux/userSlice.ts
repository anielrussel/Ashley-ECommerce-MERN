import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  _id: string;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  firstName: '',
  lastName: '',
  email: '',
  image: '',
  _id: '',
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRedux: (state, action: PayloadAction<UserState>) => {
      const { firstName, lastName, email, image, _id } = action.payload;
      console.log(action)
      state._id = _id;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.image = image;
      state.isLoggedIn = true;
    },
    logoutRedux: (state) => {
      state._id = '';
      state.firstName = '';
      state.lastName = '';
      state.email = '';
      state.image = '';
      state.isLoggedIn = false;
    },
  },
});

export const { loginRedux, logoutRedux } = userSlice.actions;

export default userSlice.reducer;
