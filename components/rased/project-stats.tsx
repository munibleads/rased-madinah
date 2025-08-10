"use client"

import { IconAlertTriangle, IconBuildingSkyscraper, IconTrendingUp, IconUsers, IconTarget } from "@tabler/icons-react"
import { useEffect, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Helper function to get localized text
const getLocalizedText = (lang: string, enText: string, arText: string) => {
  return lang === "ar" ? arText : enText
}

export function ProjectStats() {
  const [currentLang, setCurrentLang] = useState("en")
  
  useEffect(() => {
    const lang = document.documentElement.getAttribute("lang") || "en"
    setCurrentLang(lang)
    
    // Listen for language changes
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
    <div className="grid grid-cols-1 gap-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card group relative overflow-hidden border-0 glass-card hover:scale-[1.02] transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <CardDescription className="text-sm font-medium text-muted-foreground">
              {getLocalizedText(currentLang, "Active Projects", "المشاريع النشطة")}
            </CardDescription>
            <div className="p-2 rounded-xl bg-blue-500/10 backdrop-blur-sm">
              <IconBuildingSkyscraper className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold tabular-nums @[250px]/card:text-4xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            47
          </CardTitle>
          <CardAction>
            <Badge variant="secondary" className="bg-blue-50/80 text-blue-700 border-blue-200/50">
              <IconTrendingUp className="w-3 h-3 mr-1" />
              {getLocalizedText(currentLang, "+12% this month", "+12% هذا الشهر")}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm relative">
          <div className="text-muted-foreground font-medium">
            {getLocalizedText(currentLang, "Currently in development", "قيد التطوير حالياً")}
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card group relative overflow-hidden border-0 glass-card hover:scale-[1.02] transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <CardDescription className="text-sm font-medium text-muted-foreground">
              {getLocalizedText(currentLang, "Completion Rate", "معدل الإنجاز")}
            </CardDescription>
            <div className="p-2 rounded-xl bg-emerald-500/10 backdrop-blur-sm">
              <IconTarget className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold tabular-nums @[250px]/card:text-4xl bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
            78%
          </CardTitle>
          <CardAction>
            <Badge variant="secondary" className="bg-emerald-50/80 text-emerald-700 border-emerald-200/50">
              <IconTrendingUp className="w-3 h-3 mr-1" />
              {getLocalizedText(currentLang, "+5% this quarter", "+5% هذا الربع")}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm relative">
          <div className="text-muted-foreground font-medium">
            {getLocalizedText(currentLang, "Average across all projects", "المتوسط عبر جميع المشاريع")}
          </div>
        </CardFooter>
      </Card>
      
      <Card className="@container/card group relative overflow-hidden border-0 glass-card hover:scale-[1.02] transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <CardDescription className="text-sm font-medium text-muted-foreground">
              {getLocalizedText(currentLang, "Team Members", "أعضاء الفريق")}
            </CardDescription>
            <div className="p-2 rounded-xl bg-amber-500/10 backdrop-blur-sm">
              <IconUsers className="w-5 h-5 text-amber-600" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold tabular-nums @[250px]/card:text-4xl bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            156
          </CardTitle>
          <CardAction>
            <Badge variant="secondary" className="bg-amber-50/80 text-amber-700 border-amber-200/50">
              <IconTrendingUp className="w-3 h-3 mr-1" />
              {getLocalizedText(currentLang, "+8 this month", "+8 هذا الشهر")}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm relative">
          <div className="text-muted-foreground font-medium">
            {getLocalizedText(currentLang, "Active contributors", "المساهمون النشطون")}
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card group relative overflow-hidden border-0 glass-card hover:scale-[1.02] transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <CardDescription className="text-sm font-medium text-muted-foreground">
              {getLocalizedText(currentLang, "Deadline Risk", "مخاطر المواعيد النهائية")}
            </CardDescription>
            <div className="p-2 rounded-xl bg-purple-500/10 backdrop-blur-sm">
              <IconAlertTriangle className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold tabular-nums @[250px]/card:text-4xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            12
          </CardTitle>
          <CardAction>
            <Badge variant="secondary" className="bg-purple-50/80 text-purple-700 border-purple-200/50">
              <IconTrendingUp className="w-3 h-3 mr-1" />
              {getLocalizedText(currentLang, "High priority", "أولوية عالية")}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm relative">
          <div className="text-muted-foreground font-medium">
            {getLocalizedText(currentLang, "Projects at risk", "المشاريع المعرضة للخطر")}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
