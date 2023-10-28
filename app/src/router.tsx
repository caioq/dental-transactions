import { createBrowserRouter } from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { Procedures } from "./pages/Procedures";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <SignIn />,
      },

      {
        path: "/procedures",
        element: <Procedures />,
      },
    ],
  },
]);
