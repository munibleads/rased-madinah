"use client"

import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ProjectsTable } from "@/components/rased/projects-table"
import { ProjectStats } from "@/components/rased/project-stats"

type ProjectsPageClientProps = {
  initialLang: "en" | "ar"
}

export default function ProjectsPageClient({ initialLang }: ProjectsPageClientProps) {
  const [, setCurrentLang] = React.useState<"en" | "ar">(initialLang)

  React.useEffect(() => {
    const onLangChange = () => {
      const attr = typeof document !== "undefined" ? document.documentElement.getAttribute("lang") : null
      if (attr === "ar" || attr === "en") setCurrentLang(attr)
    }
    if (typeof window !== "undefined") {
      window.addEventListener("languageChange", onLangChange)
      return () => window.removeEventListener("languageChange", onLangChange)
    }
  }, [])

  return (
    <SidebarProvider
      style={{
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col min-h-screen">
          <div className="@container/main flex flex-1 flex-col relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-white/10 to-purple-50/30 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.03),transparent_50%)] pointer-events-none" />

            <div className="relative flex flex-col gap-8 py-8">

              <div className="px-6 lg:px-8">
                <ProjectStats />
              </div>


              <div className="px-6 lg:px-8">
                <ProjectsTable />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}


