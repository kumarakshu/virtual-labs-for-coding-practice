"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CodeEditor } from "@/components/code-editor"
import { TestCases } from "@/components/test-cases"
import { ResultsPanel } from "@/components/results-panel"
import { ArrowLeft, Play, Send, RotateCcw } from "lucide-react"
import Link from "next/link"

interface Problem {
  id: number
  title: string
  difficulty: string
  category: string
  description: string
  examples: Array<{
    input: string
    output: string
    explanation: string
  }>
  constraints: string[]
  testCases: Array<{
    input: string
    expectedOutput: string
  }>
  starterCode: {
    [key: string]: string
  }
}

interface ProblemIDEProps {
  problem: Problem
}

export function ProblemIDE({ problem }: ProblemIDEProps) {
  const [selectedLanguage, setSelectedLanguage] = useState("javascript")
  const [code, setCode] = useState(problem.starterCode[selectedLanguage] || "")
  const [isRunning, setIsRunning] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("problem")

  const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
  ]

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

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
    setCode(problem.starterCode[language] || "")
  }

  const handleRunCode = async () => {
    setIsRunning(true)
    setActiveTab("results")

    try {
      const response = await fetch("/api/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          problemId: problem.id,
          language: selectedLanguage,
          code,
          testCases: problem.testCases.slice(0, 3), // Run first 3 test cases for testing
          isSubmission: false,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to execute code")
      }

      const result = await response.json()

      // Transform API response to match UI expectations
      setResults({
        status: result.overallStatus.toLowerCase(),
        testResults: result.results.map((r: any) => ({
          passed: r.passed,
          input: r.input,
          output: r.actualOutput,
          expected: r.expectedOutput,
          executionTime: r.executionTime,
          memoryUsage: r.memoryUsage,
          status: r.status,
          error: r.error,
        })),
        runtime: `${Math.round(result.averageTime)}ms`,
        memory: `${Math.round(result.averageMemory / 1024)}MB`,
        passedTests: result.passedTests,
        totalTests: result.totalTests,
      })
    } catch (error) {
      console.error("Code execution failed:", error)
      setResults({
        status: "error",
        testResults: [],
        error: "Failed to execute code. Please try again.",
      })
    } finally {
      setIsRunning(false)
    }
  }

  const handleSubmit = async () => {
    setIsRunning(true)
    setActiveTab("results")

    try {
      const response = await fetch("/api/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          problemId: problem.id,
          language: selectedLanguage,
          code,
          testCases: problem.testCases, // Run all test cases for submission
          isSubmission: true,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit code")
      }

      const result = await response.json()

      // Save submission record
      await fetch("/api/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          problemId: problem.id,
          language: selectedLanguage,
          code,
          status: result.overallStatus,
          runtime: Math.round(result.averageTime),
          memoryUsage: Math.round(result.averageMemory),
          testCasesPassed: result.passedTests,
          totalTestCases: result.totalTests,
        }),
      })

      // Transform API response to match UI expectations
      setResults({
        status: result.overallStatus.toLowerCase(),
        testResults: result.results.map((r: any) => ({
          passed: r.passed,
          input: r.input,
          output: r.actualOutput,
          expected: r.expectedOutput,
          executionTime: r.executionTime,
          memoryUsage: r.memoryUsage,
          status: r.status,
          error: r.error,
        })),
        runtime: `${Math.round(result.averageTime)}ms`,
        memory: `${Math.round(result.averageMemory / 1024)}MB`,
        passedTests: result.passedTests,
        totalTests: result.totalTests,
        submission: true,
      })
    } catch (error) {
      console.error("Code submission failed:", error)
      setResults({
        status: "error",
        testResults: [],
        error: "Failed to submit code. Please try again.",
      })
    } finally {
      setIsRunning(false)
    }
  }

  const handleReset = () => {
    setCode(problem.starterCode[selectedLanguage] || "")
    setResults(null)
  }

  return (
    <div className="flex h-screen">
      {/* Left Panel - Problem Description */}
      <div className="w-1/2 border-r bg-background overflow-hidden flex flex-col">
        <div className="p-4 border-b bg-muted/30">
          <div className="flex items-center justify-between mb-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Problems
              </Button>
            </Link>
          </div>

          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-2xl font-bold">{problem.title}</h1>
            <Badge className={getDifficultyColor(problem.difficulty)}>{problem.difficulty}</Badge>
            <Badge variant="outline">{problem.category}</Badge>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="prose prose-sm max-w-none">
            <div className="mb-6">
              <p className="text-foreground leading-relaxed whitespace-pre-line">{problem.description}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Examples</h3>
              {problem.examples.map((example, index) => (
                <div key={index} className="mb-4 p-4 bg-muted/50 rounded-lg">
                  <div className="mb-2">
                    <strong>Input:</strong> <code className="bg-muted px-2 py-1 rounded text-sm">{example.input}</code>
                  </div>
                  <div className="mb-2">
                    <strong>Output:</strong>{" "}
                    <code className="bg-muted px-2 py-1 rounded text-sm">{example.output}</code>
                  </div>
                  <div>
                    <strong>Explanation:</strong> {example.explanation}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Constraints</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                {problem.constraints.map((constraint, index) => (
                  <li key={index}>{constraint}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Code Editor */}
      <div className="w-1/2 flex flex-col">
        {/* Editor Header */}
        <div className="p-4 border-b bg-muted/30">
          <div className="flex items-center justify-between mb-4">
            <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button variant="outline" size="sm" onClick={handleRunCode} disabled={isRunning}>
                <Play className="h-4 w-4 mr-2" />
                {isRunning ? "Running..." : "Run"}
              </Button>
              <Button size="sm" onClick={handleSubmit} disabled={isRunning}>
                <Send className="h-4 w-4 mr-2" />
                {isRunning ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        </div>

        {/* Editor and Results */}
        <div className="flex-1 flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-3 mx-4 mt-4">
              <TabsTrigger value="problem">Code</TabsTrigger>
              <TabsTrigger value="testcases">Test Cases</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
            </TabsList>

            <TabsContent value="problem" className="flex-1 p-4">
              <CodeEditor language={selectedLanguage} value={code} onChange={setCode} className="h-full" />
            </TabsContent>

            <TabsContent value="testcases" className="flex-1 p-4">
              <TestCases testCases={problem.testCases} />
            </TabsContent>

            <TabsContent value="results" className="flex-1 p-4">
              <ResultsPanel results={results} isRunning={isRunning} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
