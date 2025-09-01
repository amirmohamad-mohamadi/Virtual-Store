import { ShoppingCart, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";

const Header = () => {
  return (
    <header className="w-full border-b animate-in fade-in duration-300">
      <div className="wrapper flex items-center justify-between py-4">
        {/* Logo + Brand Name */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            priority
            src="/images/logo.svg"
            width={48}
            height={48}
            alt={`${APP_NAME} logo`}
            className="animate-in zoom-in"
          />
          <span className="hidden lg:block font-bold text-2xl text-brand">
            {APP_NAME}
          </span>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="flex items-center gap-2">
            <Link href="/cart">
              <ShoppingCart className="size-5" />
              <span className="hidden sm:inline">Cart</span>
            </Link>
          </Button>
          <Button asChild variant="ghost" className="flex items-center gap-2">
            <Link href="/sign-in">
              <UserIcon className="size-5" />
              <span className="hidden sm:inline">Sign In</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
