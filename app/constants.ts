export const LAYOUT = {
  HEADER_HEIGHT: '80px',
  FOOTER_HEIGHT: '60px',
} as const;

export const APP_TITLE = 'Packing List Generator';

export const STAGE_WAIT_TIME = 2000;

export const COLORS = {
  BG: {
    PRIMARY: 'bg-gray-900',
    INPUT: 'bg-gray-800',
    BUTTON: 'bg-blue-500 hover:bg-blue-600',
  },
  BORDER: {
    DEFAULT: 'border-gray-700',
    FOCUS: 'focus:border-blue-500',
  },
  TEXT: {
    PRIMARY: 'text-gray-200',
    BUTTON: 'text-white',
  },
} as const;

export const ENGINEERED_PROMPT_DEFAULT =
  'Generate a packing list for my trip to <DESTINATION>. I will be arriving on <ARRIVAL> and staying for <DURATION> days.';

export const ERROR_CONTEXT_DEFAULT =
  'Got an error when trying to parse your response:';
