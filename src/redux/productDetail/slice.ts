import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface ProductDetailState {
  loading: boolean,
  error: string | null,
  data: any,
}

const initialState: ProductDetailState = {
  loading: true,
  error: null,
  data: null
};

export const getProductDetail = createAsyncThunk (
  "productDetail/getProductDetail",
  async (touristRouteId: string, thunkAPI) => {
    // thunkAPI.dispatch(productDetailSlice.actions.fetchStart())
    // try {
    const { data } = await axios.get (`http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`);
    
    return data;
    // thunkAPI.dispatch(productDetailSlice.actions.fetchSuccess(data))
    // } catch (error) {
    //   // setError (error instanceof Error ? error.message : "error");
    //   // setLoading (false);
    //   thunkAPI.dispatch(productDetailSlice.actions.fetchFail(error instanceof Error ? error.message : "error"))
    // }
  }
);
export const productDetailSlice = createSlice ({
    name: "productDetail",
    initialState: initialState,
    reducers: {},
    extraReducers: {
      [getProductDetail.pending.type]: (state) => {
        // return{...state, loading: true}
        state.loading = true;
      },
      [getProductDetail.fulfilled.type]: (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      },
      [getProductDetail.rejected.type]: (state, action: PayloadAction<string | null>) => {
        const ddd = action.payload;
        state.loading = false;
        state.error = action.payload;
      }
    }
  }
);
