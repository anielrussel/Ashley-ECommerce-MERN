import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
  firstName: string,
  lastName: string,
  email: string,
  image: string,
  _id: string
}

const initialState: CounterState = {
    firstName: "",
    lastName: "",
    email: "",
    image: "",
    _id: ""
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      console.log(action.payload.data)
      state._id = action.payload.data._id
      state.firstName = action.payload.data.firstName
      state.lastName = action.payload.data._lastNamed
      state.email = action.payload.data.email
      state.image = action.payload.data.image
    },
  },
})

// Action creators are generated for each case reducer function
export const { loginRedux } = userSlice.actions

export default userSlice.reducer