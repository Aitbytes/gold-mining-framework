const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function initDB() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS waitlist (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        project_name VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Database table ready');
  } finally {
    client.release();
  }
}

initDB().catch(console.error);

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/join-waitlist', async (req, res) => {
  try {
    const { email, projectName } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'email is required' });
    }

    const result = await pool.query(
      'INSERT INTO waitlist (email, project_name) VALUES ($1, $2) ON CONFLICT (email) DO UPDATE SET project_name = EXCLUDED.project_name RETURNING id',
      [email, projectName || null]
    );

    res.json({ success: true, id: result.rows[0].id });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/waitlist/:projectName', async (req, res) => {
  try {
    const { projectName } = req.params;
    
    const result = await pool.query(
      'SELECT email, created_at FROM waitlist WHERE project_name = $1 ORDER BY created_at DESC',
      [projectName]
    );

    res.json({ success: true, emails: result.rows });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Shared backend running on port ${PORT}`);
});
