import {
  Activity,
  FolderKanban,
  History,
  LogOut,
  UserRound,
  type LucideIcon,
} from "lucide-react";

export type AppNavigationItem = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export const appNavigationItems: AppNavigationItem[] = [
  {
    title: "Dashboard",
    description: "Manage files, uploads, and storage actions.",
    href: "/dashboard",
    icon: FolderKanban,
  },
  {
    title: "Activity",
    description: "Review recent login activity and access metadata.",
    href: "/activity",
    icon: Activity,
  },
  {
    title: "History",
    description: "Track file events and download history.",
    href: "/history",
    icon: History,
  },
  {
    title: "Profile",
    description: "Inspect account usage and storage statistics.",
    href: "/profile",
    icon: UserRound,
  },
  {
    title: "Logout",
    description: "End the current session safely.",
    href: "/logout",
    icon: LogOut,
  },
];

export function getNavigationItem(pathname: string): AppNavigationItem | null {
  return (
    appNavigationItems.find((item) => pathname === item.href) ??
    appNavigationItems.find(
      (item) => item.href !== "/dashboard" && pathname.startsWith(item.href),
    ) ??
    null
  );
}
