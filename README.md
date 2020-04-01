# Tulip

Tulip is a voice activated web navigation extension for the Chrome browser.

- <a href="#Demo">Demo</a>
- <a href="#Download">Download</a>
- <a href="#UserGuide">User Guide</a>
- <a href="#Future">Improving Accessibility and Future Directions</a>
- <a href="#Developing">Development Guide</a>
- <a href="#Feedback">Feedback</a>

<a name="Demo"></a>
# Demo

[![YOUTUBE DEMO](https://img.youtube.com/vi/Il0RF0RZK28/0.jpg)](https://www.youtube.com/watch?v=Il0RF0RZK28)

<a name="Download"></a>
# Download

You can download the extension from the chrome store [here](https://chrome.google.com/webstore/detail/tulip/cjedgkiefphilnnkgmpakjdjehjjgaef).

<a name="UserGuide"></a>
# User Guide

Currently, the extension can be triggered by clicking on the extension icon in the top right of the chrome toolbar or by hitting "Command+Shift+O" on a Mac or "Ctrl+Shift+O" on Windows.

The following commands are supported:

- **Open**  
Opens the first google search result that best matches the words spoken after the "open" command.  
Examples: "Open Spotify", "Open Youtube", "Open Netflix".

- **Click**  
Tries to click anything that approximately matches the words spoken after the "click" command.  
Examples: "Click Sign-In", "Click the title of a video", "Click a Netflix profile".

- **Close**  
Closes current tab. Useful if a mistake or unintended tab is opened.  
Example: Just say "Close".

- **Back**  
Navigates to last visited page in the browser.  
Example: Just say "Back".

- **Scroll**  
Scrolls the page up/down/left/right.  
Examples: "Scroll Down", "Scroll Up", "Scroll Left", "Scroll Right".

- **Media Controls for Video**  
Plays or pauses the video in the current tab.  
Example: Just say "Play" or "Pause" when viewing a video.

The following commands are specific to Netflix:  

- **Rewind**  
Rewinds the current Netflix title by 10 seconds.  
Example: Just say "Rewind" when viewing a Netflix title.

- **Skip**  
Fast forwards the Netflix title by 10 seconds.  
Example: Just say "Skip" when viewing a Netflix title.

Note that the interface currently handles *one command at a time*, therefore, each command will need to invoke the interface again separately. Improvements to this coming shortly.

For accessibility use cases, it is recommended that passwords be saved for the most commonly used websites to improve the overall user expierence.

<a name="Future"></a>
# Improving Accessibility and Future Directions 

The following projects would increase accessibility of this tool:

- [Sip and Puff](https://en.wikipedia.org/wiki/Sip-and-puff) Integration
- Wakeword detection i.e., "Hey Tulip"

As of March 2020, the current limits and quotas for the [Web Speech API](https://wicg.github.io/speech-api/) are unclear. Therefore, the following improvements would increase the stability of the project moving forward:

- Hosting our own deep speech recognition server, like [Mozilla Deep Speech](https://github.com/mozilla/DeepSpeech)
- Moving towards a more stable paid service with clearly defined speech recognition quotas, like [PicoVoice](https://picovoice.ai/) or the official [Google Speech-to-Text Engine](https://cloud.google.com/speech-to-text/docs)

Furthermore, to increase extensibility, it may be worthwhile to expose an API for this extension that would allow developers to load custom voice commands.

<a name="Developing"></a>
# Development Guide

The architecture was inspired in parts by the [firefox voice](https://github.com/mozilla/firefox-voice) project.
A detailed overview will be available under a [docs]() directory shortly. For now, each non-trivial file has a comment section at the top with a brief overview of the purpose of the file.

The extension currently utilizes a few external dependencies:

- Speech recognition with [annyang](https://github.com/TalAter/annyang).

- Fuzzy search powered by [fuse](https://fusejs.io/).

To start up a development environment:

1. Ensure you have [nodejs](https://nodejs.org/en/download/). 
2. Clone the project and run:

* ``` npm install ``` 
* ``` npm run build ```

3. Load the project directory as an unpacked chrome extension by following the directions [here](https://developer.chrome.com/extensions/getstarted#manifest)

Some useful resources:

(1) [Chrome Extension Architecture Overview](https://developer.chrome.com/extensions/overview#arch)

(2) [Chrome Extension Message Passing](https://developer.chrome.com/extensions/messaging)

<a name="Feedback"></a>
# Suggestions and Feedback

If you have any ideas on how to improve the tool, or encounter any behaviour that is unexpected, please feel free to file an issue [here](https://github.com/leekevinyg/tulip-web/issues/new).
