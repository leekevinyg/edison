/* globals chrome */

import helpers from '../../helpers.js';

/**
 *
 * @param {string[]} detectedKeywords
 */
const click = async (detectedKeywords) => {
  const query = buildFuseSearchQuery(detectedKeywords);
  const tab = await helpers.getActiveTab();
  // inject our click function and fuzzy search library into the current window
  await helpers.lazyInject(tab.id, [
    'vendor/fuse.js',
    'intents/click/fuseClick.js',
  ]);
  setTimeout(() => {
    // send our search query to our injected click function
    chrome.tabs.sendMessage(tab.id, {
      type: 'executeIntent',
      data: {
        name: 'click',
        param: query,
      },
    });
  }, 500);
};

/**
 *
 * @param {string[]} keywords
 */
const buildFuseSearchQuery = (keywords) => {
  let query = '';
  for (let i = 0; i < keywords.length; i++) {
    query = query.concat(`${keywords[i]} `);
  }
  return query;
};

export default click;
