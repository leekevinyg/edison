/* globals communicate */

this.media = (function () {
  communicate.register('play', play);
  communicate.register('pause', pause);
  communicate.register('rewind', rewind);
  communicate.register('skip', skip);

  function isPaused() {
    const video = document.querySelector('video');
    return video.paused;
  }

  function play() {
    if (isPaused()) {
      const video = document.querySelector('video');
      if (video) {
        video.play();
      }
    }
  }

  function pause() {
    const video = document.querySelector('video');
    if (video) {
      video.pause();
    }
  }

  // Tested on Netflix only
  function skip() {
    const fastForwardButton = document.querySelector("button[aria-label='Seek Forward']");
    if (fastForwardButton) {
      fastForwardButton.click();
    }
  }

  // Tested on Netflix only
  function rewind() {
    const rewindButton = document.querySelector("button[aria-label='Seek Back']");
    if (rewindButton) {
      rewindButton.click();
    }
  }
}());
