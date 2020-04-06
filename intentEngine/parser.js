/**
 * This file is responsible for:
 * - Taking a raw utterance received and parsing an actionable intent from it.
 *
 */

const commands = ['click', 'open', 'close', 'back', 'forward', 'scroll', 'play', 'rewind',
  'skip', 'pause', 'clicks', 'quick', 'focus', 'go'];

const parse = (utterence) => {
  const detectedKeywords = utterence.split(' ');
  // for now, the command is the first utterence
  const command = detectedKeywords[0].toLowerCase();
  detectedKeywords.shift();
  switch (command) {
    case 'click':
    case 'clicks':
    case 'quick':
      return {
        command: 'click',
        detectedKeywords,
      };
    case 'open':
    case 'go':
    case 'focus':
    case 'scroll': {
      return {
        command,
        detectedKeywords,
      };
    }
    case 'close':
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
  console.log(`phrases detected: ${utterences}`);
  for (let i = 0; i < utterences.length; i++) {
    let currentUtterence = utterences[i];
    // TEMP STABILITY WORKAROUND
    if (currentUtterence === 'quick paws') {
      currentUtterence = 'click pause';
    }
    const currentCommand = currentUtterence.split(' ')[0].toLowerCase();
    if (commands.includes(currentCommand)) {
      console.log(`command: ${currentUtterence}`);
      return currentUtterence;
    }
  }
  return null;
};

export default {
  parse,
  pickBestUtterenceDetected,
};
