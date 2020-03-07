/**
 * This file is responsible for:
 * - Taking a raw utterance received and parsing an actionable intent from it.
 *
 */

const commands = ['click', 'open', 'close', 'back'];

const parse = (utterences) => {
  let chosenUtterence = null;

  if (utterences.length > 1) {
    // more than one possible match to the utterence, pick the best one that we can respond to.
    chosenUtterence = pickBestUtterenceDetected(utterences);
  } else {
    [chosenUtterence] = utterences;
  }
  const detectedKeywords = chosenUtterence.split(' ');
  // for now, the command is the first utterence
  const command = detectedKeywords[0].toLowerCase();
  detectedKeywords.shift();
  switch (command) {
    case 'open':
      return {
        command,
        detectedKeywords,
      };
    case 'click':
      return {
        command,
        detectedKeywords,
      };
    case 'close':
      return {
        command,
      };
    case 'back': {
      return {
        command,
      };
    }
    default:
      break;
  }
  return null;
};

let pickBestUtterenceDetected = (utterences) => {
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
};
