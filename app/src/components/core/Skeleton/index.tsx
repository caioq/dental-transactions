import SkeletonReact, { SkeletonProps as SkeletonReactProps } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface SkeletonProps extends SkeletonReactProps {
  loading?: boolean;
}

export function SkeletonWrapper({ loading, ...children }: SkeletonProps) {
  return <>{loading ? <SkeletonReact /> : children}</>;
}

export function Skeleton({ ...props }: SkeletonProps) {
  return <SkeletonReact {...props} />;
}
