import { EllipsisVertical, ShoppingCart, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import ModeToggle from "./mode-toggle";

const Menu = () => {
  return (
    <>
      <div className="flex justify-end gap-3">
        <nav className="md:flex hidden w-full max-w-xs gap-1">
          <ModeToggle />
          <Button asChild variant="ghost">
            <Link href="/cart">
              <ShoppingCart />
              Cart
            </Link>
          </Button>
          <Button asChild>
            <Link href="/sign-in">
              <UserIcon />
              Sign In
            </Link>
          </Button>
        </nav>
        <nav className="md:hidden">
          <Sheet>
            <SheetTrigger className="align-middle  cursor-pointer">
              <EllipsisVertical />
            </SheetTrigger>
            <SheetContent className="dropdown-menu flex flex-col items-start pl-[10px]">
              <SheetTitle>Menu</SheetTitle>
              <ModeToggle />
              <Button asChild variant="ghost">
                <Link href="/cart">
                  <ShoppingCart />
                  Cart
                </Link>
              </Button>
              <Button asChild>
                <Link href="/sign-in">
                  <UserIcon />
                  Sign In
                </Link>
              </Button>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </>
  );
};

export default Menu;
