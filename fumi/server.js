import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import Groq from 'groq-sdk'
import { perfumes } from './src/data/perfumes.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

app.post('/recommend', async (req, res) => {
  try {
    const userPrefs = req.body?.userPrefs || {}
    const { budget = '', occasion = [], notes = [], gender = '' } = userPrefs

    // occasion is now an array — join for the prompt
    const occasionText = Array.isArray(occasion) && occasion.length > 0
      ? occasion.join(', ')
      : typeof occasion === 'string' && occasion
        ? occasion
        : 'any occasion'

    // 1. Filter by budget
    let filtered = perfumes.filter(p => p.budgetRange === budget)

    // 2. Filter by gender
    if (gender && gender !== 'unisex') {
      filtered = filtered.filter(p =>
        p.gender.includes(gender) || p.gender.includes('unisex')
      )
    }

    // 3. Safety net — relax gender filter if too few results
    if (filtered.length < 3) {
      filtered = perfumes.filter(p => p.budgetRange === budget)
    }

    // 4. Final fallback
    if (filtered.length === 0) {
      filtered = perfumes.slice(0, 5)
    }

    const listForAI = filtered.slice(0, 12).map(p => ({
      id: p.id,
      name: p.name,
      brand: p.brand,
      occasions: p.occasions,
      notes: p.notes,
    }))

    const notesText = notes?.length > 0 ? notes.join(', ') : 'no strong preference'
    const locationText = userPrefs.location || 'the Philippines (hot and humid)'

    const prompt = `You are Fumi, a friendly AI fragrance advisor for the Philippines.

User preferences:
- Occasion(s): ${occasionText}
- Scent notes they like: ${notesText}
- Location: ${locationText}
- Gender profile: ${gender}

Choose exactly 3 perfumes from this list that best match the user.

Available perfumes:
${JSON.stringify(listForAI, null, 2)}

Rules:
- Pick only from the list above using exact IDs
- reason must be EXACTLY 2 short friendly sentences specific to their occasion and climate
- Respond ONLY with a raw JSON array — no markdown, no wrapper object, no extra text:

[
  {
    "id": "exact-id-from-list",
    "reason": "Two sentences."
  }
]`

    // Use 70b for better accuracy. Remove response_format so we can return a raw array.
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 600,
    })

    const text = completion.choices[0].message.content

    // Robust parsing — strip markdown fences, handle wrapped objects
    let aiPicks
    try {
      const clean = text.replace(/```json|```/g, '').trim()
      const parsed = JSON.parse(clean)
      aiPicks = Array.isArray(parsed)
        ? parsed
        : (parsed.recommendations || parsed.perfumes || Object.values(parsed)[0])
      if (!Array.isArray(aiPicks)) throw new Error('Not an array')
    } catch {
      console.error('AI parse failed, using fallback. Raw text:', text)
      aiPicks = filtered.slice(0, 3).map(p => ({
        id: p.id,
        reason: 'A great match for your scent preferences and the local climate.',
      }))
    }

    const results = aiPicks.map((pick) => {
      const perfume = perfumes.find(p => p.id === pick.id)
      if (!perfume) return null
      return {
        name: perfume.name,
        brand: perfume.brand,
        price: perfume.price,
        notes: perfume.notes,
        image: perfume.image || null,
        reason: pick.reason,
      }
    }).filter(Boolean)

    res.json(results)

  } catch (err) {
    console.error('Backend error:', err)
    res.status(500).json({ error: 'Something went wrong processing your request' })
  }
})

app.listen(3001, () => console.log('Fumi server running on port 3001'))