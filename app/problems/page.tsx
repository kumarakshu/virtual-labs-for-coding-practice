import { ProblemsPage } from "@/components/problems-page"
import { Header } from "@/components/header"

export default function Problems() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ProblemsPage />
      </main>
    </div>
  )
}
