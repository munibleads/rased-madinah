"use client"

import { type Icon } from "@tabler/icons-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className="group data-[slot=sidebar-menu-button]:h-10 data-[slot=sidebar-menu-button]:rounded-xl data-[slot=sidebar-menu-button]:px-3 data-[slot=sidebar-menu-button]:text-sm hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50 dark:hover:from-emerald-900/20 dark:hover:to-green-900/20 transition-colors"
              >
                <a href={item.url} className="flex items-center gap-2 rtl:flex-row-reverse">
                  {item.icon && <item.icon className="text-green-600 group-hover:text-emerald-600 dark:text-green-400 dark:group-hover:text-emerald-400" />}
                  <span className="font-medium">{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
