import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY environment variable must be set');
}

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

export const runtime = 'edge'

export async function POST(req) {
  const reqBody = await req.json()
  const response = await openai.createChatCompletion(reqBody)
  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}