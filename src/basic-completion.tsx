/** @jsxImportSource ai-jsx/react */
import * as AI from 'ai-jsx/react';
import ResultContainer from './ResultContainer';
import InputPrompt from './InputPrompt';
import { ChatCompletion, UserMessage } from 'ai-jsx/core/completion';
import { useState } from 'react';
import { UseHostOpenAIProxy } from './ai';

export default function BasicCompletion() {
  const [query, setQuery] = useState('wild weasels');

  return (
    <>
      <InputPrompt label="Give me a topic" value={query} setValue={setQuery} />
      <ResultContainer title={`AI writes a poem about ${query}`}>
        <AI.jsx>
          <UseHostOpenAIProxy>
            <ChatCompletion temperature={1}>
              <UserMessage>Write me a poem about {query}</UserMessage>
            </ChatCompletion>
          </UseHostOpenAIProxy>
        </AI.jsx>
      </ResultContainer>
      <ResultContainer title={`AI lists ten facts about ${query}`}>
        <AI.jsx>
          <UseHostOpenAIProxy>
            <ChatCompletion temperature={1}>
              <UserMessage>Give me ten facts about {query}</UserMessage>
            </ChatCompletion>
          </UseHostOpenAIProxy>
        </AI.jsx>
      </ResultContainer>
    </>
  );
}
