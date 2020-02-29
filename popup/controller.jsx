/* 

This file handles:

- Starting the recorder
- Sending and receiving messages from our background script

*/

import * as view from "./view.js";
import { STATES } from './constants.js';

const { useState, useEffect } = React;
const popupContainer = document.getElementById("popup-container");
let isInitialized = false;

const PopupController = function() {
    const [currentView, setCurrentView] = useState(STATES.WAITING);
    const [displayText, setDisplayText] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [cardImage, setCardImage] = useState(null);

    useEffect(() => {
        if (!isInitialized) {
            isInitialized = true;
            init();
        }
    });

    const init = async () => {
        // start microphone stream here
        // add listeners
        // Listen for messages from the background scripts
        chrome.runtime.onMessage.addListener(handleMessage);
    }
    const handleMessage = message => {
        switch (message.type) {
            case "closePopup": {
                closePopup(message.time);
                break;
            }
            case "displayFailure": {
                setPopupView("error");
                setErrorMessage(message.message);
                break;
            }
            case "displayText": {
                setDisplayText(message.message);
                overrideTimeout = TEXT_TIMEOUT;
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
          displayText={displayText}
          errorMessage={errorMessage}
          cardImage={cardImage}
        />
      );
}


ReactDOM.render(<PopupController />, popupContainer);