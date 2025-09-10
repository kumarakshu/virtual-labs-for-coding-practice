import { Leaderboard } from "@/components/leaderboard"
import { Header } from "@/components/header"

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <Leaderboard />
      </main>
    </div>
  )
}
