"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award, TrendingUp, Calendar, Target } from "lucide-react"

const mockLeaderboardData = [
  {
    id: 1,
    name: "Akash Kumar", // replaced Alex Chen with Indian name
    avatar: "/diverse-user-avatars.png",
    totalSolved: 156,
    easySolved: 89,
    mediumSolved: 52,
    hardSolved: 15,
    totalSubmissions: 324,
    acceptanceRate: 68.2,
    streak: 23,
    lastActive: "2024-01-20",
    rank: 1,
    points: 2340,
  },
  {
    id: 2,
    name: "Priya Sharma", // replaced Sarah Johnson with Indian name
    avatar: "/female-developer.png",
    totalSolved: 142,
    easySolved: 78,
    mediumSolved: 48,
    hardSolved: 16,
    totalSubmissions: 298,
    acceptanceRate: 71.8,
    streak: 18,
    lastActive: "2024-01-20",
    rank: 2,
    points: 2180,
  },
  {
    id: 3,
    name: "Sandeep Singh", // replaced Mike Rodriguez with Indian name
    avatar: "/male-programmer.jpg",
    totalSolved: 134,
    easySolved: 82,
    mediumSolved: 41,
    hardSolved: 11,
    totalSubmissions: 267,
    acceptanceRate: 75.3,
    streak: 12,
    lastActive: "2024-01-19",
    rank: 3,
    points: 2050,
  },
  {
    id: 4,
    name: "Neha Gupta", // replaced Emily Davis with Indian name
    avatar: "/woman-coder.png",
    totalSolved: 128,
    easySolved: 76,
    mediumSolved: 38,
    hardSolved: 14,
    totalSubmissions: 245,
    acceptanceRate: 69.4,
    streak: 8,
    lastActive: "2024-01-20",
    rank: 4,
    points: 1980,
  },
  {
    id: 5,
    name: "Rahul Verma", // replaced David Kim with Indian name
    avatar: "/asian-developer.jpg",
    totalSolved: 119,
    easySolved: 71,
    mediumSolved: 35,
    hardSolved: 13,
    totalSubmissions: 223,
    acceptanceRate: 72.6,
    streak: 15,
    lastActive: "2024-01-19",
    rank: 5,
    points: 1890,
  },
]

export function Leaderboard() {
  const [activeTab, setActiveTab] = useState("overall")

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-600"
      case "medium":
        return "text-yellow-600"
      case "hard":
        return "text-red-600"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Leaderboard</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          See how you rank against other coders. Solve more problems to climb the leaderboard and earn achievements.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 max-w-md mx-auto">
          <TabsTrigger value="overall">Overall</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="streak">Streak</TabsTrigger>
        </TabsList>

        <TabsContent value="overall" className="space-y-6">
          {/* Top 3 Podium */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {mockLeaderboardData.slice(0, 3).map((user, index) => (
              <Card
                key={user.id}
                className={`p-6 text-center ${
                  index === 0 ? "ring-2 ring-yellow-500 bg-gradient-to-b from-yellow-50 to-background" : ""
                }`}
              >
                <div className="flex justify-center mb-4">{getRankIcon(user.rank)}</div>
                <Avatar className="h-16 w-16 mx-auto mb-4">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg mb-2">{user.name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-center items-center space-x-2">
                    <Target className="h-4 w-4 text-primary" />
                    <span>{user.totalSolved} problems solved</span>
                  </div>
                  <div className="flex justify-center items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span>{user.acceptanceRate}% acceptance rate</span>
                  </div>
                  <Badge variant="secondary" className="mt-2">
                    {user.points} points
                  </Badge>
                </div>
              </Card>
            ))}
          </div>

          {/* Full Leaderboard */}
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Full Rankings</h2>
              <div className="space-y-4">
                {mockLeaderboardData.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8">{getRankIcon(user.rank)}</div>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{user.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{user.totalSolved} solved</span>
                          <span>{user.acceptanceRate}% acceptance</span>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{user.streak} day streak</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <div className="flex space-x-2 text-sm">
                          <span className={getDifficultyColor("easy")}>{user.easySolved}E</span>
                          <span className={getDifficultyColor("medium")}>{user.mediumSolved}M</span>
                          <span className={getDifficultyColor("hard")}>{user.hardSolved}H</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="font-mono">
                        {user.points}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="weekly">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Weekly Rankings</h2>
            <p className="text-muted-foreground">Weekly leaderboard based on problems solved this week.</p>
          </Card>
        </TabsContent>

        <TabsContent value="monthly">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Monthly Rankings</h2>
            <p className="text-muted-foreground">Monthly leaderboard based on problems solved this month.</p>
          </Card>
        </TabsContent>

        <TabsContent value="streak">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Longest Streaks</h2>
            <p className="text-muted-foreground">Users with the longest daily coding streaks.</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
