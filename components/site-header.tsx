"use client"

import { IconBell, IconGitBranch, IconUser } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

// Helper function to get localized text
const getLocalizedText = (lang: string, enText: string, arText: string) => {
  return lang === "ar" ? arText : enText
}

export function SiteHeader() {
  const [currentLang, setCurrentLang] = useState("en")
  
  useEffect(() => {
    const lang = document.documentElement.getAttribute("lang") || "en"
    setCurrentLang(lang)
    
    const observer = new MutationObserver(() => {
      const newLang = document.documentElement.getAttribute("lang") || "en"
      setCurrentLang(newLang)
    })
    
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['lang'] 
    })
    
    return () => observer.disconnect()
  }, [])
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b border-white/20 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) bg-white/70 backdrop-blur-md supports-[backdrop-filter]:bg-white/50 relative">
      {/* Glass effect background */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/60 to-white/80 backdrop-blur-sm" />
      
      <div className="flex w-full items-center gap-2 px-6 lg:gap-3 lg:px-8 relative z-10">
        <SidebarTrigger className="-ml-1 rtl:-mr-1 rtl:ml-0 hover:bg-white/50 transition-colors" />
        <Separator
          orientation="vertical"
          className="mx-3 data-[orientation=vertical]:h-5 border-white/30"
        />
        
        {/* Enhanced branding */}
        <div className="flex items-center gap-3">
          <Image
            src="/rased logo.png"
            alt="Rased Logo"
            width={55}
            height={55}
            className="rounded-full relative"
          />
          <div className="text-lg font-bold text-green-600">
            {getLocalizedText(currentLang, "Rased", "راصد")}
          </div>
          <Badge variant="secondary" className="bg-indigo-100/80 text-indigo-700 text-xs font-medium px-2 py-0.5">
            v2.1
          </Badge>
        </div>
        
        {/* Navigation breadcrumb */}
        <div className="hidden md:flex items-center gap-2 ml-4 rtl:mr-4 rtl:ml-0">
          <span className="text-sm text-muted-foreground">
            {getLocalizedText(currentLang, "Dashboard", "لوحة التحكم")}
          </span>
          <span className="text-muted-foreground">•</span>
          <span className="text-sm font-medium text-foreground">
            {getLocalizedText(currentLang, "Overview", "نظرة عامة")}
          </span>
        </div>
        
        {/* Action buttons */}
        <div className="ml-auto rtl:mr-auto rtl:ml-0 flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden lg:flex hover:bg-white/50 transition-colors">
            <IconGitBranch className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
            <span className="text-sm">
              {getLocalizedText(currentLang, "Updates", "التحديثات")}
            </span>
          </Button>
          
          <Button variant="ghost" size="sm" className="relative hover:bg-white/50 transition-colors">
            <IconBell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 rtl:-left-1 rtl:right-auto w-2 h-2 bg-red-500 rounded-full" />
          </Button>
          
          <Separator orientation="vertical" className="mx-2 h-5 border-white/30" />
          
          <Button variant="ghost" size="sm" className="hover:bg-white/50 transition-colors">
            <IconUser className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
            <span className="text-sm font-medium">
              {getLocalizedText(currentLang, "Admin", "مشرف")}
            </span>
          </Button>
        </div>
      </div>
    </header>
  )
}
