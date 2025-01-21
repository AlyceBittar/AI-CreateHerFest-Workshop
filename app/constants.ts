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
`
You are a travel assistant creating a lean packing list for a trip to <DESTINATION> from <ARRIVAL> for <DURATION> days. 
Based on weather forecasts and general travel needs for a woman, generate a packing list organized into categories. 
Limit each category to the necessary # of items with a maximum of 7 items. 
Optional items should be marked with an asterisk. 
Focus on essentials but feel free to include recommendations.

Example output structure:
{
  "Location Info": ["During your stay the weather is typically ..."],
  "Clothing": ["# Tops", "# Bottoms", "# Underwear", "# Activewear"],
  "Toiletries": ["Hairbrush", "Toothbrush", "Toothpaste", "Skincare products (Moisturizer, Sunscreen, Body Lotion)"],
  "Electronics": ["Smartphone", "Chargers", "Portable Power Bank*"],
  "Travel Documents": ["Passport", "Travel itinerary", "Ticket Info (Virtual or Printed)", "Photocopy of Sensitive Documents"]
}

Return the packing list as key-value pairs with appropriate categories.
`
export const ERROR_CONTEXT_DEFAULT =
  'Got an error when trying to parse your response:';
