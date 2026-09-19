"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import {
  mainNavItems,
  secondaryNavItems,
} from "./nav-items";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r bg-background md:flex md:flex-col">
      {/* Brand */}
      <div className="flex h-16 items-center border-b px-6">
        <Link
          href="/dashboard"
          className="flex items-center gap-2"
          aria-label="FinanceOS home"
        >
          <div
            className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground"
            aria-hidden="true"
          >
            F
          </div>

          <span className="font-semibold tracking-tight">
            FinanceOS
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav
        aria-label="Primary navigation"
        className="flex-1 space-y-6 p-4"
      >
        <div className="space-y-1">
          <p className="px-3 pb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Workspace
          </p>

          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  isActive &&
                    "bg-accent text-accent-foreground",
                )}
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

        <Separator />

        <div className="space-y-1">
          {secondaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  isActive &&
                    "bg-accent text-accent-foreground",
                )}
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

      {/* Footer */}
      <div className="border-t p-4">
        <p className="px-3 text-xs text-muted-foreground">
          FinanceOS v0.1
        </p>
      </div>
    </aside>
  );
}