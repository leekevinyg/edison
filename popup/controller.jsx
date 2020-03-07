/* global React, ReactDOM, chrome */

/**
 * This file handles:
 *   - Starting the microphone stream
 *   - Receiving microphone status and displaying it to the user
 *   - Receiving command transcription and displaying it to the user
 *   - Sending intent request to background script
 *   - Receiving result of intent request from background script
*/

import Popup from './view.js';
import { STATES } from './constants.js';
import MicrophonePermissions from './microphone-permissions.js';
import Recorder from './recorder.js';

const { useState, useEffect } = React;
const popupContainer = document.getElementById('popup-container');
let isInitialized = false;
let recorder = null;

const PopupController = () => {
  const [currentState, setCurrentState] = useState(STATES.WAITING);
  const [transcription, setTranscription] = useState(null);

  useEffect(() => {
    if (!isInitialized) {
      isInitialized = true;
      init();
    }
  });

  const init = async () => {
    MicrophonePermissions.request();
    recorder = new Recorder();

    // listen for recorder events, so we can update the user interface.
    recorder.onStart = () => {
      // FIXME: pause all video and audio before starting recorder
      setCurrentState(STATES.LISTENING);
    };

    recorder.onEndRecording = async (phrases) => {
      if (!phrases || phrases.length === 0) {
        setCurrentState(STATES.ERROR);
        await new Promise((r) => setTimeout(r, 1500));
        window.close();
      }
      setTranscription(phrases);
      // fire intent off to intent engine
      chrome.runtime.sendMessage({
        type: 'runIntent',
        utterence: phrases,
      });
      setTimeout(() => window.close(), 2000);
    };

    recorder.startRecording();
    // listen for results of our intents
    chrome.runtime.onMessage.addListener(handleMessage);
  };

  // handle the results of our intents
  const handleMessage = async (message) => {
    switch (message.type) {
      case 'intentSuccessful': {
        setCurrentState(STATES.SUCCESS);
        await new Promise((r) => setTimeout(r, 1500));
        window.close();
        break;
      }
      case 'intentError': {
        setCurrentState(STATES.ERROR);
        await new Promise((r) => setTimeout(r, 1500));
        window.close();
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
