import { Route, createBrowserRouter, createRoutesFromElements, defer } from "react-router-dom";
import { SignIn } from "../pages/SignIn";
import { Procedures } from "../pages/Procedures";
import { Costs } from "../pages/Costs";
import { AuthLayout } from "./AuthLayout";
import { HomeLayout } from "./HomeLayout";
import { ProtectedLayout } from "./ProtectedLayout";
import { api, getUserData } from "../utils";

export enum RoutesPath {
  PROCEDURES = "/dashboard/procedures",
  COSTS = "/dashboard/costs",
}

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<AuthLayout />}
      loader={() => {
        const user = getUserData();
        if (user) {
          const token = localStorage.getItem("@DT:token");
          api.defaults.headers.authorization = `Bearer ${token}`;
        }

        return defer({ user });
      }}
    >
      <Route element={<HomeLayout />}>
        <Route path="/" element={<SignIn />} />
      </Route>

      <Route
        path="/dashboard"
        element={<ProtectedLayout />}
        loader={async () => {
          const { data: categories } = await api.get("categories", {});
          const { data: costCategories } = await api.get("cost-categories", {});

          return defer({ categories, costCategories });
        }}
      >
        <Route path="procedures" element={<Procedures />} />
        <Route path="costs" element={<Costs />} />
      </Route>
    </Route>
  )
);
