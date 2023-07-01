import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  backGroundColor:
    localStorage.getItem('savedBackgroundColor')
    ?? 'radial-gradient(circle at 10% 20%, rgb(0, 107, 141) 0%, rgb(0, 69, 91) 90%)',
}
const backgroundSlice = createSlice({
  name: 'background',
  initialState: initialState,
  reducers: {
    changeBackgroundColor: (state, {payload}) => {
      state.backGroundColor = payload
    }
  },
});

export const { actions, reducer } = backgroundSlice