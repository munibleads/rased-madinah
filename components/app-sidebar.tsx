"use client"

import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconLanguage,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

// Helper function to get localized text
const getLocalizedText = (lang: string, enText: string, arText: string) => {
  return lang === "ar" ? arText : enText
}

const getData = (lang: string = "en") => ({
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: getLocalizedText(lang, "Dashboard", "لوحة التحكم"),
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: getLocalizedText(lang, "Intelligence", "الذكاء الاصطناعي"),
      url: "/dashboard/intelligence",
      icon: IconFileAi,
    },
    {
      title: getLocalizedText(lang, "Projects", "المشاريع"),
      url: "/dashboard/projects",
      icon: IconFolder,
    },
    {
      title: getLocalizedText(lang, "Lifecycle", "دورة الحياة"),
      url: "#",
      icon: IconListDetails,
    },
    {
      title: getLocalizedText(lang, "Analytics", "التحليلات"),
      url: "#",
      icon: IconChartBar,
    },    
    {
      title: getLocalizedText(lang, "Team", "الفريق"),
      url: "#",
      icon: IconUsers,
    },
  ],
  navClouds: [
    {
      title: getLocalizedText(lang, "Capture", "التقاط"),
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: getLocalizedText(lang, "Active Proposals", "العروض النشطة"),
          url: "#",
        },
        {
          title: getLocalizedText(lang, "Archived", "المؤرشف"),
          url: "#",
        },
      ],
    },
    {
      title: getLocalizedText(lang, "Proposal", "اقتراح"),
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: getLocalizedText(lang, "Active Proposals", "العروض النشطة"),
          url: "#",
        },
        {
          title: getLocalizedText(lang, "Archived", "المؤرشف"),
          url: "#",
        },
      ],
    },
    {
      title: getLocalizedText(lang, "Prompts", "التوجيهات"),
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: getLocalizedText(lang, "Active Proposals", "العروض النشطة"),
          url: "#",
        },
        {
          title: getLocalizedText(lang, "Archived", "المؤرشف"),
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: getLocalizedText(lang, "Settings", "الإعدادات"),
      url: "#",
      icon: IconSettings,
    },
    {
      title: getLocalizedText(lang, "Language", "اللغة"),
      url: "#",
      icon: IconLanguage,
    },
    {
      title: getLocalizedText(lang, "Get Help", "الحصول على المساعدة"),
      url: "#",
      icon: IconHelp,
    },
    {
      title: getLocalizedText(lang, "Search", "البحث"),
      url: "#",
      icon: IconSearch,
    },
  ],
})

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Get language synchronously during component initialization
  const [currentLang, setCurrentLang] = React.useState(() => {
    // Prefer cookie so SSR and client agree
    if (typeof document !== "undefined") {
      try {
        const match = document.cookie
          .split("; ")
          .find((row) => row.startsWith("app-lang="));
        const cookieLang = match ? decodeURIComponent(match.split("=")[1]) : null;
        if (cookieLang === "ar" || cookieLang === "en") return cookieLang;
      } catch {}
    }

    if (typeof window !== "undefined") {
      try {
        const saved = window.localStorage.getItem("app-lang");
        if (saved === "ar" || saved === "en") return saved;
      } catch {}
    }
    
    if (typeof document !== "undefined") {
      const docLang = document.documentElement.getAttribute("lang");
      if (docLang === "ar" || docLang === "en") return docLang;
    }
    
    return "en";
  })
  
  // Prevent SSR/hydration flash by rendering only after mount
  const [isMounted, setIsMounted] = React.useState(false)
  React.useEffect(() => {
    setIsMounted(true)
  }, [])
  
  React.useEffect(() => {
    // Apply language attributes on mount/update
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", currentLang)
      document.documentElement.setAttribute("dir", currentLang === "ar" ? "rtl" : "ltr")
    }
  }, [currentLang])

  if (!isMounted) {
    return null
  }

  const data = getData(currentLang)
  
  const handleLanguageToggle = () => {
    try {
      const current = typeof document !== "undefined" ? document.documentElement.getAttribute("lang") : "en"
      const next = current === "ar" ? "en" : "ar"
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("lang", next)
        // Basic dir switch for Arabic
        if (next === "ar") {
          document.documentElement.setAttribute("dir", "rtl")
        } else {
          document.documentElement.setAttribute("dir", "ltr")
        }
        if (typeof window !== "undefined") {
          window.localStorage.setItem("app-lang", next)
          // Persist for SSR on next request
          const oneYear = 60 * 60 * 24 * 365
          document.cookie = `app-lang=${encodeURIComponent(next)}; Path=/; Max-Age=${oneYear}; SameSite=Lax`
          // Dispatch custom event for language change
          window.dispatchEvent(new CustomEvent("languageChange", { detail: { language: next } }))
        }
      }
      setCurrentLang(next)
    } catch (e) {
      // no-op
    }
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#" className="group">
                <IconInnerShadowTop className="!size-5 text-indigo-600 group-hover:text-fuchsia-600 transition-colors rtl:order-2" />
                <span className="text-base font-semibold bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent rtl:order-1">
                  Rased
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="[&_[data-slot=sidebar-group]]:mt-2">
        <NavMain items={data.navMain} />

        <NavSecondary items={data.navSecondary} onLanguageToggle={handleLanguageToggle} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
