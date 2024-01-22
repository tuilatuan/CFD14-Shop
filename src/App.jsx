import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes, useActionData } from "react-router-dom";
const MainLayout = lazy(() => import("./layout/MainLayout"));
const HomePage = lazy(() => import("./pages/HomePage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const BlogSinglePage = lazy(() => import("./pages/BlogSingle"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const CheckoutSuccessPage = lazy(() => import("./pages/CheckoutSuccessPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const ShippingPage = lazy(() => import("./pages/ShippingPage"));
const ReturnsPage = lazy(() => import("./pages/ReturnsPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const PrivateRoute = lazy(() => import("./components/PrivateRoute"));
const ErrorPage = lazy(() => import("./pages/404Page"));
const AccountPage = lazy(() => import("./pages/DashboardPage/AccountPage"));
const ListOrder = lazy(() => import("./pages/DashboardPage/ListOrder"));
const WishList = lazy(() => import("./pages/DashboardPage/WishList"));
const AddressAccount = lazy(() => import("./pages/DashboardPage/AddressAccount"));
const ChangePass = lazy(() => import("./pages/DashboardPage/ChangePass"));
import "./assets/style.css";
import tokenMethod from "./utils/token";
import { useDispatch } from "react-redux";
import { handleGetProfile } from "./store/reducers/authReducer";
import { handleGetCart } from "./store/reducers/cartReducer";
import PATHS from "./constants/path";
import Loading from "./components/Loading";

function App(props) {
  const dispatch = useDispatch();
  // message.config({
  //   top: 60,
  //   duration: 2,
  //   maxCount: 3,
  //   rtl: true,
  //   // prefixCls: "my-message",
  // });
  useEffect(() => {
    if (tokenMethod.get()) {
      dispatch(handleGetProfile());
      dispatch(handleGetCart());
    }
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />

            <Route path={PATHS.BLOG.INDEX} element={<BlogPage />} />
            <Route path={PATHS.BLOG.DETAIL} element={<BlogSinglePage />} />

            <Route path={PATHS.PRODUCT.INDEX} element={<ProductPage />} />
            <Route path={PATHS.PRODUCT.DETAIL} element={<ProductDetailPage />} />

            <Route path={PATHS.SHIPPING} element={<ShippingPage />} />
            <Route path={PATHS.RETURN} element={<ReturnsPage />} />
            <Route path={PATHS.PRIVACY} element={<PrivacyPage />} />
            <Route path={PATHS.ABOUT} element={<AboutPage />} />
            <Route path={PATHS.CONTACT} element={<ContactPage />} />

            <Route element={<PrivateRoute redirecPath={PATHS.HOME} />}>
              <Route path={PATHS.PROFILE.INDEX} element={<DashboardPage />}>
                <Route index element={<AccountPage />} />
                <Route path={PATHS.PROFILE.ORDER} element={<ListOrder />} />
                <Route path={PATHS.PROFILE.WISHLIST} element={<WishList />} />
                <Route path={PATHS.PROFILE.ADRESSES} element={<AddressAccount />} />
                <Route path={PATHS.PROFILE.CHANGEPASS} element={<ChangePass />} />
              </Route>
              <Route path={PATHS.CART} element={<CartPage />} />
              <Route path={PATHS.CHECKOUT} element={<CheckoutPage />} />
              <Route path={PATHS.CHECKOUT_SUCCESS} element={<CheckoutSuccessPage />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
