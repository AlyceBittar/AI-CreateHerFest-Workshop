import { StructuredOutputState } from '@/app/types';

interface StructuredOutputProps {
  structuredOutput: StructuredOutputState;
  isActive: boolean;
}

export default function StructuredOutput({
  structuredOutput,
  isActive,
}: StructuredOutputProps) {
  const { list, errorText } = structuredOutput;

  return (
    <div className="p-6 bg-gray-900 rounded-md">
      {errorText == '' ? (
        <>
          <ul className="list-disc list-inside space-y-2">
            {list.map((item, index) => (
              <li key={index} className="text-gray-200">
                {item}
              </li>
            ))}
          </ul>
          {list.length === 0 ||
            (!isActive && (
              <p className="text-gray-400 text-center">Waiting for output...</p>
            ))}
        </>
      ) : (
        <p className="text-red text-center">{errorText}</p>
      )}
    </div>
  );
}
