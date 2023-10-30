import { createBrowserRouter } from "react-router-dom";
import { SignIn } from "../pages/SignIn";
import { Procedures } from "../pages/Procedures";
import { PrivateRoute } from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/procedures",
    element: <PrivateRoute component={Procedures} />,
  },
]);
