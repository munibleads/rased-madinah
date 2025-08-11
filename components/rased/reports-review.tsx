"use client"

import { useEffect, useMemo, useState } from "react"
import {
  IconCheck,
  IconClockHour4,
  IconFileDescription,
  IconSettings,
  IconX,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"

type ReportStatus = "pending" | "approved" | "rejected"

type ProjectReport = {
  id: string
  company: string
  companyAr: string
  project: string
  projectAr: string
  period: string
  submittedAt: string
  status: ReportStatus
  notes?: string
}

const getLocalizedText = (lang: string, enText: string, arText: string) => {
  return lang === "ar" ? arText : enText
}

export function ReportsReview() {
  const [currentLang, setCurrentLang] = useState("en")
  const [query, setQuery] = useState("")
  const [reports, setReports] = useState<ProjectReport[]>([
    {
      id: "r-1001",
      company: "Al-Noor Contractors",
      companyAr: "شركة النور للمقاولات",
      project: "Al-Anbariyah Road Widening",
      projectAr: "توسيع طريق العنبرية",
      period: "2025-W26",
      submittedAt: "2025-06-29 14:12",
      status: "pending",
      notes: "",
    },
    {
      id: "r-1002",
      company: "Quba Infra Co.",
      companyAr: "شركة قباء للبنية التحتية",
      project: "Quba Stormwater Management",
      projectAr: "إدارة مياه الأمطار في قباء",
      period: "2025-W25",
      submittedAt: "2025-06-22 09:41",
      status: "approved",
      notes: "Reviewed by PMO. Budget spike acknowledged.",
    },
    {
      id: "r-1003",
      company: "Haram Dev Group",
      companyAr: "مجموعة الحرم للتطوير",
      project: "Al-Haramain Green Corridors",
      projectAr: "الممرات الخضراء في الحرمين",
      period: "2025-Q2",
      submittedAt: "2025-06-30 18:05",
      status: "pending",
      notes: "",
    },
    {
      id: "r-1004",
      company: "Uhud Builders",
      companyAr: "بناؤو أحد",
      project: "Uhud Mountain Bridge Rehabilitation",
      projectAr: "إعادة تأهيل جبل أحد",
      period: "2025-W24",
      submittedAt: "2025-06-16 11:08",
      status: "rejected",
      notes: "Missing lab test attachments.",
    },
    {
      id: "r-1005",
      company: "Madinah Utilities",
      companyAr: "مرافق المدينة المنورة",
      project: "Al-Awali Water Network Upgrade",
      projectAr: "ترقية شبكة المياه في العوالي",
      period: "2025-W26",
      submittedAt: "2025-06-29 10:02",
      status: "pending",
      notes: "",
    },
    {
      id: "r-1006",
      company: "Al Badr Engineering",
      companyAr: "الهندسة البدر",
      project: "Al-Aziziyah Street Lighting",
      projectAr: "إنارة شوارع العزيزية",
      period: "2025-W25",
      submittedAt: "2025-06-23 16:27",
      status: "approved",
      notes: "Conforms to spec.",
    },
    {
      id: "r-1007",
      company: "Qibla Roads",
      companyAr: "طرق القبلة",
      project: "Al-Baqi Asphalt Resurfacing",
      projectAr: "إعادة رصف الإسفلت في البقيع",
      period: "2025-W24",
      submittedAt: "2025-06-17 08:11",
      status: "rejected",
      notes: "Crew logs inconsistent.",
    },
    {
      id: "r-1008",
      company: "Anwar Construction",
      companyAr: "الأنوار للإنشاءات",
      project: "Al-Masjid Al-Nabawi Walkways",
      projectAr: "ممرات المسجد النبوي",
      period: "2025-Q2",
      submittedAt: "2025-06-30 12:46",
      status: "pending",
      notes: "",
    },
    {
      id: "r-1009",
      company: "Salam Builders",
      companyAr: "بناؤو السلام",
      project: "Al-Rawdah Park Revitalization",
      projectAr: "إحياء حديقة الروضة",
      period: "2025-W25",
      submittedAt: "2025-06-21 09:59",
      status: "approved",
      notes: "Photos verified.",
    },
    {
      id: "r-1010",
      company: "Hijaz Developments",
      companyAr: "تطويرات الحجاز",
      project: "Al-Aqiq Waste Management",
      projectAr: "إدارة النفايات في العقيق",
      period: "2025-W23",
      submittedAt: "2025-06-10 15:37",
      status: "pending",
      notes: "",
    },
    {
      id: "r-1011",
      company: "Al Rawdah Group",
      companyAr: "مجموعة الروضة",
      project: "Al-Haram Traffic Signal Optimization",
      projectAr: "تحسين إشارات المرور في الحرم",
      period: "2025-W26",
      submittedAt: "2025-06-28 19:02",
      status: "approved",
      notes: "Controller firmware updated.",
    },
    {
      id: "r-1012",
      company: "Nakhil Infra",
      companyAr: "بنية النخيل التحتية",
      project: "Al-Nakheel Canal Dredging",
      projectAr: "تجريف قناة النخيل",
      period: "2025-W24",
      submittedAt: "2025-06-15 07:25",
      status: "rejected",
      notes: "Survey missing signatures.",
    },
    {
      id: "r-1013",
      company: "Zamzam Services",
      companyAr: "خدمات زمزم",
      project: "Al-Haram Smart Meter Installation",
      projectAr: "تركيب العدادات الذكية في الحرم",
      period: "2025-Q2",
      submittedAt: "2025-06-27 20:10",
      status: "pending",
      notes: "",
    },
    {
      id: "r-1014",
      company: "Shifa Contractors",
      companyAr: "مقاولو الشفاء",
      project: "Al-Madinah Medical Center",
      projectAr: "المركز الطبي في المدينة المنورة",
      period: "2025-W25",
      submittedAt: "2025-06-22 13:44",
      status: "approved",
      notes: "All checklists complete.",
    },
  ])

  const [openReportId, setOpenReportId] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const pageSize = 5

  useEffect(() => {
    const lang = document.documentElement.getAttribute("lang") || "en"
    setCurrentLang(lang)

    const observer = new MutationObserver(() => {
      const newLang = document.documentElement.getAttribute("lang") || "en"
      setCurrentLang(newLang)
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    })
    return () => observer.disconnect()
  }, [])

  const selected = useMemo(
    () => reports.find((r) => r.id === openReportId) || null,
    [openReportId, reports]
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return reports
    return reports.filter((r) =>
      [r.company, r.project, r.period, r.status].some((v) =>
        String(v).toLowerCase().includes(q)
      )
    )
  }, [query, reports])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, page])

  useEffect(() => {
    setPage(1)
  }, [query])

  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [totalPages, page])

  const setStatus = (id: string, status: ReportStatus) => {
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
  }

  const setNotes = (id: string, notes: string) => {
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, notes } : r)))
  }

  return (
    <Card className="border bg-card shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconFileDescription className="text-muted-foreground" />
          {getLocalizedText(currentLang, "Project Reports Review", "مراجعة تقارير المشاريع")}
          <Badge variant="secondary" className="ml-auto">
            {getLocalizedText(currentLang, "Moderation", "المراجعة")}
          </Badge>
        </CardTitle>
        <CardDescription>
          {getLocalizedText(
            currentLang,
            "Display and moderate reports submitted by companies.",
            "عرض ومراجعة التقارير المقدمة من الشركات."
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:max-w-xs">
            <Input
              placeholder={getLocalizedText(
                currentLang,
                "Search company, project, period...",
                "ابحث عن شركة، مشروع، فترة..."
              )}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <IconClockHour4 className="size-4" />
            {getLocalizedText(currentLang, "Pending", "قيد الانتظار")}:
            <Badge variant="outline">
              {reports.filter((r) => r.status === "pending").length}
            </Badge>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{getLocalizedText(currentLang, "Company", "الشركة")}</TableHead>
              <TableHead>{getLocalizedText(currentLang, "Project", "المشروع")}</TableHead>
              <TableHead>{getLocalizedText(currentLang, "Period", "الفترة")}</TableHead>
              <TableHead>{getLocalizedText(currentLang, "Submitted", "تاريخ الإرسال")}</TableHead>
              <TableHead>{getLocalizedText(currentLang, "Status", "الحالة")}</TableHead>
              <TableHead className="text-right">{getLocalizedText(currentLang, "Actions", "الإجراءات")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.map((r) => (
              <TableRow key={r.id} className="align-top">
                <TableCell>{currentLang === "ar" ? r.companyAr : r.company}</TableCell>
                <TableCell className="max-w-[280px] truncate">{currentLang === "ar" ? r.projectAr : r.project}</TableCell>
                <TableCell>
                  <Badge variant="outline">{r.period}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{r.submittedAt}</TableCell>
                <TableCell>
                  {r.status === "approved" && (
                    <Badge className="bg-emerald-50/80 text-emerald-700 border-emerald-200/50">
                      <IconCheck className="size-3" />
                      {getLocalizedText(currentLang, "Approved", "مقبول")}
                    </Badge>
                  )}
                  {r.status === "rejected" && (
                    <Badge className="bg-red-50/80 text-red-700 border-red-200/50">
                      <IconX className="size-3" />
                      {getLocalizedText(currentLang, "Rejected", "مرفوض")}
                    </Badge>
                  )}
                  {r.status === "pending" && (
                    <Badge variant="secondary">
                      <IconClockHour4 className="size-3" />
                      {getLocalizedText(currentLang, "Pending", "قيد الانتظار")}
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setStatus(r.id, "approved")}
                    >
                      <IconCheck className="size-4" />
                      {getLocalizedText(currentLang, "Approve", "قبول")}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setStatus(r.id, "rejected")}
                    >
                      <IconX className="size-4" />
                      {getLocalizedText(currentLang, "Reject", "رفض")}
                    </Button>

                    <Sheet open={openReportId === r.id} onOpenChange={(open) => setOpenReportId(open ? r.id : null)}>
                      <SheetTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <IconSettings className="size-4" />
                          {getLocalizedText(currentLang, "Review", "مراجعة")}
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="right" className="sm:max-w-md">
                        <SheetHeader>
                          <SheetTitle className="flex items-center gap-2">
                            <IconFileDescription className="text-muted-foreground" />
                            {getLocalizedText(currentLang, "Report Details", "تفاصيل التقرير")}
                          </SheetTitle>
                          <SheetDescription>
                            {getLocalizedText(currentLang, "Add notes and finalize a decision.", "أضف الملاحظات واتخذ القرار النهائي.")}
                          </SheetDescription>
                        </SheetHeader>

                        <div className="px-4 py-2 grid gap-2 text-sm">
                          <div className="grid grid-cols-3 gap-2 items-center">
                            <div className="text-muted-foreground">{getLocalizedText(currentLang, "Company", "الشركة")}</div>
                            <div className="col-span-2 font-medium">{currentLang === "ar" ? r.companyAr : r.company}</div>
                          </div>
                          <div className="grid grid-cols-3 gap-2 items-center">
                            <div className="text-muted-foreground">{getLocalizedText(currentLang, "Project", "المشروع")}</div>
                            <div className="col-span-2 font-medium">{currentLang === "ar" ? r.projectAr : r.project}</div>
                          </div>
                          <div className="grid grid-cols-3 gap-2 items-center">
                            <div className="text-muted-foreground">{getLocalizedText(currentLang, "Period", "الفترة")}</div>
                            <div className="col-span-2">
                              <Badge variant="outline">{r.period}</Badge>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-2 items-center">
                            <div className="text-muted-foreground">{getLocalizedText(currentLang, "Submitted", "تاريخ الإرسال")}</div>
                            <div className="col-span-2 text-muted-foreground">{r.submittedAt}</div>
                          </div>
                        </div>

                        <div className="px-4 py-2 grid gap-2">
                          <div className="text-sm font-medium">
                            {getLocalizedText(currentLang, "Notes", "ملاحظات")}
                          </div>
                          <textarea
                            className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input min-h-28 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                            placeholder={getLocalizedText(currentLang, "Add reviewer notes…", "أضف ملاحظات المراجع…")}
                            value={selected?.notes ?? ""}
                            onChange={(e) => selected && setNotes(selected.id, e.target.value)}
                          />
                        </div>

                        <div className="px-4 py-4 mt-auto flex flex-col gap-2 border-t">
                          <div className="flex gap-2">
                            <Button
                              className="flex-1"
                              onClick={() => {
                                setStatus(r.id, "approved")
                                setOpenReportId(null)
                              }}
                            >
                              <IconCheck className="size-4" />
                              {getLocalizedText(currentLang, "Approve", "قبول")}
                            </Button>
                            <Button
                              className="flex-1"
                              variant="destructive"
                              onClick={() => {
                                setStatus(r.id, "rejected")
                                setOpenReportId(null)
                              }}
                            >
                              <IconX className="size-4" />
                              {getLocalizedText(currentLang, "Reject", "رفض")}
                            </Button>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {getLocalizedText(
                              currentLang,
                              "Actions update locally. Wire to your API/Supabase to persist.",
                              "الإجراءات محدثة محلياً. اربطها بواجهة برمجة التطبيقات/سوبابيز للحفظ."
                            )}
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-10">
                  {getLocalizedText(currentLang, "No reports found", "لا توجد تقارير")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-between border-t">
        <div className="text-sm text-muted-foreground">
          {(() => {
            const total = filtered.length
            const start = total === 0 ? 0 : (page - 1) * pageSize + 1
            const end = Math.min(page * pageSize, total)
            return getLocalizedText(
              currentLang,
              `Showing ${start}–${end} of ${total}`,
              `عرض ${start}–${end} من ${total}`
            )
          })()}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
          >
            <IconChevronLeft className="size-4" />
            {getLocalizedText(currentLang, "Prev", "السابق")}
          </Button>
          <div className="text-xs text-muted-foreground tabular-nums">
            {page} / {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
          >
            {getLocalizedText(currentLang, "Next", "التالي")}
            <IconChevronRight className="size-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}


