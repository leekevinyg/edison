/**
 * This file is responsible for:
 * - Taking a raw utterance received and parsing an actionable intent from it.
 *
 */

const commands = ['click', 'open', 'close', 'back', 'forward', 'scroll', 'play', 'rewind',
  'skip', 'pause'];

const parse = (utterence) => {
  const detectedKeywords = utterence.split(' ');
  // for now, the command is the first utterence
  const command = detectedKeywords[0].toLowerCase();
  detectedKeywords.shift();
  switch (command) {
    case 'open':
    case 'click':
    case 'scroll': {
      return {
        command,
        detectedKeywords,
      };
    }
    case 'close':
    case 'back':
    case 'forward':
    case 'play':
    case 'pause':
    case 'rewind':
    case 'skip': {
      return {
        command,
      };
    }
    default:
      break;
  }
  return null;
};

const pickBestUtterenceDetected = (utterences) => {
  for (let i = 0; i < utterences.length; i++) {
    const currentUtterence = utterences[i];
    const currentCommand = currentUtterence.split(' ')[0].toLowerCase();
    if (commands.includes(currentCommand)) {
      return currentUtterence;
    }
  }
  return utterences[0];
};

export default {
  parse,
  pickBestUtterenceDetected,
};
