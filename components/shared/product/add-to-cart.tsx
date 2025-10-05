"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { toast } from "sonner"; // استفاده مستقیم از Sonner
import { addItemToCart } from "@/lib/actions/cart.actions";
import { CartItem } from "@/types/types";
import { showCustomToast } from "@/components/ui/customToast";

const AddToCart = ({ item }: { item: CartItem }) => {
  const router = useRouter();

  const handleAddToCart = async () => {
    const res = await addItemToCart(item);

    if (!res.success) {
      showCustomToast({
        message: "res.message",
        variant: "error",
      });
      // toast.error(res.message); // toast قرمز در صورت خطا
      return;
    }

    showCustomToast({
      message: `${item.name} added to the cart`,
      variant: "success",
      actionLabel: "added to the cart",
      actionRoute: "/cart",
    });
  };

  return (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      <Plus />
      Add to cart
    </Button>
  );
};

export default AddToCart;
