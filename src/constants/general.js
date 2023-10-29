export const MODAL_TYPE = {
  login: "login",
  register: "register",
};

export const SORT_OPTIONS = {
  popularity: {
    value: "popularity",
    label: "Most Popular",
    queryObject: {
      orderBy: undefined,
      order: undefined,
    },
  },
  pricelow: {
    value: "pricelow",
    label: "Price Low to High",
    queryObject: { orderBy: "price", order: "1" },
  },
  pricehigh: {
    value: "pricehigh",
    label: "Price High to Low",
    queryObject: { orderBy: "price", order: "-1" },
  },
  newest: {
    value: "newest",
    label: "Newest",
    queryObject: { orderBy: "createAt", order: "-1" },
  },
  rating: {
    value: "rating",
    label: "Most Rated",
    queryObject: { orderBy: "rating", order: "-1" },
  },
};
export const PRICE_FIlTER = {
  minPrice: 0,
  maxPrice: 1000,
};
