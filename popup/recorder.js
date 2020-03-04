/* globals annyang */

/**
 * This file is responsible for:
 *   - Starting microphone recording
 *   - Providing functions that send microphone status information
 *     and transcription results back to the main user interface
 */

class Recorder {
  startRecording() {
    annyang.start({
      autoRestart: false,
      continuous: false, // will turn off automatically when speech stops
    });

    annyang.addCallback('start', () => {
      const audio = new Audio('https://mozilla.github.io/firefox-voice/chime.ogg');
      audio.play();

      this.onStart();
    });

    annyang.addCallback('soundstart', this.onBeginRecording);
    annyang.addCallback('result', this.onEndRecording);

    window.addEventListener('unload', () => {
      annyang.removeCallback();
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
