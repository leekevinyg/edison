/* globals chrome, communicate */

/**
 * This file handles communication between content scripts and our extension code.
 */

this.responder = (function () {
  const loadedScripts = {};
  function init() {
    chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
      if (request.type === 'getLoadedScripts') {
        sendResponse({
          loadedScripts,
        });
      }
      if (request.type === 'scriptsLoaded') {
        loadedScripts[request.scriptKey] = true;
      }
      if (request.type === 'executeIntent') {
        communicate.handle(request.data);
      }
      return true;
    });
  }
  init();
}());
