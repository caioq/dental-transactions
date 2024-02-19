import { Suspense } from "react";
import { Await, Navigate, Outlet, useLoaderData } from "react-router-dom";
import { useAuth } from "../hooks";
import { Header } from "../components/Header";
import { Summary } from "../components/Summary";
import { Category, ProceduresProvider } from "../contexts/ProceduresContext";
import { Skeleton } from "../components/core/Skeleton";

export const ProtectedLayout = () => {
  const { signed } = useAuth();
  const { categories, costCategories } = useLoaderData() as { categories: Category[]; costCategories: Category[] };

  if (!signed) {
    return <Navigate to="/" replace />;
  }

  return (
    <Suspense fallback={<Skeleton />}>
      <Await
        resolve={{ categories, costCategories }}
        errorElement={<span>Something went wrong!</span>}
        children={({ categories, costCategories }) => (
          <ProceduresProvider categories={categories} costCategories={costCategories}>
            <Header />
            <Summary />
            <Outlet />
          </ProceduresProvider>
        )}
      />
    </Suspense>
  );
};
