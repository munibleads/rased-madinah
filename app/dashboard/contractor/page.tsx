"use client"

import * as React from "react"
import {
  IconBuildingSkyscraper,
  IconChecklist,
  IconFileDescription,
  IconReceipt2,
  IconTrendingUp,
  IconTools,
  IconClockHour4,
  IconAlertTriangle,
} from "@tabler/icons-react"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

const getText = (lang: string, en: string, ar: string) => (lang === "ar" ? ar : en)

type Lang = "en" | "ar"

function useAppLanguage(): [Lang, number] {
  const [lang, setLang] = React.useState<Lang>(() => {
    if (typeof document !== "undefined") {
      try {
        const match = document.cookie.split("; ").find((row) => row.startsWith("app-lang="))
        const cookieLang = match ? decodeURIComponent(match.split("=")[1]) : null
        if (cookieLang === "ar" || cookieLang === "en") return cookieLang
      } catch {}
    }
    if (typeof window !== "undefined") {
      try {
        const saved = window.localStorage.getItem("app-lang")
        if (saved === "ar" || saved === "en") return saved as Lang
      } catch {}
    }
    if (typeof document !== "undefined") {
      const attr = document.documentElement.getAttribute("lang")
      if (attr === "ar" || attr === "en") return attr as Lang
    }
    return "en"
  })
  const [renderKey, setRenderKey] = React.useState(0)

  React.useEffect(() => {
    const update = () => {
      try {
        const attr = typeof document !== "undefined" ? document.documentElement.getAttribute("lang") : null
        if (attr === "ar" || attr === "en") {
          setLang(attr)
          setRenderKey((k) => k + 1)
        }
      } catch {}
    }
    update()
    const handler = () => update()
    if (typeof window !== "undefined") {
      window.addEventListener("languageChange", handler)
      return () => window.removeEventListener("languageChange", handler)
    }
  }, [])

  return [lang, renderKey]
}

function getMock(lang: Lang) {
  return {
    kpis: [
      {
        title: getText(lang, "Active Projects", "المشاريع النشطة"),
        value: 8,
        delta: +2,
        icon: IconBuildingSkyscraper,
      },
      {
        title: getText(lang, "Tasks Due (7d)", "المهام المستحقة (7 أيام)"),
        value: 23,
        delta: +5,
        icon: IconChecklist,
      },
      {
        title: getText(lang, "RFIs Pending", "طلبات المعلومات المعلقة"),
        value: 6,
        delta: -1,
        icon: IconFileDescription,
      },
      {
        title: getText(lang, "Invoices Pending", "الفواتير المعلقة"),
        value: 3,
        delta: 0,
        icon: IconReceipt2,
      },
    ],
    progressSeries: [
      { date: "2024-01-01", target: 20, actual: 18 },
      { date: "2024-02-01", target: 35, actual: 32 },
      { date: "2024-03-01", target: 50, actual: 48 },
      { date: "2024-04-01", target: 65, actual: 61 },
      { date: "2024-05-01", target: 78, actual: 73 },
      { date: "2024-06-01", target: 90, actual: 84 },
    ],
    tasks: [
      {
        title: getText(lang, "Pour slab - Zone B", "صب البلاطة - المنطقة ب"),
        project: getText(lang, "Central Station", "المحطة المركزية"),
        due: "2025-08-15",
        priority: getText(lang, "High", "عالية"),
        status: getText(lang, "Blocked", "معطل"),
      },
      {
        title: getText(lang, "Asphalt laying - Segment 3", "رصف الأسفلت - المقطع 3"),
        project: getText(lang, "Quba Road", "طريق قباء"),
        due: "2025-08-18",
        priority: getText(lang, "Medium", "متوسطة"),
        status: getText(lang, "In progress", "قيد التنفيذ"),
      },
      {
        title: getText(lang, "Safety inspection - Cranes", "فحص السلامة - الرافعات"),
        project: getText(lang, "Al-Nabawi Plaza", "ساحة النبوي"),
        due: "2025-08-20",
        priority: getText(lang, "Low", "منخفضة"),
        status: getText(lang, "Scheduled", "مجدول"),
      },
    ],
    rfi: [
      { id: "RFI-231", subject: getText(lang, "Beam detail at grid C4", "تفصيل العارضة عند الشبكة C4"), project: getText(lang, "Central Station", "المحطة المركزية"), status: getText(lang, "Awaiting reply", "في انتظار الرد") },
      { id: "RFI-228", subject: getText(lang, "Asphalt mix approval", "اعتماد خليط الأسفلت"), project: getText(lang, "Quba Road", "طريق قباء"), status: getText(lang, "Approved", "معتمد") },
      { id: "RFI-224", subject: getText(lang, "Light pole base depth", "عمق قاعدة عمود الإنارة"), project: getText(lang, "Al-Nabawi Plaza", "ساحة النبوي"), status: getText(lang, "Clarified", "موضح") },
    ],
    activity: [
      { when: "08:20", who: getText(lang, "Site Engineer", "مهندس الموقع"), what: getText(lang, "Submitted daily report", "أرسل التقرير اليومي") },
      { when: "09:05", who: getText(lang, "Procurement", "المشتريات"), what: getText(lang, "Concrete order confirmed", "تأكيد طلب الخرسانة") },
      { when: "10:40", who: getText(lang, "Safety Officer", "ضابط السلامة"), what: getText(lang, "Toolbox talk completed", "تم إكمال محاضرة السلامة") },
    ],
  }
}

function KPIGrid({ lang }: { lang: Lang }) {
  const items = getMock(lang).kpis
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-12 lg:px-6">
      {items.map((kpi, idx) => (
        <div key={idx} className="lg:col-span-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2 rtl:flex-row-reverse">
                <kpi.icon className="h-4 w-4" />
                <span>{kpi.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-end justify-between">
              <div className="text-2xl font-semibold">{kpi.value}</div>
              <Badge variant={kpi.delta >= 0 ? "secondary" : "destructive"}>
                {kpi.delta >= 0 ? "+" : ""}
                {kpi.delta}
              </Badge>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}

function ProgressChart({ lang }: { lang: Lang }) {
  const series = getMock(lang).progressSeries
  const config = {
    target: { label: getText(lang, "Target", "المستهدف"), color: "var(--secondary)" },
    actual: { label: getText(lang, "Actual", "فعلي"), color: "var(--primary)" },
  }
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconTrendingUp /> {getText(lang, "Overall Progress", "التقدم الكلي")}
          <Badge variant="outline" className="ml-auto">{getText(lang, "Monthly", "شهري")}</Badge>
        </CardTitle>
        <CardDescription>{getText(lang, "Earned value vs target across portfolio", "القيمة المكتسبة مقابل المستهدف عبر المحفظة")}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="aspect-auto h-[240px] w-full">
          <AreaChart data={series} margin={{ left: 0, right: 10 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} minTickGap={24} tickFormatter={(v) => new Date(v).toLocaleDateString()} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <Area dataKey="target" type="natural" fill="var(--color-target)" stroke="var(--color-target)" />
            <Area dataKey="actual" type="natural" fill="var(--color-actual)" stroke="var(--color-actual)" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

function TasksTable({ lang }: { lang: Lang }) {
  const rows = getMock(lang).tasks
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconTools /> {getText(lang, "My Tasks", "مهامي")}
          <Badge variant="outline" className="ml-auto">{getText(lang, "7 days", "7 أيام")}</Badge>
        </CardTitle>
        <CardDescription>{getText(lang, "Due soon and blocked tasks", "المهام القريبة والمُعطلة")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{getText(lang, "Task", "المهمة")}</TableHead>
              <TableHead>{getText(lang, "Project", "المشروع")}</TableHead>
              <TableHead>{getText(lang, "Due", "الاستحقاق")}</TableHead>
              <TableHead className="text-right">{getText(lang, "Status", "الحالة")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{r.title}</TableCell>
                <TableCell>{r.project}</TableCell>
                <TableCell className="flex items-center gap-2 rtl:flex-row-reverse">
                  <IconClockHour4 className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(r.due).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US")}</span>
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant={r.status === getText(lang, "Blocked", "معطل") ? "destructive" : r.status === getText(lang, "In progress", "قيد التنفيذ") ? "secondary" : "outline"}>{r.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function RFICard({ lang }: { lang: Lang }) {
  const rows = getMock(lang).rfi
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconFileDescription /> {getText(lang, "RFIs", "طلبات المعلومات")}
          <Badge variant="outline" className="ml-auto">{getText(lang, "Open", "مفتوحة")}</Badge>
        </CardTitle>
        <CardDescription>{getText(lang, "Key coordination questions", "أسئلة التنسيق الرئيسية")}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        {rows.map((r) => (
          <div key={r.id} className="flex items-center gap-3 text-sm">
            <Badge variant="secondary">{r.id}</Badge>
            <div className="flex-1">
              <div className="font-medium">{r.subject}</div>
              <div className="text-muted-foreground">{r.project}</div>
            </div>
            <Badge variant={r.status === getText(lang, "Approved", "معتمد") ? "secondary" : r.status === getText(lang, "Awaiting reply", "في انتظار الرد") ? "destructive" : "outline"}>{r.status}</Badge>
          </div>
        ))}
        <div className="flex gap-2">
          <Button size="sm" variant="outline">{getText(lang, "New RFI", "طلب معلومات جديد")}</Button>
          <Button size="sm">{getText(lang, "View all", "عرض الكل")}</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function ActivityFeed({ lang }: { lang: Lang }) {
  const rows = getMock(lang).activity
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconAlertTriangle /> {getText(lang, "Activity", "النشاط")}
          <Badge variant="outline" className="ml-auto">{getText(lang, "Live", "مباشر")}</Badge>
        </CardTitle>
        <CardDescription>{getText(lang, "Latest site updates", "آخر تحديثات الموقع")}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2">
        {rows.map((a, i) => (
          <div key={i} className="flex items-center gap-3 text-sm">
            <span className="text-muted-foreground w-12 text-center">{a.when}</span>
            <div className="flex-1">
              <span className="font-medium">{a.who}</span>
              <span className="text-muted-foreground"> · {a.what}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default function ContractorDashboardPage() {
  const [lang, renderKey] = useAppLanguage()

  return (
    <SidebarProvider
      style={{ "--header-height": "calc(var(--spacing) * 12)" } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col min-h-screen" key={renderKey}>
          <div className="@container/main flex flex-1 flex-col relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/40 via-white/10 to-emerald-50/40 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.06),transparent_55%)] pointer-events-none" />

            <div className="relative flex flex-col gap-8 py-8">

              <div className="px-6 lg:px-8">
                <KPIGrid lang={lang} />
              </div>

              <div className="grid grid-cols-1 gap-4 px-6 lg:grid-cols-12 lg:px-8 items-stretch">
                <div className="lg:col-span-8 min-h-[320px]">
                  <ProgressChart lang={lang} />
                </div>
                <div className="lg:col-span-4">
                  <RFICard lang={lang} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 px-6 lg:grid-cols-12 lg:px-8 items-stretch">
                <div className="lg:col-span-8">
                  <TasksTable lang={lang} />
                </div>
                <div className="lg:col-span-4">
                  <ActivityFeed lang={lang} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

