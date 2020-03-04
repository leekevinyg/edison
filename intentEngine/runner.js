import open from '../intents/open/index.js';
import click from '../intents/click/index.js';
import navigation from '../intents/navigation/index.js';

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
    case 'back':
      console.log('trying to run back intent');
      navigation.back();
      break;
    case 'forward':
      console.log('trying to run forward intent');
      navigation.forward();
      break;
    case 'close':
      console.log('trying to run close intent');
      navigation.close();
      break;
    default:
      break;
  }
};

export default {
  run,
};
