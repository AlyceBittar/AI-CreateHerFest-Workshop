export enum Section {
  UserInput = 'User Input',
  StructuredOutput = 'Structured Output',
  EngineeredPrompt = 'Engineered Prompt',
  ParsingAndValidation = 'Parsing & Validation',
  AiModelVisualization = 'AI Model',
}

export interface UserInputState {
  destination: string;
  arrival: Date | null;
  duration: number | null;
}

export interface StructuredOutputState {
  list: Record<string, string[]>;
  errorText: string;
}
