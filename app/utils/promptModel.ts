export default async function promptModel(prompt: string) {
  const response = await fetch('/api/openai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  const { content } = await response.json();

  return content;
}
