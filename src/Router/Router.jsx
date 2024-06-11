import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import LoginPage from "../Pages/Auth/LoginPage/LoginPage";
import RegisterPage from "../Pages/Auth/RegisterPage/RegisterPage";
import OrderPage from "../Pages/OrderPage";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
        {
          path : '/sale-orders',
          element : <OrderPage/>,
        },
        {
          path: "/login",
          element: <LoginPage/>
        },
        {
          path : "/register",
          element : <RegisterPage/>
        }
      ],
    },
]);

export default router;