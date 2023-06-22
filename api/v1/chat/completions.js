const { Configuration, OpenAIApi } = require('openai-edge')

module.exports.runtime = 'edge';
module.exports.POST = async function POST(req) {
  const reqBody = await req.json()

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  })

  const openai = new OpenAIApi(configuration)

  return openai.createChatCompletion({
    ...reqBody,
    stream: true
  })
}
