/* global chrome */

/**
 *
 * Thie file is responsible for:
 * - Parsing an utterence received into an intent, and then running it.
 *
 */

import BumbleBee from './vendor/bumblebee/bumblebee.js';
import intentParser from './intentEngine/parser.js';
import intentRunner from './intentEngine/runner.js';

/**
 *
 * @param {object} message
 * @param {string} message.type
 * @param {string} message.utterence
 */
const processMessage = (message) => {
  const { type, utterence } = message;
  switch (type) {
    case 'runIntent': {
      const intent = intentParser.parse(utterence);
      if (intent) {
        intentRunner.run(intent);
      } else {
        chrome.runtime.sendMessage({
          type: 'intentError',
          data: 'No command found. Please try again.',
        });
      }
    }
      break;
    default:
      break;
  }
};

chrome.runtime.onMessage.addListener(processMessage);

let bumblebee = new BumbleBee();
bumblebee.setWorkersPath('vendor/bumblebee/workers');
bumblebee.addHotword('bumblebee');
bumblebee.setSensitivity(0.5);
bumblebee.on('hotword', function(hotword) {
  chrome.tabs.create( {url:"../popup/popup.html"} );
});
bumblebee.start();