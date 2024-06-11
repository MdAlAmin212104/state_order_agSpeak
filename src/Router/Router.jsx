import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import LoginPage from "../Pages/Auth/LoginPage/LoginPage";
import RegisterPage from "../Pages/Auth/RegisterPage/RegisterPage";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
        {
          path: "login",
          element: <LoginPage/>
        },
        {
            path : "register",
            element : <RegisterPage/>
        }
        // {
        //   path: "sale-orders",
        //   element: <SaleOrdersPage/>,
        // },
      ],
    },
]);

export default router;