const { Configuration, OpenAIApi } = require('openai-edge')

module.exports.runtime = 'edge';
module.exports.POST = async function POST(req) {
  const reqBody = await req.json()

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  })

  const openai = new OpenAIApi(configuration)
  const openAIResponse = await openai.createChatCompletion({
    ...reqBody,
    stream: true
  });
  const reader = openAIResponse.body.getReader();

  // This still doesn't work.
  return new Response(
    new ReadableStream({
      async pull(controller) {
        const { done, value } = await reader.read();
        console.log('got data', value)
        controller.enqueue(value);
        if (done) {
          controller.close();
        }
      }
  }), {
    status: 200,
    headers: { 'Content-Type': 'text/event-stream' },
  })

//   return new Promise((resolve) => {

//   openai.createChatCompletion({
//     ...reqBody,
//     stream: true
//   }).then(async openAIResonse => {
//     const reader = openAIResonse.body.getReader();
//     let count = 0;
//     while (true) {
//       const { done, value } = await reader.read();
//       res.write(value);
//     if (done) {
//       resolve();
//       return;
//     }
//     console.log(count++, new TextDecoder().decode(value));
//     }  
//   })
// })


  // return openai.createChatCompletion({
  //   ...reqBody,
  //   stream: true
  // })
}
