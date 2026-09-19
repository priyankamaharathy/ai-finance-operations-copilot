import {
  BarChart3,
  LayoutDashboard,
  Settings,
  Sparkles,
  Users,
  WalletCards,
} from "lucide-react";

export const mainNavItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Transactions",
    href: "/transactions",
    icon: WalletCards,
  },
  {
    title: "Vendors",
    href: "/vendors",
    icon: Users,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
];

export const secondaryNavItems = [
  {
    title: "AI Copilot",
    href: "/ai-copilot",
    icon: Sparkles,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];