/* globals chrome */

import helpers from '../../helpers.js';

/**
 *
 * @param {string[]} detectedKeywords
 */
const handleMediaCommand = async (command) => {
  const tab = await helpers.getActiveTab();
  await helpers.lazyInject(tab.id, [
    'intents/media/media.js',
  ]);
  setTimeout(() => {
    chrome.tabs.sendMessage(tab.id, {
      type: 'executeIntent',
      data: {
        name: `${command}`,
      },
    });
  }, 500);
};

export default handleMediaCommand;
