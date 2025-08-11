"use client"

import { IconBrain, IconExclamationCircle, IconSparkles } from "@tabler/icons-react"
import { useEffect, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Helper function to get localized text
const getLocalizedText = (lang: string, enText: string, arText: string) => {
  return lang === "ar" ? arText : enText
}

const getInsights = (lang: string) => [
  {
    title: getLocalizedText(lang, "Schedule risk rising in Quba district", "تزايد مخاطر الجدولة في منطقة قباء"),
    detail:
      getLocalizedText(lang, "Road resurfacing projects show 18% slippage, mainly due to contractor crew shortages. Recommend reallocating crew from Zone 4 for 2 weeks.", "تظهر مشاريع إعادة تبليط الطرق انزلاقاً بنسبة 18%، يعود ذلك أساساً إلى نقص طاقم المقاولين. يُوصى بإعادة تخصيص الطاقم من المنطقة 4 لمدة أسبوعين."),
    impact: "medium",
  },
  {
    title: getLocalizedText(lang, "Budget anomaly detected in stormwater program", "اكتشاف تفاوت في الميزانيه في برنامج مياه الامطار"),
    detail:
      getLocalizedText(lang, "Procurement invoices increased 27% WoW without matching progress. Flag vendor audit for contract SW-214.", "زادت فواتير المشتريات بنسبة 27% أسبوعياً دون تطابق في التقدم. وضع علامة على مراجعة المورد للعقد SW-214."),
    impact: "high",
  },
  {
    title: getLocalizedText(lang, "Materials delay easing", "تخفيف تأخير المواد"),
    detail:
      getLocalizedText(lang, "Cement delivery lead time dropped from 9 to 6 days. Unlocks 3 stalled sites in Yanbu corridor.", "انخفض زمن تسليم الأسمنت من 9 إلى 6 أيام. يحرر 3 مواقع متوقفة في ممر ينبع."),
    impact: "low",
  },
]

export function AIInsights() {
  const [currentLang, setCurrentLang] = useState("en")
  
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
  
  const insights = getInsights(currentLang)
  
  return (
    <Card className="border bg-card shadow-sm h-[520px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconBrain className="text-muted-foreground" /> 
          {getLocalizedText(currentLang, "AI Insights", "رؤى الذكاء الاصطناعي")}
          <Badge variant="secondary" className="ml-auto">
            {getLocalizedText(currentLang, "Live", "مباشر")}
          </Badge>
        </CardTitle>
        <CardDescription>
          {getLocalizedText(currentLang, "Predicted risks and suggested mitigations", "المخاطر المتوقعة والحلول المقترحة")}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1 overflow-y-auto">
        {insights.map((item, idx) => (
          <div key={idx} className="grid gap-1.5">
            <div className="flex items-center gap-2">
              <IconSparkles className="text-muted-foreground" />
              <div className="font-medium">{item.title}</div>
              <Badge variant="outline" className="ml-auto capitalize">
                {getLocalizedText(currentLang, `${item.impact} impact`, `تأثير ${item.impact === "high" ? "عالي" : item.impact === "medium" ? "متوسط" : "منخفض"}`)}
              </Badge>
            </div>
            <div className="text-muted-foreground text-sm leading-relaxed">
              {item.detail}
            </div>
            {idx < insights.length - 1 && <Separator className="my-2" />}
          </div>
        ))}
        <div className="text-muted-foreground flex items-center gap-2 text-xs">
          <IconExclamationCircle className="size-3" />
          {getLocalizedText(currentLang, "Predictions are advisory and based on recent performance data.", "التنبؤات استشارية ومبنية على بيانات الأداء الحديثة.")}
        </div>
      </CardContent>
    </Card>
  )
}


