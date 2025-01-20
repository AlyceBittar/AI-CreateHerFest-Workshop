import { useState, FormEvent } from 'react';
import { COLORS } from '@/app/constants';
import Spinner from '@/app/components/Spinner';
import { UserInputState } from '@/app/types';

interface UserInputProps {
  userInput: UserInputState;
  setUserInput: (userInput: UserInputState) => void;
  onSubmit: () => Promise<void>;
}

export default function UserInput({
  userInput,
  setUserInput,
  onSubmit,
}: UserInputProps) {
  const { destination, arrival, duration } = userInput;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, destination: e.target.value });
  };

  const handleArrivalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, arrival: new Date(e.target.value) });
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, duration: parseInt(e.target.value) });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!destination || !arrival || !duration) return;

    try {
      setIsLoading(true);
      await onSubmit();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const canSubmit =
    destination.trim() !== '' &&
    arrival !== null &&
    duration !== null &&
    duration > 0;

  return (
    <div className={`p-6 ${COLORS.BG.PRIMARY} rounded-md`}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="destination"
            className={`${COLORS.TEXT.PRIMARY} text-left`}
          >
            Where are you going?
          </label>
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={handleDestinationChange}
            className={`p-2 rounded ${COLORS.BG.INPUT} ${COLORS.TEXT.PRIMARY} border ${COLORS.BORDER.DEFAULT} ${COLORS.BORDER.FOCUS} focus:outline-none`}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="arrival"
            className={`${COLORS.TEXT.PRIMARY} text-left`}
          >
            When will you be there?
          </label>
          <input
            type="date"
            id="arrival"
            value={arrival ? arrival.toISOString().split('T')[0] : ''}
            onChange={handleArrivalChange}
            className={`p-2 rounded ${COLORS.BG.INPUT} ${COLORS.TEXT.PRIMARY} border ${COLORS.BORDER.DEFAULT} ${COLORS.BORDER.FOCUS} focus:outline-none`}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="duration"
            className={`${COLORS.TEXT.PRIMARY} text-left`}
          >
            How long will you stay? (days)
          </label>
          <input
            type="number"
            id="duration"
            value={duration || ''}
            onChange={handleDurationChange}
            min="1"
            className={`p-2 rounded ${COLORS.BG.INPUT} ${COLORS.TEXT.PRIMARY} border ${COLORS.BORDER.DEFAULT} ${COLORS.BORDER.FOCUS} focus:outline-none`}
            required
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <button
            type="submit"
            disabled={!canSubmit}
            className={`mt-4 py-2 px-4 rounded ${COLORS.BG.BUTTON} ${
              COLORS.TEXT.BUTTON
            } font-semibold transition-colors ${
              !canSubmit ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Generate Packing List
          </button>
        )}
      </form>
    </div>
  );
}
