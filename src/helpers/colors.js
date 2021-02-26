export const THEME_TITLES = [
  'Light',
  'Dark',
  'Light/Contrast',
  'Dark/Contrast',
];

export const THEME_COLORS = [
  'bg',
  'text',
  'text-soft',
  'text-strong',
  'subtle',
  'border',
  'shadow',
  'input',
  'outline',
  'mark',
  'special',
  'special-bg',
  'special-text',
  'special-shadow',
  'special-mark',
  'light',
  'dark',
];

export const MAIN_THEME_COLORS = ['bg', 'text', 'text-soft', 'text-strong', 'subtle', 'shadow', 'border', 'input'];

/**
 * Convert a single number to a hex code.
 * @param {number} c
 * @return {string}
 */
function componentToHex(c) {
  const hex = c.toString(16);

  return hex.length === 1 ? "0" + hex : hex;
}

/**
 * Convert rgb to hex.
 * @param {Number} r
 * @param {Number} g
 * @param {Number} b
 * @param {Number} a
 * @return {string}
 */
export function rgbToHex(r, g, b, a) {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}${a != null && a !== 1 ? componentToHex(Math.round(a * 255)) : ''}`;
}
