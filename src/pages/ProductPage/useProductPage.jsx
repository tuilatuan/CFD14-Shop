import { useLocation, useSearchParams } from "react-router-dom";
import queryString from "query-string";
import { useEffect, useMemo } from "react";
import useQuery from "../../hooks/useQuery";
import { productService } from "../../services/productServider";
import { PRICE_FIlTER, SORT_OPTIONS } from "../../constants/general";
import useMutation from "../../hooks/useMutation";

const PRODUCT_LIMITS = 9;

const useProductPage = () => {
  const { search } = useLocation();
  const queryObject = queryString.parse(search);
  const [_, setSearchParams] = useSearchParams();

  //api
  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
    execute: fetchProducts,
  } = useMutation((query) =>
    productService.getProducts(query || `?limit=${PRODUCT_LIMITS}`)
  );

  const products = productsData?.products || [];
  console.log(" products:>> ", products);
  const productsPagi = productsData?.pagination || {};

  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery(productService.getCate);
  const categories = categoriesData?.products || [];

  useEffect(() => {
    fetchProducts(search);
  }, [search]);

  const updateQueryString = (queryObject) => {
    const newQueryString = queryString.stringify({
      ...queryObject,
      limit: PRODUCT_LIMITS,
    });
    setSearchParams(new URLSearchParams(newQueryString));
  };

  //toolbox Props
  const activeSort = useMemo(() => {
    return (
      Object.values(SORT_OPTIONS).find(
        (options) =>
          options.queryObject.orderBy === queryObject.orderBy &&
          options.queryObject.order === queryObject.order
      )?.value || SORT_OPTIONS.popularity.value
    );
  }, [queryObject]);

  const onSortChange = (sortType) => {
    const sortQueryObject = SORT_OPTIONS[sortType].queryObject;
    if (sortQueryObject) {
      updateQueryString({
        ...queryObject,
        ...sortQueryObject,
        page: 1,
      });
    }
  };

  const toolboxProps = {
    showNumb: products?.length || 0,
    totalNumb: productsPagi.total || 0,
    activeSort,
    onSortChange,
  };

  //Productlist Props
  const productListProps = {
    isLoading: productsLoading,
    isError: !!productsError,
    products,
  };
  //Pagination Props
  const onPaniChange = (page) => {
    updateQueryString({ ...queryObject, page: page });
  };
  const pagiProps = {
    page: Number(productsPagi.page || queryObject.page || 1),
    limit: Number(productsPagi.limit || 0),
    total: Number(productsPagi.total || 0),
    onPaniChange,
  };
  // Filter Props
  const onCateFilterChange = (cateId, isChecked) => {
    let newCategoryFilter = Array.isArray(queryObject.category)
      ? [...queryObject.category, cateId]
      : [queryObject.category, cateId];

    if (!isChecked) {
      newCategoryFilter = newCategoryFilter.filter(
        (category) => category !== cateId
      );
    }
    if (cateId === "") {
      newCategoryFilter = [];
    }
    updateQueryString({ ...queryObject, category: newCategoryFilter, page: 1 });
  };

  const handlePriceFilterChange = (values) => {
    if (values?.length === 2) {
      updateQueryString({
        ...queryObject,
        minPrice: values[0],
        maxPrice: values[1],
        page: 1,
      });
    }
  };

  const filterProps = {
    categories: categories || [],
    isLoading: categoriesLoading,
    isError: categoriesError,
    activeCategory: Array.isArray(queryObject.category)
      ? queryObject.category
      : [queryObject.category],
    currentPriceRange: [
      queryObject.minPrice || PRICE_FIlTER.minPrice,
      queryObject.maxPrice || PRICE_FIlTER.maxPrice,
    ],
    onCateFilterChange,
    handlePriceFilterChange,
  };
  return { productListProps, pagiProps, toolboxProps, filterProps };
};

export default useProductPage;
