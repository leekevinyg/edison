# Tulip

Voice activated web navigation extension for the Chrome browser.

Speech recognition with [annyang](https://github.com/TalAter/annyang).

Intent engine fuzzy search powered by [fuse](https://fusejs.io/).

Architecture inspired by [firefox voice](https://github.com/mozilla/firefox-voice).

- <a href="#Developing">Developing</a>
- <a href="#UserGuide">User Guide</a>

# Developing

Section in Progress.

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
