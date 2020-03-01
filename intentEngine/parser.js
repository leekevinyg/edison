/**
 * This file is responsible for:
 * - Taking a raw utterance received and parsing an actionable intent from it.
 * - An intent is an object with a command string and data object:
 */

const parse = (utterence) => {
  let wordArray = utterence[0].split(' ');
  const command = wordArray[0];
  wordArray.unshift();
  switch (command) {
    case 'open':
      return {
        command: 'open',
        data: wordArray,
      };
    default:
      break;
  }
  return null;
};

export default {
  parse,
};
