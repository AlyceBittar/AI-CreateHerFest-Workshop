import { UserInputState } from '@/app/types';
import craftPrompt from '@/app/utils/craftPrompt';

interface EngineeredPromptProps {
  engineeredPrompt: string;
  setEngineeredPrompt: (engineeredPrompt: string) => void;
  userInput: UserInputState;
  errorFeedback: string;
  errorContext: string;
  isActive: boolean;
}

export default function EngineeredPrompt({
  engineeredPrompt,
  setEngineeredPrompt,
  errorFeedback,
  errorContext,
  userInput,
  isActive,
}: EngineeredPromptProps) {
  return (
    <div className="p-6 bg-gray-900 rounded-md text-center">
      <textarea
        className="w-full text-gray-200 bg-transparent border-none focus:outline-none resize-none min-h-[100px]"
        value={
          !isActive
            ? engineeredPrompt
            : craftPrompt(userInput, engineeredPrompt)
        }
        onChange={(e) => setEngineeredPrompt(e.target.value)}
        style={{ height: 'auto', overflow: 'hidden' }}
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;
          target.style.height = 'auto';
          target.style.height = `${target.scrollHeight}px`;
        }}
      />
      {isActive && errorFeedback && errorContext && (
        <div>
          <p className="text-white">{errorContext}</p>
          <p className="text-red-500">{errorFeedback}</p>
        </div>
      )}
    </div>
  );
}
