import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

const problems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    solved: true,
    timeLimit: "1s",
    description: "Find two numbers in an array that add up to a target sum.",
  },
  {
    id: 2,
    title: "Reverse Linked List",
    difficulty: "Easy",
    category: "Linked List",
    solved: false,
    timeLimit: "1s",
    description: "Reverse a singly linked list iteratively or recursively.",
  },
  {
    id: 3,
    title: "Binary Tree Inorder Traversal",
    difficulty: "Medium",
    category: "Tree",
    solved: true,
    timeLimit: "1s",
    description: "Return the inorder traversal of a binary tree's node values.",
  },
  {
    id: 4,
    title: "Merge Intervals",
    difficulty: "Medium",
    category: "Array",
    solved: false,
    timeLimit: "1s",
    description: "Merge all overlapping intervals and return non-overlapping intervals.",
  },
  {
    id: 5,
    title: "Word Ladder",
    difficulty: "Hard",
    category: "Graph",
    solved: false,
    timeLimit: "2s",
    description: "Find the shortest transformation sequence from start word to end word.",
  },
  {
    id: 6,
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    solved: true,
    timeLimit: "1s",
    description: "Determine if the input string has valid parentheses.",
  },
]

export function ProblemsList() {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:hover:bg-yellow-900/50"
      case "Hard":
        return "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Practice Problems</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose from our curated collection of coding problems. Start with easy problems and work your way up to more
            challenging ones.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {problems.map((problem) => (
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
                    <p className="text-muted-foreground text-sm mb-2">{problem.description}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      Time limit: {problem.timeLimit}
                    </div>
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
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Problems
          </Button>
        </div>
      </div>
    </section>
  )
}
