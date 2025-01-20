'use client';

import { Section, StructuredOutputState, UserInputState } from '@/app/types';
import {
  ENGINEERED_PROMPT_DEFAULT,
  ERROR_CONTEXT_DEFAULT,
  STAGE_WAIT_TIME,
} from '@/app/constants';
import Column from '@/app/components/Column';
import Box from '@/app/components/Box';
import VerticalDivider from '@/app/components/VerticalDivider';
import {
  UserInput,
  StructuredOutput,
  EngineeredPrompt,
  ParsingAndValidation,
  AiModelVisualization,
} from '@/app/components/sections';
import { useEffect, useState } from 'react';
import craftPrompt from './utils/craftPrompt';
import promptModel from './utils/promptModel';

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>(
    Section.UserInput
  );
  const [userInput, setUserInput] = useState<UserInputState>({
    destination: '',
    arrival: null,
    duration: null,
  });
  const [engineeredPrompt, setEngineeredPrompt] = useState<string>(
    ENGINEERED_PROMPT_DEFAULT
  );
  const [errorFeedback, setErrorFeedback] = useState<string>('');
  const [errorContext, setErrorContext] = useState<string>(
    ERROR_CONTEXT_DEFAULT
  );
  const [maxAttempts, setMaxAttempts] = useState<number>(3);
  const [validationUpdateText, setValidationUpdateText] = useState<string>('');
  const [structuredOutput, setStructuredOutput] =
    useState<StructuredOutputState>({
      list: [],
      errorText: '',
    });
  const [modelOutput, setModelOutput] = useState<string>('');

  // If the user edits their input, set the active section to UserInput
  useEffect(() => {
    resetState();
  }, [userInput]);

  const submitUserInput = async () => {
    try {
      // Set the active section to the engineered prompt section.
      setActiveSection(Section.EngineeredPrompt);

      // Wait to display to user that the prompt is being generated.
      await new Promise((resolve) => setTimeout(resolve, STAGE_WAIT_TIME));

      // Craft the final prompt and submit to OpenAI.
      const prompt = craftPrompt(userInput, engineeredPrompt);

      let attempt = 1;
      while (attempt <= maxAttempts) {
        // If the model is not valid, try again.
        setActiveSection(Section.AiModelVisualization);
        const content = await promptModel(craftPromptWithErrorContext(prompt));
        setModelOutput(content);
        await new Promise((resolve) => setTimeout(resolve, STAGE_WAIT_TIME));

        // Parse and validate the output.
        setActiveSection(Section.ParsingAndValidation);
        const { parsedOutput, isValid, error } = await parseAndValidateOutput(
          content
        );

        // If the output is valid, break.
        if (isValid) {
          setStructuredOutput({
            list: parsedOutput!,
            errorText: '',
          });
          break;
        }
        // If the model is not valid after maxAttempts, throw an error.
        if (attempt === maxAttempts) {
          setStructuredOutput({
            list: [],
            errorText: 'Something went wrong. Please try again.',
          });
        }

        if (error) {
          setErrorFeedback(error);
          setActiveSection(Section.EngineeredPrompt);
          await new Promise((resolve) => setTimeout(resolve, STAGE_WAIT_TIME));
        }

        // Otherwise, try again.
        attempt++;
      }

      // Set the active section to the structured output section.
      setActiveSection(Section.StructuredOutput);
      setErrorFeedback('');
    } catch (error) {
      console.error('Error submitting user input', error);
      resetState();
    }
  };

  const craftPromptWithErrorContext = (prompt: string) => {
    if (errorFeedback != '') {
      return `${prompt}\n\n${errorContext}\n\n${errorFeedback}\n\n`;
    }
    return prompt;
  };

  const resetState = () => {
    setStructuredOutput({ list: [], errorText: '' });
    setErrorFeedback('');
    setActiveSection(Section.UserInput);
    setModelOutput('');
  };

  const parseAndValidateOutput = async (
    content: string
  ): Promise<{
    parsedOutput?: Array<string>;
    isValid: boolean;
    error: string;
  }> => {
    let parsedOutput: Array<string> = [];

    // Update the validation update text.
    setValidationUpdateText('Parsing and validating output...');
    await new Promise((resolve) => setTimeout(resolve, STAGE_WAIT_TIME));

    // Parse as an array:
    setValidationUpdateText('Checking if output is an array...');
    await new Promise((resolve) => setTimeout(resolve, STAGE_WAIT_TIME));
    try {
      parsedOutput = JSON.parse(content);
      if (!Array.isArray(parsedOutput)) {
        return { isValid: false, error: 'Output is not an array' };
      }
      // Validate the array contains only strings:
      setValidationUpdateText('Checking if all elements are strings...');
      await new Promise((resolve) => setTimeout(resolve, STAGE_WAIT_TIME));

      const containsOnlyStrings = parsedOutput.every(
        (item) => typeof item === 'string'
      );
      if (!containsOnlyStrings) {
        return { isValid: false, error: 'Output is not an array of strings' };
      }
    } catch {
      return { isValid: false, error: 'Output is not a valid JSON array' };
    }

    return { isValid: true, error: '', parsedOutput: parsedOutput };
  };

  return (
    <div className="flex flex-1 gap-6 min-h-0 h-full w-full">
      {/* Column 1 */}
      <Column title="📱💻 Client">
        <Box
          title={Section.UserInput}
          isActive={activeSection === Section.UserInput}
        >
          <UserInput
            userInput={userInput}
            setUserInput={setUserInput}
            onSubmit={submitUserInput}
          />
        </Box>
        <Box
          title={Section.StructuredOutput}
          isActive={activeSection === Section.StructuredOutput}
        >
          <StructuredOutput
            structuredOutput={structuredOutput}
            isActive={activeSection === Section.StructuredOutput}
          />
        </Box>
      </Column>

      {/* Vertical Divider */}
      <VerticalDivider />

      {/* Column 2 */}
      <Column title="📡 Server">
        <Box
          title={Section.EngineeredPrompt}
          isActive={activeSection === Section.EngineeredPrompt}
        >
          <EngineeredPrompt
            errorFeedback={errorFeedback}
            errorContext={errorContext}
            engineeredPrompt={engineeredPrompt}
            setEngineeredPrompt={setEngineeredPrompt}
            userInput={userInput}
            isActive={activeSection === Section.EngineeredPrompt}
          />
        </Box>
        <Box
          title={Section.ParsingAndValidation}
          isActive={activeSection === Section.ParsingAndValidation}
        >
          <ParsingAndValidation
            validationUpdateText={validationUpdateText}
            maxAttempts={maxAttempts}
            setMaxAttempts={setMaxAttempts}
            setErrorContext={setErrorContext}
            errorContext={errorContext}
          />
        </Box>
      </Column>

      {/* Vertical Divider */}
      <VerticalDivider />

      {/* Column 3 */}
      <Column title="🤖 AI (API or Self-Hosted)">
        <Box
          title={Section.AiModelVisualization}
          isActive={activeSection === Section.AiModelVisualization}
        >
          <AiModelVisualization
            modelOutput={modelOutput}
            isActive={activeSection === Section.AiModelVisualization}
          />
        </Box>
      </Column>
    </div>
  );
}
