import { UserInputState } from '../types';

export default function craftPrompt(
  userInput: UserInputState,
  templatedPrompt: string
) {
  const { destination, arrival, duration } = userInput;

  const prompt = templatedPrompt
    .replace('<DESTINATION>', destination)
    .replace(
      '<ARRIVAL>',
      arrival != null ? arrival.toISOString().split('T')[0] : ''
    )
    .replace('<DURATION>', duration != null ? duration.toString() : '');

  return prompt;
}
