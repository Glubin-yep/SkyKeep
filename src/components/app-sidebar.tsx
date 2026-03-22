import * as React from "react";
import { Link } from "react-router-dom";

import logo from "@/assets/logo.svg";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getInitials } from "@/lib/app-utils";
import { appNavigationItems } from "@/lib/navigation";
import AuthService from "@/service/AuthService";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const currentUser = AuthService.getCurrentUser();
  const userEmail = currentUser?.email || "signed-in-user";

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/dashboard">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <img src={logo} alt="SkyKeep" className="size-5" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">SkyKeep</span>
                  <span className="text-muted-foreground truncate text-xs">
                    Secure cloud storage
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={appNavigationItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: userEmail,
            email: userEmail,
            initials: getInitials(userEmail),
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
