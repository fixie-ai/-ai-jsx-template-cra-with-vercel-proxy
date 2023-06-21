// import { Configuration, OpenAIApi } from 'openai-edge'
// import { OpenAIStream, StreamingTextResponse } from 'ai'

// if (!process.env.OPENAI_API_KEY) {
//   throw new Error('OPENAI_API_KEY environment variable must be set');
// }

// const config = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY
// })
// const openai = new OpenAIApi(config)

// export const runtime = 'edge'

// export async function POST(req) {
//   const reqBody = await req.json()
//   const response = await openai.createChatCompletion({
//     ...reqBody,
//     stream: true,
//   })
//   const stream = OpenAIStream(response)
//   stream.on('data', (data) => {
//     console.log('got data', data);
//   })
//   return new StreamingTextResponse(stream)
// }

// export const config = {
//   runtime: 'edge',
// };
 
// export default async function handler() {
//   const encoder = new TextEncoder();
 
//   const customReadable = new ReadableStream({
//     start(controller) {
//       controller.enqueue(encoder.encode('Basic Streaming Test'));
//       setTimeout(() => {
//         controller.enqueue(encoder.encode('Basic Streaming Test 2'));
//         controller.close();
//       }, 2000);
//     },
//   });
 
//   return new Response(customReadable, {
//     headers: { 'Content-Type': 'text/html; charset=utf-8' },
//   });
// }


// import { Configuration, OpenAIApi } from 'openai-edge';
// import { OpenAIStream, StreamingTextResponse } from 'ai';
 
// // Create an OpenAI API client (that's edge friendly!)
// const config = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(config);
 
// // IMPORTANT! Set the runtime to edge
// export const runtime = 'edge';
 
// export async function POST(req) {
//   const { prompt } = await req.json();
 
//   // Ask OpenAI for a streaming completion given the prompt
//   const response = await openai.createCompletion({
//     model: 'text-davinci-003',
//     stream: true,
//     max_tokens: 2000,
//     temperature: 0.6,
//     prompt: `Create twenty slogans for a business with unique features.
 
// Business: ${prompt}
// Slogans:`,
//   });
//   // Convert the response into a friendly text-stream
//   const stream = OpenAIStream(response);
//   // Respond with the stream
//   return new StreamingTextResponse(stream);
// }

// @ts-expect-error
// import { Configuration, OpenAIApi } from 'openai-edge';
// import { OpenAIStream, StreamingTextResponse } from 'ai';
// // Create an OpenAI API client (that's edge friendly!)
// const config = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(config);
// // IMPORTANT! Set the runtime to edge
// export const runtime = 'edge';
// export default async function handler(req, res) {
//     // Extract the `prompt` from the body of the request
//     // Ask OpenAI for a streaming completion given the prompt
//     const response = await openai.createCompletion({
//         model: 'text-davinci-003',
//         stream: true,
//         max_tokens: 2000,
//         prompt: 'List 20 dog names',
//     });
//     // Convert the response into a friendly text-stream
//     const stream = OpenAIStream(response);
//     // Respond with the stream
//     return new StreamingTextResponse(stream);
// }


import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'

export const runtime = 'edge'

export async function POST(req) {
  const json = await req.json()
  const { messages, previewToken } = json

  const configuration = new Configuration({
    apiKey: previewToken || process.env.OPENAI_API_KEY
  })

  const openai = new OpenAIApi(configuration)

  const res = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages,
    temperature: 0.7,
    stream: true
  })

  const stream = OpenAIStream(res)

  return new StreamingTextResponse(stream)
}
