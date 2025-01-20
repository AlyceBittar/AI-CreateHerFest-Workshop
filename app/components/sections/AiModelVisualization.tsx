interface AiModelVisualizationProps {
  isActive: boolean;
  modelOutput: string;
}

export default function AiModelVisualization({
  modelOutput,
  isActive,
}: AiModelVisualizationProps) {
  return (
    <div className="flex items-center justify-center h-full flex-col p-10">
      <div
        className={`text-[200px] ${
          isActive ? 'animate-bounce' : ''
        } hover:scale-110 transition-transform cursor-pointer select-none`}
      >
        🤖
      </div>
      {modelOutput && (
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-left mb-2">Model Output</h2>
          <p className="text-gray-200">{modelOutput}</p>
        </div>
      )}
    </div>
  );
}
