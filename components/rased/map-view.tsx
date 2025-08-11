"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useMemo, useRef, useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Satellite } from "lucide-react"

// Helper function to get localized text
const getLocalizedText = (lang: string, enText: string, arText: string) => {
  return lang === "ar" ? arText : enText
}

type ProjectPoint = {
  id: string
  name: string
  status: "on-track" | "delayed" | "critical"
  lng: number
  lat: number
  company: string
  completion: number
  lastUpdate: string
  image: string
}

const getProjects = (lang: string): ProjectPoint[] => [
  {
    id: "p1",
    name: getLocalizedText(lang, "Stormwater Upgrade", "ترقية مياه الأمطار"),
    status: "on-track",
    lng: 39.611,
    lat: 24.467,
    company: getLocalizedText(lang, "Al-Madinah Construction Co.", "شركة المدينة للإنشاءات"),
    completion: 75,
    lastUpdate: "2025-01-15",
    image: "/project1.jpg",
  },
  {
    id: "p2",
    name: getLocalizedText(lang, "Road Resurfacing Quba", "إعادة تبليط طرق قباء"),
    status: "delayed",
    lng: 39.595,
    lat: 24.455,
    company: getLocalizedText(lang, "Saudi Roads & Transport", "الطرق والنقل السعودي"),
    completion: 45,
    lastUpdate: "2025-01-10",
    image: "/project2.jpg",
  },
  {
    id: "p3",
    name: getLocalizedText(lang, "Street Lighting", "إنارة الشوارع"),
    status: "critical",
    lng: 39.62,
    lat: 24.48,
    company: getLocalizedText(lang, "Electric Power Co.", "شركة الطاقة الكهربائية"),
    completion: 30,
    lastUpdate: "2025-01-08",
    image: "/project3.jpg",
  },
  {
    id: "p4",
    name: getLocalizedText(lang, "Smart City Initiative", "مبادرة المدينة الذكية"),
    status: "on-track",
    lng: 39.58,
    lat: 24.475,
    company: getLocalizedText(lang, "Digital Solutions Ltd.", "الحلول الرقمية المحدودة"),
    completion: 60,
    lastUpdate: "2025-01-12",
    image: "/project4.jpg",
  },
  {
    id: "p5",
    name: getLocalizedText(lang, "Public Park Development", "تطوير حديقة عامة"),
    status: "delayed",
    lng: 39.605,
    lat: 24.445,
    company: getLocalizedText(lang, "Green Spaces Co.", "شركة المساحات الخضراء"),
    completion: 55,
    lastUpdate: "2025-01-05",
    image: "/project5.jpg",
  },
  {
    id: "p6",
    name: getLocalizedText(lang, "Historical Site Restoration", "ترميم موقع تاريخي"),
    status: "critical",
    lng: 39.63,
    lat: 24.46,
    company: getLocalizedText(lang, "Heritage Preservation", "الحفاظ على التراث"),
    completion: 25,
    lastUpdate: "2025-01-03",
    image: "/project1.jpg",
  },
  {
    id: "p7",
    name: getLocalizedText(lang, "Shopping Center Expansion", "توسيع مركز التسوق"),
    status: "on-track",
    lng: 39.59,
    lat: 24.465,
    company: getLocalizedText(lang, "Commercial Development Co.", "شركة التطوير التجاري"),
    completion: 80,
    lastUpdate: "2025-01-14",
    image: "/project2.jpg",
  },
  {
    id: "p8",
    name: getLocalizedText(lang, "Waste Management Facility", "منشأة إدارة النفايات"),
    status: "delayed",
    lng: 39.61,
    lat: 24.44,
    company: getLocalizedText(lang, "Environmental Services Ltd.", "خدمات البيئة المحدودة"),
    completion: 40,
    lastUpdate: "2025-01-07",
    image: "/project3.jpg",
  },
  {
    id: "p9",
    name: getLocalizedText(lang, "Sports Complex Construction", "بناء مجمع رياضي"),
    status: "on-track",
    lng: 39.585,
    lat: 24.46,
    company: getLocalizedText(lang, "Sports Infrastructure Co.", "شركة البنية التحتية الرياضية"),
    completion: 65,
    lastUpdate: "2025-01-13",
    image: "/project4.jpg",
  },
  {
    id: "p10",
    name: getLocalizedText(lang, "Water Pipeline Upgrade", "ترقية خطوط المياه"),
    status: "on-track",
    lng: 39.602,
    lat: 24.472,
    company: getLocalizedText(lang, "Madinah Utilities Corp.", "شركة مرافق المدينة"),
    completion: 70,
    lastUpdate: "2025-01-11",
    image: "/project5.jpg",
  },
  {
    id: "p11",
    name: getLocalizedText(lang, "Bridge Maintenance", "صيانة الجسر"),
    status: "delayed",
    lng: 39.575,
    lat: 24.468,
    company: getLocalizedText(lang, "Structural Works Ltd.", "الأعمال الإنشائية المحدودة"),
    completion: 42,
    lastUpdate: "2025-01-09",
    image: "/project1.jpg",
  },
  {
    id: "p12",
    name: getLocalizedText(lang, "Metro Station Upgrade", "ترقية محطة المترو"),
    status: "critical",
    lng: 39.62,
    lat: 24.452,
    company: getLocalizedText(lang, "Transit Systems Co.", "شركة نظم النقل"),
    completion: 22,
    lastUpdate: "2025-01-06",
    image: "/project2.jpg",
  },
  {
    id: "p13",
    name: getLocalizedText(lang, "Hospital Expansion", "توسعة المستشفى"),
    status: "on-track",
    lng: 39.64,
    lat: 24.478,
    company: getLocalizedText(lang, "Healthcare Builders", "بُناة الرعاية الصحية"),
    completion: 58,
    lastUpdate: "2025-01-16",
    image: "/project3.jpg",
  },
  {
    id: "p14",
    name: getLocalizedText(lang, "University Campus Upgrade", "ترقية الحرم الجامعي"),
    status: "delayed",
    lng: 39.59,
    lat: 24.49,
    company: getLocalizedText(lang, "Academic Constructions", "الإنشاءات الأكاديمية"),
    completion: 48,
    lastUpdate: "2025-01-04",
    image: "/project4.jpg",
  },
  {
    id: "p15",
    name: getLocalizedText(lang, "New Bus Depot", "إنشاء مستودع حافلات"),
    status: "on-track",
    lng: 39.565,
    lat: 24.455,
    company: getLocalizedText(lang, "Urban Mobility Co.", "شركة التنقل الحضري"),
    completion: 67,
    lastUpdate: "2025-01-02",
    image: "/project5.jpg",
  },
  {
    id: "p16",
    name: getLocalizedText(lang, "Sewage Treatment Plant", "محطة معالجة الصرف الصحي"),
    status: "critical",
    lng: 39.6,
    lat: 24.44,
    company: getLocalizedText(lang, "AquaTech Services", "خدمات أكواتك"),
    completion: 18,
    lastUpdate: "2025-01-01",
    image: "/project1.jpg",
  },
  {
    id: "p17",
    name: getLocalizedText(lang, "IT Data Center", "مركز بيانات تقني"),
    status: "on-track",
    lng: 39.653,
    lat: 24.465,
    company: getLocalizedText(lang, "Digital Core Ltd.", "ديجيتال كور المحدودة"),
    completion: 72,
    lastUpdate: "2025-01-14",
    image: "/project2.jpg",
  },
  {
    id: "p18",
    name: getLocalizedText(lang, "Harbor Access Road", "طريق الوصول للميناء"),
    status: "delayed",
    lng: 39.567,
    lat: 24.48,
    company: getLocalizedText(lang, "Marine Logistics", "الخدمات اللوجستية البحرية"),
    completion: 36,
    lastUpdate: "2025-01-09",
    image: "/project3.jpg",
  },
  {
    id: "p19",
    name: getLocalizedText(lang, "Cultural Center Build", "بناء مركز ثقافي"),
    status: "on-track",
    lng: 39.612,
    lat: 24.49,
    company: getLocalizedText(lang, "Arts & Culture Dev.", "تطوير الفنون والثقافة"),
    completion: 63,
    lastUpdate: "2025-01-12",
    image: "/project4.jpg",
  },
]

export function MapView() {
  const [currentLang, setCurrentLang] = useState("en")
  const [activeTab, setActiveTab] = useState<"street" | "satellite">("street")
  const mapRef = useRef<HTMLDivElement | null>(null)
  const mapInstance = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
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
  
  const projects = useMemo<ProjectPoint[]>(() => getProjects(currentLang), [currentLang])

  useEffect(() => {
    let maplibregl: any
    
    const initMap = async () => {
      try {
        // Dynamic import to avoid SSR issues
        maplibregl = (await import("maplibre-gl")).default
        await import("maplibre-gl/dist/maplibre-gl.css")
        
        if (!mapRef.current || mapInstance.current) return

        const map = new maplibregl.Map({
          container: mapRef.current,
          style: {
            version: 8,
            sources: {
              "osm": {
                type: "raster",
                tiles: [
                  "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
                  "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
                  "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
                ],
                tileSize: 256,
                attribution: "© OpenStreetMap contributors"
              },
              "esri-satellite": {
                type: "raster",
                tiles: [
                  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
                  "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                ],
                tileSize: 256,
                attribution: "© Esri — Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community"
              },
              "esri-labels": {
                type: "raster",
                tiles: [
                  "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
                  "https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
                ],
                tileSize: 256,
                attribution: "© Esri"
              }
            },
            layers: [
              {
                id: "osm",
                type: "raster",
                source: "osm"
              },
              {
                id: "esri-satellite",
                type: "raster",
                source: "esri-satellite",
                paint: {
                  "raster-opacity": 0
                }
              },
              {
                id: "esri-labels",
                type: "raster",
                source: "esri-labels",
                paint: {
                  "raster-opacity": 0
                }
              }
            ]
          },
          center: [39.6, 24.47],
          zoom: 11,
          attributionControl: false,
          interactive: true,
        })

        map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right")
        map.addControl(new maplibregl.ScaleControl({ unit: "metric" }))
        
        // Add custom CSS for popup styling
        const style = document.createElement('style')
        style.textContent = `
          .project-popup {
            z-index: 10000 !important;
          }
          .project-popup .maplibregl-popup-content {
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            border: 1px solid #e5e7eb;
          }
          .project-popup .maplibregl-popup-tip {
            border-top-color: #e5e7eb;
          }
        `
        document.head.appendChild(style)
        
        // Add directional pan controls
        const panControl = document.createElement("div")
        panControl.className = "maplibregl-ctrl maplibregl-ctrl-group"
        panControl.style.cssText = `
          position: absolute;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          width: 90px;
          height: 90px;
        `
        
        // Create pan buttons
        const createPanButton = (direction: string, icon: string, x: number, y: number) => {
          const button = document.createElement("button")
          button.className = "maplibregl-ctrl-icon"
          button.style.cssText = `
            width: 28px;
            height: 28px;
            background: white;
            border: 1px solid #ccc;
            border-radius: 4px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            grid-column: ${x};
            grid-row: ${y};
            transition: all 0.2s;
          `
          button.innerHTML = icon
          button.title = getLocalizedText(currentLang, `Pan ${direction}`, `تمرير ${direction}`)
          
          button.addEventListener("click", () => {
            const panDistance = 100 // pixels
            const center = map.getCenter()
            const zoom = map.getZoom()
            const pixelRatio = Math.pow(2, zoom - 10) // approximate
            
            let newLng = center.lng
            let newLat = center.lat
            
            switch (direction) {
              case "up":
                newLat += (panDistance * pixelRatio) / 111320 // convert to degrees
                break
              case "down":
                newLat -= (panDistance * pixelRatio) / 111320
                break
              case "left":
                newLng -= (panDistance * pixelRatio) / (111320 * Math.cos(center.lat * Math.PI / 180))
                break
              case "right":
                newLng += (panDistance * pixelRatio) / (111320 * Math.cos(center.lat * Math.PI / 180))
                break
            }
            
            map.panTo([newLng, newLat], { duration: 300 })
          })
          
          button.addEventListener("mouseenter", () => {
            button.style.background = "#f3f4f6"
            button.style.transform = "scale(1.05)"
          })
          
          button.addEventListener("mouseleave", () => {
            button.style.background = "white"
            button.style.transform = "scale(1)"
          })
          
          return button
        }
        
        // Add pan buttons in cross pattern
        panControl.appendChild(createPanButton("up", "↑", 2, 1))
        panControl.appendChild(createPanButton("left", "←", 1, 2))
        panControl.appendChild(createPanButton("right", "→", 3, 2))
        panControl.appendChild(createPanButton("down", "↓", 2, 3))
        
        map.getContainer().appendChild(panControl)
        
        // Force enable all interactions with defensive fallbacks
        map.dragPan.enable()
        map.scrollZoom.enable()
        map.boxZoom.enable()
        map.doubleClickZoom.enable()
        map.keyboard.enable()
        map.touchZoomRotate.enable()
        
        // Defensive fallback: force pointer events on map container and canvas
        try {
          const container = map.getContainer()
          const canvas = map.getCanvas()
          container.style.pointerEvents = "auto"
          canvas.style.pointerEvents = "auto"
          
          // Ensure cursor feedback
          canvas.style.cursor = "grab"
          map.on("dragstart", () => { canvas.style.cursor = "grabbing" })
          map.on("dragend", () => { canvas.style.cursor = "grab" })
        } catch (e) {
          console.warn("Could not set map pointer events:", e)
        }
        
        // Add debug logging
        console.log("Map interactions enabled:", {
          dragPan: map.dragPan.isEnabled(),
          scrollZoom: map.scrollZoom.isEnabled(),
          boxZoom: map.boxZoom.isEnabled(),
          doubleClickZoom: map.doubleClickZoom.isEnabled(),
          keyboard: map.keyboard.isEnabled(),
          touchZoomRotate: map.touchZoomRotate.isEnabled()
        })

        map.on("load", () => {
          setIsLoading(false)
          // Ensure correct layer ordering (imagery below labels)
          try {
            if (map.getLayer("esri-satellite") && map.getLayer("esri-labels")) {
              map.moveLayer("esri-satellite", "esri-labels")
            }
          } catch (e) {
            console.warn("Layer order adjustment failed:", e)
          }
          // Initial style is street by default; subsequent changes handled by effect
          
          // Add simple project markers
          for (const p of projects) {
            const el = document.createElement("div")
            // Ensure marker element is clickable and doesn't interfere with map
            el.style.pointerEvents = "auto"
            el.style.cursor = "pointer"
            el.style.zIndex = "1000"
            el.style.cssText = `
              width: 16px;
              height: 16px;
              border-radius: 50%;
              border: 2px solid white;
              cursor: pointer;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
              pointer-events: auto;
              z-index: 1000;
            `
            
            // Set color based on status
            if (p.status === "critical") {
              el.style.backgroundColor = "#ef4444"
            } else if (p.status === "delayed") {
              el.style.backgroundColor = "#eab308"
            } else {
              el.style.backgroundColor = "#22c55e"
            }
            
            const marker = new maplibregl.Marker({ element: el })
              .setLngLat([p.lng, p.lat])
              .setPopup(
                new maplibregl.Popup({ 
                  closeButton: false, 
                  offset: 20,
                  className: "project-popup"
                }).setHTML(
                  `<div dir="${currentLang === "ar" ? "rtl" : "ltr"}" style="min-width: 220px; padding: 8px;">
                    <img src="${p.image}" alt="${getLocalizedText(currentLang, "Project image", "صورة المشروع")}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 6px; margin-bottom: 8px;" />
                    <div style="font-weight: 600; margin-bottom: 8px; font-size: 14px; color: #1f2937;">${p.name}</div>
                    <div style="margin-bottom: 6px; font-size: 12px; color: #6b7280;">
                      <strong>${getLocalizedText(currentLang, "Company", "الشركة")}:</strong> ${p.company}
                    </div>
                    <div style="margin-bottom: 6px; font-size: 12px; color: #6b7280;">
                      <strong>${getLocalizedText(currentLang, "Completion", "نسبة الإنجاز")}:</strong> ${p.completion}%
                    </div>
                    <div style="margin-bottom: 6px; font-size: 12px; color: #6b7280;">
                      <strong>${getLocalizedText(currentLang, "Last Update", "آخر تحديث")}:</strong> ${p.lastUpdate}
                    </div>
                    <div style="font-size: 12px; font-weight: 500; padding: 4px 8px; border-radius: 4px; display: inline-block; background: ${p.status === "critical" ? "#fef2f2" : p.status === "delayed" ? "#fffbeb" : "#f0fdf4"}; color: ${p.status === "critical" ? "#dc2626" : p.status === "delayed" ? "#d97706" : "#16a34a"}; border: 1px solid ${p.status === "critical" ? "#fecaca" : p.status === "delayed" ? "#fed7aa" : "#bbf7d0"};">
                      ${getLocalizedText(currentLang, p.status.replace('-', ' '), p.status === "on-track" ? "على المسار الصحيح" : p.status === "delayed" ? "متأخر" : "حرج")}
                    </div>
                  </div>`
                )
              )
              .addTo(map)
              
            // Show popup on hover
            el.addEventListener("mouseenter", () => {
              if (!marker.getPopup().isOpen()) {
                marker.togglePopup()
              }
            })
            el.addEventListener("mouseleave", () => {
              if (marker.getPopup().isOpen()) {
                marker.togglePopup()
              }
            })
            
            // Add click handler with defensive event handling
            el.addEventListener("click", (e) => {
              e.preventDefault()
              e.stopPropagation()
              console.log("Marker clicked:", p.name)
              // You can add your click logic here
            })
            
            // Prevent marker from stealing map events
            el.addEventListener("pointerdown", (e) => {
              e.stopPropagation()
            })
          }
          // Ensure the map fits its container after all DOM changes
          try { map.resize() } catch {}
        })

        map.on("error", (e: unknown) => {
          console.error("Map error:", e)
          setError("Failed to load map")
          setIsLoading(false)
        })

        // Observe container resizes to avoid cutoff
        try {
          const containerEl = mapRef.current
          if (containerEl && typeof ResizeObserver !== 'undefined') {
            const resizeObserver = new ResizeObserver(() => {
              try { map.resize() } catch {}
            })
            resizeObserver.observe(containerEl)
            ;(map as any)._resizeObserver = resizeObserver
          }
        } catch {}

        // Window resize fallback
        const handleWindowResize = () => { try { map.resize() } catch {} }
        window.addEventListener('resize', handleWindowResize)
        ;(map as any)._windowResizeHandler = handleWindowResize

        mapInstance.current = map
      } catch (err) {
        console.error("Map initialization error:", err)
        setError("Failed to initialize map")
        setIsLoading(false)
      }
    }

    initMap()

    return () => {
      if (mapInstance.current) {
        try {
          const m = mapInstance.current
          if ((m as any)._resizeObserver) {
            try { (m as any)._resizeObserver.disconnect() } catch {}
          }
          if ((m as any)._windowResizeHandler) {
            try { window.removeEventListener('resize', (m as any)._windowResizeHandler) } catch {}
          }
          m.remove()
        } finally {
          mapInstance.current = null
        }
      }
    }
  }, [currentLang, projects])

  // Function to switch between map styles
  const switchMapStyle = (style: "street" | "satellite") => {
    if (!mapInstance.current) return
    const map = mapInstance.current

    const apply = () => {
      const showSatellite = style === "satellite"
      if (map.getLayer("osm")) {
        map.setLayoutProperty("osm", "visibility", showSatellite ? "none" : "visible")
        map.setPaintProperty("osm", "raster-opacity", showSatellite ? 0 : 1)
      }
      if (map.getLayer("esri-satellite")) {
        map.setLayoutProperty("esri-satellite", "visibility", showSatellite ? "visible" : "none")
        map.setPaintProperty("esri-satellite", "raster-opacity", showSatellite ? 1 : 0)
      }
      if (map.getLayer("esri-labels")) {
        // Hide labels overlay in satellite to avoid opaque reference tiles covering imagery
        map.setLayoutProperty("esri-labels", "visibility", showSatellite ? "none" : "none")
        map.setPaintProperty("esri-labels", "raster-opacity", 0)
      }
      console.debug("Switched map style", { style, showSatellite })
      try { map.resize() } catch {}
    }

    if (map.isStyleLoaded()) apply()
    else map.once("load", apply)
  }

  // Effect to switch map style when activeTab changes
  useEffect(() => {
    if (mapInstance.current) {
      switchMapStyle(activeTab)
    }
  }, [activeTab])

  if (error) {
    return (
      <Card className="overflow-hidden border bg-card shadow-sm h-[640px] flex flex-col">
        <CardHeader>
          <CardTitle>
            {getLocalizedText(currentLang, "Projects Map", "خريطة المشاريع")}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 w-full items-center justify-center bg-muted text-muted-foreground">
          <div className="text-center">
            <p>{getLocalizedText(currentLang, "Map failed to load", "فشل في تحميل الخريطة")}</p>
            <p className="text-sm">{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <Card className="overflow-hidden border bg-card shadow-sm h-[640px] flex flex-col">
      <CardHeader>
        <CardTitle>
          {getLocalizedText(currentLang, "Projects Map", "خريطة المشاريع")}
        </CardTitle>
      </CardHeader>
             <CardContent className="relative p-0 flex-1 min-h-0" style={{ pointerEvents: 'auto' }}>
         <Tabs value={activeTab} onValueChange={(value: string) => {
           if (value === "street" || value === "satellite") {
             setActiveTab(value)
           }
          }} className="w-full h-full" style={{ pointerEvents: 'auto' }}>
            <TabsList className="absolute top-4 left-4 z-20 bg-white shadow-lg border border-gray-200 rounded-lg p-1">
             <TabsTrigger value="street" className="text-sm px-4 py-2 font-medium data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=inactive]:text-gray-700 data-[state=inactive]:hover:text-green-600 transition-colors flex items-center gap-2">
               <MapPin className="w-4 h-4" />
               {getLocalizedText(currentLang, "Street", "الشارع")}
             </TabsTrigger>
             <TabsTrigger value="satellite" className="text-sm px-4 py-2 font-medium data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=inactive]:text-gray-700 data-[state=inactive]:hover:text-green-600 transition-colors flex items-center gap-2">
               <Satellite className="w-4 h-4" />
               {getLocalizedText(currentLang, "Satellite", "الأقمار الصناعية")}
             </TabsTrigger>
           </TabsList>
            <div className="relative h-full min-h-0" style={{ pointerEvents: 'auto' }}>
              <div ref={mapRef} className="h-full w-full cursor-grab active:cursor-grabbing" style={{ pointerEvents: 'auto', userSelect: 'none' }} />
             {isLoading && (
               <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                 <div className="text-sm text-muted-foreground">{getLocalizedText(currentLang, "Loading map...", "جاري تحميل الخريطة...")}</div>
               </div>
             )}
           </div>
         </Tabs>
       </CardContent>
    </Card>
  )
}


