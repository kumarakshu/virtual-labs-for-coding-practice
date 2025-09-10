"use client"

import { useSession } from "next-auth/react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Trophy, Target, TrendingUp, Code, Clock } from "lucide-react"

export function ProfilePage() {
  const { data: session } = useSession()

  if (!session) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Please sign in to view your profile.</p>
        </Card>
      </div>
    )
  }

  // Mock user stats - in real app, fetch from database
  const userStats = {
    totalSolved: 23,
    easySolved: 15,
    mediumSolved: 6,
    hardSolved: 2,
    totalSubmissions: 45,
    acceptanceRate: 68.9,
    currentStreak: 7,
    longestStreak: 12,
    rank: 156,
    points: 890,
  }

  const recentSubmissions = [
    {
      id: 1,
      problemTitle: "Two Sum",
      language: "JavaScript",
      status: "Accepted",
      runtime: "68ms",
      submittedAt: "2024-01-20T10:30:00Z",
    },
    {
      id: 2,
      problemTitle: "Valid Parentheses",
      language: "Python",
      status: "Wrong Answer",
      runtime: "-",
      submittedAt: "2024-01-19T15:45:00Z",
    },
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <Card className="p-8">
          <div className="flex items-center space-x-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
              <AvatarFallback className="text-2xl">
                {session.user?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("") || "U"}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{session.user?.name}</h1>
              <p className="text-muted-foreground mb-4">{session.user?.email}</p>

              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Trophy className="h-4 w-4 text-yellow-600" />
                  <span>Rank #{userStats.rank}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-primary" />
                  <span>{userStats.totalSolved} problems solved</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span>{userStats.acceptanceRate}% acceptance rate</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{userStats.points}</div>
              <div className="text-sm text-muted-foreground">points</div>
            </div>
          </div>
        </Card>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{userStats.easySolved}</div>
            <div className="text-sm text-muted-foreground">Easy Problems</div>
          </Card>

          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">{userStats.mediumSolved}</div>
            <div className="text-sm text-muted-foreground">Medium Problems</div>
          </Card>

          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">{userStats.hardSolved}</div>
            <div className="text-sm text-muted-foreground">Hard Problems</div>
          </Card>

          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">{userStats.currentStreak}</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </Card>
        </div>

        {/* Detailed Stats */}
        <Tabs defaultValue="submissions" className="space-y-6">
          <TabsList>
            <TabsTrigger value="submissions">Recent Submissions</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="submissions">
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Submissions</h2>
                <div className="space-y-4">
                  {recentSubmissions.map((submission) => (
                    <div key={submission.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Code className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h3 className="font-medium">{submission.problemTitle}</h3>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <span>{submission.language}</span>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>{new Date(submission.submittedAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        {submission.runtime !== "-" && (
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{submission.runtime}</span>
                          </div>
                        )}
                        <Badge
                          variant={submission.status === "Accepted" ? "default" : "destructive"}
                          className={submission.status === "Accepted" ? "bg-green-100 text-green-800" : ""}
                        >
                          {submission.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="progress">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Progress Overview</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Progress</span>
                    <span>{userStats.totalSolved}/100 problems</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(userStats.totalSolved / 100) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-2">Submission Stats</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Total Submissions:</span>
                        <span>{userStats.totalSubmissions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Acceptance Rate:</span>
                        <span>{userStats.acceptanceRate}%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Streak Stats</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Current Streak:</span>
                        <span>{userStats.currentStreak} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Longest Streak:</span>
                        <span>{userStats.longestStreak} days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="achievements">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Achievements</h2>
              <p className="text-muted-foreground">Achievement system coming soon!</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
