import { type NextRequest, NextResponse } from "next/server"

interface Submission {
  id: number
  problemId: number
  userId: string
  language: string
  code: string
  status: string
  runtime: number
  memoryUsage: number
  testCasesPassed: number
  totalTestCases: number
  submittedAt: string
}

// Mock submissions data - in real app, fetch from database
const mockSubmissions: Submission[] = [
  {
    id: 1,
    problemId: 1,
    userId: "user123",
    language: "javascript",
    code: "function twoSum(nums, target) { /* solution */ }",
    status: "Accepted",
    runtime: 68,
    memoryUsage: 42100,
    testCasesPassed: 3,
    totalTestCases: 3,
    submittedAt: new Date().toISOString(),
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const problemId = searchParams.get("problemId")
    const userId = searchParams.get("userId")
    const status = searchParams.get("status")

    let filteredSubmissions = mockSubmissions

    if (problemId) {
      filteredSubmissions = filteredSubmissions.filter((sub) => sub.problemId === Number.parseInt(problemId))
    }
    if (userId) {
      filteredSubmissions = filteredSubmissions.filter((sub) => sub.userId === userId)
    }
    if (status) {
      filteredSubmissions = filteredSubmissions.filter((sub) => sub.status === status)
    }

    return NextResponse.json({ submissions: filteredSubmissions })
  } catch (error) {
    console.error("Error fetching submissions:", error)
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { problemId, userId, language, code, status, runtime, memoryUsage, testCasesPassed, totalTestCases } = body

    const newSubmission: Submission = {
      id: mockSubmissions.length + 1,
      problemId,
      userId: userId || "anonymous",
      language,
      code,
      status,
      runtime,
      memoryUsage,
      testCasesPassed,
      totalTestCases,
      submittedAt: new Date().toISOString(),
    }

    mockSubmissions.push(newSubmission)

    return NextResponse.json({ submission: newSubmission }, { status: 201 })
  } catch (error) {
    console.error("Error creating submission:", error)
    return NextResponse.json({ error: "Failed to create submission" }, { status: 500 })
  }
}
