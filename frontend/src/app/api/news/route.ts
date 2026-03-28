import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET() {
  const apiKey = process.env.NEWSDATA_API_KEY
  
  if (!apiKey) {
    return NextResponse.json({ error: 'News API key missing' }, { status: 500 })
  }

  try {
    // Fetching tech, crypto, and environment news
    const response = await axios.get(`https://newsdata.io/api/1/news?apikey=${apiKey}&q=blockchain%20OR%20climate%20OR%20AI&language=en&category=technology,science,environment`)
    
    const articles = response.data.results.map((article: any, index: number) => ({
      id: index + 1,
      title: article.title,
      summary: article.description || article.content?.substring(0, 200) + '...',
      category: article.category?.[0] || 'General',
      date: article.pubDate,
      source: article.source_id || 'News',
      image: article.image_url || `https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800`
    }))

    return NextResponse.json(articles)
  } catch (error: any) {
    console.error('News API Error:', error.response?.data || error.message)
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 })
  }
}
