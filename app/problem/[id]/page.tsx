import { ProblemIDE } from "@/components/problem-ide"
import { notFound } from "next/navigation"

// Mock problem data - in real app this would come from database
const problems = {
  "1": {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
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
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists.",
    ],
    testCases: [
      {
        input: "[2,7,11,15]\n9",
        expectedOutput: "[0,1]",
      },
      {
        input: "[3,2,4]\n6",
        expectedOutput: "[1,2]",
      },
      {
        input: "[3,3]\n6",
        expectedOutput: "[0,1]",
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
  },
}

interface ProblemPageProps {
  params: {
    id: string
  }
}

export default function ProblemPage({ params }: ProblemPageProps) {
  const problem = problems[params.id as keyof typeof problems]

  if (!problem) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <ProblemIDE problem={problem} />
    </div>
  )
}
