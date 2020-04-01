/* global annyang */

/**
 *
 * Thie file is responsible for:
 * - Handling wakeword detection.
 *
 */

import BumbleBee from './vendor/bumblebee/bumblebee.js';
import MicrophonePermissions from './microphone/microphone-permissions.js';
import Recorder from './microphone/recorder.js';
import parser from './intentEngine/parser.js';
import runner from './intentEngine/runner.js';
import { STATES, TIMEOUTS } from './constants.js';

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

let bumblebee = null;
initializeHotWordDetection();
bumblebee.on('hotword', () => {
  MicrophonePermissions.request();
  const recorder = new Recorder();
  setTimeout(endCommandDetection, TIMEOUTS.WAIT_FOR_COMMAND);
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
});

bumblebee.start();
