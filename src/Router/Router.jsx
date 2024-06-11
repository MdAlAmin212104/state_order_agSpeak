import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
        // {
        //   path: "login",
        //   element: <LoginPage/>,
        // },
        // {
        //   path: "sale-orders",
        //   element: <SaleOrdersPage/>,
        // },
      ],
    },
]);

export default router;