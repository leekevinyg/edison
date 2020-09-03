/* globals annyang */

/**
 * This file is responsible for:
 *   - Starting microphone recording
 *   - Providing functions that send microphone status information
 *     and transcription results back to the main user interface
 */
import helpers from '../helpers.js';
import { TIMEOUTS } from '../constants.js';

class Recorder {
  startRecording() {
    annyang.start({
      autoRestart: false,
      continuous: false, // will turn off automatically when speech stops
    });

    annyang.addCallback('start', () => {
      helpers.muteTabs();
      setTimeout(helpers.unmuteTabs, TIMEOUTS.MUTE_TABS_TIMEOUT);
      const audio = new Audio('https://leekevinyg.github.io/edison/chime.ogg');
      audio.play();
      this.onStart();
    });

    annyang.addCallback('soundstart', this.onBeginRecording);
    annyang.addCallback('result', (phrases) => {
      helpers.unmuteTabs();
      this.onEndRecording(phrases);
    });

    window.addEventListener('unload', () => {
      annyang.removeCallback();
      annyang.abort();
    });
  }

  onStart() {
    // can be overriden!
  }

  onBeginRecording() {
    // can be overridden!
  }

  onEndRecording() {
    // can be overridden!
  }
}

export default Recorder;
