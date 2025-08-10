import { cookies } from "next/headers"
import ProjectsPageClient from "./ProjectsPageClient"

export default async function ProjectsPage() {
  const cookieStore = await cookies()
  const cookieLang = cookieStore.get("app-lang")?.value
  const initialLang = (cookieLang || "ar") as "en" | "ar"

  return <ProjectsPageClient initialLang={initialLang} />
}
