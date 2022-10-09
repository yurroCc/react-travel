import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  loading: boolean;
  error: string | null;
  token: string | null;
}

const initialState: UserState = {
  loading: false,
  error: null,
  token: null,
};

export const signIn = createAsyncThunk(
  "user/signIn",
  async (
    parameters: {
      email: string;
      password: string;
    },
    thunkAPI
  ) => {
    // thunkAPI.dispatch(productDetailSlice.actions.fetchStart())
    // try {
    const { data } = await axios.post(`http://123.56.149.216:8080/auth/login`, {
      email: parameters.email,
      password: parameters.password,
    });

    return data.token;
    // thunkAPI.dispatch(productDetailSlice.actions.fetchSuccess(data))
    // } catch (error) {
    //   // setError (error instanceof Error ? error.message : "error");
    //   // setLoading (false);
    //   thunkAPI.dispatch(productDetailSlice.actions.fetchFail(error instanceof Error ? error.message : "error"))
    // }
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    logOut: (state) => {
      state.token = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: {
    [signIn.pending.type]: (state) => {
      // return{...state, loading: true}
      state.loading = true;
    },
    [signIn.fulfilled.type]: (state, action) => {
      state.token = action.payload;
      state.loading = false;
      state.error = null;
    },
    [signIn.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
