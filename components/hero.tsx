import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Code2, Play, Terminal, Zap, BarChart3 } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto text-center">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-balance mb-4 leading-tight">
              Master Coding with
              <span className="text-primary block md:inline"> Virtual Labs</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed">
              Practice coding problems online with our browser-based IDE. Get instant feedback, run test cases, and
              improve your programming skills step by step.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/problem/1">
              <Button size="lg" className="text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-all font-medium">
                <Play className="mr-2 h-5 w-5" />
                Start Coding Now
              </Button>
            </Link>
            <Link href="/problems">
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-3 bg-card hover:bg-accent/10 border-border shadow-sm"
              >
                <Code2 className="mr-2 h-5 w-5" />
                Browse Problems
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Link href="/ide-demo">
              <Card className="p-8 text-center hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer border-border bg-card group">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <Terminal className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">Browser IDE</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Code directly in your browser with syntax highlighting and multiple language support
                </p>
              </Card>
            </Link>

            <Link href="/testing-demo">
              <Card className="p-8 text-center hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer border-border bg-card group">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <Zap className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">Instant Testing</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Run your code against test cases and get immediate feedback on your solutions
                </p>
              </Card>
            </Link>

            <Link href="/leaderboard">
              <Card className="p-8 text-center hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer border-border bg-card group">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <BarChart3 className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">Track Progress</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Monitor your improvement with detailed statistics and leaderboard rankings
                </p>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
