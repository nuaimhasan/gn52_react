import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import React, { Suspense } from "react";
import Spinner from "../components/Spinner/Spinner";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";

// Lazy-loaded components
const AdminLayout = React.lazy(() => import("../Layout/AdminLayout"));
const AdminRoute = React.lazy(() => import("../AdminRoute/AdminRoute"));

const Dashboard = React.lazy(() =>
  import("../pages/Admin/Dashboard/Dashboard")
);
const Login = React.lazy(() => import("../pages/Login/Login"));
const Administrator = React.lazy(() =>
  import("../pages/Admin/Administrator/Administrator")
);
const AddAdministrator = React.lazy(() =>
  import("../pages/Admin/Administrator/AddAdministrator")
);
const Orders = React.lazy(() => import("../pages/Admin/Orders/Orders"));
const OrderDetails = React.lazy(() =>
  import("../pages/Admin/OrderDetails/OrderDetails")
);
const OrderPrint = React.lazy(() =>
  import("../pages/Admin/OrderPrint/OrderPrint")
);
const ProductsList = React.lazy(() =>
  import("../pages/Admin/Product/ProductsList")
);
const AddProduct = React.lazy(() =>
  import("../pages/Admin/Product/AddProduct")
);
const EditProduct = React.lazy(() =>
  import("../pages/Admin/Product/EditProduct")
);
const AddFeature = React.lazy(() =>
  import("../pages/Admin/Feature/AddFeature")
);
const FeatureList = React.lazy(() =>
  import("../pages/Admin/Feature/FeatureList")
);
const EditFeature = React.lazy(() =>
  import("../pages/Admin/Feature/EditFeature")
);
const AddFaq = React.lazy(() => import("../pages/Admin/Faq/addFaq"));
const FaqList = React.lazy(() => import("../pages/Admin/Faq/faqList"));
const EditFaq = React.lazy(() => import("../pages/Admin/Faq/updateFaq"));
const Banner = React.lazy(() => import("../pages/Admin/Banner/Banner"));
const Logo = React.lazy(() => import("../pages/Admin/Logo/Logo"));
const SEO = React.lazy(() => import("../pages/Admin/SEO/SEO"));
const Favicon = React.lazy(() =>
  import("../pages/Admin/FrontEndSetting/Favicon/Favicon")
);
const BusinessInfo = React.lazy(() =>
  import("../pages/Admin/BusinessInfo/businessInfo")
);
const FeatureSection = React.lazy(() =>
  import("../pages/Admin/FeatureSection/FeatureSection")
);
const FaqSection = React.lazy(() =>
  import("../pages/Admin/FaqSection/FaqSection")
);

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },

  {
    path: "/order/success/:orderId",
    element: <OrderSuccess />,
  },

  {
    path: "/admin/login",
    element: (
      <Suspense fallback={<Spinner />}>
        <Login />
      </Suspense>
    ),
  },

  {
    path: "/admin",
    element: (
      <Suspense fallback={<Spinner />}>
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      </Suspense>
    ),
    children: [
      {
        path: "/admin",
        element: <Dashboard />,
      },
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin/administrator/add",
        element: <AddAdministrator />,
      },
      {
        path: "/admin/administrator/all",
        element: <Administrator />,
      },
      {
        path: "/admin/product/all",
        element: <ProductsList />,
      },
      {
        path: "/admin/product/add",
        element: <AddProduct />,
      },
      {
        path: "/admin/product/edit/:id",
        element: <EditProduct />,
      },
      {
        path: "/admin/features/all",
        element: <FeatureList />,
      },
      {
        path: "/admin/feature/add",
        element: <AddFeature />,
      },
      {
        path: "/admin/feature/edit/:id",
        element: <EditFeature />,
      },

      // Section
      {
        path: "/admin/feature/section",
        element: <FeatureSection />,
      },
      {
        path: "/admin/faq-section",
        element: <FaqSection />,
      },

      {
        path: "/admin/faq",
        element: <FaqList />,
      },
      {
        path: "/admin/front-end/favicon",
        element: <Favicon />,
      },
      {
        path: "/admin/seo",
        element: <SEO />,
      },
      {
        path: "/admin/faq/add",
        element: <AddFaq />,
      },
      {
        path: "/admin/faq/edit/:id",
        element: <EditFaq />,
      },
      {
        path: "/admin/banner",
        element: <Banner />,
      },
      {
        path: "/admin/businessInfo",
        element: <BusinessInfo />,
      },
      {
        path: "/admin/front-end/logo",
        element: <Logo />,
      },
      {
        path: "/admin/orders",
        element: <Orders />,
      },
      {
        path: "/admin/order/:id",
        element: <OrderDetails />,
      },
    ],
  },

  {
    path: "/admin/order/print/:id",
    element: (
      <Suspense fallback={<Spinner />}>
        <OrderPrint />
      </Suspense>
    ),
  },

  // {
  //   path: "/admin/eManager/add",
  //   element: <AddAdmin />,
  // },
]);
