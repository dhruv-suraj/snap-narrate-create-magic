
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-3",
};

const LoadingSpinner = ({ className, size = "md" }: LoadingSpinnerProps) => {
  return (
    <div
      className={cn(
        "inline-block animate-spin rounded-full border-solid border-current border-t-transparent",
        sizeClasses[size],
        className
      )}
    />
  );
};

export default LoadingSpinner;
