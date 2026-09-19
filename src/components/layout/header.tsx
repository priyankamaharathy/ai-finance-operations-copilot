"use client";

import { Bell } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import { MobileNav } from "./mobile-nav";

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <MobileNav />

        <div className="min-w-0">
          <p className="truncate text-sm font-medium">
            Finance Operations
          </p>

          <p className="hidden truncate text-xs text-muted-foreground sm:block">
            Monitor and understand your financial activity
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          aria-label="View notifications"
        >
          <Bell
            className="size-5"
            aria-hidden="true"
          />
        </Button>

        <Avatar>
          <AvatarFallback>
            PR
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}