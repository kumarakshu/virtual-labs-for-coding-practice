import type { Metadata } from "next"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Terminal, Play, Settings, FileCode, Zap } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "IDE Demo - Virtual Labs",
  description: "Experience our browser-based IDE with syntax highlighting and multi-language support",
}

export default function IDEDemoPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Browser-Based IDE</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience our powerful online IDE with syntax highlighting, multiple language support, and instant code
              execution
            </p>
          </div>

          {/* IDE Preview */}
          <Card className="mb-8 overflow-hidden">
            <div className="bg-[#1e1e1e] text-white">
              {/* IDE Header */}
              <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d30] border-b border-[#3e3e42]">
                <div className="flex items-center gap-2">
                  <FileCode className="h-4 w-4" />
                  <span className="text-sm">main.js</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    JavaScript
                  </Badge>
                  <Button size="sm" className="h-6 px-2">
                    <Play className="h-3 w-3 mr-1" />
                    Run
                  </Button>
                </div>
              </div>

              <div className="p-4 font-mono text-sm">
                <div className="flex">
                  <div className="text-[#858585] pr-4 select-none">
                    {Array.from({ length: 15 }, (_, i) => (
                      <div key={i}>{i + 1}</div>
                    ))}
                  </div>
                  <div className="flex-1">
                    <div>
                      <span className="text-[#569cd6]">function</span> <span className="text-[#dcdcaa]">twoSum</span>
                      <span className="text-white">(</span>
                      <span className="text-[#9cdcfe]">nums</span>
                      <span className="text-white">, </span>
                      <span className="text-[#9cdcfe]">target</span>
                      <span className="text-white">
                        {")"} {"{"}
                      </span>
                    </div>
                    <div className="ml-4">
                      <span className="text-[#6a9955]">// Create a hash map to store numbers and indices</span>
                    </div>
                    <div className="ml-4">
                      <span className="text-[#569cd6]">const</span> <span className="text-[#9cdcfe]">map</span>{" "}
                      <span className="text-white">= </span>
                      <span className="text-[#569cd6]">new</span> <span className="text-[#4ec9b0]">Map</span>
                      <span className="text-white">();</span>
                    </div>
                    <div></div>
                    <div className="ml-4">
                      <span className="text-[#c586c0]">for</span> <span className="text-white">(</span>
                      <span className="text-[#569cd6]">let</span> <span className="text-[#9cdcfe]">i</span>{" "}
                      <span className="text-white">= </span>
                      <span className="text-[#b5cea8]">0</span>
                      <span className="text-white">; </span>
                      <span className="text-[#9cdcfe]">i</span> <span className="text-white">&lt;</span>{" "}
                      <span className="text-[#9cdcfe]">nums</span>
                      <span className="text-white">.</span>
                      <span className="text-[#9cdcfe]">length</span>
                      <span className="text-white">; </span>
                      <span className="text-[#9cdcfe]">i</span>
                      <span className="text-white">++) {"{"}</span>
                    </div>
                    <div className="ml-8">
                      <span className="text-[#569cd6]">const</span> <span className="text-[#9cdcfe]">complement</span>{" "}
                      <span className="text-white">= </span>
                      <span className="text-[#9cdcfe]">target</span> <span className="text-white">-</span>{" "}
                      <span className="text-[#9cdcfe]">nums</span>
                      <span className="text-white">[</span>
                      <span className="text-[#9cdcfe]">i</span>
                      <span className="text-white">];</span>
                    </div>
                    <div></div>
                    <div className="ml-8">
                      <span className="text-[#c586c0]">if</span> <span className="text-white">(</span>
                      <span className="text-[#9cdcfe]">map</span>
                      <span className="text-white">.</span>
                      <span className="text-[#dcdcaa]">has</span>
                      <span className="text-white">(</span>
                      <span className="text-[#9cdcfe]">complement</span>
                      <span className="text-white">)) {"{"}</span>
                    </div>
                    <div className="ml-12">
                      <span className="text-[#c586c0]">return</span> <span className="text-white">[</span>
                      <span className="text-[#9cdcfe]">map</span>
                      <span className="text-white">.</span>
                      <span className="text-[#dcdcaa]">get</span>
                      <span className="text-white">(</span>
                      <span className="text-[#9cdcfe]">complement</span>
                      <span className="text-white">), </span>
                      <span className="text-[#9cdcfe]">i</span>
                      <span className="text-white">];</span>
                    </div>
                    <div className="ml-8">
                      <span className="text-white">{"}"}</span>
                    </div>
                    <div></div>
                    <div className="ml-8">
                      <span className="text-[#9cdcfe]">map</span>
                      <span className="text-white">.</span>
                      <span className="text-[#dcdcaa]">set</span>
                      <span className="text-white">(</span>
                      <span className="text-[#9cdcfe]">nums</span>
                      <span className="text-white">[</span>
                      <span className="text-[#9cdcfe]">i</span>
                      <span className="text-white">], </span>
                      <span className="text-[#9cdcfe]">i</span>
                      <span className="text-white">);</span>
                    </div>
                    <div className="ml-4">
                      <span className="text-white">{"}"}</span>
                    </div>
                    <div>
                      <span className="text-white">{"}"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <Terminal className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Syntax Highlighting</h3>
              <p className="text-muted-foreground">
                Full syntax highlighting for JavaScript, Python, Java, C++, and more languages
              </p>
            </Card>

            <Card className="p-6">
              <Settings className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Customizable</h3>
              <p className="text-muted-foreground">
                Adjust themes, font sizes, and editor preferences to match your coding style
              </p>
            </Card>

            <Card className="p-6">
              <Zap className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Instant Execution</h3>
              <p className="text-muted-foreground">
                Run your code instantly and see results without any setup or installation
              </p>
            </Card>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link href="/problems">
              <Button size="lg" className="mr-4">
                Try the IDE Now
              </Button>
            </Link>
            <Link href="/problem/1">
              <Button variant="outline" size="lg">
                Start with a Problem
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
