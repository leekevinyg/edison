import open from '../intents/open/index.js';
import click from '../intents/click/index.js';
import navigation from '../intents/navigation/index.js';
import scroll from '../intents/scroll/index.js';
import handleMediaCommand from '../intents/media/index.js';

/**
 *
 * @param {object} intent
 * @param {string} intent.command
 * @param {string[]} intent.detectedKeywords An array of detected utterences
 */
const run = (intent) => {
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
