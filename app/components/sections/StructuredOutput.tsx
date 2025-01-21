import { StructuredOutputState } from '@/app/types';

interface StructuredOutputProps {
  structuredOutput: StructuredOutputState;
  isActive: boolean;
  destination: string;
}

export default function StructuredOutput({
  structuredOutput,
  isActive,
  destination,
}: StructuredOutputProps) {
  const { list, errorText } = structuredOutput;

  if (!isActive) {
    return null; // Show nothing until isActive is true
  }

  return (
    <div className="p-6 bg-gray-900 rounded-md">
      {errorText === '' ? (
        <>
          <h1 className="text-gray-300 text-2xl font-semibold">Packing List for {destination}</h1>
          {Object.keys(list).length > 0 ? (
            Object.keys(list).map((category, index) => (
              <div key={index}>
                {/* Displaying category header */}
                <h3 className="text-gray-300 text-lg font-semibold">{category}</h3>
                {/* Displaying bullet points for items */}
                {list[category].length > 0 && (
                  <ul className="list-disc list-inside ml-4">
                    {list[category].map((item, valueIndex) => (
                      <li key={valueIndex} className="text-gray-200">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {/* Adding a new line after each section */}
                <div className="my-4"></div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">Waiting for validated output...</p>
          )}
        </>
      ) : (
        <p className="text-red-500 text-center">{errorText}</p>
      )}
    </div>
  );
}
