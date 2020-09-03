# Edison

Edison is a voice activated way to navigate the Chrome browser.

- <a href="#Demo">Demos</a>
- <a href="#Download">Download</a>
- <a href="#UserGuide">User Guide</a>
- <a href="#Developing">Development Guide</a>
- <a href="#Doc">Design Document</a>
- <a href="#Feedback">Feedback</a>

<a name="Demo"></a>
# Demos
The voice interface can be triggered by the wakeword "Hey Edison", followed by one of the supported commands documented below:

[![Wakeword Demo](https://img.youtube.com/vi/50mDH2S5m_o/0.jpg)](https://youtu.be/50mDH2S5m_o)

<a name="Download"></a>
# Download

You can download the extension from the chrome store [here](https://chrome.google.com/webstore/detail/tulip/cjedgkiefphilnnkgmpakjdjehjjgaef).

<a name="UserGuide"></a>
# User Guide

The following commands are currently supported:

- **Open**  
Opens the first google search result that best matches the words spoken after the "open" command.  
Examples: "Hey Edison, Open News", "Hey Edison, Open Youtube", "Hey Edison, Open Netflix".

- **Click**  
Tries to click anything that approximately matches the words spoken after the "click" command.  
Examples: "Hey Edison, Click Sign-In", "Hey Edison, Click the title of a video", "Hey Edison, Click a Netflix profile".

- **Close**  
Closes current tab. Useful if a mistake or unintended tab is opened.  
Example: Just say "Hey Edison, Close tab".

- **Scroll**  
Scrolls the page up/down/left/right.  
Examples: "Hey Edison, Scroll Down", "Hey Edison, Scroll Up", "Hey Edison, Scroll Left", "Hey Edison, Scroll Right".

- **Media Controls for Video**  
Plays or pauses the video in the current tab.  
Example: Just say "Hey Edison, Play" or "Hey Edison, Pause" when viewing a video.

- **Focus Next Tab**  
Navigates to the next tab
Example: "Hey Edison, Focus Next Tab"

- **Focus Previous Tab**  
Navigates to the previous tab
Example: "Hey Edison, Focus Previous Tab"

- **Go back**  
Hits the browser back button
Example: "Hey Edison, Go Back"


- **Go forward**  
Hits the browser forward button
Example: "Hey Edison, Go Forward"

- **Rewind**  
Specific to Netflix. Rewinds the current Netflix title by 10 seconds.  
Example: Just say "Hey Edison, Rewind" when viewing a Netflix title.

- **Skip**  
Specific to Netflix. Fast forwards the Netflix title by 10 seconds.  
Example: Just say "Hey Edison, Skip" when viewing a Netflix title.

Note that the interface currently handles *one command at a time*, therefore, each command will need to invoke the interface again separately.

For accessibility use cases, it is recommended that passwords be saved for the most commonly used websites to improve the overall user expierence.

Check out the <a href="#Demo">Demos</a> to see the tool in action!

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

Note, the extension currently utilizes a few external dependencies:

- Speech recognition with [annyang](https://github.com/TalAter/annyang).

- Fuzzy search powered by [fuse](https://fusejs.io/).

- Wakeword detection powered by [bumblebee](https://github.com/jaxcore/bumblebee-hotword).

Some useful resources:

(1) [Chrome Extension Architecture Overview](https://developer.chrome.com/extensions/overview#arch)

(2) [Chrome Extension Message Passing](https://developer.chrome.com/extensions/messaging)

If you have any questions, feel free to shoot me an email at klee2010@gmail.com.

<a name="Doc"></a>
# Design Document
A design document for this project is available [here](https://docs.google.com/document/d/1nKaC_UrZWs74rFF9CNAl-1SZkBbAQJlreTb008G3Zjs/edit?usp=sharing).

You can also watch a presentation on the motivations behind the project [here](https://youtu.be/onA30s6UjRI).

<a name="Feedback"></a>
# Suggestions and Feedback

If you have any ideas on how to improve the tool, or encounter any behaviour that is unexpected, please feel free to shoot me an email at ```klee2010@gmail.com```

