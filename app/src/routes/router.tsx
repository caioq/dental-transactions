import { createBrowserRouter } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { SignIn } from "../pages/SignIn";
import { Procedures } from "../pages/Procedures";
import { Costs } from "../pages/Costs";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/procedures",
    element: <PrivateRoute component={Procedures} />,
  },
  {
    path: "/costs",
    element: <PrivateRoute component={Costs} />,
  },
]);
