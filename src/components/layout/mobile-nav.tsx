"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";


import {
  mainNavItems,
  secondaryNavItems,
} from "./nav-items";

export function MobileNav() {
  return (
    <Sheet>
<SheetTrigger
  className="inline-flex size-9 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground md:hidden"
  aria-label="Open navigation menu"
>
  <Menu className="size-5" aria-hidden="true" />
</SheetTrigger>

      <SheetContent
        side="left"
        className="w-72 p-0"
      >
        <SheetHeader className="border-b px-6 py-4">
          <SheetTitle>FinanceOS</SheetTitle>
        </SheetHeader>

        <nav
          aria-label="Mobile navigation"
          className="space-y-6 p-4"
        >
          <div className="space-y-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
                >
                  <Icon
                    className="size-4"
                    aria-hidden="true"
                  />

                  <span>{item.title}</span>
                </Link>
              );
            })}
          </div>

          <div className="space-y-1">
            {secondaryNavItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
                >
                  <Icon
                    className="size-4"
                    aria-hidden="true"
                  />

                  <span>{item.title}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}