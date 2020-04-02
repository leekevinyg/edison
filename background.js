/* global chrome, annyang */

/**
 *
 * Thie file is responsible for:
 * - Handling initializing Microphone Permissions and Wakeword Detection.
 *
 */

import BumbleBee from './vendor/bumblebee/bumblebee.js';
import MicrophonePermissions from './microphone/microphone-permissions.js';
import Recorder from './microphone/recorder.js';
import parser from './intentEngine/parser.js';
import runner from './intentEngine/runner.js';
import { STATES, TIMEOUTS } from './constants.js';

let bumblebee = null;

chrome.runtime.onInstalled.addListener(async () => {
  await navigator.permissions.query({ name: 'microphone' }).then((result) => {
    if (result.state === 'prompt') {
      MicrophonePermissions.request();
    } else if (result.state === 'granted') {
      init();
    }
  });
});

chrome.runtime.onMessage.addListener((message) => {
  const { type, data } = message;
  if (type === 'permission' && data === 'microphone-access-granted') {
    init();
  } else if (type === 'utterence') {
    runner.run(data);
  }
});

const initializeHotWordDetection = () => {
  bumblebee = new BumbleBee();
  bumblebee.setWorkersPath('vendor/bumblebee/workers');
  bumblebee.addHotword('hey_edison');
  bumblebee.setSensitivity(1.0);
};

const endCommandDetection = () => {
  annyang.removeCallback();
  annyang.abort();
};

const init = () => {
  initializeHotWordDetection();
  bumblebee.on('hotword', () => {
    MicrophonePermissions.request();
    const recorder = new Recorder();
    recorder.onEndRecording = (phrases) => {
      if (!phrases || phrases.length === 0) {
        const msg = new SpeechSynthesisUtterance(STATES.ERROR);
        window.speechSynthesis.speak(msg);
      }
      const utterence = parser.pickBestUtterenceDetected(phrases);
      if (utterence) {
        runner.run(utterence);
      } else {
        const msg = new SpeechSynthesisUtterance(STATES.ERROR);
        window.speechSynthesis.speak(msg);
      }
      endCommandDetection();
    };
    recorder.startRecording();
    setTimeout(endCommandDetection, TIMEOUTS.WAIT_FOR_COMMAND);
  });
  bumblebee.start();
};
