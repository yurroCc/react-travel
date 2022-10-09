import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import {
  DetailPage,
  HomePage,
  PlaceOrderPage,
  RegisterPage,
  SearchPage,
  ShoppingCart,
  SignInPage,
} from "./pages";
import { useAppDispatch, useSelector } from "./redux/hooks";
import { getShoppingCart } from "./redux/shoppingCart/slice";

const PrivateRoute = ({ children }) => {
  const jwt = useSelector((state) => state.user.token);
  return jwt ? children : <Navigate to={"/signin"} />;
};

function App() {
  const jwt = useSelector((state) => state.user.token);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (jwt) {
      dispatch(getShoppingCart(jwt));
    }
  }, [jwt]);
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path={"/detail/:touristRouteId"} element={<DetailPage />} />

          <Route path="/search" element={<SearchPage />}>
            <Route path=":keywords" element={<SearchPage />} />
          </Route>
          <Route
            path={"/shoppingCart"}
            element={
              <PrivateRoute>
                <ShoppingCart />
              </PrivateRoute>
            }
          />
          <Route
            path={"/placeOrder"}
            element={
              <PrivateRoute>
                <PlaceOrderPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<h1>404 not found 页面去哪了</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
