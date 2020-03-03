/* global chrome */

/**
 * @param {string[]} detectedKeywords An array of keywords
 */
const open = async (detectedKeywords) => {
  const query = buildQuery(detectedKeywords);
  await createTab(`https://www.google.com/search?q=${query}&btnI`);
  /* TODO: Investigate why popup is closing without this message
  chrome.runtime.sendMessage({
    type: 'intentSuccesful',
  });
  */
};

/**
 *
 * @param {string[]} keywords
 */
const buildQuery = (keywords) => {
  let query = '';
  for (let i = 0; i < keywords.length; i++) {
    query = query.concat(`${keywords[i]}+`);
  }
  return query;
};

/**
 *
 * @param {string} url
 */
const createTab = async (url) => new Promise((resolve) => {
  chrome.tabs.create({ url }, async (tab) => {
    chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
      const changeUrl = info.url;
      const isGoogleRedirect = /^https:\/\/www.google.com\/url\?/.test(changeUrl);
      if (isGoogleRedirect) {
        const params = new URL(changeUrl).searchParams;
        const newUrl = params.get('q');
        chrome.tabs.update(tab.id, { url: newUrl });
        chrome.tabs.onUpdated.removeListener(listener);
        resolve(tab);
      }
    });
  });
});

export default open;
