import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {IInitState,IUserState} from './type'
import {IRootState} from '../type'

const initialState: IInitState = {
  user: {
    id: 0,
    name: '',
    token: ''
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    incrementByUser: (state, action: PayloadAction<IUserState>) => {
      state.user = action.payload;
    },
  },
});

export const { incrementByUser } = userSlice.actions;

// export const incrementAsync = (data) => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
//   userLogin(data).then(res => {
//     message.success(res.msg)
//       Cookies.set('token', res.data.token)
//       navigate('/main')
//   })
// };

export const storeUser = (state: IRootState) => state.user.id;

export default userSlice.reducer;
