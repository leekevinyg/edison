/* global React, ReactDOM, chrome */
/*
This file handles:

- Starting the microphone
- Receiving messages from our speech recognition engine
- Displaying microphone status and transcription to the user

*/

import * as view from './view';
import { STATES } from './constants';
import Microphone from './microphone';

const { useState, useEffect } = React;
const popupContainer = document.getElementById('popup-container');
let isInitialized = false;

const PopupController = () => {
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
    <view.Popup
      currentView={currentView}
    />
  );
};

ReactDOM.render(<PopupController />, popupContainer);
