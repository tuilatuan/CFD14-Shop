import classNames from "classnames";

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
  maxPrice: 4500,
};
export const THUNK_STATUS = {
  pending: "pending",
  fullfilled: "fullfilled",
  rejected: "rejected",
};

export const SHIPPING_OPTIONS = [
  {
    value: "free",
    label: "Free Shipping",
    price: 0,
  },
  {
    value: "standard",
    label: "Standard",
    price: 10,
  },
  {
    value: "express",
    label: "Express",
    price: 20,
  },
];

export const PAYMENT_MENTHOD = {
  cash: "cash",
  card: "card",
};
export const cn = classNames;
