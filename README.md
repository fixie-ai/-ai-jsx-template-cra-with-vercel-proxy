# AI.JSX Vercel Proxy Template
This template repo uses [AI.JSX](https://github.com/fixie-ai/ai-jsx), the AI application framework for JavaScript.

This template demonstrates the [UI + AI.JSX on the client; API calls on the server](https://docs.ai-jsx.com/guides/architecture#ui--aijsx-on-the-client-api-calls-on-the-server) pattern, using a Vercel edge function to proxy calls to OpenAI.

To see this deployed: https://ai-jsx-template-cra-with-vercel-proxy-nickheiner-fixie-ai.vercel.app/.

To deploy this yourself, run `yarn vercel deploy`. You'll need to set env var `REACT_APP_OPENAI_API_BASE` to `/api/v1`.