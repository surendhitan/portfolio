// scripts/setup-db.js
// Run this script once to initialize the database: npm run setup-db
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

async function setupDatabase() {
  console.log('\n🚀 Setting up Portfolio Database...\n');

  // Connect without specifying a database first
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true,
  });

  try {
    console.log('✅ Connected to MySQL server');

    // Read SQL schema
    const schemaPath = path.join(__dirname, '../database/schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    // Execute schema
    await connection.query(schemaSql);
    console.log('✅ Database schema created successfully');
    console.log('✅ Seed data inserted successfully');
    console.log('\n🎉 Database setup complete!');
    console.log('   Database: portfolio_db');
    console.log('   Tables: profile, skills, projects, education, experience, services, testimonials, contacts\n');
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

setupDatabase();
