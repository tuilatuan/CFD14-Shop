import React, { useState } from "react";
import useQuery from "./useQuery";
import { productService } from "../services/productServider";
import { pageService } from "../services/pageService";
import useMutation from "./useMutation";
import { subscribesService } from "../services/subscribesService";
import { message } from "antd";
import { GENERAL_MESSAGE, HOME_MESSAGE } from "../constants/message";

const useHomePage = () => {
  const { data: productsData, loading } = useQuery(productService.getProducts);
  const products = productsData?.products || [];
  const featuredProducts = products?.filter((product) => product.featured) || [];
  const onSaleProducts = products?.filter((product) => product.onSale) || [];
  const topRatedProducts = products?.filter((product) => product.topRated) || [];
  const { data: categoriesData } = useQuery(productService.getCate);
  const categories = categoriesData?.products || [];
  const { execute: dealExecute } = useMutation(subscribesService.subscribesDeals);
  //khong tra ve homeData
  const { data: homeData } = useQuery(() => pageService.getPagesDataByName("home"));
  const brands = homeData?.data?.brands || [];
  const services = homeData?.data?.information || {};
  //IntroSection
  const introProducts = featuredProducts.slice(0, 3);
  const introProps = {
    introProducts,
  };
  //Hot Product
  const hotProductProps = {
    featuredProducts,
    onSaleProducts,
    topRatedProducts,
    loading,
  };
  //deal section
  const dealProducts = onSaleProducts.filter((product) => product.discount > 0);
  const dealProps = {
    dealProducts,
  };

  //featured section
  const [selectedCateSlug, setSelectedCateSlug] = useState("all");
  const featureProducts =
    selectedCateSlug === "all"
      ? [...(products || [])]
      : products?.filter((product) => product?.category?.slug === selectedCateSlug);
  const featuredProps = {
    categories: [{ name: "All", slug: "all" }, ...categories],
    featureProducts,
    selectedCateSlug,
    handleSelectCate: (slug) => setSelectedCateSlug(slug),
  };
  //service props
  const serviceProps = {
    services,
  };
  //get  deal
  const handleSubscribes = (email, callback) => {
    console.log("callback", callback);
    if (email) {
      console.log("chay do day", email);

      dealExecute(email, {
        onSuccess: (data) => {
          message.success(HOME_MESSAGE.deal_success);

          callback?.();
        },
        onFail: (error) => {
          message.config({
            top: 3000,
            duration: 2,
            maxCount: 3,
            rtl: true,
            prefixCls: GENERAL_MESSAGE.error,
          });
        },
      });
    }
  };
  const getDealProps = {
    handleSubscribes,
  };
  return {
    introProps,
    hotProductProps,
    dealProps,
    brands,
    featuredProps,
    serviceProps,
    getDealProps,
  };
};

export default useHomePage;
