/* global chrome */

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

const bumblebee = new BumbleBee();
bumblebee.setWorkersPath('vendor/bumblebee/workers');
bumblebee.addHotword('bumblebee');
bumblebee.setSensitivity(1.0);

bumblebee.on('hotword', async (hotword) => {
  // focus tab?
  MicrophonePermissions.request();
  const recorder = new Recorder();

  recorder.onStart = () => {
    console.log('listening');
  };
  recorder.onEndRecording = async (phrases) => {
    if (!phrases || phrases.length === 0) {
      // TODO: play an error sound.
      console.log('sorry, failed to parse command');
    }
    const utterence = parser.pickBestUtterenceDetected(phrases);
    console.log(utterence);
    // fire intent off to intent engine
    // TODO: Play error for unparsed command too. Play success for parsed command.
    runner.run(utterence);
    console.log('finished listening');
    annyang.removeCallback();
    annyang.abort();
  };
  recorder.startRecording();
});

bumblebee.start();
