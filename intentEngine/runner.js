import open from '../intents/open/index.js';
import click from '../intents/click/index.js';
import navigation from '../intents/navigation/index.js';
import scroll from '../intents/scroll/index.js';
import handleMediaCommand from '../intents/media/index.js';
import intentParser from './parser.js';

/**
 *
 * @param {string} utterence A string containing the user's utterence
 */
const run = (utterence) => {
  console.log(utterence);
  // Parse the users utterence into an intent object containing
  const intent = intentParser.parse(utterence);
  if (intent === null) {
    console.log('No command found. Please try again.');
    chrome.runtime.sendMessage({
      type: 'intentError',
      data: 'No command found. Please try again.',
    });
  }

  const { command, detectedKeywords } = intent;
  switch (command) {
    case 'open':
      open(detectedKeywords);
      break;
    case 'click':
      click(detectedKeywords);
      break;
    case 'scroll':
      scroll(detectedKeywords);
      break;
    case 'back':
      navigation.back();
      break;
    case 'forward':
      navigation.forward();
      break;
    case 'close':
      navigation.close();
      break;
    case 'rewind':
    case 'skip':
    case 'play':
    case 'pause':
      handleMediaCommand(command);
      break;
    default:
      break;
  }
};

export default {
  run,
};
