import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Users, TrendingUp, Calendar, Heart, Reply } from "lucide-react"

export default function CommunityPage() {
  const discussions = [
    {
      id: 1,
      title: "Best approach for solving Two Pointer problems?",
      author: "Alex Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      category: "Algorithms",
      replies: 23,
      likes: 45,
      timeAgo: "2 hours ago",
      tags: ["Two Pointers", "Arrays", "Beginner"],
    },
    {
      id: 2,
      title: "System Design: How to handle millions of concurrent users?",
      author: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      category: "System Design",
      replies: 18,
      likes: 67,
      timeAgo: "5 hours ago",
      tags: ["System Design", "Scalability", "Advanced"],
    },
    {
      id: 3,
      title: "Dynamic Programming patterns everyone should know",
      author: "Mike Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      category: "Dynamic Programming",
      replies: 31,
      likes: 89,
      timeAgo: "1 day ago",
      tags: ["DP", "Patterns", "Intermediate"],
    },
  ]

  const events = [
    {
      title: "Weekly Coding Contest",
      date: "Every Saturday",
      time: "2:00 PM UTC",
      participants: 1250,
    },
    {
      title: "System Design Workshop",
      date: "March 15, 2024",
      time: "6:00 PM UTC",
      participants: 450,
    },
    {
      title: "Mock Interview Session",
      date: "March 20, 2024",
      time: "4:00 PM UTC",
      participants: 200,
    },
  ]

  const stats = [
    { label: "Active Members", value: "15,234", icon: <Users className="h-5 w-5" /> },
    { label: "Discussions", value: "2,456", icon: <MessageSquare className="h-5 w-5" /> },
    { label: "Problems Solved", value: "45,678", icon: <TrendingUp className="h-5 w-5" /> },
    { label: "Events This Month", value: "12", icon: <Calendar className="h-5 w-5" /> },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Community</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with fellow programmers, share knowledge, and grow together
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center mb-2 text-primary">{stat.icon}</div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Discussions Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-foreground">Recent Discussions</h2>
                <Button>Start Discussion</Button>
              </div>

              <div className="space-y-4">
                {discussions.map((discussion) => (
                  <Card key={discussion.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarImage src={discussion.avatar || "/placeholder.svg"} alt={discussion.author} />
                          <AvatarFallback>
                            {discussion.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary">{discussion.category}</Badge>
                            <span className="text-sm text-muted-foreground">{discussion.timeAgo}</span>
                          </div>
                          <CardTitle className="text-lg hover:text-primary transition-colors">
                            {discussion.title}
                          </CardTitle>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>by {discussion.author}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {discussion.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Reply className="h-4 w-4" />
                          <span>{discussion.replies} replies</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4" />
                          <span>{discussion.likes} likes</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Events Sidebar */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Upcoming Events</h2>
              <div className="space-y-4">
                {events.map((event, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <CardDescription>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="text-sm">{event.time}</div>
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span>{event.participants} participants</span>
                          </div>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full bg-transparent" variant="outline">
                        Join Event
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
