/* 

This file handles:

- Starting the recorder
- Receiving messages from our speech recognition engine

*/

import * as view from "./view.js";
import { STATES, TIMEOUTS } from './constants.js';

const { useState, useEffect } = React;
const popupContainer = document.getElementById("popup-container");
let isInitialized = false;

const PopupController = function() {
    const [currentView, setCurrentView] = useState(STATES.WAITING);

    useEffect(() => {
        if (!isInitialized) {
            isInitialized = true;
            init();
        }
    });

    const init = async () => {
        // start microphone stream and onboarding here if permissions are not set yet.
        await navigator.mediaDevices.getUserMedia({audio: true})
        // Listen for messages from the background scripts
        chrome.runtime.onMessage.addListener(handleMessage);
    };

    const handleMessage = message => {
        switch (message.type) {
            case "closePopup": {
                break;
            }
            case "error": {
                break;
            }
            case "displayText": {
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