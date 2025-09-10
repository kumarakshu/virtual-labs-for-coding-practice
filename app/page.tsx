import { Header } from "@/components/header"
import { ProblemsList } from "@/components/problems-list"
import { Hero } from "@/components/hero"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ProblemsList />
      </main>
    </div>
  )
}
