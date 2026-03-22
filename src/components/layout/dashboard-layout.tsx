import { Link, Outlet, useLocation } from "react-router-dom";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getNavigationItem } from "@/lib/navigation";

export function DashboardLayout() {
  const location = useLocation();
  const currentPage = getNavigationItem(location.pathname);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink asChild>
                    <Link to="/dashboard">SkyKeep</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {currentPage ? (
                  <>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{currentPage.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                ) : null}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-4 pt-4 md:p-6">
          <section className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-tight">
              {currentPage?.title ?? "SkyKeep"}
            </h1>
            <p className="text-muted-foreground text-sm">
              {currentPage?.description ??
                "Secure file storage and account management."}
            </p>
          </section>
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
