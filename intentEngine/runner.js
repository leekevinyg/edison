import open from '../intents/open/index.js';
import click from '../intents/click/index.js';
import navigation from '../intents/navigation/index.js';
import scroll from '../intents/scroll/index.js';
import handleMediaCommand from '../intents/media/index.js';
import intentParser from './parser.js';
import { STATES } from '../constants.js';
/**
 *
 * @param {string} utterence A string containing the user's utterence
 */
const run = (utterence) => {
  console.log(utterence);
  const intent = intentParser.parse(utterence);
  if (intent === null) {
    const msg = new SpeechSynthesisUtterance(STATES.ERROR);
    window.speechSynthesis.speak(msg);
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
    case 'go':
      if (detectedKeywords[0] === 'back') {
        navigation.back();
      } else if (detectedKeywords[0] === 'forward') {
        navigation.forward();
      }
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
    case 'focus':
      if (detectedKeywords[0] === 'next') {
        navigation.focusNextTab();
      } else if (detectedKeywords[0] === 'previous') {
        navigation.focusPreviousTab();
      }
      break;
    default:
      break;
  }
};

export default {
  run,
};
