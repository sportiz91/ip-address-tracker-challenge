import { lettersRegex } from '../regex';

export const detectLetters = (string) => lettersRegex.test(string);

export const normalizeString = (string) => string.toLowerCase().trim();
