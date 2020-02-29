# Tulip

Chrome extension for a voice activated web navigation agent. Inspired by [firefox voice](https://github.com/mozilla/firefox-voice)

- <a href="#Architecture">Architecture Overview</a>
- <a href="#Developing">Developing</a>
- <a href="#UserGuide">User Guide</a>

# Architecture

**Background Process**
- Listens for the keyboard press and pauses all media playback before launching the listening interface

**Listening Interface**
- Starts microphone stream
- Handles messages from speech engine containing transcriptions of our commands
- **States**:
    - Loading
    - Error
    - Listening (Microphone ready and started. Executes Siri-like Chime and shows animation)
    - Transcribing (One second...)
    - Results (Got it!)

**OnBoarding Interface (To be Used with Nurse Aid or OT)**
- Handles microphone permissions
- Other Settings?

**Microphone Logic**
- Responsible for detecting speech activity and sending voice stream to speech recognition engine

**Speech Engine**
- [Cloud based](https://cloud.google.com/speech-to-text/docs) speech-to-text 

**Intent Engine**
- Receives the microphone transcription, matches it to intent, and executes the intent in a content script 
  injected into the currently active web page. For supported intents, see the <a href="#UserGuide">User Guide</a>.

# Developing

Section in progress.

# User Guide
    - Open
        - Conducts a “I’m feeling lucky” google search and opens first link
        - Example: "Open Spotify"
    - Close Tab
        - Closes current tab
    - Click
        - Clicks an element based off a fuzzy search of the web page using [Fuse.js](https://fusejs.io/)
        - Example: "Click Sign-In"
    - Scroll
        - Scrolls an element based off a fuzzy search of the web page [Fuse.js](https://fusejs.io/)
        - Example: "Scroll Page Down", "Scroll Page Up", "Scroll Playlist"
    - Focus Input 
        - Focuses an input based off a fuzzy search of the web page using [Fuse.js](https://fusejs.io/)
        - Example: "Focus password field", "Focus search field"
    - Dictate
        - Dictate into text fields and other input areas
    - Browser Back
        - Hits back button on browser
    - Play/Pause/Fast Forward Media
        - Supported services include Netflix, Youtube and Spotify.
