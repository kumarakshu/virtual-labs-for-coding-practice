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

async function runMigrations() {
  let connection

  try {
    // Create database if it doesn't exist
    const tempConfig = { ...dbConfig }
    delete tempConfig.database

    connection = await mysql.createConnection(tempConfig)
    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`)
    await connection.end()

    // Connect to the database
    connection = await mysql.createConnection(dbConfig)
    console.log("Connected to MySQL database")

    // Read and execute migration files
    const scriptsDir = path.join(__dirname)
    const migrationFiles = ["create-database-schema.sql", "create-users-table.sql"]

    for (const file of migrationFiles) {
      const filePath = path.join(scriptsDir, file)
      try {
        const sql = await fs.readFile(filePath, "utf8")
        await connection.query(sql)
        console.log(`✅ Executed migration: ${file}`)
      } catch (error) {
        if (error.code === "ENOENT") {
          console.log(`⚠️  Migration file not found: ${file}`)
        } else {
          console.error(`❌ Error executing migration ${file}:`, error.message)
        }
      }
    }

    console.log("🎉 All migrations completed successfully!")
  } catch (error) {
    console.error("❌ Migration failed:", error.message)
    process.exit(1)
  } finally {
    if (connection) {
      await connection.end()
    }
  }
}

// Run migrations
runMigrations()
