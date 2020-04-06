# Edison

Edison is a voice activated web navigation extension for the Chrome browser.

- <a href="#Demo">Demo</a>
- <a href="#Download">Download</a>
- <a href="#UserGuide">User Guide</a>
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

The extension can be triggered by clicking on the extension icon in the top right of the chrome toolbar or by hitting "Command+Shift+O" on a Mac or "Ctrl+Shift+O" on Windows. 

Alternatively, the wakeword "Hey Edison" is available for a completely handsfree experience. If using the wakeword, just say "Hey Edison" followed by any of the commands detailed below.

The following commands are currently supported for Youtube, Netflix, Facebook, Gmail and Instagram:

- **Open**  
Opens the first google search result that best matches the words spoken after the "open" command.  
Examples: "Open Spotify", "Open Youtube", "Open Netflix".

- **Click**  
Tries to click anything that approximately matches the words spoken after the "click" command.  
Examples: "Click Sign-In", "Click the title of a video", "Click a Netflix profile".

- **Close**  
Closes current tab. Useful if a mistake or unintended tab is opened.  
Example: Just say "Close tab".

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

- Going to chrome://extensions
- Toggle on "developer mode" in the top right corner of the page
- Click the "Load unpacked" button on the top left and point to the directory you cloned in step 2.

4. If you are making ```.jsx``` changes, you can run the watch command:

- ```npm run watch```

to automatically convert your ```.jsx``` changes to loadable ```.js``` files.

The entry point for all voice commands is located in the background script [here](https://github.com/leekevinyg/edison/blob/master/background.js#L60).

Note, the extension currently utilizes a few external dependencies:

- Speech recognition with [annyang](https://github.com/TalAter/annyang).

- Fuzzy search powered by [fuse](https://fusejs.io/).

- Wakeword detection powered by [bumblebee](https://github.com/jaxcore/bumblebee-hotword).

Some useful resources:

(1) [Chrome Extension Architecture Overview](https://developer.chrome.com/extensions/overview#arch)

(2) [Chrome Extension Message Passing](https://developer.chrome.com/extensions/messaging)

<a name="Feedback"></a>
# Suggestions and Feedback

If you have any ideas on how to improve the tool, or encounter any behaviour that is unexpected, please feel free to shoot me an email at klee2010@gmail.com
