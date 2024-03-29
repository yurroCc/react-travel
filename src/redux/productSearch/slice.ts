import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface ProductSearchState {
  loading: boolean;
  error: string | null;
  data: any;
  pagination: any;
}

const initialState: ProductSearchState = {
  loading: true,
  error: null,
  data: null,
  pagination: null,
};

export const searchProduct = createAsyncThunk(
  "productSearch/searchProduct",
  async (
    paramaters: {
      keywords: string;
      nextPage: number | string;
      pageSize: number | string;
    },
    thunkAPI
  ) => {
    // thunkAPI.dispatch(productDetailSlice.actions.fetchStart())
    // try {
    let url = `http://123.56.149.216:8080/api/touristRoutes?pageNumber=${paramaters.nextPage}&pageSize=${paramaters.pageSize}`;
    if (paramaters.keywords) {
      url += `&keyword=${paramaters.keywords}`;
    }
    // console.log(1111);
    const response = await axios.get(url);
    console.log("response:" + response);
    if (response == null) {
      return {
        data: null,
      };
    }
    return {
      data: response.data,
      pagination: JSON.parse(response.headers["x-pagination"]),
    };
    // thunkAPI.dispatch(productDetailSlice.actions.fetchSuccess(data))
    // } catch (error) {
    //   // setError (error instanceof Error ? error.message : "error");
    //   // setLoading (false);
    //   thunkAPI.dispatch(productDetailSlice.actions.fetchFail(error instanceof Error ? error.message : "error"))
    // }
  }
);
export const productSearchSlice = createSlice({
  name: "productSearch",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [searchProduct.pending.type]: (state) => {
      // return{...state, loading: true}
      state.loading = true;
    },
    [searchProduct.fulfilled.type]: (state, action) => {
      state.data = action.payload.data;
      state.pagination = action.payload.pagination;
      state.loading = false;
      state.error = null;
    },
    [searchProduct.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      // const ddd = action.payload;
      state.loading = false;
      state.error = action.payload;
    },
  },
});
