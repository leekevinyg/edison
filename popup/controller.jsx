/* global React, ReactDOM, chrome */

/**
 * This file handles:
 *   - Starting the microphone stream
 *   - Receiving messages from our speech recognition engine
 *   - Displaying microphone status and transcription to the user
*/

import Popup from './view.js';
import { STATES } from './constants.js';
import Microphone from './microphone.js';

const { useState, useEffect } = React;
const popupContainer = document.getElementById('popup-container');
let isInitialized = false;

const PopupController = () => {
  // eslint-disable-next-line no-unused-vars
  const [currentView, setCurrentView] = useState(STATES.WAITING);
  const [displayText, setDisplayText] = useState(null); // eslint-disable-line no-unused-vars

  useEffect(() => {
    if (!isInitialized) {
      isInitialized = true;
      init();
    }
  });

  const init = async () => {
    // start microphone stream and onboarding here if permissions are not set yet.
    Microphone.startMicStream();
    // Listen for messages from the background scripts
    chrome.runtime.onMessage.addListener(handleMessage);
  };

  const handleMessage = (message) => {
    switch (message.type) {
      case 'closePopup': {
        window.close();
        break;
      }
      case 'error': {
        setCurrentView(STATES.ERROR);
        break;
      }
      case 'displayText': {
        setDisplayText(message.payload);
        break;
      }
      default:
        break;
    }
    return undefined;
  };

  return (
    <Popup />
  );
};

ReactDOM.render(<PopupController />, popupContainer);
