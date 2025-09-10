import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock, MemoryStick, Loader2, AlertTriangle } from "lucide-react"

interface TestResult {
  passed: boolean
  input: string
  output: string
  expected: string
  executionTime?: number
  memoryUsage?: number
  status?: string
  error?: string
}

interface Results {
  status: string
  testResults: TestResult[]
  runtime?: string
  memory?: string
  submission?: boolean
  passedTests?: number
  totalTests?: number
  error?: string
}

interface ResultsPanelProps {
  results: Results | null
  isRunning: boolean
}

export function ResultsPanel({ results, isRunning }: ResultsPanelProps) {
  if (isRunning) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Running your code...</p>
        </div>
      </div>
    )
  }

  if (!results) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-muted-foreground">Run your code to see results here</p>
        </div>
      </div>
    )
  }

  if (results.error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <AlertTriangle className="h-8 w-8 mx-auto mb-4 text-destructive" />
          <p className="text-destructive font-medium">Execution Error</p>
          <p className="text-muted-foreground text-sm mt-2">{results.error}</p>
        </div>
      </div>
    )
  }

  const passedTests = results.passedTests ?? results.testResults.filter((test) => test.passed).length
  const totalTests = results.totalTests ?? results.testResults.length

  const getStatusBadge = () => {
    switch (results.status) {
      case "accepted":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Accepted
          </Badge>
        )
      case "partial":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Partial
          </Badge>
        )
      case "success":
        return <Badge className="bg-blue-100 text-blue-800">Test Run Complete</Badge>
      default:
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Failed
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-4 h-full overflow-y-auto">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold">Results</h3>
          {getStatusBadge()}
        </div>

        <div className="text-sm text-muted-foreground">
          {passedTests}/{totalTests} tests passed
        </div>
      </div>

      {/* Performance Stats */}
      {results.runtime && results.memory && (
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            Runtime: {results.runtime}
          </div>
          <div className="flex items-center">
            <MemoryStick className="h-4 w-4 mr-1" />
            Memory: {results.memory}
          </div>
        </div>
      )}

      {/* Test Results */}
      <div className="space-y-3">
        {results.testResults.map((test, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <h4 className="font-medium flex items-center">
                Test Case {index + 1}
                {test.passed ? (
                  <CheckCircle className="h-4 w-4 ml-2 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 ml-2 text-red-600" />
                )}
              </h4>
              <div className="flex items-center space-x-2">
                <Badge variant={test.passed ? "default" : "destructive"}>
                  {test.status || (test.passed ? "Passed" : "Failed")}
                </Badge>
                {test.executionTime !== undefined && (
                  <span className="text-xs text-muted-foreground">{Math.round(test.executionTime)}ms</span>
                )}
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-muted-foreground">Input:</span>
                <div className="mt-1 p-2 bg-muted/50 rounded font-mono">{test.input}</div>
              </div>

              <div>
                <span className="font-medium text-muted-foreground">Your Output:</span>
                <div
                  className={`mt-1 p-2 rounded font-mono ${
                    test.passed ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                  }`}
                >
                  {test.output || "No output"}
                </div>
              </div>

              <div>
                <span className="font-medium text-muted-foreground">Expected:</span>
                <div className="mt-1 p-2 bg-muted/50 rounded font-mono">{test.expected}</div>
              </div>

              {test.error && (
                <div>
                  <span className="font-medium text-destructive">Error:</span>
                  <div className="mt-1 p-2 bg-red-50 text-red-800 rounded font-mono text-xs">{test.error}</div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
