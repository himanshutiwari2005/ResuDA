import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(req: Request) {
  try {
    const { content } = await req.json()

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 })
    }

    const prompt = `
      Analyze the following news article for AI Bias, Misinterpreted Lines, and Missing Context.
      Article Content:
      "${content}"

      Please provide your analysis in the following JSON format:
      {
        "biasScore": 0-100 (where 0 is neutral, 100 is highly biased),
        "misinterpretedLines": ["line 1", "line 2"],
        "missingContext": ["context 1", "context 2"],
        "summary": "Brief analysis summary"
      }
      Only return the JSON.
    `

    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'llama3.1:8b',
      prompt: prompt,
      stream: false,
      format: 'json'
    })

    const result = JSON.parse(response.data.response)

    return NextResponse.json(result)
  } catch (error: any) {
    console.error('Ollama Error:', error.message)
    return NextResponse.json({ 
      error: 'Failed to connect to local Llama model. Ensure Ollama is running.',
      details: error.message 
    }, { status: 500 })
  }
}
