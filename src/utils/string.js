import { lettersRegex } from '../regex';

export const detectLetters = (string) => lettersRegex.test(string);
