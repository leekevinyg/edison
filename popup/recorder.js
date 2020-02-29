/**
 * This file is responsible for:
 *   - Starting and stopping microphone recording
 *   - Sending microphone stream to an external speech-to-text service for transcription
 *   - Send recording visualization to popup view?
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
    // Build the WebAudio graph we'll be using
    this.chunks = [];
    this.audioContext = new AudioContext();
    this.sourceNode = this.audioContext.createMediaStreamSource(this.stream);
    this.analyzerNode = this.audioContext.createAnalyser();
    this.outputNode = this.audioContext.createMediaStreamDestination();

    // make sure we're doing mono everywhere
    this.sourceNode.channelCount = 1;
    this.analyzerNode.channelCount = 1;
    this.outputNode.channelCount = 1;

    // connect the nodes together
    this.sourceNode.connect(this.analyzerNode);
    this.analyzerNode.connect(this.outputNode);

    // and set up the recorder
    const options = {
      audioBitsPerSecond: 16000,
      mimeType: "audio/ogg",
    };
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
