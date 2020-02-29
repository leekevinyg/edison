/**
 * This file is responsible for:
 *   - Starting and stopping microphone recording
 *   - Sending microphone stream to an external speech-to-text service for transcription
 */

class Recorder {
  constructor(stream) {
    this.stream = stream;
    this.mediaRecorder = null;
    this.cancelled = false;
    this.chunks = null;
  }

  startRecording() {
    const audio = new Audio(
      'https://mozilla.github.io/firefox-voice/chime.ogg',
    );
    audio.play();
    // Initilize microphone content
    // Set up voice activity detector and relevant timers
  }

  stopRecording() {
    this.mediaRecorder.stop();
  }

  cancel() {
    this.cancelled = true;
    this.stopRecording();
  }

  onBeginRecording() {
    // can be overridden!
  }

  onEndRecording() {
    // can be overridden!
  }

  onError() {

  }

  onProcessing() {

  }

  onNoVoice() {

  }
}

export default Recorder;
