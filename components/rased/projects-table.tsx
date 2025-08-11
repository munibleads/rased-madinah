"use client"

import { IconCalendar, IconClock } from "@tabler/icons-react"
import { useEffect, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Helper function to get localized text
const getLocalizedText = (lang: string, enText: string, arText: string) => {
  return lang === "ar" ? arText : enText
}

const projectsData = [
  {
    id: "PRJ-001",
    name: "Al-Nakheel Residential Complex",
    nameAr: "مجمع النخيل السكني",
    type: "Residential",
    typeAr: "سكني",
    status: "In Progress",
    statusAr: "قيد التنفيذ",
    progress: 65,
    startDate: "2024-01-15",
    endDate: "2024-12-20",
    budget: "2.5M",
    teamSize: 24,
    location: "Al-Anbariyah",
    locationAr: "العنبرية",
    priority: "High",
    contractor: "Al-Bina Construction Co.",
    contractorAr: "شركة البناء للإنشاءات",
    contractName: "CON-2024-001"
  },
  {
    id: "PRJ-002",
    name: "King Fahd Business Center",
    nameAr: "مركز الملك فهد التجاري",
    type: "Commercial",
    typeAr: "تجاري",
    status: "Planning",
    statusAr: "التخطيط",
    progress: 15,
    startDate: "2024-03-01",
    endDate: "2025-06-30",
    budget: "8.2M",
    teamSize: 18,
    location: "Quba",
    locationAr: "قباء",
    priority: "Medium",
    contractor: "Modern Development Group",
    contractorAr: "مجموعة التطوير الحديثة",
    contractName: "CON-2024-015"
  },
  {
    id: "PRJ-003",
    name: "Al-Awali Industrial Zone",
    nameAr: "المنطقة الصناعية في العوالي",
    type: "Industrial",
    typeAr: "صناعي",
    status: "Review",
    statusAr: "مراجعة",
    progress: 85,
    startDate: "2023-09-10",
    endDate: "2024-08-15",
    budget: "15.7M",
    teamSize: 32,
    location: "Al-Awali",
    locationAr: "العوالي",
    priority: "High",
    contractor: "Industrial Builders Ltd.",
    contractorAr: "شركة البنائين الصناعيين",
    contractName: "CON-2023-089"
  },
  {
    id: "PRJ-004",
    name: "Al-Haramain Expressway Extension",
    nameAr: "امتداد طريق الحرمين السريع",
    type: "Infrastructure",
    typeAr: "بنية تحتية",
    status: "In Progress",
    statusAr: "قيد التنفيذ",
    progress: 42,
    startDate: "2024-02-20",
    endDate: "2025-03-10",
    budget: "12.3M",
    teamSize: 28,
    location: "Al-Aqiq",
    locationAr: "العقيق",
    priority: "Medium",
    contractor: "Port Infrastructure Solutions",
    contractorAr: "حلول البنية التحتية للموانئ",
    contractName: "CON-2024-032"
  },
  {
    id: "PRJ-005",
    name: "Al-Madinah University Campus",
    nameAr: "حرم جامعة المدينة المنورة",
    type: "Commercial",
    typeAr: "تجاري",
    status: "Completed",
    statusAr: "مكتمل",
    progress: 100,
    startDate: "2023-06-01",
    endDate: "2024-01-15",
    budget: "6.8M",
    teamSize: 22,
    location: "Al-Aziziyah",
    locationAr: "العزيزية",
    priority: "Low",
    contractor: "Luxury Resort Builders",
    contractorAr: "بناؤو المنتجعات الفاخرة",
    contractName: "CON-2023-045"
  },
  {
    id: "PRJ-006",
    name: "Al-Baqi Environmental Park",
    nameAr: "الحديقة البيئية في البقيع",
    type: "Environmental",
    typeAr: "بيئي",
    status: "Planning",
    statusAr: "التخطيط",
    progress: 8,
    startDate: "2024-04-01",
    endDate: "2026-02-28",
    budget: "9.1M",
    teamSize: 16,
    location: "Al-Baqi",
    locationAr: "البقيع",
    priority: "Medium",
    contractor: "Environmental Development Corp.",
    contractorAr: "شركة التطوير البيئي",
    contractName: "CON-2024-078"
  }
]

  const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800 border-green-200"
    case "In Progress":
      return "bg-green-100 text-green-800 border-green-200"
    case "Review":
      return "bg-green-100 text-green-800 border-green-200"
    case "Planning":
      return "bg-green-50 text-green-800 border-green-200"
    default:
      return "bg-green-50 text-green-800 border-green-200"
  }
}

  const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-green-200 text-green-900 border-green-300"
    case "Medium":
      return "bg-green-100 text-green-800 border-green-200"
    case "Low":
      return "bg-green-50 text-green-800 border-green-200"
    default:
      return "bg-green-50 text-green-800 border-green-200"
  }
}

  const getProgressColor = (progress: number) => {
  if (progress >= 80) return "bg-green-700"
  if (progress >= 60) return "bg-green-600"
  if (progress >= 40) return "bg-green-500"
  if (progress >= 20) return "bg-green-400"
  return "bg-green-300"
}

export function ProjectsTable() {
  const [currentLang, setCurrentLang] = useState("en")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  
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

  const filteredProjects = projectsData.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    const matchesType = typeFilter === "all" || project.type === typeFilter
    
    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {getLocalizedText(currentLang, "Project Details", "تفاصيل المشاريع")}
          </h2>
          <p className="text-muted-foreground">
            {getLocalizedText(currentLang, "Comprehensive view of all active projects", "نظرة شاملة لجميع المشاريع النشطة")}
          </p>
        </div>
        <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
          {getLocalizedText(currentLang, "Add New Project", "إضافة مشروع جديد")}
        </Button>
      </div>

      {/* Filters */}
      <Card className="relative overflow-hidden border-0 glass-card">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-slate-500/5" />
        <CardContent className="relative p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                {getLocalizedText(currentLang, "Search", "البحث")}
              </label>
              <Input
                placeholder={getLocalizedText(currentLang, "Search projects...", "البحث في المشاريع...")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-0 bg-white/50 backdrop-blur-sm"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                {getLocalizedText(currentLang, "Status", "الحالة")}
              </label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="border-0 bg-white/50 backdrop-blur-sm">
                  <SelectValue placeholder={getLocalizedText(currentLang, "All Statuses", "جميع الحالات")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{getLocalizedText(currentLang, "All Statuses", "جميع الحالات")}</SelectItem>
                  <SelectItem value="Planning">{getLocalizedText(currentLang, "Planning", "التخطيط")}</SelectItem>
                  <SelectItem value="In Progress">{getLocalizedText(currentLang, "In Progress", "قيد التنفيذ")}</SelectItem>
                  <SelectItem value="Review">{getLocalizedText(currentLang, "Review", "مراجعة")}</SelectItem>
                  <SelectItem value="Completed">{getLocalizedText(currentLang, "Completed", "مكتمل")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                {getLocalizedText(currentLang, "Type", "النوع")}
              </label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="border-0 bg-white/50 backdrop-blur-sm">
                  <SelectValue placeholder={getLocalizedText(currentLang, "All Types", "جميع الأنواع")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{getLocalizedText(currentLang, "All Types", "جميع الأنواع")}</SelectItem>
                  <SelectItem value="Residential">{getLocalizedText(currentLang, "Residential", "سكني")}</SelectItem>
                  <SelectItem value="Commercial">{getLocalizedText(currentLang, "Commercial", "تجاري")}</SelectItem>
                  <SelectItem value="Industrial">{getLocalizedText(currentLang, "Industrial", "صناعي")}</SelectItem>
                  <SelectItem value="Infrastructure">{getLocalizedText(currentLang, "Infrastructure", "بنية تحتية")}</SelectItem>
                  <SelectItem value="Environmental">{getLocalizedText(currentLang, "Environmental", "بيئي")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                {getLocalizedText(currentLang, "Results", "النتائج")}
              </label>
              <div className="flex items-center justify-center h-10 px-3 bg-white/50 backdrop-blur-sm rounded-md border-0">
                <span className="text-sm font-medium">
                  {filteredProjects.length} {getLocalizedText(currentLang, "projects", "مشروع")}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Table */}
      <Card className="relative overflow-hidden border-0 glass-card">
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-gray-50/30" />
        <CardContent className="relative p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200/50">
                  <th className={`p-4 font-semibold text-muted-foreground ${currentLang === "ar" ? "text-right" : "text-left"}`}>
                    {getLocalizedText(currentLang, "Project", "المشروع")}
                  </th>
                  <th className={`p-4 font-semibold text-muted-foreground ${currentLang === "ar" ? "text-right" : "text-left"}`}>
                    {getLocalizedText(currentLang, "Type", "النوع")}
                  </th>
                  <th className={`p-4 font-semibold text-muted-foreground ${currentLang === "ar" ? "text-right" : "text-left"}`}>
                    {getLocalizedText(currentLang, "Status", "الحالة")}
                  </th>
                  <th className={`p-4 font-semibold text-muted-foreground ${currentLang === "ar" ? "text-right" : "text-left"}`}>
                    {getLocalizedText(currentLang, "Progress", "التقدم")}
                  </th>
                  <th className={`p-4 font-semibold text-muted-foreground ${currentLang === "ar" ? "text-right" : "text-left"}`}>
                    {getLocalizedText(currentLang, "Timeline", "الجدول الزمني")}
                  </th>
                  <th className={`p-4 font-semibold text-muted-foreground ${currentLang === "ar" ? "text-right" : "text-left"}`}>
                    {getLocalizedText(currentLang, "Budget", "الميزانية")}
                  </th>
                  <th className={`p-4 font-semibold text-muted-foreground ${currentLang === "ar" ? "text-right" : "text-left"}`}>
                    {getLocalizedText(currentLang, "Contractor", "المقاول")}
                  </th>
                  <th className={`p-4 font-semibold text-muted-foreground ${currentLang === "ar" ? "text-right" : "text-left"}`}>
                    {getLocalizedText(currentLang, "Priority", "الأولوية")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="border-b border-gray-100/50 hover:bg-gray-50/30 transition-colors">
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="font-medium text-sm">{project.id}</div>
                        <div className="text-sm text-muted-foreground">
                          {currentLang === "ar" ? project.nameAr : project.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {currentLang === "ar" ? project.locationAr : project.location}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="text-xs">
                        {currentLang === "ar" ? project.typeAr : project.type}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge className={`text-xs ${getStatusColor(project.status)}`}>
                        {currentLang === "ar" ? project.statusAr : project.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getProgressColor(project.progress)}`}
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <IconCalendar className="w-3 h-3" />
                          {project.startDate}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <IconClock className="w-3 h-3" />
                          {project.endDate}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-medium">{project.budget}</div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="text-sm font-medium">
                          {currentLang === "ar" ? project.contractorAr : project.contractor}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {project.contractName}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className={`text-xs ${getPriorityColor(project.priority)}`}>
                        {project.priority}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
