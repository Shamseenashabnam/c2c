// server.js
require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.post('/generate-plan', async (req, res) => {
  const { businessName, businessType, goal } = req.body;
  const prompt = `
You are a creative marketing AI. For the following product/service, do two things:
1. Write a catchy, engaging social media post (caption) for promotion.
2. Create a practical, step-by-step action plan for the day to promote it, including both online and offline ideas.

Product/Service: ${businessName}
About: ${businessType}
Promotion Goal: ${goal}

Return a JSON object with:
- socialPosts: array of 1-2 creative post captions
- dayPlan: array of 4-6 actionable steps for the day
Do not include any other text.`;

  const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    })
  });
  const data = await openaiRes.json();
  let result;
  try {
    result = JSON.parse(data.choices[0].message.content);
  } catch (e) {
    return res.status(500).json({ error: 'AI response could not be parsed.' });
  }
  res.json(result);
});

app.listen(3001, () => console.log('AI backend running on http://localhost:3001'));
