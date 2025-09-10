import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Code, Video, FileText, Clock, Users } from "lucide-react"

export default function LearnPage() {
  const courses = [
    {
      id: 1,
      title: "Data Structures & Algorithms",
      description: "Master the fundamentals of DSA with interactive lessons and coding challenges.",
      level: "Beginner",
      duration: "8 weeks",
      students: 1234,
      topics: ["Arrays", "Linked Lists", "Trees", "Graphs", "Dynamic Programming"],
      icon: <Code className="h-6 w-6" />,
    },
    {
      id: 2,
      title: "System Design Fundamentals",
      description: "Learn how to design scalable systems and understand distributed architecture.",
      level: "Intermediate",
      duration: "6 weeks",
      students: 856,
      topics: ["Load Balancing", "Databases", "Caching", "Microservices", "API Design"],
      icon: <BookOpen className="h-6 w-6" />,
    },
    {
      id: 3,
      title: "Competitive Programming",
      description: "Enhance your problem-solving skills for coding competitions and interviews.",
      level: "Advanced",
      duration: "12 weeks",
      students: 567,
      topics: ["Graph Algorithms", "Number Theory", "Geometry", "String Algorithms"],
      icon: <Video className="h-6 w-6" />,
    },
  ]

  const resources = [
    {
      title: "Algorithm Visualizer",
      description: "Interactive visualizations of common algorithms",
      type: "Tool",
      icon: <Code className="h-5 w-5" />,
    },
    {
      title: "Coding Interview Guide",
      description: "Complete guide to ace your technical interviews",
      type: "Guide",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Practice Problems by Topic",
      description: "Curated problems organized by data structure and algorithm type",
      type: "Problems",
      icon: <BookOpen className="h-5 w-5" />,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Learn & Grow</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Master programming concepts with our structured courses and interactive learning materials
            </p>
          </div>

          {/* Courses Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Featured Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">{course.icon}</div>
                      <div>
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <Badge
                          variant={
                            course.level === "Beginner"
                              ? "secondary"
                              : course.level === "Intermediate"
                                ? "default"
                                : "destructive"
                          }
                        >
                          {course.level}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription>{course.description}</CardDescription>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{course.students} students</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {course.topics.slice(0, 3).map((topic) => (
                        <Badge key={topic} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                      {course.topics.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{course.topics.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <Button className="w-full">Start Learning</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Resources Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Learning Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {resources.map((resource, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">{resource.icon}</div>
                      <div>
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        <Badge variant="secondary">{resource.type}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
