/* globals chrome */

async function lazyInject(tabId, scripts) {
  if (!tabId) {
    throw new Error(`Invalid tabId: ${tabId}`);
  }
  if (typeof scripts === 'string') {
    scripts = [scripts]; // eslint-disable-line no-param-reassign
  }
  const scriptKey = scripts.join(',');
  let available = true;
  try {
    available = await chrome.tabs.sendMessage(tabId, {
      type: 'ping',
      scriptKey,
    });
    if (!available) {
      available = 'some';
    }
  } catch (e) {
    throw new Error(`could not send message to tab ${tabId}`);
  }
  if (available === 'some') {
    for (let i = 0; i < scripts.length; i++) {
      await chrome.tabs.executeScript(tabId, { // eslint-disable-line no-await-in-loop
        file: scripts[i],
        runAt: 'document_idle',
      });
    }
    return;
  }
  if (available) {
    return;
  }
  for (let i = 0; i < scripts.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    await chrome.tabs.executeScript(tabId, { file: scripts[i] });
  }
}

export default {
  lazyInject,
};
