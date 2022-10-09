import React from "react";
import { MainLayout } from "../../layouts/mainLayout";
import { Col, Row } from "antd";
import styles from "./ShoppingCart.module.css";
import { Affix } from "antd/es";
import { useAppDispatch, useSelector } from "../../redux/hooks";
import { ProductList } from "../../components";
import {
  checkout,
  clearShoppingCartItem,
} from "../../redux/shoppingCart/slice";
import { PaymentCard } from "../payment";
import { useNavigate } from "react-router-dom";

export const ShoppingCart: React.FC = () => {
  const loading = useSelector((state) => state.shoppingCart.loading);
  const shoppingCartItems = useSelector((state) => state.shoppingCart.items);
  const jwt = useSelector((state) => state.user.token) as string;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <MainLayout>
      <Row>
        <Col span={16}>
          <div className={styles["product-list-container"]}>
            <ProductList
              data={shoppingCartItems.map((state) => state.touristRoute)}
            ></ProductList>
          </div>
        </Col>
        <Col span={8}>
          <Affix>
            <div className={styles["payment-list-container"]}>
              <PaymentCard
                loading={loading}
                originalPrice={shoppingCartItems
                  .map((state) => state.originalPrice)
                  .reduce((a, b) => a + b, 0)}
                price={shoppingCartItems
                  .map(
                    (state) =>
                      state.originalPrice *
                      (state.discountPresent ? state.discountPresent : 1)
                  )
                  .reduce((a, b) => a + b, 0)}
                onShoppingCartClear={() => {
                  dispatch(
                    clearShoppingCartItem({
                      jwt,
                      itemIds: shoppingCartItems.map((state) => state.id),
                    })
                  );
                }}
                onCheckout={() => {
                  if (shoppingCartItems.length <= 0) {
                    return;
                  }
                  dispatch(checkout(jwt));
                  navigate("/placeOrder");
                }}
              ></PaymentCard>
            </div>
          </Affix>
        </Col>
      </Row>
    </MainLayout>
  );
};
