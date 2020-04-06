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
    'communication/responder.js',
    'communication/communication.js',
  ].concat(scripts);

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
      } else if (chrome.runtime.lastError) {
        // we must check chrome.runtime.lastError, otherwise an error will appear in the console.
        resolve(null);
      } else {
        resolve(null);
      }
    }));
  } catch (e) {
    return null;
  }
};

const muteTabs = () => {
  chrome.tabs.query({ url: [] }, (tabs) => {
    for (let i = 0; i < tabs.length; i++) {
      const { mutedInfo } = tabs[i];
      if (mutedInfo) chrome.tabs.update(tabs[i].id, { muted: true });
    }
  });
};

const unmuteTabs = () => {
  chrome.tabs.query({ url: [] }, (tabs) => {
    for (let i = 0; i < tabs.length; i++) {
      const { mutedInfo } = tabs[i];
      if (mutedInfo) chrome.tabs.update(tabs[i].id, { muted: false });
    }
  });
};

const getTabCount = async () => new Promise((resolve) => chrome.tabs.query(
  { currentWindow: true },
  (tabs) => {
    resolve(tabs.length);
  },
));

export default {
  lazyInject,
  getActiveTab,
  muteTabs,
  unmuteTabs,
  getTabCount,
};
