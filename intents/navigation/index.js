/* globals chrome */

import helpers from '../../helpers.js';

const back = async () => {
  const tab = await helpers.getActiveTab();
  await chrome.tabs.executeScript(tab.id, {
    code: 'window.history.back();',
  });
};

const forward = async () => {
  const tab = await helpers.getActiveTab();
  await chrome.tabs.executeScript(tab.id, {
    code: 'window.history.forward();',
  });
};

const close = async () => {
  const tab = await helpers.getActiveTab();
  await chrome.tabs.remove(tab.id);
};

const focusNextTab = async () => {
  const tab = await helpers.getActiveTab();
  const tabCount = await helpers.getTabCount();
  const activeTabIndex = tab.index;
  const targetTabIndex = [activeTabIndex + 1] % tabCount;
  chrome.tabs.highlight({ tabs: [targetTabIndex] });
};

const focusPreviousTab = async () => {
  const tab = await helpers.getActiveTab();
  const tabCount = await helpers.getTabCount();
  const activeTabIndex = tab.index;
  const targetTabIndex = [tabCount + activeTabIndex - 1] % tabCount;
  chrome.tabs.highlight({ tabs: [targetTabIndex] });
};

export default {
  back,
  forward,
  close,
  focusNextTab,
  focusPreviousTab,
};
