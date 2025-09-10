import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TestCase {
  input: string
  expectedOutput: string
}

interface TestCasesProps {
  testCases: TestCase[]
}

export function TestCases({ testCases }: TestCasesProps) {
  return (
    <div className="space-y-4 h-full overflow-y-auto">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Test Cases</h3>
        <Badge variant="secondary">{testCases.length} cases</Badge>
      </div>

      {testCases.map((testCase, index) => (
        <Card key={index} className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Test Case {index + 1}</h4>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Input:</label>
              <div className="mt-1 p-3 bg-muted/50 rounded-md font-mono text-sm">
                {testCase.input.split("\n").map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Expected Output:</label>
              <div className="mt-1 p-3 bg-muted/50 rounded-md font-mono text-sm">{testCase.expectedOutput}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
