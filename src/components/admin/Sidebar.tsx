"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar as SidebarRoot,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ADMIN_NAV } from "./nav";

export default function AdminSidebar() {
  const pathname = usePathname();

  const groups = ADMIN_NAV.reduce<Record<string, typeof ADMIN_NAV>>((acc, item) => {
    (acc[item.group] ??= []).push(item);
    return acc;
  }, {});

  return (
    <SidebarRoot collapsible="icon">
      <SidebarHeader>
        <Link href="/admin" className="flex items-center gap-2 px-2 py-1.5">
          <span className="text-sm font-semibold text-foreground">Gora Belu</span>
          <span className="rounded-full border border-border px-2 py-0.5 text-[0.6rem] uppercase tracking-wide text-muted-foreground">
            Admin
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {Object.entries(groups).map(([group, items]) => (
          <SidebarGroup key={group || "root"}>
            {group && <SidebarGroupLabel>{group}</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={pathname === item.href}
                      render={<Link href={item.href}>{item.label}</Link>}
                    />
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </SidebarRoot>
  );
}
