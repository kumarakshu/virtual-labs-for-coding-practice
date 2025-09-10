import { type NextRequest, NextResponse } from "next/server"

// Judge0 API configuration
const JUDGE0_API_URL = process.env.JUDGE0_API_URL || "https://judge0-ce.p.rapidapi.com"
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY || ""

// Language ID mapping for Judge0
const LANGUAGE_IDS = {
  javascript: 63, // Node.js
  python: 71, // Python 3
  java: 62, // Java
  cpp: 54, // C++17
  c: 50, // C
  csharp: 51, // C#
  go: 60, // Go
  rust: 73, // Rust
  php: 68, // PHP
  ruby: 72, // Ruby
}

interface ExecutionRequest {
  language: string
  code: string
  input?: string
  expectedOutput?: string
}

interface TestCase {
  input: string
  expectedOutput: string
}

interface ExecuteCodeRequest {
  problemId: number
  language: string
  code: string
  testCases: TestCase[]
  isSubmission?: boolean
}

async function submitToJudge0(languageId: number, code: string, input = "") {
  try {
    const response = await fetch(`${JUDGE0_API_URL}/submissions?base64_encoded=false&wait=true`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": JUDGE0_API_KEY,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      body: JSON.stringify({
        language_id: languageId,
        source_code: code,
        stdin: input,
        expected_output: null,
      }),
    })

    if (!response.ok) {
      throw new Error(`Judge0 API error: ${response.status}`)
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error("Judge0 submission error:", error)
    throw error
  }
}

function parseOutput(output: string): string {
  if (!output) return ""
  // Remove trailing newlines and normalize output
  return output.trim()
}

function compareOutputs(actual: string, expected: string): boolean {
  const normalizedActual = parseOutput(actual)
  const normalizedExpected = parseOutput(expected)
  return normalizedActual === normalizedExpected
}

export async function POST(request: NextRequest) {
  try {
    const body: ExecuteCodeRequest = await request.json()
    const { problemId, language, code, testCases, isSubmission = false } = body

    // Validate input
    if (!language || !code || !testCases || testCases.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const languageId = LANGUAGE_IDS[language as keyof typeof LANGUAGE_IDS]
    if (!languageId) {
      return NextResponse.json({ error: "Unsupported language" }, { status: 400 })
    }

    // If Judge0 API key is not configured, return mock results
    if (!JUDGE0_API_KEY) {
      console.warn("Judge0 API key not configured, returning mock results")
      return NextResponse.json({
        status: "success",
        results: testCases.map((testCase, index) => ({
          testCaseIndex: index,
          passed: index < Math.floor(testCases.length * 0.7), // 70% pass rate for demo
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput: index < Math.floor(testCases.length * 0.7) ? testCase.expectedOutput : "Wrong output",
          executionTime: Math.floor(Math.random() * 100) + 10,
          memoryUsage: Math.floor(Math.random() * 1000) + 500,
          status: index < Math.floor(testCases.length * 0.7) ? "Accepted" : "Wrong Answer",
        })),
        overallStatus: "Partial",
        passedTests: Math.floor(testCases.length * 0.7),
        totalTests: testCases.length,
        averageTime: 45,
        averageMemory: 750,
      })
    }

    // Execute code against each test case
    const results = []
    let passedTests = 0
    let totalExecutionTime = 0
    let totalMemoryUsage = 0

    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i]

      try {
        const submission = await submitToJudge0(languageId, code, testCase.input)

        const passed = submission.status?.id === 3 && compareOutputs(submission.stdout || "", testCase.expectedOutput)

        if (passed) passedTests++

        const result = {
          testCaseIndex: i,
          passed,
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput: submission.stdout || submission.stderr || "",
          executionTime: Number.parseFloat(submission.time || "0") * 1000, // Convert to ms
          memoryUsage: Number.parseInt(submission.memory || "0"), // KB
          status: getStatusText(submission.status?.id, passed),
          error: submission.stderr || null,
        }

        results.push(result)
        totalExecutionTime += result.executionTime
        totalMemoryUsage += result.memoryUsage

        // For submissions, stop on first failure to save resources
        if (isSubmission && !passed) {
          break
        }
      } catch (error) {
        results.push({
          testCaseIndex: i,
          passed: false,
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput: "",
          executionTime: 0,
          memoryUsage: 0,
          status: "Runtime Error",
          error: "Execution failed",
        })
      }
    }

    // Determine overall status
    let overallStatus = "Accepted"
    if (passedTests === 0) {
      overallStatus = "Wrong Answer"
    } else if (passedTests < testCases.length) {
      overallStatus = "Partial"
    }

    // Save submission to database if it's a submission
    if (isSubmission) {
      // In real app, save to submissions table
      console.log("Saving submission:", {
        problemId,
        language,
        status: overallStatus,
        passedTests,
        totalTests: testCases.length,
      })
    }

    return NextResponse.json({
      status: "success",
      results,
      overallStatus,
      passedTests,
      totalTests: testCases.length,
      averageTime: results.length > 0 ? totalExecutionTime / results.length : 0,
      averageMemory: results.length > 0 ? totalMemoryUsage / results.length : 0,
    })
  } catch (error) {
    console.error("Code execution error:", error)
    return NextResponse.json(
      {
        error: "Code execution failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

function getStatusText(statusId: number | undefined, passed: boolean): string {
  if (!statusId) return "Unknown"

  switch (statusId) {
    case 1:
      return "In Queue"
    case 2:
      return "Processing"
    case 3:
      return passed ? "Accepted" : "Wrong Answer"
    case 4:
      return "Wrong Answer"
    case 5:
      return "Time Limit Exceeded"
    case 6:
      return "Compilation Error"
    case 7:
      return "Runtime Error (SIGSEGV)"
    case 8:
      return "Runtime Error (SIGXFSZ)"
    case 9:
      return "Runtime Error (SIGFPE)"
    case 10:
      return "Runtime Error (SIGABRT)"
    case 11:
      return "Runtime Error (NZEC)"
    case 12:
      return "Runtime Error (Other)"
    case 13:
      return "Internal Error"
    case 14:
      return "Exec Format Error"
    default:
      return "Unknown Status"
  }
}
