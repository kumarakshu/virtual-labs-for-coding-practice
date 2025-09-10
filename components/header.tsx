"use client"

import { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Code2, User, Menu, X, LogOut, Settings, Trophy, BookOpen, Users } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session, status } = useSession()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground shadow-sm">
            <Code2 className="h-4 w-4" />
          </div>
          <span className="text-lg font-semibold text-foreground font-mono">VirtualLabs</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          <Link href="/problems">
            <Button variant="ghost" size="sm" className="text-sm font-medium hover:bg-accent/10">
              <Code2 className="h-4 w-4 mr-2" />
              Problems
            </Button>
          </Link>
          <Link href="/learn">
            <Button variant="ghost" size="sm" className="text-sm font-medium hover:bg-accent/10">
              <BookOpen className="h-4 w-4 mr-2" />
              Learn
            </Button>
          </Link>
          <Link href="/leaderboard">
            <Button variant="ghost" size="sm" className="text-sm font-medium hover:bg-accent/10">
              <Trophy className="h-4 w-4 mr-2" />
              Leaderboard
            </Button>
          </Link>
          <Link href="/community">
            <Button variant="ghost" size="sm" className="text-sm font-medium hover:bg-accent/10">
              <Users className="h-4 w-4 mr-2" />
              Community
            </Button>
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4 flex-1 max-w-sm mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search problems..."
              className="pl-10 bg-card border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all font-mono text-sm"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {status === "loading" ? (
            <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
          ) : session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-accent/10">
                  <Avatar className="h-8 w-8 border border-border">
                    <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
                      {session.user?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("") || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-card border-border shadow-lg" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-3 bg-muted/50">
                  <div className="flex flex-col space-y-1 leading-none">
                    {session.user?.name && <p className="font-medium text-sm">{session.user.name}</p>}
                    {session.user?.email && (
                      <p className="w-[200px] truncate text-xs text-muted-foreground font-mono">{session.user.email}</p>
                    )}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/leaderboard" className="cursor-pointer">
                    <Trophy className="mr-2 h-4 w-4" />
                    Leaderboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-destructive focus:text-destructive"
                  onSelect={(event) => {
                    event.preventDefault()
                    signOut()
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/auth/signin">
                <Button variant="ghost" size="sm" className="hidden md:flex hover:bg-accent/10">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm" className="hidden md:flex shadow-sm">
                  Get Started
                </Button>
              </Link>
            </>
          )}

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-card shadow-lg">
          <div className="container px-4 py-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search problems..." className="pl-10 bg-background border-border font-mono text-sm" />
            </div>
            <nav className="flex flex-col space-y-1">
              <Link href="/problems">
                <Button variant="ghost" className="justify-start w-full">
                  <Code2 className="h-4 w-4 mr-2" />
                  Problems
                </Button>
              </Link>
              <Link href="/learn">
                <Button variant="ghost" className="justify-start w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Learn
                </Button>
              </Link>
              <Link href="/leaderboard">
                <Button variant="ghost" className="justify-start w-full">
                  <Trophy className="h-4 w-4 mr-2" />
                  Leaderboard
                </Button>
              </Link>
              <Link href="/community">
                <Button variant="ghost" className="justify-start w-full">
                  <Users className="h-4 w-4 mr-2" />
                  Community
                </Button>
              </Link>
            </nav>
            {!session && (
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                <Link href="/auth/signin">
                  <Button variant="ghost" size="sm" className="justify-start w-full">
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm" className="w-full">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
