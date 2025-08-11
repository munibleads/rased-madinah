"use client"

import { IconAlertTriangle, IconBuildingSkyscraper, IconTrendingUp } from "@tabler/icons-react"
import { useEffect, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { IconBell, IconHourglassHigh, IconProgressCheck } from "@tabler/icons-react"

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
      <Card className="@container/card group relative overflow-hidden border-0 glass-card hover:scale-[1.02] transition-all duration-300 min-h-[170px]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 pointer-events-none z-0" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full -translate-y-16 translate-x-16 pointer-events-none z-0" />
        <CardHeader className="relative z-10 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <CardDescription className="text-sm font-medium text-muted-foreground truncate">
              {getLocalizedText(currentLang, "Number of Active Projects", "عدد المشاريع النشطة")}
            </CardDescription>
            <div className="p-2 rounded-xl bg-blue-500/10 backdrop-blur-sm">
              <IconBuildingSkyscraper className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-3xl @[350px]/card:text-4xl font-bold tabular-nums leading-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            875
          </CardTitle>
          <div>
            <Badge variant="secondary" className="bg-blue-50/80 text-blue-700 border-blue-200/50 whitespace-nowrap">
              <IconTrendingUp className="w-3 h-3 mr-1" />
              {getLocalizedText(currentLang, "Up by 12% from last month", "ارتفاع بنسبة 12% عن الشهر الماضي")}
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm relative z-10">
          <div className="text-muted-foreground font-medium">              {getLocalizedText(currentLang, "Currently in progress", "قيد التقدم حاليًا")}</div>
        </CardFooter>
      </Card>
      <Card className="@container/card group relative overflow-hidden border-0 glass-card hover:scale-[1.02] transition-all duration-300 min-h-[170px]">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5 pointer-events-none z-0" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full -translate-y-16 translate-x-16 pointer-events-none z-0" />
        <CardHeader className="relative z-10 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <CardDescription className="text-sm font-medium text-muted-foreground truncate">              {getLocalizedText(currentLang, "Number of Delayed Projects", "عدد المشاريع المتأخرة")}</CardDescription>
            <div className="p-2 rounded-xl bg-emerald-500/10 backdrop-blur-sm">
              <IconHourglassHigh className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <CardTitle className="text-3xl @[350px]/card:text-4xl font-bold tabular-nums leading-tight bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
            42
          </CardTitle>
          <div>
            <Badge variant="secondary" className="bg-emerald-50/80 text-emerald-700 border-emerald-200/50 whitespace-nowrap">
              <IconAlertTriangle className="w-3 h-3 mr-1" />
              {getLocalizedText(currentLang, "Requires immediate attention", "يتطلب اهتماما فوريا")}
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm relative z-10">
          <div className="text-muted-foreground font-medium">              {getLocalizedText(currentLang, "Projects past due date", "المشاريع التي تجاوزت تاريخ الاستحقاق")}</div>
        </CardFooter>
      </Card>
      
      <Card className="@container/card group relative overflow-hidden border-0 glass-card hover:scale-[1.02] transition-all duration-300 min-h-[170px]">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 pointer-events-none z-0" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full -translate-y-16 translate-x-16 pointer-events-none z-0" />
        <CardHeader className="relative z-10 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <CardDescription className="text-sm font-medium text-muted-foreground truncate">              {getLocalizedText(currentLang, "Overall Completion Percentage", "النسبة المئوية للإنجاز الكلي")}</CardDescription>
            <div className="p-2 rounded-xl bg-amber-500/10 backdrop-blur-sm">
              <IconProgressCheck className="w-5 h-5 text-amber-600" />
            </div>
          </div>
          <CardTitle className="text-3xl @[350px]/card:text-4xl font-bold tabular-nums leading-tight bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            78%
          </CardTitle>
          <div>
            <Badge variant="secondary" className="bg-amber-50/80 text-amber-700 border-amber-200/50 whitespace-nowrap">
              <IconTrendingUp className="w-3 h-3 mr-1" />
              {getLocalizedText(currentLang, "On track for next quarter", "على المسار الصحيح للربع القادم")}
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm relative z-10">
          <div className="text-muted-foreground font-medium">              {getLocalizedText(currentLang, "Aggregated across all projects", "مجمعة عبر جميع المشاريع")}</div>
        </CardFooter>
      </Card>
      
      <Card className="@container/card group relative overflow-hidden border-0 glass-card hover:scale-[1.02] transition-all duration-300 min-h-[170px]">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-rose-500/5 pointer-events-none z-0" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-transparent rounded-full -translate-y-16 translate-x-16 pointer-events-none z-0" />
        <CardHeader className="relative z-10 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <CardDescription className="text-sm font-medium text-muted-foreground truncate">              {getLocalizedText(currentLang, "Number of Reports Submitted This Month", "عدد التقارير المقدمة هذا الشهر")}</CardDescription>
            <div className="p-2 rounded-xl bg-red-500/10 backdrop-blur-sm">
              <IconBell className="w-5 h-5 text-red-600" />
            </div>
          </div>
          <CardTitle className="text-3xl @[350px]/card:text-4xl font-bold tabular-nums leading-tight bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
            18
          </CardTitle>
          <div>
            <Badge variant="secondary" className="bg-red-50/80 text-red-700 border-red-200/50 whitespace-nowrap">
              <IconTrendingUp className="w-3 h-3 mr-1" />
              {getLocalizedText(currentLang, "+5 from last month", "+5 عن الشهر الماضي")}
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm relative z-10">
          <div className="text-muted-foreground font-medium">              {getLocalizedText(currentLang, "Timely submissions", "التقارير المقدمة في الوقت المحدد")}</div>
        </CardFooter>
      </Card>
    </div>
  )
}


