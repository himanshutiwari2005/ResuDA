import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(req: Request) {
  const { content } = await req.json()
  const apiKey = process.env.GROQ_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: 'Groq API key missing' }, { status: 500 })
  }

  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: `You are a news bias detection AI. Analyze the following news content and return a JSON object with:
            - biasScore (0-100, where 0 is neutral and 100 is highly biased)
            - misinterpretedLines (array of strings, max 3)
            - missingContext (array of strings, max 3)
            - summary (one short, italic-style sentence providing a high-level neutral analysis)
            
            Return ONLY the raw JSON object. No other text.`
          },
          {
            role: 'user',
            content: content
          }
        ],
        response_format: { type: 'json_object' }
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    )

    const result = JSON.parse(response.data.choices[0].message.content)
    return NextResponse.json(result)
  } catch (error: any) {
    console.error('Groq API Error:', error.response?.data || error.message)
    return NextResponse.json({ error: 'Failed to analyze bias via Cloud AI' }, { status: 500 })
  }
}
