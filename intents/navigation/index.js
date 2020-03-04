/* globals chrome */

import helpers from '../helpers';

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

/* TODO:
const focusNextTab = () => {

};

const focusPreviousTab = () => {

};
*/

export default {
  back,
  forward,
  close,
};
