interface ParsingAndValidationProps {
  maxAttempts: number;
  setMaxAttempts: (maxAttempts: number) => void;
  numberOfAttempts: number;
  validationUpdateText: string;
  errorContext: string;
  setErrorContext: (errorContext: string) => void;
}

export default function ParsingAndValidation({
  maxAttempts,
  setMaxAttempts,
  numberOfAttempts,
  validationUpdateText,
  errorContext,
  setErrorContext,
}: ParsingAndValidationProps) {
  return (
    <div className="p-6 bg-gray-900 rounded-md text-center">
      <div className="flex items-center justify-center gap-4">
        <label className="text-gray-200 text-left font-extrabold">
          Max Validation Attempts:
        </label>
        <input
          type="number"
          min={1}
          max={10}
          value={maxAttempts}
          onChange={(e) =>
            setMaxAttempts(
              Math.max(1, Math.min(10, parseInt(e.target.value) || 1))
            )
          }
          className="w-20 px-2 py-1 text-gray-200 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      {validationUpdateText && (
        <>
          <p className="text-green-500 mt-4">{validationUpdateText}</p>
          <p className="text-green-500 mt-4">Number of Attempts: {numberOfAttempts}</p>
        </>
      )}
      {/* <div>
        <p className="text-gray-200 mt-8 mb-2 font-extrabold text-left">
          Error Context text:
        </p>
        <textarea
          className="w-full h-full text-gray-200 bg-transparent border-none focus:outline-none resize-none"
          value={errorContext}
          onChange={(e) => setErrorContext(e.target.value)}
          style={{ height: 'auto', overflow: 'hidden' }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = 'auto';
            target.style.height = `${target.scrollHeight}px`;
          }}
        />
      </div> */}
      
    </div>
  );
}
