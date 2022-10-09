import React, { useEffect } from "react";
import { FilterArea, Footer, Header, ProductList } from "../../components";
import styles from "./SearchPage.module.css";
import { useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useSelector } from "../../redux/hooks";
import { searchProduct } from "../../redux/productSearch/slice";
import { Spin } from "antd";
import { MainLayout } from "../../layouts/mainLayout";

type MatchParams = {
  keywords: string;
};

export const SearchPage: React.FC = () => {
  const { keywords } = useParams<MatchParams>();
  const loading = useSelector((state) => state.productSearch.loading);
  const error = useSelector((s) => s.productSearch.error);
  const pagination = useSelector((state) => state.productSearch.pagination);
  const productList = useSelector((state) => state.productSearch.data);

  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    console.log("keywords:" + keywords);
    if (keywords) {
      dispatch(searchProduct({ nextPage: 1, pageSize: 10, keywords }));
    }
    if (keywords == undefined) {
      dispatch(searchProduct({ nextPage: 1, pageSize: 10, keywords: "" }));
    }
  }, [location]);

  const onPageChange = (nextPage, pageSize) => {
    console.log("pagechange");
    if (keywords) {
      dispatch(searchProduct({ nextPage, pageSize, keywords }));
    }
  };

  if (loading) {
    return (
      <Spin
        size="large"
        style={{
          marginTop: 200,
          marginBottom: 200,
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
        }}
      />
    );
  }
  if (error) {
    return <div>网站出错：{error}</div>;
  }
  console.log(productList);
  if (productList == null) {
    return (
      <MainLayout>
        {/* 分类过滤器{*/}
        <div className={styles["product-list-container"]}>
          <FilterArea />
        </div>

        {/*<div>没有该旅游路线</div>*/}
      </MainLayout>
    );
  }
  return (
    <>
      <Header />
      <div className={styles["page-content"]}>
        {/* 分类过滤器{*/}
        <div className={styles["product-list-container"]}>
          <FilterArea />
        </div>
        {/*{产品列表}*/}

        <div className={styles["product-list-container"]}>
          <ProductList
            data={productList}
            paging={pagination}
            onPageChange={onPageChange}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};
