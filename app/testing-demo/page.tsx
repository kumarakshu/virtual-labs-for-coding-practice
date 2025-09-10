import type { Metadata } from "next"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Zap, Target, BarChart } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Testing Demo - Virtual Labs",
  description: "Experience instant code testing with comprehensive test cases and feedback",
}

export default function TestingDemoPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Instant Testing System</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Run your code against comprehensive test cases and get immediate feedback with detailed performance
              metrics
            </p>
          </div>

          {/* Test Results Preview */}
          <Card className="mb-8 overflow-hidden">
            <div className="bg-card border-b p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Test Results: Two Sum Problem</h3>
                <Badge className="bg-green-500/10 text-green-500 border-green-500/20">All Tests Passed</Badge>
              </div>
            </div>

            <div className="p-6">
              {/* Test Cases */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-medium">Test Case 1</div>
                      <div className="text-sm text-muted-foreground">Input: [2,7,11,15], target = 9</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-500">Passed</div>
                    <div className="text-xs text-muted-foreground">2ms</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-medium">Test Case 2</div>
                      <div className="text-sm text-muted-foreground">Input: [3,2,4], target = 6</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-500">Passed</div>
                    <div className="text-xs text-muted-foreground">1ms</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-medium">Test Case 3 (Hidden)</div>
                      <div className="text-sm text-muted-foreground">Large input test</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-500">Passed</div>
                    <div className="text-xs text-muted-foreground">15ms</div>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="p-4 bg-muted/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Runtime</span>
                  </div>
                  <div className="text-2xl font-bold">15ms</div>
                  <div className="text-xs text-muted-foreground">Beats 85% of submissions</div>
                </Card>

                <Card className="p-4 bg-muted/50">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Memory</span>
                  </div>
                  <div className="text-2xl font-bold">42.1MB</div>
                  <div className="text-xs text-muted-foreground">Beats 72% of submissions</div>
                </Card>

                <Card className="p-4 bg-muted/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Accuracy</span>
                  </div>
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-xs text-muted-foreground">All test cases passed</div>
                </Card>
              </div>
            </div>
          </Card>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <Zap className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Instant Feedback</h3>
              <p className="text-muted-foreground">
                Get immediate results as soon as you submit your code with detailed error messages
              </p>
            </Card>

            <Card className="p-6">
              <Target className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Comprehensive Tests</h3>
              <p className="text-muted-foreground">
                Multiple test cases including edge cases and performance benchmarks
              </p>
            </Card>

            <Card className="p-6">
              <BarChart className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Performance Metrics</h3>
              <p className="text-muted-foreground">
                Detailed runtime and memory usage statistics compared to other solutions
              </p>
            </Card>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link href="/problem/1">
              <Button size="lg" className="mr-4">
                Try Testing Now
              </Button>
            </Link>
            <Link href="/problems">
              <Button variant="outline" size="lg">
                Browse All Problems
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
