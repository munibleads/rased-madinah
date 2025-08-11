import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { KpiCards } from "@/components/rased/kpi-cards"
import { MapView } from "@/components/rased/map-view"
import { AIInsights } from "@/components/rased/ai-insights"
import { RiskTrend } from "@/components/rased/risk-trend"
import { GanttTimeline } from "@/components/rased/gantt-timeline"
import { ReportsReview } from "@/components/rased/reports-review"

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col min-h-screen">
          <div className="@container/main flex flex-1 flex-col relative">
            {/* Modern background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-white/10 to-purple-50/30 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.03),transparent_50%)] pointer-events-none" />
            
            <div className="relative flex flex-col gap-8 py-8">              
              {/* KPI Section */}
              <div className="relative">
                <KpiCards />
              </div>
              
              {/* Main Content Grid */}
              <div className="grid grid-cols-1 gap-8 px-6 lg:grid-cols-12 lg:px-8">
                <div className="lg:col-span-8">
                  <MapView />
                </div>
                <div className="lg:col-span-4">
                  <AIInsights />
                </div>
              </div>
              
              {/* Risk Trend and Timeline Section */}
              <div className="grid grid-cols-1 gap-8 px-6 lg:grid-cols-2 lg:px-8">
                <RiskTrend />
                <GanttTimeline />
              </div>

              {/* Reports Review Section */}
              <div className="px-6 lg:px-8 pb-8">
                <ReportsReview />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
