"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
  ArrowLeftRight,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  Wallet,
  ChevronRight
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"
import { useCreateAccount } from "@/apis/accounts"
import { useUser } from "@/apis/auth"
import { LogoutDialog } from "./logoutDialog"

// Main navigation items
const mainNavItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    description: "Overview",
  },
  {
    title: "Accounts",
    url: "/dashboard/accounts",
    icon: Wallet,
    description: "Manage accounts",
  },
  {
    title: "Income",
    url: "/dashboard/income",
    icon: TrendingUp,
    description: "Track earnings",
  },
  {
    title: "Expenses",
    url: "/dashboard/expense",
    icon: TrendingDown,
    description: "Track spending",
  },
  {
    title: "Transactions",
    url: "/dashboard/transactions",
    icon: ArrowLeftRight,
    description: "All activity",
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: BarChart3,
    description: "Insights",
  },
]

// Secondary navigation items
const secondaryNavItems = [
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Help & Support",
    url: "/dashboard/support",
    icon: HelpCircle,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  const isActive = (url: string) => {
    if (url === "/dashboard") {
      return pathname === "/dashboard"
    }
    return pathname.startsWith(url)
  }
  const {user} = useUser();

  return (
    <Sidebar className="border-r border-blue-100">
      {/* Header / Logo */}
      <SidebarHeader className="p-4 border-b border-blue-100">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="">
           <img className="w-36" src="/faving logo-1-new.png" alt="logo" />
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {/* Main Navigation */}
        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => {
                const active = isActive(item.url)
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${active
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                          : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
                          }`}
                      >
                        <item.icon className={`h-5 w-5 ${active ? "text-white" : "text-gray-400 group-hover:text-blue-600"}`} />
                        <div className="flex-1">
                          <span className="font-medium">{item.title}</span>
                        </div>
                        {active && <ChevronRight className="h-4 w-4 text-white/70" />}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-4 bg-blue-100" />

        {/* Secondary Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
            Preferences
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryNavItems.map((item) => {
                const active = isActive(item.url)
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${active
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                          : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
                          }`}
                      >
                        <item.icon className={`h-5 w-5 ${active ? "text-white" : "text-gray-400 group-hover:text-blue-600"}`} />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-4 border-t border-blue-100">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 mb-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
            {user?.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
        <LogoutDialog />
      </SidebarFooter>
    </Sidebar>
  )
}