const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
require('dotenv').config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/join-waitlist', async (req, res) => {
  try {
    const { email, audienceId } = req.body;
    
    if (!email || !audienceId) {
      return res.status(400).json({ error: 'email and audienceId are required' });
    }

    const data = await resend.contacts.create({
      email,
      audienceId,
    });

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Shared backend running on port ${PORT}`);
});
