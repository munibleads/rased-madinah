"use client"

import * as React from "react"
import { IconFileDescription, IconPlus, IconRefresh, IconTrash } from "@tabler/icons-react"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Lang = "en" | "ar"

type ReportStatus = "Pending" | "Approved" | "Rejected"

type ContractorReport = {
  id: string
  projectName: string
  period: string
  progressPercent: number
  summary: string
  createdAt: string
  status: ReportStatus
  isMock?: boolean
}

function useAppLanguage(): [Lang, number] {
  const [lang, setLang] = React.useState<Lang>(() => {
    if (typeof document !== "undefined") {
      try {
        const match = document.cookie
          .split("; ")
          .find((row) => row.startsWith("app-lang="))
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

const t = (lang: Lang, en: string, ar: string) => (lang === "ar" ? ar : en)

const LEGACY_STORAGE_KEY = "contractor-reports"
const USER_STORAGE_KEY = "contractor-reports-user"

const MOCK_REPORTS: ContractorReport[] = [
  {
    id: "mock-1723330000001",
    projectName: "Central Station",
    period: "2025-07",
    progressPercent: 62,
    summary: "Poured slabs for zones A and B. Minor delay due to rebar delivery.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    status: "Approved",
    isMock: true,
  },
  {
    id: "mock-1723330000002",
    projectName: "Quba Road",
    period: "2025-07",
    progressPercent: 48,
    summary: "Asphalt base course completed for Segment 2. Drainage works ongoing.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString(),
    status: "Pending",
    isMock: true,
  },
  {
    id: "mock-1723330000003",
    projectName: "Al-Nabawi Plaza",
    period: "2025-07",
    progressPercent: 35,
    summary: "Granite procurement approved; foundation works 80% done.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(),
    status: "Rejected",
    isMock: true,
  },
  {
    id: "mock-1723330000004",
    projectName: "Metro Line 2",
    period: "2025-07",
    progressPercent: 54,
    summary: "TBM maintenance completed; resumed boring 50m/day average.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    status: "Pending",
    isMock: true,
  },
  {
    id: "mock-1723330000005",
    projectName: "Ring Road Expansion",
    period: "2025-07",
    progressPercent: 29,
    summary: "Utility relocations in progress; traffic diversions implemented.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
    status: "Pending",
    isMock: true,
  },
  {
    id: "mock-1723330000006",
    projectName: "Water Treatment Plant",
    period: "2025-07",
    progressPercent: 71,
    summary: "Mechanical installation 60% complete; electrical rooms handed over.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    status: "Approved",
    isMock: true,
  },
  {
    id: "mock-1723330000007",
    projectName: "Airport Access Tunnel",
    period: "2025-07",
    progressPercent: 41,
    summary: "Excavation paused pending geotech review; ventilation order placed.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
    status: "Rejected",
    isMock: true,
  },
  {
    id: "mock-1723330000008",
    projectName: "University Housing",
    period: "2025-07",
    progressPercent: 58,
    summary: "Block C topped out; facade mockup approved by client.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    status: "Approved",
    isMock: true,
  },
  {
    id: "mock-1723330000009",
    projectName: "Sports Complex",
    period: "2025-07",
    progressPercent: 22,
    summary: "Steel procurement delayed; design coordination meeting held.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    status: "Pending",
    isMock: true,
  },
  {
    id: "mock-1723330000010",
    projectName: "Heritage Walkway",
    period: "2025-07",
    progressPercent: 66,
    summary: "Stone paving 40% complete; lighting shop drawings submitted.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    status: "Approved",
    isMock: true,
  },
]

function useUserReports(): [ContractorReport[], (r: ContractorReport[]) => void, () => void] {
  const [userReports, setUserReports] = React.useState<ContractorReport[]>([])

  React.useEffect(() => {
    try {
      // migrate legacy storage if present
      const legacyRaw = typeof window !== "undefined" ? window.localStorage.getItem(LEGACY_STORAGE_KEY) : null
      if (legacyRaw) {
        const legacy = JSON.parse(legacyRaw) as ContractorReport[]
        const onlyUser = Array.isArray(legacy) ? legacy.filter((r) => !r.isMock) : []
        if (typeof window !== "undefined") {
          window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(onlyUser))
          window.localStorage.removeItem(LEGACY_STORAGE_KEY)
        }
        setUserReports(onlyUser)
        return
      }

      const raw = typeof window !== "undefined" ? window.localStorage.getItem(USER_STORAGE_KEY) : null
      if (raw) {
        const parsed = JSON.parse(raw) as ContractorReport[]
        setUserReports(parsed)
      } else {
        setUserReports([])
      }
    } catch {
      setUserReports([])
    }
  }, [])

  const persist = (next: ContractorReport[]) => {
    setUserReports(next)
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(next))
      }
    } catch {}
  }

  const reset = () => persist([])

  return [userReports, persist, reset]
}

function NewReportForm({ lang, onCreate, onSubmitted }: { lang: Lang; onCreate: (r: ContractorReport) => void; onSubmitted: () => void }) {
  const [projectName, setProjectName] = React.useState("")
  const [period, setPeriod] = React.useState("")
  const [progressPercent, setProgressPercent] = React.useState<number>(0)
  const [summary, setSummary] = React.useState("")
  const [submitting, setSubmitting] = React.useState(false)

  const monthOptions = React.useMemo(() => {
    const now = new Date()
    return Array.from({ length: 12 }).map((_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const val = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
      return val
    })
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!projectName || !period || Number.isNaN(progressPercent)) return
    setSubmitting(true)
    const newReport: ContractorReport = {
      id: `${Date.now()}`,
      projectName,
      period,
      progressPercent: Math.max(0, Math.min(100, Math.round(progressPercent))),
      summary,
      createdAt: new Date().toISOString(),
      status: "Pending",
    }
    onCreate(newReport)
    setProjectName("")
    setPeriod("")
    setProgressPercent(0)
    setSummary("")
    setSubmitting(false)
    onSubmitted()
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="project">{t(lang, "Project", "المشروع")}</Label>
        <Input
          id="project"
          placeholder={t(lang, "e.g. Central Station", "مثال: المحطة المركزية")}
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="period">{t(lang, "Reporting Period", "الفترة التقارير")}</Label>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger id="period">
            <SelectValue placeholder={t(lang, "Select a month", "اختر شهرًا")} />
          </SelectTrigger>
          <SelectContent>
            {monthOptions.map((m) => (
              <SelectItem key={m} value={m}>{m}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="progress">{t(lang, "Progress %", "نسبة التقدم %")}</Label>
        <Input
          id="progress"
          type="number"
          min={0}
          max={100}
          step={1}
          value={Number.isNaN(progressPercent) ? "" : progressPercent}
          onChange={(e) => setProgressPercent(parseInt(e.target.value, 10))}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="summary">{t(lang, "Summary", "الملخص")}</Label>
        <textarea
          id="summary"
          className="min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder={t(lang, "Key accomplishments, issues, risks...", "الإنجازات الرئيسية، المشكلات، المخاطر...")}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2 rtl:flex-row-reverse">
        <Button type="submit" disabled={submitting} className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white">
          <IconPlus className="h-4 w-4" />
          <span className="ms-2">{t(lang, "Submit Report", "إرسال التقرير")}</span>
        </Button>
      </div>
    </form>
  )
}

function ReportsTable({
  lang,
  reports,
  onDelete,
  onRefreshMockStatuses,
}: {
  lang: Lang
  reports: ContractorReport[]
  onDelete: (id: string) => void
  onRefreshMockStatuses: () => void
}) {
  const badge = (status: ReportStatus) => {
    const variant: "secondary" | "destructive" | "outline" =
      status === "Approved" ? "secondary" : status === "Rejected" ? "destructive" : "outline"
    return <Badge variant={variant}>{status}</Badge>
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconFileDescription /> {t(lang, "Submitted Reports", "التقارير المرسلة")}
          <Button size="sm" variant="outline" className="ml-auto rtl:ml-0 rtl:mr-auto" onClick={onRefreshMockStatuses}>
            <IconRefresh className="h-4 w-4" />
            <span className="ms-2">{t(lang, "Refresh Status", "تحديث الحالة")}</span>
          </Button>
        </CardTitle>
        <CardDescription>
          {t(lang, "View current reports and their approval status", "عرض التقارير الحالية وحالة اعتمادها")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t(lang, "Project", "المشروع")}</TableHead>
              <TableHead>{t(lang, "Period", "الفترة")}</TableHead>
              <TableHead className="text-right">{t(lang, "Progress", "التقدم")}</TableHead>
              <TableHead className="text-right">{t(lang, "Status", "الحالة")}</TableHead>
              <TableHead className="text-right">{t(lang, "Actions", "الإجراءات")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  {t(lang, "No reports yet", "لا توجد تقارير بعد")}
                </TableCell>
              </TableRow>
            ) : (
              reports
                .slice()
                .sort((a, b) => b.id.localeCompare(a.id))
                .map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.projectName}</TableCell>
                    <TableCell>{r.period}</TableCell>
                    <TableCell className="text-right">{r.progressPercent}%</TableCell>
                    <TableCell className="text-right">{badge(r.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button size="icon" variant="ghost" onClick={() => onDelete(r.id)} aria-label={t(lang, "Delete", "حذف")}>
                        <IconTrash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default function ContractorReportsPage() {
  const [lang, renderKey] = useAppLanguage()
  const [userReports, persist, reset] = useUserReports()
  const [open, setOpen] = React.useState(false)

  const handleCreate = (r: ContractorReport) => {
    const next = [r, ...userReports]
    persist(next)
  }

  const handleDelete = (id: string) => {
    // do not delete mock rows
    const next = userReports.filter((r) => r.id !== id)
    persist(next)
  }

  // Mock status refresh: randomly assign statuses to simulate municipality review updates
  const handleRefreshStatuses = () => {
    // Randomize pending statuses for both mock and user reports
    const update = (r: ContractorReport): ContractorReport => {
      if (r.status !== "Pending") return r
      const roll = Math.random()
      const status: ReportStatus = roll < 0.2 ? "Rejected" : roll < 0.6 ? "Approved" : "Pending"
      return { ...r, status }
    }
    const updatedUser = userReports.map(update)
    persist(updatedUser)
  }

  const allReports = React.useMemo(() => {
    const all = [...userReports, ...MOCK_REPORTS]
    return all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [userReports])

  return (
    <SidebarProvider style={{ "--header-height": "calc(var(--spacing) * 12)" } as React.CSSProperties}>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col min-h-screen" key={renderKey}>
          <div className="@container/main flex flex-1 flex-col relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-white/10 to-purple-50/30 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.03),transparent_50%)] pointer-events-none" />

            <div className="relative flex flex-col gap-8 py-8">
              <div className="px-6 lg:px-8">
                <div className="flex items-start gap-3">
                  <div className="ml-auto flex items-center gap-2 rtl:flex-row-reverse">
                    <Sheet open={open} onOpenChange={setOpen}>
                      <Button
                        size="sm"
                        onClick={() => setOpen(true)}
                        className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white shadow hover:opacity-90"
                      >
                        <IconPlus className="h-4 w-4" />
                        <span className="ms-2">{t(lang, "Create new report", "إنشاء تقرير جديد")}</span>
                      </Button>
                      <SheetContent side="right" className="sm:max-w-xl bg-white">
                        <SheetHeader>
                          <SheetTitle className="text-lg">
                            {t(lang, "Create New Report", "إنشاء تقرير جديد")}
                          </SheetTitle>
                          <SheetDescription>
                            {t(lang, "Submit a periodic progress update for a project", "أرسل تحديثًا دوريًا لتقدم المشروع")}
                          </SheetDescription>
                        </SheetHeader>
                        <div className="p-4 pt-0 space-y-4">
                          <NewReportForm
                            lang={lang}
                            onCreate={handleCreate}
                            onSubmitted={() => setOpen(false)}
                          />
                        </div>
                        <SheetFooter className="pt-0"></SheetFooter>
                      </SheetContent>
                    </Sheet>
                    <Button size="sm" variant="outline" onClick={reset}>
                      {t(lang, "Clear All", "مسح الكل")}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 px-6 lg:px-8 items-stretch">
                <ReportsTable
                  lang={lang}
                  reports={allReports}
                  onDelete={handleDelete}
                  onRefreshMockStatuses={handleRefreshStatuses}
                />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}


