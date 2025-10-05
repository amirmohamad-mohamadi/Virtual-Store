// components/ui/CustomToast.tsx
"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type Variant = "success" | "error" | "info" | "warning";

type CustomToastProps = {
  t: string | number;
  message: string;
  variant?: Variant;
  actionLabel?: string;
  actionRoute?: string;
};

export function CustomToast({
  t,
  message,
  variant = "info",
  actionLabel,
  actionRoute,
}: CustomToastProps) {
  const router = useRouter();

  const variantStyles: Record<Variant, string> = {
    success:
      "bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700 text-green-800 dark:text-green-200",
    error:
      "bg-red-100 dark:bg-red-900 border-red-300 dark:border-red-700 text-red-800 dark:text-red-200",
    info: "bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-200",
    warning:
      "bg-yellow-100 dark:bg-yellow-900 border-yellow-300 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200",
  };

  const buttonStyles: Record<Variant, string> = {
    success: "bg-green-600 hover:bg-green-700",
    error: "bg-red-600 hover:bg-red-700",
    info: "bg-blue-600 hover:bg-blue-700",
    warning: "bg-yellow-600 hover:bg-yellow-700 text-black",
  };

  return (
    <div
      className={`w-[360px] border rounded-md shadow-lg p-4 flex flex-col justify-between ${variantStyles[variant]}`}
    >
      <button
        className="absolute top-1 right-2 text-lg text-gray-500 hover:text-gray-700 cursor-pointer"
        onClick={() => toast.dismiss(t)}
        aria-label="Close"
      >
        ×
      </button>
      <span className="text-sm leading-relaxed break-words">{message}</span>
      {(actionLabel || actionRoute) && (
        <div className="flex justify-end mt-3">
          <Button
            size="sm"
            className={`${buttonStyles[variant]} text-white px-3 py-1 rounded cursor-pointer transition-colors`}
            onClick={() => {
              router.push(actionRoute ?? "/");
              toast.dismiss(t);
            }}
          >
            {actionLabel ?? "Go to cart"}
          </Button>
        </div>
      )}
    </div>
  );
}
export function showCustomToast(props: Omit<CustomToastProps, "t">) {
  toast.custom((t) => <CustomToast t={t} {...props} />);
}
