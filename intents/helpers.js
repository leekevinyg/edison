/* globals chrome */

const getActiveTab = async () => new Promise((resolve) => chrome.tabs.query({
  active: true,
  currentWindow: true,
}, (tabs) => {
  resolve(tabs[0]);
}));

const lazyInject = async (tabId, scripts) => {
  if (!tabId) {
    throw new Error(`Invalid tabId: ${tabId}`);
  }
  const injectedScripts = [
    'communication/communication.js',
  ].concat(scripts).concat(
    'communication/responder.js',
  );
  const loadedScripts = await getLoadedScripts(tabId);
  for (let i = 0; i < injectedScripts.length; i++) {
    if (!loadedScripts || !loadedScripts[injectedScripts[i]]) {
      // eslint-disable-next-line no-await-in-loop
      await chrome.tabs.executeScript(tabId, { file: injectedScripts[i] });
      chrome.tabs.sendMessage(tabId, {
        type: 'scriptsLoaded',
        scriptKey: injectedScripts[i],
      });
    }
  }
};

const getLoadedScripts = async (tabId) => {
  try {
    return new Promise((resolve) => chrome.tabs.sendMessage(tabId, {
      type: 'getLoadedScripts',
    }, (response) => {
      if (response && response.loadedScripts) {
        resolve(response.loadedScripts);
      } else {
        resolve(null);
      }
    }));
  } catch (e) {
    return null;
  }
};

export default {
  lazyInject,
  getActiveTab,
};
