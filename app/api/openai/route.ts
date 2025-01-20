import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'OpenAI API key not found' },
      { status: 500 }
    );
  }

  const openai = new OpenAI({ apiKey });

  try {
    const { prompt } = await req.json();

    const promptToSubmit = `Make your answer concise. ${prompt}`;
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: promptToSubmit }],
      temperature: 0.7,
    });

    const content = response.choices[0].message.content;
    if (!content) {
      return NextResponse.json(
        { error: 'Invalid response from OpenAI' },
        { status: 500 }
      );
    }

    return NextResponse.json({ content });
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status || 500 }
      );
    }
    console.error('Error calling OpenAI:', error);
    return NextResponse.json(
      { error: 'Failed to get response from OpenAI' },
      { status: 500 }
    );
  }
}
