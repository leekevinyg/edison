/* global chrome */
/* eslint-disable no-shadow */

const open = async (data) => {
  // execute a google search on the data array of keywords
  let query = '';
  for (let i = 0; i < data.length; i++) {
    query = query.concat(`${data[i]}+`);
  }
  const tab = await chrome.tabs.create({
    url: `https://www.google.com/search?q=${query}&btnI`,
  });

  /* TODO handle google redirect page */
  if (tab.title === 'Redirect Notice') {
    const params = new URL(tab.url).searchParams;
    const newUrl = params.get('q');
    chrome.tabs.update(tab.id, { url: newUrl });
  }
  chrome.runtime.sendMessage({
    type: 'intentSuccesful',
  });
};

export default open;
