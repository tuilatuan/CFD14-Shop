import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import PATHS from "./constants/path";
import BlogPage from "./pages/BlogPage";
import ProductPage from "./pages/ProductPage";
import BlogSinglePage from "./pages/BlogSingle";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage";
import DashboardPage from "./pages/DashboardPage";
import ShippingPage from "./pages/ShippingPage";
import ReturnsPage from "./pages/ReturnsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import PrivacyPage from "./pages/PrivacyPage";
import PrivateRoute from "./components/PrivateRoute";
import ErrorPage from "./pages/404Page";
import { message } from "antd";
import "./assets/style.css";
function App(props) {
  // const { counter } = useSelector((state) => state.counter);
  // const dog = useSelector((state) => state.dog);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchDog());
  // }, []);
  // message.config({
  //   top: 60,
  //   duration: 2,
  //   maxCount: 3,
  //   rtl: true,
  //   // prefixCls: "my-message",
  // });
  return (
    <BrowserRouter>
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

          <Route element={<PrivateRoute element={PATHS.HOME} />}>
            <Route path={PATHS.CART} element={<CartPage />} />
            <Route path={PATHS.CHECKOUT} element={<CheckoutPage />} />
            <Route path={PATHS.CHECKOUT_SUCCESS} element={<CheckoutSuccessPage />} />
            <Route path={PATHS.PROFILE.INDEX} element={<DashboardPage />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
