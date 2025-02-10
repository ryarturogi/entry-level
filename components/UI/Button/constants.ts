export const COLOR_MAP: Record<string, string> = {
  primary:
    'bg-primary-700 hover:bg-secondary-500 active:ring-primary-600  active:outline-none active:bg-primary-600 text-white',
  secondary:
    'bg-secondary-500 hover:bg-primary-700 active:ring-primary-600  active:outline-none active:bg-primary-600 text-white',
  success:
    'bg-success hover:bg-primary-700 active:ring-primary-600  active:outline-none active:bg-primary-600 text-white',
  danger: 'bg-error-200 hover:bg-error-100 text-white',
  warning: 'bg-warning hover:bg-error-200 text-white',
  info: 'bg-info hover:bg-primary-700 active:ring-primary-600  active:outline-none active:bg-primary-600 text-white',
  link: 'bg-transparent text-gray-800 hover:text-primary-500 hover:bg-gray-200',
  disabled: 'bg-gray-200 text-gray-500 cursor-not-allowed',
  white:
    'bg-white text-gray-800 hover:bg-primary-700 border-2 border-primary-100 hover:border-primary-700 active:ring-secondary-500 active:outline-none active:bg-secondary-900 hover:text-white',
  gray: 'bg-gray-200 text-gray-800 hover:text-primary-500 hover:bg-gray-300',
  dark: 'text-white bg-gray-800 hover:bg-primary-700 active:ring-primary-600  active:outline-none active:bg-primary-600 text-white',
  transparent: 'bg-transparent text-gray-800 hover:text-primary-500 hover:bg-gray-200',
  outlined: 'bg-primary-50 text-primary-700 hover:text-primary-700 hover:bg-gray-100',
};

export const SIZE_MAP: Record<string, string> = {
  sm: 'text-sm py-1 px-4',
  md: 'text-base py-2.5 px-6',
  lg: 'text-lg py-3 px-8',
};

export const ROUNDED_MAP: Record<string, string> = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
};

export const DISPLAY_TYPE_MAP: Record<string, string> = {
  'block w-full': 'block',
  inline: 'inline-block',
  'flex w-full': 'flex',
  'inline-flex': 'inline-flex',
};
