import {
  FETCH_RECOMMEND_PRODUCTS_FAIL,
  FETCH_RECOMMEND_PRODUCTS_START,
  FETCH_RECOMMEND_PRODUCTS_SUCCESS,
  fetchRecommendProductFailActionCreator,
  fetchRecommendProductStartActionCreator,
  fetchRecommendProductSuccessActionCreator,
  RecommendedProductAction,
} from "./recommendProductsAction";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import axios from "axios";

interface RecommendedProductesState {
  loading: boolean;
  error: string | null;
  productList: any[];
}

const defaultState: RecommendedProductesState = {
  loading: true,
  error: null,
  productList: [],
};

export default (state = defaultState, action: RecommendedProductAction) => {
  switch (action.type) {
    case FETCH_RECOMMEND_PRODUCTS_START:
      return { ...state, loading: true };
    case FETCH_RECOMMEND_PRODUCTS_SUCCESS:
      return { ...state, loading: false, productList: action.payload };
    case FETCH_RECOMMEND_PRODUCTS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const giveMeDataActionCreator =
  (): ThunkAction<void, RootState, unknown, RecommendedProductAction> =>
  async (dispatch, getState) => {
    dispatch(fetchRecommendProductStartActionCreator());
    try {
      const { data } = await axios.get(
        "http://123.56.149.216:8080/api/productCollections"
      );
      dispatch(fetchRecommendProductSuccessActionCreator(data));
    } catch (error) {
      dispatch(fetchRecommendProductFailActionCreator(error));
      // if (error instanceof Error) {
      //
      //   this.setState ({
      //     error: error.message,
      //     loading: false
      //   });
      // }
    }
  };
