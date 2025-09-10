import { type NextRequest, NextResponse } from "next/server"

// Mock database - in real app, use MySQL connection
const mockProblems = [
  {
    id: 1,
    title: "Two Sum",
    slug: "two-sum",
    difficulty: "Easy",
    category: "Array",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists.",
    ],
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
      },
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
    // Write your solution here
    
}`,
      python: `def two_sum(nums, target):
    # Write your solution here
    pass`,
      java: `public class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        
    }
}`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        
    }
};`,
    },
    testCases: [
      { input: "[2,7,11,15]\n9", expectedOutput: "[0,1]", isSample: true },
      { input: "[3,2,4]\n6", expectedOutput: "[1,2]", isSample: true },
      { input: "[3,3]\n6", expectedOutput: "[0,1]", isSample: false },
    ],
    timeLimit: 1000,
    memoryLimit: 256,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const problemId = Number.parseInt(params.id)
    const problem = mockProblems.find((p) => p.id === problemId)

    if (!problem) {
      return NextResponse.json({ error: "Problem not found" }, { status: 404 })
    }

    return NextResponse.json({ problem })
  } catch (error) {
    console.error("Error fetching problem:", error)
    return NextResponse.json({ error: "Failed to fetch problem" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const problemId = Number.parseInt(params.id)
    const body = await request.json()
    const problemIndex = mockProblems.findIndex((p) => p.id === problemId)

    if (problemIndex === -1) {
      return NextResponse.json({ error: "Problem not found" }, { status: 404 })
    }

    // Update problem
    mockProblems[problemIndex] = {
      ...mockProblems[problemIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({ problem: mockProblems[problemIndex] })
  } catch (error) {
    console.error("Error updating problem:", error)
    return NextResponse.json({ error: "Failed to update problem" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const problemId = Number.parseInt(params.id)
    const problemIndex = mockProblems.findIndex((p) => p.id === problemId)

    if (problemIndex === -1) {
      return NextResponse.json({ error: "Problem not found" }, { status: 404 })
    }

    // Soft delete - set isActive to false
    mockProblems[problemIndex].isActive = false
    mockProblems[problemIndex].updatedAt = new Date().toISOString()

    return NextResponse.json({ message: "Problem deleted successfully" })
  } catch (error) {
    console.error("Error deleting problem:", error)
    return NextResponse.json({ error: "Failed to delete problem" }, { status: 500 })
  }
}
