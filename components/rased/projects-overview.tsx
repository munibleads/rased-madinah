"use client"

import { IconBuildingSkyscraper, IconHome, IconRoad, IconBuilding, IconTree } from "@tabler/icons-react"
import { useEffect, useState } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Helper function to get localized text
const getLocalizedText = (lang: string, enText: string, arText: string) => {
  return lang === "ar" ? arText : enText
}

const projectCategories = [
  {
    title: "Residential",
    titleAr: "سكني",
    icon: IconHome,
    count: 18,
    color: "from-blue-500 to-indigo-600",
    bgColor: "from-blue-500/10 to-indigo-500/5",
    borderColor: "border-blue-200/50",
    textColor: "text-blue-700"
  },
  {
    title: "Commercial",
    titleAr: "تجاري",
    icon: IconBuildingSkyscraper,
    count: 12,
    color: "from-emerald-500 to-green-600",
    bgColor: "from-emerald-500/10 to-green-500/5",
    borderColor: "border-emerald-200/50",
    textColor: "text-emerald-700"
  },
  {
    title: "Infrastructure",
    titleAr: "بنية تحتية",
    icon: IconRoad,
    count: 8,
    color: "from-amber-500 to-orange-600",
    bgColor: "from-amber-500/10 to-orange-500/5",
    borderColor: "border-amber-200/50",
    textColor: "text-amber-700"
  },
  {
    title: "Industrial",
    titleAr: "صناعي",
    icon: IconBuilding,
    count: 6,
    color: "from-purple-500 to-pink-600",
    bgColor: "from-purple-500/10 to-pink-500/5",
    borderColor: "border-purple-200/50",
    textColor: "text-purple-700"
  },
  {
    title: "Environmental",
    titleAr: "بيئي",
    icon: IconTree,
    count: 3,
    color: "from-teal-500 to-cyan-600",
    bgColor: "from-teal-500/10 to-cyan-500/5",
    borderColor: "border-teal-200/50",
    textColor: "text-teal-700"
  }
]

export function ProjectsOverview() {
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {getLocalizedText(currentLang, "Project Categories", "فئات المشاريع")}
          </h2>
          <p className="text-muted-foreground">
            {getLocalizedText(currentLang, "Overview of projects by type and sector", "نظرة عامة على المشاريع حسب النوع والقطاع")}
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          {getLocalizedText(currentLang, "47 Total Projects", "47 مشروع إجمالي")}
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {projectCategories.map((category, index) => (
          <Card key={index} className="group relative overflow-hidden border-0 glass-card hover:scale-[1.02] transition-all duration-300">
            <div className={`absolute inset-0 bg-gradient-to-br ${category.bgColor}`} />
            <div className={`absolute top-0 right-0 w-12 h-12 bg-gradient-to-br ${category.bgColor} rounded-full -translate-y-6 translate-x-6`} />
            
            <CardHeader className="relative pb-0.5 px-3 pt-2">
              <div className="flex items-center justify-between">
                <div className={`p-1 rounded-lg bg-gradient-to-br ${category.bgColor} backdrop-blur-sm`}>
                  <category.icon className={`w-3 h-3 ${category.textColor}`} />
                </div>
                <Badge variant="secondary" className={`bg-gradient-to-r ${category.bgColor} ${category.borderColor} ${category.textColor} text-xs px-1 py-0`}>
                  {category.count}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="relative pt-0 px-3 pb-2">
              <CardTitle className={`text-sm font-semibold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                {getLocalizedText(currentLang, category.title, category.titleAr)}
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground mt-0">
                {getLocalizedText(currentLang, `${category.count} active projects`, `${category.count} مشروع نشط`)}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="relative overflow-hidden border-0 glass-card">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5" />
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              {getLocalizedText(currentLang, "Project Status Distribution", "توزيع حالة المشاريع")}
            </CardTitle>
            <CardDescription>
              {getLocalizedText(currentLang, "Current status of all active projects", "الحالة الحالية لجميع المشاريع النشطة")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{getLocalizedText(currentLang, "Planning", "التخطيط")}</span>
                <span className="text-sm text-muted-foreground">18 projects</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{getLocalizedText(currentLang, "In Progress", "قيد التنفيذ")}</span>
                <span className="text-sm text-muted-foreground">32 projects</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '53%' }}></div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{getLocalizedText(currentLang, "Review", "مراجعة")}</span>
                <span className="text-sm text-muted-foreground">15 projects</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-amber-600 h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{getLocalizedText(currentLang, "Completed", "مكتمل")}</span>
                <span className="text-sm text-muted-foreground">8 projects</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '13%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 glass-card">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5" />
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              {getLocalizedText(currentLang, "Timeline Overview", "نظرة عامة على الجدول الزمني")}
            </CardTitle>
            <CardDescription>
              {getLocalizedText(currentLang, "Projects by completion timeline", "المشاريع حسب الجدول الزمني للإنجاز")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{getLocalizedText(currentLang, "Q1 2025", "الربع الأول 2025")}</span>
                <span className="text-sm text-muted-foreground">12 projects</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{getLocalizedText(currentLang, "Q2 2025", "الربع الثاني 2025")}</span>
                <span className="text-sm text-muted-foreground">18 projects</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{getLocalizedText(currentLang, "Q3 2025", "الربع الثالث 2025")}</span>
                <span className="text-sm text-muted-foreground">22 projects</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-amber-600 h-2 rounded-full" style={{ width: '37%' }}></div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{getLocalizedText(currentLang, "Q4 2025", "الربع الرابع 2025")}</span>
                <span className="text-sm text-muted-foreground">8 projects</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '13%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
