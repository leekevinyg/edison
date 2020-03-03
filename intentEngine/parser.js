/**
 * This file is responsible for:
 * - Taking a raw utterance received and parsing an actionable intent from it.
 * - For now, the first utterence detected is the command, and the following words spoken
 *   after form a keyword array.
 * - An intent is an object with a ```command``` string and data object containing an
 *   array of keywords spoken after
 */

const parse = (utterence) => {
  const spokenWords = utterence[0].split(' ');
  // for now, the command is the first utterence
  const command = spokenWords[0];
  spokenWords.shift();
  switch (command) {
    case 'open':
      return {
        command: 'open',
        data: spokenWords,
      };
    case 'click':
      return {
        command: 'click',
        data: spokenWords,
      };
    default:
      break;
  }
  return null;
};

export default {
  parse,
};
