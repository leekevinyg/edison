/* global React, ReactDOM, chrome */

/**
 * This file handles:
 *   - Starting the microphone stream
 *   - Receiving microphone status and displaying it to the user
 *   - Receiving command transcription and displaying it to the user
 *   - Firing intent request to background script
 *   - Receiving result of intent request from background script
*/

import Popup from './view.js';
import { STATES } from './constants.js';
import Microphone from './microphone.js';
import Recorder from './recorder.js';

const { useState, useEffect } = React;
const popupContainer = document.getElementById('popup-container');
let isInitialized = false;
let recorder = null;
let micStream = null;

const PopupController = () => {
  // eslint-disable-next-line no-unused-vars
  const [currentState, setCurrentState] = useState(STATES.WAITING);
  const [transcription, setTranscription] = useState(null); // eslint-disable-line no-unused-vars

  useEffect(() => {
    if (!isInitialized) {
      isInitialized = true;
      init();
    }
  });

  const init = async () => {
    // start microphone stream or request permissions to microphone if not available
    Microphone.startMicStream();
    micStream = Microphone.getMicStream();
    recorder = new Recorder(micStream);
    startRecorder();
    // Listen for messages from the background scripts
    chrome.runtime.onMessage.addListener(handleMessage);
  };

  const startRecorder = () => {
    recorder.onBeginRecording = () => {
      setCurrentState(STATES.LISTENING);
    };
    recorder.onEndRecording = (payload) => {
      setCurrentState(STATES.SUCCESS);
      if (payload === null) {
        // recording was cancelled
        window.close();
      }
      setTranscription(payload.text);
      /*
      chrome.runtime.sendMessage({
        type: 'runIntent',
        text: payload.text,
      });
      */
    };
    recorder.onError = (/* error */) => {
      setCurrentState(STATES.ERROR);
    };
    recorder.onProcessing = () => {
      setCurrentState(STATES.TRANSCRIBING);
    };
    recorder.onNoVoice = () => {
      window.close();
    };
    recorder.onStartVoice = () => {
      // clear no voice interval
    };
    recorder.startRecording();
  };

  const handleMessage = (message) => {
    switch (message.type) {
      case 'intentSuccessful': {
        window.close();
        break;
      }
      case 'intentError': {
        setCurrentState(STATES.ERROR);
        break;
      }
      default:
        break;
    }
    return undefined;
  };

  return (
    <Popup
      currentState={currentState}
      transcription={transcription}
    />
  );
};

ReactDOM.render(<PopupController />, popupContainer);
