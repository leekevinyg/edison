import open from '../intents/open/index.js';
import click from '../intents/click/index.js';

/**
 *
 * @param {object} intent
 * @param {string} intent.command
 * @param {string[]} intent.data An array of detected utterences
 */
const run = (intent) => {
  const { command, data } = intent;

  switch (command) {
    case 'open':
      open(data);
      break;
    case 'click':
      click(data);
      break;
    default:
      break;
  }
};

export default {
  run,
};
