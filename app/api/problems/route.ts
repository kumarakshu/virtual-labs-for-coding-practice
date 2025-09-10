import { type NextRequest, NextResponse } from "next/server"

// Mock database connection - in real app, use MySQL connection
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
  {
    id: 2,
    title: "Reverse Linked List",
    slug: "reverse-linked-list",
    difficulty: "Easy",
    category: "Linked List",
    description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    constraints: ["The number of nodes in the list is the range [0, 5000].", "-5000 ≤ Node.val ≤ 5000"],
    examples: [
      {
        input: "head = [1,2,3,4,5]",
        output: "[5,4,3,2,1]",
        explanation: "The linked list is reversed.",
      },
    ],
    starterCode: {
      javascript: `function reverseList(head) {
    // Write your solution here
    
}`,
      python: `def reverse_list(head):
    # Write your solution here
    pass`,
    },
    testCases: [
      { input: "[1,2,3,4,5]", expectedOutput: "[5,4,3,2,1]", isSample: true },
      { input: "[1,2]", expectedOutput: "[2,1]", isSample: true },
    ],
    timeLimit: 1000,
    memoryLimit: 256,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const difficulty = searchParams.get("difficulty")
    const category = searchParams.get("category")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    let filteredProblems = mockProblems.filter((problem) => problem.isActive)

    // Apply filters
    if (difficulty) {
      filteredProblems = filteredProblems.filter((problem) => problem.difficulty === difficulty)
    }
    if (category) {
      filteredProblems = filteredProblems.filter((problem) => problem.category === category)
    }

    // Apply pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedProblems = filteredProblems.slice(startIndex, endIndex)

    return NextResponse.json({
      problems: paginatedProblems,
      pagination: {
        page,
        limit,
        total: filteredProblems.length,
        totalPages: Math.ceil(filteredProblems.length / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching problems:", error)
    return NextResponse.json({ error: "Failed to fetch problems" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, difficulty, category, description, constraints, examples, starterCode, testCases } = body

    // Validate required fields
    if (!title || !difficulty || !category || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In real app, insert into MySQL database
    const newProblem = {
      id: mockProblems.length + 1,
      title,
      slug: title.toLowerCase().replace(/\s+/g, "-"),
      difficulty,
      category,
      description,
      constraints: constraints || [],
      examples: examples || [],
      starterCode: starterCode || {},
      testCases: testCases || [],
      timeLimit: 1000,
      memoryLimit: 256,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    mockProblems.push(newProblem)

    return NextResponse.json({ problem: newProblem }, { status: 201 })
  } catch (error) {
    console.error("Error creating problem:", error)
    return NextResponse.json({ error: "Failed to create problem" }, { status: 500 })
  }
}
