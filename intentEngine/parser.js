/**
 * This file is responsible for:
 * - Taking a raw utterance received and parsing an actionable intent from it.
 * 
 */

const parse = (utterence) => {
  const detectedKeywords = utterence[0].split(' ');
  // for now, the command is the first utterence
  const command = detectedKeywords[0];
  detectedKeywords.shift();
  switch (command) {
    case 'open':
      return {
        command: 'open',
        detectedKeywords,
      };
    // TODO: Add grammer to annyang to make "click" easier to detect OR pick a different keyword.
    case 'click':
      return {
        command: 'click',
        detectedKeywords,
      };
    default:
      break;
  }
  return null;
};

export default {
  parse,
};
