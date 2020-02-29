/* 

This file handles:

- Starting the microphone
- Receiving messages from our speech recognition engine
- Displaying microphone status and transcription to the user

*/

import * as view from "./view.js";
import { STATES } from './constants.js';
import { startMicStream } from './microphone.js';

const { useState, useEffect } = React;
const popupContainer = document.getElementById("popup-container");
let isInitialized = false;

const PopupController = function() {
    const [currentView, setCurrentView] = useState(STATES.WAITING);
    const [displayText, setDisplayText] = useState(null);

    useEffect(() => {
        if (!isInitialized) {
            isInitialized = true;
            init();
        }
    });

    const init = async () => {
        // start microphone stream and onboarding here if permissions are not set yet.
        startMicStream();
        // Listen for messages from the background scripts
        chrome.runtime.onMessage.addListener(handleMessage);
    };

    const handleMessage = message => {
        switch (message.type) {
            case "closePopup": {
                window.close();
                break;
            }
            case "error": {
                setCurrentView(STATES.ERROR);
                break;
            }
            case "displayText": {
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
}

ReactDOM.render(<PopupController />, popupContainer);