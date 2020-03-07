/* globals chrome */

import helpers from '../../helpers.js';

/**
 *
 * @param {string[]} detectedKeywords
 */
const scroll = async (detectedKeywords) => {
  const tab = await helpers.getActiveTab();
  await helpers.lazyInject(tab.id, [
    'intents/scroll/fuseScroll.js',
  ]);
  const scrollDirection = getScrollDirection(detectedKeywords);
  setTimeout(() => {
    chrome.tabs.sendMessage(tab.id, {
      type: 'executeIntent',
      data: {
        name: `scroll${scrollDirection}`,
      },
    });
  }, 500);
};

/**
 *
 * @param {string[]} detectedKeywords
 */
const getScrollDirection = (detectedKeywords) => {
  for (let i = 0; i < detectedKeywords.length; i++) {
    const word = detectedKeywords[i].toLowerCase();
    if (word.includes('up')) {
      return 'Up';
    }
    if (word.includes('down')) {
      return 'Down';
    }
    if (word.includes('right')) {
      return 'Right';
    }
    if (word.includes('left')) {
      return 'Left';
    }
  }
  return 'Down';
};

export default {
  scroll,
};
