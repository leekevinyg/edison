/* globals chrome */

import helpers from '../helpers.js';

const click = async (detectedKeywords) => {
  const query = buildFuseSearchQuery(detectedKeywords);
  const tab = await helpers.getActiveTab();
  // inject our click function and fuzzy search library into the current window
  // FIXME: do not inject into page if the scripts already exist
  await helpers.lazyInject(tab.id, [
    'vendor/fuse.js',
    'intents/click/fuseClick.js',
  ]);
  // send our search query to our injected click function
  // FIXME: detect when listener is in place so we don't have to use a timeout
  setTimeout(() => {
    chrome.tabs.sendMessage(tab.id, {
      query,
    }, null);
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
