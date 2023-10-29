const BLOG_PATH = "/blog";
const PROFILE_PATH = "/profile";
const PRODUCT = "/products";

const PATHS = {
  HOME: "/",
  CART: "/cart",
  CHECKOUT: "/checkout",
  CHECKOUT_SUCCESS: "/checkout_success",
  BLOG: {
    INDEX: BLOG_PATH,
    DETAIL: BLOG_PATH + "/:blogID",
  },
  PRODUCT: {
    INDEX: PRODUCT,
    DETAIL: PRODUCT + "/:productsId",
  },
  PROFILE: {
    INDEX: PROFILE_PATH,
    DASHBOARD: PROFILE_PATH + "/dashboard",
    ORDER: PROFILE_PATH + "/order",
    ADRESSES: PROFILE_PATH + "/adresses",
    WISHLIST: PROFILE_PATH + "/wishlist",
  },
  ABOUT: "/about",
  CONTACT: "/contact",
  PAYMENT: "/payment",
  PRIVACY: "/privacy",
  CART: "/cart",
  DASHBOARD: "/dashboard",
  FAQ: "/FAQ",
  RETURN: "/return",
  SHIPPING: "/shipping",
};
export default PATHS;
