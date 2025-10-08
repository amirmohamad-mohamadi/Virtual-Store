"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Loader, Minus, Plus } from "lucide-react";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { Cart, CartItem } from "@/types/types";
import { showCustomToast } from "@/components/ui/customToast";

const AddToCart = ({
  item,
  cart,
}: {
  item: Omit<CartItem, "cartId">;
  cart?: Cart;
}) => {
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = async () => {
    startTransition(async () => {
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
    });
  };

  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);

      showCustomToast({
        variant: res.success ? "default" : "destructive",
        message: res.message,
      });

      return;
    });
  };

  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);

  return existItem ? (
    <div>
      <Button type="button" variant="outline" onClick={handleRemoveFromCart}>
        {isPending ? (
          <Loader className="w-4 h-4  animate-spin" />
        ) : (
          <Minus className="w-4 h-4" />
        )}
      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button type="button" variant="outline" onClick={handleAddToCart}>
        {isPending ? (
          <Loader className="w-4 h-4  animate-spin" />
        ) : (
          <Plus className="w-4 h-4" />
        )}
      </Button>
    </div>
  ) : (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      {isPending ? (
        <Loader className="w-4 h-4  animate-spin" />
      ) : (
        <Plus className="w-4 h-4" />
      )}
      Add to cart
    </Button>
  );
};

export default AddToCart;
