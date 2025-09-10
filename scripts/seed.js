const mysql = require("mysql2/promise")
const fs = require("fs").promises
const path = require("path")
require("dotenv").config({ path: ".env.local" })

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: Number.parseInt(process.env.DB_PORT || "3306"),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "virtuallabs",
  multipleStatements: true,
}

async function seedDatabase() {
  let connection

  try {
    connection = await mysql.createConnection(dbConfig)
    console.log("Connected to MySQL database for seeding")

    // Read and execute seed file
    const seedFile = path.join(__dirname, "seed-sample-problems.sql")

    try {
      const sql = await fs.readFile(seedFile, "utf8")
      await connection.query(sql)
      console.log("✅ Sample problems seeded successfully!")
    } catch (error) {
      if (error.code === "ENOENT") {
        console.log("⚠️  Seed file not found: seed-sample-problems.sql")
      } else {
        console.error("❌ Error seeding database:", error.message)
      }
    }

    console.log("🎉 Database seeding completed!")
  } catch (error) {
    console.error("❌ Seeding failed:", error.message)
    process.exit(1)
  } finally {
    if (connection) {
      await connection.end()
    }
  }
}

// Run seeding
seedDatabase()
