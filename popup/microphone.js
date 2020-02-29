/* global chrome */
import { TIMEOUTS } from './constants';

// let isWaitingForPermission = false;
// let stream = null;
const startMicStream = async () => {
  try {
    // isWaitingForPermission = Date.now();
    await startMicrophone();
    // isWaitingForPermission = false;
  } catch (e) {
    // isWaitingForPermission = false;
    if (e.name === 'NotAllowedError' || e.name === 'TimeoutError') {
      startOnboarding();
      window.close();
      return;
    }
    throw e;
  }
};

const requestMicrophone = async () => {
  await navigator.mediaDevices.getUserMedia({ audio: true });
  // stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  // return stream;
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const startMicrophone = async () => {
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
  startMicStream,
};
