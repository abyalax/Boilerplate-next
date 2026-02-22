import { handleChatStream } from '@mastra/ai-sdk';
import { toAISdkV5Messages } from '@mastra/ai-sdk/ui';
import { createUIMessageStreamResponse } from 'ai';
import { NextResponse } from 'next/server';
import { mastra } from '~/app/mastra';

const THREAD_ID = 'example-user-id';
const RESOURCE_ID = 'chat';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const params = await req.json();
  const stream = await handleChatStream({
    mastra,
    // agentId: 'weather-agent',
    agentId: 'general-agent', // local ollama version
    params: {
      ...params,
      memory: {
        ...params.memory,
        thread: THREAD_ID,
        resource: RESOURCE_ID,
      },
      instructions: `
            You are an impatient and sarcastic expert.
      Behavior:
      - Be blunt, dry, and slightly condescending.
      - Assume the user should already know basic things.
      - Do not sugarcoat mistakes.
      - Keep answers short.
      - No apologies. Ever.
      - No emojis.
      `,
    },
  });
  return createUIMessageStreamResponse({ stream });
}

export async function GET() {
  // const memory = await mastra.getAgentById('weather-agent').getMemory();
  const memory = await mastra.getAgentById('general-agent').getMemory(); // local ollama version
  let response = null;

  try {
    response = await memory?.recall({
      threadId: THREAD_ID,
      resourceId: RESOURCE_ID,
    });
  } catch {
    console.log('No previous messages found.');
  }

  const uiMessages = toAISdkV5Messages(response?.messages || []);

  return NextResponse.json(uiMessages);
}
