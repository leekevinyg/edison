/* global React, ReactDOM */

/**
 * This file manages
 *  - User Settings (Opt in to potential future data collection for analytics purposes)
 *  - Microphone Permissions Request
 */

import OnBoardingView from './view.js';

const { useState, useEffect } = React;
const onboardingContainer = document.getElementById('onboarding-container');
let isInitialized = false;

const OnboardingController = () => {
  const [permissionError, setPermissionError] = useState(null);

  useEffect(() => {
    if (!isInitialized) {
      isInitialized = true;
      init();
    }
  });

  const init = async () => {
    launchPermission();
  };

  const launchPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      setPermissionError(null);
      stopMedia(stream.getTracks());
    } catch (e) {
      setPermissionError(e.name);
    }
  };

  const stopMedia = (tracks) => {
    for (let i = 0; i < tracks.length; i++) {
      tracks[i].stop();
    }
  };

  return <OnBoardingView permissionError={permissionError} />;
};

ReactDOM.render(<OnboardingController />, onboardingContainer);
