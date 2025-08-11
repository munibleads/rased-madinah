"use client"

import * as React from "react"
import {
  IconAlertTriangle,
  IconBolt,
  IconBrain,
  IconCalendarStats,
  IconCloud,
  IconCube,
  IconDroplet,
  IconPhotoAi,
  IconPlayerPlay,
} from "@tabler/icons-react"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

// Helper function to get localized text
const getLocalizedText = (lang: string, enText: string, arText: string) => {
  return lang === "ar" ? arText : enText
}

// Localized mock data function
const getMockData = (lang: string) => ({
  riskAlerts: [
    {
      project: getLocalizedText(lang, "Madinah Central Station", "محطة المدينة المركزية"),
      category: getLocalizedText(lang, "Schedule", "الجدول الزمني"),
      riskScore: 85,
      recommendation: getLocalizedText(lang, "Foundation delays detected. Consider 24/7 work shifts to recover 3 weeks.", "تم اكتشاف تأخير في الأساسات. فكر في نوبات عمل 24/7 لاستعادة 3 أسابيع."),
      confidence: 0.92,
      criticalPathTask: getLocalizedText(lang, "Foundation completion", "إكمال الأساسات")
    },
    {
      project: getLocalizedText(lang, "Quba Road Extension", "امتداد طريق قباء"),
      category: getLocalizedText(lang, "Budget", "الميزانية"),
      riskScore: 72,
      recommendation: getLocalizedText(lang, "Material costs increased 15%. Review supplier contracts.", "ارتفعت تكاليف المواد 15%. راجع عقود الموردين."),
      confidence: 0.88
    },
    {
      project: getLocalizedText(lang, "Masjid Al-Nabawi Plaza", "ساحة مسجد النبوي"),
      category: getLocalizedText(lang, "Safety", "السلامة"),
      riskScore: 68,
      recommendation: getLocalizedText(lang, "High traffic during prayer times. Implement temporary barriers.", "حركة مرور عالية أثناء أوقات الصلاة. نفذ حواجز مؤقتة."),
      confidence: 0.85
    }
  ],
  criticalPath: [
    {
      project: getLocalizedText(lang, "Madinah Central Station", "محطة المدينة المركزية"),
      criticalPathTask: getLocalizedText(lang, "Foundation completion", "إكمال الأساسات"),
      riskScore: 85,
      confidence: 0.92
    },
    {
      project: getLocalizedText(lang, "Quba Road Extension", "امتداد طريق قباء"),
      criticalPathTask: getLocalizedText(lang, "Asphalt laying", "رصف الأسفلت"),
      riskScore: 72,
      confidence: 0.88
    }
  ],
  optimizations: [
    {
      title: getLocalizedText(lang, "Crew reallocation", "إعادة توزيع الطاقم"),
      detail: getLocalizedText(lang, "Move 5 workers from Quba to Central Station for 48 hours", "انقل 5 عمال من قباء إلى المحطة المركزية لمدة 48 ساعة"),
      expectedROI: 0.23
    },
    {
      title: getLocalizedText(lang, "Equipment sharing", "مشاركة المعدات"),
      detail: getLocalizedText(lang, "Share crane between adjacent projects during off-peak", "شارك الرافعة بين المشاريع المجاورة خلال ساعات الذروة"),
      expectedROI: 0.18
    }
  ],
  budgetData: [
    { date: "2024-01-01", approved: 1000000, actual: 950000 },
    { date: "2024-01-02", approved: 1000000, actual: 980000 },
    { date: "2024-01-03", approved: 1000000, actual: 1020000 },
    { date: "2024-01-04", approved: 1000000, actual: 1050000 },
    { date: "2024-01-05", approved: 1000000, actual: 1080000 }
  ],
  statusUpdates: [
    { actor: getLocalizedText(lang, "Inspector Ahmed", "المفتش أحمد"), message: getLocalizedText(lang, "Foundation inspection completed", "اكتمل فحص الأساسات"), project: getLocalizedText(lang, "Central Station", "المحطة المركزية") },
    { actor: getLocalizedText(lang, "Contractor Team", "فريق المقاول"), message: getLocalizedText(lang, "Asphalt laying 60% complete", "رصف الأسفلت 60% مكتمل"), project: getLocalizedText(lang, "Quba Road", "طريق قباء") },
    { actor: getLocalizedText(lang, "Safety Officer", "ضابط السلامة"), message: getLocalizedText(lang, "Traffic barriers installed", "تم تثبيت حواجز المرور"), project: getLocalizedText(lang, "Al-Nabawi Plaza", "ساحة النبوي") }
  ],
  environmentData: [
    { location: getLocalizedText(lang, "Central Station", "المحطة المركزية"), aqi: 45, noiseDb: 65, trafficIndex: 30 },
    { location: getLocalizedText(lang, "Central Station", "طريق قباء"), aqi: 52, noiseDb: 72, trafficIndex: 85 },
    { location: getLocalizedText(lang, "Al-Nabawi Plaza", "ساحة النبوي"), aqi: 38, noiseDb: 58, trafficIndex: 45 }
  ],
  weatherUpdates: [
    { location: getLocalizedText(lang, "Central Station", "المحطة المركزية"), condition: getLocalizedText(lang, "Sunny", "مشمس"), tempC: 28, windKph: 15, scheduleImpact: "low" },
    { location: getLocalizedText(lang, "Quba Road", "طريق قباء"), condition: getLocalizedText(lang, "Clear", "صافي"), tempC: 30, windKph: 12, scheduleImpact: "low" },
    { location: getLocalizedText(lang, "Al-Nabawi Plaza", "ساحة النبوي"), condition: getLocalizedText(lang, "Partly cloudy", "غائم جزئياً"), tempC: 26, windKph: 18, scheduleImpact: "low" }
  ],
  safetyAlerts: [
    { location: getLocalizedText(lang, "Quba Road", "طريق قباء"), message: getLocalizedText(lang, "High traffic during peak hours", "حركة مرور عالية خلال ساعات الذروة"), level: getLocalizedText(lang, "moderate", "متوسط") },
    { location: getLocalizedText(lang, "Central Station", "المحطة المركزية"), message: getLocalizedText(lang, "Construction zone properly marked", "منطقة البناء محددة بشكل صحيح"), level: getLocalizedText(lang, "low", "منخفض") }
  ],
  photoAnalysis: [
    { project: getLocalizedText(lang, "Central Station", "المحطة المركزية"), progressPct: 35, photoUrl: "/next.svg", note: getLocalizedText(lang, "Foundation work progressing well", "عمل الأساسات يتقدم بشكل جيد") },
    { project: getLocalizedText(lang, "Quba Road", "طريق قباء"), progressPct: 60, photoUrl: "/next.svg", note: getLocalizedText(lang, "Asphalt laying on schedule", "رصف الأسفلت في الموعد المحدد") },
    { project: getLocalizedText(lang, "Al-Nabawi Plaza", "ساحة النبوي"), progressPct: 25, photoUrl: "/next.svg", note: getLocalizedText(lang, "Initial excavation complete", "اكتمل الحفر الأولي") }
  ]
})

function RiskAlerts({ lang }: { lang: string }) {
  const alerts = getMockData(lang).riskAlerts
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconBrain /> {getLocalizedText(lang, "AI Alerts", "تنبيهات الذكاء الاصطناعي")}
          <Badge variant="outline" className="ml-auto">{getLocalizedText(lang, "Live", "مباشر")}</Badge>
        </CardTitle>
        <CardDescription>{getLocalizedText(lang, "Budget, schedule, safety risks with confidence and actions", "مخاطر الميزانية والجدول الزمني والسلامة مع الثقة والإجراءات")}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        {alerts.map((a, i) => (
          <div key={i} className="grid gap-1.5">
            <div className="flex items-center gap-2">
              <IconBolt className="text-primary" />
              <div className="font-medium">
                {a.project} · {getLocalizedText(lang, `${a.category} risk`, `${a.category === "Schedule" ? "مخاطر الجدول الزمني" : a.category === "Budget" ? "مخاطر الميزانية" : "مخاطر السلامة"}`)}
              </div>
              <Badge variant="destructive" className="ml-auto">{a.riskScore}</Badge>
            </div>
            <div className="text-muted-foreground text-sm">
              {a.recommendation}
            </div>
            <div className="text-muted-foreground text-xs">
              {getLocalizedText(lang, `Confidence ${Math.round(a.confidence * 100)}%`, `الثقة ${Math.round(a.confidence * 100)}%`)}{a.criticalPathTask ? getLocalizedText(lang, ` · CP: ${a.criticalPathTask}`, ` · المسار الحرج: ${a.criticalPathTask}`) : ""}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

// Critical Path card removed as requested

function Optimization({ lang }: { lang: string }) {
  const suggestions = getMockData(lang).optimizations
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconCube /> {getLocalizedText(lang, "Resource Optimization", "تحسين الموارد")}
          <Badge variant="outline" className="ml-auto">{getLocalizedText(lang, "Smart", "ذكي")}</Badge>
        </CardTitle>
        <CardDescription>{getLocalizedText(lang, "Crew, equipment, materials, cost", "الطاقم والمعدات والمواد والتكلفة")}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        {suggestions.map((s, i) => (
          <div key={i} className="grid gap-1">
            <div className="flex items-center gap-2">
              <IconPlayerPlay className="text-primary" />
              <div className="font-medium">{getLocalizedText(lang, s.title, s.title === "Crew reallocation" ? "إعادة توزيع الطاقم" : "مشاركة المعدات")}</div>
              <Badge className="ml-auto">ROI {Math.round(s.expectedROI * 100)}%</Badge>
            </div>
            <div className="text-muted-foreground text-sm">{s.detail}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function BudgetMonitor({ lang }: { lang: string }) {
  const series = getMockData(lang).budgetData

  const config = {
    approved: { label: getLocalizedText(lang, "Approved", "معتمد"), color: "var(--secondary)" },
    actual: { label: getLocalizedText(lang, "Actual", "فعلي"), color: "var(--destructive)" },
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconCalendarStats /> {getLocalizedText(lang, "Budget vs Actual", "الميزانية مقابل الفعلي")}
          <Badge variant="outline" className="ml-auto">{getLocalizedText(lang, "Live", "مباشر")}</Badge>
        </CardTitle>
        <CardDescription>{getLocalizedText(lang, "Overruns flagged automatically", "يتم تحديد التجاوزات تلقائياً")}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="aspect-auto h-[220px] w-full">
          <AreaChart data={series} margin={{ left: 0, right: 10 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={24}
              tickFormatter={(v) => new Date(v).toLocaleDateString()}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <Area dataKey="approved" type="natural" fill="var(--color-approved)" stroke="var(--color-approved)" />
            <Area dataKey="actual" type="natural" fill="var(--color-actual)" stroke="var(--color-actual)" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

function LiveStatus({ lang }: { lang: string }) {
  const updates = getMockData(lang).statusUpdates
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconCloud /> {getLocalizedText(lang, "Live Status", "الحالة المباشرة")}
          <Badge variant="outline" className="ml-auto">{getLocalizedText(lang, "WebSocket-like", "مثل WebSocket")}</Badge>
        </CardTitle>
        <CardDescription>{getLocalizedText(lang, "Inspector and contractor feed", "تغذية المفتش والمقاول")}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2">
        {updates.map((u, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <span className="font-medium">{u.actor}</span>
            <span className="text-muted-foreground">{u.message}</span>
            <Badge variant="outline" className="ml-auto">{u.project}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function Environment({ lang }: { lang: string }) {
  const sensors = getMockData(lang).environmentData
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconDroplet /> {getLocalizedText(lang, "Environment", "البيئة")}
          <Badge variant="outline" className="ml-auto">IoT</Badge>
        </CardTitle>
        <CardDescription>{getLocalizedText(lang, "Air, noise, traffic around sites", "الهواء والضوضاء والمرور حول المواقع")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{getLocalizedText(lang, "Location", "الموقع")}</TableHead>
              <TableHead>{getLocalizedText(lang, "Air (AQI)", "الهواء (AQI)")}</TableHead>
              <TableHead>{getLocalizedText(lang, "Noise (dB)", "الضوضاء (dB)")}</TableHead>
              <TableHead>{getLocalizedText(lang, "Traffic", "المرور")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sensors.map((s, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{s.location}</TableCell>
                <TableCell>
                  <Badge variant={s.aqi > 120 ? "destructive" : "outline"}>{s.aqi}</Badge>
                </TableCell>
                <TableCell>{s.noiseDb}</TableCell>
                <TableCell>
                  <div className="h-2 w-24 rounded bg-muted">
                    <div className={cn("h-2 rounded bg-primary", s.trafficIndex > 70 && "bg-destructive")}
                         style={{ width: `${s.trafficIndex}%` }} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function WeatherImpact({ lang }: { lang: string }) {
  const items = getMockData(lang).weatherUpdates
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconCloud /> {getLocalizedText(lang, "Weather Impact", "تأثير الطقس")}
          <Badge variant="outline" className="ml-auto">{getLocalizedText(lang, "Schedule", "الجدول الزمني")}</Badge>
        </CardTitle>
        <CardDescription>{getLocalizedText(lang, "Forecast-driven schedule impacts", "تأثيرات الجدول الزمني القائمة على التوقعات")}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2">
        {items.map((w, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <span className="font-medium">{w.location}</span>
            <span className="text-muted-foreground">
              {getLocalizedText(lang, `${w.condition} · ${w.tempC}°C · wind ${w.windKph} kph`, `${w.condition === "Sunny" ? "مشمس" : w.condition === "Clear" ? "صافي" : "غائم جزئياً"} · ${w.tempC}°م · رياح ${w.windKph} كم/ساعة`)}
            </span>
            <Badge className="ml-auto" variant={w.scheduleImpact === "high" ? "destructive" : "secondary"}>
              {getLocalizedText(lang, w.scheduleImpact, w.scheduleImpact === "high" ? "عالي" : "منخفض")}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function SafetyFeed({ lang }: { lang: string }) {
  const items = getMockData(lang).safetyAlerts
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconAlertTriangle /> {getLocalizedText(lang, "Public Safety", "السلامة العامة")}
          <Badge variant="outline" className="ml-auto">{getLocalizedText(lang, "Advisories", "النصائح")}</Badge>
        </CardTitle>
        <CardDescription>{getLocalizedText(lang, "Proactive notifications", "الإشعارات الاستباقية")}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2">
        {items.map((s, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <span className="font-medium">{s.location}</span>
            <span className="text-muted-foreground">{s.message}</span>
            <Badge className="ml-auto" variant={s.level === "critical" ? "destructive" : "secondary"}>
              {getLocalizedText(lang, s.level, s.level === "critical" ? "حرج" : s.level === "moderate" ? "معتدل" : "منخفض")}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function PhotoAnalysis({ lang }: { lang: string }) {
  const items = getMockData(lang).photoAnalysis
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconPhotoAi /> {getLocalizedText(lang, "Photo Analysis", "تحليل الصور")}
          <Badge variant="outline" className="ml-auto">{getLocalizedText(lang, "Computer Vision", "رؤية الحاسوب")}</Badge>
        </CardTitle>
        <CardDescription>{getLocalizedText(lang, "Automated progress tracking", "تتبع التقدم الآلي")}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        {items.map((p, i) => (
          <div key={i} className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.photoUrl} alt="photo" className="h-10 w-10 rounded border object-contain" />
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm font-medium">
                {p.project}
                <Badge variant="outline" className="ml-auto">{p.progressPct}%</Badge>
              </div>
              <div className="text-muted-foreground text-xs">{p.note}</div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default function IntelligencePage() {
  const [currentLang, setCurrentLang] = React.useState<"en" | "ar">(() => {
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
        if (saved === "ar" || saved === "en") return saved as "en" | "ar";
      } catch {}
    }
    if (typeof document !== "undefined") {
      const attr = document.documentElement.getAttribute("lang");
      if (attr === "ar" || attr === "en") return attr as "en" | "ar";
    }
    return "en";
  })
  const [renderKey, setRenderKey] = React.useState(0)
  
  React.useEffect(() => {
    const updateLanguage = () => {
      try {
        const attr = typeof document !== "undefined" ? document.documentElement.getAttribute("lang") : null
        if (attr === "ar" || attr === "en") {
          setCurrentLang(attr)
          setRenderKey((prev) => prev + 1)
        }
      } catch {}
    }

    updateLanguage()

    const handleLanguageChange = () => updateLanguage()

    if (typeof window !== "undefined") {
      window.addEventListener("languageChange", handleLanguageChange)
      return () => {
        window.removeEventListener("languageChange", handleLanguageChange)
      }
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
        <div className="flex flex-1 flex-col" key={renderKey}>
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{getLocalizedText(currentLang, "Real-time", "في الوقت الفعلي")}</Badge>
                  <div className="ml-auto flex items-center gap-2">
                    <Button size="sm" variant="outline">{getLocalizedText(currentLang, "Export", "تصدير")}</Button>
                  </div>
                </div>
              </div>

              {/* Row 1: AI Alerts (left) and Budget vs Actual (right), vertically aligned */}
              <div className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-12 lg:px-6 items-stretch">
                <div className="lg:col-span-4 min-h-[360px]">
                  <RiskAlerts lang={currentLang} />
                </div>
                <div className="lg:col-span-8 min-h-[360px] flex">
                  <div className="flex-1">
                    <BudgetMonitor lang={currentLang} />
                  </div>
                </div>
              </div>



              {/* Row 3: Weather Impact, Live Status, Photo Analysis */}
              <div className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-12 lg:px-6 items-stretch">
                <div className="lg:col-span-4">
                  <WeatherImpact lang={currentLang} />
                </div>
                <div className="lg:col-span-4">
                  <LiveStatus lang={currentLang} />
                </div>
                <div className="lg:col-span-4">
                  <PhotoAnalysis lang={currentLang} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}


