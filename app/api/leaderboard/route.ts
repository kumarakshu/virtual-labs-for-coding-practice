import { type NextRequest, NextResponse } from "next/server"

// Mock leaderboard data - in real app, fetch from database
const mockLeaderboardData = [
  {
    id: 1,
    userId: "1",
    name: "Alex Chen",
    avatar: null,
    totalSolved: 156,
    easySolved: 89,
    mediumSolved: 52,
    hardSolved: 15,
    totalSubmissions: 324,
    acceptanceRate: 68.2,
    streak: 23,
    lastActive: "2024-01-20",
    rank: 1,
    points: 2340,
  },
  {
    id: 2,
    userId: "2",
    name: "Sarah Johnson",
    avatar: null,
    totalSolved: 142,
    easySolved: 78,
    mediumSolved: 48,
    hardSolved: 16,
    totalSubmissions: 298,
    acceptanceRate: 71.8,
    streak: 18,
    lastActive: "2024-01-20",
    rank: 2,
    points: 2180,
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const timeframe = searchParams.get("timeframe") || "overall"
    const limit = Number.parseInt(searchParams.get("limit") || "50")

    // In real app, filter by timeframe and fetch from database
    let leaderboard = mockLeaderboardData

    // Apply limit
    leaderboard = leaderboard.slice(0, limit)

    return NextResponse.json({
      leaderboard,
      timeframe,
      total: mockLeaderboardData.length,
    })
  } catch (error) {
    console.error("Error fetching leaderboard:", error)
    return NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 })
  }
}
