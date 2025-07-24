"use client";

import type React from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/features/AppSidebar/AppSidebar";
import { AuthGuard } from "@/components/common/atoms/AuthGuard/AuthGuard";

const breadcrumbMap: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/products": "Produtos"
};

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const getBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbs = [];

    for (let i = 0; i < segments.length; i++) {
      const path = "/" + segments.slice(0, i + 1).join("/");
      const title = breadcrumbMap[path] || segments[i];
      breadcrumbs.push({ path, title });
    }

    return breadcrumbs;
  };

  return (
    <AuthGuard>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  {getBreadcrumbs().map((breadcrumb, index) => (
                    <div key={breadcrumb.path} className="flex items-center">
                      {index > 0 && (
                        <BreadcrumbSeparator className="hidden md:block" />
                      )}
                      <BreadcrumbItem className="hidden md:block">
                        {index === getBreadcrumbs().length - 1 ? (
                          <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={breadcrumb.path}>
                            {breadcrumb.title}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </div>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  );
}
