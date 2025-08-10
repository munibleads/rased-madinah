"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Area, AreaChart, PieChart, Pie, Cell } from "recharts"
import { TrendingDown, TrendingUp, AlertTriangle, Shield, Activity, Target } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"

// Helper function to get localized text
const getLocalizedText = (lang: string, enText: string, arText: string) => {
  return lang === "ar" ? arText : enText
}

const riskData = [
  { week: "W1", riskScore: 62, highRisk: 3, mediumRisk: 8, lowRisk: 12, total: 23, incidents: 5 },
  { week: "W2", riskScore: 68, highRisk: 4, mediumRisk: 9, lowRisk: 11, total: 24, incidents: 7 },
  { week: "W3", riskScore: 75, highRisk: 5, mediumRisk: 10, lowRisk: 9, total: 24, incidents: 9 },
  { week: "W4", riskScore: 71, highRisk: 4, mediumRisk: 11, lowRisk: 10, total: 25, incidents: 6 },
  { week: "W5", riskScore: 58, highRisk: 2, mediumRisk: 7, lowRisk: 14, total: 23, incidents: 3 },
  { week: "W6", riskScore: 65, highRisk: 3, mediumRisk: 9, lowRisk: 12, total: 24, incidents: 4 },
]

// Current period risk breakdown for pie chart
const currentRiskBreakdown = [
  { name: "High Risk", value: 3, color: "#dc2626" },
  { name: "Medium Risk", value: 9, color: "#f59e0b" },
  { name: "Low Risk", value: 12, color: "#10b981" },
]

const getConfig = (lang: string) => ({
  riskScore: { label: getLocalizedText(lang, "Risk Score", "درجة المخاطر"), color: "hsl(var(--chart-1))" },
  highRisk: { label: getLocalizedText(lang, "High Risk", "مخاطر عالية"), color: "hsl(var(--destructive))" },
  mediumRisk: { label: getLocalizedText(lang, "Medium Risk", "مخاطر متوسطة"), color: "hsl(var(--warning))" },
  lowRisk: { label: getLocalizedText(lang, "Low Risk", "مخاطر منخفضة"), color: "hsl(var(--chart-3))" },
}) satisfies ChartConfig

export function RiskTrend() {
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
  
  const config = getConfig(currentLang)
  const currentScore = riskData[riskData.length - 1].riskScore
  const previousScore = riskData[riskData.length - 2].riskScore
  const trend = currentScore > previousScore ? "up" : "down"
  const trendValue = Math.abs(currentScore - previousScore)
  const currentData = riskData[riskData.length - 1]
  
  // Calculate risk level based on score
  const getRiskLevel = (score: number) => {
    if (score >= 80) return { level: "Critical", color: "text-red-600", bgColor: "bg-red-50", borderColor: "border-red-200" }
    if (score >= 65) return { level: "High", color: "text-orange-600", bgColor: "bg-orange-50", borderColor: "border-orange-200" }
    if (score >= 45) return { level: "Medium", color: "text-yellow-600", bgColor: "bg-yellow-50", borderColor: "border-yellow-200" }
    return { level: "Low", color: "text-green-600", bgColor: "bg-green-50", borderColor: "border-green-200" }
  }

  const riskLevel = getRiskLevel(currentScore)

  return (
    <Card className="border bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 shadow-lg hover:shadow-xl transition-all duration-300 group">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
      
      <CardHeader className="pb-4 relative">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${riskLevel.bgColor} ${riskLevel.borderColor} border`}>
                <Shield className={`h-5 w-5 ${riskLevel.color}`} />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">
                  {getLocalizedText(currentLang, "Risk Assessment", "تقييم المخاطر")}
                </CardTitle>
                <CardDescription className="text-sm">
                  {getLocalizedText(currentLang, "Comprehensive risk analysis & trends", "تحليل شامل للمخاطر والاتجاهات")}
                </CardDescription>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className={`px-3 py-1.5 rounded-full ${riskLevel.bgColor} ${riskLevel.borderColor} border`}>
              <span className={`text-sm font-semibold ${riskLevel.color}`}>
                {getLocalizedText(currentLang, riskLevel.level, riskLevel.level)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {trend === "up" ? (
                <TrendingUp className="h-5 w-5 text-red-500" />
              ) : (
                <TrendingDown className="h-5 w-5 text-green-500" />
              )}
              <Badge variant={trend === "up" ? "destructive" : "secondary"} className="text-sm">
                {trend === "up" ? "+" : "-"}{trendValue}
              </Badge>
            </div>
          </div>
        </div>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-4 gap-4 pt-4">
          <div className="text-center p-3 rounded-lg bg-white/60 border border-white/80 backdrop-blur-sm">
            <div className="text-2xl font-bold text-blue-600">{currentScore}</div>
            <div className="text-xs text-muted-foreground">
              {getLocalizedText(currentLang, "Risk Score", "درجة المخاطر")}
            </div>
          </div>
          <div className="text-center p-3 rounded-lg bg-white/60 border border-white/80 backdrop-blur-sm">
            <div className="text-2xl font-bold text-red-600">{currentData.highRisk}</div>
            <div className="text-xs text-muted-foreground">
              {getLocalizedText(currentLang, "High Risk", "مخاطر عالية")}
            </div>
          </div>
          <div className="text-center p-3 rounded-lg bg-white/60 border border-white/80 backdrop-blur-sm">
            <div className="text-2xl font-bold text-orange-600">{currentData.incidents}</div>
            <div className="text-xs text-muted-foreground">
              {getLocalizedText(currentLang, "Incidents", "الحوادث")}
            </div>
          </div>
          <div className="text-center p-3 rounded-lg bg-white/60 border border-white/80 backdrop-blur-sm">
            <div className="text-2xl font-bold text-green-600">{currentData.total}</div>
            <div className="text-xs text-muted-foreground">
              {getLocalizedText(currentLang, "Total Items", "إجمالي العناصر")}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main trend chart */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold mb-3 text-muted-foreground">
              {getLocalizedText(currentLang, "6-Week Trend Analysis", "تحليل الاتجاه لـ 6 أسابيع")}
            </h4>
            <ChartContainer config={config} className="aspect-auto h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={riskData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                  <defs>
                    <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="50%" stopColor="#6366f1" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="incidentGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground))" opacity={0.2} />
                  <XAxis 
                    dataKey="week" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                    domain={[0, 100]}
                  />
                  <ChartTooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        return (
                          <div className="rounded-lg border bg-background/95 backdrop-blur-sm p-3 shadow-lg">
                            <div className="grid gap-2">
                              <div className="font-semibold text-sm border-b pb-2">
                                {getLocalizedText(currentLang, `Week ${label.replace('W', '')}`, `الأسبوع ${label.replace('W', '')}`)}
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm">{getLocalizedText(currentLang, "Risk Score", "درجة المخاطر")}:</span>
                                  <span className="font-bold text-blue-600">{data.riskScore}/100</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-red-600">{getLocalizedText(currentLang, "High Risk", "مخاطر عالية")}:</span>
                                  <span className="font-semibold">{data.highRisk}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-orange-600">{getLocalizedText(currentLang, "Medium Risk", "مخاطر متوسطة")}:</span>
                                  <span className="font-semibold">{data.mediumRisk}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-green-600">{getLocalizedText(currentLang, "Low Risk", "مخاطر منخفضة")}:</span>
                                  <span className="font-semibold">{data.lowRisk}</span>
                                </div>
                                <div className="flex justify-between items-center pt-1 border-t">
                                  <span className="text-sm">{getLocalizedText(currentLang, "Incidents", "الحوادث")}:</span>
                                  <span className="font-semibold text-red-500">{data.incidents}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="riskScore"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    fill="url(#riskGradient)"
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2, fill: "#ffffff" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          {/* Risk breakdown pie chart */}
          <div className="lg:col-span-1">
            <h4 className="text-sm font-semibold mb-3 text-muted-foreground">
              {getLocalizedText(currentLang, "Current Risk Distribution", "توزيع المخاطر الحالي")}
            </h4>
            <div className="h-[220px] flex flex-col items-center justify-center">
              <ChartContainer config={config} className="h-[160px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={currentRiskBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {currentRiskBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                              <div className="flex items-center gap-2">
                                <div 
                                  className="w-3 h-3 rounded-full" 
                                  style={{ backgroundColor: data.color }}
                                />
                                <span className="text-sm font-semibold">{data.name}</span>
                              </div>
                              <div className="text-sm text-muted-foreground mt-1">
                                {data.value} {getLocalizedText(currentLang, "items", "عنصر")}
                              </div>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
              
              {/* Legend */}
              <div className="grid grid-cols-1 gap-2 text-xs mt-2">
                {currentRiskBreakdown.map((item, index) => (
                  <div key={index} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


