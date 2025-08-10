"use client"

import { IconAlertTriangle, IconBuildingSkyscraper, IconChartBar, IconClock, IconTrendingUp } from "@tabler/icons-react"
import { useEffect, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Helper function to get localized text
const getLocalizedText = (lang: string, enText: string, arText: string) => {
  return lang === "ar" ? arText : enText
}

export function KpiCards() {
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
    <div className="grid grid-cols-1 gap-6 px-6 lg:px-8 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card group relative overflow-hidden border-0 glass-card hover:scale-[1.02] transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <CardDescription className="text-sm font-medium text-muted-foreground">
              {getLocalizedText(currentLang, "Total Projects", "إجمالي المشاريع")}
            </CardDescription>
            <div className="p-2 rounded-xl bg-blue-500/10 backdrop-blur-sm">
              <IconBuildingSkyscraper className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold tabular-nums @[250px]/card:text-4xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            1,248
          </CardTitle>
          <CardAction>
            <Badge variant="secondary" className="bg-blue-50/80 text-blue-700 border-blue-200/50">
              <IconTrendingUp className="w-3 h-3 mr-1" />
              {getLocalizedText(currentLang, "City-wide", "على مستوى المدينة")}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm relative">
          <div className="text-muted-foreground font-medium">              {getLocalizedText(currentLang, "Across all agencies", "عبر جميع الوكالات")}</div>
        </CardFooter>
      </Card>
      <Card className="@container/card group relative overflow-hidden border-0 glass-card hover:scale-[1.02] transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <CardDescription className="text-sm font-medium text-muted-foreground">              {getLocalizedText(currentLang, "On-Time Rate", "معدل التسليم في الوقت المحدد")}</CardDescription>
            <div className="p-2 rounded-xl bg-emerald-500/10 backdrop-blur-sm">
              <IconClock className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold tabular-nums @[250px]/card:text-4xl bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
            86%
          </CardTitle>
          <CardAction>
            <Badge variant="secondary" className="bg-emerald-50/80 text-emerald-700 border-emerald-200/50">
              <IconTrendingUp className="w-3 h-3 mr-1" />
              {getLocalizedText(currentLang, "+3% this month", "+3% هذا الشهر")}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm relative">
          <div className="text-muted-foreground font-medium">              {getLocalizedText(currentLang, "Schedule performance", "أداء الجدولة")}</div>
        </CardFooter>
      </Card>
      
      <Card className="@container/card group relative overflow-hidden border-0 glass-card hover:scale-[1.02] transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <CardDescription className="text-sm font-medium text-muted-foreground">              {getLocalizedText(currentLang, "Budget Variance", "انحراف الميزانية")}</CardDescription>
            <div className="p-2 rounded-xl bg-amber-500/10 backdrop-blur-sm">
              <IconChartBar className="w-5 h-5 text-amber-600" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold tabular-nums @[250px]/card:text-4xl bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            -4.2%
          </CardTitle>
          <CardAction>
            <Badge variant="secondary" className="bg-amber-50/80 text-amber-700 border-amber-200/50">
              <IconTrendingUp className="w-3 h-3 mr-1" />
              {getLocalizedText(currentLang, "Within target", "ضمن الهدف")}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm relative">
          <div className="text-muted-foreground font-medium">              {getLocalizedText(currentLang, "Vs. approved budgets", "مقابل الميزانيات المعتمدة")}</div>
        </CardFooter>
      </Card>
      
      <Card className="@container/card group relative overflow-hidden border-0 glass-card hover:scale-[1.02] transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-rose-500/5" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <CardDescription className="text-sm font-medium text-muted-foreground">              {getLocalizedText(currentLang, "High-Risk Projects", "المشاريع عالية المخاطر")}</CardDescription>
            <div className="p-2 rounded-xl bg-red-500/10 backdrop-blur-sm">
              <IconAlertTriangle className="w-5 h-5 text-red-600" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold tabular-nums @[250px]/card:text-4xl bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
            37
          </CardTitle>
          <CardAction>
            <Badge variant="secondary" className="bg-red-50/80 text-red-700 border-red-200/50">
              <IconAlertTriangle className="w-3 h-3 mr-1" />
              {getLocalizedText(currentLang, "Watchlist", "قائمة المراقبة")}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm relative">
          <div className="text-muted-foreground font-medium">              {getLocalizedText(currentLang, "AI early warnings active", "تحذيرات الذكاء الاصطناعي المبكرة نشطة")}</div>
        </CardFooter>
      </Card>
    </div>
  )
}


