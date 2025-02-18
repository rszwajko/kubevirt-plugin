// keyboard keys that need to press&hold the shiftKey
export const isShiftKeyRequired = (char: string): boolean =>
  !!char?.match(/[A-Z~!@#$%^&*()_+}{|\":?><]/);
