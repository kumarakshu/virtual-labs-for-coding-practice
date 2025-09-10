"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, XCircle, Search, Filter } from "lucide-react"
import Link from "next/link"

interface Problem {
  id: number
  title: string
  difficulty: string
  category: string
  description: string
  solved?: boolean
}

export function ProblemsPage() {
  const [problems, setProblems] = useState<Problem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  useEffect(() => {
    fetchProblems()
  }, [difficultyFilter, categoryFilter])

  const fetchProblems = async () => {
    try {
      const params = new URLSearchParams()
      if (difficultyFilter !== "all") params.append("difficulty", difficultyFilter)
      if (categoryFilter !== "all") params.append("category", categoryFilter)

      const response = await fetch(`/api/problems?${params}`)
      const data = await response.json()
      setProblems(data.problems || [])
    } catch (error) {
      console.error("Failed to fetch problems:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProblems = problems.filter((problem) => problem.title.toLowerCase().includes(searchTerm.toLowerCase()))

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case "Hard":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-3/4"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Problems</h1>
        <p className="text-muted-foreground max-w-2xl">
          Practice coding problems to improve your skills. Start with easy problems and work your way up to more
          challenging ones.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search problems..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Difficulties</SelectItem>
            <SelectItem value="Easy">Easy</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Hard">Hard</SelectItem>
          </SelectContent>
        </Select>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Array">Array</SelectItem>
            <SelectItem value="String">String</SelectItem>
            <SelectItem value="Linked List">Linked List</SelectItem>
            <SelectItem value="Tree">Tree</SelectItem>
            <SelectItem value="Graph">Graph</SelectItem>
            <SelectItem value="Dynamic Programming">Dynamic Programming</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={() => fetchProblems()}>
          <Filter className="h-4 w-4 mr-2" />
          Apply
        </Button>
      </div>

      {/* Problems List */}
      <div className="space-y-4">
        {filteredProblems.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No problems found matching your criteria.</p>
          </Card>
        ) : (
          filteredProblems.map((problem) => (
            <Card key={problem.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="flex items-center justify-center w-8 h-8">
                    {problem.solved ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-gray-400" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-lg">{problem.title}</h3>
                      <Badge variant="secondary" className={getDifficultyColor(problem.difficulty)}>
                        {problem.difficulty}
                      </Badge>
                      <Badge variant="outline">{problem.category}</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-2">{problem.description}</p>
                  </div>
                </div>

                <div className="ml-4">
                  <Link href={`/problem/${problem.id}`}>
                    <Button variant={problem.solved ? "outline" : "default"}>
                      {problem.solved ? "Review" : "Solve"}
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
