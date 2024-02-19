import { Suspense } from "react";
import { Await, useLoaderData, useOutlet } from "react-router-dom";
import { AuthProvider, User } from "../contexts/AuthContext";
import { Skeleton } from "../components/core/Skeleton";

export const AuthLayout = () => {
  const outlet = useOutlet();
  const { user } = useLoaderData() as { user: User };

  return (
    <Suspense fallback={<Skeleton />}>
      <Await
        resolve={user}
        errorElement={<span>Something went wrong!</span>}
        children={(user) => <AuthProvider userData={user}>{outlet}</AuthProvider>}
      />
    </Suspense>
  );
};
