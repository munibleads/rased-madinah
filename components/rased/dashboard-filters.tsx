"use client"

import { IconFilter, IconSearch, IconSparkles } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function DashboardFilters() {
  return (
    <Card className="@container/card border-0 glass-card relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-green-500/5 to-teal-500/5" />
      <CardContent className="flex flex-col gap-6 p-6 @[700px]/card:flex-row @[700px]/card:items-end @[700px]/card:justify-between relative">
        <div className="grid w-full grid-cols-1 gap-5 @[700px]/card:grid-cols-4">
          <div className="flex flex-col gap-3">
            <Label htmlFor="agency" className="text-sm font-semibold text-foreground">Agency</Label>
            <Select defaultValue="all">
              <SelectTrigger id="agency" className="modern-input h-11 bg-white/80 border-white/20 hover:bg-white/90 transition-all">
                <SelectValue placeholder="Select agency" />
              </SelectTrigger>
              <SelectContent className="border-white/20 bg-white/95 backdrop-blur-sm">
                <SelectItem value="all">All Agencies</SelectItem>
                <SelectItem value="governorate">Governorate</SelectItem>
                <SelectItem value="municipality">Municipality</SelectItem>
                <SelectItem value="authority">Development Authority</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="status" className="text-sm font-semibold text-foreground">Status</Label>
            <Select defaultValue="all">
              <SelectTrigger id="status" className="modern-input h-11 bg-white/80 border-white/20 hover:bg-white/90 transition-all">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="border-white/20 bg-white/95 backdrop-blur-sm">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="on-track">On Track</SelectItem>
                <SelectItem value="delayed">Delayed</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="timeframe" className="text-sm font-semibold text-foreground">Timeframe</Label>
            <Select defaultValue="90d">
              <SelectTrigger id="timeframe" className="modern-input h-11 bg-white/80 border-white/20 hover:bg-white/90 transition-all">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent className="border-white/20 bg-white/95 backdrop-blur-sm">
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="search" className="text-sm font-semibold text-foreground">Search</Label>
            <div className="relative">
              <IconSearch className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                id="search" 
                className="modern-input h-11 pl-10 bg-white/80 border-white/20 hover:bg-white/90 focus:bg-white/95 transition-all placeholder:text-muted-foreground/70" 
                placeholder="Project, contractor, area..." 
              />
            </div>
          </div>
        </div>
        <Separator className="@[700px]/card:hidden border-white/20" />
        <div className="flex items-end justify-between gap-4 @[700px]/card:justify-end">
          <div className="flex flex-col gap-3">
            <Label className="text-sm font-semibold text-foreground">Risk Focus</Label>
            <ToggleGroup type="multiple" variant="outline" className="flex gap-2">
            <ToggleGroupItem 
                value="safety" 
                className="data-[state=on]:bg-green-100 data-[state=on]:text-green-700 data-[state=on]:border-green-200 bg-white/80 border-white/30 hover:bg-white/90 transition-all"
              >
                Safety
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="budget" 
                className="data-[state=on]:bg-green-100 data-[state=on]:text-green-700 data-[state=on]:border-green-200 bg-white/80 border-white/30 hover:bg-white/90 transition-all"
              >
                Budget
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="schedule" 
                className="data-[state=on]:bg-green-100 data-[state=on]:text-green-700 data-[state=on]:border-green-200 bg-white/80 border-white/30 hover:bg-white/90 transition-all"
              >
                Schedule
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" className="bg-white/80 border-white/30 hover:bg-white/90 transition-all h-11">
              <IconFilter className="w-4 h-4 mr-2" />
              Advanced
            </Button>
            <Button className="gradient-primary h-11 px-6 shadow-lg">
              <IconSparkles className="w-4 h-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


