"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Helper function to get localized text
const getLocalizedText = (lang: string, enText: string, arText: string) => {
  return lang === "ar" ? arText : enText
}

type Task = {
  id: string
  name: string
  start: string // ISO date
  end: string // ISO date
  status: "on-track" | "delayed" | "critical"
  progress?: number // 0-100
  department?: string
}

const getTasks = (lang: string): Task[] => [
  { id: "1", name: getLocalizedText(lang, "Stormwater Phase 2", "مياه الأمطار - المرحلة 2"), start: "2024-07-01", end: "2024-09-15", status: "on-track", progress: 75, department: getLocalizedText(lang, "Infrastructure", "البنية التحتية") },
  { id: "2", name: getLocalizedText(lang, "Road Resurfacing Quba", "إعادة تبليط طرق قباء"), start: "2024-07-10", end: "2024-08-20", status: "delayed", progress: 45, department: getLocalizedText(lang, "Transportation", "النقل") },
  { id: "3", name: getLocalizedText(lang, "Street Lighting Upgrade", "ترقية إنارة الشوارع"), start: "2024-08-01", end: "2024-10-05", status: "on-track", progress: 60, department: getLocalizedText(lang, "Utilities", "المرافق") },
  { id: "4", name: getLocalizedText(lang, "Waste Transfer Station", "محطة نقل النفايات"), start: "2024-07-20", end: "2024-11-12", status: "critical", progress: 25, department: getLocalizedText(lang, "Environment", "البيئة") },
]

const day = 1000 * 60 * 60 * 24

function daysBetween(a: string, b: string) {
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / day)
}

const windowStart = new Date("2024-07-01").toISOString()
const windowEnd = new Date("2024-11-30").toISOString()
const windowDays = daysBetween(windowStart, windowEnd)

const getStatusColor = (status: Task["status"]) => {
  switch (status) {
    case "critical":
      return "bg-red-500/80 hover:bg-red-500/90"
    case "delayed":
      return "bg-amber-500/80 hover:bg-amber-500/90"
    case "on-track":
      return "bg-emerald-500/80 hover:bg-emerald-500/90"
    default:
      return "bg-primary/80 hover:bg-primary/90"
  }
}

const getStatusBadgeVariant = (status: Task["status"]) => {
  switch (status) {
    case "critical":
      return "destructive"
    case "delayed":
      return "secondary"
    case "on-track":
      return "default"
    default:
      return "outline"
  }
}

const getStatusText = (status: Task["status"], lang: string) => {
  switch (status) {
    case "on-track":
      return getLocalizedText(lang, "On Track", "على المسار الصحيح")
    case "delayed":
      return getLocalizedText(lang, "Delayed", "متأخر")
    case "critical":
      return getLocalizedText(lang, "Critical", "حرج")
    default:
      return status
  }
}

const formatDateRange = (start: string, end: string) => {
  const startDate = new Date(start)
  const endDate = new Date(end)
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }
  
  return `${startDate.toLocaleDateString('en-US', options)} – ${endDate.toLocaleDateString('en-US', options)}`
}

export function GanttTimeline() {
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
  
  const tasks = getTasks(currentLang)
  
  return (
    <TooltipProvider>
      <Card className="border bg-card shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            {getLocalizedText(currentLang, "Project Timeline", "جدول المشاريع الزمني")}
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-hidden">
          <div className="relative grid gap-4">
            {tasks.map((t) => {
              const offset = (daysBetween(windowStart, t.start) / windowDays) * 100
              const width = (daysBetween(t.start, t.end) / windowDays) * 100
              const progressWidth = t.progress ? (width * t.progress) / 100 : 0
              
              return (
                <div key={t.id} className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium leading-none">{t.name}</span>
                      <Badge variant={getStatusBadgeVariant(t.status)} className="text-xs px-2 py-0.5">
                        {getStatusText(t.status, currentLang)}
                      </Badge>
                    </div>
                    {t.progress && (
                      <span className="text-xs text-muted-foreground font-medium">
                        {t.progress}%
                      </span>
                    )}
                  </div>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="relative h-4 w-full rounded-full bg-muted/50 cursor-pointer transition-all hover:bg-muted/70">
                        {/* Background bar */}
                        <div
                          className={`absolute h-4 rounded-full transition-all duration-200 ${getStatusColor(t.status)}`}
                          style={{ left: `${offset}%`, width: `${width}%` }}
                        />
                        {/* Progress overlay */}
                        {t.progress && (
                          <div
                            className="absolute h-4 rounded-full bg-white/30 backdrop-blur-sm"
                            style={{ left: `${offset}%`, width: `${progressWidth}%` }}
                          />
                        )}
                        {/* Progress indicator */}
                        {t.progress && (
                          <div
                            className="absolute top-0 h-4 w-0.5 bg-white/60"
                            style={{ left: `${offset + progressWidth}%` }}
                          />
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-center">
                      <div className="space-y-1">
                        <p className="font-medium">{t.name}</p>
                        {t.department && <p className="text-xs text-muted-foreground">{t.department}</p>}
                        <p className="text-xs">{formatDateRange(t.start, t.end)}</p>
                        {t.progress && <p className="text-xs">{getLocalizedText(currentLang, "Progress", "التقدم")}: {t.progress}%</p>}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{formatDateRange(t.start, t.end)}</span>
                    {t.department && (
                      <span className="text-xs bg-muted/50 px-2 py-0.5 rounded">
                        {t.department}
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}


