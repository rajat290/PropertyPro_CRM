import dotenv from 'dotenv';
import pool from './config/db.js';

dotenv.config();

async function migrate() {
  try {
    console.log('🔄 Running comprehensive DB migration...');
    
    // Run full schema if tables don't exist
    const checkUsers = `SELECT 1 FROM users LIMIT 1`;
    try {
      await pool.query(checkUsers);
    } catch (e) {
      console.log('📝 Running initial schema...');
      const fs = require('fs');
      const schema = fs.readFileSync('./config/schema.sql', 'utf8');
      await pool.query(schema);
      console.log('✅ Initial schema applied');
    }
    
    // Ensure token_version column exists
    const checkQuery = `
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'users' AND column_name = 'token_version'
    `;
    const checkResult = await pool.query(checkQuery);
    
    if (checkResult.rows.length === 0) {
      const alterQuery = `
        ALTER TABLE users 
        ADD COLUMN IF NOT EXISTS token_version INTEGER DEFAULT 0 NOT NULL
      `;
      await pool.query(alterQuery);
      console.log('✅ Added token_version column to users table');
    } else {
      console.log('ℹ️ token_version column already exists');
    }
    
    // Verify appointments partition exists
    const checkPartition = `
      SELECT schemaname,tablename FROM pg_tables 
      WHERE tablename = 'appointments_2026_04'
    `;
    const partitionResult = await pool.query(checkPartition);
    if (partitionResult.rows.length === 0) {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS appointments_2026_04
        PARTITION OF appointments
        FOR VALUES FROM ('2026-04-01') TO ('2026-05-01')
      `);
      console.log('✅ Created appointments partition');
    }
    
    console.log('🎉 Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

migrate();
