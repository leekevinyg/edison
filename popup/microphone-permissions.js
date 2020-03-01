/* global chrome */

/**
 * This file is responsible for:
 *   - Acquiring permissions to the user's microphone
 */

import { TIMEOUTS } from './constants.js';

const request = async () => {
  try {
    await startRequest();
  } catch (e) {
    if (e.name === 'NotAllowedError' || e.name === 'TimeoutError') {
      // Due to chrome extension limitations, microphone permissions may need to be requested
      // from a separate onboarding tab the first time.
      startOnboarding();
      window.close();
      return;
    }
    throw e;
  }
};

const requestMicrophone = async () => {
  await navigator.mediaDevices.getUserMedia({ audio: true });
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const startRequest = async () => {
  const sleeper = sleep(TIMEOUTS.PERMISSION_REQUEST).then(() => {
    const error = new Error('Permission Timed Out');
    error.name = 'TimeoutError';
    throw error;
  });
  await Promise.race([requestMicrophone(), sleeper]);
};

const startOnboarding = async () => {
  await chrome.tabs.create({
    url: chrome.extension.getURL('onboarding/onboard.html'),
  });
};

export default {
  request,
};
