"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProblemForm } from "@/components/problem-form"
import { Plus, Edit, Trash2, Eye, BarChart3 } from "lucide-react"
import Link from "next/link"

const mockProblems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    isActive: true,
    submissions: 1250,
    acceptanceRate: 68.5,
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    title: "Reverse Linked List",
    difficulty: "Easy",
    category: "Linked List",
    isActive: true,
    submissions: 890,
    acceptanceRate: 72.3,
    createdAt: "2024-01-16",
  },
  {
    id: 3,
    title: "Binary Tree Inorder Traversal",
    difficulty: "Medium",
    category: "Tree",
    isActive: true,
    submissions: 654,
    acceptanceRate: 45.2,
    createdAt: "2024-01-17",
  },
]

export function AdminDashboard() {
  const [showProblemForm, setShowProblemForm] = useState(false)
  const [editingProblem, setEditingProblem] = useState<any>(null)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleEditProblem = (problem: any) => {
    setEditingProblem(problem)
    setShowProblemForm(true)
  }

  const handleAddProblem = () => {
    setEditingProblem(null)
    setShowProblemForm(true)
  }

  const handleCloseProblemForm = () => {
    setShowProblemForm(false)
    setEditingProblem(null)
  }

  if (showProblemForm) {
    return <ProblemForm problem={editingProblem} onClose={handleCloseProblemForm} />
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage coding problems and monitor platform statistics</p>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Button variant="outline">Back to Platform</Button>
          </Link>
          <Button onClick={handleAddProblem}>
            <Plus className="h-4 w-4 mr-2" />
            Add Problem
          </Button>
        </div>
      </div>

      <Tabs defaultValue="problems" className="space-y-6">
        <TabsList>
          <TabsTrigger value="problems">Problems</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
        </TabsList>

        <TabsContent value="problems" className="space-y-6">
          {/* Statistics Cards */}
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Problems</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Easy Problems</p>
                  <p className="text-2xl font-bold text-green-600">12</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Medium Problems</p>
                  <p className="text-2xl font-bold text-yellow-600">8</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Hard Problems</p>
                  <p className="text-2xl font-bold text-red-600">4</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </Card>
          </div>

          {/* Problems List */}
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Problems Management</h2>
              <div className="space-y-4">
                {mockProblems.map((problem) => (
                  <div key={problem.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold">{problem.title}</h3>
                          <Badge className={getDifficultyColor(problem.difficulty)}>{problem.difficulty}</Badge>
                          <Badge variant="outline">{problem.category}</Badge>
                          {problem.isActive && <Badge className="bg-green-100 text-green-800">Active</Badge>}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{problem.submissions} submissions</span>
                          <span>{problem.acceptanceRate}% acceptance rate</span>
                          <span>Created: {problem.createdAt}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Link href={`/problem/${problem.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm" onClick={() => handleEditProblem(problem)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="statistics">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Platform Statistics</h2>
            <p className="text-muted-foreground">Detailed analytics and metrics will be displayed here.</p>
          </Card>
        </TabsContent>

        <TabsContent value="submissions">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Submissions</h2>
            <p className="text-muted-foreground">Recent user submissions and their status will be displayed here.</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
