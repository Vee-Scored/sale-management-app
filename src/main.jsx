import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import "./index.css";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import OpenVoucherPage from "./pages/OpenVoucherPage.jsx";
import DashboardLayout from "./Layout.jsx";
import ProductListPage from "./pages/ProductListPage.jsx";
import UserProfilePage from "./pages/UserProfilePage.jsx";
import VoucherListPage from "./pages/VoucherListPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import ProductCreatePage from "./pages/ProductCreatePage.jsx";
import ProductEditPage from "./pages/ProductEditPage.jsx";
import VoucherCard from "./components/VoucherCard.jsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         index: true,
//         element: <SignUpPage />,
//       },
//       {
//         path: "login",
//         element: <LoginPage />,
//       },
//     ],
//   },
//   {
//     path: "/dashboard",
//     element: <DashboardLayout />,
//     children: [
//       {
//         index: true,
//         element: <UserProfilePage />,
//       },
//       {
//         path: "product",

//         children: [
//           {
//             path: "list",
//             element: <ProductListPage />,
//           },
//           {
//             path: "create",
//             element: <ProductCreatePage />,
//           },
//           {
//             path: "edit/:id",
//             element: <ProductEditPage />,
//           },
//         ],
//       },
     
//       {
//         path: "voucher/open-voucher",
//         element: <OpenVoucherPage />,
//       },
//       {
//         path: "voucher/list",
//         element: <VoucherListPage />,
//       },
//       {
//         path: "voucher/card/:id",
//         element: <VoucherCard />,
//       },
//     ],
//   },
// ]);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );

ReactDOM.createRoot(document.getElementById("root")).render(

    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index="true" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route path="/dashboard">
          <Route element={<DashboardLayout />}>
            <Route index="true" element={<UserProfilePage />} />
            <Route path="product">
              <Route path="list" element={<ProductListPage/>} />
              <Route path="create" element={<ProductCreatePage/>} />
              <Route path="edit/:id" element={<ProductEditPage/>} />
            </Route>
            <Route path="voucher/list" element={<VoucherListPage/>} />
            <Route path="voucher/open-voucher" element={<OpenVoucherPage/>} />
            <Route path="voucher/card/:id" element={<VoucherCard/>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  
);
