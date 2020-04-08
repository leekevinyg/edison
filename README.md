# Edison

Edison is a voice activated web navigation extension for the Chrome browser.

- <a href="#Demo">Demo</a>
- <a href="#Download">Download</a>
- <a href="#UserGuide">User Guide</a>
- <a href="#Developing">Development Guide</a>
- <a href="#Doc">Design Document</a>
- <a href="#Feedback">Feedback</a>

<a name="Demo"></a>
# Demo

[![YOUTUBE DEMO](https://img.youtube.com/vi/Il0RF0RZK28/0.jpg)](https://www.youtube.com/watch?v=Il0RF0RZK28)

<a name="Download"></a>
# Download

You can download the extension from the chrome store [here](https://chrome.google.com/webstore/detail/tulip/cjedgkiefphilnnkgmpakjdjehjjgaef).

<a name="UserGuide"></a>
# User Guide

The extension can be triggered by clicking on the extension icon in the top right of the chrome toolbar or by hitting "Command+Shift+O" on a Mac or "Ctrl+Shift+O" on Windows. 

Alternatively, the wakeword "Hey Edison" is available for a completely handsfree experience. If using the wakeword, just say "Hey Edison" followed by any of the commands detailed below.

The following commands are currently supported:

- **Open**  
Opens the first google search result that best matches the words spoken after the "open" command.  
Examples: "Open News", "Open Youtube", "Open Netflix".

- **Click**  
Tries to click anything that approximately matches the words spoken after the "click" command.  
Examples: "Click Sign-In", "Click the title of a video", "Click a Netflix profile".

- **Close**  
Closes current tab. Useful if a mistake or unintended tab is opened.  
Example: Just say "Close tab".

- **Scroll**  
Scrolls the page up/down/left/right.  
Examples: "Scroll Down", "Scroll Up", "Scroll Left", "Scroll Right".

- **Media Controls for Video**  
Plays or pauses the video in the current tab.  
Example: Just say "Play" or "Pause" when viewing a video.

- **Focus Next Tab**  
Navigates to the next tab

- **Focus Previous Tab**  
Navigates to the previous tab

- **Go back**  
Hits the browser back button

- **Go forward**  
Hits the browser forward button

- **Rewind**  
Specific to Netflix. Rewinds the current Netflix title by 10 seconds.  
Example: Just say "Rewind" when viewing a Netflix title.

- **Skip**  
Specific to Netflix. Fast forwards the Netflix title by 10 seconds.  
Example: Just say "Skip" when viewing a Netflix title.

Note that the interface currently handles *one command at a time*, therefore, each command will need to invoke the interface again separately.

For accessibility use cases, it is recommended that passwords be saved for the most commonly used websites to improve the overall user expierence.

<a name="Developing"></a>
# Development Guide

To start up a development environment:

1. Ensure you have [nodejs](https://nodejs.org/en/download/). 
2. Clone the project and run:

* ``` npm install ``` 
* ``` npm run build ```

3. Load the project directory as an unpacked chrome extension by:

- Going to ```chrome://extensions```
- Toggle on "developer mode" in the top right corner of the page
- Click the "Load unpacked" button on the top left and point to the directory you cloned in step 2.

4. If you are making ```.jsx``` changes, you can run the watch command to automatically convert your ```.jsx``` changes to loadable ```.js``` files:

- ```npm run watch```

The **entry point** for all voice commands is located in the background script [here](https://github.com/leekevinyg/edison/blob/master/background.js#L60).

Logging from extension side javascript is viewable by inspecting the ```background.html``` view from the extension entry under ```chrome://extensions```. Note that developer mode must be enabled.

For injected content scripts, logging is viewable by opening the regular developer tools on the webpage the content script was injected into.

If you have any questions, feel free to shoot me an email at klee2010@gmail.com.

Note, the extension currently utilizes a few external dependencies:

- Speech recognition with [annyang](https://github.com/TalAter/annyang).

- Fuzzy search powered by [fuse](https://fusejs.io/).

- Wakeword detection powered by [bumblebee](https://github.com/jaxcore/bumblebee-hotword).

Some useful resources:

(1) [Chrome Extension Architecture Overview](https://developer.chrome.com/extensions/overview#arch)

(2) [Chrome Extension Message Passing](https://developer.chrome.com/extensions/messaging)

<a name="Doc"></a>
# Design Document
A design document for this project is available [here](https://docs.google.com/document/d/1nKaC_UrZWs74rFF9CNAl-1SZkBbAQJlreTb008G3Zjs/edit?usp=sharing).

You can also watch a presentation on the motivations behind the project [here](https://youtu.be/onA30s6UjRI).

<a name="Feedback"></a>
# Suggestions and Feedback

If you have any ideas on how to improve the tool, or encounter any behaviour that is unexpected, please feel free to shoot me an email at klee2010@gmail.com
