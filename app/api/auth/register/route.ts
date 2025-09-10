import { type NextRequest, NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { createConnection } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    const connection = await createConnection()

    try {
      // Check if user already exists
      const [existingUsers] = await connection.execute("SELECT id FROM users WHERE email = ?", [email])

      const users = existingUsers as any[]
      if (users.length > 0) {
        return NextResponse.json({ error: "User already exists" }, { status: 400 })
      }

      // Hash password
      const hashedPassword = await hash(password, 12)

      // Create user in database
      const [result] = await connection.execute(
        "INSERT INTO users (name, email, password, created_at) VALUES (?, ?, ?, NOW())",
        [name, email, hashedPassword],
      )

      const insertResult = result as any
      const newUser = {
        id: insertResult.insertId.toString(),
        name,
        email,
        createdAt: new Date().toISOString(),
      }

      return NextResponse.json({ user: newUser }, { status: 201 })
    } finally {
      connection.release()
    }
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
