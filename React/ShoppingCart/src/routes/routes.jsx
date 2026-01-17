import App from "../App";
import Cart from "../pages/Cart/Cart";
import Homepage from "../pages/Homepage/Homepage";
import Shop from "../pages/Shop/Shop";

const routes = [
  {
    path: "/",
    element: <App/>,
    children: [
      { index: true, element: <Homepage/>},
      { path: "shop", element: <Shop/> },
      { path: "cart", element: <Cart/> }
    ]
  },
];

export default routes;