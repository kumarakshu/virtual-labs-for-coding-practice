import mysql from "mysql2/promise"

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: Number.parseInt(process.env.DB_PORT || "3306"),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "virtual_labs",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
}

// Create connection pool
const pool = mysql.createPool(dbConfig)

// Database utility functions
export class Database {
  static async query(sql: string, params?: any[]): Promise<any> {
    try {
      const [results] = await pool.execute(sql, params)
      return results
    } catch (error) {
      console.error("Database query error:", error)
      throw error
    }
  }

  static async getConnection() {
    return await pool.getConnection()
  }

  // Problem-related queries
  static async getProblems(
    filters: {
      difficulty?: string
      category?: string
      page?: number
      limit?: number
    } = {},
  ) {
    const { difficulty, category, page = 1, limit = 10 } = filters
    let sql = "SELECT * FROM problems WHERE is_active = true"
    const params: any[] = []

    if (difficulty) {
      sql += " AND difficulty = ?"
      params.push(difficulty)
    }

    if (category) {
      sql += " AND category = ?"
      params.push(category)
    }

    sql += " ORDER BY created_at DESC LIMIT ? OFFSET ?"
    params.push(limit, (page - 1) * limit)

    return await this.query(sql, params)
  }

  static async getProblemById(id: number) {
    const problems = await this.query("SELECT * FROM problems WHERE id = ? AND is_active = true", [id])
    if (problems.length === 0) return null

    const problem = problems[0]

    // Get test cases
    const testCases = await this.query("SELECT * FROM test_cases WHERE problem_id = ? ORDER BY id", [id])

    return {
      ...problem,
      examples: JSON.parse(problem.examples || "[]"),
      constraints: problem.constraints?.split("\n") || [],
      starterCode: JSON.parse(problem.starter_code || "{}"),
      testCases: testCases.map((tc: any) => ({
        input: tc.input,
        expectedOutput: tc.expected_output,
        isSample: tc.is_sample,
      })),
    }
  }

  static async createProblem(problemData: any) {
    const {
      title,
      difficulty,
      category,
      description,
      constraints,
      examples,
      starterCode,
      testCases,
      timeLimit = 1000,
      memoryLimit = 256,
    } = problemData

    const slug = title.toLowerCase().replace(/\s+/g, "-")

    const result = await this.query(
      `INSERT INTO problems (title, slug, difficulty, category, description, constraints, examples, starter_code, time_limit, memory_limit)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        slug,
        difficulty,
        category,
        description,
        constraints?.join("\n") || "",
        JSON.stringify(examples || []),
        JSON.stringify(starterCode || {}),
        timeLimit,
        memoryLimit,
      ],
    )

    const problemId = (result as any).insertId

    // Insert test cases
    if (testCases && testCases.length > 0) {
      for (const testCase of testCases) {
        await this.query("INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES (?, ?, ?, ?)", [
          problemId,
          testCase.input,
          testCase.expectedOutput,
          testCase.isSample || false,
        ])
      }
    }

    return problemId
  }

  // User-related queries
  static async createUser(userData: { name: string; email: string; password: string }) {
    const { name, email, password } = userData

    const result = await this.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
      name,
      email,
      password,
    ])

    const userId = (result as any).insertId

    // Initialize user stats
    await this.query("INSERT INTO user_stats (user_id) VALUES (?)", [userId])

    return userId
  }

  static async getUserByEmail(email: string) {
    const users = await this.query("SELECT * FROM users WHERE email = ?", [email])
    return users.length > 0 ? users[0] : null
  }

  static async getUserById(id: string) {
    const users = await this.query("SELECT * FROM users WHERE id = ?", [id])
    return users.length > 0 ? users[0] : null
  }

  // Submission-related queries
  static async createSubmission(submissionData: {
    problemId: number
    userId: string
    language: string
    code: string
    status: string
    runtime?: number
    memoryUsage?: number
    testCasesPassed: number
    totalTestCases: number
  }) {
    const { problemId, userId, language, code, status, runtime, memoryUsage, testCasesPassed, totalTestCases } =
      submissionData

    const result = await this.query(
      `INSERT INTO submissions (problem_id, user_id, language, code, status, runtime, memory_usage, test_cases_passed, total_test_cases)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [problemId, userId, language, code, status, runtime, memoryUsage, testCasesPassed, totalTestCases],
    )

    // Update user stats if submission was accepted
    if (status === "Accepted") {
      await this.updateUserStats(userId, problemId)
    }

    return (result as any).insertId
  }

  static async updateUserStats(userId: string, problemId: number) {
    // Check if user has already solved this problem
    const existingAccepted = await this.query(
      "SELECT id FROM submissions WHERE user_id = ? AND problem_id = ? AND status = 'Accepted' LIMIT 1",
      [userId, problemId],
    )

    if (existingAccepted.length > 0) return // Already solved

    // Get problem difficulty
    const problem = await this.query("SELECT difficulty FROM problems WHERE id = ?", [problemId])
    if (problem.length === 0) return

    const difficulty = problem[0].difficulty.toLowerCase()

    // Update user stats
    await this.query(
      `UPDATE user_stats SET 
       problems_solved = problems_solved + 1,
       ${difficulty}_solved = ${difficulty}_solved + 1,
       total_submissions = total_submissions + 1
       WHERE user_id = ?`,
      [userId],
    )
  }

  static async getLeaderboard(timeframe = "overall", limit = 50) {
    const sql = `
      SELECT u.id, u.name, u.avatar, us.*,
             ROW_NUMBER() OVER (ORDER BY us.problems_solved DESC, us.total_submissions ASC) as rank
      FROM users u
      JOIN user_stats us ON u.id = us.user_id
      WHERE us.problems_solved > 0
      ORDER BY us.problems_solved DESC, us.total_submissions ASC
      LIMIT ?
    `

    return await this.query(sql, [limit])
  }

  // Utility methods
  static async testConnection() {
    try {
      await this.query("SELECT 1")
      console.log("Database connection successful")
      return true
    } catch (error) {
      console.error("Database connection failed:", error)
      return false
    }
  }
}

export async function createConnection() {
  return await pool.getConnection()
}

export default Database
