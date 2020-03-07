/* globals communicate */
this.scroll = (function () {
  communicate.register('scrollUp', scrollUp);
  communicate.register('scrollDown', scrollDown);

  const scrollAmount = 0.9;

  function scrollVertically(dy, smooth) {
    window.scrollBy({
      left: 0,
      top: dy,
      behavior: smooth ? 'smooth' : 'auto',
    });
    return true;
  }

  function scrollUp() {
    return scrollVertically(-scrollAmount * window.innerHeight, true);
  }

  function scrollDown() {
    return scrollVertically(scrollAmount * window.innerHeight, true);
  }
}());
