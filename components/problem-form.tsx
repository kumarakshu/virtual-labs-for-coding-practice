"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"

interface ProblemFormProps {
  problem?: any
  onClose: () => void
}

export function ProblemForm({ problem, onClose }: ProblemFormProps) {
  const [formData, setFormData] = useState({
    title: problem?.title || "",
    difficulty: problem?.difficulty || "",
    category: problem?.category || "",
    description: problem?.description || "",
    constraints: problem?.constraints?.join("\n") || "",
    examples: problem?.examples || [{ input: "", output: "", explanation: "" }],
    starterCode: problem?.starterCode || {
      javascript: "",
      python: "",
      java: "",
      cpp: "",
    },
    testCases: problem?.testCases || [{ input: "", expectedOutput: "", isSample: true }],
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleExampleChange = (index: number, field: string, value: string) => {
    const newExamples = [...formData.examples]
    newExamples[index] = { ...newExamples[index], [field]: value }
    setFormData((prev) => ({ ...prev, examples: newExamples }))
  }

  const addExample = () => {
    setFormData((prev) => ({
      ...prev,
      examples: [...prev.examples, { input: "", output: "", explanation: "" }],
    }))
  }

  const removeExample = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      examples: prev.examples.filter((_, i) => i !== index),
    }))
  }

  const handleTestCaseChange = (index: number, field: string, value: string | boolean) => {
    const newTestCases = [...formData.testCases]
    newTestCases[index] = { ...newTestCases[index], [field]: value }
    setFormData((prev) => ({ ...prev, testCases: newTestCases }))
  }

  const addTestCase = () => {
    setFormData((prev) => ({
      ...prev,
      testCases: [...prev.testCases, { input: "", expectedOutput: "", isSample: false }],
    }))
  }

  const removeTestCase = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      testCases: prev.testCases.filter((_, i) => i !== index),
    }))
  }

  const handleStarterCodeChange = (language: string, code: string) => {
    setFormData((prev) => ({
      ...prev,
      starterCode: { ...prev.starterCode, [language]: code },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would submit to your API
    console.log("Submitting problem:", formData)
    onClose()
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onClose}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{problem ? "Edit Problem" : "Add New Problem"}</h1>
            <p className="text-muted-foreground">Create or modify coding problems for the platform</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Problem Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="e.g., Two Sum"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                placeholder="e.g., Array, Tree, Graph"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select value={formData.difficulty} onValueChange={(value) => handleInputChange("difficulty", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <Label htmlFor="description">Problem Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe the problem in detail..."
              rows={6}
              required
            />
          </div>

          <div className="mt-6 space-y-2">
            <Label htmlFor="constraints">Constraints (one per line)</Label>
            <Textarea
              id="constraints"
              value={formData.constraints}
              onChange={(e) => handleInputChange("constraints", e.target.value)}
              placeholder="e.g., 1 ≤ n ≤ 10^4"
              rows={4}
            />
          </div>
        </Card>

        <Tabs defaultValue="examples" className="space-y-6">
          <TabsList>
            <TabsTrigger value="examples">Examples</TabsTrigger>
            <TabsTrigger value="starter-code">Starter Code</TabsTrigger>
            <TabsTrigger value="test-cases">Test Cases</TabsTrigger>
          </TabsList>

          <TabsContent value="examples">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Examples</h2>
                <Button type="button" onClick={addExample} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Example
                </Button>
              </div>

              <div className="space-y-6">
                {formData.examples.map((example, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Example {index + 1}</h3>
                      {formData.examples.length > 1 && (
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeExample(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label>Input</Label>
                        <Input
                          value={example.input}
                          onChange={(e) => handleExampleChange(index, "input", e.target.value)}
                          placeholder="e.g., nums = [2,7,11,15], target = 9"
                        />
                      </div>
                      <div>
                        <Label>Output</Label>
                        <Input
                          value={example.output}
                          onChange={(e) => handleExampleChange(index, "output", e.target.value)}
                          placeholder="e.g., [0,1]"
                        />
                      </div>
                      <div>
                        <Label>Explanation</Label>
                        <Textarea
                          value={example.explanation}
                          onChange={(e) => handleExampleChange(index, "explanation", e.target.value)}
                          placeholder="Explain why this output is correct..."
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="starter-code">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Starter Code Templates</h2>
              <div className="space-y-6">
                {Object.entries(formData.starterCode).map(([language, code]) => (
                  <div key={language} className="space-y-2">
                    <Label className="capitalize">{language}</Label>
                    <Textarea
                      value={code}
                      onChange={(e) => handleStarterCodeChange(language, e.target.value)}
                      placeholder={`Write ${language} starter code...`}
                      rows={8}
                      className="font-mono text-sm"
                    />
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="test-cases">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Test Cases</h2>
                <Button type="button" onClick={addTestCase} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Test Case
                </Button>
              </div>

              <div className="space-y-4">
                {formData.testCases.map((testCase, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Test Case {index + 1}</h3>
                      <div className="flex items-center space-x-2">
                        <label className="flex items-center space-x-2 text-sm">
                          <input
                            type="checkbox"
                            checked={testCase.isSample}
                            onChange={(e) => handleTestCaseChange(index, "isSample", e.target.checked)}
                          />
                          <span>Sample</span>
                        </label>
                        {formData.testCases.length > 1 && (
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeTestCase(index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Input</Label>
                        <Textarea
                          value={testCase.input}
                          onChange={(e) => handleTestCaseChange(index, "input", e.target.value)}
                          placeholder="Test input..."
                          rows={3}
                          className="font-mono text-sm"
                        />
                      </div>
                      <div>
                        <Label>Expected Output</Label>
                        <Textarea
                          value={testCase.expectedOutput}
                          onChange={(e) => handleTestCaseChange(index, "expectedOutput", e.target.value)}
                          placeholder="Expected output..."
                          rows={3}
                          className="font-mono text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{problem ? "Update Problem" : "Create Problem"}</Button>
        </div>
      </form>
    </div>
  )
}
